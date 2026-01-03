# @kushagradhawan/kookie-ui

> A modern React component library with beautiful design tokens, flexible theming, and comprehensive documentation.

[![npm version](https://img.shields.io/npm/v/@kushagradhawan/kookie-ui)](https://www.npmjs.com/package/@kushagradhawan/kookie-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Alpha](https://img.shields.io/badge/alpha-blue)](https://github.com/KushagraDhawan1997/kookie-ui)

## Installation

```bash
npm install @kushagradhawan/kookie-ui
# or
pnpm add @kushagradhawan/kookie-ui
# or
yarn add @kushagradhawan/kookie-ui
```

## Quick Start

```tsx
import '@kushagradhawan/kookie-ui/styles.css';
import { Theme, Button, Card, Flex, Text } from '@kushagradhawan/kookie-ui';

export default function App() {
  return (
    <Theme accentColor="blue" grayColor="gray">
      <Card size="3" variant="soft">
        <Flex direction="column" gap="3" p="4">
          <Text size="3">Welcome to Kookie UI</Text>
          <Button size="3" variant="solid">
            Get Started
          </Button>
        </Flex>
      </Card>
    </Theme>
  );
}
```

## What is Kookie UI?

Kookie UI is a fork of [Radix Themes](https://radix-ui.com/themes) that extends it into a full design system. While Radix provided excellent building blocks, Kookie UI codifies the patterns and rules that make interfaces feel consistent and systematic.

### Key Features

- **Systematic Design Tokens** - 12-point progressions for spacing, radius, and shadows with predictable steps
- **Universal Material System** - Every component understands translucency vs. solidity with theme-level defaults and per-component overrides
- **Consistent Sizing** - Cards, buttons, dropdowns, selects, and avatars all follow the same scale
- **Unified Motion** - Transition patterns work consistently across all components
- **Enhanced Accessibility** - Native tooltip support, stricter aria-label enforcement, and improved keyboard navigation
- **Layout Patterns** - Shells, sidebars, panels, and toolbars that work together predictably

## Framework Support

### Next.js (App Router)

```tsx
// app/layout.tsx
import '@kushagradhawan/kookie-ui/styles.css';
import { Theme } from '@kushagradhawan/kookie-ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="blue" grayColor="gray">
          {children}
        </Theme>
      </body>
    </html>
  );
}
```

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import '@kushagradhawan/kookie-ui/styles.css';
import { Theme } from '@kushagradhawan/kookie-ui';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme accentColor="blue" grayColor="gray">
      <Component {...pageProps} />
    </Theme>
  );
}
```

### Vite + React

```tsx
// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@kushagradhawan/kookie-ui/styles.css';
import { Theme } from '@kushagradhawan/kookie-ui';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor="blue" grayColor="gray">
      <App />
    </Theme>
  </React.StrictMode>,
);
```

### Create React App

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@kushagradhawan/kookie-ui/styles.css';
import { Theme } from '@kushagradhawan/kookie-ui';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Theme accentColor="blue" grayColor="gray">
      <App />
    </Theme>
  </React.StrictMode>,
);
```

### Remix

```tsx
// app/root.tsx
import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { LinksFunction } from '@remix-run/node';
import { Theme } from '@kushagradhawan/kookie-ui';
import styles from '@kushagradhawan/kookie-ui/styles.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Theme accentColor="blue" grayColor="gray">
          <Outlet />
        </Theme>
        <Scripts />
      </body>
    </html>
  );
}
```

### Gatsby

```js
// gatsby-browser.js
import '@kushagradhawan/kookie-ui/styles.css';
```

```tsx
// src/pages/_app.tsx
import { Theme } from '@kushagradhawan/kookie-ui';

export const wrapRootElement = ({ element }) => (
  <Theme accentColor="blue" grayColor="gray">
    {element}
  </Theme>
);
```

## CSS Imports

### Complete Stylesheet

```tsx
import '@kushagradhawan/kookie-ui/styles.css';
```

### Modular Imports

```tsx
import '@kushagradhawan/kookie-ui/tokens.css'; // Design tokens
import '@kushagradhawan/kookie-ui/components.css'; // Component styles
import '@kushagradhawan/kookie-ui/utilities.css'; // Utility classes
import '@kushagradhawan/kookie-ui/layout.css'; // Layout utilities
```

## Requirements

- React 16.8+ through React 19
- Node.js 16+ (for development)
- TypeScript support built-in

```json
{
  "peerDependencies": {
    "react": "16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
    "react-dom": "16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
  }
}
```

## Components

### Layout

- `Shell` - Main application shell with header, sidebar, and content areas
- `Sidebar` - Collapsible sidebar navigation
- `Flex` - Flexible container with gap support
- `Grid` - CSS Grid container
- `Container` - Responsive container with max-width
- `Section` - Semantic section wrapper

### Navigation

- `Tabs` - Tab navigation component
- `SegmentedControl` - Segmented control for mutually exclusive options
- `TabNav` - Tab navigation for page-level navigation

### Data Entry

- `Button` - Primary action button
- `IconButton` - Icon-only button
- `ToggleButton` - Toggle state button
- `ToggleIconButton` - Toggle state icon button
- `TextField` - Text input field
- `TextArea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Checkbox input
- `CheckboxGroup` - Group of checkboxes
- `CheckboxCards` - Card-based checkbox selection
- `Radio` - Radio button input
- `RadioGroup` - Group of radio buttons
- `RadioCards` - Card-based radio selection
- `Switch` - Toggle switch
- `Slider` - Range slider input
- `Progress` - Progress indicator

### Data Display

- `Card` - Content card container
- `Avatar` - User avatar image
- `Badge` - Status badge
- `Image` - Responsive image component
- `Table` - Data table
- `DataList` - List of data items
- `Skeleton` - Loading skeleton placeholder

### Feedback

- `AlertDialog` - Modal alert dialog
- `Dialog` - Modal dialog
- `Sheet` - Slide-out panel
- `Popover` - Floating content panel
- `HoverCard` - Hover-triggered card
- `Tooltip` - Contextual tooltip
- `Callout` - Callout message
- `Spinner` - Loading spinner

### Overlays

- `DropdownMenu` - Dropdown menu
- `ContextMenu` - Right-click context menu
- `Select` - Dropdown selection

### Typography

- `Text` - Text component with semantic styling
- `Heading` - Heading component
- `Code` - Inline code
- `Kbd` - Keyboard key display
- `Blockquote` - Block quote
- `Quote` - Inline quote
- `Em` - Emphasis
- `Strong` - Strong emphasis

### Layout Utilities

- `AspectRatio` - Maintain aspect ratio
- `Inset` - Inset spacing
- `Separator` - Visual separator
- `ScrollArea` - Custom scrollable area

## Theming

Kookie UI uses a comprehensive theming system with:

- **Accent Colors** - Primary brand colors (blue, green, orange, etc.)
- **Gray Colors** - Neutral color scales (gray, mauve, slate, etc.)
- **Material System** - Translucent vs. solid surfaces
- **Size Scales** - Consistent sizing across components
- **Spacing System** - 12-point spacing progression
- **Typography** - Font scales and weights
- **Dark Mode** - Automatic dark mode support

## Status

⚠️ **Alpha** - Kookie UI is in alpha. Components and APIs are still evolving, and breaking changes may happen. Check changelogs carefully before upgrading.

> Note: This package uses npm Trusted Publishing with OIDC for secure CI/CD deployments.

## License

MIT © [Kushagra Dhawan](https://github.com/kushagradhawan)

## Links

- [Documentation](https://github.com/kushagradhawan/kookie-ui)
- [GitHub Repository](https://github.com/kushagradhawan/kookie-ui)
- [Issue Tracker](https://github.com/kushagradhawan/kookie-ui/issues)

---
