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
    'Standardised alignment and steering possibilities (agents, skills, MCPs etc.)',
    'Persistent memory of your entire codebase',
    'Run, test, and deploy \u2014 all from one place',
    'Use Agentic Mode',
    'For planning use the latest Opus and depending on the complexity of the task Sonnet/Opus models for execution',
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

const RULE_CREATE_AGENT: RuleSlideData = {
  layout: 'rule',
  number: '03',
  title: 'Create Your Agent',
  subtitle: 'Set up an AI coding agent in your tool of choice',
  mindmapId: 'skills-basic',
  description:
    'Before you can build anything, you need a running agent. Pick a CLI tool \u2014 Claude Code, Codex CLI, Gemini CLI \u2014 and create your first agent. This is where your AI teammate comes to life.',
  points: [
    'Install the CLI and authenticate (e.g. `claude` for Claude Code, `codex` for Codex CLI)',
    'Point the agent at your project directory so it has access to your codebase',
    'Configure the model \u2014 start with the most capable one available for your tool',
    'Run your first prompt to verify everything works end-to-end',
  ],
  tip: 'Claude Code: `claude` \u00b7 Codex CLI: `codex` \u00b7 Gemini CLI: `gemini` \u2014 pick one and get it running in under 5 minutes',
};

const RULE_AI_FRIENDLY_TECH: RuleSlideData = {
  layout: 'rule',
  number: '04',
  title: 'Choose AI-Friendly Technologies',
  subtitle: 'Not all tech stacks are generated equal',
  mindmapId: 'ai-friendly-tech',
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
  mindmapId: 'planning',
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
    'Workflow: Agent describes the UI based on context \u2192 generate a visual mockup with an image tool \u2192 feed the image back to the agent to implement it',
  ],
  tip: 'Tools like Puppeteer or Playwright MCP give your AI the ability to see and interact with your app',
};

const RULE_SAVE_PROGRESS: RuleSlideData = {
  layout: 'rule',
  number: '07',
  title: 'Save Your Progress Often',
  subtitle: 'Your undo button for everything',
  mindmapId: 'version-control',
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
  mindmapId: 'building-for-agent',
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

// --- Tier-specific slide arrays ---

export const TIER_SLIDES: Record<TierId, RuleSlideData[]> = {
  solo: [
    // Core Methods
    { ...RULE_USE_CLI, number: 'B01', mindmapId: 'intro-tools' },
    {
      layout: 'rule',
      number: 'B02',
      title: 'Vibe Coding',
      subtitle: 'Fast, intuition-led prompting loops',
      mindmapId: 'vibe',
      description:
        'Vibe coding is the art of describing what you want in plain language and letting the AI figure out the implementation. It\u2019s the fastest way to go from idea to working prototype.',
      points: [
        'Describe the outcome you want, not the code you need \u2014 "make a landing page with a hero section and signup form"',
        'Iterate in tight loops: prompt, see the result, refine, repeat',
        'Don\u2019t worry about perfection \u2014 the goal is speed and exploration',
        'Great for MVPs, prototypes, and learning what\u2019s possible',
      ],
      tip: 'Start every session with a clear goal: "By the end of this session, I want a working [X]"',
    } as RuleSlideData,
    { ...RULE_SMALL_INSTRUCTIONS, number: 'B03', mindmapId: 'prompt-basic' },
    { ...RULE_SET_CONTEXT, number: 'B04', mindmapId: 'ctxeng-basic' },
    { ...RULE_CREATE_AGENT, number: 'B05', mindmapId: 'skills-basic' },
    { ...RULE_PLAN_FIRST, number: 'B06' },
    // Universal rules
    { ...RULE_SAVE_PROGRESS, number: 'B07' },
    { ...RULE_VERIFY_OUTPUT, number: 'B08' },
    // Starter Use Cases
    {
      layout: 'rule',
      number: 'B09',
      title: 'Image / Design \u2192 Code',
      subtitle: 'From any visual to working UI',
      mindmapId: 'design-to-code',
      description:
        'One of the most powerful solo workflows: take any visual \u2014 a screenshot, sketch, wireframe, or design tool export \u2014 and turn it into a working frontend in minutes. Agents understand images natively.',
      points: [
        'Feed any image directly into the agent: screenshots, photos of whiteboard sketches, PDF mockups, or design tool exports',
        'Most CLI tools and agentic IDEs support image input \u2014 drag and drop or paste from clipboard',
        'Ask the agent to match the layout, spacing, and colours from the visual reference',
        'Iterate visually: screenshot the result, compare side-by-side, ask the agent to fix differences',
      ],
      tip: 'A napkin sketch is enough to get started \u2014 the agent fills in the gaps and you refine from there',
    } as RuleSlideData,
    { ...RULE_AI_FRIENDLY_TECH, number: 'B10' },
    {
      layout: 'rule',
      number: 'B11',
      title: 'Mind Your Token Budget',
      subtitle: 'AI power has a price tag \u2014 know yours',
      mindmapId: 'cost-solo',
      description:
        'Every prompt costs tokens, and tokens cost money. As a solo builder, understanding your spend prevents surprises and helps you choose the right model for each task.',
      points: [
        'Check your provider\u2019s dashboard daily \u2014 most offer usage breakdowns by model and session',
        'Use the most capable model (Opus) for planning and architecture, then switch to a faster model (Sonnet) for repetitive implementation tasks',
        'Keep context small \u2014 large file dumps burn tokens fast with diminishing returns',
        'Set a monthly budget alert (e.g. $50\u2013$100) so you learn your actual usage pattern before it surprises you',
      ],
      tip: 'A single well-scoped prompt with good context often costs less and produces better results than ten vague ones',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'B12',
      title: 'When to Level Up',
      subtitle: 'Signals that you\u2019ve outgrown solo workflows',
      mindmapId: 'transition-solo',
      description:
        'Solo practices get you far, but certain pain points signal it\u2019s time for team-level structure. Recognising these signals early prevents tech debt from compounding.',
      points: [
        'You\u2019re copy-pasting your CLAUDE.md or context files between projects without a shared standard',
        'A second contributor joins and produces inconsistent output because they prompt differently',
        'You spend more time explaining "how we do things here" than building \u2014 conventions need to be codified',
        'Your test coverage is whatever you remembered to check manually \u2014 no CI, no gates, no shared suite',
      ],
      tip: 'The moment a second person touches the codebase, you need shared specs, shared tests, and shared prompts \u2014 that\u2019s Tier 2',
    } as RuleSlideData,
  ],
  team: [
    // Shared Methods
    {
      layout: 'rule',
      number: 'T01',
      title: 'Meta Prompting',
      subtitle: 'Prompts that generate prompts',
      mindmapId: 'meta',
      description:
        'Meta prompting is the practice of using AI to create, refine, and optimise the prompts your team uses daily. Instead of hand-crafting every instruction, you teach the agent how to generate better instructions for itself.',
      points: [
        'Ask the agent to write a system prompt for a specific task \u2014 then critique and refine it together',
        'Build a library of reusable prompt templates the whole team can share',
        'Use meta prompts to convert vague requirements into structured agent instructions',
        'Iterate on prompt quality the same way you iterate on code \u2014 version and review them',
      ],
      tip: 'Start with: "Write me a system prompt for an agent that does [X]. Include constraints, examples, and edge cases."',
    } as RuleSlideData,
    { ...RULE_GIVE_EYES, number: 'T02', mindmapId: 'mcp' },
    {
      layout: 'rule',
      number: 'T03',
      title: 'Plugins / Commands',
      subtitle: 'Reusable slash-commands shared across the team',
      mindmapId: 'plugins',
      description:
        'Slash commands and plugins let you package complex multi-step workflows into single, shareable actions. This turns tribal knowledge into team infrastructure.',
      points: [
        'Create custom slash commands for repetitive tasks \u2014 /review, /migrate, /deploy',
        'Package best practices as plugins so every team member gets the same quality baseline',
        'Version your plugins alongside your code \u2014 they\u2019re part of the project',
        'Share commands across projects via your tool\u2019s plugin registry or a shared config repo',
      ],
      tip: 'Start with the 3 tasks your team does most often \u2014 those are your first plugins',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T04',
      title: 'Spec-driven Development',
      subtitle: 'Write the spec first; the agent implements to it',
      mindmapId: 'spec-driven',
      description:
        'Instead of describing features in conversation, write a specification document first. The agent implements against the spec, making results predictable and reviewable.',
      points: [
        'Write specs in Markdown with clear sections: purpose, inputs, outputs, constraints, examples',
        'Include acceptance criteria \u2014 the agent uses these to self-verify its implementation',
        'Specs become living documentation that evolves with the codebase',
        'Multiple agents can implement against the same spec independently \u2014 great for parallel work',
      ],
      tip: 'A 20-minute spec saves hours of back-and-forth \u2014 the agent delivers right the first time',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T05',
      title: 'PRD (lightweight)',
      subtitle: 'One-page product brief the agent can read',
      mindmapId: 'prd-light',
      description:
        'A lightweight Product Requirements Document gives the agent just enough context to understand what you\u2019re building and why. It\u2019s not a 50-page waterfall spec \u2014 it\u2019s a focused brief.',
      points: [
        'Keep it to one page: problem statement, target user, key features, success criteria',
        'Include what\u2019s explicitly out of scope \u2014 this prevents scope creep in agent output',
        'Write for the agent: use clear, unambiguous language with concrete examples',
        'Update the PRD as the project evolves \u2014 it\u2019s a living document',
      ],
      tip: 'Ask the agent to review your PRD for gaps before starting implementation',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T06',
      title: 'Testing & TDD',
      subtitle: 'Your team\u2019s shared safety net',
      mindmapId: 'tdd',
      description:
        'In a team setting, tests aren\u2019t just personal sanity checks \u2014 they\u2019re the contract between contributors. When multiple engineers and agents push code to the same repo, automated tests are the only reliable way to catch regressions before they ship.',
      points: [
        'Write tests first (TDD) so the agent has clear acceptance criteria before it starts coding',
        'Run the full test suite in CI on every agent-generated PR \u2014 no exceptions, no manual-only checks',
        'Assign test ownership: each module has a human responsible for reviewing test quality, not just coverage numbers',
        'Use agents to generate test scaffolds, then review for edge cases \u2014 agents often miss boundary conditions and race conditions',
        'Set a coverage gate (e.g. 80%) that blocks merges \u2014 agents will write tests to satisfy it automatically',
      ],
      tip: 'The fastest way to onboard an agent to your codebase is to point it at the test suite \u2014 tests are the best documentation',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T07',
      title: 'Agentic BDD',
      subtitle: 'Given/When/Then scenarios aimed at agents',
      mindmapId: 'bdd',
      description:
        'Behaviour-Driven Development becomes even more powerful with agents. Write Given/When/Then scenarios and the agent implements both the feature and the test in one pass.',
      points: [
        'Write scenarios in Gherkin syntax \u2014 agents understand it natively',
        'Each scenario is an executable acceptance criterion the agent must satisfy',
        'The agent generates step definitions, feature code, and test harness together',
        'Non-technical stakeholders can contribute scenarios in plain language',
      ],
      tip: 'Start with the happy path, then ask the agent: "What edge cases should I add?"',
    } as RuleSlideData,
    // Carried forward
    { ...ADVANCED_TECH_STACK, number: 'T08' },
    // Delivery
    {
      layout: 'rule',
      number: 'T09',
      title: 'Delivery: npm Package',
      subtitle: 'Versioned distribution through your ecosystem',
      mindmapId: 'as-npm',
      description:
        'When your team builds reusable agent tooling, packaging it as an npm module (or equivalent) makes it versionable, testable, and shareable \u2014 just like any other dependency.',
      points: [
        'Publish shared prompt templates, agent configs, and utilities as packages',
        'Use semantic versioning so consumers know when breaking changes land',
        'Include TypeScript types for agent configurations \u2014 catch errors at compile time',
        'Set up CI to test that agents produce expected output with each package release',
      ],
      tip: 'Treat agent tooling packages with the same rigour as your production libraries',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T10',
      title: 'Delivery: Plugin',
      subtitle: 'Packaged for agent runtimes',
      mindmapId: 'as-plugin',
      description:
        'Plugins package capabilities for a specific agent runtime \u2014 Claude Code, Cursor, Copilot, etc. They\u2019re the delivery vehicle for team-specific workflows.',
      points: [
        'Wrap complex multi-step workflows into a single plugin that any teammate can invoke',
        'Plugins can include MCP server connections, custom prompts, and validation logic',
        'Distribute via your tool\u2019s marketplace or internal registry',
        'Version plugins alongside the codebase they support',
      ],
      tip: 'Build plugins for your team\u2019s top 3 pain points first \u2014 adoption follows value',
    } as RuleSlideData,
    // Team Use Cases
    {
      layout: 'rule',
      number: 'T11',
      title: 'Writing & Evolving Specs',
      subtitle: 'Iterating on executable specifications together',
      mindmapId: 'specs',
      description:
        'In a team setting, specs become the shared contract between humans and agents. Writing and evolving them together is one of the most impactful team practices.',
      points: [
        'Start with a rough spec, let the agent identify gaps and inconsistencies',
        'Review spec PRs like code PRs \u2014 the spec is the source of truth for agent behaviour',
        'Use the agent to check if existing code still satisfies an updated spec',
        'Evolve specs incrementally: each sprint refines the spec alongside the implementation',
      ],
      tip: 'A spec that the agent can read is a spec that any new team member can read too',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T12',
      title: 'Migration (e.g. \u2192 Go)',
      subtitle: 'Cross-language refactor with a safety net',
      mindmapId: 'migration',
      description:
        'Agents make cross-language migrations dramatically more feasible. Write tests in the target language first, then let the agent port the logic while the tests keep it honest.',
      points: [
        'Start by generating comprehensive tests from the existing codebase \u2014 these are your safety net',
        'Migrate module by module, not all at once \u2014 the agent keeps context better on small units',
        'Use the agent in both source and target languages simultaneously \u2014 it can reason about equivalence',
        'Let the agent propose idiomatic patterns in the target language rather than literal translations',
      ],
      tip: 'The agent is fluent in many languages \u2014 use it to adopt the idioms of your target stack, not just translate syntax',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T13',
      title: 'Team Cost Management',
      subtitle: 'Shared accounts, shared visibility, shared budgets',
      mindmapId: 'cost-team',
      description:
        'When multiple engineers run agents daily, token costs scale fast. Visibility and simple controls prevent budget surprises without slowing anyone down.',
      points: [
        'Use a shared organisation account with per-developer API keys \u2014 track who spends what',
        'Set per-developer monthly budgets ($200\u2013$500 is typical for a small team) with alerts at 80%',
        'Agree on model tiers: Opus for architecture and complex reasoning, Sonnet for implementation and iteration',
        'Review team spend weekly in standup \u2014 normalise cost awareness the way you normalise code review',
      ],
      tip: 'Cost visibility turns token spend from a mystery into a metric \u2014 teams that track it naturally optimise it',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T14',
      title: 'When to Level Up',
      subtitle: 'Signals your team needs platform-level practices',
      mindmapId: 'transition-team',
      description:
        'Small-team practices work beautifully for 2\u201310 engineers. But as you grow beyond that, certain friction signals tell you it\u2019s time for organisational-scale structure.',
      points: [
        'Multiple teams are building their own agent plugins, prompts, or MCP integrations independently \u2014 duplication is creeping in',
        'Agent output quality varies wildly between teams because each has its own alignment rules',
        'You need a dedicated person or team to maintain shared agent infrastructure \u2014 the "platform team" pattern is emerging',
        'Governance is ad-hoc: there\u2019s no consistent way to review, approve, or audit agent-generated changes across teams',
      ],
      tip: 'When you hear "we built our own version of that" from a second team, it\u2019s time for a shared platform \u2014 that\u2019s Tier 3',
    } as RuleSlideData,
  ],
  scaling: [
    // Advanced Methods
    { ...ADVANCED_AGENT_AS_ENGINEER, number: 'O01' },
    { ...ADVANCED_BUILDING_FOR_AGENT, number: 'O02' },
    {
      layout: 'rule',
      number: 'O03',
      title: 'Agentic Steering',
      subtitle: 'Keeping agents aligned to intent during a run',
      mindmapId: 'steering',
      description:
        'As agents take on longer, multi-step tasks, they can drift from the original intent. Agentic steering is the set of techniques to keep them on course without micromanaging every step.',
      points: [
        'Define checkpoints where the agent must summarise progress and confirm direction before continuing',
        'Use "do you have any questions?" prompts at natural breakpoints to catch misunderstandings early',
        'Set explicit constraints: "Do not modify files outside of /src/api" or "Stop and ask if the change affects more than 3 files"',
        'Review intermediate output, not just the final result \u2014 course-correct while the context is still fresh',
      ],
      tip: 'The earlier you steer, the cheaper the correction \u2014 a 10-second check beats a 10-minute rollback',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O04',
      title: 'Agentic Alignment',
      subtitle: 'Constraints & guardrails for expected behaviour',
      mindmapId: 'alignment',
      description:
        'Alignment goes beyond individual steering \u2014 it\u2019s the organisational framework that ensures all agents across all teams behave consistently and within acceptable boundaries.',
      points: [
        'Define organisation-wide CLAUDE.md / .cursorrules files with shared constraints',
        'Establish forbidden patterns: no direct database mutations, no secrets in code, no unapproved dependencies',
        'Create positive examples: "When implementing API endpoints, follow this pattern..."',
        'Automate alignment checks \u2014 run linters and validators on agent output before it merges',
      ],
      tip: 'Alignment documents are living contracts between your organisation and its agents \u2014 review them quarterly',
    } as RuleSlideData,
    { ...ADVANCED_CLEAN_ARCH, number: 'O05', mindmapId: 'ddd' },
    {
      layout: 'rule',
      number: 'O06',
      title: 'Agent Orchestration / Symphony',
      subtitle: 'Coordinating multiple cooperating agents',
      mindmapId: 'orchestration',
      description:
        'When a single agent isn\u2019t enough, orchestration coordinates multiple specialised agents working on different parts of the same problem \u2014 like a symphony where each instrument plays its part.',
      points: [
        'Decompose large tasks into subtasks that can be assigned to specialist agents in parallel',
        'Use a planner agent to break down work and a reviewer agent to validate the combined output',
        'Define clear interfaces between agents: one writes the API, another writes the tests, a third writes the docs',
        'Monitor for conflicts: two agents editing the same file is a merge nightmare \u2014 use isolation (worktrees, branches)',
      ],
      tip: 'Start with 2 agents (implementer + reviewer) before scaling to a full orchestra',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O07',
      title: 'Scrum with Agents',
      subtitle: 'Sprint ceremonies that include agents as contributors',
      mindmapId: 'scrum',
      description:
        'Agents don\u2019t replace your scrum process \u2014 they accelerate it. Treat agent contributions like any team member\u2019s work: planned, reviewed, and tracked.',
      points: [
        'Include agent tasks in sprint planning \u2014 estimate them like you would human tasks (they\u2019re faster but need review)',
        'Use the agent in refinement: "Break this epic into implementable stories with acceptance criteria"',
        'Agent PRs go through the same review process as human PRs \u2014 no shortcuts',
        'Track agent velocity separately at first \u2014 you\u2019ll learn what to delegate and what to keep human',
      ],
      tip: 'The best sprint retrospective question: "What could we have delegated to an agent this sprint?"',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O08',
      title: 'Custom Linters',
      subtitle: 'Rules that codify team taste for agent output',
      mindmapId: 'linters',
      description:
        'Standard linters catch syntax issues. Custom linters encode your team\u2019s opinions about architecture, naming, and patterns \u2014 ensuring agent output matches your standards automatically.',
      points: [
        'Write ESLint/Biome rules for patterns you keep correcting in agent output',
        'Enforce architectural boundaries: "No imports from /infrastructure in /domain"',
        'Add custom rules for naming conventions, file structure, and module boundaries',
        'Run linters as pre-commit hooks so agents can self-correct before you review',
      ],
      tip: 'Every time you reject an agent\u2019s output for the same reason twice, write a linter rule',
    } as RuleSlideData,
    { ...ADVANCED_PROMPT_REQUESTS, number: 'O09', mindmapId: 'prompt-requests' },
    {
      layout: 'rule',
      number: 'O10',
      title: 'Architecture Decision Records',
      subtitle: 'The audit trail of why',
      mindmapId: 'adr',
      description:
        'ADRs document the reasoning behind architectural decisions. For agents, they\u2019re essential context \u2014 without them, the agent can\u2019t understand why the codebase is shaped the way it is.',
      points: [
        'Record every significant decision: "We chose PostgreSQL over MongoDB because..."',
        'Include rejected alternatives and the reasoning \u2014 this prevents agents from suggesting them again',
        'Store ADRs in the repo alongside the code they describe',
        'Reference ADRs in your agent context files so they inform every session',
      ],
      tip: 'Ask the agent to draft the ADR after a decision \u2014 it\u2019s faster and surprisingly thorough',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O11',
      title: 'PRD (formal)',
      subtitle: 'Full product spec feeding many agent workflows',
      mindmapId: 'prd-full',
      description:
        'At scale, a formal PRD becomes the single source of truth that feeds multiple agent workflows: implementation, testing, documentation, and deployment.',
      points: [
        'Structure the PRD with machine-readable sections: user stories, acceptance criteria, API contracts, data models',
        'Link PRD sections to specific agent tasks \u2014 each section generates a work stream',
        'Use the PRD to automatically generate test suites, API stubs, and documentation scaffolds',
        'Keep the PRD in version control \u2014 changes to the PRD trigger agent re-evaluation of affected components',
      ],
      tip: 'A formal PRD is expensive to write but cheap to maintain \u2014 the agents keep it honest',
    } as RuleSlideData,
    // Platform Delivery
    {
      layout: 'rule',
      number: 'O12',
      title: 'Platform: MCP Server',
      subtitle: 'Expose internal tools via the Model Context Protocol',
      mindmapId: 'as-mcp',
      description:
        'An MCP server lets you expose internal tools, databases, and APIs as capabilities that any agent can discover and use. It\u2019s the plumbing that connects agents to your organisation\u2019s infrastructure.',
      points: [
        'Wrap internal APIs as MCP tools with clear descriptions, parameters, and return types',
        'Agents can discover and call these tools without custom integration code',
        'Centralise access control \u2014 the MCP server enforces who can call what',
        'Add observability: log every tool invocation for audit and debugging',
      ],
      tip: 'Start by exposing read-only tools (search, lookup) before adding write capabilities',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O13',
      title: 'Platform: Skills (authoring)',
      subtitle: 'Author and version skills for the rest of the org',
      mindmapId: 'skills-auth',
      description:
        'Skills are pre-packaged agent capabilities that encapsulate a complete workflow. Authoring skills for your org means turning expert knowledge into reusable, versioned capabilities any team can invoke.',
      points: [
        'Package domain-specific workflows: "/deploy-staging", "/run-security-scan", "/generate-changelog"',
        'Include validation and guardrails inside the skill so consumers get safe output by default',
        'Version skills and publish them to an internal registry \u2014 treat them like internal packages',
        'Write skill documentation the way you\u2019d write API docs: inputs, outputs, side effects, examples',
      ],
      tip: 'The best skills are born from repetitive tasks \u2014 if you\u2019ve done it 5 times, package it',
    } as RuleSlideData,
    // Open Questions
    {
      layout: 'rule',
      number: 'O14',
      title: 'Monorepo or Polyrepo',
      subtitle: 'A decision framework for agent-friendly repo structure',
      mindmapId: 'monorepo',
      description:
        'Your repo structure directly affects how well agents navigate your codebase. Neither monorepo nor polyrepo is universally better \u2014 the right choice depends on your team size, context window budget, and cross-package coupling.',
      points: [
        'Choose monorepo when: shared types are critical, cross-package refactors are frequent, and you use workspace-aware tools (nx, turborepo) to scope agent context',
        'Choose polyrepo when: teams are autonomous, packages rarely change together, and you want hard boundaries that prevent agents from making unintended cross-repo changes',
        'Key constraint: large monorepos can exceed agent context limits \u2014 if your agent needs to read >50 files to understand a change, the repo is too wide for its context',
        'Hybrid approach: monorepo for tightly coupled services, separate repos for independent products \u2014 match repo boundaries to domain boundaries',
      ],
      tip: 'The test: can your agent complete a typical task without needing files from more than one workspace package? If yes, monorepo works.',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O15',
      title: 'Containerised Agent Environments',
      subtitle: 'When to isolate agent runs in Docker',
      mindmapId: 'docker-eng',
      description:
        'Running agents in isolated containers adds reproducibility and safety, but also adds setup overhead. Use this framework to decide when the trade-off is worth it.',
      points: [
        'Use containers when: agents run untrusted code, parallel agents touch shared state, or you need reproducible builds for audit (regulated environments)',
        'Skip containers when: agents only read/write files in a sandboxed worktree, your CI already provides isolation, or the setup cost slows iteration below useful speed',
        'Pin dependency versions in the container image \u2014 eliminates environment drift between agent sessions',
        'Container logs provide a complete, replayable audit trail of every agent action \u2014 valuable for debugging and compliance',
      ],
      tip: 'Start with containerised CI agents (low risk, high value) before moving to containerised dev environments',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O16',
      title: 'Allocating Agents Across the Stack',
      subtitle: 'Where agents deliver the most value by layer',
      mindmapId: 'fe-be',
      description:
        'Not all layers of your stack benefit equally from agentic engineering. Allocate agents where they have the highest leverage: clear inputs, testable outputs, and minimal subjective judgement.',
      points: [
        'Highest leverage \u2014 Backend APIs, data models, business logic: clear contracts, strong testability, agents excel here',
        'High leverage \u2014 Infrastructure/DevOps: agents generate IaC (Terraform, Pulumi) reliably from high-level descriptions',
        'Medium leverage \u2014 Cross-cutting concerns (auth, logging, monitoring): agents ensure consistent implementation across services',
        'Lower leverage \u2014 Frontend UI: agents scaffold well but struggle with visual nuance \u2014 always pair with screenshot feedback loops',
      ],
      tip: 'Rule of thumb: the more testable a layer is, the more effective an agent will be in it',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O17',
      title: 'Opportunities vs Challenges',
      subtitle: 'Weighing the real trade-offs at scale',
      mindmapId: 'opps',
      description:
        'Scaling agentic engineering across an organisation brings transformative opportunities alongside genuine challenges. Being clear-eyed about both is essential.',
      points: [
        'Opportunity: 10x developer productivity on well-scoped, well-tested tasks',
        'Opportunity: Democratisation \u2014 non-engineers can contribute via prompts',
        'Challenge: Quality assurance at scale \u2014 who reviews agent output when there\u2019s too much to read?',
        'Challenge: Knowledge erosion \u2014 if agents write all the code, does the team still understand the system?',
      ],
      tip: 'The biggest risk isn\u2019t bad code \u2014 it\u2019s losing the ability to evaluate whether the code is good',
    } as RuleSlideData,
    // Use Cases
    {
      layout: 'rule',
      number: 'O18',
      title: 'Autonomous Agents',
      subtitle: 'Long-running, goal-seeking agents across services',
      mindmapId: 'autonom',
      description:
        'Autonomous agents operate with minimal human intervention, pursuing high-level goals across multiple services and codebases. They\u2019re the most advanced and highest-risk application of agentic engineering.',
      points: [
        'Define success criteria upfront \u2014 the agent pursues the goal until criteria are met or a human intervenes',
        'Implement circuit breakers: hard limits on time, cost, files changed, and API calls',
        'Use staged rollout: agent proposes \u2192 human approves \u2192 agent executes \u2192 human verifies',
        'Log every decision and action for post-mortem analysis \u2014 autonomous doesn\u2019t mean opaque',
      ],
      tip: 'Start autonomous agents on low-stakes tasks (docs, tests, dependency updates) before handing them production features',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O19',
      title: 'MCP for Agent.mds',
      subtitle: 'Standardising agent descriptions via MCP',
      mindmapId: 'mcp-agent-mds',
      description:
        'Agent.md files describe an agent\u2019s purpose, capabilities, and constraints. Exposing these via MCP lets agents discover and understand each other \u2014 enabling multi-agent collaboration at scale.',
      points: [
        'Each agent has a standardised Agent.md: role, capabilities, inputs, outputs, constraints',
        'MCP servers can serve Agent.mds as discoverable resources \u2014 agents find collaborators programmatically',
        'Orchestrator agents read Agent.mds to decide which specialist to delegate to',
        'Agent.mds become the "API docs" of your agent fleet \u2014 humans and machines read them alike',
      ],
      tip: 'Write Agent.mds for your existing agents today \u2014 it clarifies their purpose even without MCP',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O20',
      title: 'Cost at Scale',
      subtitle: 'Chargeback models, budgets, and ROI tracking',
      mindmapId: 'cost-scaling',
      description:
        'At organisational scale, agent costs become a line item that leadership scrutinises. Chargeback models, cost-per-PR metrics, and clear ROI tracking turn spend into a strategic asset rather than an opaque expense.',
      points: [
        'Implement team-level chargebacks \u2014 each team owns its agent spend, creating natural cost awareness',
        'Track cost-per-PR and cost-per-feature to benchmark agent efficiency across teams',
        'Set organisational budget tiers: development (higher limits), staging (moderate), production agents (tight controls)',
        'Build a simple ROI dashboard: time saved vs. tokens spent \u2014 leadership needs this to fund expansion',
      ],
      tip: 'The team with the best cost-per-PR metric is usually the one with the best specs and context files \u2014 efficiency follows quality',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O21',
      title: 'When to Level Up',
      subtitle: 'Signals your org needs enterprise-grade controls',
      mindmapId: 'transition-scaling',
      description:
        'Scaling-org practices handle growth well, but regulatory pressure, audit requirements, or compliance obligations demand a higher level of rigour.',
      points: [
        'An auditor or compliance officer asks "how do you track agent-generated code?" and you don\u2019t have a clear answer',
        'You operate in a regulated industry (finance, healthcare, government) where traceability is legally required',
        'Data sovereignty constraints mean you need to control where prompts are processed and stored',
        'Incident response reveals that agent-generated code caused an issue and the chain of accountability is unclear',
      ],
      tip: 'You don\u2019t need to be in a regulated industry to benefit from Tier 4 \u2014 traceability and governance pay dividends everywhere',
    } as RuleSlideData,
  ],
  enterprise: [
    // Ops & Governance
    {
      layout: 'rule',
      number: 'E01',
      title: 'Dev / Sec / Ops',
      subtitle: 'Security & operations tailored to agent workflows',
      mindmapId: 'devsecops',
      description:
        'Agents introduce new security surfaces: they execute code, call APIs, and access data. DevSecOps for agentic engineering means securing the agent lifecycle end-to-end.',
      points: [
        'Scan agent-generated code with SAST/DAST tools before it reaches any branch \u2014 automate this in CI',
        'Apply least-privilege access: agents get only the permissions they need, scoped to the task',
        'Audit every tool call and external API invocation \u2014 agents should never have silent side effects',
        'Rotate credentials and secrets used by agents on the same schedule as human credentials',
      ],
      tip: 'Treat agent access like contractor access \u2014 scoped, time-limited, and fully logged',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E02',
      title: 'Monitoring',
      subtitle: 'Observability across agent runs and tool calls',
      mindmapId: 'monitoring',
      description:
        'You can\u2019t manage what you can\u2019t measure. Agent monitoring tracks cost, latency, error rates, and output quality across every agent session in your organisation.',
      points: [
        'Track tokens consumed, wall-clock time, and cost per agent task \u2014 set budgets and alerts',
        'Monitor error rates: how often do agents fail, retry, or produce output that fails review?',
        'Log the full prompt chain for every session \u2014 essential for debugging and post-mortems',
        'Build dashboards that show agent utilisation across teams \u2014 identify bottlenecks and waste',
      ],
      tip: 'Start with cost monitoring \u2014 it\u2019s the metric leadership understands immediately',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E03',
      title: 'Traceability',
      subtitle: 'From prompt to commit \u2014 who asked, who built, who reviewed',
      mindmapId: 'traceability',
      description:
        'In a regulated environment, every change must be traceable to a human decision. Agent traceability means maintaining an unbroken chain from the original request to the deployed code.',
      points: [
        'Link every agent-generated commit to the ticket, prompt, and human who initiated it',
        'Use Co-Authored-By headers in commits to mark agent contributions alongside the human sponsor',
        'Store the full prompt and agent response as artefacts alongside the PR',
        'Ensure review records are immutable \u2014 "who approved this agent\u2019s output?" must always be answerable',
      ],
      tip: 'Traceability is not overhead \u2014 it\u2019s the foundation of trust in an agentic workflow',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E04',
      title: 'Change Management',
      subtitle: 'Controlled rollout of agent-generated change',
      mindmapId: 'change-mgmt',
      description:
        'Agents can generate change at a pace that overwhelms traditional review processes. Change management for agents means governing the flow of change without bottlenecking it.',
      points: [
        'Implement progressive delivery: agent changes go through staging, canary, then production',
        'Set rate limits on agent-generated PRs per team per sprint \u2014 prevent review fatigue',
        'Require human approval gates for changes above a risk threshold (infra, security, data migrations)',
        'Use automated rollback triggers: if agent-deployed code degrades metrics, revert automatically',
      ],
      tip: 'The speed of agent-generated change is a feature \u2014 but only if your review pipeline can keep up',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E05',
      title: 'Global / Central Alignment',
      subtitle: 'One source of truth for agent behaviour across the company',
      mindmapId: 'central-alignment',
      description:
        'At enterprise scale, alignment can\u2019t be left to individual teams. A central alignment framework ensures every agent in every team operates within the same guardrails.',
      points: [
        'Maintain a company-wide base configuration that all team-level agent configs inherit from',
        'Define non-negotiable constraints centrally: security policies, coding standards, forbidden patterns',
        'Allow teams to extend (but not weaken) the base constraints for their specific domain',
        'Version and audit the central alignment config \u2014 changes propagate to all agents automatically',
      ],
      tip: 'Central alignment is like your engineering handbook \u2014 but agents actually read it every time',
    } as RuleSlideData,
    // Compliance & Risk
    {
      layout: 'rule',
      number: 'E06',
      title: 'EU Sovereignty',
      subtitle: 'Data & compute residency inside the EU',
      mindmapId: 'eu-souv',
      description:
        'For EU-based enterprises, data sovereignty means ensuring that code, prompts, and context never leave EU jurisdiction. This constrains which AI providers and deployment models you can use.',
      points: [
        'Evaluate AI providers for EU data residency \u2014 where are prompts processed and stored?',
        'Consider self-hosted models (open-weight) for the most sensitive workloads',
        'Ensure prompt content (which may include proprietary code) is covered by your DPA',
        'Document the data flow: which data leaves your network, where it goes, how long it\u2019s retained',
      ],
      tip: 'Sovereignty requirements narrow your provider choices \u2014 evaluate this before building your agent platform',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E07',
      title: 'DSGVO / GDPR',
      subtitle: 'Personal-data handling compliant with GDPR',
      mindmapId: 'dsgvo',
      description:
        'Agents that process personal data must comply with GDPR. This means prompt content, training data, and agent output all fall under data protection regulation.',
      points: [
        'Never include personal data (names, emails, IDs) in prompts unless the processing has a legal basis',
        'Anonymise or pseudonymise data before feeding it to agents \u2014 use synthetic data where possible',
        'Ensure your AI provider\u2019s terms include GDPR-compliant data processing agreements',
        'Implement data subject access requests (DSARs) for any personal data an agent may have processed',
      ],
      tip: 'When in doubt, ask: "If this prompt were leaked, would it contain personal data?" If yes, redact it.',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E08',
      title: 'Further Risks',
      subtitle: 'IP, licensing, secrets, auditability, liability',
      mindmapId: 'more-risks',
      description:
        'Beyond privacy and sovereignty, agentic engineering introduces risks around intellectual property, licensing compliance, secret management, and legal liability for agent-generated output.',
      points: [
        'IP risk: Agent output may inadvertently reproduce copyrighted or licensed code \u2014 use licence scanners',
        'Secret leakage: Agents may echo secrets from context into logs, PRs, or error messages \u2014 scrub outputs',
        'Licensing compliance: Agent-suggested dependencies may carry viral licences (GPL) \u2014 automate licence checks',
        'Liability: Who is responsible when agent-generated code causes a production incident? Define this upfront.',
      ],
      tip: 'Add a "risk review" step to your agent workflow for any change touching auth, payments, or personal data',
    } as RuleSlideData,
    // The Builder
    {
      layout: 'rule',
      number: 'E09',
      title: 'The Builder',
      subtitle: 'The defining role of the agentic era',
      mindmapId: 'builder-role',
      description:
        'A Builder is someone who deeply understands users and moves extremely fast by orchestrating agents. They combine product sense, user empathy, and agentic fluency into a single role \u2014 replacing the need for separate specialists.',
      points: [
        'Understands users deeply \u2014 their problems, workflows, and what \u201cgood\u201d looks like',
        'Orchestrates multiple agents to ship end-to-end: from spec to deployment',
        'Fluent in prompt engineering, context engineering, and agent steering \u2014 their core tools',
        'Owns the full stack: product thinking, implementation via agents, and quality assurance',
      ],
      tip: 'A Builder doesn\u2019t write all the code \u2014 they direct agents that do, with taste and user empathy as their edge',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E10',
      title: 'Builder Team (3\u20135 max)',
      subtitle: 'The new optimum team size',
      mindmapId: 'builder-team',
      description:
        'The agentic era redefines team size. A small, tight squad of 3\u20135 Builders \u2014 each orchestrating their own agents \u2014 ships faster than legacy teams ten times their size. Communication overhead drops, ownership is clear, and velocity compounds.',
      points: [
        '3\u20135 Builders is the sweet spot \u2014 enough coverage for product, engineering, and operations without coordination tax',
        'Each Builder owns a domain end-to-end, orchestrating agents for implementation, testing, and deployment',
        'Small teams make faster decisions \u2014 fewer meetings, fewer handoffs, fewer misunderstandings',
        'Agents handle the scaling \u2014 the team stays small while output grows exponentially',
      ],
      tip: 'If your team needs more than 5 Builders, split into two autonomous squads rather than growing one',
    } as RuleSlideData,
    // Enterprise Use Cases
    {
      layout: 'rule',
      number: 'E11',
      title: 'Full Audit Trail',
      subtitle: 'Who changed what, and why',
      mindmapId: 'who-changed',
      description:
        'A complete audit trail for agent-initiated changes is non-negotiable in regulated industries. Every change must be traceable from business request to deployed code.',
      points: [
        'Capture the full chain: ticket \u2192 prompt \u2192 agent session \u2192 PR \u2192 review \u2192 merge \u2192 deploy',
        'Store prompts and agent responses as immutable artefacts \u2014 they\u2019re evidence',
        'Tag every commit with the agent model, version, and session ID used to generate it',
        'Generate compliance reports automatically from the audit trail \u2014 auditors love structured data',
      ],
      tip: 'Build the audit trail from day one \u2014 retrofitting traceability is orders of magnitude harder',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E12',
      title: 'Enterprise ROI & Total Cost of Ownership',
      subtitle: 'Building the business case for agentic engineering',
      mindmapId: 'cost-enterprise',
      description:
        'Enterprise adoption requires a business case. Total cost of ownership includes not just API spend, but tooling, training, governance overhead, and the opportunity cost of not adopting.',
      points: [
        'Calculate TCO: API costs + tooling licenses + platform engineering time + training + compliance overhead',
        'Measure ROI against concrete baselines: time-to-merge, defect rate, developer satisfaction, onboarding speed',
        'Build the "cost of not adopting" case \u2014 competitors using agents ship faster, hire fewer, and iterate more',
        'Present cost as investment, not expense: "We spend \u20acX/month on agents and save Y engineering hours \u2014 that\u2019s Z FTE equivalent"',
      ],
      tip: 'The most compelling metric for leadership: "Agent-assisted PRs merge 3x faster with equal or fewer defects"',
    } as RuleSlideData,
  ],
  philosophical: [
    {
      layout: 'rule',
      number: 'P01',
      title: 'AI as a New Stakeholder',
      subtitle: 'Our source code now has one more audience',
      mindmapId: 'ai-stakeholder',
      description:
        'Agents are becoming first-class consumers of your codebase. Just as you write readable code for fellow developers, you now need to consider how easily an AI agent can parse, navigate, and reason about your source code.',
      points: [
        'Code is now written for two audiences: humans who review it and agents who modify it',
        'Self-documenting code matters more than ever \u2014 agents rely on names, structure, and patterns to understand intent',
        'Institutional knowledge locked in people\u2019s heads is invisible to agents \u2014 externalise it',
        'The quality of your codebase directly determines the quality of agent output',
      ],
      tip: "Write code as if the next person reading it has no institutional knowledge \u2014 because your agent doesn't",
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'P02',
      title: 'The Human in the Loop',
      subtitle: 'What only humans can do',
      mindmapId: 'human-in-loop',
      description:
        'As agents handle more of the mechanical work, the human role shifts from typing code to making judgement calls. Understanding what only you can bring is the key to effective collaboration.',
      points: [
        'Vision and taste: agents optimise for what you define \u2014 they can\u2019t decide what\u2019s worth building',
        'Ethical judgement: agents have no moral compass \u2014 they do what they\u2019re asked, even when they shouldn\u2019t',
        'User empathy: agents can simulate user behaviour but can\u2019t feel frustration, delight, or confusion',
        'Accountability: someone must own the decision to ship \u2014 an agent can\u2019t be held responsible',
      ],
      tip: 'The better you get at delegation, the more important your judgement becomes',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'P03',
      title: 'The Knowledge Paradox',
      subtitle: 'You need to understand what you\u2019re delegating',
      mindmapId: 'knowledge-paradox',
      description:
        'The paradox of agentic engineering: the less you need to write code yourself, the more you need to understand it. Without deep understanding, you can\u2019t evaluate agent output or catch subtle errors.',
      points: [
        'Agents lower the floor (anyone can build) but don\u2019t raise the ceiling (expertise still matters for quality)',
        'Reviewing agent-generated code requires as much skill as writing it \u2014 possibly more',
        'Teams that stop learning the fundamentals become dependent on agents they can\u2019t correct',
        'The most effective engineers use agents to amplify their existing knowledge, not replace it',
      ],
      tip: 'Never stop learning the craft \u2014 agents are force multipliers, not substitutes for understanding',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'P04',
      title: 'Code Is Free, Maintenance Is Not',
      subtitle: 'The hidden cost of infinite generation',
      mindmapId: 'code-is-free',
      description:
        'Generating code is now virtually free. An agent can produce thousands of lines in minutes. But every line you ship becomes a liability — it must be read, understood, tested, debugged, and maintained. The real cost of software was never writing it.',
      points: [
        'Code is a liability, not an asset — the best code is the code you didn\u2019t write',
        'Agents make it dangerously easy to generate more than you can maintain',
        'Deletion is now a core engineering skill — resist the urge to keep everything just because it was cheap to create',
        'The bottleneck has shifted from production to comprehension — can your team still understand the codebase in six months?',
      ],
      tip: 'Just because code is free to write doesn\u2019t mean it\u2019s free to own — treat every generated line as a long-term commitment',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'P05',
      title: 'From IC to Orchestrator',
      subtitle: 'The role shift that changes everything',
      mindmapId: 'ic-to-orchestrator',
      description:
        'Agentic coding transforms the engineer\u2019s role from individual contributor to orchestrator. Instead of writing code line by line, you design systems, decompose problems, and coordinate multiple agents. This demands more systems thinking, not less.',
      points: [
        'The skill shifts from "how do I implement this?" to "how do I decompose this so agents can implement it well?"',
        'Orchestrators need stronger systems design — you must see the whole board, not just the next move',
        'Managing agent workflows is a new form of architecture — context boundaries, task sequencing, and quality gates',
        'The best orchestrators spend more time thinking and less time typing — and produce better outcomes because of it',
      ],
      tip: 'Think of yourself as the architect and director — your value is in the blueprint and the decisions, not the bricklaying',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'P06',
      title: 'Should It Be Built at All?',
      subtitle: 'When time is no longer the constraint',
      mindmapId: 'should-it-be-built',
      description:
        'Agents can run 24/7, picking off low-priority backlog items that humans never had time for. When delivery cost drops to near zero, the bottleneck is no longer "can we build it?" but "should we build it?" Every feature still carries complexity, cognitive load, and maintenance — even if it was free to create.',
      points: [
        'Low-hanging fruits that sat in the backlog for years are now automatable — agents can deliver them in the background around the clock',
        'Removing the time constraint exposes the real question: does this feature earn its place in the product?',
        'More features ≠ better product — each one adds surface area for bugs, support burden, and user confusion',
        'The new discipline is not prioritisation by effort, but prioritisation by value — because effort is approaching zero',
      ],
      tip: 'Just because an agent can build it overnight doesn\u2019t mean your users need it — the hardest skill is saying no when building is free',
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
    title: 'Agentic Coding Journey',
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
