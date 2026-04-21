import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/useTheme';
import { ThemeToggle } from './ui/ThemeToggle';
import { ArrowLeft, Download, Bot, FileText, Brain, Wrench, Code, Rocket, CheckCircle } from 'lucide-react';

const STEPS = [
  {
    num: 1,
    title: 'Download Your AI Coding Tools',
    desc: 'Install the apps that will do the heavy lifting for you. No coding experience needed — these tools understand plain English.',
    items: [
      { label: 'OpenAI Codex', detail: 'OpenAI\'s autonomous coding agent — great for generating and running code', url: 'https://openai.com/index/introducing-codex/' },
      { label: 'Anthropic Claude (Code & Cowork)', detail: 'Anthropic\'s AI assistant — excellent for planning, writing, and reviewing code. Cowork is Claude\'s collaborative coding mode.', url: 'https://claude.ai' },
      { label: 'Google Gemini', detail: 'Google\'s AI — strong at research, analysis, and multi-modal tasks', url: 'https://gemini.google.com' },
    ],
    icon: Download,
  },
  {
    num: 2,
    title: 'Get Alignment from TinyToolStack',
    desc: 'Download the Alignment framework — a lightweight structure that keeps your AI agents focused and on track with your vision.',
    items: [
      { label: 'Visit TinyToolStack', detail: 'Browse and download the Alignment template for your project type', url: 'https://tinytoolstack.com' },
      { label: 'What is Alignment?', detail: 'A set of guiding documents (goals, constraints, style) that you feed to AI agents so they understand your intent' },
    ],
    icon: Wrench,
  },
  {
    num: 3,
    title: 'Create Your Custom Agent',
    desc: 'Set up a personalized AI agent using your downloaded tools. Give it a name, a role, and point it at your Alignment docs.',
    items: [
      { label: 'Choose your tool', detail: 'Pick Claude, Codex, or Gemini as your primary agent' },
      { label: 'Load your Alignment', detail: 'Feed your Alignment docs into the agent\'s context so it understands your project' },
      { label: 'Define the role', detail: 'Tell the agent: "You are a senior developer helping me build [project name]"' },
    ],
    icon: Bot,
  },
  {
    num: 4,
    title: 'Write a PRD (Product Requirements Document)',
    desc: 'Describe what you want to build in plain language. The AI will help you structure it into a proper PRD.',
    items: [
      { label: 'Start simple', detail: 'Write 3–5 sentences about what your app/product should do' },
      { label: 'Let AI expand it', detail: 'Ask the agent to turn your description into a detailed PRD with user stories and requirements' },
      { label: 'Review & refine', detail: 'Read through and tell the agent what to add, remove, or change' },
    ],
    icon: FileText,
  },
  {
    num: 5,
    title: 'Brainstorm & Detail the Plan',
    desc: 'Ask your agent to brainstorm features, edge cases, and improvements. Let it challenge your assumptions.',
    items: [
      { label: 'Ask "What am I missing?"', detail: 'The agent will identify gaps in your requirements' },
      { label: 'Explore alternatives', detail: 'Ask for 3 different approaches and trade-offs for key features' },
      { label: 'Prioritize together', detail: 'Rank features as must-have, nice-to-have, and future' },
    ],
    icon: Brain,
  },
  {
    num: 6,
    title: 'Create a Tech Plan',
    desc: 'Ask the agent to propose a technical architecture. You don\'t need to understand every detail — just the big picture.',
    items: [
      { label: 'Stack recommendation', detail: 'The agent picks the right technologies based on your requirements' },
      { label: 'Project structure', detail: 'Get a folder/file layout and understand how pieces connect' },
      { label: 'Milestone breakdown', detail: 'Split the work into phases so you can build incrementally' },
    ],
    icon: Code,
  },
  {
    num: 7,
    title: 'Generate the Implementation',
    desc: 'Start building! Ask the agent to generate code milestone by milestone. Review, test, and iterate.',
    items: [
      { label: 'Build phase by phase', detail: 'Don\'t ask for everything at once — go milestone by milestone' },
      { label: 'Test as you go', detail: 'Ask the agent to also write tests and explain what each part does' },
      { label: 'Iterate & ship', detail: 'Refine, fix issues with the agent\'s help, and deploy your project' },
    ],
    icon: Rocket,
  },
];

export function InitialStepsPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        overflow: 'auto',
        position: 'relative',
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: theme.heroGrad,
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          backgroundColor: `${theme.bg}ee`,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <button
          className="ib"
          onClick={() => navigate('/')}
          style={{ color: theme.textMuted, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <ArrowLeft size={17} />
          <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Back to Slides</span>
        </button>
        <ThemeToggle />
      </header>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* Hero */}
        <div className="s1" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 20,
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: theme.accent,
              background: theme.accentSoft,
              border: `1px solid ${theme.accentBorder}`,
              marginBottom: 16,
            }}
          >
            From Idea to App — A Guide for Non-Techies
          </div>
          <h1
            style={{
              fontSize: '2.6rem',
              fontWeight: 900,
              lineHeight: 1.1,
              color: theme.text,
              marginBottom: 12,
            }}
          >
            Initial Steps
          </h1>
          <p style={{ fontSize: '1.1rem', color: theme.textMuted, lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
            A step-by-step guide to creating your first project with AI — from downloading tools to shipping code. No programming experience required.
          </p>
        </div>

        {/* Steps */}
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={`s${Math.min(i + 2, 10)}`}
              style={{
                marginBottom: 32,
                padding: 24,
                borderRadius: 16,
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme.accentBorder)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.border)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                {/* Step number */}
                <div
                  style={{
                    flexShrink: 0,
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: theme.accentSoft,
                    border: `1px solid ${theme.accentBorder}`,
                  }}
                >
                  <Icon size={20} style={{ color: theme.accent }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: theme.accent,
                        letterSpacing: '0.04em',
                      }}
                    >
                      STEP {step.num}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: theme.text, margin: '0 0 6px' }}>
                    {step.title}
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: theme.textMuted, lineHeight: 1.6, margin: '0 0 16px' }}>
                    {step.desc}
                  </p>

                  {/* Items */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {step.items.map((item) => (
                      <div
                        key={item.label}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                          padding: '10px 14px',
                          borderRadius: 10,
                          backgroundColor: theme.bg,
                          border: `1px solid ${theme.border}`,
                        }}
                      >
                        <CheckCircle size={16} style={{ color: theme.accent, marginTop: 2, flexShrink: 0 }} />
                        <div>
                          {'url' in item && item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                color: theme.accent,
                                textDecoration: 'none',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                            >
                              {item.label}
                            </a>
                          ) : (
                            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: theme.text }}>
                              {item.label}
                            </span>
                          )}
                          <p style={{ fontSize: '0.82rem', color: theme.textMuted, margin: '2px 0 0', lineHeight: 1.5 }}>
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom CTA */}
        <div
          className="s10"
          style={{
            textAlign: 'center',
            padding: '32px 24px',
            borderRadius: 16,
            background: theme.accentSoft,
            border: `1px solid ${theme.accentBorder}`,
          }}
        >
          <p style={{ fontSize: '1.05rem', fontWeight: 600, color: theme.text, margin: '0 0 8px' }}>
            Ready to build?
          </p>
          <p style={{ fontSize: '0.9rem', color: theme.textMuted, margin: '0 0 20px' }}>
            Start with Step 1 and work your way through. Your AI agent will guide you the rest of the way.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 28px',
              borderRadius: 12,
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: `0 4px 20px ${theme.accentGlow}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 8px 28px ${theme.accentGlow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 20px ${theme.accentGlow}`;
            }}
          >
            Back to Presentation
          </button>
        </div>
      </div>
    </div>
  );
}
