import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Mail, Menu, Phone, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/onderhoud', label: 'Onderhoud' },
  { to: '/slotenservice', label: 'Slotenservice' },
  { to: '/isolatie', label: 'Isolatie' },
  { to: '/zakelijk', label: 'Zakelijk' },
  { to: '/contact', label: 'Contact' },
]

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  return navigation.map(({ to, label }) => (
    <NavLink
      key={to}
      to={to}
      end={to === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        isActive ? 'nav-link is-active' : 'nav-link'
      }
    >
      {({ isActive }) => (
        <>
          <span>{label}</span>
          {isActive ? <span className="sr-only">, huidige pagina</span> : null}
        </>
      )}
    </NavLink>
  ))
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    const shell = document.querySelector<HTMLElement>('.site-shell')
    const previousInert = shell?.inert ?? false
    document.body.style.overflow = 'hidden'
    if (shell) shell.inert = true
    drawerRef.current
      ?.querySelector<HTMLButtonElement>('button')
      ?.focus({ preventScroll: true })
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
      if (event.key !== 'Tab') return
      const elements =
        drawerRef.current?.querySelectorAll<HTMLElement>('button, a[href]')
      if (!elements?.length) return
      const first = elements[0],
        last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    const closeOnDesktop = () => {
      if (window.innerWidth > 1100) setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyboard)
    window.addEventListener('resize', closeOnDesktop)
    const trigger = menuButtonRef.current
    return () => {
      document.body.style.overflow = previousOverflow
      if (shell) shell.inert = previousInert
      document.removeEventListener('keydown', handleKeyboard)
      window.removeEventListener('resize', closeOnDesktop)
      trigger?.focus({ preventScroll: true })
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span className="utility-note">
            BKW Groep · onderhoud, isolatie en slotenservice
          </span>
          <div className="utility-actions">
            <a href="mailto:info@bkwgroup.nl">
              <Mail aria-hidden="true" />
              info@bkwgroup.nl
            </a>
            <a href="tel:+31850606663" aria-label="Bel 085 060 66 63">
              <Phone aria-hidden="true" />
              085 060 66 63
            </a>
          </div>
        </div>
      </div>

      <div className="main-nav">
        <div className="container main-nav__inner">
          <Link to="/" className="wordmark" aria-label="BKW Groep home">
            <img
              src={`${import.meta.env.BASE_URL}assets/logo-bkw.svg`}
              alt=""
              width="210"
              height="69"
            />
          </Link>

          <nav className="desktop-nav" aria-label="Hoofdnavigatie">
            <NavigationLinks />
          </nav>

          <Link to="/contact" className="button button--primary header-cta">
            Adviesgesprek
            <ArrowUpRight aria-hidden="true" />
          </Link>

          <a
            className="mobile-phone"
            href="tel:+31850606663"
            aria-label="Bel 085 060 66 63"
          >
            <Phone aria-hidden="true" />
            <span>Bellen</span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button"
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen
        ? createPortal(
            <div className="mobile-nav-layer">
              <button
                type="button"
                className="mobile-nav-backdrop"
                tabIndex={-1}
                aria-label="Menu sluiten"
                onClick={() => setMenuOpen(false)}
              />
              <div
                ref={drawerRef}
                aria-modal="true"
                id="mobile-menu"
                className="mobile-nav"
                role="dialog"
                aria-label="Mobiele navigatie"
              >
                <div className="mobile-nav__header">
                  <span className="mobile-nav__eyebrow">Navigatie</span>
                  <button
                    type="button"
                    aria-label="Menu sluiten"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X aria-hidden="true" />
                  </button>
                </div>
                <nav aria-label="Mobiele hoofdnavigatie">
                  <NavigationLinks onNavigate={() => setMenuOpen(false)} />
                </nav>
                <div className="mobile-nav__contact">
                  <a className="button button--primary" href="tel:+31850606663">
                    <Phone aria-hidden="true" />
                    Bel 085 060 66 63
                  </a>
                  <Link
                    className="button button--secondary"
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contact opnemen
                  </Link>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}
