import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  sheet: string
  title: string
  aside?: ReactNode
}

export function SectionHeading({ sheet, title, aside }: Props) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className="font-mono text-[13px] tracking-[0.12em] text-accent">SHEET {sheet}</span>
        <h2 className="font-display text-3xl leading-none font-bold uppercase sm:text-[44px]">{title}</h2>
      </div>
      {aside}
    </Reveal>
  )
}

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-line">
      <div className="mx-auto flex max-w-320 flex-col gap-9 px-4 py-22 sm:px-8 lg:px-12">{children}</div>
    </section>
  )
}
