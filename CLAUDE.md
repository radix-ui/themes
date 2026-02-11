# AGENTS.md — Radix Themes

> Context file for AI agents working in this repository.

## Project Overview

**Radix Themes** (`@radix-ui/themes`) is an open-source React component library optimized for fast development, easy maintenance, and accessibility. It provides a comprehensive set of pre-styled, themeable UI components built on top of [Radix Primitives](https://www.radix-ui.com/primitives).

- **Package name:** `@radix-ui/themes`
- **Current version:** 3.x (check `packages/radix-ui-themes/package.json` for exact version)
- **License:** MIT
- **Documentation:** https://www.radix-ui.com/themes/docs/theme

## Documentation

The full docs for this project are hosted at:

- **Theme overview:** https://www.radix-ui.com/themes/docs/theme/overview
- **Component docs:** https://www.radix-ui.com/themes/docs/components (e.g., `.../components/button`, `.../components/dialog`)
- **Utilities:** https://www.radix-ui.com/themes/docs/utilities/box
- **Releases:** https://www.radix-ui.com/themes/docs/overview/releases

When you need to understand a component's API, intended behavior, or usage patterns, **consult the docs at the URLs above** rather than guessing. The documentation site lives in a [separate repository](https://github.com/radix-ui/website).

## Repository Structure

This is a **pnpm monorepo** managed with **Turborepo**.

```
themes/
├── packages/
│   └── radix-ui-themes/          # The core library (published as @radix-ui/themes)
│       ├── src/
│       │   ├── components/       # All component source files
│       │   │   ├── _internal/    # Shared base components (not exported)
│       │   │   ├── *.tsx         # Component implementations
│       │   │   ├── *.props.tsx   # Component prop definitions
│       │   │   ├── *.css         # Component styles
│       │   │   └── index.tsx     # Public component exports
│       │   ├── helpers/          # Utility functions (prop extraction, responsive styles, etc.)
│       │   ├── props/            # Shared prop definitions (color, margin, radius, etc.)
│       │   ├── styles/
│       │   │   ├── tokens/       # Design tokens (colors, typography, radius, shadow, spacing)
│       │   │   └── utilities/    # CSS utility classes (layout, typography)
│       │   └── index.ts          # Package entry point
│       ├── scripts/              # Build scripts (esbuild CJS/ESM)
│       ├── postcss.config.cjs    # PostCSS config with custom plugins
│       ├── tsconfig.json
│       └── package.json
├── apps/
│   └── playground/               # Next.js App Router playground for development
│       ├── app/
│       │   ├── (themeable)/sink/ # Main component showcase (http://localhost:3000/sink)
│       │   ├── (themeable)/test/ # Test pages for specific scenarios
│       │   └── (themeable)/demo/ # Demo pages
│       ├── tests/                # Playwright visual regression tests
│       └── playwright.config.ts
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                # Build, lint, format check, visual regression
│   │   └── publish.yml           # Publish to npm on GitHub release
│   └── CONTRIBUTING.md
├── package.json                  # Root monorepo config
├── pnpm-workspace.yaml
└── turbo.json
```

## Tech Stack

| Concern                | Tool                                                       |
| ---------------------- | ---------------------------------------------------------- |
| Package manager        | pnpm 10 (see `.npmrc`)                                     |
| Node version           | 24 (see `.nvmrc`)                                          |
| Monorepo orchestration | Turborepo                                                  |
| Language               | TypeScript (strict)                                        |
| Framework              | React (16.8+, 17, 18, 19 supported)                        |
| JS bundler             | esbuild (dual CJS + ESM output)                            |
| CSS processing         | PostCSS (nesting, custom-media, breakpoints, autoprefixer) |
| Linting                | ESLint (flat config), Stylelint (for CSS)                  |
| Formatting             | Prettier (single quotes, 100 print width, 120 for CSS)     |
| Playground             | Next.js (App Router)                                       |
| Testing                | Playwright (visual regression)                             |

## Key Commands

Run all commands from the **repository root** unless stated otherwise:

```bash
# Install dependencies
pnpm install

# Start development (playground + watch mode)
pnpm dev
# Then visit http://localhost:3000/sink

# Build the library
pnpm build

# Build only the themes package
pnpm build:pkg

# Lint everything
pnpm lint

# Format code
pnpm format

# Check formatting
pnpm format:check

# Run visual regression tests
pnpm test:vr

# Update visual regression snapshots
pnpm test:vr:update

# Clean all build artifacts
pnpm clean
```

## Component Architecture

### File Convention

Each component typically consists of three co-located files:

- **`component-name.tsx`** — React component implementation
- **`component-name.props.tsx`** — Prop type definitions and default values
- **`component-name.css`** — Component styles using CSS custom properties and data attributes

Some complex components also have a `.primitive.tsx` file for lower-level behavior (e.g., `checkbox-cards.primitive.tsx`).

### Styling Approach

- Components use **CSS custom properties** (CSS variables) for theming
- Design tokens are defined in `src/styles/tokens/` and include 27+ color scales from `@radix-ui/colors`
- Responsive props use breakpoint-based classes generated via a custom PostCSS plugin (`postcss-breakpoints.cjs`)
- Layout utility classes are generated from `src/styles/utilities/`
- The `Theme` component wraps the app and provides theming context (appearance, accent color, gray color, radius, scaling)

### Prop System

- Components use a typed prop definition system in `src/props/prop-def.ts`
- Most visual props support **responsive objects** (e.g., `size={{ initial: '1', md: '3' }}`)
- Common shared props: `color`, `highContrast`, `radius`, `variant`, `size`, `weight`, `asChild`
- Margin props (`m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`) are extracted via `extractMarginProps()`

## Build System

The package produces:

1. **CJS output** → `dist/cjs/` (via esbuild)
2. **ESM output** → `dist/esm/` (via esbuild)
3. **Type declarations** → `dist/cjs/` and `dist/esm/` (via tsc)
4. **CSS output** → multiple CSS files at package root:
   - `styles.css` — Full styles (tokens + components + utilities)
   - `components.css` — Component styles only
   - `utilities.css` — Utility classes only
   - `tokens.css` — Design tokens only
   - `tokens/base.css`, `tokens/colors/*.css` — Granular token files
   - `layout.css`, `layout/*.css` — Layout-only subset

## Development Workflow

1. Run `pnpm dev` to start the playground and watch mode
2. Visit `http://localhost:3000/sink` to see all components
3. Test pages are at `http://localhost:3000/test/*` for specific scenarios
4. Demo pages at `http://localhost:3000/demo`
5. Always run `pnpm build` before submitting a PR to ensure the build succeeds
6. Visual regression tests compare screenshots across browsers (Chromium, Firefox, WebKit)

## Coding Conventions

- **Prettier** for formatting (single quotes, 100 char width, 120 for CSS)
- **ESLint** with TypeScript, React Hooks, and jsx-a11y rules
- **Stylelint** for CSS (enforces selector specificity, class naming patterns)
- CSS class names follow the pattern `.rt-ComponentName` (e.g., `.rt-Button`, `.rt-DialogContent`)
- CSS custom properties use `--` prefix namespacing
- Component files use kebab-case naming (e.g., `alert-dialog.tsx`)
- Props files export a `*PropDefs` object defining allowed values and defaults
- Use `classnames` library for conditional class merging

## Release Process

1. PRs that fix bugs or add features should update `packages/radix-ui-themes/CHANGELOG.md`
2. Releases follow semver and are published via GitHub Releases
3. The `publish.yml` workflow automatically publishes to npm when a GitHub release is created
4. Pre-releases use `pnpm publish -r --tag <alpha|beta|rc>`

See `release-process.md` for the full release checklist.

## Important Notes for Agents

- The **documentation site** is in a separate repo ([`radix-ui/website`](https://github.com/radix-ui/website)), not this one
- Built CSS files at the package root (e.g., `styles.css`, `components.css`) are **gitignored** — they are build artifacts
- The `dist/`, `tokens/`, and `layout/` directories are also gitignored build artifacts
- When modifying a component, update all three files (`.tsx`, `.props.tsx`, `.css`) as needed
- The `Theme` component (`theme.tsx`) is the root provider — all other components must be used within it
