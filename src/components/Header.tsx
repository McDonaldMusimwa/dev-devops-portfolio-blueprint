import { profile, sections, type SectionId } from '../data/portfolio'
import { useMobileMenu } from '../hooks/useMobileMenu'
import { useTheme } from '../hooks/useTheme'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './icons'
import { ScrollProgress } from './ScrollProgress'

const navSections = sections.filter((s) => s.id !== 'home')

const iconButton =
  'grid size-10 shrink-0 cursor-pointer place-items-center border border-line text-muted transition-colors hover:border-accent hover:text-accent'

export function Header({ active }: { active: SectionId }) {
  const { theme, toggle } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  // Below xl the sheet tabs don't fit in one row, so they fold into a menu.
  const { headerRef, ...menu } = useMobileMenu('(min-width: 80rem)')

  return (
    <header ref={headerRef} className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-320 items-center gap-x-2 px-4 sm:px-8 lg:px-12 xl:gap-x-4">
        <a
          href="#home"
          className="flex min-w-0 items-center gap-3 py-3.5 font-display text-lg font-bold tracking-[0.06em] text-ink hover:text-ink"
        >
          <span className="grid size-8 shrink-0 place-items-center border-[1.5px] border-accent text-sm text-accent">
            {profile.initials}
          </span>
          <span className="truncate">{profile.handle.toUpperCase()}.INFRA</span>
        </a>

        <nav aria-label="Main" className="ml-auto hidden font-mono text-[13px] tracking-[0.04em] xl:flex">
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

        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${nextTheme} mode`}
          title={`Switch to ${nextTheme} mode`}
          className={`${iconButton} ml-auto xl:ml-0`}
        >
          {theme === 'dark' ? <SunIcon className="size-4.5" /> : <MoonIcon className="size-4.5" />}
        </button>
        <button
          type="button"
          onClick={menu.toggle}
          aria-label={menu.open ? 'Close menu' : 'Open menu'}
          aria-expanded={menu.open}
          aria-controls="mobile-menu"
          className={`${iconButton} xl:hidden ${menu.open ? 'border-accent text-accent' : ''}`}
        >
          {menu.open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </div>

      {menu.open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          data-lenis-prevent
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-line-strong bg-bg font-mono text-sm tracking-[0.04em] shadow-lg xl:hidden"
        >
          {/* A drawing index: one row per sheet, like the title block of a set of plans. */}
          <p className="mx-auto max-w-320 px-4 pt-4 text-xs text-faint uppercase sm:px-8 lg:px-12">Sheet index</p>
          <ul className="mx-auto grid max-w-320 px-4 pt-2 pb-4 sm:grid-cols-2 sm:gap-x-6 sm:px-8 lg:px-12">
            {navSections.map(({ id, sheet, label }) => {
              const isActive = id === active
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={menu.close}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center gap-4 border-b border-dashed border-line px-1 py-3 uppercase ${
                      isActive ? 'text-ink hover:text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    <span className={`grid h-7 w-9 place-items-center border ${isActive ? 'border-accent bg-accent text-bg' : 'border-line-strong text-accent'}`}>
                      {sheet}
                    </span>
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
      <ScrollProgress />
    </header>
  )
}
