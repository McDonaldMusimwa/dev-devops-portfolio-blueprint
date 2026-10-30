import { useEffect, useRef } from 'react'
import { sections, type SectionId } from '../data/portfolio'

function pad(n: number) {
  return String(Math.max(0, Math.round(n))).padStart(4, '0')
}

// CAD-style cursor readout pinned to the corner of the screen. Mouse-driven desktops only.
export function CoordinateReadout({ active }: { active: SectionId }) {
  const text = useRef<HTMLSpanElement>(null)
  const sheet = sections.find((s) => s.id === active)

  useEffect(() => {
    let frame = 0
    let x = 0
    let y = 0
    const paint = () => {
      frame = 0
      if (text.current) text.current.textContent = `X ${pad(x)}  Y ${pad(y + window.scrollY)}`
    }
    const onMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-4 left-4 z-20 hidden gap-4 border border-line-strong bg-bg/85 px-3 py-2 font-mono text-[11px] tracking-[0.08em] text-faint backdrop-blur [@media(pointer:fine)]:lg:flex"
    >
      <span ref={text} className="tabular-nums">
        X 0000 Y 0000
      </span>
      <span className="text-accent">
        SHEET {sheet?.sheet} · {sheet?.label.toUpperCase()}
      </span>
    </div>
  )
}
