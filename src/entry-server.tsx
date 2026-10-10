import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './App'

/** Build-time only: public marketing content, no server or request-time data. */
export function render(path: string) {
  const basename = import.meta.env.BASE_URL || '/'
  const entry = `${basename.replace(/\/$/, '')}${path}`
  return renderToString(<MemoryRouter basename={basename} initialEntries={[entry]}><AppRoutes /></MemoryRouter>)
}
