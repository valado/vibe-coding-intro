import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X } from 'lucide-react';
import { useTheme } from '../../theme/useTheme';

const PLACEHOLDER_MD = `# Session 1 — Speaker Notes

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

`;

interface MarkdownDrawerProps {
  onClose: () => void;
}

export function MarkdownDrawer({ onClose }: MarkdownDrawerProps) {
  const { theme } = useTheme();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 40,
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65vh',
          background: theme.surface,
          borderTop: `1px solid ${theme.border}`,
          borderRadius: '16px 16px 0 0',
          zIndex: 41,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.35)',
          animation: 'slideUp 0.25s ease-out',
        }}
      >
        {/* Handle */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 12,
            paddingBottom: 4,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 2,
              background: theme.border,
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 24px 12px',
            borderBottom: `1px solid ${theme.border}`,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: theme.accent,
            }}
          >
            Session Notes
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme.textMuted,
              display: 'flex',
              alignItems: 'center',
              padding: 4,
              borderRadius: 6,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Markdown content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 28px 32px',
          }}
        >
          <div
            style={{
              maxWidth: 760,
              margin: '0 auto',
              fontSize: '0.93rem',
              lineHeight: 1.7,
              color: theme.text,
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      margin: '0 0 16px',
                      color: theme.text,
                    }}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      margin: '24px 0 10px',
                      color: theme.text,
                    }}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      margin: '20px 0 8px',
                      color: theme.textMuted,
                    }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p style={{ margin: '0 0 12px', color: theme.text }}>{children}</p>
                ),
                ul: ({ children }) => (
                  <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol style={{ margin: '0 0 12px', paddingLeft: 20 }}>{children}</ol>
                ),
                li: ({ children }) => (
                  <li style={{ marginBottom: 6, color: theme.text }}>{children}</li>
                ),
                hr: () => (
                  <hr
                    style={{
                      border: 'none',
                      borderTop: `1px solid ${theme.border}`,
                      margin: '20px 0',
                    }}
                  />
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    style={{
                      borderLeft: `3px solid ${theme.accent}`,
                      margin: '12px 0',
                      paddingLeft: 16,
                      color: theme.textMuted,
                      fontStyle: 'italic',
                    }}
                  >
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-');
                  return isBlock ? (
                    <code
                      style={{
                        display: 'block',
                        background: theme.bg,
                        border: `1px solid ${theme.border}`,
                        borderRadius: 8,
                        padding: '12px 16px',
                        fontSize: '0.85rem',
                        fontFamily: 'monospace',
                        overflowX: 'auto',
                        margin: '8px 0',
                        color: theme.text,
                      }}
                    >
                      {children}
                    </code>
                  ) : (
                    <code
                      style={{
                        background: theme.accentSoft,
                        color: theme.accent,
                        padding: '2px 6px',
                        borderRadius: 4,
                        fontSize: '0.85em',
                        fontFamily: 'monospace',
                      }}
                    >
                      {children}
                    </code>
                  );
                },
                table: ({ children }) => (
                  <div style={{ overflowX: 'auto', margin: '12px 0' }}>
                    <table
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        fontSize: '0.88rem',
                      }}
                    >
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th
                    style={{
                      padding: '8px 12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      background: theme.accentSoft,
                      color: theme.accent,
                      borderBottom: `2px solid ${theme.accentBorder}`,
                    }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td
                    style={{
                      padding: '7px 12px',
                      borderBottom: `1px solid ${theme.border}`,
                      color: theme.text,
                    }}
                  >
                    {children}
                  </td>
                ),
                strong: ({ children }) => (
                  <strong style={{ fontWeight: 700, color: theme.text }}>{children}</strong>
                ),
              }}
            >
              {PLACEHOLDER_MD}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
