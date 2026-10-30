import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const CELL = 32
const RIPPLE_MS = 1000
const RIPPLE_REACH = 720

// Every layer uses the same pattern and the same scroll offset, so the glow always sits exactly on the lines.
function grid(color: string, extra: CSSProperties = {}): CSSProperties {
  return {
    backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
    backgroundSize: `${CELL}px ${CELL}px`,
    backgroundPosition: '0 var(--sy, 0px)',
    ...extra,
  }
}

function mask(image: string): CSSProperties {
  return { maskImage: image, WebkitMaskImage: image }
}

const gold = 'color-mix(in oklab, var(--color-accent) 75%, transparent)'

// The page's drafting grid. Lines near the cursor light up gold, and a click sends a ring out across them.
export function GridField() {
  const root = useRef<HTMLDivElement>(null)
  const [fine] = useState(() => window.matchMedia('(pointer: fine)').matches)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const reduced = prefersReducedMotion()
    let frame = 0
    let ripple: { x: number; y: number; start: number } | null = null

    const set = (name: string, value: string) => el.style.setProperty(name, value)

    const paint = (now: number) => {
      frame = 0
      set('--sy', `${-window.scrollY}px`)
      if (!ripple) return
      const t = (now - ripple.start) / RIPPLE_MS
      if (t >= 1) {
        ripple = null
        set('--ro', '0')
        return
      }
      set('--rx', `${ripple.x}px`)
      set('--ry', `${ripple.y}px`)
      set('--rr', `${(1 - (1 - t) ** 3) * RIPPLE_REACH}px`)
      set('--ro', String(1 - t))
      schedule()
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const onMove = (event: PointerEvent) => {
      set('--mx', `${event.clientX}px`)
      set('--my', `${event.clientY}px`)
      set('--mo', '1')
    }
    const onLeave = () => set('--mo', '0')
    const onDown = (event: PointerEvent) => {
      if (reduced || event.button !== 0) return
      ripple = { x: event.clientX, y: event.clientY, start: performance.now() }
      schedule()
    }

    paint(performance.now())
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    if (fine) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onLeave)
    }
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [fine])

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0" style={grid('var(--color-grid)')} />
      {fine && (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={grid(gold, {
            opacity: 'var(--mo, 0)',
            ...mask('radial-gradient(200px circle at var(--mx, -999px) var(--my, -999px), black, transparent 100%)'),
          })}
        />
      )}
      <div
        className="absolute inset-0"
        style={grid('var(--color-accent)', {
          opacity: 'var(--ro, 0)',
          ...mask(
            'radial-gradient(circle at var(--rx, -999px) var(--ry, -999px), transparent calc(var(--rr, 0px) - 70px), black var(--rr, 0px), transparent calc(var(--rr, 0px) + 6px))',
          ),
        })}
      />
    </div>
  )
}
