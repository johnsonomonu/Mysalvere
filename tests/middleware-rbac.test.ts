import { describe, expect, it } from "vitest"
import { hasAdminRole, isAdminPath, isProtectedPath } from "@/lib/supabase/middleware"

describe("middleware route classification", () => {
  it("identifies protected paths", () => {
    expect(isProtectedPath("/dashboard")).toBe(true)
    expect(isProtectedPath("/admin/users")).toBe(true)
    expect(isProtectedPath("/about")).toBe(false)
  })

  it("identifies admin paths", () => {
    expect(isAdminPath("/admin")).toBe(true)
    expect(isAdminPath("/admin/stats")).toBe(true)
    expect(isAdminPath("/dashboard")).toBe(false)
  })
})

describe("RBAC role checks", () => {
  it("allows admin role when profile query succeeds", () => {
    expect(hasAdminRole("ADMIN", null)).toBe(true)
  })

  it("denies non-admin role", () => {
    expect(hasAdminRole("USER", null)).toBe(false)
  })

  it("denies on profile lookup error", () => {
    expect(hasAdminRole("ADMIN", new Error("lookup failed"))).toBe(false)
  })
})
