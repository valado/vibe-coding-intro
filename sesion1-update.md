# introduce the author

# introduce tinytoolstack & vibesmonitor

# start generation of a tinytoolstack app

TODO - brainstorm what app to generate

# Basic rules working on a a production project

- prompt-requests
- small changes (ask claude to commit)
- always link to a ticket (tracebility)
- MCP with Jira/Linear etc.

# Working with LLMs

- be conchios about the context usage (context rot - provide only strictly relevant information)
- review of changes (by agent with clear context)
- plan (Opus 4.6) and then execute (Sonnet 4.6) - (advanced techniques with BDD, SDD)

# Harness

- Codex, Claude Cowork, claude-code, opencode, pi, openclaw

# Preparation & Onboarding

- alignment (provided by the dev team, what tech-stack, conventions, libraries, design, CLAUDE/AGENTS.md as an entry point) - example: https://tinytoolstack.com/app/agenticalignment
- vision for the project
- skills
- sub-agents (verys specific e.g. react-dev)
- computer-use, playwright MCP (let the agent get automated feedback)
- once alignment is defined the prompt is not that important (you don't explain every task from scratch to your best employee — they're context-aware and need one sentence, not a manual)
- /tidy (slash command) - make sure to improve quality on each change (boy/girl-scout rule)
- You don't write better prompts. You build better context.

# Dev push back -> Getting Your Dev Team on Board

- non-determinism (devs are also not deterministic)
- not putting the work to setup an alignemnt -> the generated output can't live up to your expectations
- since sonnet 4.6 and codex 5.2 there was a step change in quality and capabilities
- current code quality is important (agents replicate existing patterns)
- CI/CD pipeline with quality gates (linter, tests, E2E)

# Dev Hand-off

- let the agent generate a lightweight documentation (arc42)
- the agent should generate an overview of the changes as a description of the PR

# Future team

- spending the time to setup the alignment, vision and infrastructure
- smaller 3-4 ppl team
- focus on building and understanding the domain
