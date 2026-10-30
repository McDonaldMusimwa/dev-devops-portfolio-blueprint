// Registration marks on each corner of a drawing panel. The parent must be `relative`.
export function Corners({ className = 'border-accent' }: { className?: string }) {
  const mark = `pointer-events-none absolute size-3 ${className}`
  return (
    <>
      <span aria-hidden="true" className={`${mark} -top-px -left-px border-t-2 border-l-2`} />
      <span aria-hidden="true" className={`${mark} -top-px -right-px border-t-2 border-r-2`} />
      <span aria-hidden="true" className={`${mark} -bottom-px -left-px border-b-2 border-l-2`} />
      <span aria-hidden="true" className={`${mark} -right-px -bottom-px border-r-2 border-b-2`} />
    </>
  )
}
