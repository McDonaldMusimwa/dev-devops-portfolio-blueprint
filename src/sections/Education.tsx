import { Corners } from '../components/Corners'
import { ShieldCheckIcon } from '../components/icons'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/SectionHeading'
import { certification, degree } from '../data/portfolio'

const card = 'relative flex h-full flex-col gap-3 border bg-panel p-7 transition duration-300 hover:-translate-y-1'
const tag = 'flex justify-between gap-3 font-mono text-xs tracking-[0.1em]'

export function Education() {
  return (
    <Section id="education">
      <SectionHeading sheet="05" title="Education · credentials" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className={`${card} border-accent hover:shadow-[0_0_60px_-25px] hover:shadow-accent`}>
            <Corners />
            <div className={tag}>
              <span className="flex items-center gap-2 text-accent">
                <ShieldCheckIcon className="size-4" /> CERTIFICATION
              </span>
              <span className="text-faint">ISSUER: AWS</span>
            </div>
            <h3 className="font-display text-[28px] leading-tight font-bold uppercase">{certification.short}</h3>
            <p className="leading-relaxed text-muted">{certification.description}</p>
            <a
              href={certification.href}
              target="_blank"
              rel="noreferrer"
              className="mt-auto py-2 font-mono text-sm tracking-[0.06em]"
            >
              VERIFY ON CREDLY ↗
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className={`${card} border-line-strong hover:border-accent/60`}>
            <div className={tag}>
              <span className="text-faint">DEGREE</span>
              <span className="text-faint">{degree.period.toUpperCase()}</span>
            </div>
            <h3 className="font-display text-[28px] leading-tight font-bold uppercase">{degree.title}</h3>
            <p className="font-semibold text-soft">{degree.school}</p>
            <p className="leading-relaxed text-muted">{degree.description}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
