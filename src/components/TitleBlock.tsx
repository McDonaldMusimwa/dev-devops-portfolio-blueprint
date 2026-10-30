import { profile, revision, sections } from '../data/portfolio'

const cell = 'flex flex-col gap-1.5 border-line p-4'
const label = 'font-mono text-[11px] tracking-[0.12em] text-faint'

// Footer drawn as the title block in the corner of an engineering drawing.
export function TitleBlock() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-320 flex-col gap-10 px-4 py-20 sm:px-8 lg:px-12">
        <h2 className="font-display text-[clamp(32px,5vw,56px)] leading-none font-bold uppercase">
          Need a pipeline built? <a href="#contact">Get in touch.</a>
        </h2>
        <div className="grid border border-line-strong sm:grid-cols-2 lg:grid-cols-4 [&>*]:border-b sm:[&>*]:border-r lg:[&>*]:border-b-0">
          <div className={cell}>
            <span className={label}>DRAWN BY</span>
            <span className="font-semibold">{profile.name}</span>
          </div>
          <div className={cell}>
            <span className={label}>CONTACT</span>
            <a href={`mailto:${profile.email}`} className="break-all">
              {profile.email}
            </a>
          </div>
          <div className={cell}>
            <span className={label}>LINKS</span>
            <span className="flex flex-wrap gap-x-4">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </span>
          </div>
          <div className={`${cell} border-r-0`}>
            <span className={label}>SHEET · REV</span>
            <span className="font-mono">
              {sections.length} SHEETS · {revision}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
