import {
  SlideData,
  RuleSlideData,
  TierId,
  TierSelectionSlideData,
  SummarySlideData,
} from '../types';
import { CREATOR_CONFIG } from './creator';

// --- Reusable rule slides (mapped from existing content) ---

const RULE_USE_CLI: RuleSlideData = {
  layout: 'rule',
  number: '01',
  title: 'Use the Command Line and Choose a Model',
  subtitle: 'Your direct line to AI power',
  mindmapId: 'intro-tools',
  description:
    'Chat interfaces are great for asking questions, but command-line tools give you superpowers. They read and write files directly in your project, maintain context across your entire codebase, and execute code in real-time.',
  points: [
    'Standartised alignment and steering possibilities (agents, skills, MCPs etc.)',
    'Persistent memory of your entire codebase',
    'Run, test, and deploy \u2014 all from one place',
    'Use Agentic Mode',
    'For planing use the latest Opus and depending on the complexity of the task Sonnet/Opus models for execution',
  ],
  tip: 'Look for CLI tools like Claude Code, Codex CLI, Gemini CLI, or Cursor\u2019s agent mode',
};

const RULE_SET_CONTEXT: RuleSlideData = {
  layout: 'rule',
  number: '02',
  title: 'Set Up Your AI\u2019s Context',
  subtitle: 'Onboard the AI like a new team member',
  mindmapId: 'ctxeng-basic',
  description:
    'Before writing any code, give your AI the big picture. Create a configuration file that describes your project\u2019s vision, coding standards, and technical decisions \u2014 just like onboarding a new developer.',
  points: [
    'Product Vision \u2014 What you\u2019re building and why',
    'Alignment \u2014 List your expectations (e.g. which design system to use, code style, code-of-conduct, testing standards etc.)',
    'Persist Architecture Decisions \u2014 Architecture Decision Record (ADR) within the project',
    'Tech Stack \u2014 Which frameworks and tools to use',
    'Guardrails \u2014 What the AI should and shouldn\u2019t do',
  ],
  tip: 'Create a project rules file (like CLAUDE.md or .cursorrules) in your project\u2019s root folder',
  externalLink: {
    label: 'Technical alignment generator tool',
    url: 'https://tinytoolstack.com/app/instructionsgeneratorforagenticcoding',
  },
};

const RULE_SPECIALIST_AGENTS: RuleSlideData = {
  layout: 'rule',
  number: '03',
  title: 'Create Specialist Agents',
  subtitle: 'Focused experts outperform generalists',
  mindmapId: 'skills-basic',
  description:
    'Instead of using one generic AI for everything, define task-specific personas. Give each agent a clear role and expertise area \u2014 just like assembling a real development team. Specialized agents also use your context window more efficiently, keeping each conversation focused and relevant.',
  points: [
    '"senior-react-developer" for user interfaces',
    '"datamodel-postgresql-architect" for data structure and storage',
    '"qa-playwright-engineer" for testing and finding edge cases',
    '"devsecops-pulumi-specialist" for deployment and infrastructure',
  ],
  tip: 'Generate the agents using the same CLI tool and update its context with relevant information for its role',
};

const RULE_AI_FRIENDLY_TECH: RuleSlideData = {
  layout: 'rule',
  number: '04',
  title: 'Choose AI-Friendly Technologies',
  subtitle: 'Not all tech stacks are generated equal',
  mindmapId: 'example-app',
  description:
    'AI coding tools work best with popular, well-documented technologies. The more examples the AI has seen during training, the better the code it generates.',
  points: [
    'Pick widely adopted frameworks with large communities (e.g. React)',
    'Prefer typed languages (e.g. TypeScript over JavaScript)',
    'Use convention-based frameworks with clear patterns',
    'Stick to well-documented, stable libraries',
  ],
  tip: 'Popular stacks like React + TypeScript, Next.js or Python produce the best results',
};

const RULE_PLAN_FIRST: RuleSlideData = {
  layout: 'rule',
  number: '05',
  title: 'Plan Before You Build',
  subtitle: 'Think it through first',
  mindmapId: 'agents-basic',
  description:
    'Never jump straight into code generation. Always create an implementation plan first. Review it, refine it and only then start building \u2014 one step at a time.',
  points: [
    'Break big features into small, manageable tasks',
    'Have the AI propose an architecture before coding',
    'Review the plan to catch issues before they\u2019re built',
    'Execute tasks one at a time, in sequence',
  ],
  tip: 'Most AI coding tools have a built-in "plan" or "architect" mode \u2014 always use it',
};

const RULE_GIVE_EYES: RuleSlideData = {
  layout: 'rule',
  number: '06',
  title: 'Give Eyes To Your Agent',
  subtitle: 'Visual feedback changes everything',
  mindmapId: 'mcp',
  description:
    'Connect browser automation tools so your AI can see what it\u2019s building. It can take screenshots, interact with your app, and verify things look right \u2014 like having a QA tester built in.',
  points: [
    'Connect browser automation via MCP servers',
    'Take screenshots and add them to the prompt for visual context',
    'Catch visual bugs the AI would otherwise miss',
    'Workflow: Agent describe the UI based on the context -> Meta prompt for Nano Banana -> Give image to the agent to implement it',
  ],
  tip: 'Tools like Puppeteer or Playwright MCP give your AI the ability to see and interact with your app',
};

const RULE_SAVE_PROGRESS: RuleSlideData = {
  layout: 'rule',
  number: '07',
  title: 'Save Your Progress Often',
  subtitle: 'Your undo button for everything',
  description:
    'Every time something works, save a checkpoint. Version control is like a save-game system \u2014 if something breaks, you can always roll back to the last working state.',
  points: [
    'Commit after every successful change',
    'Use separate branches for experiments',
    'Write clear descriptions of what each save contains',
    'Tag stable versions you might want to return to',
  ],
  tip: 'Set up your AI to auto-commit after tests pass \u2014 it\u2019s a game changer',
};

const RULE_SMALL_INSTRUCTIONS: RuleSlideData = {
  layout: 'rule',
  number: '08',
  title: 'Keep Instructions Small',
  subtitle: 'One task, one outcome',
  mindmapId: 'prompt-basic',
  description:
    'Large, vague requests produce large, vague results. Break everything into specific, focused instructions that can be completed and checked one at a time.',
  points: [
    '"Add a login form" \u2014 not "Build the auth system"',
    'One feature per conversation keeps focus sharp',
    'Verify each task before starting the next',
    'Smaller context = better AI performance',
  ],
  tip: 'Clear the context after each task to avoid confusion and context overload.',
};

const RULE_VERIFY_OUTPUT: RuleSlideData = {
  layout: 'rule',
  number: '09',
  title: 'Always Verify the Output',
  subtitle: 'Trust, but check',
  mindmapId: 'tdd',
  description:
    'AI-generated code can look correct but hide subtle bugs, security gaps, or poor patterns. Make verification a non-negotiable step in every cycle.',
  points: [
    'Run the code and test it yourself every time',
    'Ask the AI to write tests for its own code',
    'Use linting and type checking as automated guardrails',
    'Use an agent to review the code and explain what it does in plain language',
    'Review what changed before committing \u2014 understand the diff',
  ],
  tip: 'A quick "does this actually work?" check takes seconds and saves hours of debugging',
};

const ADVANCED_PROMPT_REQUESTS: RuleSlideData = {
  layout: 'rule',
  number: 'A1',
  title: 'The Rise of "Prompt Requests"',
  subtitle: 'Empowering non-programmers to build',
  mindmapId: 'prompt-requests',
  description:
    'Agentic engineering has significantly lowered the bar for entry into software development, allowing individuals who have never written code to contribute to complex projects.',
  points: [
    'Because agents can interpret intent and generate code, many contributions are now "prompt requests" \u2014 the user provides the prompt and the agent generates the PR',
    'These contributions represent a step up for humanity by turning consumers into builders (citing Peter Steinberger - creator of OpenClaw)',
  ],
  tip: 'Encourage prompt requests from non-technical teammates \u2014 every builder strengthens the team',
};

const ADVANCED_BUILDING_FOR_AGENT: RuleSlideData = {
  layout: 'rule',
  number: 'A2',
  title: 'Building for the Agent (The New DX)',
  subtitle: 'Make your codebase agent-navigable',
  mindmapId: 'agents-adv',
  description:
    'A core best practice is shifting your focus from making the codebase perfect for humans to making it easily navigable for an agent.',
  points: [
    "Empathise with the agent's perspective \u2014 they start every session fresh with no knowledge of your specific product or architecture",
    "Don't fight the agent on implementation details like variable naming \u2014 forcing a different name only makes it harder for the agent to find that code later",
    'Guide the agent with pointers to relevant files and architectural considerations rather than letting it wander blindly',
    'Write code for the agent, not just for humans \u2014 agents will be the ones maintaining and improving your software in the future, so structure, naming, and clarity should optimise for their comprehension too',
  ],
  tip: 'Think of DX as "Developer + Agent Experience" \u2014 optimise for both',
};

const ADVANCED_AGENT_AS_ENGINEER: RuleSlideData = {
  layout: 'rule',
  number: 'A3',
  title: 'The Agent as a Highly Skilled Engineer',
  subtitle: "Collaborate, don't just command",
  mindmapId: 'agents-adv',
  description:
    'In this paradigm, an agent is treated like a very capable engineer who generally makes good decisions but requires high-level oversight and discussion.',
  points: [
    'Approach the agent as a teammate \u2014 use the prompt "Do you have any questions for me?" to let it identify its own knowledge gaps',
    'Leverage cheap refactor cycles \u2014 after a task, ask: "What can we refactor?" or "What would you have done differently?"',
    'The human provides the vision, style, and "human touch" while the agent handles the data-shifting work',
  ],
  tip: 'Ask the agent what it would improve \u2014 cheap refactors catch non-optimal solutions early',
};

const ADVANCED_TECH_STACK: RuleSlideData = {
  layout: 'rule',
  number: 'A4',
  title: 'Navigating the Tech Stack',
  subtitle: 'Use the right tools for an agentic world',
  description:
    'Agents allow builders to move between different "tech galaxies" efficiently, provided they use the right tools for the job.',
  points: [
    'The ecosystem matters more than the language \u2014 a rich ecosystem of libraries, community support, and tooling is what makes agents truly effective',
    "TypeScript is often preferred for agentic projects \u2014 it's hackable, approachable, and agents are highly proficient in it",
    'Agents enable you to use languages you might not personally enjoy but that have beneficial characteristics (e.g. Go for resilient CLIs)',
    'Building with agents favours established ecosystems \u2014 if the agent has no training data for your stack, it becomes much harder to assist you',
  ],
  tip: 'Master agentic engineering through play \u2014 treat the agent as an infinitely patient answering machine',
  externalLink: {
    label: 'Explore the Map of GitHub \u2014 see how ecosystems cluster',
    url: 'https://anvaka.github.io/map-of-github/',
  },
};

const ADVANCED_CLEAN_ARCH: RuleSlideData = {
  layout: 'rule',
  number: 'A5',
  title: 'Clean Architecture Is Your AI Multiplier',
  subtitle: 'Domain-driven design makes agents dramatically more effective',
  mindmapId: 'ddd',
  description:
    'AI agents reason about code the same way a new engineer does \u2014 by reading structure, names, and boundaries. A clean, domain-driven architecture gives the agent an immediate mental model of your system, while a tangled codebase forces it to guess, hallucinate, and produce brittle code.',
  points: [
    'Bounded contexts act as natural scope limiters \u2014 agents can work within a single domain without accidentally coupling unrelated concerns',
    'Ubiquitous language in your code (entities, value objects, aggregates) gives the agent precise vocabulary \u2014 it generates code that fits your domain instead of generic CRUD',
    'Clear separation of layers (domain, application, infrastructure) lets agents know exactly where to place new logic without polluting boundaries',
    'Well-defined interfaces and ports mean the agent can implement adapters and services without needing to understand the entire system \u2014 reducing hallucination surface area',
    'Codebases with explicit domain models produce up to 2x more accurate AI-generated code compared to "big ball of mud" architectures',
  ],
  tip: 'Invest in clean architecture now \u2014 it pays compound interest every time an agent touches your codebase',
};

// --- Placeholder slide helper ---

function placeholder(
  mindmapId: string,
  title: string,
  subtitle: string,
  description: string
): RuleSlideData {
  return {
    layout: 'rule',
    title,
    subtitle,
    description,
    points: [],
    tip: '',
    placeholder: true,
    mindmapId,
  };
}

// --- Tier-specific slide arrays ---

export const TIER_SLIDES: Record<TierId, RuleSlideData[]> = {
  solo: [
    // Core Methods
    { ...RULE_USE_CLI, mindmapId: 'intro-tools' },
    placeholder(
      'vibe',
      'Vibe Coding',
      'Fast, intuition-led prompting loops',
      'Fast, intuition-led prompting loops \u2014 describe, run, adjust.'
    ),
    { ...RULE_SMALL_INSTRUCTIONS, mindmapId: 'prompt-basic' },
    { ...RULE_SET_CONTEXT, mindmapId: 'ctxeng-basic' },
    { ...RULE_SPECIALIST_AGENTS, mindmapId: 'skills-basic' },
    { ...RULE_PLAN_FIRST, mindmapId: 'agents-basic' },
    // Universal rules
    { ...RULE_SAVE_PROGRESS },
    { ...RULE_VERIFY_OUTPUT },
    // Starter Use Cases
    placeholder(
      'figma',
      'Figma \u2192 Code',
      'From design to working UI',
      'Screenshots or Figma file in, working UI out.'
    ),
    { ...RULE_AI_FRIENDLY_TECH, mindmapId: 'example-app' },
  ],
  team: [
    // Shared Methods
    placeholder(
      'meta',
      'Meta Prompting',
      'Prompts that generate prompts',
      'Prompts that generate or refine other prompts.'
    ),
    { ...RULE_GIVE_EYES, mindmapId: 'mcp' },
    placeholder(
      'plugins',
      'Plugins / Commands',
      'Reusable slash-commands',
      'Reusable slash-commands shared across the team.'
    ),
    placeholder(
      'spec-driven',
      'Spec-driven Development',
      'Write the spec first',
      'Write the spec first; the agent implements to it.'
    ),
    placeholder(
      'prd-light',
      'PRD (lightweight)',
      'One-page product brief',
      'One-page product brief the agent can read.'
    ),
    {
      ...RULE_VERIFY_OUTPUT,
      mindmapId: 'tdd',
      title: 'Testing & TDD',
      subtitle: 'Tests as acceptance criteria',
      number: undefined,
    },
    placeholder(
      'bdd',
      'Agentic BDD',
      'Given/When/Then for agents',
      'Given/When/Then scenarios aimed at agents.'
    ),
    // Carried forward
    { ...RULE_AI_FRIENDLY_TECH },
    { ...ADVANCED_TECH_STACK },
    // Delivery
    placeholder(
      'as-npm',
      'Delivery: npm Package',
      'Versioned distribution',
      'Versioned distribution through the language ecosystem you already use.'
    ),
    placeholder(
      'as-plugin',
      'Delivery: Plugin',
      'Packaged for agent runtimes',
      'Packaged for an agent runtime (Claude Code, Cursor, etc.).'
    ),
    // Team Use Cases
    placeholder(
      'specs',
      'Writing & Evolving Specs',
      'Iterating on executable specifications',
      'Iterating on executable specifications together.'
    ),
    placeholder(
      'migration',
      'Migration (e.g. \u2192 Go)',
      'Cross-language refactor',
      'Cross-language refactor driven by an agent with a test safety net.'
    ),
  ],
  scaling: [
    // Advanced Methods
    { ...ADVANCED_AGENT_AS_ENGINEER, mindmapId: 'agents-adv' },
    { ...ADVANCED_BUILDING_FOR_AGENT, mindmapId: 'agents-adv' },
    placeholder(
      'steering',
      'Agentic Steering',
      'Keeping agents aligned to intent',
      'Keeping agents aligned to intent during a run.'
    ),
    placeholder(
      'alignment',
      'Agentic Alignment',
      'Constraints & guardrails',
      'Constraints & guardrails for expected behaviour.'
    ),
    { ...ADVANCED_CLEAN_ARCH, mindmapId: 'ddd' },
    placeholder(
      'orchestration',
      'Agent Orchestration / Symphony',
      'Coordinating multiple agents',
      'Coordinating multiple cooperating agents.'
    ),
    placeholder(
      'scrum',
      'Scrum with Agents',
      'Sprint ceremonies with agents',
      'Sprint ceremonies that include agents as contributors.'
    ),
    placeholder(
      'linters',
      'Custom Linters',
      'Codify team taste',
      'Rules that codify team taste for agent output.'
    ),
    { ...ADVANCED_PROMPT_REQUESTS, mindmapId: 'prompt-requests' },
    placeholder(
      'adr',
      'ADR',
      'Architecture Decision Records',
      'Architectural Decision Records \u2014 the audit trail of why.'
    ),
    placeholder(
      'prd-full',
      'PRD (formal)',
      'Full product spec',
      'Full product spec feeding many agent workflows.'
    ),
    // Platform Delivery
    placeholder(
      'as-mcp',
      'Platform: MCP Server',
      'Expose internal tools via MCP',
      'Expose internal tools/data via the Model Context Protocol.'
    ),
    placeholder(
      'skills-auth',
      'Platform: Skills (authoring)',
      'Author skills for the org',
      'Author and version skills for the rest of the org.'
    ),
    // Open Questions
    placeholder(
      'monorepo',
      'Monorepo?',
      'Does a monorepo help or hurt agent context?',
      'Does a monorepo help or hurt agent context?'
    ),
    placeholder(
      'docker-eng',
      'Docker-based Engineering?',
      'Isolated per-task environments',
      'Isolated per-task environments for every agent run.'
    ),
    placeholder(
      'fe-be',
      'Frontend / Backend mix?',
      'Which layers benefit most?',
      'Which layers benefit most from agent-first workflows?'
    ),
    placeholder(
      'opps',
      'Opportunities vs Challenges',
      'Weighing the trade-offs',
      'Weighing opportunities against the real risks.'
    ),
    // Use Cases
    placeholder(
      'autonom',
      'Autonomous Agents',
      'Long-running, goal-seeking agents',
      'Long-running, goal-seeking agents across services.'
    ),
    placeholder(
      'mcp-agent-mds',
      'MCP for Agent.mds',
      'Standardising agent descriptions',
      'Standardising agent descriptions via MCP.'
    ),
  ],
  enterprise: [
    // Ops & Governance
    placeholder(
      'devsecops',
      'Dev / Sec / Ops',
      'Security & operations for agents',
      'Security & operations tailored to agent workflows.'
    ),
    placeholder(
      'monitoring',
      'Monitoring',
      'Observability across agent runs',
      'Observability across agent runs and tool calls.'
    ),
    placeholder(
      'traceability',
      'Traceability',
      'From prompt to commit',
      'From prompt to commit \u2014 who asked, who built, who reviewed.'
    ),
    placeholder(
      'change-mgmt',
      'Change Management',
      'Controlled rollout',
      'Controlled rollout of agent-generated change.'
    ),
    placeholder(
      'central-alignment',
      'Global / Central Alignment',
      'One source of truth',
      'One source of truth for agent behaviour across the company.'
    ),
    // Compliance & Risk
    placeholder(
      'eu-souv',
      'EU Sovereignty',
      'Data & compute residency',
      'Data & compute residency inside the EU.'
    ),
    placeholder(
      'dsgvo',
      'DSGVO / GDPR',
      'Personal-data handling',
      'Personal-data handling compliant with GDPR.'
    ),
    placeholder(
      'more-risks',
      'Further Risks',
      'IP, licensing, secrets, liability',
      'IP, licensing, secrets, auditability, liability.'
    ),
    // New Roles
    placeholder(
      'tech-po',
      'Technische Product Owner',
      'PO fluent in specs and agent limits',
      'PO fluent in specs, constraints and agent limits.'
    ),
    placeholder(
      'dev-journey',
      'Developer Journey Owner',
      'End-to-end developer experience',
      'Owner of the end-to-end developer experience.'
    ),
    placeholder(
      'devops-menschen',
      'DevOps Menschen',
      'Operators for the agent fleet',
      'Operators who keep the agent fleet running.'
    ),
    // Enterprise Use Cases
    placeholder(
      'trace-change',
      'Traceability & Change Mgmt',
      'End-to-end audit',
      'End-to-end audit of every agent-initiated change.'
    ),
    placeholder(
      'who-changed',
      'Full Audit Trail',
      'Who changed what, and why',
      'Full audit: who changed what, and why.'
    ),
  ],
  philosophical: [
    {
      layout: 'rule',
      number: '',
      title: 'AI as a New Stakeholder',
      subtitle: 'Our source code now has one more audience',
      description:
        'Agents are becoming first-class consumers of your codebase. Just as you write readable code for fellow developers, you now need to consider how easily an AI agent can parse, navigate, and reason about your source code.',
      points: [],
      tip: "Write code as if the next person reading it has no institutional knowledge \u2014 because your agent doesn't",
    } as RuleSlideData,
  ],
};

// --- Universal slides ---

export const TIER_SELECTION_SLIDE: TierSelectionSlideData = {
  layout: 'tier-selection',
  title: 'Where Are You on the Journey?',
  subtitle: 'Choose your path \u2014 we\u2019ll tailor the content to your level',
};

export const SLIDES: SlideData[] = [
  {
    layout: 'cover',
    title: 'From Vibes to Production',
    subtitle: 'The playbook for building software with AI',
    badge: '2026 Edition',
  },
  {
    layout: 'author',
    title: `Created by ${CREATOR_CONFIG.name}`,
    role: CREATOR_CONFIG.role,
    socialCall2Action: 'Follow me for more insights on leveraging AI',
    linkedinUrl: CREATOR_CONFIG.linkedinUrl,
    xUrl: CREATOR_CONFIG.xUrl,
    position: 'opening',
    toolsLabel: 'Maker of',
    tools: CREATOR_CONFIG.tools,
  },
  {
    layout: 'intro',
    title: 'From Vibes to Engineering',
    description:
      'Building with AI is a continuum \u2014 from fast, intuition-led prototyping to fully structured, production-grade systems. Most teams move along this spectrum as their project matures.',
    continuum: [
      {
        label: 'Vibe Coding',
        tagline: 'Go with the flow',
        icon: 'Sparkles',
        traits: [
          'Plain-language intent',
          'AI handles details',
          'Fast iteration',
          'Best for exploration & MVPs',
        ],
      },
      {
        label: 'Guided Prompting',
        tagline: 'Add light structure',
        icon: 'Compass',
        traits: [
          'Context files & rules',
          'Reusable prompts',
          'Consistent patterns',
          'Best for solo projects',
        ],
      },
      {
        label: 'Structured Agents',
        tagline: 'Define the process',
        icon: 'Layers',
        traits: [
          'Specialist agents & roles',
          'Spec-driven development',
          'Testing & validation',
          'Best for team delivery',
        ],
      },
      {
        label: 'Agentic Engineering',
        tagline: 'Engineer the system',
        icon: 'Settings',
        traits: [
          'Orchestrated agent fleets',
          'Guardrails & traceability',
          'Repeatable quality',
          'Best for production at scale',
        ],
      },
    ],
  },
  TIER_SELECTION_SLIDE,
];

export const SUMMARY_SLIDE: SummarySlideData = {
  layout: 'summary',
  title: 'The Golden Rules',
  subtitle: 'Your quick-reference cheat sheet',
  rules: [], // dynamically populated by assembler
};

export const CLOSING_SLIDE: SlideData = {
  layout: 'closing',
  title: 'Start Building Today',
  subtitle:
    'Pick a small project. Set up your tools. Start prompting.\nThe best way to learn vibe coding is to do it.',
  cta: 'Happy Building!',
  surveyUrl: CREATOR_CONFIG.surveyUrl,
  surveyLabel: 'Enjoyed this guide? Take a 7-minute survey and get 50% off VibesMonitor.',
  surveyDetail: 'Take the Survey \u2014 Get 50% Off VibesMonitor',
};
