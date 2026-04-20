import type { TierColors, MindMapRoot } from '../types/mindmap.types';

export const TIER_COLORS: TierColors = {
  solo: '#10b981',
  team: '#3b82f6',
  scaling: '#7c3aed',
  enterprise: '#be123c',
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
            { id: 'vibe', label: 'Vibe Coding', note: 'Fast, intuition-led prompting loops — describe, run, adjust.' },
            { id: 'prompt-basic', label: 'Prompt Engineering', note: 'Clear, structured instructions for the model.' },
            { id: 'ctxeng-basic', label: 'Context Engineering', note: 'Pick the right files, errors, and examples to paste in.' },
            { id: 'intro-tools', label: 'Intro to Tools', note: 'Getting used to the agent CLI, editor integrations, MCP.' },
            { id: 'skills-basic', label: 'Skills (using)', note: 'Calling ready-made skill bundles instead of writing from scratch.' },
            { id: 'agents-basic', label: 'Agents — basics', note: 'A single agent, one goal, one loop.' },
          ],
        },
        {
          id: 'solo-usecases',
          label: 'Starter Use Cases',
          note: 'Things you can demo on day one.',
          children: [
            { id: 'figma', label: 'Figma → Code', note: 'Screenshots or Figma file in, working UI out.' },
            { id: 'example-app', label: 'Finished Example: React + JS', note: 'End-to-end reference build in 10–20 prompts with screenshots.' },
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
      note: 'A handful of engineers ship together. You now need shared conventions, specs, and tests so agents don\'t pull the codebase in four directions.',
      children: [
        {
          id: 'team-methods',
          label: 'Shared Methods',
          note: 'Practices that turn prompts into a team artefact.',
          children: [
            { id: 'meta', label: 'Meta Prompting', note: 'Prompts that generate or refine other prompts.' },
            { id: 'mcp', label: 'MCP (consuming)', note: 'Plug into Model Context Protocol servers for data & tools.' },
            { id: 'plugins', label: 'Plugins / Commands', note: 'Reusable slash-commands shared across the team.' },
            { id: 'spec-driven', label: 'Spec-driven Development', note: 'Write the spec first; the agent implements to it.' },
            { id: 'prd-light', label: 'PRD (lightweight)', note: 'One-page product brief the agent can read.' },
            { id: 'tdd', label: 'Testing & TDD', note: 'Tests as executable acceptance criteria for agent output.' },
            { id: 'bdd', label: 'Agentic BDD', note: 'Given/When/Then scenarios aimed at agents.' },
          ],
        },
        {
          id: 'team-delivery',
          label: 'Delivery',
          note: 'How capabilities move between teammates.',
          children: [
            { id: 'as-npm', label: 'as npm package', note: 'Versioned distribution through the language ecosystem you already use.' },
            { id: 'as-plugin', label: 'as Plugin', note: 'Packaged for an agent runtime (Claude Code, Cursor, etc.).' },
          ],
        },
        {
          id: 'team-usecases',
          label: 'Team Use Cases',
          note: 'Projects that justify the upgrade from solo.',
          children: [
            { id: 'specs', label: 'Writing & Evolving Specs', note: 'Iterating on executable specifications together.' },
            { id: 'migration', label: 'Migration (e.g. → Go)', note: 'Cross-language refactor driven by an agent with a test safety net.' },
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
            { id: 'agents-adv', label: 'Agents — advanced', note: 'Planner/worker, critique, tool-choice strategies.' },
            { id: 'steering', label: 'Agentic Steering', note: 'Keeping agents aligned to intent during a run.' },
            { id: 'alignment', label: 'Agentic Alignment', note: 'Constraints & guardrails for expected behaviour.' },
            { id: 'ddd', label: 'Agentic DDD', note: 'Domain-driven design with agent-first models.' },
            { id: 'orchestration', label: 'Agent Orchestration / Symphony', note: 'Coordinating multiple cooperating agents.' },
            { id: 'scrum', label: 'Scrum with Agents', note: 'Sprint ceremonies that include agents as contributors.' },
            { id: 'linters', label: 'Custom Linters', note: 'Rules that codify team taste for agent output.' },
            { id: 'prompt-requests', label: 'Prompt Requests', note: 'Pull-request-style review for prompts & contexts.' },
            { id: 'adr', label: 'ADR', note: 'Architectural Decision Records — the audit trail of why.' },
            { id: 'prd-full', label: 'PRD (formal)', note: 'Full product spec feeding many agent workflows.' },
          ],
        },
        {
          id: 'scaling-delivery',
          label: 'Platform Delivery',
          note: 'Shipping capability as internal platform.',
          children: [
            { id: 'as-mcp', label: 'as MCP server', note: 'Expose internal tools/data via the Model Context Protocol.' },
            { id: 'skills-auth', label: 'Skills (authoring)', note: 'Author and version skills for the rest of the org.' },
          ],
        },
        {
          id: 'scaling-questions',
          label: 'Open Questions',
          note: 'Things the platform team is actively debating.',
          children: [
            { id: 'monorepo', label: 'Monorepo? (nx)', note: 'Does a monorepo help or hurt agent context?' },
            { id: 'docker-eng', label: 'Docker-based Engineering?', note: 'Isolated per-task environments for every agent run.' },
            { id: 'fe-be', label: 'Frontend / Backend mix?', note: 'Which layers benefit most from agent-first workflows?' },
            { id: 'opps', label: 'Möglichkeiten vs. Herausforderungen', note: 'Weighing opportunities against the real risks.' },
          ],
        },
        {
          id: 'scaling-usecases',
          label: 'Use Cases',
          note: 'Where the advanced investment pays back.',
          children: [
            { id: 'autonom', label: 'Autonome Agenten', note: 'Long-running, goal-seeking agents across services.' },
            { id: 'mcp-agent-mds', label: 'MCP for Agent.mds', note: 'Standardising agent descriptions via MCP.' },
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
            { id: 'devsecops', label: 'Dev / Sec / Ops', note: 'Security & operations tailored to agent workflows.' },
            { id: 'monitoring', label: 'Monitoring', note: 'Observability across agent runs and tool calls.' },
            { id: 'traceability', label: 'Traceability', note: 'From prompt to commit — who asked, who built, who reviewed.' },
            { id: 'change-mgmt', label: 'Change Management', note: 'Controlled rollout of agent-generated change.' },
            { id: 'central-alignment', label: 'Global / Central Alignment', note: 'One source of truth for agent behaviour across the company.' },
          ],
        },
        {
          id: 'ent-compliance',
          label: 'Compliance & Risk',
          note: 'The hard constraints.',
          children: [
            { id: 'eu-souv', label: 'EU Sovereignty', note: 'Data & compute residency inside the EU.' },
            { id: 'dsgvo', label: 'DSGVO / GDPR', note: 'Personal-data handling compliant with GDPR.' },
            { id: 'more-risks', label: 'Further risks', note: 'IP, licensing, secrets, auditability, liability.' },
          ],
        },
        {
          id: 'ent-roles',
          label: 'New Roles',
          note: 'The people who own the agentic delivery lifecycle.',
          children: [
            { id: 'tech-po', label: 'Technische Product Owner', note: 'PO fluent in specs, constraints and agent limits.' },
            { id: 'dev-journey', label: 'Developer Journey Verantwortliche', note: 'Owner of the end-to-end developer experience.' },
            { id: 'devops-menschen', label: 'DevOps Menschen', note: 'Operators who keep the agent fleet running.' },
          ],
        },
        {
          id: 'ent-usecases',
          label: 'Enterprise Use Cases',
          note: 'Where compliance pays for itself.',
          children: [
            { id: 'trace-change', label: 'Traceability & Change Mgmt', note: 'End-to-end audit of every agent-initiated change.' },
            { id: 'who-changed', label: 'Wer hat was und warum geändert', note: 'Full audit: who changed what, and why.' },
          ],
        },
      ],
    },
  ],
};
