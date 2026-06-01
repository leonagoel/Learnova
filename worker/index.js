import { processSyncQueue } from "../services/syncQueue";

let csrfTokenCache = null;
let csrfTokenPromise = null;

function isUnsafeMethod(method) {
  return ["POST", "PUT", "PATCH", "DELETE"].includes((method || "GET").toUpperCase());
}

function isSameOriginApiUrl(url) {
  try {
    const parsedUrl = new URL(url, self.location.origin);
    return parsedUrl.origin === self.location.origin && parsedUrl.pathname.startsWith("/api/");
  } catch {
    return false;
  }
}

async function getCsrfToken() {
  if (csrfTokenCache) return csrfTokenCache;
  if (csrfTokenPromise) return csrfTokenPromise;

  csrfTokenPromise = fetch("/api/auth/csrf", {
    method: "GET",
    credentials: "same-origin",
    cache: "no-store",
  })
    .then(async (response) => {
      if (!response.ok) return null;
      const data = await response.json().catch(() => null);
      csrfTokenCache = data?.csrfToken || null;
      return csrfTokenCache;
    })
    .catch(() => null)
    .finally(() => { csrfTokenPromise = null; });

  return csrfTokenPromise;
}

async function swFetchWithCsrf(url, options = {}) {
  const method = options.method || "GET";
  const headers = new Headers(options.headers || {});
  
  if (isUnsafeMethod(method) && isSameOriginApiUrl(url)) {
    if (!headers.has("x-csrf-token") && !headers.has("X-CSRF-Token")) {
      const token = await getCsrfToken();
      if (token) headers.set("X-CSRF-Token", token);
    }
  }
  
  return fetch(url, { ...options, headers });
}

async function handleSync() {
  const clients = await self.clients.matchAll();
  clients.forEach(c => c.postMessage({ type: "SYNC_PENDING_ACTIONS_START" }));
  
  const result = await processSyncQueue(swFetchWithCsrf);
  
  clients.forEach(c => c.postMessage({ 
    type: "SYNC_PENDING_ACTIONS_COMPLETE", 
    successCount: result.successCount, 
    failCount: result.failCount 
  }));
}

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-pending-actions") {
    event.waitUntil(handleSync().catch(err => console.error("[SW] Background sync failed:", err)));
  }
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "TRIGGER_SYNC_PENDING_ACTIONS") {
    event.waitUntil(handleSync());
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cached = await caches.match("/offline.html");
        return cached || new Response("You are offline", { headers: { "Content-Type": "text/html" } });
      })
    );
  }
});
