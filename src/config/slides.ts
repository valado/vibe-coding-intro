import { SlideData, RuleSlideData } from '../types';
import { CREATOR_CONFIG } from './creator';

export const ADVANCED_SLIDES: RuleSlideData[] = [
  {
    layout: 'rule',
    number: 'A1',
    title: 'The Rise of "Prompt Requests"',
    subtitle: 'Empowering non-programmers to build',
    description:
      'Agentic engineering has significantly lowered the bar for entry into software development, allowing individuals who have never written code to contribute to complex projects.',
    points: [
      'Because agents can interpret intent and generate code, many contributions are now "prompt requests" — the user provides the prompt and the agent generates the PR',
      'These contributions represent a step up for humanity by turning consumers into builders (citing Peter Steinberger - creator of OpenClaw)',
    ],
    tip: 'Encourage prompt requests from non-technical teammates — every builder strengthens the team',
  },
  {
    layout: 'rule',
    number: 'A2',
    title: 'Building for the Agent (The New DX)',
    subtitle: 'Make your codebase agent-navigable',
    description:
      'A core best practice is shifting your focus from making the codebase perfect for humans to making it easily navigable for an agent.',
    points: [
      "Empathise with the agent's perspective — they start every session fresh with no knowledge of your specific product or architecture",
      "Don't fight the agent on implementation details like variable naming — forcing a different name only makes it harder for the agent to find that code later",
      'Guide the agent with pointers to relevant files and architectural considerations rather than letting it wander blindly',
      'Write code for the agent, not just for humans — agents will be the ones maintaining and improving your software in the future, so structure, naming, and clarity should optimise for their comprehension too',
    ],
    tip: 'Think of DX as "Developer + Agent Experience" — optimise for both',
  },
  {
    layout: 'rule',
    number: 'A3',
    title: 'The Agent as a Highly Skilled Engineer',
    subtitle: "Collaborate, don't just command",
    description:
      'In this paradigm, an agent is treated like a very capable engineer who generally makes good decisions but requires high-level oversight and discussion.',
    points: [
      'Approach the agent as a teammate — use the prompt "Do you have any questions for me?" to let it identify its own knowledge gaps',
      'Leverage cheap refactor cycles — after a task, ask: "What can we refactor?" or "What would you have done differently?"',
      'The human provides the vision, style, and "human touch" while the agent handles the data-shifting work',
    ],
    tip: 'Ask the agent what it would improve — cheap refactors catch non-optimal solutions early',
  },
  {
    layout: 'rule',
    number: 'A4',
    title: 'Navigating the Tech Stack',
    subtitle: 'Use the right tools for an agentic world',
    description:
      'Agents allow builders to move between different "tech galaxies" efficiently, provided they use the right tools for the job.',
    points: [
      'The ecosystem matters more than the language — a rich ecosystem of libraries, community support, and tooling is what makes agents truly effective',
      "TypeScript is often preferred for agentic projects — it's hackable, approachable, and agents are highly proficient in it",
      'Agents enable you to use languages you might not personally enjoy but that have beneficial characteristics (e.g. Go for resilient CLIs)',
      'Building with agents favours established ecosystems — if the agent has no training data for your stack, it becomes much harder to assist you',
    ],
    tip: 'Master agentic engineering through play — treat the agent as an infinitely patient answering machine',
    externalLink: {
      label: 'Explore the Map of GitHub — see how ecosystems cluster',
      url: 'https://anvaka.github.io/map-of-github/',
    },
  },
];

export const SLIDES: SlideData[] = [
  {
    layout: 'cover',
    title: 'The Practical Guide\nto Vibe Coding',
    subtitle: 'The playbook for building software with AI',
    badge: '2026 Edition',
  },
  {
    layout: 'author',
    title: `Created by ${CREATOR_CONFIG.name}`,
    role: 'Senior Solution Architect & AI Practice Lead',
    socialCall2Action: 'Follow me for more insights on leveraging AI',
    linkedinUrl: CREATOR_CONFIG.linkedinUrl,
    xUrl: CREATOR_CONFIG.xUrl,
    position: 'opening',
    toolsLabel: 'Maker of',
    tools: CREATOR_CONFIG.tools,
  },
  {
    layout: 'intro',
    title: 'What is Vibe Coding?',
    description:
      'Vibe coding is about communicating your intent \u2014 you focus on what to build, not how to build it. Describe the outcome you want in plain language and let AI handle the implementation details.',
    steps: [
      {
        icon: 'MessageSquareText',
        label: 'Intent',
        detail: 'Define what you want, not how to build it',
      },
      { icon: 'Sparkles', label: 'Generate', detail: 'AI translates your intent into code' },
      { icon: 'RefreshCw', label: 'Refine', detail: 'Review the outcome and sharpen your intent' },
    ],
  },
  {
    layout: 'rule',
    number: '01',
    title: 'Use the Command Line and Choose a Model',
    subtitle: 'Your direct line to AI power',
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
  },
  {
    layout: 'rule',
    number: '02',
    title: 'Set Up Your AI\u2019s Context',
    subtitle: 'Onboard the AI like a new team member',
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
  },
  {
    layout: 'rule',
    number: '03',
    title: 'Create Specialist Agents',
    subtitle: 'Focused experts outperform generalists',
    description:
      'Instead of using one generic AI for everything, define task-specific personas. Give each agent a clear role and expertise area \u2014 just like assembling a real development team. Specialized agents also use your context window more efficiently, keeping each conversation focused and relevant.',
    points: [
      '"senior-react-developer" for user interfaces',
      '"datamodel-postgresql-architect" for data structure and storage',
      '"qa-playwright-engineer" for testing and finding edge cases',
      '"devsecops-pulumi-specialist" for deployment and infrastructure',
    ],
    tip: 'Generate the agents using the same CLI tool and update its context with relevant information for its role',
  },
  {
    layout: 'rule',
    number: '04',
    title: 'Choose AI-Friendly Technologies',
    subtitle: 'Not all tech stacks are generated equal',
    description:
      'AI coding tools work best with popular, well-documented technologies. The more examples the AI has seen during training, the better the code it generates.',
    points: [
      'Pick widely adopted frameworks with large communities (e.g. React)',
      'Prefer typed languages (e.g. TypeScript over JavaScript)',
      'Use convention-based frameworks with clear patterns',
      'Stick to well-documented, stable libraries',
    ],
    tip: 'Popular stacks like React + TypeScript, Next.js or Python produce the best results',
  },
  {
    layout: 'rule',
    number: '05',
    title: 'Plan Before You Build',
    subtitle: 'Think it through first',
    description:
      'Never jump straight into code generation. Always create an implementation plan first. Review it, refine it and only then start building \u2014 one step at a time.',
    points: [
      'Break big features into small, manageable tasks',
      'Have the AI propose an architecture before coding',
      'Review the plan to catch issues before they\u2019re built',
      'Execute tasks one at a time, in sequence',
    ],
    tip: 'Most AI coding tools have a built-in "plan" or "architect" mode \u2014 always use it',
  },
  {
    layout: 'rule',
    number: '06',
    title: 'Give Eyes To Your Agent',
    subtitle: 'Visual feedback changes everything',
    description:
      'Connect browser automation tools so your AI can see what it\u2019s building. It can take screenshots, interact with your app, and verify things look right \u2014 like having a QA tester built in.',
    points: [
      'Connect browser automation via MCP servers',
      'Take screenshots and add them to the prompt for visual context',
      'Catch visual bugs the AI would otherwise miss',
      'Workflow: Agent describe the UI based on the context -> Meta prompt for Nano Banana -> Give image to the agent to implement it',
    ],
    tip: 'Tools like Puppeteer or Playwright MCP give your AI the ability to see and interact with your app',
  },
  {
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
  },
  {
    layout: 'rule',
    number: '08',
    title: 'Keep Instructions Small',
    subtitle: 'One task, one outcome',
    description:
      'Large, vague requests produce large, vague results. Break everything into specific, focused instructions that can be completed and checked one at a time.',
    points: [
      '"Add a login form" \u2014 not "Build the auth system"',
      'One feature per conversation keeps focus sharp',
      'Verify each task before starting the next',
      'Smaller context = better AI performance',
    ],
    tip: 'Clear the context after each task to avoid confusion and context overload.',
  },
  {
    layout: 'rule',
    number: '09',
    title: 'Always Verify the Output',
    subtitle: 'Trust, but check',
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
  },
  {
    layout: 'summary',
    title: 'The Golden Rules',
    subtitle: 'Your quick-reference cheat sheet',
    rules: [
      { num: '01', title: 'Use the CLI', desc: 'Direct file access & control' },
      { num: '02', title: 'Set Context', desc: 'Vision, conventions, stack' },
      { num: '03', title: 'Specialists', desc: 'Focused agents, better results' },
      { num: '04', title: 'Right Stack', desc: 'Popular & well-documented' },
      { num: '05', title: 'Plan First', desc: 'Think, then build' },
      { num: '06', title: 'Add Eyes', desc: 'Visual feedback & testing' },
      { num: '07', title: 'Save Often', desc: 'Checkpoint your progress' },
      { num: '08', title: 'Small Tasks', desc: 'One task, one outcome' },
      { num: '09', title: 'Verify', desc: 'Trust but always check' },
    ],
  },
  {
    layout: 'closing',
    title: 'Start Building Today',
    subtitle:
      'Pick a small project. Set up your tools. Start prompting.\nThe best way to learn vibe coding is to do it.',
    cta: 'Happy Vibe Coding!',
    surveyUrl: CREATOR_CONFIG.surveyUrl,
    surveyLabel: 'Enjoyed this guide? Take a 7-minute survey and get a mystery discount.',
    surveyDetail: 'Take the Survey — Unlock 50% Off',
  },
];
