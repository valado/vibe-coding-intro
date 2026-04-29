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
    'Run, test, and deploy — all from one place',
    'Use Agentic Mode',
    'For planning use the latest Opus and depending on the complexity of the task Sonnet/Opus models for execution',
  ],
  tip: 'Look for CLI tools like Claude Code, Codex CLI, Gemini CLI, or Cursor’s agent mode',
};

const RULE_SET_CONTEXT: RuleSlideData = {
  layout: 'rule',
  number: '02',
  title: 'Set Up Your AI’s Context',
  subtitle: 'Onboard the AI like a new team member',
  mindmapId: 'ctxeng-basic',
  description:
    'Before writing any code, give your AI the big picture. Create a configuration file that describes your project’s vision, coding standards, and technical decisions — just like onboarding a new developer.',
  points: [
    'Product Vision — What you’re building and why',
    'Alignment — List your expectations (e.g. which design system to use, code style, code-of-conduct, testing standards etc.)',
    'Persist Architecture Decisions — Architecture Decision Record (ADR) within the project',
    'Tech Stack — Which frameworks and tools to use',
    'Guardrails — What the AI should and shouldn’t do',
  ],
  tip: 'Create a project rules file (like CLAUDE.md, .cursorrules, or Copilot instructions) in your project’s root folder',
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
    'Before you can build anything, you need a running agent. Pick a CLI tool — Claude Code, Codex CLI, Gemini CLI — and create your first agent. This is where your AI teammate comes to life.',
  points: [
    'Install the CLI and authenticate (e.g. `claude` for Claude Code, `codex` for Codex CLI)',
    'Point the agent at your project directory so it has access to your codebase',
    'Configure the model — start with the most capable one available for your tool',
    'Run your first prompt to verify everything works end-to-end',
  ],
  tip: 'Claude Code: `claude` · Codex CLI: `codex` · Gemini CLI: `gemini` — pick one and get it running in under 5 minutes',
};

const RULE_PLAN_FIRST: RuleSlideData = {
  layout: 'rule',
  number: '05',
  title: 'Plan Before You Build',
  subtitle: 'Think it through first',
  mindmapId: 'planning',
  description:
    'Never jump straight into code generation. Always create an implementation plan first. Review it, refine it and only then start building — one step at a time.',
  points: [
    'Break big features into small, manageable tasks',
    'Have the AI propose an architecture before coding',
    'Review the plan to catch issues before they’re built',
    'Execute tasks one at a time, in sequence',
  ],
  tip: 'Most AI coding tools have a built-in "plan" or "architect" mode — always use it',
};

const RULE_GIVE_EYES: RuleSlideData = {
  layout: 'rule',
  number: '06',
  title: 'Give Eyes To Your Agent',
  subtitle: 'Visual feedback changes everything',
  mindmapId: 'mcp',
  description:
    'Connect browser automation tools so your AI can see what it’s building. It can take screenshots, interact with your app, and verify things look right — like having a QA tester built in.',
  points: [
    'Connect browser automation via MCP servers',
    'Take screenshots and add them to the prompt for visual context',
    'Catch visual bugs the AI would otherwise miss',
    'Workflow: Agent describes the UI based on context → generate a visual mockup with an image tool → feed the image back to the agent to implement it',
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
    'Every time something works, save a checkpoint. Version control is like a save-game system — if something breaks, you can always roll back to the last working state.',
  points: [
    'Commit after every successful change',
    'Use separate branches for experiments',
    'Write clear descriptions of what each save contains',
    'Tag stable versions you might want to return to',
  ],
  tip: 'Set up your AI to auto-commit after tests pass — it’s a game changer',
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
    '"Add a login form" — not "Build the auth system"',
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
    'Review what changed before committing — understand the diff',
  ],
  tip: 'A quick "does this actually work?" check takes seconds and saves hours of debugging',
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
    "Empathise with the agent's perspective — they start every session fresh with no knowledge of your specific product or architecture",
    "Don't fight the agent on implementation details like variable naming — forcing a different name only makes it harder for the agent to find that code later",
    'Guide the agent with pointers to relevant files and architectural considerations rather than letting it wander blindly',
    'Write code for the agent, not just for humans — agents will be the ones maintaining and improving your software in the future, so structure, naming, and clarity should optimise for their comprehension too',
  ],
  tip: 'Think of DX as "Developer + Agent Experience" — optimise for both',
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
    'Approach the agent as a teammate — use the prompt "Do you have any questions for me?" to let it identify its own knowledge gaps',
    'Leverage cheap refactor cycles — after a task, ask: "What can we refactor?" or "What would you have done differently?"',
    'The human provides the vision, style, and "human touch" while the agent handles the data-shifting work',
  ],
  tip: 'Ask the agent what it would improve — cheap refactors catch non-optimal solutions early',
};

const ADVANCED_CLEAN_ARCH: RuleSlideData = {
  layout: 'rule',
  number: 'A5',
  title: 'Clean Architecture Is Your AI Multiplier',
  subtitle: 'Domain-driven design makes agents dramatically more effective',
  mindmapId: 'ddd',
  description:
    'AI agents reason about code the same way a new engineer does — by reading structure, names, and boundaries. A clean, domain-driven architecture gives the agent an immediate mental model of your system, while a tangled codebase forces it to guess, hallucinate, and produce brittle code.',
  points: [
    'Bounded contexts act as natural scope limiters — agents can work within a single domain without accidentally coupling unrelated concerns',
    'Ubiquitous language in your code (entities, value objects, aggregates) gives the agent precise vocabulary — it generates code that fits your domain instead of generic CRUD',
    'Clear separation of layers (domain, application, infrastructure) lets agents know exactly where to place new logic without polluting boundaries',
    'Well-defined interfaces and ports mean the agent can implement adapters and services without needing to understand the entire system, reducing hallucination surface area',
  ],
  tip: 'Invest in clean architecture now — it pays compound interest every time an agent touches your codebase',
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
        'Vibe coding is the art of describing what you want in plain language and letting the AI figure out the implementation. It’s the fastest way to go from idea to working prototype.',
      points: [
        'Describe the outcome you want, not the code you need: "make a landing page with a hero section and signup form"',
        'Iterate in tight loops: prompt, see the result, refine, repeat',
        'Feed images directly into the agent (screenshots, sketches, wireframes) and ask it to match the visual',
        'Great for MVPs, prototypes, and learning what’s possible',
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
    // Understanding limits
    {
      layout: 'rule',
      number: 'B09',
      title: 'Mind Your Token Budget',
      subtitle: 'AI power has a price tag — know yours',
      mindmapId: 'cost-solo',
      description:
        'Every prompt costs tokens, and tokens cost money. As a solo builder, understanding your spend prevents surprises and helps you choose the right model for each task.',
      points: [
        'Check your provider’s dashboard daily — most offer usage breakdowns by model and session',
        'Use the most capable model (Opus) for planning and architecture, then switch to a faster model (Sonnet) for repetitive implementation tasks',
        'Keep context small — large file dumps burn tokens fast with diminishing returns',
        'Set a monthly budget alert (e.g. $50–$100) so you learn your actual usage pattern before it surprises you',
      ],
      tip: 'A single well-scoped prompt with good context often costs less and produces better results than ten vague ones',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'B10',
      title: 'Understand Your AI’s Limits',
      subtitle: 'Smart zone, dumb zone, and the Memento effect',
      mindmapId: 'llm-limits',
      description:
        'LLMs have a "smart zone" and a "dumb zone." Early in a conversation, attention relationships are manageable and output quality is high. As tokens accumulate, attention scales quadratically and quality degrades — regardless of the advertised context window.',
      points: [
        'The Smart Zone: at low token counts, the model is sharp, focused, and makes excellent decisions',
        'The Dumb Zone: beyond ~100k tokens, models begin making poor choices as attention relationships strain processing power',
        'The Memento Effect: LLMs reset to a blank slate when context is cleared — like the film character who loses all memory',
        'Prefer clearing context over compacting it — compacting introduces noise ("sediment") that degrades future output',
        'Store essential knowledge in fixed assets (project rules files, PRDs, specs) so you can clear context without losing alignment',
      ],
      tip: 'Start fresh after each task — your AI is sharpest with a clean context',
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
        'Ask the agent to write a system prompt for a specific task, then critique and refine it together',
        'Build a library of reusable prompt templates the whole team can share',
        'Use meta prompts to convert vague requirements into structured agent instructions',
        'Iterate on prompt quality the same way you iterate on code: version and review them',
      ],
      tip: 'Start with: "Write me a system prompt for an agent that does [X]. Include constraints, examples, and edge cases."',
    } as RuleSlideData,
    { ...RULE_GIVE_EYES, number: 'T02', mindmapId: 'mcp' },
    {
      layout: 'rule',
      number: 'T03',
      title: 'The Grill — Align Before You Build',
      subtitle: 'Structured inquiry that prevents misalignment',
      mindmapId: 'grill-align',
      description:
        'The primary failure mode in AI coding is misalignment — the AI builds something you didn’t intend. Instead of letting the agent eagerly generate a plan, use a "Grilling" process where the AI interviews you about every aspect of the design before writing a single line of code.',
      points: [
        'Relentless Inquiry: prompt the AI to ask you tough questions about your plan until it fully understands the intent',
        'Shared Design Concept: the invisible mental model of the thing being built, reached through dialogue, not documentation alone',
        'Branch Resolution: walk down each branch of the "design tree" to resolve dependencies and edge cases before implementation',
        'This process is more valuable than any static plan because it surfaces assumptions and contradictions that specs miss',
      ],
      tip: 'Use the prompt: "Grill me on this plan — ask tough questions until you fully understand what I want to build"',
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
        'Include acceptance criteria so the agent can self-verify its implementation',
        'Specs become living documentation that evolves with the codebase',
        'Multiple agents can implement against the same spec independently, enabling parallel work',
      ],
      tip: 'A 20-minute spec saves hours of back-and-forth — the agent delivers right the first time',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T05',
      title: 'Cut Vertical, Not Horizontal',
      subtitle: 'Tracer bullets through every layer',
      mindmapId: 'tracer-bullets',
      description:
        'AI naturally tends to code "horizontally" — doing all database work first, then API, then UI. This is inefficient because feedback is delayed until the final layer. Instead, cut tasks as thin vertical slices that touch every layer of the system.',
      points: [
        'Tracer Bullets: each task should produce a thin, working end-to-end flow from UI to database and back',
        'Vertical slices allow immediate testing of the entire integrated flow, catching integration issues from the earliest phase',
        'Horizontal layers delay feedback — you don’t know if the pieces fit together until the very end',
        'Structure your Kanban board vertically: "User can log in" not "Build auth database schema"',
      ],
      tip: 'If your first task doesn’t produce a testable end-to-end flow, it’s sliced wrong',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T06',
      title: 'PRD (lightweight)',
      subtitle: 'One-page product brief the agent can read',
      mindmapId: 'prd-light',
      description:
        'A lightweight Product Requirements Document gives the agent just enough context to understand what you’re building and why. It’s not a 50-page waterfall spec — it’s a focused brief.',
      points: [
        'Keep it to one page: problem statement, target user, key features, success criteria',
        'Include what’s explicitly out of scope to prevent agent-driven scope creep',
        'Think of the PRD as a "destination document" — pair it with a Kanban board as the "journey document" that breaks the destination into grabbable tasks',
        'Write for the agent: use clear, unambiguous language with concrete examples',
        'Update the PRD as the project evolves — it’s a living document',
      ],
      tip: 'Ask the agent to review your PRD for gaps before starting implementation',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T07',
      title: 'Testing & TDD',
      subtitle: 'Your team’s shared safety net — and the agent’s speed limit',
      mindmapId: 'tdd',
      description:
        'In a team setting, tests aren’t just personal sanity checks — they’re the contract between contributors. TDD also acts as a "speed limit" for AI agents: forcing a Red-Green-Refactor cycle ensures the agent takes small, deliberate steps instead of outrunning its headlights.',
      points: [
        'Write tests first (TDD) so the agent has clear acceptance criteria before it starts coding',
        'The speed limit: TDD forces the agent to prove each step works before moving on',
        'Run the full test suite in CI on every agent-generated PR, with no exceptions',
        'Assign test ownership: each module has a human responsible for reviewing test quality, not just coverage numbers',
        'Use agents to generate test scaffolds, then review for edge cases (agents often miss boundary and race conditions)',
        'Set a coverage gate (e.g. 80%) that blocks merges — agents will write tests to satisfy it automatically',
      ],
      tip: 'If the agent can’t write a failing test first, the requirement isn’t clear enough yet',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'T08',
      title: 'Migration (e.g. → Go)',
      subtitle: 'Cross-language refactor with a safety net',
      mindmapId: 'migration',
      description:
        'Agents make cross-language migrations dramatically more feasible. Write tests in the target language first, then let the agent port the logic while the tests keep it honest.',
      points: [
        'Start by generating comprehensive tests from the existing codebase — these are your safety net',
        'Migrate module by module, not all at once; the agent keeps context better on small units',
        'Use the agent in both source and target languages simultaneously — it can reason about equivalence',
        'Let the agent propose idiomatic patterns in the target language rather than literal translations',
      ],
      tip: 'The agent is fluent in many languages — use it to adopt the idioms of your target stack, not just translate syntax',
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
        'Review intermediate output, not just the final result — course-correct while the context is still fresh',
      ],
      tip: 'The earlier you steer, the cheaper the correction — a 10-second check beats a 10-minute rollback',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O04',
      title: 'Agentic Alignment',
      subtitle: 'Constraints & guardrails for expected behaviour',
      mindmapId: 'alignment',
      description:
        'Alignment goes beyond individual steering — it’s the organisational framework that ensures all agents across all teams behave consistently and within acceptable boundaries.',
      points: [
        'Define organisation-wide project rules files (CLAUDE.md, .cursorrules, Copilot instructions) with shared constraints',
        'Establish forbidden patterns: no direct database mutations, no secrets in code, no unapproved dependencies',
        'Create positive examples: "When implementing API endpoints, follow this pattern..."',
        'Automate alignment checks — run linters and validators on agent output before it merges',
      ],
      tip: 'Alignment documents are living contracts between your organisation and its agents — review them quarterly',
    } as RuleSlideData,
    { ...ADVANCED_CLEAN_ARCH, number: 'O05', mindmapId: 'ddd' },
    {
      layout: 'rule',
      number: 'O06',
      title: 'Deep Modules, Simple Interfaces',
      subtitle: 'The architecture principle that makes AI effective',
      mindmapId: 'deep-modules',
      description:
        'Following John Ousterhout’s philosophy, codebases should be organised into "deep modules" — components with simple interfaces hiding significant internal complexity. Deep modules are easier for AI to explore, test, and extend. Shallow modules create a spaghetti of dependencies that confuse agents.',
      points: [
        'Deep Modules: a simple interface with rich functionality behind it. The agent can use the module without understanding its internals',
        'Shallow Modules: a complex interface with little hidden logic. These force the agent to track many dependencies, increasing hallucination risk',
        'Humans should design the interfaces (the boundaries) and delegate the implementation (the internal logic) to the AI',
        'This principle compounds with clean architecture — well-defined boundaries reduce the "hallucination surface area" for every agent interaction',
      ],
      tip: 'Design the interface yourself. Let the agent fill in the implementation.',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O07',
      title: 'Agent Orchestration / Symphony',
      subtitle: 'Coordinating multiple cooperating agents',
      mindmapId: 'orchestration',
      description:
        'When a single agent isn’t enough, orchestration coordinates multiple specialised agents working on different parts of the same problem — like a symphony where each instrument plays its part.',
      points: [
        'Decompose large tasks into subtasks that can be assigned to specialist agents in parallel',
        'Use a planner agent to break down work and a reviewer agent to validate the combined output',
        'Define clear interfaces between agents: one writes the API, another writes the tests, a third writes the docs',
        'Monitor for conflicts: two agents editing the same file is a merge nightmare — use isolation (worktrees, branches)',
      ],
      tip: 'Start with 2 agents (implementer + reviewer) before scaling to a full orchestra',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O08',
      title: 'Platform: MCP Server',
      subtitle: 'Expose internal tools via the Model Context Protocol',
      mindmapId: 'as-mcp',
      description:
        'An MCP server lets you expose internal tools, databases, and APIs as capabilities that any agent can discover and use. It’s the plumbing that connects agents to your organisation’s infrastructure.',
      points: [
        'Wrap internal APIs as MCP tools with clear descriptions, parameters, and return types',
        'Agents can discover and call these tools without custom integration code',
        'Centralise access control — the MCP server enforces who can call what',
        'Add observability: log every tool invocation for audit and debugging',
      ],
      tip: 'Start by exposing read-only tools (search, lookup) before adding write capabilities',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O09',
      title: 'Opportunities vs Challenges',
      subtitle: 'Weighing the real trade-offs at scale',
      mindmapId: 'opps',
      description:
        'Scaling agentic engineering across an organisation brings transformative opportunities alongside genuine challenges. Being clear-eyed about both is essential.',
      points: [
        'Opportunity: 10x developer productivity on well-scoped, well-tested tasks',
        'Opportunity: Democratisation — non-engineers can contribute via prompts',
        'Challenge: Quality assurance at scale — who reviews agent output when there’s too much to read?',
        'Challenge: Knowledge erosion — if agents write all the code, does the team still understand the system?',
      ],
      tip: 'The biggest risk isn’t bad code — it’s losing the ability to evaluate whether the code is good',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O10',
      title: 'Autonomous Agents',
      subtitle: 'Long-running, goal-seeking agents across services',
      mindmapId: 'autonom',
      description:
        'Autonomous agents operate with minimal human intervention, pursuing high-level goals across multiple services and codebases. They’re the most advanced and highest-risk application of agentic engineering.',
      points: [
        'Define success criteria upfront — the agent pursues the goal until criteria are met or a human intervenes',
        'Implement circuit breakers: hard limits on time, cost, files changed, and API calls',
        'Use staged rollout: agent proposes → human approves → agent executes → human verifies',
        'Log every decision and action for post-mortem analysis — autonomous doesn’t mean opaque',
      ],
      tip: 'Start autonomous agents on low-stakes tasks (docs, tests, dependency updates) before handing them production features',
    } as RuleSlideData,
    // The Builder — org design topics that shape how scaling teams are structured
    {
      layout: 'rule',
      number: 'O11',
      title: 'The Builder',
      subtitle: 'The defining role of the agentic era',
      mindmapId: 'builder-role',
      description:
        'A Builder is someone who deeply understands users and moves extremely fast by orchestrating agents. They combine product sense, user empathy, and agentic fluency into a single role — replacing the need for separate specialists.',
      points: [
        'Understands users deeply: their problems, workflows, and what "good" looks like',
        'Orchestrates multiple agents to ship end-to-end, from spec to deployment',
        'Fluent in prompt engineering, context engineering, and agent steering — these are their core tools',
        'Owns the full stack: product thinking, implementation via agents, and quality assurance',
      ],
      tip: 'A Builder doesn’t write all the code — they direct agents that do, with taste and user empathy as their edge',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'O12',
      title: 'Builder Team (3–5 max)',
      subtitle: 'The new optimum team size',
      mindmapId: 'builder-team',
      description:
        'The agentic era redefines team size. A small, tight squad of 3–5 Builders — each orchestrating their own agents — ships faster than legacy teams ten times their size. Communication overhead drops, ownership is clear, and velocity compounds.',
      points: [
        '3–5 Builders is the sweet spot: enough coverage for product, engineering, and operations without coordination tax',
        'Each Builder owns a domain end-to-end, orchestrating agents for implementation, testing, and deployment',
        'Small teams make faster decisions — fewer meetings, fewer handoffs, fewer misunderstandings',
        'Agents handle the scaling — the team stays small while output grows exponentially',
      ],
      tip: 'If your team needs more than 5 Builders, split into two autonomous squads rather than growing one',
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
        'Scan agent-generated code with SAST/DAST tools before it reaches any branch — automate this in CI',
        'Apply least-privilege access: agents get only the permissions they need, scoped to the task',
        'Audit every tool call and external API invocation — agents should never have silent side effects',
        'Rotate credentials and secrets used by agents on the same schedule as human credentials',
      ],
      tip: 'Treat agent access like contractor access — scoped, time-limited, and fully logged',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E02',
      title: 'Monitoring',
      subtitle: 'Observability across agent runs and tool calls',
      mindmapId: 'monitoring',
      description:
        'You can’t manage what you can’t measure. Agent monitoring tracks cost, latency, error rates, and output quality across every agent session in your organisation.',
      points: [
        'Track tokens consumed, wall-clock time, and cost per agent task; set budgets and alerts',
        'Monitor error rates: how often do agents fail, retry, or produce output that fails review?',
        'Log the full prompt chain for every session — essential for debugging and post-mortems',
        'Build dashboards that show agent utilisation across teams to identify bottlenecks and waste',
      ],
      tip: 'Start with cost monitoring — it’s the metric leadership understands immediately',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E03',
      title: 'Traceability',
      subtitle: 'From prompt to commit — who asked, who built, who reviewed',
      mindmapId: 'traceability',
      description:
        'In a regulated environment, every change must be traceable to a human decision. Agent traceability means maintaining an unbroken chain from the original request to the deployed code.',
      points: [
        'Link every agent-generated commit to the ticket, prompt, and human who initiated it',
        'Use Co-Authored-By headers in commits to mark agent contributions alongside the human sponsor',
        'Store the full prompt and agent response as artefacts alongside the PR',
        'Ensure review records are immutable — "who approved this agent’s output?" must always be answerable',
      ],
      tip: 'Traceability is not overhead — it’s the foundation of trust in an agentic workflow',
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
        'Set rate limits on agent-generated PRs per team per sprint to prevent review fatigue',
        'Require human approval gates for changes above a risk threshold (infra, security, data migrations)',
        'Use automated rollback triggers: if agent-deployed code degrades metrics, revert automatically',
      ],
      tip: 'The speed of agent-generated change is a feature — but only if your review pipeline can keep up',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E05',
      title: 'Global / Central Alignment',
      subtitle: 'One source of truth for agent behaviour across the company',
      mindmapId: 'central-alignment',
      description:
        'At enterprise scale, alignment can’t be left to individual teams. A central alignment framework ensures every agent in every team operates within the same guardrails.',
      points: [
        'Maintain a company-wide base configuration that all team-level agent configs inherit from',
        'Define non-negotiable constraints centrally: security policies, coding standards, forbidden patterns',
        'Allow teams to extend (but not weaken) the base constraints for their specific domain',
        'Version and audit the central alignment config — changes propagate to all agents automatically',
      ],
      tip: 'Central alignment is like your engineering handbook — but agents actually read it every time',
    } as RuleSlideData,
    // Compliance & Risk
    {
      layout: 'rule',
      number: 'E06',
      title: 'Risks: IP, Licensing, Secrets, Liability',
      subtitle: 'The legal and operational risks of agent-generated output',
      mindmapId: 'more-risks',
      description:
        'Agentic engineering introduces risks around intellectual property, licensing compliance, secret management, data sovereignty, and legal liability for agent-generated output.',
      points: [
        'IP risk: Agent output may inadvertently reproduce copyrighted or licensed code — use licence scanners',
        'Secret leakage: Agents may echo secrets from context into logs, PRs, or error messages — scrub outputs',
        'Licensing compliance: Agent-suggested dependencies may carry viral licences (GPL) — automate licence checks',
        'Data sovereignty: evaluate where prompts are processed and stored, especially for EU-based enterprises subject to GDPR — ensure your DPA covers AI-processed code',
        'Personal data in prompts: never include PII unless the processing has a legal basis — anonymise or use synthetic data',
        'Liability: Who is responsible when agent-generated code causes a production incident? Define this upfront.',
      ],
      tip: 'Add a "risk review" step to your agent workflow for any change touching auth, payments, or personal data',
    } as RuleSlideData,
    // Audit
    {
      layout: 'rule',
      number: 'E07',
      title: 'Full Audit Trail',
      subtitle: 'Who changed what, and why',
      mindmapId: 'who-changed',
      description:
        'A complete audit trail for agent-initiated changes is non-negotiable in regulated industries. Every change must be traceable from business request to deployed code.',
      points: [
        'Capture the full chain: ticket → prompt → agent session → PR → review → merge → deploy',
        'Store prompts and agent responses as immutable artefacts — they’re evidence',
        'Tag every commit with the agent model, version, and session ID used to generate it',
        'Generate compliance reports automatically from the audit trail — auditors love structured data',
      ],
      tip: 'Build the audit trail from day one — retrofitting traceability is orders of magnitude harder',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'E08',
      title: 'Enterprise ROI & Total Cost of Ownership',
      subtitle: 'Building the business case for agentic engineering',
      mindmapId: 'cost-enterprise',
      description:
        'Enterprise adoption requires a business case. Total cost of ownership includes not just API spend, but tooling, training, governance overhead, and the opportunity cost of not adopting.',
      points: [
        'Calculate TCO: API costs + tooling licenses + platform engineering time + training + compliance overhead',
        'Measure ROI against concrete baselines: time-to-merge, defect rate, developer satisfaction, onboarding speed',
        'Build the "cost of not adopting" case — competitors using agents ship faster, hire fewer, and iterate more',
        'Present cost as investment, not expense: "We spend €X/month on agents and save Y engineering hours — that’s Z FTE equivalent"',
      ],
      tip: 'The most compelling metric for leadership: track time-to-merge and defect rate before and after agent adoption',
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
        'Self-documenting code matters more than ever — agents rely on names, structure, and patterns to understand intent',
        'Institutional knowledge locked in people’s heads is invisible to agents — externalise it',
        'The quality of your codebase directly determines the quality of agent output',
      ],
      tip: "Write code as if the next person reading it has no institutional knowledge — because your agent doesn't",
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
        'Vision and taste: agents optimise for what you define — they can’t decide what’s worth building',
        'Ethical judgement: agents have no moral compass — they do what they’re asked, even when they shouldn’t',
        'User empathy: agents can simulate user behaviour but can’t feel frustration, delight, or confusion',
        'Accountability: someone must own the decision to ship — an agent can’t be held responsible',
      ],
      tip: 'The better you get at delegation, the more important your judgement becomes',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'P03',
      title: 'The Knowledge Paradox',
      subtitle: 'You need to understand what you’re delegating',
      mindmapId: 'knowledge-paradox',
      description:
        'The paradox of agentic engineering: the less you need to write code yourself, the more you need to understand it. Without deep understanding, you can’t evaluate agent output or catch subtle errors.',
      points: [
        'Agents lower the floor (anyone can build) but don’t raise the ceiling (expertise still matters for quality)',
        'Reviewing agent-generated code requires as much skill as writing it — possibly more',
        'Teams that stop learning the fundamentals become dependent on agents they can’t correct',
        'The most effective engineers use agents to amplify their existing knowledge, not replace it',
      ],
      tip: 'Never stop learning the craft — agents are force multipliers, not substitutes for understanding',
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
        'Code is a liability, not an asset — the best code is the code you didn’t write',
        'Agents make it dangerously easy to generate more than you can maintain',
        'Deletion is now a core engineering skill — resist the urge to keep everything just because it was cheap to create',
        'The bottleneck has shifted from production to comprehension — can your team still understand the codebase in six months?',
      ],
      tip: 'Bad code is the most expensive it’s ever been — it inhibits the very productivity gains that AI promises',
    } as RuleSlideData,
    {
      layout: 'rule',
      number: 'P05',
      title: 'From IC to Orchestrator',
      subtitle: 'The role shift that changes everything',
      mindmapId: 'ic-to-orchestrator',
      description:
        'Agentic coding transforms the engineer’s role from individual contributor to orchestrator. Instead of writing code line by line, you design systems, decompose problems, and coordinate multiple agents. This demands more systems thinking, not less.',
      points: [
        'The skill shifts from "how do I implement this?" to "how do I decompose this so agents can implement it well?"',
        'Orchestrators need stronger systems design — you must see the whole board, not just the next move',
        'Managing agent workflows is a new form of architecture: context boundaries, task sequencing, and quality gates',
        'The best orchestrators spend more time thinking and less time typing, and produce better outcomes because of it',
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
        'The new discipline is not prioritisation by effort, but prioritisation by value, because effort is approaching zero',
      ],
      tip: 'Just because an agent can build it overnight doesn’t mean your users need it — the hardest skill is saying no when building is free',
    } as RuleSlideData,
  ],
};

// --- Universal slides ---

export const TIER_SELECTION_SLIDE: TierSelectionSlideData = {
  layout: 'tier-selection',
  title: 'Where Are You on the Journey?',
  subtitle: 'Each tier builds on the previous one — enable the levels relevant to you',
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
      'Building with AI is a continuum — from fast, intuition-led prototyping to fully structured, production-grade systems. Most teams move along this spectrum as their project matures.',
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
  title: 'Key Practices',
  subtitle: 'Your quick-reference cheat sheet',
  rules: [], // dynamically populated by assembler
};

export const CLOSING_SLIDE: SlideData = {
  layout: 'closing',
  title: 'Start Building Today',
  subtitle:
    'Pick a small project. Set up your tools. Start prompting.\nThe best way to learn agentic coding is to do it.',
  cta: 'Happy Building!',
  surveyUrl: CREATOR_CONFIG.surveyUrl,
  surveyLabel: 'Help improve this guide — share your feedback in a short survey.',
  surveyDetail: 'Take the Survey',
};
