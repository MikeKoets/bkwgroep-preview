import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

describe('shared site shell', () => {
  it('renders the brand, primary navigation and direct phone action', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getAllByRole('link', { name: /bkw groep home/i })).not.toHaveLength(0)
    expect(screen.getByRole('navigation', { name: /hoofdnavigatie/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /bel 085 060 66 63/i })).toHaveAttribute(
      'href',
      'tel:+31850606663',
    )
  })

  it('marks the current navigation destination', () => {
    render(
      <MemoryRouter initialEntries={['/onderhoud']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /onderhoud/i, current: 'page' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('opens the mobile menu and closes it with Escape', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    const menuButton = screen.getByRole('button', { name: /menu openen/i })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('dialog', { name: /mobiele navigatie/i })).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: /mobiele navigatie/i })).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
  })

  it('closes the mobile drawer after navigation at a 320px viewport', async () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 320 })
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /menu openen/i }))
    const drawer = screen.getByRole('dialog', { name: /mobiele navigatie/i })
    await user.click(within(drawer).getByRole('link', { name: /^onderhoud$/i }))

    expect(screen.queryByRole('dialog', { name: /mobiele navigatie/i })).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
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
