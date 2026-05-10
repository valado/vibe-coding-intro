# Session 1: Working With Existing Codebases & Collaborating With Developers

**Live session with Vlad Daskalov** — Working with existing codebases, collaborating with developers, contributing to production.

---

## Session Arc

> Non-engineers can now contribute to production. The question is how to do it without creating more work for engineers than you save.

The throughline: AI tools like Claude Code collapse the barrier between "I have an idea" and "I can touch the code." But most non-engineers still don't know how to navigate an existing codebase, communicate with a dev team, or tell the difference between a demo that impresses and an agent that actually works.

This session is about closing that gap — practically, not theoretically.

**Flow:**
```
Real use cases → Connect to existing tools → Design for reliability → Learn the terminal → Navigate codebases → Work with Claude Code → Get your dev team on board → Hand off cleanly
```

---

## 1. Agent Use Cases That Are Real, Not Theatre

### The "wow demo" trap

Most agent demos are impressive and useless. They show a capability without answering: *does this solve a real problem, for real people, often enough to be worth maintaining?*

Theatre: an agent that summarises a Slack thread on demand.  
Real: an agent that automatically creates a Jira ticket every time a specific Slack message pattern appears, routes it to the right team, and pings for a response after 48 hours.

The difference isn't technical complexity. It's whether the automation is embedded in a workflow that was already happening — and whether it removes friction that was actually felt.

### What makes a use case real

Three tests:

1. **Frequency** — Does this happen at least weekly? Daily? Automation compounds; rare tasks don't justify the maintenance cost.
2. **Pain** — Does someone actually dread doing this manually? If nobody was complaining about it before, automating it produces nothing.
3. **Determinism** — Can you define what "correct" looks like? If the output requires human judgment every time, the agent is just shifting the work, not removing it.

### The ops glue category

The highest-value use cases for non-technical teams are **ops glue** — automations that connect tools teams already use, moving data and triggering actions between them without requiring custom code.

Examples:
- New form submission (Typeform) → creates structured Jira ticket with auto-assigned labels
- Notion status changes to "Ready for Review" → Slack notification to the right channel with a summary
- Weekly Google Sheets data → automated Notion report with commentary
- Customer support tag in Intercom → triggers a Notion page and a calendar invite for a follow-up
- New Figma comment mentioning a developer → creates a GitHub issue in the right repo

These aren't glamorous. They compound every week. They are the most defensible productivity gains because they remove category errors — things that fell through the cracks, not things that were done slowly.

### Evaluating use cases: impact per complexity

Before building anything, rate it:

| Dimension | Question | Score (1–3) |
|---|---|---|
| Frequency | How often does this happen? | 1=rare, 3=daily |
| Pain | How much does the manual version hurt? | 1=minor, 3=someone's job |
| Determinism | How clear is "correct"? | 1=judgment-heavy, 3=rule-based |
| Reversibility | How bad is a mistake? | 1=catastrophic, 3=easily undone |

High frequency + high pain + high determinism + high reversibility = build it first.

Low frequency or low determinism = wait, or involve a human in the loop.

---

## 2. Connecting Prototypes to the Tools Teams Already Live In

### Start where teams already are

The fastest path to adoption is zero migration. If your team lives in Notion, Sheets, Jira, and Slack — those are your integration points. Every automation that requires teams to change their tools will be adopted slowly or not at all.

The job is to make AI invisible in the workflow: the right thing shows up in the right place at the right time, and nobody needs to think about the agent that produced it.

### The core integration stack for non-technical teams

**Make (formerly Integromat)** — the best ops glue tool. Visual workflow builder, connects 1000+ apps, no code required. The right default for everything in this session.

**Zapier** — simpler than Make, fewer capabilities, higher price ceiling. Good for very simple one-step automations.

**n8n** — open-source Make. More power, requires self-hosting. Worth it if you have a developer to set it up and want to avoid per-task pricing.

**Claude API via Make/Zapier** — add AI reasoning to any automation. Make has a native HTTP module; use it to call Claude for classification, summarisation, drafting, or decision-making within a workflow.

### Common integration patterns

**Pattern 1: Capture → Classify → Route**  
Incoming data (form, email, Slack) → Claude classifies it → sent to the right place (Jira label, Notion database, Slack channel)

**Pattern 2: Status change → Notify + Summarise**  
Something changes in one tool → Claude writes a human-readable summary → notification sent with context

**Pattern 3: Scheduled synthesis**  
Every Monday at 9am → pull data from Sheets → Claude writes a summary → post to Notion + Slack

**Pattern 4: Threshold trigger**  
Metric crosses a threshold (row count, date, numeric value) → agent drafts a response or creates a task

### Sheets and Notion as data layers

Google Sheets is the most underrated data layer for non-technical automation. It's a database that everyone already knows how to read.

Use Sheets to:
- Store configuration (routing rules, templates, thresholds)
- Log agent activity (every action the automation took, with timestamps)
- Stage data before sending it somewhere structured (Jira, Notion)

Notion databases work similarly but with richer structure. Use Notion when the output needs to be read by humans and context matters.

### Jira integration patterns

Jira is where engineering work lives. For PMs and ops, the key integrations are:
- **Auto-create tickets** from structured inputs (forms, Slack messages, Notion pages)
- **Update ticket status** from external events (deployment complete, user action, date trigger)
- **Surface ticket context** in Slack or Notion when referenced

The discipline: don't create Jira tickets from unstructured data. Claude can parse and structure it first, then the ticket is clean when it arrives.

---

## 3. Designing Reliable Automation: Triggers, Fallbacks, Monitoring

### Why most automations quietly break

Automations fail in two ways:
1. **Loudly** — error thrown, workflow stops, someone notices
2. **Silently** — workflow runs, produces wrong output, nobody checks for weeks

Silent failures are more dangerous. Design against them first.

### Trigger types

**Scheduled triggers** — run at a fixed time (every day at 9am, every Monday, first of the month)  
Best for: reports, digests, periodic syncs  
Risk: stale data if the upstream source hasn't updated

**Event triggers** — run when something happens (new row in sheet, status change in Notion, message in Slack)  
Best for: routing, notifications, real-time ops  
Risk: high volume if the event fires too frequently; test with real data

**Webhook triggers** — an external system sends data to your automation when something happens  
Best for: form submissions, payment events, API integrations  
Risk: requires setup on both ends; harder to debug when silent

### Fallback design

Every automation needs an answer to: *what happens when it fails?*

**Minimum viable fallback:**
1. Log the failure (to Sheets, Notion, or Slack) with enough context to diagnose it
2. Notify a human (Slack message to a specific channel or person)
3. Don't silently produce wrong output — failing loudly is better than failing quietly

**For automations with consequences** (creating tickets, sending messages, modifying data):
- Add a "dry run" mode where the automation shows what it *would* do before doing it
- Add a human approval step for high-stakes actions
- Log every action taken with the input that triggered it

### Monitoring

The discipline: treat your automations like a product. They need observability.

**Basic monitoring setup:**
- A Google Sheet (or Notion database) that logs every run: timestamp, input, output, status (success/fail)
- A weekly review of that log — are there patterns in failures? Is output quality drifting?
- A Slack alert for any failure (Make has a built-in error handler — use it)

**Signals that an automation is degrading:**
- Increasing rate of Claude calls that require human correction
- Users stopping using the output (check: is anyone reading the Notion digest?)
- Edge cases appearing in inputs that the classification prompt wasn't trained on

**The maintenance window:** Schedule 30 minutes per month to review your top 3 automations. Most problems surface here before they become incidents.

---

## 4. Terminal Basics for Non-Engineers

### Why this matters now

Claude Code runs in the terminal. If you want to contribute to a codebase — even just reading files, running the app locally, or making small changes — you need to be comfortable in a terminal window.

You don't need to become a developer. You need to stop being afraid of it.

### The mental model

The terminal is a text interface to your filesystem and running programs. That's it. Everything you can do by clicking in Finder, you can do by typing a command. The difference: commands are precise, composable, and don't require a GUI.

**Three things to understand:**
1. You are always "somewhere" — a directory. Your prompt usually shows you where.
2. Commands are programs. `ls` is a program. `git` is a program. You run programs by typing their name.
3. Output is text. If a command runs successfully, it prints something (or nothing). If it fails, it prints an error.

### Essential commands

```bash
pwd               # Where am I? (print working directory)
ls                # What's in this directory?
ls -la            # Same, but include hidden files and details
cd foldername     # Move into a folder
cd ..             # Move up one level
cd ~              # Go home (your user directory)
cat filename.txt  # Print a file's contents
open .            # Open current directory in Finder (Mac)
```

```bash
# Git basics (you'll use these to understand the state of a codebase)
git status        # What files have changed?
git log           # What commits happened recently?
git diff          # What exactly changed in the files?
git pull          # Get the latest changes from the remote
```

```bash
# Running things
npm install       # Install dependencies (Node projects)
npm run dev       # Start a dev server (usually)
npm run build     # Build the production version
```

### Reading error messages

Most terminal anxiety comes from error messages. They look intimidating but follow patterns:

1. **Read the last line first** — errors usually end with the specific problem
2. **Look for file names and line numbers** — `src/App.tsx:42` means the problem is at line 42 of that file
3. **Google the exact error message** — copy it verbatim, include the tool name (e.g. "vite error: cannot find module")
4. **Paste into Claude** — Claude reads error messages well; give it the full output and the command you ran

Common errors:
- `command not found` — the tool isn't installed, or you're in the wrong directory
- `permission denied` — you don't have access; try `sudo` (with caution)
- `ENOENT: no such file or directory` — a path is wrong somewhere
- `port already in use` — another process is running on that port; find and stop it

---

## 5. Navigating and Editing an Existing Codebase

### How to orient yourself in an unfamiliar repo

The first time you open a codebase, it looks like chaos. It isn't. Most codebases follow conventions. Learn the conventions and the structure reveals itself.

**Start with these files:**
1. `README.md` — what is this, how do I run it, what does it do
2. `package.json` (or equivalent) — what tools are used, what scripts exist
3. `src/` or `app/` — where the actual code lives (usually)
4. Configuration files in the root — `.env`, `vite.config.ts`, `tailwind.config.js` etc.

**Ask Claude Code:** *"I've just opened this repo for the first time. Can you give me a tour of the structure and explain what the main parts do?"* — paste a `ls -la` of the root directory.

### Finding what you're looking for

**VS Code search** (`Cmd+Shift+F`) — search text across the entire codebase. If you want to find where "login" is handled, search for it. Follow the thread.

**File search** (`Cmd+P`) — find files by name. You don't need to know exactly where something is.

**Terminal grep:**
```bash
grep -r "searchterm" src/   # Find all occurrences in src/
grep -r "TODO" .            # Find all TODO comments
```

### Making small edits safely

Before touching anything:
1. Make sure you're on a branch, not `main` — `git checkout -b my-change`
2. Read the file before editing it — understand what's there
3. Make one change at a time — don't edit five files in one go
4. Run the app after each change to confirm nothing broke
5. `git diff` before committing — review exactly what you changed

**With Claude Code:**
- Tell Claude what you want to change and *why*, not just what to edit
- Ask Claude to explain what it changed before accepting
- If something breaks, paste the error back to Claude with the context of what changed

### Reading code vs. writing code

You don't need to write code to contribute. Reading code is often enough.

**What non-engineers can do with read-only access:**
- Understand what a feature does and explain it to stakeholders
- Find where a bug likely lives and describe it to a developer
- Audit what data is being collected and where
- Trace a user journey through the codebase
- Spot dead code, unused features, or inconsistencies

This is underrated. A PM who can read the codebase is worth more to an engineering team than one who can write a bit of code without understanding the system.

---

## 6. How to Work With Claude Code as Your Engineering Partner

### What Claude Code is

Claude Code is an AI coding assistant that runs in your terminal. It can read your codebase, understand context, write and edit files, run commands, and navigate complex multi-file changes — all through natural language.

The key difference from a chat interface: Claude Code has *access to your actual files*. You don't paste code in and out. You work in place.

### What it can do

- Read, explain, and summarise any file in the codebase
- Make targeted edits across multiple files at once
- Fix bugs given an error message and context
- Write new features given a clear specification
- Refactor existing code
- Run commands and tests
- Answer questions about how the code works

### What it can't replace

- Understanding *what* to build (that's your job)
- Knowing when output is wrong in ways that aren't obvious (always verify)
- Architecture decisions that require deep knowledge of the system's history
- Human judgment about tradeoffs

### The prompt-as-spec pattern

The clearest way to work with Claude Code is to write prompts that read like mini-specifications:

**Weak prompt:** *"Can you fix the login page?"*  
**Strong prompt:** *"The login form at src/pages/Login.tsx submits but doesn't show an error when the password is wrong. The API returns a 401 with the message 'Invalid credentials'. The error should appear below the password field in red text. Don't change the form layout."*

The discipline: tell Claude (1) what the current behaviour is, (2) what the expected behaviour is, and (3) any constraints. If you can write that, Claude Code can execute it.

### Context management

Claude Code works best when it has the right context. Two tools:

**CLAUDE.md** — a file in your repo root that Claude reads at the start of every session. Use it to describe the project, conventions, what not to touch, and any domain-specific rules. Treat it like onboarding documentation for a developer who's never seen the code.

**Pointing Claude at files** — instead of describing a problem abstractly, paste the relevant file path into your prompt. *"Look at src/components/Header.tsx — the mobile menu doesn't close when you tap outside it."* Direct > abstract.

### When to trust the output, when to verify

**Trust:** Mechanical changes (renaming, reformatting, adding types), well-defined bug fixes with clear error messages, changes where you can immediately test the outcome.

**Verify carefully:** New features that touch multiple files, changes to authentication or permissions, anything modifying how data is stored or sent, changes to configuration files.

**The rule:** the more consequential the change, the more you need to understand what Claude did, not just that it did it.

---

## 7. Getting Your Dev Team on Board

### Why developers are sceptical (and why that's useful)

Developers have strong pattern-matching for things that cause them extra work. When a PM says "I made some changes with AI," a developer often hears: "I introduced technical debt that will take me a week to untangle."

That scepticism is rational. It's based on experience. The job is not to overcome it — it's to not confirm it.

### What developers actually want from PM collaboration

- **Specificity** — a clear description of the problem and the desired outcome, not a solution
- **Context** — why this matters, what the constraint is, what the user actually does
- **Boundaries** — what you're touching and what you're not
- **Validation** — evidence that the thing you want to build is worth building

The PM who brings a well-structured problem with user evidence is infinitely more useful than the PM who brings a prototype that sort-of works and needs to be rewritten.

### The handoff problem

Prototypes created without engineering input often:
- Use wrong data models (will require migration later)
- Ignore performance at scale (fine for 10 users, broken at 10,000)
- Bypass security considerations (authentication, permissions, input validation)
- Make assumptions about infrastructure that don't hold in production
- Create UX patterns that are hard to maintain over time

None of these are reasons not to build prototypes. They're reasons to be honest about what a prototype is: a thinking tool, not a production candidate.

### Building trust through specificity

The fastest way to build credibility with a dev team:

1. **Write the spec before you build the prototype** — show you can articulate the problem before you show code
2. **Label prototype quality honestly** — "this is a proof of concept, I expect the real implementation to look different"
3. **Bring questions, not demands** — "I'm not sure how to handle the data persistence here, what's the right approach?"
4. **Show your validation** — "I tested this with 8 users, here's what they said"

### Common failure modes in dev-PM AI collaboration

**PM builds a full prototype, expects it to be shipped as-is.**  
Engineering has to rewrite it. Everyone is frustrated. The PM feels their work was discarded; the engineer feels they wasted time reviewing it.

**PM makes changes to production code without telling engineering.**  
Claude Code can make changes to a codebase. That doesn't mean it should, without a code review and a deployment process.

**PM uses AI output without verifying it.**  
Claude can write code that looks right and isn't. If you're sending code to engineering, you need to be able to explain what it does.

**PM treats AI as an oracle.**  
AI can be confidently wrong. On technical questions, validate with a developer before acting.

---

## 8. Cleaning Up and Preparing Prototypes for Engineering Handoff

### What "production-ready" actually means

Production code is code that:
- Works correctly for all users, not just the happy path
- Handles errors gracefully
- Is maintainable by someone who didn't write it
- Is secure (doesn't expose data, doesn't trust unvalidated input)
- Is observable (can be monitored, debugged, and traced)

A prototype is none of these things and doesn't need to be. The job before handoff is to bridge the gap — not by making the prototype production-ready, but by giving engineering everything they need to build the production version.

### The prototype-to-spec translation

The most useful handoff artifact is not polished code. It's a clear description of what the prototype does, what decisions were made and why, and what's deliberately unresolved.

**Structure for a handoff document:**

```
1. What this does (1–2 sentences, user perspective)
2. The problem it solves (with evidence)
3. How it currently works (walk through the prototype)
4. Key decisions made and why
5. What we explicitly didn't solve (scope boundary)
6. Known weaknesses / shortcuts taken
7. Open questions for engineering
```

### What engineers need to know (and what they'll figure out)

**Tell them:**
- The user behaviour you're trying to enable
- The data model you assumed (even if it's wrong)
- The external services or APIs you integrated with
- The edge cases you found in testing
- What "done" looks like from a user perspective

**Let them figure out:**
- How to structure the code
- What framework patterns to use
- How to optimise for performance
- How to fit this into the existing architecture

Mixing these up — telling engineers how to write code, or leaving the user outcome undefined — is where handoffs break down.

### CLAUDE.md as a handoff artifact

If the prototype was built with Claude Code and has a CLAUDE.md, that file is the most useful handoff artifact you have. It documents the project for an AI, which means it's written in precise, unambiguous language — exactly what engineers need.

Before handoff, update CLAUDE.md with:
- What the prototype was trying to prove
- What worked and what didn't
- The shortcuts taken that a production build should fix
- The open questions engineering needs to answer

This turns a living document into a project brief.

### The cleanup checklist before handoff

```
□ Remove hardcoded credentials, API keys, or test data
□ Replace placeholder data with realistic examples
□ Document any external API integrations (keys, endpoints, auth method)
□ Write down the data model you used (even informally)
□ List the edge cases you found during testing
□ Identify the one thing that's most likely to need rearchitecting
□ Record a short walkthrough video (Loom) — more useful than any doc
```

---

## Session Format

**Duration:** 90 minutes  
**Structure:**

| Block | Time | Content |
|---|---|---|
| Opening | 10 min | Non-engineers contributing to production — the new reality |
| Sections 1–3 | 30 min | Real use cases, tool integrations, reliable automation |
| Section 4 | 10 min | Terminal basics (live demo) |
| Sections 5–6 | 20 min | Navigating codebases + Claude Code as engineering partner |
| Sections 7–8 | 20 min | Getting dev team on board + prototype handoff |

**Workshop elements (optional):**
- *Use case audit* — participants score their top 3 automation ideas against the frequency/pain/determinism framework
- *Handoff document exercise* — write a one-page spec for a prototype you've already built
- *Terminal live walkthrough* — open a real codebase together and navigate it

---

## Key Takeaways

1. Agent use cases that compound are better than ones that impress. Frequency × pain × determinism is the filter.
2. Ops glue — connecting tools teams already use — is the highest-value, lowest-risk category for non-technical automation.
3. Design every automation for silent failure. Log everything. Alert on errors. Review monthly.
4. The terminal is just text. You don't need to master it; you need to stop fearing it.
5. Non-engineers who can read code are more valuable to dev teams than ones who can write a little of it.
6. The highest-value handoff artifact is a clear problem definition with evidence — not polished code.
