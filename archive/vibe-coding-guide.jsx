import { useState, useEffect, useCallback } from "react";
import { Sun, Moon, Share2, ChevronLeft, ChevronRight, Check, X } from "lucide-react";

/* ================================================================
 *  CREATOR & PROMO CONFIGURATION
 *
 *  Update these variables with your actual URLs.
 * ================================================================ */

const CREATOR_LINKEDIN_URL = "https://linkedin.com/in/YOUR_LINKEDIN_HANDLE";
const CREATOR_X_URL = "https://x.com/YOUR_X_HANDLE";
const SURVEY_URL = "https://YOUR_SURVEY_URL.com";
const CREATOR_NAME = "Vlad Daskalov";

/* ================================================================
 *  SLIDE CONTENT CONFIGURATION
 *
 *  Edit this array to customize your presentation.
 *  Supported layouts: "cover", "intro", "rule", "summary", "closing", "promo"
 *  The navigation adapts automatically to any number of slides.
 * ================================================================ */

const SLIDES = [
  {
    layout: "promo",
    title: `Created by ${CREATOR_NAME}`,
    subtitle: "Connect with me & grab an exclusive offer",
    linkedinUrl: CREATOR_LINKEDIN_URL,
    xUrl: CREATOR_X_URL,
    surveyUrl: SURVEY_URL,
    surveyLabel: "Take a Quick Survey — Get 50% Off",
    surveyDetail: "Share your feedback and unlock an exclusive 50% discount on our service",
    position: "opening",
  },
  {
    layout: "cover",
    title: "The Practical Guide\nto Vibe Coding",
    subtitle: "A non-technical person's playbook for building software with AI",
    badge: "2025 Edition",
  },
  {
    layout: "intro",
    title: "What is Vibe Coding?",
    description:
      "Vibe coding is the practice of building software by describing what you want in plain language and letting AI write the code. You set the direction \u2014 the AI handles the implementation.",
    steps: [
      { emoji: "\ud83d\udcac", label: "Describe", detail: "Tell the AI what you want to build" },
      { emoji: "\u26a1", label: "Generate", detail: "The AI writes the code for you" },
      { emoji: "\ud83d\udd04", label: "Iterate", detail: "Review, refine, and repeat" },
    ],
  },
  {
    layout: "rule",
    number: "01",
    title: "Use the Command Line",
    subtitle: "Your direct line to AI power",
    description:
      "Chat interfaces are great for asking questions, but command-line tools give you superpowers. They read and write files directly in your project, maintain context across your entire codebase, and execute code in real-time.",
    points: [
      "Direct access to read and write your project files",
      "Persistent memory of your entire codebase",
      "Run, test, and deploy \u2014 all from one place",
      "Longer conversations with much more context",
    ],
    tip: "Look for CLI tools like Claude Code, Codex CLI, Aider, or Cursor\u2019s agent mode",
  },
  {
    layout: "rule",
    number: "02",
    title: "Set Up Your AI\u2019s Context",
    subtitle: "Onboard the AI like a new team member",
    description:
      "Before writing any code, give your AI the big picture. Create a configuration file that describes your project\u2019s vision, coding standards, and technical decisions \u2014 just like onboarding a new developer.",
    points: [
      "Product Vision \u2014 What you\u2019re building and why",
      "Conventions \u2014 Naming rules, file structure, style",
      "Tech Stack \u2014 Which frameworks and tools to use",
      "Guardrails \u2014 What the AI should and shouldn\u2019t do",
    ],
    tip: "Create a project rules file (like CLAUDE.md or .cursorrules) in your project\u2019s root folder",
  },
  {
    layout: "rule",
    number: "03",
    title: "Create Specialist Agents",
    subtitle: "Focused experts outperform generalists",
    description:
      "Instead of using one generic AI for everything, define task-specific personas. Give each agent a clear role and expertise area \u2014 just like assembling a real development team.",
    points: [
      '"Senior Frontend Developer" for user interfaces',
      '"Database Architect" for data structure and storage',
      '"QA Engineer" for testing and finding edge cases',
      '"DevOps Specialist" for deployment and infrastructure',
    ],
    tip: "Use system prompts or agent config files to define each specialist\u2019s role and constraints",
  },
  {
    layout: "rule",
    number: "04",
    title: "Choose AI-Friendly Technologies",
    subtitle: "Not all tech stacks are created equal",
    description:
      "AI coding tools work best with popular, well-documented technologies. The more the AI has learned about a framework during training, the better code it produces.",
    points: [
      "Pick widely adopted frameworks with large communities",
      "Prefer typed languages (e.g. TypeScript over JavaScript)",
      "Use convention-based frameworks with clear patterns",
      "Stick to well-documented, stable libraries",
    ],
    tip: "Popular stacks like React + TypeScript, Next.js, or Python + FastAPI produce the best results",
  },
  {
    layout: "rule",
    number: "05",
    title: "Plan Before You Build",
    subtitle: "Measure twice, cut once",
    description:
      "Never jump straight into code generation. Ask the AI to create an implementation plan first. Review it, refine it, and only then start building \u2014 one step at a time.",
    points: [
      "Break big features into small, manageable tasks",
      "Have the AI propose an architecture before coding",
      "Review the plan to catch issues before they\u2019re built",
      "Execute tasks one at a time, in sequence",
    ],
    tip: 'Most AI coding tools have a built-in "plan" or "architect" mode \u2014 always use it',
  },
  {
    layout: "rule",
    number: "06",
    title: "Give Your AI Eyes",
    subtitle: "Visual feedback changes everything",
    description:
      "Connect browser automation tools so your AI can see what it\u2019s building. It can take screenshots, interact with your app, and verify things look right \u2014 like having a QA tester built in.",
    points: [
      "Connect browser automation via MCP servers",
      "Let the AI take screenshots to verify UI changes",
      "Automate user flow testing and form validation",
      "Catch visual bugs the AI would otherwise miss",
    ],
    tip: "Tools like Puppeteer or Playwright MCP give your AI the ability to see and interact with your app",
  },
  {
    layout: "rule",
    number: "07",
    title: "Save Your Progress Often",
    subtitle: "Your undo button for everything",
    description:
      "Every time something works, save a checkpoint. Version control is like a save-game system \u2014 if something breaks, you can always roll back to the last working state.",
    points: [
      "Commit after every successful change",
      "Use separate branches for experiments",
      "Write clear descriptions of what each save contains",
      "Tag stable versions you might want to return to",
    ],
    tip: "Set up your AI to auto-commit after tests pass \u2014 it\u2019s a game changer",
  },
  {
    layout: "rule",
    number: "08",
    title: "Keep Instructions Small",
    subtitle: "One task, one outcome",
    description:
      "Large, vague requests produce large, vague results. Break everything into specific, focused instructions that can be completed and checked one at a time.",
    points: [
      '"Add a login form" \u2014 not "Build the auth system"',
      "One feature per conversation keeps focus sharp",
      "Verify each task before starting the next",
      "Smaller context = better AI performance",
    ],
    tip: "If your instruction is longer than a short paragraph, it\u2019s probably too big \u2014 split it up",
  },
  {
    layout: "rule",
    number: "09",
    title: "Always Verify the Output",
    subtitle: "Trust, but check",
    description:
      "AI-generated code can look correct but hide subtle bugs, security gaps, or poor patterns. Make verification a non-negotiable step in every cycle.",
    points: [
      "Run the code and test it yourself every time",
      "Ask the AI to write tests for its own code",
      "Use linting and type checking as automated guardrails",
      "Review what changed before committing \u2014 understand the diff",
    ],
    tip: 'A quick "does this actually work?" check takes seconds and saves hours of debugging',
  },
  {
    layout: "summary",
    title: "The Golden Rules",
    subtitle: "Your quick-reference cheat sheet",
    rules: [
      { num: "01", title: "Use the CLI", desc: "Direct file access & control" },
      { num: "02", title: "Set Context", desc: "Vision, conventions, stack" },
      { num: "03", title: "Specialists", desc: "Focused agents, better results" },
      { num: "04", title: "Right Stack", desc: "Popular & well-documented" },
      { num: "05", title: "Plan First", desc: "Think, then build" },
      { num: "06", title: "Add Eyes", desc: "Visual feedback & testing" },
      { num: "07", title: "Save Often", desc: "Checkpoint your progress" },
      { num: "08", title: "Small Tasks", desc: "One task, one outcome" },
      { num: "09", title: "Verify", desc: "Trust but always check" },
    ],
  },
  {
    layout: "closing",
    title: "Start Building Today",
    subtitle:
      "Pick a small project. Set up your tools. Start prompting.\nThe best way to learn vibe coding is to do it.",
    cta: "Happy Vibe Coding!",
  },
  {
    layout: "promo",
    title: `Follow ${CREATOR_NAME}`,
    subtitle: "Enjoyed this guide? Let's stay connected",
    linkedinUrl: CREATOR_LINKEDIN_URL,
    xUrl: CREATOR_X_URL,
    surveyUrl: SURVEY_URL,
    surveyLabel: "Claim Your 50% Discount",
    surveyDetail: "Take a 2-minute survey and get 50% off our service — thank you for your time!",
    position: "closing",
  },
];

/* ================================================================
 *  THEME
 * ================================================================ */

const getTheme = (dark) =>
  dark
    ? {
        bg: "#09090F",
        surface: "#13131F",
        surfaceHover: "#1C1C2E",
        text: "#EDEDF5",
        textMuted: "#7E7E9A",
        border: "#2A2A40",
        accent: "#8B5CF6",
        accentSoft: "rgba(139,92,246,0.12)",
        accentBorder: "rgba(139,92,246,0.25)",
        accentGlow: "rgba(139,92,246,0.3)",
        watermark: "rgba(139,92,246,0.06)",
        heroGrad:
          "radial-gradient(ellipse at 55% 40%, rgba(139,92,246,0.18) 0%, transparent 60%)",
        subtleGrad:
          "radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%)",
        overlayBg: "rgba(0,0,0,0.85)",
      }
    : {
        bg: "#FAFAFF",
        surface: "#FFFFFF",
        surfaceHover: "#F3F0FF",
        text: "#141425",
        textMuted: "#6B6B88",
        border: "#E2E0EE",
        accent: "#7C3AED",
        accentSoft: "rgba(124,58,237,0.07)",
        accentBorder: "rgba(124,58,237,0.18)",
        accentGlow: "rgba(124,58,237,0.2)",
        watermark: "rgba(124,58,237,0.04)",
        heroGrad:
          "radial-gradient(ellipse at 55% 40%, rgba(124,58,237,0.1) 0%, transparent 60%)",
        subtleGrad:
          "radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.04) 0%, transparent 50%)",
        overlayBg: "rgba(255,255,255,0.92)",
      };

/* ================================================================
 *  CSS
 * ================================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.93)}to{opacity:1;transform:scale(1)}}
@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}

.s1{animation:slideUp .4s ease .05s both}
.s2{animation:slideUp .4s ease .12s both}
.s3{animation:slideUp .4s ease .19s both}
.s4{animation:slideUp .4s ease .26s both}
.s5{animation:slideUp .4s ease .33s both}
.s6{animation:slideUp .4s ease .40s both}
.s7{animation:slideUp .4s ease .47s both}
.s8{animation:slideUp .4s ease .54s both}
.s9{animation:slideUp .4s ease .61s both}
.s10{animation:slideUp .4s ease .68s both}
.sc{animation:scaleIn .4s ease .1s both}
.fi{animation:fadeIn .35s ease-out}

.ib{background:none;border:1px solid transparent;padding:8px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.ib:hover{border-color:rgba(139,92,246,.3);background:rgba(139,92,246,.08)}

.nb{background:none;border:none;padding:10px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s,opacity .2s}
.nb:hover{background:rgba(139,92,246,.1)}
.nb:disabled{opacity:.2;cursor:default}
.nb:disabled:hover{background:none}

.toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:10px 20px;border-radius:8px;font-size:.85rem;font-weight:500;animation:slideUp .25s ease-out;z-index:100;pointer-events:none}

.tip{border-radius:10px;padding:14px 18px;font-size:.9rem;line-height:1.5;display:flex;align-items:flex-start;gap:10px}

.pt{display:flex;align-items:flex-start;gap:12px;font-size:1.02rem;line-height:1.6}

.sc-card{border-radius:12px;padding:16px;cursor:pointer;transition:all .2s;text-align:left}
.sc-card:hover{transform:translateY(-2px)}

.ov-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:50;animation:fadeIn .2s ease-out}

.ov-card{padding:12px 16px;border-radius:10px;cursor:pointer;transition:all .15s;text-align:left;border:1px solid transparent;font-family:inherit;width:100%}
.ov-card:hover{transform:scale(1.02)}

@media(max-width:768px){
  .r-pad{padding:24px 20px!important}
  .t-lg{font-size:2.2rem!important}
  .t-md{font-size:1.6rem!important}
  .steps-row{flex-direction:column!important}
  .sum-grid{grid-template-columns:1fr 1fr!important}
  .wm{font-size:8rem!important}
}
@media(max-width:480px){
  .t-lg{font-size:1.7rem!important}
  .t-md{font-size:1.3rem!important}
  .sum-grid{grid-template-columns:1fr!important}
}
`;

const CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='5' fill='%238B5CF6' opacity='.85'/%3E%3Ccircle cx='12' cy='12' r='9' fill='none' stroke='%238B5CF6' stroke-width='1.5' opacity='.35'/%3E%3C/svg%3E") 12 12, default`;

/* ================================================================
 *  SLIDE LAYOUTS
 * ================================================================ */

function CoverSlide({ data, t }) {
  return (
    <div
      className="r-pad"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100%",
        width: "100%",
        position: "relative",
        padding: "40px 32px",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: t.heroGrad, pointerEvents: "none" }} />
      <div
        style={{
          position: "absolute",
          top: "12%",
          right: "12%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          border: `1px solid ${t.accentBorder}`,
          opacity: 0.3,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "10%",
          width: 110,
          height: 110,
          borderRadius: "50%",
          border: `1px solid ${t.accentBorder}`,
          opacity: 0.2,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {data.badge && (
          <div
            className="s1"
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: ".8rem",
              fontWeight: 600,
              letterSpacing: ".05em",
              color: t.accent,
              background: t.accentSoft,
              border: `1px solid ${t.accentBorder}`,
              marginBottom: 28,
            }}
          >
            {data.badge}
          </div>
        )}
        <h1
          className="t-lg s2"
          style={{
            fontSize: "3.5rem",
            fontWeight: 900,
            lineHeight: 1.08,
            color: t.text,
            whiteSpace: "pre-line",
          }}
        >
          {data.title}
        </h1>
        <p className="s3" style={{ fontSize: "1.2rem", color: t.textMuted, marginTop: 20, maxWidth: 520, lineHeight: 1.6 }}>
          {data.subtitle}
        </p>
        <div
          className="s4"
          style={{
            marginTop: 48,
            fontSize: ".85rem",
            color: t.textMuted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <span style={{ animation: "pulse 2s ease-in-out infinite", display: "inline-flex", alignItems: "center" }}><ChevronRight size={16} /></span>
          <span>Press arrow keys to navigate</span>
        </div>
      </div>
    </div>
  );
}

function IntroSlide({ data, t }) {
  return (
    <div
      className="r-pad"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        maxWidth: 820,
        margin: "0 auto",
        padding: "40px 32px",
      }}
    >
      <h2 className="t-md s1" style={{ fontSize: "2.4rem", fontWeight: 800, color: t.text }}>
        {data.title}
      </h2>
      <p className="s2" style={{ fontSize: "1.08rem", lineHeight: 1.7, color: t.textMuted, marginTop: 16, maxWidth: 600 }}>
        {data.description}
      </p>
      {data.steps && (
        <div className="steps-row s3" style={{ display: "flex", gap: 20, marginTop: 40 }}>
          {data.steps.map((step, i) => (
            <div
              key={i}
              className={`s${i + 4}`}
              style={{
                flex: 1,
                padding: "24px 20px",
                borderRadius: 14,
                background: t.surface,
                border: `1px solid ${t.border}`,
                textAlign: "center",
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.accentBorder)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.border)}
            >
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>{step.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: t.text, marginBottom: 6 }}>{step.label}</div>
              <div style={{ fontSize: ".88rem", color: t.textMuted, lineHeight: 1.5 }}>{step.detail}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RuleSlide({ data, t }) {
  return (
    <div
      className="r-pad"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        maxWidth: 820,
        margin: "0 auto",
        padding: "40px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: t.subtleGrad, pointerEvents: "none" }} />
      <div
        className="wm sc"
        style={{
          position: "absolute",
          top: -20,
          right: -10,
          fontSize: "12rem",
          fontWeight: 900,
          color: t.watermark,
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {data.number}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          className="s1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 10,
            background: t.accentSoft,
            border: `1px solid ${t.accentBorder}`,
            color: t.accent,
            fontWeight: 700,
            fontSize: ".85rem",
            marginBottom: 16,
          }}
        >
          {data.number}
        </div>
        <h2 className="t-md s2" style={{ fontSize: "2.2rem", fontWeight: 800, color: t.text, lineHeight: 1.15 }}>
          {data.title}
        </h2>
        <p className="s3" style={{ fontSize: "1rem", color: t.accent, fontWeight: 500, marginTop: 6 }}>
          {data.subtitle}
        </p>
        <p className="s4" style={{ fontSize: "1.02rem", lineHeight: 1.7, color: t.textMuted, marginTop: 18, maxWidth: 600 }}>
          {data.description}
        </p>
        {data.points && (
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            {data.points.map((point, i) => (
              <div key={i} className={`pt s${i + 5}`}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: t.accent,
                    marginTop: 9,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: t.text }}>{point}</span>
              </div>
            ))}
          </div>
        )}
        {data.tip && (
          <div
            className={`tip s${(data.points?.length || 0) + 5}`}
            style={{
              marginTop: 28,
              background: t.accentSoft,
              border: `1px solid ${t.accentBorder}`,
              color: t.text,
            }}
          >
            <span style={{ fontSize: "1rem", flexShrink: 0 }}>{"\ud83d\udca1"}</span>
            <span>{data.tip}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SummarySlide({ data, t, onGoTo }) {
  return (
    <div
      className="r-pad"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        maxWidth: 820,
        margin: "0 auto",
        padding: "40px 32px",
      }}
    >
      <h2
        className="t-md s1"
        style={{ fontSize: "2.2rem", fontWeight: 800, color: t.text, textAlign: "center" }}
      >
        {data.title}
      </h2>
      {data.subtitle && (
        <p className="s2" style={{ fontSize: "1rem", color: t.textMuted, textAlign: "center", marginTop: 8 }}>
          {data.subtitle}
        </p>
      )}
      <div
        className="sum-grid s3"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 36 }}
      >
        {data.rules.map((rule, i) => (
          <div
            key={i}
            className={`sc-card s${i + 3}`}
            onClick={() => onGoTo(i + 2)}
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = t.accentBorder;
              e.currentTarget.style.background = t.surfaceHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = t.border;
              e.currentTarget.style.background = t.surface;
            }}
          >
            <div style={{ fontWeight: 800, fontSize: "1.5rem", color: t.accent, marginBottom: 6 }}>{rule.num}</div>
            <div style={{ fontWeight: 700, fontSize: ".92rem", color: t.text, marginBottom: 4 }}>{rule.title}</div>
            <div style={{ fontSize: ".8rem", color: t.textMuted, lineHeight: 1.4 }}>{rule.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClosingSlide({ data, t }) {
  return (
    <div
      className="r-pad"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100%",
        width: "100%",
        position: "relative",
        padding: "40px 32px",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: t.heroGrad, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 className="t-lg s1" style={{ fontSize: "3rem", fontWeight: 900, color: t.text }}>
          {data.title}
        </h2>
        <p
          className="s2"
          style={{
            fontSize: "1.1rem",
            color: t.textMuted,
            marginTop: 20,
            maxWidth: 480,
            lineHeight: 1.7,
            whiteSpace: "pre-line",
          }}
        >
          {data.subtitle}
        </p>
        {data.cta && (
          <div className="s3" style={{ marginTop: 40, fontSize: "1.3rem", fontWeight: 700, color: t.accent }}>
            {data.cta} {"\ud83d\ude80"}
          </div>
        )}
      </div>
    </div>
  );
}

function PromoSlide({ data, t }) {
  const isClosing = data.position === "closing";
  return (
    <div
      className="r-pad"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "100%",
        width: "100%",
        position: "relative",
        padding: "40px 32px",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: t.heroGrad, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
        <h2
          className="t-md s1"
          style={{ fontSize: "2.4rem", fontWeight: 900, color: t.text, lineHeight: 1.15 }}
        >
          {data.title}
        </h2>
        <p className="s2" style={{ fontSize: "1.08rem", color: t.textMuted, marginTop: 12, lineHeight: 1.6 }}>
          {data.subtitle}
        </p>

        {/* Social Links */}
        <div className="s3" style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 36 }}>
          <a
            href={data.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 12,
              background: t.surface,
              border: `1px solid ${t.border}`,
              color: t.text,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "all .2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0A66C2";
              e.currentTarget.style.background = t.surfaceHover;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = t.border;
              e.currentTarget.style.background = t.surface;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={data.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 12,
              background: t.surface,
              border: `1px solid ${t.border}`,
              color: t.text,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "all .2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = t.textMuted;
              e.currentTarget.style.background = t.surfaceHover;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = t.border;
              e.currentTarget.style.background = t.surface;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={t.text}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X (Twitter)
          </a>
        </div>

        {/* Survey / Discount CTA */}
        <div className="s4" style={{ marginTop: 32 }}>
          <a
            href={data.surveyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: "20px 40px",
              borderRadius: 14,
              background: `linear-gradient(135deg, ${t.accent}, ${t.accent}dd)`,
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "1.1rem",
              transition: "all .2s",
              cursor: "pointer",
              boxShadow: `0 4px 24px ${t.accentGlow}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = `0 8px 32px ${t.accentGlow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = `0 4px 24px ${t.accentGlow}`;
            }}
          >
            <span>{data.surveyLabel}</span>
            <span style={{ fontSize: ".82rem", fontWeight: 400, opacity: 0.85 }}>
              {data.surveyDetail}
            </span>
          </a>
        </div>

        {isClosing && (
          <p className="s5" style={{ marginTop: 32, fontSize: ".9rem", color: t.textMuted }}>
            Thank you for reading!
          </p>
        )}
      </div>
    </div>
  );
}

/* ================================================================
 *  MAIN COMPONENT
 * ================================================================ */

export default function VibeCodingGuide() {
  const [current, setCurrent] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [touchX, setTouchX] = useState(null);

  const t = getTheme(isDark);
  const total = SLIDES.length;

  const goTo = useCallback(
    (i) => {
      setCurrent(Math.max(0, Math.min(total - 1, i)));
      setShowOverview(false);
    },
    [total]
  );

  const go = useCallback(
    (dir) => setCurrent((c) => Math.max(0, Math.min(total - 1, c + dir))),
    [total]
  );

  /* keyboard */
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") {
        setShowOverview(false);
        return;
      }
      if (showOverview) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go, showOverview]);

  /* URL hash (works when hosted, silent no-op in iframe) */
  useEffect(() => {
    try {
      const n = parseInt(window.location.hash.replace("#", ""));
      if (!isNaN(n) && n >= 0 && n < total) setCurrent(n);
    } catch {}
  }, [total]);

  useEffect(() => {
    try {
      window.location.hash = String(current);
    } catch {}
  }, [current]);

  /* share */
  const share = async () => {
    const title = SLIDES[current].title?.replace("\n", " ");
    const text = `${title} \u2014 The Practical Guide to Vibe Coding (Slide ${current + 1}/${total})`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Vibe Coding Guide", text });
      } else {
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  /* touch / swipe */
  const onTS = (e) => setTouchX(e.touches[0].clientX);
  const onTE = (e) => {
    if (touchX === null) return;
    const d = touchX - e.changedTouches[0].clientX;
    if (Math.abs(d) > 60) go(d > 0 ? 1 : -1);
    setTouchX(null);
  };

  /* render slide */
  const data = SLIDES[current];
  const renderSlide = () => {
    const p = { data, t };
    switch (data.layout) {
      case "cover":
        return <CoverSlide {...p} />;
      case "intro":
        return <IntroSlide {...p} />;
      case "rule":
        return <RuleSlide {...p} />;
      case "summary":
        return <SummarySlide {...p} onGoTo={goTo} />;
      case "closing":
        return <ClosingSlide {...p} />;
      case "promo":
        return <PromoSlide {...p} />;
      default:
        return null;
    }
  };

  return (
    <div
      onTouchStart={onTS}
      onTouchEnd={onTE}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: t.bg,
        color: t.text,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        cursor: CURSOR,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "background-color .3s, color .3s",
        position: "relative",
        userSelect: "none",
      }}
    >
      <style>{CSS}</style>

      {/* progress bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: t.border, zIndex: 20 }}>
        <div
          style={{
            height: "100%",
            width: `${((current + 1) / total) * 100}%`,
            backgroundColor: t.accent,
            transition: "width .35s ease",
            borderRadius: "0 2px 2px 0",
          }}
        />
      </div>

      {/* top controls */}
      <div style={{ position: "absolute", top: 14, right: 16, display: "flex", gap: 6, zIndex: 20 }}>
        <button
          className="ib"
          onClick={() => setIsDark(!isDark)}
          style={{ color: t.textMuted }}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button
          className="ib"
          onClick={share}
          style={{ color: copied ? t.accent : t.textMuted }}
          title="Share this slide"
        >
          {copied ? <Check size={17} /> : <Share2 size={17} />}
        </button>
      </div>

      {/* slide */}
      <main key={current} className="fi" style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {renderSlide()}
      </main>

      {/* bottom nav */}
      <nav
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          padding: "16px 0",
          zIndex: 20,
        }}
      >
        <button className="nb" onClick={() => go(-1)} disabled={current === 0} style={{ color: t.text }}>
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => setShowOverview(true)}
          style={{
            background: "none",
            border: `1px solid ${t.border}`,
            borderRadius: 8,
            padding: "5px 14px",
            color: t.textMuted,
            fontSize: ".82rem",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = t.accentBorder;
            e.currentTarget.style.color = t.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = t.border;
            e.currentTarget.style.color = t.textMuted;
          }}
          title="Open slide overview"
        >
          {current + 1} / {total}
        </button>
        <button className="nb" onClick={() => go(1)} disabled={current === total - 1} style={{ color: t.text }}>
          <ChevronRight size={22} />
        </button>
      </nav>

      {/* copied toast */}
      {copied && (
        <div
          className="toast"
          style={{
            backgroundColor: t.surface,
            color: t.text,
            border: `1px solid ${t.accentBorder}`,
            boxShadow: `0 4px 20px ${t.accentGlow}`,
          }}
        >
          Copied to clipboard
        </div>
      )}

      {/* slide overview */}
      {showOverview && (
        <div
          className="ov-overlay"
          onClick={() => setShowOverview(false)}
          style={{ backgroundColor: t.overlayBg, backdropFilter: "blur(8px)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "90%", maxWidth: 640, maxHeight: "80vh", overflow: "auto", padding: 24 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: t.text }}>All Slides</h3>
              <button className="ib" onClick={() => setShowOverview(false)} style={{ color: t.textMuted }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  className="ov-card"
                  onClick={() => goTo(i)}
                  style={{
                    background: i === current ? t.accentSoft : t.surface,
                    borderColor: i === current ? t.accentBorder : t.border,
                  }}
                  onMouseEnter={(e) => {
                    if (i !== current) e.currentTarget.style.background = t.surfaceHover;
                  }}
                  onMouseLeave={(e) => {
                    if (i !== current) e.currentTarget.style.background = t.surface;
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontWeight: 800, fontSize: ".8rem", color: t.accent, minWidth: 24 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: ".88rem", color: t.text }}>
                      {s.title?.replace("\n", " ")}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
