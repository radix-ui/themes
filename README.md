# Kookie UI

> A modern React component library with beautiful design tokens, flexible theming, and comprehensive documentation.

[![Beta](https://img.shields.io/badge/status-beta-orange)](https://github.com/kushagradhawan/kookie-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@kushagradhawan/kookie-ui)](https://www.npmjs.com/package/@kushagradhawan/kookie-ui)

## Introduction

Most component libraries hand you a box of parts and leave the real decisions up to you. That sounds flexible, but in practice it means every team ends up re-deciding the same things: how should overlays behave, what counts as a primary action, what's the right way to handle motion, or which size an icon should actually be.

Kookie UI starts earlier in the chain. It begins with patterns — the rules that govern interaction, hierarchy, density, and rhythm — and then provides components that follow those rules automatically. The components exist to make the patterns easy to apply, not to replace the thinking behind them.

This isn't about flashy new UI. It's about reducing friction. Interfaces feel better when spacing, colors, transitions, and accessibility work the same way everywhere. Kookie UI tries to codify those boring but essential details so teams don't have to keep patching them one component at a time.

## Philosophy

Kookie UI is intentionally boring. It doesn't try to reinvent interface design or compete with design trends. Instead, it codifies the non-negotiables: spacing systems, semantic colors, accessible defaults, predictable motion, and interaction rules that behave consistently.

The idea is simple: once the basics are solid, teams can focus on the parts of the product that actually make it unique. Patterns handle the baseline, components enforce the patterns, and the rest of your product can grow without carrying that overhead.

The result isn't magic or perfection. It's a foundation you can trust just enough to spend your energy on higher-level problems.

## What's Included

Kookie UI includes the same foundations you'd expect — spacing tokens, color tokens, motion tokens — but rebuilt systematically. On top of that, it ships with components that apply those rules consistently, so teams don't have to remember them case by case.

- **Density system** that adapts from compact SaaS layouts to touch-friendly mobile flows with four predictable size scales
- **Shell architecture** with structural patterns for sidebars, panels, and toolbars that actually work together
- **Universal material system** with translucency vs. solidity support across all components
- **Consistent sizing** where cards, buttons, dropdowns, selects, and avatars all follow the same scale
- **Unified motion** with transition patterns that work consistently across components
- **Enhanced accessibility** with native tooltip support and stricter aria-label enforcement

## Roadmap

Kookie UI isn't shipped in one go. It grows gradually, based on what feels stable enough to use in real products. Components are released when they meet that standard, not on arbitrary timelines.

**What's coming next:**

- Core input components: **TextField, TextArea, Switch, Checkbox, Radio**
- Navigation patterns: **Tabs, Toolbar, Command Palette**
- System experiences: **Dialog, Drawer, Popover**
- Data components: **Tables** (with virtualization support)
- Composed patterns: **UserCard, PropertyControl** and other small but recurring interface needs

Longer term, the plan is to ship **templates** for dashboards, marketing sites, authentication flows, and AI interfaces — not as frameworks, but as reliable starting points for common patterns.

## Quick Start

```bash
npm install @kushagradhawan/kookie-ui
```

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

## Documentation

- **[Installation Guide](apps/docs/app/docs/installation.mdx)** - Get started with any React framework
- **[Component Overview](apps/docs/app/docs/get-started.mdx)** - Learn about the design system and patterns
- **[Playground](apps/docs/app/playground/page.tsx)** - Interactive component examples
- **[API Reference](apps/docs/app/docs/Button/api.mdx)** - Complete component documentation

## Requirements

- React 16.8+ through React 19
- Node.js 16+ (for development)
- TypeScript support built-in

## Development

This is a monorepo managed with [Turbo](https://turbo.build/) and [pnpm](https://pnpm.io/).

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build

# Run documentation site
pnpm docs
```

## License

MIT © [Kushagra Dhawan](https://github.com/kushagradhawan)

## Status

⚠️ **Beta** - Kookie UI is in beta. Components and APIs are still evolving, and breaking changes may happen. Check changelogs carefully before upgrading.
