import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { chromium } from '@playwright/test'

const base = 'https://mikekoets.github.io/bkwgroep-preview/'
const evidenceDir = process.env.BKW_EVIDENCE_DIR || 'docs/v3/live'
const report = { checkedAt: new Date().toISOString(), source: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), files: [], captures: [] }
const files = []
async function walk(path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const file = `${path}/${entry.name}`
    if (entry.isDirectory()) await walk(file)
    else files.push(file)
  }
}
await walk('dist')
await mkdir(evidenceDir, { recursive: true })
for (const file of files.sort()) {
  const relative = file.slice(5)
  const response = await fetch(base + relative)
  const actual = Buffer.from(await response.arrayBuffer())
  const expected = await readFile(file)
  const pass = response.ok && actual.equals(expected)
  report.files.push({ path: relative, status: response.status, bytes: actual.length, sha256: createHash('sha256').update(actual).digest('hex'), pass })
  if (!pass) throw new Error(`Published file differs: ${relative} (${response.status})`)
}
const browser = await chromium.launch({ channel: 'chrome' })
try {
  const page = await browser.newPage()
  for (const width of [390, 1440]) for (const route of ['', 'onderhoud/', 'slotenservice/', 'isolatie/', 'zakelijk/', 'contact/']) {
    await page.setViewportSize({ width, height: 900 })
    const response = await page.goto(base + route)
    if (response.status() !== 200) throw new Error(`Route status ${route}`)
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach(image => { image.loading = 'eager' })
      await document.fonts.ready
      await Promise.all([...document.images].map(image => image.decode()))
    })
    const name = `${route.replace('/', '') || 'home'}-${width}.png`
    await page.screenshot({ path: `${evidenceDir}/${name}`, fullPage: true })
    report.captures.push({ route: route || '/', width, status: response.status(), screenshot: name, overflow: await page.evaluate(() => document.documentElement.scrollWidth - innerWidth) })
  }
  const response = await page.goto(base + 'niet-bestaand-v3/')
  report.notFound = { status: response.status(), heading: await page.locator('h1').innerText() }
  if (response.status() !== 404 || !report.notFound.heading) throw new Error('Branded Pages 404 failed')
} finally { await browser.close() }
report.pass = report.files.every(file => file.pass) && report.captures.every(capture => capture.overflow <= 1)
await writeFile(`${evidenceDir}/published-integrity.json`, JSON.stringify(report, null, 2) + '\n')
console.log(`${report.files.length} exact published files, ${report.captures.length} live screenshots, branded 404: ${report.pass ? 'PASS' : 'FAIL'}`)
if (!report.pass) process.exitCode = 1
