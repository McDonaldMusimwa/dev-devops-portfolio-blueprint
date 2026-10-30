import { Corners } from '../components/Corners'
import { Headshot } from '../components/Headshot'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/SectionHeading'
import { about, spec } from '../data/portfolio'

export function About() {
  return (
    <Section id="about">
      <SectionHeading sheet="02" title="About · spec sheet" />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <dl className="relative border border-line-strong bg-panel">
            <Corners />
            {spec.map(([key, value], i) => (
              <div
                key={key}
                className="group flex flex-wrap gap-x-4 gap-y-1 border-b border-line px-5 py-3.5 transition-colors last:border-b-0 hover:bg-raised"
              >
                <dt className="w-36 shrink-0 font-mono text-xs tracking-[0.08em] text-faint transition-colors group-hover:text-accent">
                  <span className="text-dim">{String(i + 1).padStart(2, '0')} </span>
                  {key}
                </dt>
                <dd className="min-w-0 flex-1">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-5">
          <Headshot />
          <p className="font-display text-2xl leading-snug font-semibold">{about.lead}</p>
          <p className="leading-relaxed text-muted">{about.body}</p>
          <p className="leading-relaxed text-muted">
            I document what I learn on YouTube as{' '}
            <a href={about.channel.href} target="_blank" rel="noreferrer">
              {about.channel.label}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
