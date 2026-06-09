import { describe, expect, test } from "vitest";
import {
  generateCsrfToken,
  getCsrfHeaderValue,
  validateCsrfRequest,
  CSRF_HEADER_NAME,
} from "../csrf";

describe("CSRF Helpers", () => {
  describe("generateCsrfToken", () => {
    test("generates a random hexadecimal string of correct length", () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      expect(token1).toHaveLength(64); // 32 bytes to hex
      expect(token2).toHaveLength(64);
      expect(token1).not.toBe(token2);
    });
  });

  describe("getCsrfHeaderValue", () => {
    test("handles null or undefined headers", () => {
      expect(getCsrfHeaderValue(null)).toBeNull();
      expect(getCsrfHeaderValue(undefined)).toBeNull();
    });

    test("reads from Fetch Headers object case-insensitively", () => {
      const headers1 = new Headers();
      headers1.set("x-csrf-token", "token-a");
      expect(getCsrfHeaderValue(headers1)).toBe("token-a");

      const headers2 = new Headers();
      headers2.set("X-CSRF-Token", "token-b");
      expect(getCsrfHeaderValue(headers2)).toBe("token-b");

      const headers3 = new Headers();
      headers3.set("X-XSRF-TOKEN", "token-c");
      expect(getCsrfHeaderValue(headers3)).toBe("token-c");

      const headers4 = new Headers();
      headers4.set("X-CSRFToken", "token-d");
      expect(getCsrfHeaderValue(headers4)).toBe("token-d");
    });

    test("reads from plain object headers case-insensitively", () => {
      expect(getCsrfHeaderValue({ "x-csrf-token": "token-1" })).toBe("token-1");
      expect(getCsrfHeaderValue({ "X-CSRF-Token": "token-2" })).toBe("token-2");
      expect(getCsrfHeaderValue({ "X-XSRF-TOKEN": "token-3" })).toBe("token-3");
      expect(getCsrfHeaderValue({ "X-CSRFToken": "token-4" })).toBe("token-4");
    });
  });

  describe("validateCsrfRequest", () => {
    const mockCookieStore = (value) => ({
      get: (name) => {
        if (name === "csrfToken") return { value };
        return null;
      },
    });

    test("ignores safe HTTP methods", () => {
      const req = {
        method: "GET",
        headers: new Headers(),
        cookies: mockCookieStore(null),
      };
      // Should not throw even with missing token/cookies
      expect(() => validateCsrfRequest(req)).not.toThrow();
    });

    test("succeeds with matching cookie and canonical header", () => {
      const req = {
        method: "POST",
        headers: new Headers({ "x-csrf-token": "valid-token" }),
        cookies: mockCookieStore("valid-token"),
      };
      expect(() => validateCsrfRequest(req)).not.toThrow();
    });

    test("succeeds with matching cookie and fallback header name", () => {
      const req = {
        method: "POST",
        headers: new Headers({ "X-XSRF-TOKEN": "valid-token" }),
        cookies: mockCookieStore("valid-token"),
      };
      expect(() => validateCsrfRequest(req)).not.toThrow();

      const req2 = {
        method: "PUT",
        headers: new Headers({ "X-CSRFToken": "valid-token" }),
        cookies: mockCookieStore("valid-token"),
      };
      expect(() => validateCsrfRequest(req2)).not.toThrow();
    });

    test("normalizes tokens with quoting and whitespaces", () => {
      const req = {
        method: "POST",
        headers: new Headers({ "x-csrf-token": ' "valid-token" ' }),
        cookies: mockCookieStore("valid-token"),
      };
      expect(() => validateCsrfRequest(req)).not.toThrow();
    });

    test("throws when CSRF cookie is missing", () => {
      const req = {
        method: "POST",
        headers: new Headers({ "x-csrf-token": "valid-token" }),
        cookies: mockCookieStore(null),
      };
      expect(() => validateCsrfRequest(req)).toThrow("Forbidden: missing CSRF cookie");
    });

    test("throws when CSRF header is missing", () => {
      const req = {
        method: "POST",
        headers: new Headers(),
        cookies: mockCookieStore("valid-token"),
      };
      expect(() => validateCsrfRequest(req)).toThrow("Forbidden: missing CSRF header (x-csrf-token)");
    });

    test("throws when tokens mismatch", () => {
      const req = {
        method: "POST",
        headers: new Headers({ "x-csrf-token": "token-xyz" }),
        cookies: mockCookieStore("token-abc"),
      };
      expect(() => validateCsrfRequest(req)).toThrow("Forbidden: invalid CSRF token (mismatch)");
    });
  });
});
