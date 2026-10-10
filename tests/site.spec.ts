import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  ['', 'Vakwerk voor woning & vastgoed.'],
  ['onderhoud', 'Professioneel woningonderhoud'],
  ['slotenservice', 'Slotenservice'],
  ['isolatie', 'Isolatie voor een comfortabeler pand'],
  ['zakelijk', 'Zakelijk onderhoud en isolatie'],
  ['contact', 'Contact opnemen met BKW Groep'],
] as const

for (const [path, heading] of routes) {
  test(`route /${path || ''} renders its primary content`, async ({ page }) => {
    await page.goto(path)
    await expect(
      page.getByRole('heading', { level: 1, name: heading }),
    ).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/,
    )
    await expect(page.locator('img[src*="assets/"]')).not.toHaveCount(0)
  })
}

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`homepage has no horizontal overflow at ${width}px`, async ({
    page,
  }) => {
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
  await expect(
    page.getByRole('dialog', { name: 'Mobiele navigatie' }),
  ).toBeVisible()
  await page
    .getByRole('navigation', { name: 'Mobiele hoofdnavigatie' })
    .getByRole('link', { name: 'Isolatie' })
    .click()
  await expect(page).toHaveURL(/\/isolatie\/$/)
  await expect(
    page.getByRole('dialog', { name: 'Mobiele navigatie' }),
  ).toHaveCount(0)
})

test('contact preview does not submit a request', async ({ page }) => {
  await page.goto('contact')
  const requests: string[] = []
  page.on('request', (request) => {
    if (
      request.method() !== 'GET' ||
      ['fetch', 'xhr', 'document'].includes(request.resourceType())
    )
      requests.push(request.url())
  })
  await page.getByLabel('Naam').fill('Preview bezoeker')
  await page.getByLabel('E-mailadres').fill('preview@example.com')
  await page.getByLabel('Uw vraag').fill('Alleen een test.')
  await page.getByRole('button', { name: 'Demo controleren' }).click()
  await expect(page.getByRole('status')).toContainText(
    'niets verzonden of opgeslagen',
  )
  expect(requests).toEqual([])
})

for (const path of ['', 'onderhoud', 'contact']) {
  test(`has no serious accessibility violations at /${path}`, async ({
    page,
  }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter(
      ({ impact }) => impact === 'critical' || impact === 'serious',
    )
    expect(blocking).toEqual([])
  })
}

test('captures durable presentation screenshots', async ({ page }, testInfo) => {
  const screenshotRoot = process.env.BKW_SCREENSHOT_DIR || 'docs/v3/after'
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('')
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'))
    await document.fonts.ready
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    )
  })
  await page.screenshot({
    path: `${screenshotRoot}/${testInfo.project.name}/home-desktop.png`,
    fullPage: true,
  })
  await page.goto('onderhoud')
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'))
    await document.fonts.ready
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    )
  })
  await page.screenshot({
    path: `${screenshotRoot}/${testInfo.project.name}/onderhoud-desktop.png`,
    fullPage: true,
  })
  await page.goto('contact')
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'))
    await document.fonts.ready
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    )
  })
  await page.screenshot({
    path: `${screenshotRoot}/${testInfo.project.name}/contact-desktop.png`,
    fullPage: true,
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('')
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'))
    await document.fonts.ready
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    )
  })
  await page.screenshot({
    path: `${screenshotRoot}/${testInfo.project.name}/home-mobile.png`,
    fullPage: true,
  })
  await page.goto('onderhoud')
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'))
    await document.fonts.ready
    await Promise.all(
      [...document.images].map((i) => i.decode().catch(() => {})),
    )
  })
  await page.screenshot({
    path: `${screenshotRoot}/${testInfo.project.name}/onderhoud-mobile.png`,
    fullPage: true,
  })
})

for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
  test(`all pages have loaded photos, no clipped content or browser errors at ${width}px`, async ({
    page,
  }) => {
    test.setTimeout(60000)
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (event) => {
      if (event.type() === 'error')
        errors.push(`${event.text()} ${event.location().url}`)
    })
    for (const [path] of routes) {
      const response = await page.goto(path)
      expect(response?.ok()).toBe(true)
      await page.evaluate(async () => {
        document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'))
        await document.fonts.ready
        await Promise.all([...document.images].map((i) => i.decode()))
      })
      const checks = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        broken: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
        outside: [
          ...document.querySelectorAll<HTMLElement>(
            'main a, main h1, main h2, main p, main img, footer a',
          ),
        ]
          .filter((el) => {
            const box = el.getBoundingClientRect()
            return (
              box.width > 0 && (box.right > innerWidth + 1 || box.left < -1)
            )
          })
          .map((el) => ({ text: el.textContent, class: el.className })),
      }))
      expect(checks, `${path || '/'} at ${width}`).toEqual({
        overflow: 0,
        broken: [],
        outside: [],
      })
    }
    expect(errors).toEqual([])
  })
}

test('mobile menu traps keyboard focus, Escape restores it, and background remains inactive', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('')
  await page.getByRole('button', { name: 'Menu openen' }).click()
  const dialog = page.getByRole('dialog', { name: 'Mobiele navigatie' })
  await expect(dialog).toHaveAttribute('aria-modal', 'true')
  await expect(
    dialog.getByRole('button', { name: 'Menu sluiten' }),
  ).toBeFocused()
  await expect(page.locator('.site-shell')).toHaveJSProperty('inert', true)
  await page.keyboard.press('Shift+Tab')
  await expect(
    dialog.getByRole('link', { name: 'Contact opnemen', exact: true }),
  ).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(
    dialog.getByRole('button', { name: 'Menu sluiten' }),
  ).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Menu openen' })).toBeFocused()
  await expect(page.locator('.site-shell')).toHaveJSProperty('inert', false)
})

for (const path of ['slotenservice', 'isolatie', 'zakelijk']) {
  test(`service page /${path} has no serious accessibility violations`, async ({
    page,
  }) => {
    await page.goto(path)
    const audit = await new AxeBuilder({ page }).analyze()
    expect(
      audit.violations.filter((v) =>
        ['serious', 'critical'].includes(v.impact ?? ''),
      ),
    ).toEqual([])
  })
}

test('review corrections: readable mobile cards, honest contact actions and unobscured hero', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('')
  expect(
    await page
      .locator('.service-card p')
      .first()
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(15)
  expect(
    await page
      .locator('.service-card__body a')
      .first()
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
  ).toBeGreaterThanOrEqual(14)
  await expect(page.locator('.home-hero img')).toHaveAttribute('alt', /BKW-medewerkers/)
  await expect(page.locator('.home-hero figcaption')).toHaveCount(0)
  await expect(page.locator('.home-hero .button--primary')).toHaveAttribute('href', /\/contact\/$/)
  await page.goto('isolatie')
  await expect(
    page.getByRole('link', { name: 'Bespreek dakisolatie', exact: true }),
  ).toHaveAttribute('href', /\/contact\/$/)
  await expect(
    page.getByRole('link', { name: /Meer over dakisolatie/ }),
  ).toHaveCount(0)
  await page.goto('slotenservice')
  await expect(
    page.getByRole('link', { name: 'Bel voor hulp', exact: true }),
  ).toHaveAttribute('href', 'tel:+31850606663')
  await page.getByRole('button', { name: 'Menu openen' }).click()
  const audit = await new AxeBuilder({ page }).analyze()
  expect(audit.violations).toEqual([])
  const focused = page
    .getByRole('dialog')
    .getByRole('button', { name: 'Menu sluiten' })
  await page.keyboard.press('Tab')
  await page.keyboard.press('Shift+Tab')
  await expect(focused).toBeFocused()
  await expect(focused).toHaveCSS('outline-color', 'rgb(255, 171, 131)')
})


test('mobile drawer opens from the left and its right backdrop closes it without moving the page', async ({ page }) => {
  for (const width of [320, 375, 390, 430, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('')
    const trigger = page.getByRole('button', { name: 'Menu openen' })
    await expect(trigger).toHaveAttribute('data-interactive', 'true')
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(() => scrollTo({ top: 500, behavior: 'instant' }))
    const triggerBox = await trigger.boundingBox()
    // Click its visible sticky position: locator.click auto-scrolls sticky controls.
    await page.mouse.click(triggerBox!.x + triggerBox!.width / 2, triggerBox!.y + triggerBox!.height / 2)
    const dialog = page.getByRole('dialog', { name: 'Mobiele navigatie' })
    await expect.poll(async () => (await dialog.boundingBox())!.x).toBe(0)
    const box = await dialog.boundingBox()
    expect(box!.width).toBeCloseTo(Math.min(width * 0.88, 390), 0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1)
    await page.mouse.click(width - 8, 100)
    await expect(dialog).toHaveCount(0)
    await expect(page.locator('.site-shell')).toHaveJSProperty('inert', false)
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(500)
  }
})
