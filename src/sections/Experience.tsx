import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/SectionHeading'
import { jobs } from '../data/portfolio'
import { useInView } from '../hooks/useInView'

// Releases sit on a track that draws itself left to right when the sheet scrolls into view.
export function Experience() {
  const [ref, inView] = useInView<HTMLOListElement>()

  return (
    <Section id="experience">
      <SectionHeading sheet="04" title="Experience · release train" />
      <ol ref={ref} className="relative grid gap-y-10 md:grid-cols-3">
        <span
          aria-hidden="true"
          className={`absolute top-0 left-0 hidden h-0.5 w-full origin-left bg-line-strong transition-transform duration-[1400ms] ease-out md:block ${
            inView ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
        {jobs.map((job, i) => (
          <Reveal
            as="li"
            key={job.rev}
            delay={300 + i * 250}
            className="group relative flex flex-col gap-3 border-t-2 border-line-strong pr-6 md:border-t-0"
          >
            <span
              aria-hidden="true"
              className={`relative -mt-2 size-3.5 border-2 transition-colors md:-mt-1.75 ${
                job.active ? 'border-accent bg-accent' : 'border-faint bg-bg group-hover:border-accent'
              }`}
            >
              {job.active && <span className="absolute -inset-1 border border-accent motion-safe:animate-ping" />}
            </span>
            <p className={`font-mono text-[13px] tracking-[0.06em] uppercase ${job.active ? 'text-accent' : 'text-faint'}`}>
              v{job.rev}.0 · {job.period}
            </p>
            <h3 className="font-display text-2xl font-bold uppercase transition-colors group-hover:text-accent">
              {job.role}
            </h3>
            <p className="-mt-2 text-muted">{job.company}</p>
            <ul className="flex flex-col gap-1.5 text-[15px] leading-relaxed text-soft">
              {job.notes.map((note) => (
                <li key={note} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-accent">
                    —
                  </span>
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
