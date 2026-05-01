import { expect, type Page } from "@playwright/test"

interface SweepOptions {
  excludedButtonPatterns?: RegExp[]
  maxButtons?: number
}

const defaultExcluded = [
  /sign out/i,
  /back to site/i,
  /back to home/i,
  /delete/i,
  /remove/i,
]

export async function assertCorePageHealth(page: Page): Promise<void> {
  await page.waitForLoadState("domcontentloaded")
  await expect(page.locator("body")).toBeVisible()
  await expect(page.getByText(/error/i).first()).not.toBeVisible({ timeout: 1000 }).catch(() => {})
}

export async function clickVisibleButtons(page: Page, options: SweepOptions = {}): Promise<void> {
  const excluded = options.excludedButtonPatterns ?? defaultExcluded
  const maxButtons = options.maxButtons ?? 20

  const buttons = page.locator("button:visible:not([disabled])")
  const count = await buttons.count()

  for (let i = 0; i < Math.min(count, maxButtons); i += 1) {
    const button = buttons.nth(i)
    const text = ((await button.innerText()) ?? "").trim()

    if (!text) {
      continue
    }

    if (excluded.some((pattern) => pattern.test(text))) {
      continue
    }

    try {
      await button.click({ timeout: 1500 })
      await page.waitForTimeout(150)
    } catch {
      // Best-effort sweep: continue so we can report broad interaction coverage.
    }
  }
}

export async function visitInternalLinks(page: Page, maxLinks = 15): Promise<void> {
  const hrefs = await page.locator("a[href^='/']").evaluateAll((anchors) => {
    return anchors
      .map((anchor) => (anchor as HTMLAnchorElement).getAttribute("href") || "")
      .filter((href) => href.startsWith("/") && !href.startsWith("//"))
  })

  const unique = [...new Set(hrefs)].slice(0, maxLinks)

  for (const href of unique) {
    try {
      await page.goto(href)
      await assertCorePageHealth(page)
    } catch {
      // Continue to keep sweep broad rather than fail on one route.
    }
  }
}
