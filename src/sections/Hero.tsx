import { Fragment, useEffect, useState } from 'react'
import { Corners } from '../components/Corners'
import { Reveal } from '../components/Reveal'
import { ScrambleText, Typewriter } from '../components/TextEffects'
import { deployPath, profile, revision } from '../data/portfolio'
import { prefersReducedMotion } from '../lib/motion'

const traceNotes = [
  'commit a1f3c9e merged to main',
  'tests passed · image tagged a1f3c9e',
  'pushed to ECR · 2 images',
  'rolling update · 2/2 tasks healthy',
  'migrations applied · release live',
]

// A build "travels" the deploy path, one hop at a time, then starts over. Hovering a node pins the trace there.
function DeployPath() {
  const [step, setStep] = useState(() => (prefersReducedMotion() ? deployPath.length - 1 : 0))
  const [pinned, setPinned] = useState<number | null>(null)
  const current = pinned ?? step

  useEffect(() => {
    if (prefersReducedMotion() || pinned !== null) return
    const last = step === deployPath.length - 1
    const timer = window.setTimeout(() => setStep(last ? 0 : step + 1), last ? 2600 : 1100)
    return () => window.clearTimeout(timer)
  }, [step, pinned])

  return (
    <figure className="relative m-0 flex flex-col gap-6 border border-line-strong bg-panel p-5 sm:p-8">
      <Corners />
      <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center" onPointerLeave={() => setPinned(null)}>
        {deployPath.map((node, i) => {
          const lit = i <= current
          const here = i === current
          return (
            <Fragment key={node.label}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`relative mx-auto h-6 w-px shrink-0 lg:mx-0 lg:h-px lg:w-8 ${lit ? 'bg-accent' : 'bg-line-strong'}`}
                >
                  <span
                    className={`absolute inset-0 transition-opacity duration-300 ${here ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      backgroundImage: 'linear-gradient(90deg, var(--color-accent) 50%, transparent 50%)',
                      backgroundSize: '6px 100%',
                    }}
                  />
                </span>
              )}
              <Reveal
                delay={300 + i * 140}
                className={`relative flex-1 border transition-[border-color,box-shadow] duration-300 ${
                  here
                    ? 'border-accent shadow-[0_0_40px_-12px] shadow-accent'
                    : lit
                      ? 'border-accent/50'
                      : 'border-line-strong'
                }`}
              >
                <div className="h-full cursor-crosshair p-4" onPointerEnter={() => setPinned(i)}>
                  <span
                    className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] ${
                      lit ? 'text-accent' : 'text-faint'
                    }`}
                  >
                    {here && <span className="size-1.5 bg-accent motion-safe:animate-pulse" />}
                    {node.label}
                  </span>
                  {node.children ? (
                    <div className="mt-2.5 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                      {node.children.map(([title, note]) => (
                        <div key={title} className="flex-1 border border-dashed border-line-strong px-3 py-2">
                          <div className="font-semibold">{title}</div>
                          <div className="font-mono text-xs text-faint">{note}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="mt-1.5 font-semibold">{node.title}</div>
                      <div className="font-mono text-xs text-faint">{node.note}</div>
                    </>
                  )}
                </div>
              </Reveal>
            </Fragment>
          )
        })}
      </div>
      <figcaption className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-4 font-mono text-[11px] tracking-[0.1em] text-faint">
        <span>FIG. 01 — DEPLOY PATH AT TRANSHUMANITY AI (SIMPLIFIED)</span>
        <span aria-live="polite" className="text-accent">
          TRACE ▸ {traceNotes[current]?.toUpperCase()}
        </span>
        <span>SCALE: NTS</span>
      </figcaption>
    </figure>
  )
}

const button = 'px-5.5 py-3.5 font-mono text-sm tracking-[0.06em] transition hover:-translate-y-0.5'

export function Hero() {
  const [first, last] = profile.name.split(' ')

  return (
    <section id="home" className="mx-auto flex max-w-320 flex-col gap-14 px-4 pt-16 pb-24 sm:px-8 sm:pt-20 lg:px-12">
      <div className="flex flex-col gap-7">
        <p className="font-mono text-[13px] tracking-[0.12em] text-accent">SHEET 00 / HOME · REV {revision}</p>
        <h1 className="font-display text-[clamp(52px,8.5vw,124px)] leading-[0.92] font-bold tracking-[-0.01em] uppercase">
          <ScrambleText text={first} delay={300} />
          <br />
          <ScrambleText text={last} delay={500} />
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </h1>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-170 flex-col gap-3">
            <p className="font-mono text-base text-accent sm:text-lg">
              <Typewriter text={profile.command} delay={800} speed={40} />
            </p>
            <Reveal delay={900}>
              <p className="text-lg leading-relaxed text-muted">{profile.summary}</p>
            </Reveal>
          </div>
          <Reveal delay={1050} className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className={`${button} group relative overflow-hidden bg-accent font-semibold text-bg shadow-[0_0_40px_-12px] shadow-accent hover:bg-accent-hover hover:text-bg`}
            >
              HIRE ME ⟶
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 opacity-0 transition-[left,opacity] duration-700 group-hover:left-[120%] group-hover:opacity-100"
              />
            </a>
            <a href="#projects" className={`${button} border border-line-strong text-ink hover:border-accent hover:text-ink`}>
              VIEW BUILDS
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className={`${button} border border-line-strong text-ink hover:border-accent hover:text-ink`}
            >
              RÉSUMÉ.PDF ↗
            </a>
          </Reveal>
        </div>
      </div>
      <DeployPath />
    </section>
  )
}
