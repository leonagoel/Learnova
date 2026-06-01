import { GET } from "./route";
import { authenticateRequest } from "@/lib/error-handler";
import { checkRateLimit } from "@/lib/rateLimit";

jest.mock("@/lib/error-handler", () => ({
  withErrorHandler: (handler) => handler,
  authenticateRequest: jest.fn(),
}));

jest.mock("@/lib/rateLimit", () => ({
  checkRateLimit: jest.fn(),
}));

jest.mock("@/lib/firebase-admin", () => ({
  initFirebaseAdmin: jest.fn(),
}));

const mockCollection = {
  find: jest.fn().mockReturnThis(),
  sort: jest.fn().mockReturnThis(),
  toArray: jest.fn().mockResolvedValue([]),
};

jest.mock("@/lib/mongodb", () => ({
  __esModule: true,
  default: Promise.resolve({
    db: () => ({
      collection: () => mockCollection,
    }),
  }),
}));

function mockRequest(url) {
  return {
    headers: new Map([["x-forwarded-for", "127.0.0.1"]]),
    nextUrl: new URL(url, "http://localhost"),
  };
}

describe("attendance heatmap API route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    checkRateLimit.mockResolvedValue({ allowed: true, remaining: 9 });
  });

  test("derives userId from token when no explicit userId provided", async () => {
    authenticateRequest.mockResolvedValue({ uid: "student-1", role: "student" });

    const req = mockRequest("http://localhost/api/attendance/heatmap?month=2026-06");
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(mockCollection.find).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "student-1" })
    );
  });

  test("rejects student querying another user", async () => {
    authenticateRequest.mockResolvedValue({ uid: "student-1", role: "student" });

    const req = mockRequest("http://localhost/api/attendance/heatmap?userId=other-user&month=2026-06");
    const res = await GET(req);

    expect(res.status).toBe(403);
  });

  test("allows admin to query any user", async () => {
    authenticateRequest.mockResolvedValue({ uid: "admin-1", role: "admin" });

    const req = mockRequest("http://localhost/api/attendance/heatmap?userId=student-42&month=2026-06");
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(mockCollection.find).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "student-42" })
    );
  });

  test("allows teacher to query any user", async () => {
    authenticateRequest.mockResolvedValue({ uid: "teacher-1", role: "teacher" });

    const req = mockRequest("http://localhost/api/attendance/heatmap?userId=student-42&month=2026-06");
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(mockCollection.find).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "student-42" })
    );
  });

  test("allows student to query own data with explicit userId", async () => {
    authenticateRequest.mockResolvedValue({ uid: "student-1", role: "student" });

    const req = mockRequest("http://localhost/api/attendance/heatmap?userId=student-1&month=2026-06");
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(mockCollection.find).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "student-1" })
    );
  });

  test("returns empty array when month is missing", async () => {
    authenticateRequest.mockResolvedValue({ uid: "student-1", role: "student" });

    const req = mockRequest("http://localhost/api/attendance/heatmap");
    const res = await GET(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.attendance).toEqual([]);
  });
});
