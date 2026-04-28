import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  GitBranch,
  Layers3,
  LineChart,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { CREATOR_CONFIG } from '../config/creator';
import { useTheme } from '../theme/useTheme';

const offerPillars = [
  {
    title: 'Agentic strategy',
    text: 'Identify where AI agents create leverage now, where they add risk, and which adoption path fits the current engineering org.',
    icon: Target,
  },
  {
    title: 'Team workflows',
    text: 'Translate ad hoc prompting into repeatable team rituals: specs, review gates, vertical slices, and clear human ownership.',
    icon: Users,
  },
  {
    title: 'Alignment system',
    text: 'Create the shared rules, context files, examples, and guardrails that keep agent output consistent across teams.',
    icon: ShieldCheck,
  },
  {
    title: 'Architecture readiness',
    text: 'Assess whether the codebase is agent-navigable: clean boundaries, deep modules, simple interfaces, and testable boundaries.',
    icon: Layers3,
  },
  {
    title: 'Agent guardrails',
    text: 'Define practical controls for permissions, tool access, security-sensitive changes, and escalation to human review.',
    icon: LockKeyhole,
  },
  {
    title: 'Adoption roadmap',
    text: 'Leave with a focused sequence of pilots, metrics, and operating changes that leadership can actually drive.',
    icon: GitBranch,
  },
];

const outcomes = [
  'Faster validated delivery without review chaos',
  'Smaller high-output builder teams of 3-5',
  'Better traceability from prompt to commit',
  'Less agent drift through alignment and steering',
  'Clearer ROI story for engineering leadership',
];

const formatSteps = [
  {
    title: 'Executive and technical session',
    text: 'An in-person working format for CTOs, technical founders, and senior engineering leaders.',
  },
  {
    title: 'Workflow design',
    text: 'Map the current delivery process and redesign the highest-leverage agent workflows around real team constraints.',
  },
  {
    title: 'Scale-up fit',
    text: 'Tailor recommendations to the company stage, product risk, codebase maturity, and security posture.',
  },
  {
    title: 'Follow-up roadmap',
    text: 'Convert the session into a practical adoption plan with pilots, guardrails, owners, and measurable outcomes.',
  },
];

const credibilityPoints = [
  'Agentic Coding Journey as the underlying playbook',
  'Spec-driven development and structured agents for team delivery',
  'Clean architecture, orchestration, Dev/Sec/Ops, monitoring, traceability, and ROI for production scale',
];

export function ScaleupAiPage() {
  const { theme } = useTheme();

  const ctaStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minHeight: 46,
    padding: '12px 20px',
    borderRadius: 10,
    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
    color: '#fff',
    border: 'none',
    fontWeight: 800,
    fontSize: '0.92rem',
    textDecoration: 'none',
    boxShadow: `0 10px 30px ${theme.accentGlow}`,
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: theme.heroGrad,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: theme.subtleGrad,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1120,
          margin: '0 auto',
          padding: '44px 24px 72px',
        }}
      >
        <section
          className="scaleup-hero"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 28,
            alignItems: 'stretch',
          }}
        >
          <div className="s1" style={{ padding: '22px 0 10px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 12px',
                borderRadius: 8,
                color: theme.accent,
                background: theme.accentSoft,
                border: `1px solid ${theme.accentBorder}`,
                fontSize: '0.78rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              <Sparkles size={15} />
              Start2 Group x Vlad Daskalov
            </div>
            <h1
              className="scaleup-title"
              style={{
                marginTop: 22,
                maxWidth: 760,
                fontSize: '4rem',
                lineHeight: 1.02,
                fontWeight: 900,
                letterSpacing: 0,
                color: theme.text,
              }}
            >
              Agentic Engineering for Scale-Up CTOs
            </h1>
            <p
              style={{
                marginTop: 20,
                maxWidth: 680,
                color: theme.textMuted,
                fontSize: '1.08rem',
                lineHeight: 1.65,
              }}
            >
              A practical joint venture helping technical founders and CTOs turn AI coding from
              scattered individual experimentation into a governed engineering capability.
            </p>
            <div
              className="scaleup-cta-row"
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: 28,
              }}
            >
              <a href={CREATOR_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" style={ctaStyle}>
                Let's discuss this in person
                <ArrowRight size={18} />
              </a>
              <span style={{ color: theme.textMuted, fontSize: '0.9rem', lineHeight: 1.5 }}>
                Built for scale-ups where engineering speed, architecture, and risk now move together.
              </span>
            </div>
          </div>

          <aside
            className="s2"
            style={{
              alignSelf: 'end',
              borderRadius: 8,
              border: `1px solid ${theme.border}`,
              background: theme.surface,
              padding: 22,
              boxShadow: '0 24px 70px rgba(0,0,0,0.18)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 8,
                  display: 'grid',
                  placeItems: 'center',
                  color: theme.accent,
                  background: theme.accentSoft,
                  border: `1px solid ${theme.accentBorder}`,
                }}
              >
                <Bot size={21} />
              </div>
              <div>
                <p style={{ color: theme.text, fontSize: '0.98rem', fontWeight: 800 }}>
                  The leadership question
                </p>
                <p style={{ color: theme.textMuted, fontSize: '0.82rem', marginTop: 2 }}>
                  Not "can we use AI?" but "can we scale it safely?"
                </p>
              </div>
            </div>
            <p style={{ color: theme.textMuted, fontSize: '0.94rem', lineHeight: 1.65 }}>
              AI coding is already entering engineering teams. Without a system, it creates uneven
              quality, security exposure, review bottlenecks, and knowledge erosion.
            </p>
          </aside>
        </section>

        <section className="scaleup-section s3" style={{ marginTop: 34 }}>
          <div
            className="scaleup-split"
            style={{
              display: 'grid',
              gridTemplateColumns: '0.78fr 1.22fr',
              gap: 22,
              alignItems: 'start',
            }}
          >
            <div>
              <p
                style={{
                  color: theme.accent,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                The offer
              </p>
              <h2 style={{ color: theme.text, fontSize: '1.75rem', lineHeight: 1.18, marginTop: 8 }}>
                An accelerator-style engagement for technical leadership.
              </h2>
              <p style={{ color: theme.textMuted, fontSize: '0.95rem', lineHeight: 1.65, marginTop: 14 }}>
                The session translates the Agentic Coding Journey into operating decisions: what to
                pilot, how to govern it, and how to make the codebase ready for agents.
              </p>
            </div>
            <div
              className="scaleup-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}
            >
              {offerPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <article
                    key={pillar.title}
                    className={`s${Math.min(index + 4, 10)}`}
                    style={{
                      borderRadius: 8,
                      border: `1px solid ${theme.border}`,
                      background: theme.surface,
                      padding: 16,
                    }}
                  >
                    <Icon size={19} style={{ color: theme.accent, marginBottom: 12 }} />
                    <h3 style={{ color: theme.text, fontSize: '0.98rem', lineHeight: 1.35 }}>
                      {pillar.title}
                    </h3>
                    <p style={{ color: theme.textMuted, fontSize: '0.84rem', lineHeight: 1.55, marginTop: 6 }}>
                      {pillar.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="scaleup-band s4"
          style={{
            marginTop: 24,
            borderRadius: 8,
            border: `1px solid ${theme.accentBorder}`,
            background: theme.accentSoft,
            padding: 22,
          }}
        >
          <div
            className="scaleup-outcomes"
            style={{ display: 'grid', gridTemplateColumns: '0.55fr 1.45fr', gap: 22, alignItems: 'center' }}
          >
            <div>
              <LineChart size={24} style={{ color: theme.accent, marginBottom: 10 }} />
              <h2 style={{ color: theme.text, fontSize: '1.45rem', lineHeight: 1.2 }}>Expected outcomes</h2>
            </div>
            <div
              className="scaleup-list"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}
            >
              {outcomes.map((outcome) => (
                <div
                  key={outcome}
                  style={{
                    display: 'flex',
                    gap: 9,
                    alignItems: 'flex-start',
                    color: theme.text,
                    fontSize: '0.9rem',
                    lineHeight: 1.45,
                  }}
                >
                  <CheckCircle2 size={17} style={{ color: theme.accent, flexShrink: 0, marginTop: 1 }} />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="scaleup-section s5" style={{ marginTop: 34 }}>
          <div className="scaleup-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
            <div>
              <p
                style={{
                  color: theme.accent,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Format
              </p>
              <h2 style={{ color: theme.text, fontSize: '1.65rem', lineHeight: 1.2, marginTop: 8 }}>
                Designed for in-person discussion, not passive training.
              </h2>
            </div>
            <div style={{ display: 'grid', gap: 11 }}>
              {formatSteps.map((step, index) => (
                <article
                  key={step.title}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '34px 1fr',
                    gap: 12,
                    padding: 14,
                    borderRadius: 8,
                    border: `1px solid ${theme.border}`,
                    background: theme.surface,
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      display: 'grid',
                      placeItems: 'center',
                      color: theme.accent,
                      background: theme.accentSoft,
                      border: `1px solid ${theme.accentBorder}`,
                      fontSize: '0.82rem',
                      fontWeight: 800,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 style={{ color: theme.text, fontSize: '0.96rem' }}>{step.title}</h3>
                    <p style={{ color: theme.textMuted, fontSize: '0.84rem', lineHeight: 1.55, marginTop: 4 }}>
                      {step.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="scaleup-section s6"
          style={{
            marginTop: 24,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 18,
          }}
        >
          <article
            style={{
              borderRadius: 8,
              border: `1px solid ${theme.border}`,
              background: theme.surface,
              padding: 20,
            }}
          >
            <ClipboardCheck size={22} style={{ color: theme.accent, marginBottom: 12 }} />
            <h2 style={{ color: theme.text, fontSize: '1.25rem' }}>Playbook foundation</h2>
            <p style={{ color: theme.textMuted, fontSize: '0.9rem', lineHeight: 1.6, marginTop: 8 }}>
              The engagement is based on the Agentic Coding Journey already captured in this project,
              reframed for scale-up leadership and production engineering constraints.
            </p>
          </article>
          <article
            style={{
              borderRadius: 8,
              border: `1px solid ${theme.border}`,
              background: theme.surface,
              padding: 20,
            }}
          >
            <Network size={22} style={{ color: theme.accent, marginBottom: 12 }} />
            <h2 style={{ color: theme.text, fontSize: '1.25rem' }}>What it covers</h2>
            <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
              {credibilityPoints.map((point) => (
                <div
                  key={point}
                  style={{
                    display: 'flex',
                    gap: 9,
                    alignItems: 'flex-start',
                    color: theme.textMuted,
                    fontSize: '0.86rem',
                    lineHeight: 1.5,
                  }}
                >
                  <CheckCircle2 size={15} style={{ color: theme.accent, flexShrink: 0, marginTop: 2 }} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          className="s7"
          style={{
            marginTop: 30,
            padding: '26px 22px',
            borderRadius: 8,
            border: `1px solid ${theme.accentBorder}`,
            background: theme.surface,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p
              style={{
                color: theme.accent,
                fontSize: '0.78rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Start2 Group joint venture
            </p>
            <h2 style={{ color: theme.text, fontSize: '1.55rem', lineHeight: 1.2, marginTop: 6 }}>
              Bring a concrete AI engineering agenda to your next leadership conversation.
            </h2>
          </div>
          <a href={CREATOR_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" style={ctaStyle}>
            Let's discuss this in person
            <ArrowRight size={18} />
          </a>
        </section>
      </div>
    </main>
  );
}
