export interface GlossaryEntry {
  term: string;
  definition: string;
  matchPatterns: string[];
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'Vibe Coding',
    definition:
      'A development approach where you describe what you want in plain language and let AI handle the implementation details.',
    matchPatterns: ['vibe coding', 'Vibe Coding', 'vibe-coded'],
  },
  {
    term: 'Agent',
    definition:
      'An AI persona configured with a specific role and expertise area, like a virtual team member focused on one domain.',
    matchPatterns: ['Specialist Agents', 'agents', 'agent'],
  },
  {
    term: 'Agentic Mode',
    definition:
      'A CLI mode where the AI autonomously reads files, runs commands, and iterates on code — acting like an independent developer.',
    matchPatterns: ['Agentic Mode', 'agentic'],
  },
  {
    term: 'Context Window',
    definition:
      'The amount of text (code, conversation, files) the AI can "see" at once. Smaller context means better focus and output quality.',
    matchPatterns: ['context window', 'context'],
  },
  {
    term: 'Alignment',
    definition:
      'Configuration that steers the AI toward your expectations — coding style, design system, testing standards, and guardrails.',
    matchPatterns: ['alignment', 'Alignment'],
  },
  {
    term: 'MCP',
    definition:
      'Model Context Protocol — a standard for connecting AI tools to external services like browsers, databases, and APIs.',
    matchPatterns: ['MCP servers', 'MCP'],
  },
  {
    term: 'CLI',
    definition:
      'Command-Line Interface — a text-based tool that gives you direct control over your project, files, and AI interactions.',
    matchPatterns: ['command-line', 'CLI'],
  },
  {
    term: 'Playwright',
    definition:
      'A browser automation framework that lets AI see and interact with your web app — taking screenshots, clicking buttons, and verifying layouts.',
    matchPatterns: ['Playwright'],
  },
  {
    term: 'Puppeteer',
    definition:
      'A Node.js library for controlling headless Chrome, often used to give AI visual feedback on web interfaces.',
    matchPatterns: ['Puppeteer'],
  },
  {
    term: 'CLAUDE.md',
    definition:
      'A project configuration file for Claude Code that defines your coding standards, architecture decisions, and AI guardrails.',
    matchPatterns: ['CLAUDE.md'],
  },
  {
    term: '.cursorrules',
    definition:
      'A configuration file for Cursor IDE that sets project-specific AI behavior, coding conventions, and context.',
    matchPatterns: ['.cursorrules'],
  },
  {
    term: 'Architecture Decision Record',
    definition:
      'A document that captures an important architectural choice, its context, and consequences — keeping your project decisions traceable.',
    matchPatterns: ['Architecture Decision Record', 'ADR'],
  },
  {
    term: 'Linting',
    definition:
      'Automated static analysis that catches code style issues, potential bugs, and anti-patterns before they reach production.',
    matchPatterns: ['linting'],
  },
  {
    term: 'Type Checking',
    definition:
      'Static verification that variables and functions are used with the correct data types, catching errors at compile time rather than runtime.',
    matchPatterns: ['type checking'],
  },
  {
    term: 'Version Control',
    definition:
      'A system (like Git) that tracks every change to your code, letting you revert, branch, and collaborate safely.',
    matchPatterns: ['Version control'],
  },
  {
    term: 'Branch',
    definition:
      'An independent line of development in version control — lets you experiment without affecting the main codebase.',
    matchPatterns: ['branches'],
  },
  {
    term: 'Commit',
    definition:
      'A saved snapshot of your code changes in version control — your checkpoint to roll back to if something breaks.',
    matchPatterns: ['Commit'],
  },
  {
    term: 'Diff',
    definition:
      'A comparison showing exactly what changed between two versions of your code — line by line additions and deletions.',
    matchPatterns: ['diff'],
  },
  {
    term: 'Prompting',
    definition:
      'The art of writing clear, specific instructions for AI — better prompts lead to better code output.',
    matchPatterns: ['prompting', 'Start prompting'],
  },
  {
    term: 'BDD',
    definition:
      'Behaviour-Driven Development — a practice where features are defined as Given/When/Then scenarios that serve as both specification and automated test.',
    matchPatterns: ['BDD', 'Behaviour-Driven Development'],
  },
  {
    term: 'Gherkin',
    definition:
      'A structured language for writing BDD scenarios using Given/When/Then steps — readable by both humans and test automation frameworks.',
    matchPatterns: ['Gherkin'],
  },
  {
    term: 'SAST',
    definition:
      'Static Application Security Testing — automated analysis of source code for security vulnerabilities before the code runs.',
    matchPatterns: ['SAST'],
  },
  {
    term: 'DAST',
    definition:
      'Dynamic Application Security Testing — automated security testing of a running application to find vulnerabilities like injection or misconfiguration.',
    matchPatterns: ['DAST'],
  },
  {
    term: 'DPA',
    definition:
      'Data Processing Agreement — a legally binding contract between a data controller and processor, required under GDPR when sharing personal data with third parties.',
    matchPatterns: ['DPA'],
  },
  {
    term: 'DSAR',
    definition:
      'Data Subject Access Request — a formal request from an individual to access, correct, or delete their personal data, as guaranteed by GDPR.',
    matchPatterns: ['DSARs', 'DSAR'],
  },
  {
    term: 'Circuit Breaker',
    definition:
      'A safety mechanism that automatically stops an agent when it exceeds predefined limits — time, cost, files changed, or API calls.',
    matchPatterns: ['circuit breakers', 'Circuit breakers'],
  },
  {
    term: 'Worktree',
    definition:
      'A Git feature that creates an additional working directory linked to the same repository — useful for running parallel agent tasks in isolation.',
    matchPatterns: ['worktrees', 'worktree'],
  },
  {
    term: 'TDD',
    definition:
      'Test-Driven Development — write tests before implementation so every piece of code has a clear, executable acceptance criterion from the start.',
    matchPatterns: ['TDD'],
  },
  {
    term: 'Chargeback',
    definition:
      'An accounting practice where platform costs (like API tokens) are allocated back to the teams that consumed them, creating cost awareness.',
    matchPatterns: ['chargebacks', 'Chargeback'],
  },
  {
    term: 'TCO',
    definition:
      'Total Cost of Ownership — the full cost of a technology decision including purchase, operation, training, maintenance, and opportunity costs.',
    matchPatterns: ['TCO'],
  },
];
