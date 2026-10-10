import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import routes from './src/data/routes.json'

export default defineConfig({
  base: '/bkwgroep-preview/',
  build: { cssCodeSplit: false },
  plugins: [react(), {
    name: 'preview-pages-directories',
    // Mirror GitHub Pages directory redirects locally. Vite's SPA fallback otherwise
    // serves home HTML to a slashless service URL, causing a hydration mismatch.
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url || '/', 'http://localhost')
        const base = server.config.base
        if (!url.pathname.startsWith(base)) return next()
        const route = url.pathname.slice(base.length)
        if (route && Object.hasOwn(routes, route) && route !== '404') {
          res.writeHead(301, { Location: `${url.pathname}/${url.search}` })
          return res.end()
        }
        if (!route.includes('.') && route && (route.replace(/\/$/, '') === '404' || !Object.hasOwn(routes, route.replace(/\/$/, '')))) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
          return res.end(readFileSync(resolve(server.config.root, server.config.build.outDir, '404.html')))
        }
        next()
      })
    },
  }],
})
