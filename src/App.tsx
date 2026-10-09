import { Route, Routes } from 'react-router-dom'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { BusinessPage, ContactPage, HomePage, InsulationPage, LocksPage, MaintenancePage, NotFoundPage } from './pages/SitePages'

export function AppRoutes() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Ga naar de inhoud</a>
      <SiteHeader />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/onderhoud" element={<MaintenancePage />} />
          <Route path="/slotenservice" element={<LocksPage />} />
          <Route path="/isolatie" element={<InsulationPage />} />
          <Route path="/zakelijk" element={<BusinessPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
