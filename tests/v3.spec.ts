import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home hero shows proposition, primary action and the complete working photograph in a mobile screen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('')
  await page.evaluate(() => document.fonts.ready)
  const photo = await page.locator('.home-hero__photo').boundingBox()
  expect(photo?.y).toBeLessThan(440)
  expect((photo?.y ?? 0) + (photo?.height ?? 0)).toBeLessThanOrEqual(800)
  await expect(page.locator('.home-hero .button--primary')).toBeVisible()
  await expect(page.locator('.mobile-phone')).toHaveAttribute('href', 'tel:+31850606663')
})

test('contact validation identifies each error and focuses the first invalid field without sending data', async ({ page }) => {
  await page.goto('contact/')
  const submissions: string[] = []
  page.on('request', r => { if (r.method() !== 'GET' || ['fetch', 'xhr', 'document'].includes(r.resourceType())) submissions.push(r.url()) })
  await page.getByRole('button', { name: 'Demo controleren' }).click()
  const name = page.getByLabel('Naam', { exact: true })
  await expect(name).toHaveAttribute('aria-invalid', 'true')
  await expect(name).toBeFocused()
  const describedBy = await name.getAttribute('aria-describedby')
  await expect(page.locator(`#${describedBy}`)).toContainText('Vul uw naam in')
  await page.getByLabel('Naam', { exact: true }).fill('Testbezoeker')
  await page.getByLabel('E-mailadres', { exact: true }).fill('niet-geldig')
  await page.getByLabel('Uw vraag', { exact: true }).fill('Synthetische controlevraag')
  await page.getByRole('button', { name: 'Demo controleren' }).click()
  await expect(page.getByLabel('E-mailadres', { exact: true })).toHaveAttribute('aria-invalid', 'true')
  await expect(page.getByLabel('E-mailadres', { exact: true })).toHaveAttribute('inputmode', 'email')
  expect(submissions).toEqual([])
})

test('direct route HTML has unique metadata, matching responsive hero preload and safe preview indexing', async ({ page, request }) => {
  const titles = new Set<string>()
  for (const route of ['', 'onderhoud/', 'slotenservice/', 'isolatie/', 'zakelijk/', 'contact/']) {
    const response = await request.get(route)
    const html = await response.text()
    const title = html.match(/<title>(.*?)<\/title>/)?.[1]
    expect(title).toBeTruthy()
    expect(titles.has(title!)).toBe(false)
    titles.add(title!)
    await page.goto(route)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow, noarchive')
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /bkwgroep-preview\/assets\/og-bkw\.jpg$/)
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0)
    if (route !== 'contact/') {
      const preload = page.locator('link[rel="preload"][as="image"][fetchpriority="high"]')
      const image = page.locator('main img[fetchpriority="high"]').first()
      await expect(preload).toHaveAttribute('imagesrcset', (await image.getAttribute('srcset'))!)
      await expect(preload).toHaveAttribute('imagesizes', (await image.getAttribute('sizes'))!)
    }
  }
})

for (const width of [375, 390, 430]) {
  test(`touch menu and form respect iOS layout requirements at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('contact/')
    for (const input of await page.locator('input, textarea').all()) {
      expect(await input.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16)
    }
    await page.getByRole('button', { name: 'Menu openen' }).click()
    const drawer = page.getByRole('dialog', { name: 'Mobiele navigatie' })
    const box = await drawer.boundingBox()
    expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(844)
    const audit = await new AxeBuilder({ page }).analyze()
    expect(audit.violations.filter(v => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([])
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Menu openen' })).toBeFocused()
    await expect(page.locator('.site-shell')).toHaveJSProperty('inert', false)
  })
}

test('reduced motion removes transitions and missing pages remain branded with a route home', async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('')
  expect(await page.locator('.button--primary').first().evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s')
  const response = await request.get('404.html')
  expect(await response.text()).toContain('Pagina niet gevonden')
  await page.goto('bestaat-niet')
  await expect(page.getByRole('heading', { name: 'Pagina niet gevonden' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Terug naar home' })).toBeVisible()
})

test('prerendered demo cannot submit personal fields before JavaScript hydration', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL })
  const page = await context.newPage()
  await page.goto('contact/')
  await expect(page.getByRole('button', { name: 'Demo controleren' })).toBeDisabled()
  const requests: string[] = []
  page.on('request', r => { if (r.resourceType() === 'document' || r.method() !== 'GET') requests.push(r.url()) })
  await page.getByLabel('Naam', { exact: true }).fill('Synthetische bezoeker')
  await page.getByLabel('E-mailadres', { exact: true }).fill('synthetic@example.com')
  await page.getByLabel('Uw vraag', { exact: true }).fill('Geen echte persoonsgegevens')
  await page.getByLabel('E-mailadres', { exact: true }).press('Enter')
  expect(requests).toEqual([])
  await expect(page).toHaveURL(/\/contact\/$/)
  await context.close()
})

test('a first-frame menu tap and user scroll survive a deliberately delayed interactive bundle', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  let release!: () => void
  const gate = new Promise<void>(resolve => { release = resolve })
  await page.route(/\/assets\/(main|index)-[^/]+\.js$/, async route => { await gate; await route.continue() })
  await page.goto('', { waitUntil: 'commit' })
  await expect(page.locator('footer')).toBeAttached()
  await page.evaluate(() => scrollTo({ top: 950, behavior: 'instant' }))
  const trigger = page.getByRole('button', { name: 'Menu openen' })
  await expect(trigger).toHaveAttribute('data-interactive', 'false')
  const box = await trigger.boundingBox()
  if (!box) throw new Error('Menu control missing in prerendered content')
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(950)
  release()
  await expect(page.getByRole('dialog', { name: 'Mobiele navigatie' })).toBeVisible()
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(950)
  await page.getByRole('navigation', { name: 'Mobiele hoofdnavigatie' }).getByRole('link', { name: 'Onderhoud', exact: true }).click()
  await expect(page).toHaveURL(/\/onderhoud\/$/)
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
  await page.goBack()
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(950)
})
