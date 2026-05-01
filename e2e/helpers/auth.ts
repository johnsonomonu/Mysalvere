import { expect, type Page } from "@playwright/test"

export const E2E_EMAIL = process.env.E2E_EMAIL ?? "timothydivine9@gmail.com"
export const E2E_PASSWORD = process.env.E2E_PASSWORD ?? "aabBbcc12345$"

export async function loginAsPrimaryUser(page: Page): Promise<void> {
  await page.goto("/auth/login")

  await page.getByLabel("Email address").fill(E2E_EMAIL)
  await page.getByLabel("Password").fill(E2E_PASSWORD)
  await page.getByRole("button", { name: "Sign in" }).click()

  await expect(page).toHaveURL(/\/(admin\/overview|dashboard)(\?.*)?$/)
}
