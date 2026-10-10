export {}
declare global {
  interface Window {
    __bkwPendingMenu?: boolean
    __bkwHydrate?: () => void
  }
}

// Public content is already prerendered. Let it paint before fetching React's
// interactive enhancement. The inline first-tap guard remembers earlier intent.
let started = false
let leaving = false
window.addEventListener('beforeunload', () => { leaving = true })
window.addEventListener('pagehide', () => { leaving = true })
window.addEventListener('pageshow', () => { leaving = false })
const hydrate = () => {
  if (started) return
  started = true
  void import('./main').catch(error => {
    started = false
    // WebKit rejects an in-flight import when hard navigation cancels it.
    // A failure on the current page remains visible; only departure is ignored.
    if (!leaving) console.error(error)
  })
}
window.__bkwHydrate = hydrate
if (window.__bkwPendingMenu || document.visibilityState === 'hidden') hydrate()
else requestAnimationFrame(() => requestAnimationFrame(hydrate))
