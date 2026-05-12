import { useTheme } from '../../theme/useTheme';
import { NonTechiesSlideContent } from './NonTechiesSlideContent';
import type { Session } from '../NonTechiesPage';

interface Props {
  session: Session;
}

export function NonTechiesPrintAllSlides({ session }: Props) {
  const { theme } = useTheme();

  return (
    <div className="print-container" style={{ display: 'none' }}>
      {session.slides.map((slide, i) => (
        <div
          key={i}
          className="print-slide"
          style={{
            backgroundColor: theme.bg,
            color: theme.text,
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            justifyContent: 'center',
            alignItems: 'center',
            padding: '48px 40px',
          }}
        >
          <NonTechiesSlideContent slide={slide} session={session} index={i} />
        </div>
      ))}
    </div>
  );
}
