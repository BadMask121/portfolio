export const profile = {
  name: 'Jeffrey Emakpor',
  location: 'Lisbon, Portugal',
  role: 'Senior AI Platform Engineer',
  headline: 'AI systems that survive production.',
  intro:
    'I am Jeffrey Emakpor, a Senior AI Platform Engineer and product builder in Lisbon. I design distributed AI infrastructure, ship full-stack products, and turn difficult workflows into reliable software.',
  about:
    'I like the point where difficult systems meet useful products. My work spans AI infrastructure, distributed backends, fintech, SaaS, and creative tooling, with a bias toward readable code, observable systems, and products that hold up after launch.',
  status: 'Open to the right problem',
}

export const metrics = [
  { label: 'Monthly revenue powered', value: '€4M+', detail: 'AI platform impact' },
  { label: 'Monthly active users', value: '1M+', detail: 'Production scale' },
  { label: 'Daily AI requests', value: '200K+', detail: 'Real-time inference' },
  { label: 'Years shipping', value: '8+', detail: 'From code to operations' },
]

export const experience = [
  {
    company: 'RepliKit',
    dates: '2026 - Present',
    role: 'Co-Founder & Solution Architect',
    current: true,
    summary:
      'Leading product and systems architecture for a Figma-powered design automation platform that helps modern teams create brand-safe content at scale.',
  },
  {
    company: 'Tappz GmbH',
    dates: '2024 - 2026',
    role: 'Lead AI Platform Engineer',
    summary:
      'Owned distributed AI platform architecture powering €4M+ monthly revenue, around 1M monthly users, and more than 200K AI requests per day.',
  },
  {
    company: 'Receeve GmbH',
    dates: '2021 - 2024',
    role: 'Senior Full-Stack Software Engineer (AI/ML)',
    summary:
      'Built AI decision systems and distributed financial infrastructure, including workflows reduced from 24 hours to under one minute and systems processing more than 1M events.',
  },
]

export const builds = [
  {
    name: 'RepliKit',
    type: 'Founder product',
    description:
      'Turn Figma designs into smart, self-serve templates while designers keep control of brand, layout, and quality.',
    tags: ['Systems architecture', 'Figma API', 'SaaS'],
    url: 'https://replikit.ai',
    linkLabel: 'Visit RepliKit',
  },
]

export const sideProjects = {
  intro: 'Personal tools and experiments, built for my own work.',
  items: [
    {
      name: 'VoxSplit',
      type: 'Mac audio tool',
      description:
        'Split lead vocals, backing harmonies and instrumentals offline on your Mac, inside your DAW as a VST3/AU plugin or in its own app.',
      tags: ['Rust', 'ONNX Runtime', 'JUCE', 'SwiftUI'],
      url: 'https://voxsplit.jeffrey.build',
      linkLabel: 'Visit VoxSplit',
    },
    {
      name: 'DJ Sync',
      type: 'AI-connected Mac app',
      description:
        'Send a Spotify or YouTube link to ChatGPT or Claude and it lands in your Rekordbox library and playlists.',
      tags: ['Rust', 'Swift', 'MCP', 'Cloudflare Workers'],
      url: 'https://djsync.jeffrey.build',
      linkLabel: 'Visit DJ Sync',
    },
    {
      name: 'Prole',
      type: 'Open-source macOS app',
      description:
        'Snip, annotate, and paste anywhere. A native utility built to remove friction from visual conversations with people and AI.',
      tags: ['Rust', 'Tauri', 'Open source'],
      url: 'https://prole.jeffrey.build',
      linkLabel: 'Visit Prole',
    },
    {
      name: 'Member',
      type: 'AI group assistant',
      description:
        'A WhatsApp group assistant that stores conversation context so members can search, summarize, ask questions, and surface highlights.',
      tags: ['TypeScript', 'Vector search', 'GCP'],
      url: 'https://github.com/BadMask121/member',
      linkLabel: 'View Member on GitHub',
    },
    {
      name: 'AI Agents',
      type: 'Agent systems',
      description:
        'The monorepo behind my agents and MCP servers: an email and booking agent, the mailbox connector, and DJ Sync\'s cloud queue.',
      tags: ['TypeScript', 'Rust', 'MCP', 'Cloudflare Workers'],
      url: 'https://github.com/BadMask121/ai-agents',
      linkLabel: 'View AI Agents on GitHub',
    },
    {
      name: 'mail-mcp',
      type: 'ChatGPT connector',
      description:
        'An MCP server that lets ChatGPT read, send and manage a private mailbox over IMAP and SMTP, running on Cloudflare Workers.',
      tags: ['TypeScript', 'MCP', 'Cloudflare Workers'],
      url: 'https://github.com/BadMask121/ai-agents/tree/main/apps/mail-mcp',
      linkLabel: 'View mail-mcp on GitHub',
    },
  ],
}

export const capabilities = [
  {
    title: 'AI / LLM',
    items: ['LLM infrastructure', 'Multi-model orchestration', 'RAG & memory', 'AI agents', 'Evaluations & observability'],
  },
  {
    title: 'Backend',
    items: ['Distributed systems', 'Event-driven architecture', 'Node.js & Python', 'GraphQL & REST', 'PostgreSQL & vectors'],
  },
  {
    title: 'Product',
    items: ['React & Next.js', 'TypeScript', 'Rust & Tauri', 'Vue.js', 'Design systems'],
  },
  {
    title: 'Operations',
    items: ['AWS & GCP', 'Docker', 'CI/CD', 'Terraform', 'Production reliability'],
  },
]

export const contact = {
  email: 'jeff.emakpor@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jeffreyemakpor',
  github: 'https://github.com/BadMask121',
}
