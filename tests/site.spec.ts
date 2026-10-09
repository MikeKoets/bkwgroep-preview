import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  ['', 'Professioneel onderhoud zonder verrassingen'],
  ['onderhoud', 'Professioneel woningonderhoud'],
  ['slotenservice', 'Slotenservice'],
  ['isolatie', 'Isolatie voor een comfortabeler pand'],
  ['zakelijk', 'Zakelijk onderhoud en isolatie'],
  ['contact', 'Contact opnemen met BKW Groep'],
] as const

for (const [path, heading] of routes) {
  test(`route /${path || ''} renders its primary content`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
    await expect(page.locator('img[src*="assets/"]')).not.toHaveCount(0)
  })
}

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`homepage has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 900 })
    await page.goto('')
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }))
    expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport + 1)
  })
}

test('mobile navigation opens, navigates and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('')
  await page.getByRole('button', { name: 'Menu openen' }).click()
  await expect(page.getByRole('dialog', { name: 'Mobiele navigatie' })).toBeVisible()
  await page.getByRole('navigation', { name: 'Mobiele hoofdnavigatie' }).getByRole('link', { name: 'Isolatie' }).click()
  await expect(page).toHaveURL(/\/isolatie$/)
  await expect(page.getByRole('dialog', { name: 'Mobiele navigatie' })).toHaveCount(0)
})

test('contact preview does not submit a request', async ({ page }) => {
  await page.goto('contact')
  const requests: string[] = []
  page.on('request', (request) => requests.push(request.url()))
  await page.getByLabel('Naam').fill('Preview bezoeker')
  await page.getByLabel('E-mailadres').fill('preview@example.com')
  await page.getByLabel('Uw vraag').fill('Alleen een test.')
  await page.getByRole('button', { name: 'Demo controleren' }).click()
  await expect(page.getByRole('status')).toContainText('niets verzonden of opgeslagen')
  expect(requests).toEqual([])
})

for (const path of ['', 'onderhoud', 'contact']) {
  test(`has no serious accessibility violations at /${path}`, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious')
    expect(blocking).toEqual([])
  })
}

test('captures durable presentation screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('')
  await page.screenshot({ path: 'docs/screenshots/home-desktop.png', fullPage: true })
  await page.goto('onderhoud')
  await page.screenshot({ path: 'docs/screenshots/onderhoud-desktop.png', fullPage: true })
  await page.goto('contact')
  await page.screenshot({ path: 'docs/screenshots/contact-desktop.png', fullPage: true })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('')
  await page.screenshot({ path: 'docs/screenshots/home-mobile.png', fullPage: true })
  await page.goto('onderhoud')
  await page.screenshot({ path: 'docs/screenshots/onderhoud-mobile.png', fullPage: true })
})
