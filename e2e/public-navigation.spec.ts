import { test, expect } from "@playwright/test"
import { assertCorePageHealth, clickVisibleButtons, visitInternalLinks } from "./helpers/interactions"

test.describe("Public Site Navigation", () => {
  test("public routes and key links are accessible", async ({ page }) => {
    await page.goto("/")
    await assertCorePageHealth(page)

    await expect(page.getByRole("link", { name: /about/i }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: /services/i }).first()).toBeVisible()

    await visitInternalLinks(page, 20)
  })

  test("public pages support broad interaction sweep", async ({ page }) => {
    const routes = ["/", "/about", "/services", "/assessment", "/auth/login"]

    for (const route of routes) {
      await page.goto(route)
      await assertCorePageHealth(page)
      await clickVisibleButtons(page, { maxButtons: 20 })
    }
  })
})
