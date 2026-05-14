import { test } from "@playwright/test"
import { loginAsPrimaryUser } from "./helpers/auth"
import { assertCorePageHealth, clickVisibleButtons, visitInternalLinks } from "./helpers/interactions"

test.describe("Site Interaction Sweep", () => {
  test("sweeps internal links and visible buttons across core routes", async ({ page }) => {
    await loginAsPrimaryUser(page)

    const sweepRoutes = [
      "/",
      "/about",
      "/services",
      "/assessment",
      "/dashboard",
      "/dashboard/appointments",
      "/dashboard/payments",
      "/dashboard/settings",
      "/admin/overview",
      "/admin/users",
      "/admin/assessments",
      "/admin/operations",
      "/admin/payments",
      "/admin/settings",
    ]

    for (const route of sweepRoutes) {
      await page.goto(route)
      await assertCorePageHealth(page)
      await visitInternalLinks(page, 10)
      await page.goto(route)
      await clickVisibleButtons(page, { maxButtons: 25 })
    }
  })
})
