import { MongoClient, Db } from "mongodb";
import logger from "@/utils/logger";

// ============================================================================
// 🔧 ENVIRONMENT & CONFIGURATION
// ============================================================================

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

if (!MONGODB_DB) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_DB"');
}

// ============================================================================
// 📊 TELEMETRY STATE (Issue #3258)
// ============================================================================
// Track database stress metrics globally across hot-reloads

if (!global._mongoMetrics) {
  global._mongoMetrics = { totalRequests: 0, retries: 0 };
}

const metrics = global._mongoMetrics;

// ============================================================================
// 🛡️ CONNECTION POOL CONFIGURATION (Tuned for Serverless)
// ============================================================================

const mainPoolOptions = {
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 60000,
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

const ssePoolOptions = {
  maxPoolSize: 5,
  minPoolSize: 0,
  maxIdleTimeMS: 120000, // Slightly longer idle time for live streams
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
};

// ============================================================================
// 🔌 MAIN CONNECTION POOL
// ============================================================================

let mainClientPromise: Promise<MongoClient> | null = null;
let mainIndexesEnsured = false;

const getMainClientPromise = (): Promise<MongoClient> => {
  if (!mainClientPromise) {
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClientPromise) {
        global._mongoClientPromise = new MongoClient(
          MONGODB_URI,
          mainPoolOptions
        ).connect();
      }
      mainClientPromise = global._mongoClientPromise;
    } else {
      mainClientPromise = new MongoClient(
        MONGODB_URI,
        mainPoolOptions
      ).connect();
    }
  }
  return mainClientPromise;
};

// ============================================================================
// 📡 SSE (Server-Sent Events) CONNECTION POOL
// ============================================================================
// Dedicated connection pool for SSE streams - isolated from the main API pool.
// Prevents long-lived Change Stream connections from starving other routes.

let sseClientPromise: Promise<MongoClient> | null = null;
let sseClient: MongoClient | null = null;

const getSseClientPromise = (): Promise<MongoClient> => {
  if (!sseClientPromise) {
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoSseClientPromise) {
        global._mongoSseClientPromise = new MongoClient(
          MONGODB_URI,
          ssePoolOptions
        ).connect();
      }
      sseClientPromise = global._mongoSseClientPromise;
    } else {
      sseClientPromise = new MongoClient(MONGODB_URI, ssePoolOptions).connect();
    }
  }
  return sseClientPromise;
};

// ============================================================================
// 🔧 INDEX MANAGEMENT
// ============================================================================

/**
 * Ensures all required indexes exist on the database.
 * Runs once per connection to optimize query performance.
 */
async function ensureIndexes(db: Db): Promise<void> {
  try {
    await Promise.all([
      db.collection("rate_limits").createIndex(
        { expiresAt: 1 },
        { expireAfterSeconds: 0, background: true }
      ),
      db.collection("pending_operations").createIndex(
        { operationId: 1 },
        { background: true }
      ),
      db.collection("pending_operations").createIndex(
        { status: 1, updatedAt: 1 },
        { background: true }
      ),
      db.collection("pending_operations").createIndex(
        { status: 1, createdAt: 1 },
        { background: true }
      ),
      db.collection("engagement_scores").createIndex(
        { studentId: 1, calculatedAt: -1 },
        { background: true }
      ),
    ]);
  } catch (error) {
    // Index creation is best-effort; log but don't fail
    if (logger?.warn) {
      logger.warn("[DB Manager] Index creation failed (non-fatal)", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

// ============================================================================
// 📊 CONNECTION LIFECYCLE
// ============================================================================

/**
 * Connects to MongoDB and returns the database instance.
 * Reuses an existing connection pool to minimize handshake overhead.
 * Ensures all required indexes are created.
 */
export async function connectDb(): Promise<Db> {
  try {
    const connectedClient = await getMainClientPromise();
    const db = connectedClient.db(MONGODB_DB);

    if (!mainIndexesEnsured) {
      mainIndexesEnsured = true;
      await ensureIndexes(db);
    }

    return db;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    if (logger?.error) {
      logger.error("[DB Manager] Main pool connection failed", {
        error: errorMessage,
      });
    }
    throw new Error(
      `Failed to establish database connection: ${errorMessage}`
    );
  }
}

/**
 * Connects to MongoDB for SSE (Server-Sent Events) operations.
 * Uses a dedicated connection pool to avoid starving other operations.
 */
export async function connectDbForSSE(): Promise<Db> {
  try {
    const connectedClient = await getSseClientPromise();
    sseClient = connectedClient;

    // Register event listeners to reset client caching on connection drops
    sseClient.on("close", resetSseClient);
    sseClient.on("timeout", resetSseClient);
    sseClient.on("error", resetSseClient);

    return connectedClient.db(MONGODB_DB);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    resetSseClient();
    if (logger?.error) {
      logger.error("[DB Manager] SSE pool connection failed", {
        error: errorMessage,
      });
    }
    throw new Error(
      `Failed to establish SSE database connection: ${errorMessage}`
    );
  }
}

/**
 * Resets the SSE client and clears cached promises.
 */
function resetSseClient(): void {
  const clientToClose = sseClient;
  sseClientPromise = null;
  sseClient = null;

  if (process.env.NODE_ENV === "development") {
    global._mongoSseClientPromise = null;
  }

  if (clientToClose) {
    clientToClose.removeAllListeners();
    clientToClose.close().catch(() => {});
  }
}

/**
 * Disconnects the main database client.
 */
export async function disconnectDb(): Promise<void> {
  mainClientPromise = null;
  mainIndexesEnsured = false;

  if (process.env.NODE_ENV === "development") {
    global._mongoClientPromise = null;
  }
}

/**
 * Disconnects the SSE database client.
 */
export async function disconnectDbForSSE(): Promise<void> {
  resetSseClient();
}

// ============================================================================
// 🔁 EXPONENTIAL BACKOFF RETRY ENGINE (Issue #3258)
// ============================================================================

const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 500;

/**
 * Wraps database queries in an automated retry engine to mitigate transient
 * network drops and serverless cold-start timeouts.
 * @param {Function} operation - The async database function to execute.
 * @param {string} context - Optional context for telemetry logging.
 * @returns {Promise<T>} The result of the operation.
 */
export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  context: string = "DB Operation"
): Promise<T> {
  let attempt = 0;
  let delay = INITIAL_BACKOFF_MS;

  while (attempt <= MAX_RETRIES) {
    try {
      metrics.totalRequests++;
      const startTime = performance.now();

      const result = await operation();

      const latency = performance.now() - startTime;
      if (latency > 800 && logger?.warn) {
        logger.warn(
          `[DB Manager] ⚠️ Slow query detected in ${context}. Latency: ${latency.toFixed(2)}ms`
        );
      }

      return result;
    } catch (error) {
      attempt++;

      if (attempt > MAX_RETRIES) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        if (logger?.error) {
          logger.error(
            `[DB Manager] 💥 Exhausted all retries for ${context}`,
            { error: errorMessage }
          );
        }
        throw error;
      }

      metrics.retries++;
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (logger?.warn) {
        logger.warn(
          `[DB Manager] 📉 Transient error in ${context}. Retrying ${attempt}/${MAX_RETRIES} in ${delay}ms...`,
          { error: errorMessage }
        );
      }

      // Wait before retrying (Exponential Backoff)
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2;
    }
  }

  throw new Error(
    `[DB Manager] Operation failed after ${MAX_RETRIES} retries`
  );
}

// ============================================================================
// 📊 TELEMETRY EXPORT
// ============================================================================

/**
 * Returns current database metrics.
 */
export function getDbMetrics() {
  return {
    mainPoolStatus: mainClientPromise ? "connected" : "disconnected",
    ssePoolStatus: sseClientPromise ? "connected" : "disconnected",
    ...metrics,
  };
}

// ============================================================================
// 🔌 DEFAULT EXPORT
// ============================================================================

export const clientPromise = getMainClientPromise();

export default clientPromise;