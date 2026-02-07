// Base slide type with common properties
export interface BaseSlide {
  layout: string;
  title: string;
}

// Cover slide
export interface CoverSlideData extends BaseSlide {
  layout: 'cover';
  subtitle: string;
  badge: string;
}

// Intro slide
export interface IntroSlideData extends BaseSlide {
  layout: 'intro';
  description: string;
  steps: Array<{
    icon: string;
    label: string;
    detail: string;
  }>;
}

type ExternalLink = {
  label: string;
  url: string;
};

// Rule slide
export interface RuleSlideData extends BaseSlide {
  layout: 'rule';
  number: string;
  subtitle: string;
  description: string;
  points: string[];
  tip: string;
  externalLink?: ExternalLink;
}

// Summary slide
export interface SummarySlideData extends BaseSlide {
  layout: 'summary';
  subtitle: string;
  rules: Array<{
    num: string;
    title: string;
    desc: string;
  }>;
}

// Closing slide
export interface ClosingSlideData extends BaseSlide {
  layout: 'closing';
  subtitle: string;
  cta: string;
  surveyUrl: string;
  surveyLabel: string;
  surveyDetail: string;
}

// Author slide
export interface AuthorSlideData extends BaseSlide {
  layout: 'author';
  role: string;
  socialCall2Action: string;
  linkedinUrl: string;
  xUrl: string;
  toolsLabel: string;
  position: 'opening' | 'closing';
  tools?: ReadonlyArray<{
    readonly name: string;
    readonly url: string;
    readonly description: string;
    readonly icon: string;
  }>;
}

// Discriminated union of all slide types
export type SlideData =
  | CoverSlideData
  | IntroSlideData
  | RuleSlideData
  | SummarySlideData
  | ClosingSlideData
  | AuthorSlideData;
