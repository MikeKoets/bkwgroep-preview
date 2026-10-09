import { expect, test, type Locator, type Page } from '@playwright/test'

// Playwright locator.click calls scrollIntoView on a sticky header before clicking,
// changing the very scroll position being tested. Use an actual pointer at its visible coordinates.
async function clickVisible(page: Page, target: Locator) {
  const rect = await target.boundingBox()
  expect(rect).not.toBeNull()
  if (!rect) throw new Error('Control is not rendered')
  expect(rect.y).toBeGreaterThanOrEqual(0)
  await page.mouse.click(rect.x + rect.width / 2, rect.y + rect.height / 2)
}

test('internal page links use directory URLs so Pages refresh does not discard history state', async ({
  page,
}) => {
  for (const path of [
    '',
    'onderhoud/',
    'slotenservice/',
    'isolatie/',
    'zakelijk/',
    'contact/',
  ]) {
    await page.goto(path)
    const nonCanonical = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLAnchorElement>('a[href]')]
        .map((a) => new URL(a.href))
        .filter(
          (url) =>
            url.origin === location.origin &&
            url.pathname.startsWith('/bkwgroep-preview') &&
            !url.pathname.endsWith('/'),
        )
        .map((url) => url.pathname),
    )
    expect(
      nonCanonical,
      `${path || '/'} must avoid GitHub Pages' slash redirect`,
    ).toEqual([])
  }
})

test('new page navigation starts at the top', async ({ page }) => {
  await page.goto('')
  await page.evaluate(() => window.scrollTo({ top: 1250, behavior: 'instant' }))
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(1000)
  await clickVisible(
    page,
    page
      .getByRole('navigation', { name: 'Hoofdnavigatie', exact: true })
      .getByRole('link', { name: 'Onderhoud', exact: true }),
  )
  await expect(page).toHaveURL(/\/onderhoud\/$/)
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
})

for (const width of [390, 1440]) {
  test(`history restores each page's position and refresh at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('')
    await page.evaluate(() => scrollTo({ top: 950, behavior: 'instant' }))
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(950)
    if (width < 1000) {
      await clickVisible(
        page,
        page.getByRole('button', { name: 'Menu openen' }),
      )
      await page
        .getByRole('navigation', { name: 'Mobiele hoofdnavigatie' })
        .getByRole('link', { name: 'Onderhoud', exact: true })
        .click()
    } else {
      await clickVisible(
        page,
        page
          .getByRole('navigation', { name: 'Hoofdnavigatie', exact: true })
          .getByRole('link', { name: 'Onderhoud', exact: true }),
      )
    }
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
    await page.evaluate(() => scrollTo({ top: 650, behavior: 'instant' }))
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(650)
    await page.goBack()
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(950)
    await page.goForward()
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(650)
    await page.reload()
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(650)
  })
}

test('same-page, cross-page and direct anchors account for the sticky header', async ({
  page,
}) => {
  await page.goto('')
  await page.getByRole('link', { name: 'Onze diensten', exact: true }).click()
  await expect(page).toHaveURL(/#diensten$/)
  await expect
    .poll(() =>
      page
        .locator('#diensten')
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(120)
  await clickVisible(
    page,
    page
      .getByRole('navigation', { name: 'Hoofdnavigatie', exact: true })
      .getByRole('link', { name: 'Onderhoud', exact: true }),
  )
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
  await page
    .getByRole('link', { name: 'Bekijk werkzaamheden', exact: true })
    .click()
  await expect(page).toHaveURL(/#werkzaamheden$/)
  await expect
    .poll(() =>
      page
        .locator('#werkzaamheden')
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(120)
  await page
    .getByRole('contentinfo')
    .getByRole('link', { name: 'Alle diensten', exact: true })
    .click()
  await expect(page).toHaveURL(/\/bkwgroep-preview\/?#diensten$/)
  await expect
    .poll(() =>
      page
        .locator('#diensten')
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(120)
  await page.goto('onderhoud#werkzaamheden')
  await expect
    .poll(() =>
      page
        .locator('#werkzaamheden')
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(120)
  await page.reload()
  await expect
    .poll(() =>
      page
        .locator('#werkzaamheden')
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(120)
})
