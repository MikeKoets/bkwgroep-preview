import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/** Announce a new page to keyboard/screen-reader users without moving restored scroll. */
export function NavigationFocus() {
  const location = useLocation()
  const type = useNavigationType()
  const previous = useRef(location.key)
  useEffect(() => {
    if (previous.current === location.key) return
    previous.current = location.key
    if (type === 'POP' || location.hash) return
    const frame = requestAnimationFrame(() => {
      const title = document.querySelector<HTMLElement>('main h1')
      title?.setAttribute('tabindex', '-1')
      title?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.key, location.hash, type])
  return null
}
