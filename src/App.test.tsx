import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from './App'

const routes = [
  ['/', /professioneel onderhoud zonder verrassingen/i],
  ['/onderhoud', /professioneel woningonderhoud/i],
  ['/slotenservice', /^slotenservice$/i],
  ['/isolatie', /isolatie voor een comfortabeler pand/i],
  ['/zakelijk', /zakelijk onderhoud en isolatie/i],
  ['/contact', /contact opnemen met bkw groep/i],
] as const

describe('BKW preview routes', () => {
  it.each(routes)('renders %s with its own page heading', (path, heading) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  it('shows a clear not-found page for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/bestaat-niet']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: /pagina niet gevonden/i })).toBeInTheDocument()
  })
})

describe('preview indexing safety', () => {
  it('ships permanent noindex metadata in the document shell', () => {
    const indexPath = join(process.cwd(), 'index.html')
    expect(existsSync(indexPath)).toBe(true)
    const html = existsSync(indexPath) ? readFileSync(indexPath, 'utf8') : ''

    expect(html).toContain('name="robots"')
    expect(html).toMatch(/noindex\s*,\s*nofollow\s*,\s*noarchive/i)
    expect(html).not.toContain('rel="canonical"')
  })
})
