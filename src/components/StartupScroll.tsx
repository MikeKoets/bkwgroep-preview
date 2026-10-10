import { useLayoutEffect, useRef, type RefObject } from 'react'
import { ScrollRestoration } from 'react-router-dom'

type Position = { x: number; y: number }
function Capture({ positionRef }: { positionRef: RefObject<Position> }) {
  useLayoutEffect(() => {
    positionRef.current = { x: scrollX, y: scrollY }
  }, [positionRef])
  return null
}
function Restore({ positionRef }: { positionRef: RefObject<Position> }) {
  useLayoutEffect(() => {
    const saved = positionRef.current
    if (saved.y > 0 && !location.hash) {
      scrollTo({ left: saved.x, top: saved.y, behavior: 'instant' })
    }
  }, [positionRef])
  return null
}

/** Sample immediately before initial router restoration, including late first-frame input.
 * Capture/Restore mount once; subsequent navigation remains entirely router-owned.
 */
export function StartupScroll() {
  const positionRef = useRef<Position>({ x: 0, y: 0 })
  return <><Capture positionRef={positionRef} /><ScrollRestoration storageKey="bkw-preview-scroll" /><Restore positionRef={positionRef} /></>
}
