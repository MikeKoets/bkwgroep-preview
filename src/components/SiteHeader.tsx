import { useEffect, useState } from 'react'
import { ArrowUpRight, Mail, Menu, Phone, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'

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
      className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
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
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span className="utility-note">BKW Groep · onderhoud, isolatie en slotenservice</span>
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
            <img src={`${import.meta.env.BASE_URL}assets/logo-bkw.svg`} alt="" width="210" height="69" />
          </Link>

          <nav className="desktop-nav" aria-label="Hoofdnavigatie">
            <NavigationLinks />
          </nav>

          <Link to="/contact" className="button button--primary header-cta">
            Adviesgesprek
            <ArrowUpRight aria-hidden="true" />
          </Link>

          <button
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

      {menuOpen ? (
        <div className="mobile-nav-layer">
          <button
            type="button"
            className="mobile-nav-backdrop"
            aria-label="Menu sluiten"
            onClick={() => setMenuOpen(false)}
          />
          <aside id="mobile-menu" className="mobile-nav" role="dialog" aria-label="Mobiele navigatie">
            <div className="mobile-nav__header">
              <span className="mobile-nav__eyebrow">Navigatie</span>
              <button type="button" aria-label="Menu sluiten" onClick={() => setMenuOpen(false)}>
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
              <Link className="button button--secondary" to="/contact" onClick={() => setMenuOpen(false)}>
                Contact opnemen
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  )
}
