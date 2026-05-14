import { test, expect } from "@playwright/test"
import { loginAsPrimaryUser } from "./helpers/auth"
import { assertCorePageHealth, clickVisibleButtons } from "./helpers/interactions"

test.describe("Admin Dashboard E2E", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsPrimaryUser(page)
    await page.goto("/admin/overview")
  })

  test("admin routes are reachable and stable", async ({ page }) => {
    const adminRoutes = [
      "/admin/overview",
      "/admin/users",
      "/admin/assessments",
      "/admin/operations",
      "/admin/payments",
      "/admin/settings",
    ]

    for (const route of adminRoutes) {
      await page.goto(route)
      await assertCorePageHealth(page)
      await expect(page.locator("h1, h2").first()).toBeVisible()
    }
  })

  test("admin table interactions and controls respond", async ({ page }) => {
    await page.goto("/admin/users")
    await assertCorePageHealth(page)

    const searchInput = page.getByPlaceholder(/search users/i)
    await searchInput.fill("timothy")

    const roleSelect = page.locator("select").first()
    await expect(roleSelect).toBeVisible()

    await page.goto("/admin/assessments")
    await assertCorePageHealth(page)

    const statusSelect = page.locator("select").first()
    await expect(statusSelect).toBeVisible()

    await page.goto("/admin/overview")
    await clickVisibleButtons(page, { maxButtons: 25 })
  })

  test("admin payment and operations pages show telemetry", async ({ page }) => {
    await page.goto("/admin/payments")
    await expect(page.getByText(/payment operations/i)).toBeVisible()

    await page.goto("/admin/operations")
    await expect(page.getByText(/system monitoring/i)).toBeVisible()
  })
})
