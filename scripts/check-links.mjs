import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const base = 'http://127.0.0.1:4174/bkwgroep-preview/'
const routes = ['', 'onderhoud', 'slotenservice', 'isolatie', 'zakelijk', 'contact']
const server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4174'], {
  stdio: 'ignore',
})

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(base)
      if (response.ok) return
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error('Previewserver startte niet op tijd.')
}

try {
  if (!existsSync('dist/index.html') || !existsSync('dist/404.html')) {
    throw new Error('Build ontbreekt. Voer eerst npm run build uit.')
  }
  await waitForServer()
  for (const route of routes) {
    const response = await fetch(`${base}${route}`)
    if (!response.ok) throw new Error(`Route ${route || '/'} gaf HTTP ${response.status}`)
  }
  const html = readFileSync('dist/index.html', 'utf8')
  const assets = [...html.matchAll(/(?:src|href)="([^"]+\/assets\/[^"]+)"/g)].map((match) => match[1])
  for (const asset of assets) {
    const url = new URL(asset, base)
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Asset ${url.pathname} gaf HTTP ${response.status}`)
  }
  console.log(`Linkcontrole geslaagd: ${routes.length} routes en ${assets.length} build-assets.`)
} finally {
  server.kill('SIGTERM')
}
