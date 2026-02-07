# Vibe Coding Guide - React + TypeScript + Vite

A modern, refactored presentation about "Vibe Coding" - building software with AI.

## Features

- ✅ **Type-safe**: Full TypeScript implementation with strict typing
- ✅ **Modern stack**: React 18 + Vite + React Router
- ✅ **Modular architecture**: Clean separation of concerns
- ✅ **Theme support**: Dark/light mode with context API
- ✅ **URL routing**: Clean URLs with React Router (`/slide/N`)
- ✅ **Navigation**: Keyboard, touch/swipe, and button controls
- ✅ **Responsive**: Mobile-first design
- ✅ **Code quality**: ESLint + Prettier configured

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

```bash
# Type checking
npm run build  # or npx tsc --noEmit

# Linting
npm run lint

# Formatting
npm run format
```

## Project Structure

```
src/
├── types/              # TypeScript type definitions
│   ├── slide.types.ts
│   ├── theme.types.ts
│   └── index.ts
├── config/             # Configuration & content
│   ├── creator.ts
│   └── slides.ts
├── theme/              # Theme system
│   ├── theme.ts
│   ├── ThemeContext.tsx
│   └── useTheme.ts
├── styles/             # Global styles
│   ├── fonts.css
│   └── global.css
├── hooks/              # Custom React hooks
│   ├── useKeyboardNavigation.ts
│   ├── useTouchNavigation.ts
│   ├── useUrlSync.ts
│   └── useShare.ts
├── components/
│   ├── ui/            # Reusable UI components
│   │   ├── ProgressBar.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ShareButton.tsx
│   │   ├── NavigationControls.tsx
│   │   ├── Toast.tsx
│   │   └── SlideOverview.tsx
│   ├── slides/        # Slide layout components
│   │   ├── CoverSlide.tsx
│   │   ├── IntroSlide.tsx
│   │   ├── RuleSlide.tsx
│   │   ├── SummarySlide.tsx
│   │   ├── ClosingSlide.tsx
│   │   └── PromoSlide.tsx
│   └── Presentation.tsx
├── constants/         # Constants
│   └── cursor.ts
├── App.tsx           # Main app with routing
└── main.tsx          # Entry point
```

## Customization

### Update Creator Information

Edit `src/config/creator.ts`:

```typescript
export const CREATOR_CONFIG = {
  name: 'Your Name',
  linkedinUrl: 'https://linkedin.com/in/your-handle',
  xUrl: 'https://x.com/your-handle',
  surveyUrl: 'https://your-survey.com',
} as const;
```

### Modify Slide Content

Edit `src/config/slides.ts` to add, remove, or modify slides.

### Customize Theme

Edit `src/theme/theme.ts` to modify colors and styles.

## Navigation

- **Keyboard**: Arrow keys (←/→ or ↑/↓)
- **Touch**: Swipe left/right on mobile
- **Buttons**: Use prev/next buttons
- **Overview**: Click slide counter to see all slides
- **URL**: Direct navigation via `/slide/N`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT
