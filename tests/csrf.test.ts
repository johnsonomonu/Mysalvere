import { describe, expect, it } from "vitest"
import { isValidMutationOrigin } from "@/lib/security/csrf"

function createRequestLike(headers: Record<string, string>) {
  return {
    headers: {
      get(name: string) {
        const key = Object.keys(headers).find((h) => h.toLowerCase() === name.toLowerCase())
        return key ? headers[key] : null
      },
    },
  }
}

describe("isValidMutationOrigin", () => {
  it("allows same-origin requests", () => {
    const request = createRequestLike({
      origin: "https://salvere.com",
      host: "salvere.com",
    })

    expect(isValidMutationOrigin(request)).toBe(true)
  })

  it("rejects mismatched origins without trust config", () => {
    delete process.env.TRUSTED_ORIGINS

    const request = createRequestLike({
      origin: "https://evil.com",
      host: "salvere.com",
    })

    expect(isValidMutationOrigin(request)).toBe(false)
  })
})
