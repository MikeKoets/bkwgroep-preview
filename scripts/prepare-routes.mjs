import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
// Actual static directories avoid GitHub Pages' missing-route 404 redirect for all core routes.
const html = readFileSync('dist/index.html', 'utf8')
for (const route of [
  'onderhoud',
  'slotenservice',
  'isolatie',
  'zakelijk',
  'contact',
]) {
  mkdirSync(`dist/${route}`, { recursive: true })
  writeFileSync(`dist/${route}/index.html`, html)
}
console.log('Prepared 5 directly refreshable Pages routes')
