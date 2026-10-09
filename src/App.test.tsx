import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AppRoutes } from './App'

const routes = [
  ['/', /vakwerk voor woning & vastgoed/i],
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

    expect(
      screen.getByRole('heading', { level: 1, name: heading }),
    ).toBeInTheDocument()
  })

  it('shows a clear not-found page for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/bestaat-niet']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: /pagina niet gevonden/i }),
    ).toBeInTheDocument()
  })

  it('sets a unique route title without duplicating the brand', async () => {
    render(
      <MemoryRouter initialEntries={['/onderhoud']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    await waitFor(() =>
      expect(document.title).toBe('Professioneel woningonderhoud | BKW Groep'),
    )
  })
})

describe('shared site shell', () => {
  it('renders the brand, primary navigation and direct phone action', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getAllByRole('link', { name: /bkw groep home/i }),
    ).not.toHaveLength(0)
    expect(
      screen.getByRole('navigation', { name: /hoofdnavigatie/i }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /bel 085 060 66 63/i })[0],
    ).toHaveAttribute('href', 'tel:+31850606663')
  })

  it('marks the current navigation destination', () => {
    render(
      <MemoryRouter initialEntries={['/onderhoud']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: /onderhoud/i, current: 'page' }),
    ).toHaveAttribute('aria-current', 'page')
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
    expect(
      screen.getByRole('dialog', { name: /mobiele navigatie/i }),
    ).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')

    await user.keyboard('{Escape}')
    expect(
      screen.queryByRole('dialog', { name: /mobiele navigatie/i }),
    ).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
  })

  it('closes the mobile drawer after navigation at a 320px viewport', async () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 320,
    })
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /menu openen/i }))
    const drawer = screen.getByRole('dialog', { name: /mobiele navigatie/i })
    await user.click(within(drawer).getByRole('link', { name: /^onderhoud$/i }))

    expect(
      screen.queryByRole('dialog', { name: /mobiele navigatie/i }),
    ).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
  })
})

describe('verified BKW page content', () => {
  it.each([
    ['/onderhoud', /professioneel woningonderhoud/i],
    ['/slotenservice', /^slotenservice$/i],
    ['/isolatie', /isolatie voor een comfortabeler pand/i],
    ['/zakelijk', /zakelijk onderhoud en isolatie/i],
    ['/contact', /contact opnemen met bkw groep/i],
  ])('renders the expected page at %s', (path, heading) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { level: 1, name: heading }),
    ).toBeInTheDocument()
  })

  it('presents the four verified service areas on the homepage', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /van herstel tot verbetering/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Onderhoud' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Slotenservice' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Isolatie' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: 'Zakelijk' }),
    ).toBeInTheDocument()
  })

  it('uses the verified contact details', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(
      screen.getAllByRole('link', { name: /085 060 66 63/i })[0],
    ).toHaveAttribute('href', 'tel:+31850606663')
    expect(
      screen.getAllByRole('link', { name: /info@bkwgroup.nl/i })[0],
    ).toHaveAttribute('href', 'mailto:info@bkwgroup.nl')
    expect(screen.getAllByText(/noordeindseweg 256a/i)).not.toHaveLength(0)
  })

  it('keeps the preview contact form local and sends no network request', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText(/^naam$/i), 'Preview bezoeker')
    await user.type(
      screen.getByLabelText(/^e-mailadres$/i),
      'preview@example.com',
    )
    await user.type(
      screen.getByLabelText(/^uw vraag$/i),
      'Dit is alleen een testbericht.',
    )
    await user.click(screen.getByRole('button', { name: /demo controleren/i }))

    expect(fetchSpy).not.toHaveBeenCalled()
    expect(screen.getByRole('status')).toHaveTextContent(
      /niets verzonden of opgeslagen/i,
    )
    fetchSpy.mockRestore()
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
