import { Route, Routes } from 'react-router-dom'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'

const routeHeadings = {
  home: 'Professioneel onderhoud zonder verrassingen',
  maintenance: 'Professioneel woningonderhoud',
  locks: 'Slotenservice',
  insulation: 'Isolatie voor een comfortabeler pand',
  business: 'Zakelijk onderhoud en isolatie',
  contact: 'Contact opnemen met BKW Groep',
} as const

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main>
      <h1>{title}</h1>
    </main>
  )
}

export function AppRoutes() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Ga naar de inhoud</a>
      <SiteHeader />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<PlaceholderPage title={routeHeadings.home} />} />
          <Route path="/onderhoud" element={<PlaceholderPage title={routeHeadings.maintenance} />} />
          <Route path="/slotenservice" element={<PlaceholderPage title={routeHeadings.locks} />} />
          <Route path="/isolatie" element={<PlaceholderPage title={routeHeadings.insulation} />} />
          <Route path="/zakelijk" element={<PlaceholderPage title={routeHeadings.business} />} />
          <Route path="/contact" element={<PlaceholderPage title={routeHeadings.contact} />} />
          <Route path="*" element={<PlaceholderPage title="Pagina niet gevonden" />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
