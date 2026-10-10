import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { render } from '../node_modules/.cache/bkw-ssr/entry-server.js'
const builtTemplate = readFileSync('dist/index.html', 'utf8')
// The complete stylesheet is only ~26kB (~6kB gzip). Inlining it removes a
// render-blocking request on cold mobile visits without a CSS runtime.
const stylesheet = builtTemplate.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
if (!stylesheet) throw new Error('Built stylesheet missing')
const cssPath = `dist/${stylesheet[1].replace('/bkwgroep-preview/', '')}`
const css = readFileSync(cssPath, 'utf8')
const template = builtTemplate.replace(stylesheet[0], '').replace(/<script type="module"/, '<script type="module" fetchpriority="low"')
const routes = JSON.parse(readFileSync('src/data/routes.json', 'utf8'))
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
for (const [route, metadata] of Object.entries(routes)) {
  const markup = render(route ? `/${route}/` : '/')
  // React19 discovers high-priority responsive image preloads during server rendering.
  const preloads = [...markup.matchAll(/<link\b[^>]+rel="preload"[^>]*\/>/g)].map(match => match[0]).filter(tag => /fetchPriority="high"/i.test(tag)).join('')
  const content = markup.replace(/<link\b[^>]+rel="preload"[^>]*\/>/g, '')
  const tags = `<meta property="og:title" content="${escape(metadata.title)}"/><meta property="og:description" content="${escape(metadata.description)}"/><meta property="og:type" content="website"/><meta property="og:image" content="https://mikekoets.github.io/bkwgroep-preview/assets/og-bkw.jpg"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:alt" content="BKW Groep — onderhoud, isolatie en slotenservice"/>`
  const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(metadata.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(metadata.description)}"/>`)
    .replace(/(<meta charset[^>]+>)/, `$1<style>${css}</style>${preloads}`)
    .replace('</head>', `${tags}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`)
  const directory = route && route !== '404' ? `dist/${route}` : 'dist'
  mkdirSync(directory, { recursive: true })
  writeFileSync(`${directory}/${route === '404' ? '404.html' : 'index.html'}`, html)
}
console.log('Prerendered 6 complete routes + branded404, metadata and responsive image preloads')
