# Session 2: Validate Like a PM, Ship Like an Engineer

**Final session with Vlad Daskalov** — Analytics, behaviour tracking, validation, and AI-assisted product decisions.

---

## Session Arc

> Building is now cheap. Validation is the bottleneck.

The throughline: AI makes execution faster and cheaper — which means the quality of your *decisions* matters more, not less. Bad decisions just ship faster. This session is about raising the quality of those decisions while still moving at AI speed.

**Flow:**
```
What to measure → How to measure it → How fast to move → What questions to ask → What traps to avoid → How to find demand you can't see yet
```

---

## 1. Analytics Tools & Behaviour Tracking

### The core distinction

**Outcome metrics** tell you what happened (conversion, retention, revenue).  
**Behaviour metrics** tell you *why* — the sequence of actions that led to the outcome.

Most teams track outcomes. The insight is in the behaviour.

### What analytics actually tells you (and what it doesn't)

Analytics tells you what users *did*. It doesn't tell you:
- Why they did it
- What they wanted to do but couldn't
- What they almost did
- What they would have done if the product were different

The gap between "what users do" and "what users want" is where product decisions live.

### Tools

| Tool | Best for |
|---|---|
| **PostHog** | Open-source, full-stack product analytics + session replay |
| **Mixpanel** | Event-based funnels and cohort retention |
| **Amplitude** | Behavioural analytics at scale, journey maps |
| **Heap** | Retroactive event capture (track everything, define events later) |
| **Hotjar / FullStory** | Session replay, heatmaps, qualitative overlay |
| **Segment** | Data routing layer — sends events to any tool above |

For early-stage: PostHog or Heap. PostHog gives you session replay + analytics in one. Heap means you never miss an event because you hadn't defined it yet.

### What to instrument

- **Entry points** — how did they arrive? (channel, referrer, campaign)
- **Activation events** — the first action that correlates with retention
- **Friction points** — where do users stop, slow down, or retry?
- **Feature usage** — which features are actually used, by whom, how often
- **Exit events** — last action before churning

**Rule:** Instrument before you ship. Adding tracking retroactively means the first week of data — often the most important — is gone.

### Behaviour tracking vs. outcome tracking in AI products

When AI is in the loop, add:
- **Query tracking** — what are users asking the agent? What categories emerge?
- **Rephrasing attempts** — how many times does a user restate the same request? (= friction signal)
- **Fallback-to-manual** — when does AI fail and the user does it themselves?
- **Abandonment after AI response** — user got an answer and left; was it useful or useless?

These signals are invisible to traditional analytics but are the richest source of product insight in AI products.

---

## 2. AI-Assisted Validation Workflows

### What validation means here

Validation = reducing uncertainty about a belief before committing resources to it.

Not: "does this work technically?"  
Yes: "do users want this, will they pay for it, does it solve the actual problem?"

### The validation ladder

```
Belief (what you assume is true)
   ↓
Hypothesis (testable version of that belief)
   ↓
Signal (cheapest evidence that would update your belief)
   ↓
Conviction (enough evidence to commit)
```

AI accelerates every step but doesn't replace the thinking at each level.

### Using AI in the workflow

**Generating hypotheses**
Prompt: *"Here is our product and what we think users want. What are 5 assumptions we haven't validated? Which is most likely to be wrong?"*

AI is better at this than most PMs because it has no ego investment in the roadmap.

**Synthesising qualitative data**
- Upload interview transcripts → ask AI to cluster themes, surface contradictions
- Paste support tickets → identify top friction points, unexpected use cases
- Analyse survey responses → find the outliers, not just the majority

**Survey design**
AI can generate survey questions but will default to leading or confirmation-biased questions unless pushed. Prompt: *"Rewrite these questions to make them neutral. Then suggest questions that would challenge our core assumptions."*

**Interview analysis at scale**
- Record and transcribe user interviews (Otter.ai, Fireflies)
- Feed transcripts to Claude with prompt: *"What did users say that surprised them? What did they want that we don't currently offer? What workarounds are they using?"*

### What AI can't replace

- The decision about *what to validate* (that's the PM superpower — see Section 4)
- Being in the room when a user gets confused or delighted
- The judgment call about whether a signal is noise or insight

---

## 3. Speed vs. Rigor — When Is "Quick and Dirty" Actually the Right Call?

### The tradeoff is real but routinely miscalibrated

Fast and wrong is expensive. Slow and right is also expensive. The question is: what's the cost of being wrong, and how reversible is the mistake?

### The reversibility × stakes framework

**Before committing to a speed/rigor level, ask two questions:**

1. **How reversible is this decision?** Can you undo it in a week? A quarter? Ever?
2. **What are the stakes?** What breaks if you're wrong? (User trust, revenue, safety, architecture?)

```
              Low stakes    High stakes
Reversible    → Ship fast   → Validate first, ship fast
Irreversible  → Validate    → High rigor, no shortcuts
```

### Three categories

**Category 1: Latency-sensitive decisions**  
→ *Ship fast, learn fast*  
Examples: landing page copy, feature order, onboarding flow, UI variations  
These are reversible, measurable, and low-stakes. Every day you wait is a day of learning lost.

**Category 2: Trust-sensitive decisions**  
→ *Validate before shipping*  
Examples: agents that act on behalf of users (send emails, make payments), health or legal advice, anything with personal data  
The cost of being wrong isn't just a bad metric — it's user harm or a destroyed relationship.

**Category 3: Infrastructure decisions**  
→ *High rigor, slow down*  
Examples: data model, authentication architecture, agent orchestration patterns, API contracts  
These are irreversible in practice. The cost of changing them compounds. "Quick and dirty" here creates years of debt.

### The practical test

Before shipping: *"If I'm wrong about this, how long does it take to undo it and what does it cost?"*  
If the answer is "a day and nothing" → ship.  
If the answer is "a quarter and significant rework" → validate first.

### Communicating this to cross-functional teams

Engineers default to rigor. PMs sometimes default to speed. Neither is right universally.

Shared language: "This is a Category 1 — let's ship a dirty version and measure. That one is Category 3 — we need to slow down." Saves the argument every time.

---

## 4. The PM Superpower: Knowing What to Validate

### AI handles the how. You own the what.

AI can run surveys, synthesise interviews, analyse usage data, generate hypotheses, A/B test copy, and prototype in hours. What it cannot do: decide *which* beliefs are worth testing and *in what order*.

That judgment — what to validate next — is the highest-leverage PM skill in the agent era.

### The question hierarchy

**Level 1: What do we believe?**  
Write down the core assumptions behind your current roadmap. Not features — assumptions. ("Users want X", "Users will pay for Y", "The problem is Z".)

**Level 2: What would disprove each belief?**  
This is where most PMs stop too early. "Users will pay $20/month for this" is only useful if you ask: *what evidence would tell me they won't?*

**Level 3: What's the cheapest test of that evidence?**  
- Can a survey answer it? (2 days)
- Can 5 user interviews answer it? (1 week)  
- Do you need a prototype? (2 weeks)
- Do you need a live experiment? (1 month)

Start at the cheapest, move up only if the cheaper signal is insufficient.

### Using AI as a validation partner

Prompt patterns that work:
- *"Here is our hypothesis. What evidence would convince you it's true? What evidence would convince you it's false?"*
- *"Here is our roadmap. What are we most likely wrong about?"*
- *"Argue against this feature decision."*
- *"What would a sceptical investor ask about this assumption?"*

The discipline: you're using AI to *challenge* your thinking, not to validate it. The moment you're using AI to confirm a decision you've already made, you're wasting the tool.

### The uncomfortable question protocol

The best validation question is the one you don't want to ask because the answer might change everything.

For every major product decision:
1. State the belief explicitly
2. Ask: "What question would I least want users to answer honestly right now?"
3. Ask *that question*

Examples:
- "Do you actually need this feature, or would you just use it if it existed?"
- "If this product went away tomorrow, what would you do instead?"
- "Would you pay for this if it wasn't free?"
- "Have you ever actually used [the feature we're building around]?"

---

## 5. Anti-patterns: Using AI to Confirm What You Already Believe

### Why this happens

AI is helpful and agreeable by default. If you prompt with your conclusion baked in, you'll get confirmation. This is the most common misuse of AI in product work.

### Anti-pattern: The leading prompt

*"Our users really value speed — can you suggest some ways to highlight our fast performance in the onboarding flow?"*

This assumes users value speed. AI will generate great ideas for a validated assumption that may not be true.

Fix: *"What do our users most likely care about in the first minute of using this product? What evidence would tell us if speed isn't the priority?"*

### Anti-pattern: Survivorship bias in AI-generated insights

AI trained on successful products will pattern-match to what worked elsewhere. That's useful context but not validation for your specific users, market, or moment.

Symptom: AI recommendations feel confident and coherent but are generic.

Fix: Push AI to reason from your specific data, not from general patterns. Feed it your actual user interviews, support tickets, usage logs.

### Anti-pattern: Validating the wrong assumption

You validated that users want a feature. You shipped it. Nobody uses it. What went wrong?

Usually: you validated demand but not behaviour. Users want the *outcome* but won't change their *workflow* to get it.

The validation ladder failure: you stopped at "signal" (users said they want it) without reaching "conviction" (users changed behaviour to get it).

### Anti-pattern: Moving fast past the uncomfortable signal

You ran a test. The results were ambiguous or slightly negative. You shipped anyway.

This is the most dangerous anti-pattern because it *looks* like data-driven decision making. You did the test. You just ignored the answer.

Fix: Define your decision rule *before* running the test. "If conversion is below X%, we don't ship." Write it down. Hold to it.

### Staying calibrated when AI keeps agreeing

If an AI conversation isn't challenging your assumptions, something is wrong.

Techniques:
- Explicitly prompt for disagreement: *"What's the strongest case against this?"*
- Red-team your own proposal: *"You are a sceptical PM who thinks this feature is a mistake. What's your argument?"*
- Ask for failure modes: *"If this ships and fails in 6 months, what's the most likely reason?"*

---

## 6. Good Validation = Uncomfortable Questions

### What makes a question uncomfortable

A question is uncomfortable when:
- The answer might invalidate significant work already done
- It challenges a core belief held by a stakeholder
- The honest answer might mean not shipping something
- It requires admitting you don't know something important

These are exactly the questions worth asking.

### The pre-mortem prompt

Before shipping: *"Imagine it's 6 months from now. This feature/product failed. What happened?"*

Run this prompt with your team. Run it with AI. The answers reveal assumptions you didn't know you were making.

### Red-teaming your product with AI

Prompt: *"You are a user who tried this product and stopped using it after 2 weeks. Walk me through what happened."*

This generates failure narratives that surface friction points, expectation gaps, and competitive alternatives you hadn't considered.

### The contrarian investor test

Prompt: *"You are an investor who passed on funding this company. What was your reasoning?"*

Strong version of this forces you to reckon with the weakest parts of your thesis.

---

## 7. Capstone: Latent Demand & AI Product Design

### The bridge

Session 2 so far is about validating what users *tell* you they want and *do* in your product. But there's a category of demand you can't access this way: demand that exists but hasn't been expressed because the friction was always too high.

*"What if users can't tell you what they want because they've never experienced a world where it was possible?"*

### Latent demand in the agent era

Latent demand = demand suppressed by friction, unfamiliarity, or lack of vocabulary.

When agents drop friction 10x:
- Tasks that were "not worth it" become trivial
- Problems users had learned to live with become solvable
- Use cases that only power users pursued become accessible to everyone

The signal: demand that was latent becomes active, often surprising builders who didn't design for it.

**Key signal types:**
- **Awkward asks** — users ask for something the product wasn't designed to do
- **Edge-case workarounds** — users are achieving something via friction that should be a feature
- **Unexpected usage patterns** — high engagement in a part of the product you depaneled
- **"Can it also...?"** questions — users probing adjacent capabilities

**Design implication:** Deliberately expand your agent's surface area. The question you're not letting users ask is the question that will reveal latent demand.

**Anti-pattern: Building only for expressed demand.**  
If you only validate what users can articulate, you'll miss the adjacent possible. Nobody asked for the iPod. They wanted 1000 songs in their pocket — they just couldn't describe the form factor.

### Behaviour telemetry for AI products

Traditional funnel analytics don't capture what matters when AI is in the loop.

**What to track:**
- Query categories — what are users asking the agent? Cluster these weekly.
- Rephrasing attempts — how often does a user restate the same request? (= friction in the interaction, or failed understanding)
- Fallback-to-manual — when does the user give up on the agent and do it themselves?
- Abandonment after response — did the AI answer land? (User left immediately after = probably not)
- "I didn't know I could ask that" moments — when users discover capability they didn't expect

**The "awkward ask" taxonomy:**  
Every month, review the queries your agent couldn't handle cleanly. Cluster them. These are your latent demand signals. The most common awkward asks become your next features.

**The compounding feedback loop:**  
Better telemetry → better product decisions → better agent → more usage → more signal → better telemetry

This loop compounds fast. Teams who instrument agent interactions from day one have a significant advantage over teams who add tracking later.

### AI-first product design patterns

Most products were designed for human-speed, human-friction interactions. When execution is near-free, the product assumptions change.

**The 10x friction reduction question:**  
*"What would our users do with this if it was 10x faster and 10x cheaper?"*  
This is a better roadmap prompt than any user interview.

**Designing for delegation, not just automation:**  
Automation: AI does a defined task.  
Delegation: user hands off judgment — AI decides how to do something, not just that it gets done.

Delegation is harder to design for but creates much higher value. It also requires different trust patterns (users need to understand when and why the agent made a decision).

**Interface patterns for agentic flows:**
- **Confirmation steps** — show the plan before execution, especially for irreversible actions
- **Interrupt points** — let users course-correct mid-task, not just at the end
- **Trust calibration** — show confidence levels; let users know when the agent is uncertain
- **Explainability on demand** — "why did you do that?" should always have an answer

**Scope creep by capability:**  
Your agent can do X → users now expect X+1. This is a product blessing and a support curse. Design for it by publishing the capability surface clearly and building a feedback path for "I tried to do X and it didn't work."

### The PM superpower: extended

AI handles the how. The question is what to ask it to do.

**The validation loop in the agent era:**
1. What do we believe? (assumptions behind the roadmap)
2. What would disprove it? (the question we don't want to ask)
3. What's the cheapest test? (start at the bottom of the validation ladder)
4. What does the agent data tell us? (awkward asks, fallbacks, rephrasings)
5. What latent demand are we not seeing? (probe the adjacent possible)

**Close: The design prompt**  
*"What would your users do if this was free?"*

Not free in terms of price — free in terms of effort, time, and friction.

That's the product you should be building toward. The gap between what users do now and what they'd do in that world is your roadmap.

---

## Session Format

**Duration:** 90 minutes  
**Structure:**

| Block | Time | Content |
|---|---|---|
| Opening | 10 min | The validation problem in the AI era |
| Sections 1–2 | 25 min | Analytics, tracking, AI validation workflows |
| Section 3 | 10 min | Speed vs. rigor framework |
| Sections 4–5 | 20 min | PM superpower + anti-patterns |
| Section 6 | 10 min | Good validation = uncomfortable questions |
| Capstone | 15 min | Latent demand + AI product design |

**Workshop elements (optional):**
- *The pre-mortem exercise* — teams run a 10-minute pre-mortem on a current project using the AI prompt
- *Awkward ask audit* — review recent user feedback for latent demand signals
- *The uncomfortable question* — each participant writes the question they least want their users to answer

---

## Key Takeaways

1. Analytics tells you what happened. Behaviour tracking tells you why. AI product telemetry tells you what users wanted but couldn't get.
2. Speed vs. rigor isn't a values debate — it's a function of reversibility and stakes.
3. The PM superpower is knowing what to validate, not how to validate it. AI handles the how.
4. The most valuable validation questions are the ones you don't want to ask.
5. Latent demand is invisible to surveys. It shows up in agent interactions as awkward asks and fallbacks.
6. The roadmap question: "What would users do if this was free?" — free of friction, effort, and time.
