import { Fragment, useEffect, useState } from 'react'
import { Corners } from '../components/Corners'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/SectionHeading'
import { projects, type HclValue, type Project } from '../data/portfolio'
import { useInView } from '../hooks/useInView'
import { prefersReducedMotion } from '../lib/motion'

function Str({ children }: { children: string }) {
  return <span className="text-accent">"{children}"</span>
}

function Value({ value }: { value: HclValue }) {
  if (typeof value === 'boolean') return <span className="text-accent">{String(value)}</span>
  if (typeof value === 'string') return <Str>{value}</Str>
  return (
    <>
      [
      {value.map((item, i) => (
        <Fragment key={item}>
          {i > 0 && ', '}
          <Str>{item}</Str>
        </Fragment>
      ))}
      ]
    </>
  )
}

function ProjectCard({ project, planned }: { project: Project; planned: boolean }) {
  const [type, name] = project.resource
  const width = Math.max(...project.attrs.map(([key]) => key.length))

  return (
    <article
      className={`group relative flex h-full flex-col gap-4 border bg-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-accent ${
        planned ? 'border-accent shadow-[0_0_50px_-20px] shadow-accent' : 'border-line-strong'
      }`}
    >
      <Corners className={`border-accent transition-opacity ${planned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-2xl font-bold uppercase">{project.title}</h3>
          <p className="leading-relaxed text-muted">{project.description}</p>
        </div>
        {planned && (
          <span className="border border-accent px-2 py-0.5 font-mono text-xs text-accent motion-safe:animate-pop">
            + create
          </span>
        )}
      </div>
      <pre className="overflow-x-auto border border-line bg-sunken p-4 font-mono text-[13px] leading-[1.8] text-soft">
        <div>
          <span className="text-muted">resource</span> <span className="text-ink">"{type}" "{name}"</span> {'{'}
        </div>
        {project.attrs.map(([key, value]) => (
          <div key={key}>
            {'  '}
            {key.padEnd(width)} = <Value value={value} />
          </div>
        ))}
        <div>{'}'}</div>
      </pre>
      <div className="mt-auto flex gap-6 font-mono text-sm tracking-[0.06em]">
        {project.links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="py-1.5 uppercase">
            {link.label} ↗
          </a>
        ))}
      </div>
    </article>
  )
}

// `terraform plan` walks the sheet once it scrolls into view, highlighting each resource as it is planned.
function usePlan() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const [step, setStep] = useState(() => (prefersReducedMotion() ? projects.length : -1))
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (!inView || step >= projects.length) return
    const timer = window.setTimeout(() => setStep((s) => s + 1), step < 0 ? 400 : 650)
    return () => window.clearTimeout(timer)
  }, [inView, step, run])

  const replay = () => {
    setStep(-1)
    setRun((r) => r + 1)
  }

  return { ref, step, done: step >= projects.length, replay }
}

export function Projects() {
  const { ref, step, done, replay } = usePlan()

  return (
    <Section id="projects">
      <SectionHeading sheet="03" title="Projects · main.tf" />
      <Reveal>
        <div ref={ref} className="border border-line-strong bg-sunken font-mono text-[13px] leading-relaxed">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
            <span className="text-faint">$ terraform plan</span>
            <button
              type="button"
              onClick={replay}
              disabled={!done}
              className="cursor-pointer border border-line-strong px-2.5 py-1 text-xs text-soft transition-colors hover:border-accent hover:text-accent disabled:cursor-default disabled:border-transparent disabled:text-accent"
            >
              {done ? '↻ re-plan' : 'planning…'}
            </button>
          </div>
          <div className="flex min-h-36 flex-col px-4 py-3" aria-live="polite">
            {projects.slice(0, Math.max(0, step)).map((p) => (
              <span key={p.title} className="motion-safe:animate-pop">
                <span className="text-accent">+</span> {p.resource.join('.')} will be created
              </span>
            ))}
            {done && (
              <span className="mt-2 text-ink motion-safe:animate-pop">
                Plan: <span className="text-accent">{projects.length} to add</span>, 0 to change, 0 to destroy.
              </span>
            )}
          </div>
        </div>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 120}>
            <ProjectCard project={project} planned={!done && step - 1 === i} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
