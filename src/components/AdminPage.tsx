import { useTheme } from '../theme/useTheme';

const routes = [
  { path: '/', label: 'Presentation (Home)', description: 'Main presentation slides' },
  { path: '/slide/1', label: 'Presentation — Slide 1', description: 'Direct link to a specific slide' },
  { path: '/mindmap', label: 'Mindmap', description: 'Agentic Engineering interactive mindmap' },
  { path: '/initial-steps', label: 'Initial Steps', description: '"From Idea to App" step-by-step guide' },
  { path: '/scaleup-ai', label: 'Scaleup AI', description: 'Scaling AI workshop information' },
  { path: '/contributing-to-production', label: 'Contributing to Production', description: 'Non-techies session 1 (slide 0)' },
  { path: '/analytics-and-tracking', label: 'Analytics & Tracking', description: 'Non-techies session 2 (slide 0)' },
  { path: '/agentic-business', label: 'Agentic Business', description: 'Non-techies session 3 (slide 0)' },
];

export function AdminPage() {
  const { theme } = useTheme();

  return (
    <main style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.text }}>Admin</h1>
          <p style={{ color: theme.textMuted, fontSize: 14, marginTop: 4 }}>All registered routes</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {routes.map(({ path, label, description }) => (
            <a
              key={path}
              href={path}
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: 8,
                padding: '14px 18px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                transition: 'border-color 0.15s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = theme.accent;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = theme.border;
              }}
            >
              <span style={{ color: theme.accent, fontSize: 12, fontFamily: 'monospace' }}>{path}</span>
              <span style={{ color: theme.text, fontSize: 15, fontWeight: 600 }}>{label}</span>
              <span style={{ color: theme.textMuted, fontSize: 13 }}>{description}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
