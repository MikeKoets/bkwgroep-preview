import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom'
import { AppRoutes } from './App'
import './styles.css'

// Keep the directory slash: Pages redirects slashless URLs and drops their history state.
const basename = import.meta.env.BASE_URL || '/'
// Hard navigation creates a new history entry without a router key. Give it a
// stable unique key so session scroll positions cannot collide under 'default'.
// Refresh retains the existing key; PUSH/POP keys remain owned by React Router.
if (!window.history.state?.key) {
  window.history.replaceState(
    { ...window.history.state, key: crypto.randomUUID() },
    '',
    window.location.href,
  )
}

const router = createBrowserRouter(
  [
    {
      path: '*',
      element: (
        <>
          <AppRoutes />
          <ScrollRestoration storageKey="bkw-preview-scroll" />
        </>
      ),
    },
  ],
  { basename },
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
