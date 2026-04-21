import { SlideData } from '../../types';
import { CoverSlide } from '../slides/CoverSlide';
import { IntroSlide } from '../slides/IntroSlide';
import { RuleSlide } from '../slides/RuleSlide';
import { SummarySlide } from '../slides/SummarySlide';
import { ClosingSlide } from '../slides/ClosingSlide';
import { AuthorSlide } from '../slides/AuthorSlide';

interface PrintAllSlidesProps {
  slides: SlideData[];
}

export function PrintAllSlides({ slides }: PrintAllSlidesProps) {
  const renderSlide = (data: SlideData) => {
    switch (data.layout) {
      case 'cover':
        return <CoverSlide data={data} />;
      case 'intro':
        return <IntroSlide data={data} />;
      case 'rule':
        return <RuleSlide data={data} />;
      case 'summary':
        return (
          <SummarySlide
            data={data}
            onGoTo={() => {}}
            ruleStartIndex={4}
          />
        );
      case 'closing':
        return <ClosingSlide data={data} />;
      case 'author':
        return <AuthorSlide data={data} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="print-container"
      style={{ display: 'none' }}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className="print-slide"
        >
          {renderSlide(slide)}
        </div>
      ))}
    </div>
  );
}
