import { test, expect } from "@playwright/test"
import { loginAsPrimaryUser } from "./helpers/auth"
import { assertCorePageHealth, clickVisibleButtons } from "./helpers/interactions"

test.describe("User Dashboard E2E", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsPrimaryUser(page)
  })

  test("dashboard pages render and interactions respond", async ({ page, context }) => {
    await page.goto("/dashboard")

    if (page.url().includes("/admin/overview")) {
      await page.goto("/dashboard/appointments")
    }

    const userRoutes = ["/dashboard", "/dashboard/appointments", "/dashboard/payments", "/dashboard/settings"]

    for (const route of userRoutes) {
      await page.goto(route)
      await assertCorePageHealth(page)
      await clickVisibleButtons(page, { maxButtons: 20 })
    }

    await page.goto("/dashboard/appointments")

    const popupPromise = context.waitForEvent("page", { timeout: 5000 }).catch(() => null)
    await page.getByRole("button", { name: /book/i }).first().click({ timeout: 5000 })
    const popup = await popupPromise

    if (popup) {
      await popup.waitForLoadState("domcontentloaded")
      expect(popup.url()).toContain("flutterwave.com")
      await popup.close()
    }
  })

  test("settings form supports profile and security interactions", async ({ page }) => {
    await page.goto("/dashboard/settings")
    await assertCorePageHealth(page)

    const fullNameInput = page.locator("#fullName")
    await fullNameInput.fill("Timothy Divine E2E")
    await page.getByRole("button", { name: /save profile settings/i }).click()

    await expect(page.getByText(/profile settings saved/i)).toBeVisible()

    const loginEmailInput = page.locator("#loginEmail")
    await expect(loginEmailInput).toHaveValue(/@/)
  })
})
