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
<IconButton
  variant="soft"
  size="2"
  color="gray"
  highContrast
  aria-label="Search"
>
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

| ✅ Good | ❌ Bad |
|---------|--------|
| Form Submission | Solid Variant |
| Destructive Confirmation | Red Button |
| Compact Toolbar | Size 1 |

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
    <Text size="2" weight="medium">Dashboard</Text>
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
import { Box, Flex, Text, Heading, Button, Card } from "@kushagradhawan/kookie-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, SearchIcon } from "@hugeicons/core-free-icons";
```

---

# Reference Files

- **DOCUMENTATION_GUIDE**: `/Users/kushagradhawan/Code/DOCUMENTATION_GUIDE.md`
- **EXAMPLES_GUIDE**: `/Users/kushagradhawan/Code/EXAMPLES_GUIDE.md`
- **DESIGN_GUIDE**: `/Users/kushagradhawan/Code/DESIGN_GUIDE.md`
- **kookie-rules.mdc**: `/Users/kushagradhawan/Code/kookie-ui/apps/docs/.cursor/kookie-rules.mdc`
