# Team Session: Aligning Humans and Agents Across an Organisation

## Core problem

Individual AI adoption doesn't compound — productivity gains stay personal, not organisational

## Alignment distribution

- plugin (org-wide Claude config, custom skills, shared slash commands, curated permissions)
- repo (canonical CLAUDE.md templates, shared memory, project archetypes)
- MCP (structured access to internal systems — Notion, Jira, Slack, internal APIs)

## Company knowledge base

- how we work (norms, decisions, rituals)
- what we're building (glossary, domain context, architecture decisions)
- how we use agents (trusted workflows, known failure modes, what agents should never do autonomously)

## Agent governance

- permission scoping (least-privilege access per role and context)
- MCP access logging (what agents retrieve and when)
- change review (prompt and config changes go through the same process as code)
- deprecation (stale context is worse than no context)

## Context quality over quantity

- context rot — too much noise degrades agent performance
- curate for signal, not coverage
- agents read CLAUDE.md at session start — every word costs something

## Onboarding with agents

- a new hire should be productive with an agent in week one
- the knowledge base is the onboarding doc that agents can also read
- shared context = faster ramp for humans and agents alike

## Compounding the flywheel

- one improvement to shared context benefits every agent session across the org
- best prompt engineer's insight reaches the whole team without a meeting
- agent quality compounds with knowledge base quality

## Anti-patterns

- prompt silos (each team hoards their best workflows)
- undifferentiated context dumps into CLAUDE.md
- ungoverned MCP access without logging or scoping
- knowledge base as archive, not living system
- treating agent alignment as an IT project (it's 80% people and knowledge, 20% infrastructure)

## Open questions

- who owns the knowledge base?
- how do teams contribute domain-specific context without fragmenting the standard?
- where does agent output go back into the knowledge base?
