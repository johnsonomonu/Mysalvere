import { beforeEach, describe, expect, it } from "vitest"
import { checkRateLimit, clearRateLimitBuckets } from "@/lib/security/rate-limit"

describe("rate limiting", () => {
  beforeEach(() => {
    clearRateLimitBuckets()
  })

  it("allows requests up to configured max", () => {
    const first = checkRateLimit({ key: "k1", maxRequests: 2, windowMs: 60_000 })
    const second = checkRateLimit({ key: "k1", maxRequests: 2, windowMs: 60_000 })

    expect(first.allowed).toBe(true)
    expect(second.allowed).toBe(true)
  })

  it("blocks requests after the window threshold", () => {
    checkRateLimit({ key: "k2", maxRequests: 1, windowMs: 60_000 })
    const blocked = checkRateLimit({ key: "k2", maxRequests: 1, windowMs: 60_000 })

    expect(blocked.allowed).toBe(false)
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0)
  })
})
