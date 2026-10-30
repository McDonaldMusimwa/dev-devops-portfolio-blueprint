import { profile, sections, type SectionId } from '../data/portfolio'
import { useTheme } from '../hooks/useTheme'
import { MoonIcon, SunIcon } from './icons'
import { ScrollProgress } from './ScrollProgress'

const navSections = sections.filter((s) => s.id !== 'home')

export function Header({ active }: { active: SectionId }) {
  const { theme, toggle } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-320 flex-wrap items-center gap-x-4 px-4 sm:px-8 lg:px-12">
        <a
          href="#home"
          className="flex items-center gap-3 py-3.5 font-display text-lg font-bold tracking-[0.06em] text-ink hover:text-ink"
        >
          <span className="grid size-8 place-items-center border-[1.5px] border-accent text-sm text-accent">
            {profile.initials}
          </span>
          {profile.handle.toUpperCase()}.INFRA
        </a>
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${nextTheme} mode`}
          title={`Switch to ${nextTheme} mode`}
          className="ml-auto grid size-10 cursor-pointer place-items-center border border-line text-muted transition-colors hover:border-accent hover:text-accent xl:order-last xl:ml-0"
        >
          {theme === 'dark' ? <SunIcon className="size-4.5" /> : <MoonIcon className="size-4.5" />}
        </button>
        <nav
          aria-label="Main"
          className="-mx-3 flex w-[calc(100%+1.5rem)] overflow-x-auto font-mono text-[13px] tracking-[0.04em] [scrollbar-width:none] xl:mx-0 xl:ml-auto xl:w-auto [&::-webkit-scrollbar]:hidden"
        >
          {navSections.map(({ id, sheet, label }) => {
            const isActive = id === active
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                className={`relative shrink-0 px-3 py-3.5 uppercase ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
              >
                <span className="text-accent">{sheet}</span> {label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-0 h-0.5 origin-left bg-accent transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>
      </div>
      <ScrollProgress />
    </header>
  )
}
