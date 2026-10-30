// All site content lives here so sections stay presentational.

export type Link = { label: string; href: string }

export type HclValue = string | string[] | boolean

export type Project = {
  title: string
  kind: string
  description: string
  // Rendered as a Terraform block: resource "<type>" "<name>" { ...attrs }
  resource: [type: string, name: string]
  attrs: [key: string, value: HclValue][]
  links: Link[]
}

export type Job = {
  rev: number
  role: string
  company: string
  period: string
  notes: string[]
  active?: boolean
}

export type Post = {
  date: string
  title: string
  source: 'medium' | 'linkedin'
  href: string
}

export const profile = {
  name: 'McDonald Musimwa',
  handle: 'mcdonald',
  initials: 'MM',
  headshot: `${import.meta.env.BASE_URL}headshot.jpeg`,
  availability: 'open to DevOps roles',
  command: 'software_developer ⟶ devops_engineer',
  summary:
    'AWS-certified developer who designs and ships the path from commit to production. Below is the system I deploy today.',
  email: 'musimwamcdonald@gmail.com',
  resume: 'https://drive.google.com/file/d/1cjvzTQkc-1YBu7E6Z4gzLZ60EIJRR4Q2/view?usp=sharing',
  socials: [
    { label: 'GitHub', href: 'https://github.com/McDonaldMusimwa' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mcdonaldmusimwa' },
    { label: 'YouTube', href: 'https://www.youtube.com/@mcdthedev' },
  ] satisfies Link[],
}

export const revision = '2026.10'

// FIG. 01: the deploy path at Transhumanity AI, left to right.
export const deployPath: { label: string; title: string; note: string; children?: [string, string][] }[] = [
  { label: 'SOURCE', title: 'GitHub repo', note: 'PRs + code review' },
  { label: 'CI/CD', title: 'Test · build', note: 'staging → prod' },
  { label: 'ARTIFACT', title: 'Docker images', note: 'one per service' },
  {
    label: 'AWS ECS CLUSTER',
    title: '',
    note: '',
    children: [
      ['Node API', 'REST + WebSocket'],
      ['Agent service', 'Python AI agents'],
    ],
  },
  { label: 'DATA', title: 'RDS PostgreSQL ×2', note: 'Alembic · Sequelize' },
]

export const spec: [key: string, value: string][] = [
  ['DESIGNATION', 'Software Developer → DevOps'],
  ['CERTIFICATION', 'AWS Solutions Architect – Associate'],
  ['CLOUD', 'ECS · EC2 · RDS · S3 · Lambda · API Gateway · DynamoDB · Cognito'],
  ['DELIVERY', 'Docker · GitHub Actions · CI/CD'],
  ['LANGUAGES', 'TypeScript · Node.js · Python · Java · SQL'],
  ['IN PROGRESS', 'Kubernetes · Terraform · Observability'],
]

// Used by the shell's `skills` command.
export const engineer: Record<string, string[]> = {
  cloud: ['ECS', 'EC2', 'RDS', 'S3', 'Lambda'],
  ship: ['Docker', 'GitHub Actions', 'CI/CD'],
  code: ['TypeScript', 'Node', 'Python', 'Java'],
  data: ['PostgreSQL', 'DynamoDB'],
  learning: ['Kubernetes', 'Terraform'],
}

export const about = {
  lead: "I care about how software reaches production as much as how it's written.",
  body: 'B.S. from BYU–Idaho in 2024, then three roles building full-stack products. Each one pulled me deeper into infrastructure: EC2, RDS and Cognito at SkyIT, then multi-service Docker on ECS with CI/CD at Transhumanity AI.',
  channel: { label: '@mcdthedev', href: 'https://www.youtube.com/@mcdthedev' },
}

export const projects: Project[] = [
  {
    title: 'Practice Solution',
    kind: 'serverless',
    description: 'Interactive practice to test and strengthen AWS knowledge.',
    resource: ['project', 'practice_solution'],
    attrs: [
      ['type', 'serverless'],
      ['auth', 'cognito'],
      ['infra', ['api-gateway', 'lambda', 'dynamodb']],
      ['ui', ['react', 'zustand']],
    ],
    links: [
      { label: 'live', href: 'https://staging.d385k1fvsqio60.amplifyapp.com/' },
      { label: 'source', href: 'https://github.com/McDonaldMusimwa/practiceaws' },
    ],
  },
  {
    title: 'AI Trainer pipeline',
    kind: 'ci/cd',
    description: 'Repeatable CI for a TypeScript app with cached container builds.',
    resource: ['pipeline', 'aitrainer_ci'],
    attrs: [
      ['runner', 'ubuntu-24.04'],
      ['node', '24'],
      ['steps', ['typecheck', 'docker-build']],
      ['cache', true],
    ],
    links: [{ label: 'source', href: 'https://github.com/McDonaldMusimwa' }],
  },
  {
    title: 'Finace',
    kind: 'web',
    description: 'PDF bank statements in, categorised spending and income out.',
    resource: ['project', 'finace'],
    attrs: [
      ['type', 'web'],
      ['input', 'statement.pdf'],
      ['hosting', 'aws-amplify'],
    ],
    links: [
      { label: 'live', href: 'https://main.d3majrchxii62n.amplifyapp.com/' },
      { label: 'source', href: 'https://github.com/McDonaldMusimwa/finace' },
    ],
  },
  {
    title: 'InvoGo',
    kind: 'mobile',
    description: 'Mobile invoicing for handymen, shared over WhatsApp.',
    resource: ['project', 'invogo'],
    attrs: [
      ['type', 'mobile'],
      ['stack', ['typescript', 'react-native']],
      ['backend', 'firebase'],
    ],
    links: [
      { label: 'live', href: 'https://main.d2m7mhv4scf0qf.amplifyapp.com/' },
      { label: 'source', href: 'https://github.com/McDonaldMusimwa/InvoiceToGo' },
    ],
  },
]

// Oldest first: the release train runs left to right.
export const jobs: Job[] = [
  {
    rev: 1,
    role: 'Software Engineer',
    company: 'DPIT Solutions',
    period: 'Sep 2024 – May 2025',
    notes: ['Java + Node.js back ends, React front ends', 'REST APIs between them', 'Figma designs to production'],
  },
  {
    rev: 2,
    role: 'Software Developer',
    company: 'SkyIT Services',
    period: 'May 2025 – Oct 2025',
    notes: ['Next.js + Prisma on AWS EC2', 'RDS for data, S3 for objects', 'Cognito User Pools auth'],
  },
  {
    rev: 3,
    role: 'Software Developer',
    company: 'Transhumanity AI',
    period: 'Nov 2025 – current',
    active: true,
    notes: [
      'Multi-service Docker on AWS ECS',
      'RDS PostgreSQL per service, with migrations',
      'CI/CD to staging and production',
      'REST + WebSocket APIs for AI agents',
    ],
  },
]

export const degree = {
  title: 'B.S. Software Development',
  school: 'Brigham Young University–Idaho',
  period: 'Jan 2020 – Dec 2024',
  description: 'Top 10% of the program. Software engineering, web development, database administration, operating systems.',
}

export const certification = {
  title: 'AWS Certified Solutions Architect – Associate',
  short: 'Solutions Architect – Associate',
  description: 'Designing scalable, secure and cost-effective applications on AWS.',
  href: 'https://www.credly.com/badges/0b853cd1-9da3-4ea5-8e70-2e74f8c116aa/linked_in',
}

export const blog = {
  allPosts: { label: 'All on Medium', href: 'https://medium.com/@mcdonald.musimwa74' },
  posts: [
    {
      date: '2025-11-29',
      title: 'Starting a Node server with TypeScript',
      source: 'medium',
      href: 'https://medium.com/@mcdonald.musimwa74/starting-a-node-js-server-with-typescript-613b3abd7aee',
    },
    {
      date: '2024-11-30',
      title: 'Java vs. JavaScript: event loop meets multi-threading',
      source: 'medium',
      href: 'https://medium.com/@mcdonald.musimwa74/java-vs-javascript-event-loop-meets-multi-threading-ae7bf63c3789',
    },
    {
      date: '2023-11-10',
      title: 'Navigating the evolving realm of technology-driven enterprise',
      source: 'linkedin',
      href: 'https://www.linkedin.com/in/mcdonaldmusimwa',
    },
    {
      date: '2023-10-23',
      title: 'Web apps: static or dynamic?',
      source: 'linkedin',
      href: 'https://www.linkedin.com/in/mcdonaldmusimwa',
    },
  ] satisfies Post[],
}

// Drawing sheets, in page order. `file` is what the shell's `ls` prints.
export const sections = [
  { id: 'home', sheet: '00', label: 'Home', file: 'sheet-00-home' },
  { id: 'terminal', sheet: '01', label: 'Shell', file: 'sheet-01-shell' },
  { id: 'about', sheet: '02', label: 'About', file: 'sheet-02-about' },
  { id: 'projects', sheet: '03', label: 'Projects', file: 'sheet-03-projects' },
  { id: 'experience', sheet: '04', label: 'Experience', file: 'sheet-04-experience' },
  { id: 'education', sheet: '05', label: 'Education', file: 'sheet-05-education' },
  { id: 'blog', sheet: '06', label: 'Blog', file: 'sheet-06-blog' },
  { id: 'contact', sheet: '07', label: 'Hire me', file: 'sheet-07-hire-me' },
] as const

export type SectionId = (typeof sections)[number]['id']
