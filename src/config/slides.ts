import { SlideData } from '../types';
import { CREATOR_CONFIG } from './creator';

export const SLIDES: SlideData[] = [
  {
    layout: 'cover',
    title: 'The Practical Guide\nto Vibe Coding',
    subtitle: 'The playbook for building software with AI',
    badge: '2026 Edition',
  },
  {
    layout: 'promo',
    title: `Created by ${CREATOR_CONFIG.name}`,
    role: 'Senior Solution Architect & AI Practice Lead',
    socialCall2Action: 'Follow me for more insights on leveraging AI',
    linkedinUrl: CREATOR_CONFIG.linkedinUrl,
    xUrl: CREATOR_CONFIG.xUrl,
    surveyUrl: CREATOR_CONFIG.surveyUrl,
    surveyLabel: 'If you find this guide useful, please participate in a quick survey',
    surveyDetail: 'Share your feedback and unlock a mystery 50% discount',
    position: 'opening',
    toolsLabel: 'Maker of',
    tools: CREATOR_CONFIG.tools,
  },
  {
    layout: 'intro',
    title: 'What is Vibe Coding?',
    description:
      'Vibe coding is the practice of building software by describing what you want in plain language and letting AI write the code. You set the direction \u2014 the AI handles the implementation.',
    steps: [
      { emoji: '\ud83d\udcac', label: 'Describe', detail: 'Tell the AI what you want to build' },
      { emoji: '\u26a1', label: 'Generate', detail: 'The AI writes the code for you' },
      { emoji: '\ud83d\udd04', label: 'Iterate', detail: 'Review, refine, and repeat' },
    ],
  },
  {
    layout: 'rule',
    number: '01',
    title: 'Use the Command Line',
    subtitle: 'Your direct line to AI power',
    description:
      'Chat interfaces are great for asking questions, but command-line tools give you superpowers. They read and write files directly in your project, maintain context across your entire codebase, and execute code in real-time.',
    points: [
      'Direct access to read and write your project files',
      'Persistent memory of your entire codebase',
      'Run, test, and deploy \u2014 all from one place',
      'Longer conversations with much more context',
    ],
    tip: 'Look for CLI tools like Claude Code, Codex CLI, Aider, or Cursor\u2019s agent mode',
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
      'Conventions \u2014 Naming rules, file structure, style',
      'Tech Stack \u2014 Which frameworks and tools to use',
      'Guardrails \u2014 What the AI should and shouldn\u2019t do',
    ],
    tip: 'Create a project rules file (like CLAUDE.md or .cursorrules) in your project\u2019s root folder',
  },
  {
    layout: 'rule',
    number: '03',
    title: 'Create Specialist Agents',
    subtitle: 'Focused experts outperform generalists',
    description:
      'Instead of using one generic AI for everything, define task-specific personas. Give each agent a clear role and expertise area \u2014 just like assembling a real development team.',
    points: [
      '"Senior Frontend Developer" for user interfaces',
      '"Database Architect" for data structure and storage',
      '"QA Engineer" for testing and finding edge cases',
      '"DevOps Specialist" for deployment and infrastructure',
    ],
    tip: 'Use system prompts or agent config files to define each specialist\u2019s role and constraints',
  },
  {
    layout: 'rule',
    number: '04',
    title: 'Choose AI-Friendly Technologies',
    subtitle: 'Not all tech stacks are created equal',
    description:
      'AI coding tools work best with popular, well-documented technologies. The more the AI has learned about a framework during training, the better code it produces.',
    points: [
      'Pick widely adopted frameworks with large communities',
      'Prefer typed languages (e.g. TypeScript over JavaScript)',
      'Use convention-based frameworks with clear patterns',
      'Stick to well-documented, stable libraries',
    ],
    tip: 'Popular stacks like React + TypeScript, Next.js, or Python + FastAPI produce the best results',
  },
  {
    layout: 'rule',
    number: '05',
    title: 'Plan Before You Build',
    subtitle: 'Measure twice, cut once',
    description:
      'Never jump straight into code generation. Ask the AI to create an implementation plan first. Review it, refine it, and only then start building \u2014 one step at a time.',
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
    title: 'Give Your AI Eyes',
    subtitle: 'Visual feedback changes everything',
    description:
      'Connect browser automation tools so your AI can see what it\u2019s building. It can take screenshots, interact with your app, and verify things look right \u2014 like having a QA tester built in.',
    points: [
      'Connect browser automation via MCP servers',
      'Let the AI take screenshots to verify UI changes',
      'Automate user flow testing and form validation',
      'Catch visual bugs the AI would otherwise miss',
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
    tip: 'If your instruction is longer than a short paragraph, it\u2019s probably too big \u2014 split it up',
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
    layout: 'promo',
    title: `Follow ${CREATOR_CONFIG.name}`,
    subtitle: "Enjoyed this guide? Let's stay connected",
    linkedinUrl: CREATOR_CONFIG.linkedinUrl,
    xUrl: CREATOR_CONFIG.xUrl,
    surveyUrl: CREATOR_CONFIG.surveyUrl,
    surveyLabel: 'Claim Your 50% Discount',
    surveyDetail:
      'Take a 2-minute survey and get 50% off our service \u2014 thank you for your time!',
    position: 'closing',
    tools: CREATOR_CONFIG.tools,
  },
  {
    layout: 'closing',
    title: 'Start Building Today',
    subtitle:
      'Pick a small project. Set up your tools. Start prompting.\nThe best way to learn vibe coding is to do it.',
    cta: 'Happy Vibe Coding!',
  },
];
