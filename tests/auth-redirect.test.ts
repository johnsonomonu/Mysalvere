import { describe, expect, it } from "vitest"
import { getSafeRedirectPath } from "@/lib/auth/redirect"

describe("getSafeRedirectPath", () => {
  it("falls back when redirect is missing", () => {
    expect(getSafeRedirectPath(null)).toBe("/dashboard")
  })

  it("falls back when redirect is an absolute URL-like path", () => {
    expect(getSafeRedirectPath("//evil.com/steal")).toBe("/dashboard")
  })

  it("accepts in-app paths", () => {
    expect(getSafeRedirectPath("/dashboard/settings")).toBe("/dashboard/settings")
  })
})
