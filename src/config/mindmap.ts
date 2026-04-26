import type { TierColors, MindMapRoot } from '../types/mindmap.types';

export const TIER_COLORS: TierColors = {
  solo: '#F5A623',
  team: '#F97316',
  scaling: '#D4500A',
  enterprise: '#9A3412',
};

export const MIND_MAP: MindMapRoot = {
  id: 'root',
  label: 'State of Agentic Engineering',
  note: 'A maturity journey — from a solo builder shipping in an afternoon to a regulated enterprise operating a fleet of agents under audit.',
  children: [
    {
      id: 'tier-solo',
      label: 'Solo Builder',
      subtitle: 'Beginner · 1-man-show',
      color: TIER_COLORS.solo,
      complexity: 1,
      note: 'One developer, short feedback loops, low stakes. Learn the controls, ship a prototype before lunch.',
      children: [
        {
          id: 'solo-methods',
          label: 'Core Methods',
          note: 'The starter kit every agentic engineer needs.',
          children: [
            {
              id: 'vibe',
              label: 'Vibe Coding',
              note: 'Fast, intuition-led prompting loops — describe, run, adjust.',
            },
            {
              id: 'prompt-basic',
              label: 'Prompt Engineering',
              note: 'Clear, structured instructions for the model.',
            },
            {
              id: 'ctxeng-basic',
              label: 'Context Engineering',
              note: 'Pick the right files, errors, and examples to paste in.',
            },
            {
              id: 'intro-tools',
              label: 'Intro to Tools',
              note: 'Getting used to the agent CLI, editor integrations, MCP.',
            },
            {
              id: 'skills-basic',
              label: 'Create Your Agent',
              note: 'Set up an AI coding agent in Claude Code, Codex CLI, or Gemini CLI.',
            },
            {
              id: 'planning',
              label: 'Planning',
              note: 'Create an implementation plan before writing code.',
            },
            {
              id: 'version-control',
              label: 'Version Control',
              note: 'Commit often, branch for experiments, tag stable versions.',
            },
            {
              id: 'agents-basic',
              label: 'Agents — basics',
              note: 'A single agent, one goal, one loop.',
            },
          ],
        },
        {
          id: 'solo-usecases',
          label: 'Starter Use Cases',
          note: 'Things you can demo on day one.',
          children: [
            {
              id: 'ai-friendly-tech',
              label: 'AI-Friendly Technologies',
              note: 'Pick popular, well-documented, typed stacks the model knows well.',
            },
            {
              id: 'design-to-code',
              label: 'Design \u2192 Code',
              note: 'Screenshots, sketches, or mockups in, working UI out.',
            },
            {
              id: 'example-app',
              label: 'Finished Example: React + JS',
              note: 'End-to-end reference build in 10–20 prompts with screenshots.',
            },
            {
              id: 'cost-solo',
              label: 'Token Budget',
              note: 'Understand and manage your personal API spend.',
            },
            {
              id: 'llm-limits',
              label: 'AI Limits',
              note: 'Smart zone vs dumb zone — understand how LLM quality degrades with context size.',
            },
            {
              id: 'transition-solo',
              label: 'When to Level Up',
              note: 'Signals you\u2019ve outgrown solo workflows.',
            },
          ],
        },
      ],
    },
    {
      id: 'tier-team',
      label: 'Small Team',
      subtitle: 'Intermediate · 2–10 devs',
      color: TIER_COLORS.team,
      complexity: 2,
      note: "A handful of engineers ship together. You now need shared conventions, specs, and tests so agents don't pull the codebase in four directions.",
      children: [
        {
          id: 'team-methods',
          label: 'Shared Methods',
          note: 'Practices that turn prompts into a team artefact.',
          children: [
            {
              id: 'meta',
              label: 'Meta Prompting',
              note: 'Prompts that generate or refine other prompts.',
            },
            {
              id: 'mcp',
              label: 'MCP (consuming)',
              note: 'Plug into Model Context Protocol servers for data & tools.',
            },
            {
              id: 'plugins',
              label: 'Plugins / Commands',
              note: 'Reusable slash-commands shared across the team.',
            },
            {
              id: 'grill-align',
              label: 'The Grill',
              note: 'Structured inquiry to reach a shared design concept before coding.',
            },
            {
              id: 'spec-driven',
              label: 'Spec-driven Development',
              note: 'Write the spec first; the agent implements to it.',
            },
            {
              id: 'tracer-bullets',
              label: 'Vertical Slices',
              note: 'Cut tasks vertically through every layer for immediate feedback.',
            },
            {
              id: 'prd-light',
              label: 'PRD (lightweight)',
              note: 'One-page product brief the agent can read.',
            },
            {
              id: 'tdd',
              label: 'Testing & TDD',
              note: 'Tests as executable acceptance criteria for agent output.',
            },
            { id: 'bdd', label: 'Agentic BDD', note: 'Given/When/Then scenarios aimed at agents.' },
          ],
        },
        {
          id: 'team-delivery',
          label: 'Delivery',
          note: 'How capabilities move between teammates.',
          children: [
            {
              id: 'as-npm',
              label: 'as npm package',
              note: 'Versioned distribution through the language ecosystem you already use.',
            },
            {
              id: 'as-plugin',
              label: 'as Plugin',
              note: 'Packaged for an agent runtime (Claude Code, Cursor, etc.).',
            },
          ],
        },
        {
          id: 'team-usecases',
          label: 'Team Use Cases',
          note: 'Projects that justify the upgrade from solo.',
          children: [
            {
              id: 'specs',
              label: 'Writing & Evolving Specs',
              note: 'Iterating on executable specifications together.',
            },
            {
              id: 'migration',
              label: 'Migration (e.g. → Go)',
              note: 'Cross-language refactor driven by an agent with a test safety net.',
            },
            {
              id: 'cost-team',
              label: 'Team Cost Management',
              note: 'Shared accounts, per-developer budgets, and cost visibility.',
            },
            {
              id: 'transition-team',
              label: 'When to Level Up',
              note: 'Signals your team needs platform-level practices.',
            },
          ],
        },
      ],
    },
    {
      id: 'tier-scaling',
      label: 'Scaling Org',
      subtitle: 'Advanced · multiple teams',
      color: TIER_COLORS.scaling,
      complexity: 3,
      note: 'Several teams, shared platform, higher stakes. Orchestration, alignment, and internal tooling become first-class concerns.',
      children: [
        {
          id: 'scaling-methods',
          label: 'Advanced Methods',
          note: 'Beyond single-agent prompting.',
          children: [
            {
              id: 'agents-adv',
              label: 'Agents — advanced',
              note: 'Planner/worker, critique, tool-choice strategies.',
            },
            {
              id: 'building-for-agent',
              label: 'Building for the Agent',
              note: 'Make your codebase navigable for agents — the new DX.',
            },
            {
              id: 'steering',
              label: 'Agentic Steering',
              note: 'Keeping agents aligned to intent during a run.',
            },
            {
              id: 'alignment',
              label: 'Agentic Alignment',
              note: 'Constraints & guardrails for expected behaviour.',
            },
            {
              id: 'ddd',
              label: 'Clean Architecture & DDD',
              note: 'Domain-driven design and clean architecture as an AI multiplier.',
            },
            {
              id: 'deep-modules',
              label: 'Deep Modules',
              note: 'Simple interfaces hiding significant complexity — the architecture principle that makes AI effective.',
            },
            {
              id: 'orchestration',
              label: 'Agent Orchestration / Symphony',
              note: 'Coordinating multiple cooperating agents.',
            },
            {
              id: 'scrum',
              label: 'Scrum with Agents',
              note: 'Sprint ceremonies that include agents as contributors.',
            },
            {
              id: 'linters',
              label: 'Custom Linters',
              note: 'Rules that codify team taste for agent output.',
            },
            {
              id: 'prompt-requests',
              label: 'Prompt Requests',
              note: 'Pull-request-style review for prompts & contexts.',
            },
            {
              id: 'adr',
              label: 'ADR',
              note: 'Architectural Decision Records — the audit trail of why.',
            },
            {
              id: 'prd-full',
              label: 'PRD (formal)',
              note: 'Full product spec feeding many agent workflows.',
            },
          ],
        },
        {
          id: 'scaling-delivery',
          label: 'Platform Delivery',
          note: 'Shipping capability as internal platform.',
          children: [
            {
              id: 'as-mcp',
              label: 'as MCP server',
              note: 'Expose internal tools/data via the Model Context Protocol.',
            },
            {
              id: 'skills-auth',
              label: 'Skills (authoring)',
              note: 'Author and version skills for the rest of the org.',
            },
          ],
        },
        {
          id: 'scaling-questions',
          label: 'Decision Frameworks',
          note: 'Structured criteria for key architectural choices.',
          children: [
            {
              id: 'monorepo',
              label: 'Monorepo or Polyrepo',
              note: 'Decision framework for agent-friendly repo structure.',
            },
            {
              id: 'docker-eng',
              label: 'Containerised Environments',
              note: 'When to isolate agent runs in Docker.',
            },
            {
              id: 'fe-be',
              label: 'Allocating Agents Across the Stack',
              note: 'Where agents deliver the most value by layer.',
            },
            {
              id: 'opps',
              label: 'Opportunities vs. Challenges',
              note: 'Weighing opportunities against the real risks.',
            },
          ],
        },
        {
          id: 'scaling-usecases',
          label: 'Use Cases',
          note: 'Where the advanced investment pays back.',
          children: [
            {
              id: 'autonom',
              label: 'Autonomous Agents',
              note: 'Long-running, goal-seeking agents across services.',
            },
            {
              id: 'mcp-agent-mds',
              label: 'MCP for Agent.mds',
              note: 'Standardising agent descriptions via MCP.',
            },
            {
              id: 'cost-scaling',
              label: 'Cost at Scale',
              note: 'Chargeback models, budgets, and ROI tracking.',
            },
            {
              id: 'transition-scaling',
              label: 'When to Level Up',
              note: 'Signals your org needs enterprise-grade controls.',
            },
          ],
        },
      ],
    },
    {
      id: 'tier-enterprise',
      label: 'Regulated Enterprise',
      subtitle: 'Audit · compliance · sovereignty',
      color: TIER_COLORS.enterprise,
      complexity: 4,
      note: 'Compliance, auditability, and sovereignty are non-negotiable. Agents need full traceability, new roles own the journey, and risk is treated as an engineering concern.',
      children: [
        {
          id: 'ent-ops',
          label: 'Ops & Governance',
          note: 'Running the agent fleet under control.',
          children: [
            {
              id: 'devsecops',
              label: 'Dev / Sec / Ops',
              note: 'Security & operations tailored to agent workflows.',
            },
            {
              id: 'monitoring',
              label: 'Monitoring',
              note: 'Observability across agent runs and tool calls.',
            },
            {
              id: 'traceability',
              label: 'Traceability',
              note: 'From prompt to commit — who asked, who built, who reviewed.',
            },
            {
              id: 'change-mgmt',
              label: 'Change Management',
              note: 'Controlled rollout of agent-generated change.',
            },
            {
              id: 'central-alignment',
              label: 'Global / Central Alignment',
              note: 'One source of truth for agent behaviour across the company.',
            },
          ],
        },
        {
          id: 'ent-compliance',
          label: 'Compliance & Risk',
          note: 'The hard constraints.',
          children: [
            {
              id: 'eu-souv',
              label: 'EU Sovereignty',
              note: 'Data & compute residency inside the EU.',
            },
            {
              id: 'dsgvo',
              label: 'DSGVO / GDPR',
              note: 'Personal-data handling compliant with GDPR.',
            },
            {
              id: 'more-risks',
              label: 'Further risks',
              note: 'IP, licensing, secrets, auditability, liability.',
            },
          ],
        },
        {
          id: 'ent-roles',
          label: 'The Builder',
          note: 'A new role and team shape for the agentic era.',
          children: [
            {
              id: 'builder-role',
              label: 'Builder',
              note: 'Someone who deeply understands users and moves extremely fast by orchestrating agents — the defining role of the agentic era.',
            },
            {
              id: 'builder-team',
              label: 'Builder Team (3–5 max)',
              note: 'The new optimum team size — a small, tight squad of builders who ship faster than legacy teams ten times their size.',
            },
          ],
        },
        {
          id: 'ent-usecases',
          label: 'Enterprise Use Cases',
          note: 'Where compliance pays for itself.',
          children: [
            {
              id: 'who-changed',
              label: 'Full Audit Trail',
              note: 'End-to-end audit of every agent-initiated change — who asked, who built, who reviewed, and why.',
            },
            {
              id: 'cost-enterprise',
              label: 'Enterprise ROI & TCO',
              note: 'Building the business case for agentic engineering.',
            },
          ],
        },
      ],
    },
  ],
};
