import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'

const phase = process.argv[2] || 'baseline'
const scope = process.argv[3] || 'both'
const output = `docs/v3/perf-${phase}.json`
const report = { phase, measuredAt: new Date().toISOString(), source: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), runs: [] }
const environments = { live: 'https://mikekoets.github.io/bkwgroep-preview/', local: 'http://127.0.0.1:4175/bkwgroep-preview/' }
// Attest the exact built content, including uncommitted candidate measurements.
async function fingerprint(directory) {
  const hash = createHash('sha256')
  async function walk(path) {
    for (const entry of (await readdir(path, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = `${path}/${entry.name}`
      if (entry.isDirectory()) await walk(file)
      else hash.update(file.replace(/^dist\//, '')).update('\0').update(await readFile(file))
    }
  }
  await walk(directory)
  return hash.digest('hex')
}
report.workingTreeDirty = Boolean(execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim())
report.localBuildSha256 = await fingerprint('dist')
await mkdir('docs/v3', { recursive: true })
await mkdir('/tmp/bkw-v3-lighthouse', { recursive: true })
for (const route of ['', 'onderhoud', 'slotenservice', 'isolatie', 'zakelijk', 'contact']) {
  const html = await readFile(`dist/${route ? `${route}/` : ''}index.html`, 'utf8')
  if (!html.includes('<main') || !html.includes('<h1')) throw new Error(`Prerendered build incomplete: ${route || '/'}`)
}
const chrome = await launch({ chromeFlags: ['--headless=new', '--disable-extensions', '--no-first-run'] })
try {
  for (const [environment, base] of Object.entries(environments)) {
    if (scope !== 'both' && scope !== environment) continue
    for (const route of (process.argv[4] ? process.argv[4].split(',').map(value => value === 'home' ? '' : `${value}/`) : ['', 'onderhoud/', 'slotenservice/', 'isolatie/', 'zakelijk/', 'contact/'])) {
      const { lhr } = await lighthouse(base + route, { port: chrome.port, formFactor: 'mobile', throttlingMethod: 'simulate', onlyCategories: ['performance', 'accessibility', 'best-practices'], output: 'json', logLevel: 'error' })
      if (lhr.runtimeError) throw new Error(JSON.stringify(lhr.runtimeError))
      const metric = key => lhr.audits[key].numericValue
      const run = {
        environment, route: route || '/', finalUrl: lhr.finalDisplayedUrl,
        lighthouseVersion: lhr.lighthouseVersion, fetchTime: lhr.fetchTime, benchmarkIndex: lhr.environment.benchmarkIndex,
        settings: lhr.configSettings, performance: Math.round(lhr.categories.performance.score * 100),
        lcpMs: metric('largest-contentful-paint'), cls: metric('cumulative-layout-shift'), tbtMs: metric('total-blocking-time'),
        fcpMs: metric('first-contentful-paint'), warnings: lhr.runWarnings,
        diagnostics: Object.fromEntries(Object.entries(lhr.audits).filter(([key]) => /lcp|font|image|unused|total-byte|layout-shift/.test(key)).map(([key, audit]) => [key, { score: audit.score, displayValue: audit.displayValue, details: audit.details }]))
      }
      report.runs.push(run)
      await writeFile(`/tmp/bkw-v3-lighthouse/${phase}-${environment}-${route.replace('/', '') || 'home'}.json`, JSON.stringify(lhr))
      await writeFile(output, JSON.stringify(report, null, 2) + '\n')
      console.log(JSON.stringify({ environment, route: run.route, performance: run.performance, lcpMs: Math.round(run.lcpMs), cls: run.cls, tbtMs: Math.round(run.tbtMs) }))
    }
  }
} finally { await chrome.kill() }
