# Claude Guidelines for kookie-ui

## Props Over Inline Styles

**Always prefer component props over inline styles.**

```tsx
// ❌ Bad
<Flex style={{ padding: '16px', marginTop: '8px' }}>
<Box style={{ height: '100%', paddingTop: 'var(--rt-toolbar-height)' }}>

// ✅ Good
<Flex p="4" mt="2">
<Box height="100%" pt="var(--rt-toolbar-height)">
```

Components support layout props directly:

- Spacing: `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`
- Sizing: `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`
- Position: `position`, `top`, `right`, `bottom`, `left`
- Flex: `flexGrow`, `flexShrink`, `flexBasis`

These props accept scale values (`"1"` through `"9"`) or CSS values (`"100%"`, `"auto"`, `"var(--rt-toolbar-height)"`).

Only use `style` prop when there's no prop equivalent (e.g., `cursor`, `transform`, `backgroundImage`, `objectFit`).

## Kookie Primitives Over Raw HTML

Use Kookie primitives instead of raw HTML tags:

```tsx
// ❌ Bad
<div style={{ display: 'flex', gap: '12px' }}>
  <h3>Title</h3>
  <p>Description</p>
</div>

// ✅ Good
<Flex gap="3">
  <Heading size="3">Title</Heading>
  <Text size="2">Description</Text>
</Flex>
```

## No Tailwind

This codebase does not use Tailwind. Never use Tailwind classes.

## Icons: HugeIcons Only

```tsx
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

// ✅ Good - Let Button handle sizing
<Button>
  <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} />
  Create
</Button>

// ❌ Bad - Don't manually size icons inside Kookie components
<Button>
  <HugeiconsIcon icon={Add01Icon} size={16} />
</Button>
```

## Kookie-Controlled Content

Inside `Button`, `IconButton`, `DropdownMenu`, `ContextMenu`, etc., Kookie handles icon sizing, text sizing, and spacing.

```tsx
// ✅ Good - Let Kookie handle it
<Button>
  <HugeiconsIcon icon={Add01Icon} strokeWidth={1.75} />
  Create project
</Button>

// ❌ Bad - Don't wrap text in Text or manually size icons
<Button>
  <HugeiconsIcon icon={Add01Icon} size={16} />
  <Text>Create project</Text>
</Button>
```

## Composition Over Configuration

Build UI by composing small primitives instead of monolithic components:

```tsx
// ✅ Good - Compose primitives
<Card>
  <Flex direction="column" gap="2">
    <Heading size="3">Card title</Heading>
    <Text size="2">Card description</Text>
    <Button size="2">Action</Button>
  </Flex>
</Card>

// ❌ Bad - Monolithic component with 20 props
<DashboardCard
  title="Card title"
  description="Card description"
  buttonText="Action"
  buttonVariant="solid"
  /* ...15 more props */
/>
```

## Variant & Size Defaults

- **Default size**: Use `size="2"` when no specific size is required
- **Variant preference**: `classic` > `soft` > `surface` > `outline` > `ghost`
- **Gray buttons**: Always use `highContrast` prop

```tsx
<Button size="2" variant="classic" highContrast>Primary</Button>
<Button size="2" variant="soft" color="gray" highContrast>Secondary</Button>
```

## Button Hierarchy

Every button pairing needs clear visual hierarchy:

```tsx
// ✅ Good - Clear hierarchy
<Flex gap="2">
  <Button variant="soft" color="gray" highContrast>Cancel</Button>
  <Button variant="classic" highContrast>Save</Button>
</Flex>

// ❌ Bad - Inside classic Card, don't use classic Button
<Card variant="classic">
  <Button variant="classic">Action</Button>  // Use solid instead
</Card>
```

## Theme-Aware Colors

Never hardcode colors. Use theme-aware props:

```tsx
// ❌ Bad
<span style={{ color: '#ff0000' }}>Error</span>

// ✅ Good
<Text color="crimson">Error</Text>
```

## Use asChild for Polymorphic Behavior

```tsx
// ✅ Good
<Button asChild>
  <Link href="/settings">Settings</Link>
</Button>

// ❌ Bad - Nested interactive elements
<Button>
  <Link href="/settings">Settings</Link>
</Button>
```

## Icon Button Accessibility

Icon buttons require `aria-label`:

```tsx
<IconButton variant="soft" size="2" color="gray" highContrast aria-label="Search">
  <HugeiconsIcon icon={SearchIcon} strokeWidth={1.75} />
</IconButton>
```

---

# Documentation Guide

## MDX Formatting

Never include line breaks between opening tags and simple text content:

```tsx
// ❌ Bad - MDX parses as <p>Text</p>
<Button>
Text
</Button>

// ✅ Good
<Button>Text</Button>
```

## Frontmatter

- **Title**: 1-2 words (component name only)
- **Description**: ~50 characters
- No H1 in content (frontmatter title is used)

```yaml
---
title: Button
description: Clickable button with variants and sizes
---
```

## Heading Hierarchy

- **H2** (`##`): 1-3 words (e.g., "Usage", "Props", "Variants")
- **H3** (`###`): 2-4 words (e.g., "Solid Variant", "Size 2")

## Section Order

1. Frontmatter
2. Installation
3. Usage
4. Anatomy (compound components)
5. Props (tables with types)
6. Variants
7. Sizes
8. Colors
9. Material
10. States
11. Examples
12. Responsive
13. Accessibility
14. Changelog

## Code Blocks

Show line numbers for code blocks longer than 5 lines.

---

# Examples Guide

## Philosophy

Examples are real-world patterns, not variant showcases.

## Core Principles

1. **Context over catalog** - Show props solving real problems
2. **Strategic variant distribution** - Weave variants throughout examples
3. **States in situ** - Loading/disabled states in realistic scenarios
4. **Hierarchy matters** - Clear primary/secondary relationships
5. **Copy-paste ready** - Examples should work when dropped into a project

## Example Naming

Use use-case names, not prop names:

| ✅ Good                  | ❌ Bad        |
| ------------------------ | ------------- |
| Form Submission          | Solid Variant |
| Destructive Confirmation | Red Button    |
| Compact Toolbar          | Size 1        |

## Code Formatting

Always use multi-line formatting for 3+ props:

```tsx
// ✅ Good
<Button
  variant="classic"
  size="2"
  highContrast
  loading={isSubmitting}
>
  Save Changes
</Button>

// ❌ Bad - Long single line
<Button variant="classic" size="2" highContrast loading={isSubmitting}>Save Changes</Button>
```

## Strategic Variant Usage

Don't create variant catalogs:

```tsx
// ❌ Bad - Isolated variants
<Button variant="solid">Solid</Button>
<Button variant="soft">Soft</Button>

// ✅ Good - Variants in context
<Flex gap="2">
  <Button variant="soft" color="gray" highContrast>Cancel</Button>
  <Button variant="classic" highContrast>Save</Button>
</Flex>
```

## Card Context

Use `variant="classic"` for Cards providing UI context:

```tsx
<Card variant="classic" size="2">
  <Flex justify="between" align="center" p="2">
    <Text size="2" weight="medium">
      Dashboard
    </Text>
    <IconButton variant="soft" size="2" color="gray" highContrast aria-label="Settings">
      <HugeiconsIcon icon={SettingsIcon} strokeWidth={1.75} />
    </IconButton>
  </Flex>
</Card>
```

## Translucent Examples

```tsx
<PreviewBlock
  height="12rem"
  appearance="dark"
  showThemeToggle={false}
  variant="ghost"
  background={{
    backgroundColor: 'hsl(220, 20%, 10%)',
    backgroundImage: 'radial-gradient(...)',
    borderRadius: 'var(--radius-3)',
  }}
>
  <Button variant="soft" highContrast material="translucent">
    Action
  </Button>
</PreviewBlock>
```

---

# Accessibility

## Don't Break Radix Accessibility

Kookie UI (based on Radix) is built for accessibility. Don't break it:

- Use provided components for interactive patterns: `DropdownMenu`, `ContextMenu`, `Dialog`, `Popover`, `Tabs`, `Accordion`, etc.
- Don't override focus outlines or pointer events in ways that break keyboard/screen-reader behavior
- Don't nest interactive elements (links inside buttons, buttons inside menu items)
- When using `asChild`, ensure the resulting element is semantically appropriate

---

# Import Organization

Group Kookie imports together:

```tsx
import { Box, Flex, Text, Heading, Button, Card } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon, SearchIcon } from '@hugeicons/core-free-icons';
```

---

# Reference Files

- **DOCUMENTATION_GUIDE**: `/Users/kushagradhawan/Code/DOCUMENTATION_GUIDE.md`
- **EXAMPLES_GUIDE**: `/Users/kushagradhawan/Code/EXAMPLES_GUIDE.md`
- **DESIGN_GUIDE**: `/Users/kushagradhawan/Code/DESIGN_GUIDE.md`
- **kookie-rules.mdc**: `/Users/kushagradhawan/Code/kookie-ui/apps/docs/.cursor/kookie-rules.mdc`

---

# Frontend Engineering Standards

These rules apply to all frontend code, regardless of framework or design system.
Follow these conventions even if the user request does not restate them.

---

## 1. Architecture & Code Organization

- Prefer **feature-based architecture**:
  - Group components, hooks, utils, and API logic by _domain_, not by file type.
- Keep components small, focused, and predictable.
- Avoid "God components" — extract logic into hooks/utilities early.
- Do not create deep nested folder structures — two or three levels max.

### File naming

- Components: **PascalCase.tsx**
- Hooks: **useSomething.ts**
- Utilities/types: **camelCase.ts**
- Avoid default exports for utilities; prefer named exports.

---

## 2. State Management Strategy

- **Server state** → managed by React Query (or framework/server loaders).
- **Local UI state** → handled with React component state or small hooks.
- Avoid storing server data in local state; derive it directly from queries.
- Do not introduce global state stores unless a real cross-feature need emerges.

### Avoid anti-patterns:

- "Prop drilling" beyond 2–3 levels → prefer composition or a small context.
- Multiple sources of truth for the same data.

---

## 3. Data Fetching & API Boundaries

- All networking logic must live in an **API client layer**, not inline.
- API responses must be typed (TS interfaces or Zod schemas).
- Validate or transform responses at the boundary before they enter the UI.
- Error and loading states must always be handled explicitly.
- Never use `useEffect` to fetch data that can be handled by React Query or framework tools.

---

## 4. Error Handling Standards

- No empty `catch` blocks.
- Always surface a meaningful error to the user (toast, message, or UI state).
- Log technical details to a central utility, not inline `console.log` everywhere.
- Use React Error Boundaries for isolating failures in large UI areas.

---

## 5. Accessibility (A11y) Standards

- All interactive elements must be:
  - Keyboard accessible,
  - Screen-reader friendly,
  - Semantically correct (`button`, `a`, etc.).
- Never use `div` or `span` as clickable elements.
- Provide labels for all form controls.
- Respect `prefers-reduced-motion` for animations.

---

## 6. Forms & Validation

- Prefer **React Hook Form** (or the established library) for all non-trivial forms.
- Validation should happen at:
  - Schema level (Zod/Yup),
  - UI level (input error props),
  - And optionally server side.
- Avoid writing complex form logic with plain `useState`.

---

## 7. Performance Standards

- Avoid premature optimization — but write code that avoids obvious pitfalls.
- Prefer memoization when:
  - Passing functions/objects to memoized children,
  - Doing heavy computations.
- Avoid storing derived data in state — derive when needed.
- Use `useTransition` for expensive UI updates that should remain responsive.
- Lazy-load large modules when practical.

---

## 8. Routing & Navigation Standards

### If Next.js:

- Prefer **Server Components** for data-heavy or static content.
- Client components are reserved for interactivity, animations, or user-driven data.

### If React Router:

- Co-locate loaders/actions with route components.
- Don't pass huge props through multiple routes — use loader data instead.

---

## 9. Testing Standards

- Use React Testing Library for:
  - Behavioral tests,
  - Accessibility assertions,
  - Integration flows.
- Avoid snapshot tests for dynamic UI.
- Focus tests on:
  - critical flows,
  - edge cases,
  - accessibility,
  - regressions.

---

## 10. Security Standards

- Validate all external data before using it.
- Escape potentially unsafe strings before inserting into HTML.
- Never interpolate raw user input into HTML.
- Keep all secret keys or tokens out of the frontend environment.

---

## 11. Code Review & Quality

- PRs must be small, scoped, and clearly described.
- Do not merge code containing:
  - Inline styling that ignores design-system props,
  - Manual DOM manipulation without reason,
  - Deprecated patterns (`useEffect`-fetching, prop drilling, untyped APIs),
  - Unnecessary complexity.
- Always refactor code when adding features if it improves maintainability.

---

## 12. Logging & Monitoring

- Use a centralized logging utility (e.g., `log.error`, `log.info`).
- Never leave stray `console.log` statements.
- Errors thrown from network/API should be traceable and formatted consistently.

---

## 13. Developer Experience (DX)

- Follow established ESLint, prettier, and TypeScript rules at all times.
- Maintain consistent formatting and import order.
- Use barrel files sparingly — only when they improve clarity, not hide structure.
- Prefer clarity over cleverness.

---

## 14. When In Doubt

- Prefer explicit, declarative, readable code.
- Follow the established patterns of the codebase.
- Align with the principles of:
  - React best practices,
  - Kookie UI conventions,
  - Modern frontend engineering standards.

If implementing a feature contradicts these principles, adapt the solution to align with these rules instead of following the original flawed approach directly.

---

# React + TypeScript Standards

Assume: function components, hooks, strict TypeScript, and a focus on correctness, DX, and performance.

When you generate or edit code, **follow these principles even if the user doesn't restate them.**

---

## 1. TypeScript & Types

- **Avoid `any` and `as any`.** Treat them as code smells.
  - Prefer proper types, generics, or `unknown` plus runtime narrowing.
  - If you _must_ use `any` (rare), isolate it in a small, well-documented utility.

- **Minimize type assertions (`as Foo`)**.
  - Prefer proper typing of values at source (e.g., API client types) over casting later.
  - If using assertions, add a comment why it's safe.

- **Use explicit types for public surfaces:**
  - Component props: `type Props = { ... }` or `interface Props { ... }`.
  - Custom hooks return types.
  - Utility function params/returns.

- **Leverage inference for internals.**
  - Let TS infer local variables and intermediate values.
  - Don't over-annotate obvious stuff.

- **No `non-null assertion` (`!`) unless unavoidable.**
  - Prefer null checks or narrowing. If asserting non-null, justify in a comment and keep the scope tiny.

---

## 2. Component Design

- **Prefer small, focused components.**
  - Each component should have a single clear responsibility.
  - Extract subcomponents when JSX gets too nested or props too numerous.

- **Use function components + hooks only. No class components.**

- **Good props design:**
  - Avoid giant "bags of props". If there are > 7–8 props, consider grouping into objects or refactoring.
  - Avoid booleans that explode permutations; consider variants or enums.

- **No business logic in JSX.**
  - Precompute values before the `return`.
  - Mapping, filtering, complex conditionals → move into well-named helpers.

---

## 3. State Management

- **Keep state as local as possible.**
  - Start with component state. Only lift state when multiple descendants truly need it.
  - Avoid premature global state solutions.

- **Avoid prop drilling more than 2–3 levels.**
  - Options: composition, context (sparingly), or dedicated hooks.

- **Use context carefully.**
  - Don't shove "everything" into a global context.
  - Make contexts narrow and purpose-driven (auth, theme, feature-specific etc.).
  - Always type context values clearly and handle "no provider" cases explicitly.

- **Derived state belongs in selectors/memos, not `useState`.**
  - No duplicated state that can be computed from existing state/props.

---

## 4. Side Effects & `useEffect`

> Default stance: **avoid `useEffect` unless it's genuinely a side-effect.**

- **Do NOT fetch data in `useEffect` by default.**
  - Prefer:
    - Framework loaders / server components (Next.js loader, RSC, etc.), or
    - Data libraries like React Query / SWR.
  - Only fall back to `useEffect`+`fetch` for truly ad hoc or one-off cases.

- **UseEffect is for:**
  - Subscribing/unsubscribing to external systems (websockets, event listeners).
  - Imperative interactions with non-React APIs (e.g. `document`, `window`, third-party widgets).
  - Syncing state to external storage (localStorage) in a controlled way.

- **Avoid these anti-patterns in `useEffect`:**
  - Computing _derived values_ that could live in `useMemo` or plain variables.
  - Triggering re-renders by setting state from props when it can be computed.
  - "Syncing" props to state without strong justification.

- **Always define the correct dependencies.**
  - No empty `[]` when values are used inside.
  - No disabling of ESLint `react-hooks/exhaustive-deps` just to "make it work".
  - If you intentionally omit deps, explain why with a comment.

- **Cleanup functions on unmount.**
  - Remove event listeners, abort fetch controllers, cancel subscriptions, etc.

---

## 5. Data Fetching

- **Prefer declarative data fetching approaches:**
  - Use React Query / SWR / framework data APIs for server data.
  - Co-locate queries with the components that need them but keep API clients reusable.

- **No ad-hoc fetch logic repeated everywhere.**
  - Centralize API client configuration (base URL, interceptors, auth headers).
  - Reuse typed API methods instead of raw `fetch` calls.

- **Type-safe APIs.**
  - Define request/response types for each endpoint.
  - Parse/validate external data (e.g. Zod) at boundaries when reasonable.

- **Handle loading and error states explicitly.**
  - No "invisible" failures. Surface errors with sensible UI and logging.

---

## 6. Hooks

- **Custom hooks first-class citizen.**
  - Whenever logic is reused across components, extract into `useXxx` hooks.
  - Hooks should encapsulate behavior + data, not UI.

- **Hook rules:**
  - Follow the Rules of Hooks strictly (no conditional calls).
  - Keep hooks focused; avoid "god hooks" that do too many things.

- **Performance hooks:**
  - Use `useMemo` and `useCallback` **only** when:
    - There's a proven/likely perf problem, or
    - Referencing them in dependencies (`useEffect`, `useMemo`, `useCallback`) requires stable identity.
  - Avoid sprinkling `useCallback` on every handler.

---

## 7. Performance & Rendering

- **Prefer simplicity first; optimize when needed.**

- When optimizing:
  - Use `React.memo` on components that:
    - Are pure, and
    - Render often with same props, and
    - Are expensive or numerous.
  - Stabilize props passed to memoized components (`useMemo` for objects/arrays passed down).

- **Avoid unnecessary re-renders:**
  - Don't create new inline objects/arrays in JSX in hot paths if children are memoized.
  - Don't store large derived objects in state; derive them when needed.

- **Code-splitting:**
  - Use dynamic import / lazy loading for large, rarely used parts (modals, heavy pages).

---

## 8. Styling

- Assume a utility/CSS-in-JS setup (e.g. Tailwind, CSS Modules, or a design system).
- **Keep styling consistent:**
  - Use shared components for common patterns (Button, Modal, Input).
  - Don't inline raw styles when a design-system component exists.

- **No random one-off styles.**
  - If a pattern repeats, extract it.

- **Avoid deeply nested CSS.**
  - Prefer composition and small, reusable style units.

---

## 9. Accessibility & UX

- **Semantics first:**
  - Use proper HTML elements: `button` for clickable, `a` for navigation, lists for lists, headings in order.
  - No `div`-buttons with click handlers.

- **Keyboard accessibility:**
  - Ensure focus states are visible.
  - Support Enter/Space where appropriate.
  - Manage focus on modals, dialogs, and key flows.

- **ARIA only when needed.**
  - Don't sprinkle ARIA roles where native semantics suffice.
  - When using ARIA, follow spec: `aria-*` attributes must make sense.

- **Forms:**
  - Every input must have a label.
  - Provide error messages and associate them properly.

---

## 10. Testing

- **Use React Testing Library for component/integration tests.**
  - Test behavior and user-visible outcomes over implementation details.
  - Avoid testing internal state or hook internals directly.

- **Prefer fewer high-value tests over many fragile ones.**
  - Cover critical paths, edge cases, and regressions.

- **No snapshot tests for complex UIs by default.**
  - Use snapshots for simple, stable outputs only.

---

## 11. Project Structure & DX

- **Co-locate related files.**
  - Component + subcomponents + hooks + styles live together when it improves cohesion.
  - Avoid giant "components" or "utils" dumping grounds.

- **Naming:**
  - Components: `PascalCase`.
  - Hooks: `useCamelCase`.
  - Files follow default export name or clear domain name.

- **Imports:**
  - Use absolute imports where supported.
  - Group imports: external libs, shared internal, local.

- **Linting & formatting:**
  - Always respect ESLint and Prettier config.
  - If a rule is painful, fix the underlying issue or justify changing the rule—don't disable inline without reason.

---

## 12. Error Handling & Logging

- **No empty catch blocks.**
  - Log errors appropriately, surface user-friendly messages.
  - Avoid leaking sensitive info to the UI; keep detailed logs to console/monitoring.

- **Use error boundaries where appropriate.**
  - Wrap large sections/pages that can fail independently.

- **Avoid console noise in production.**
  - Use logging utilities or environment-guarded logs if needed.

---

## 13. Comments & Documentation

- **Comment "why", not "what".**
  - Code should explain _what_; comments explain _why_ it's done that way.

- **Document tricky hooks and components.**
  - Short JSDoc for custom hooks and complex utilities is appreciated.
  - If there's a non-obvious constraint, document it.

---

## 14. When in Doubt

When there are multiple ways to implement something:

1. Prefer readability and maintainability.
2. Prefer patterns already established in the codebase.
3. Avoid clever one-liners that are hard to understand.
4. Respect the rules above even if the immediate request pushes in a worse direction—nudge the solution toward these standards.

If a user request conflicts with these rules, **adapt the request to fit these principles** rather than ignoring them.
Le
