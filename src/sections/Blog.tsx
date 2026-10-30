import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/SectionHeading'
import { blog } from '../data/portfolio'

export function Blog() {
  const count = blog.posts.length

  return (
    <Section id="blog">
      <SectionHeading
        sheet="06"
        title="Blog · docs"
        aside={
          <a
            href={blog.allPosts.href}
            target="_blank"
            rel="noreferrer"
            className="py-2.5 font-mono text-sm tracking-[0.06em] uppercase"
          >
            {blog.allPosts.label} ↗
          </a>
        }
      />
      <ul className="border-t border-line-strong">
        {blog.posts.map((post, i) => (
          <Reveal as="li" key={post.href + post.date} delay={i * 80} className="border-b border-line">
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-wrap items-baseline gap-x-7 gap-y-1.5 px-2 py-5.5 text-ink transition-colors hover:bg-raised hover:text-ink sm:px-6"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
              />
              <span className="font-mono text-[13px] tracking-[0.06em] text-accent">
                DOC-{String(count - i).padStart(3, '0')}
              </span>
              <span className="min-w-60 flex-1 font-display text-xl font-semibold transition-transform duration-300 group-hover:translate-x-1.5">
                {post.title}
              </span>
              <span className="font-mono text-xs tracking-[0.08em] text-faint">
                {post.date.replaceAll('-', '.')} · {post.source.toUpperCase()}
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
