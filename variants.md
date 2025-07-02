# Component Variant System Documentation

## Overview

Kookie UI is a fork of Radix Themes that maintains API compatibility while implementing a **systematic variant architecture**. This document outlines our comprehensive approach to component variants, panel background awareness, and the theme system.

## Design System Architecture

### Core Principles

1. **Systematic Color Usage**: Solid colors for opacity, alpha colors for transparency
2. **Panel Background Awareness**: All components adapt to theme transparency settings
3. **Consistent Variant Patterns**: Uniform implementation across all component types
4. **Granular Control**: Theme-level and component-level overrides
5. **Zero Breaking Changes**: Full backward compatibility maintained

### Variant Categories

Our design system supports **5 core variant types** with specific use cases:

## Variant Types

### 1. **Classic Variant** (3D Raised Style)

**Purpose**: Traditional embossed appearance with depth and tactile feedback
**Usage**: Professional applications, traditional interfaces that need classic depth
**Characteristics**:

- Complex layered box shadows for 3D raised appearance
- Simulated button press effect with padding shifts
- Accent-colored shadow system for branded depth effects
- Interactive states mimic physical button presses

```css
.rt-Component:where(.rt-variant-classic) {
  position: relative;
  top: -0.03em;
  color: var(--accent-a11);
  background-color: var(--accent-2);
  box-shadow: var(--component-classic-box-shadow);

  /* Active state simulates button press */
  &:where(:active) {
    padding-top: var(--active-padding-adjustment);
    padding-bottom: 0;
    box-shadow:
      inset 0 0.05em var(--black-a3),
      0 0 0 0.05em var(--accent-a7);
  }
}
```

### 2. **Solid Variant** (High Contrast)

**Purpose**: High-contrast, prominent elements
**Usage**: Primary actions, call-to-action buttons
**Characteristics**:

- Strong accent backgrounds (`accent-9`)
- High contrast text (`accent-contrast`)
- Bold, attention-grabbing

```css
.rt-Component:where(.rt-variant-solid) {
  background-color: var(--accent-9);
  color: var(--accent-contrast);
}
```

### 3. **Soft Variant** (Branded Subtlety)

**Purpose**: Subtle branded styling with accent colors
**Usage**: Secondary actions, themed components
**Characteristics**:

- Light accent backgrounds (`accent-3`/`accent-a3`)
- Panel background awareness
- Branded but not overwhelming

```css
.rt-Component:where(.rt-variant-soft) {
  /* Base: solid accent for solid panels */
  background-color: var(--accent-3);

  /* Translucent panel override */
  :where([data-panel-background='translucent']) & {
    background-color: var(--accent-a3);
    backdrop-filter: var(--backdrop-filter-components);
  }
}
```

### 4. **Surface Variant** (Neutral Surfaces)

**Purpose**: Neutral surface styling for containers and forms
**Usage**: Cards, form inputs, neutral backgrounds
**Characteristics**:

- Neutral surface colors (`--color-surface` or `--color-panel`)
- Panel background awareness
- Professional, non-branded appearance

```css
.rt-Component:where(.rt-variant-surface) {
  background-color: var(--color-surface);

  /* Automatic panel awareness through token system */
  :where([data-panel-background='translucent']) & {
    backdrop-filter: var(--backdrop-filter-components);
  }
}
```

### 5. **Outline Variant** (Minimal Borders)

**Purpose**: Minimal styling with border-only design
**Usage**: Secondary buttons, clean form inputs
**Characteristics**:

- Transparent backgrounds
- Accent borders (`accent-7`/`accent-a7`)
- **No backdrop filter** for true transparency

```css
.rt-Component:where(.rt-variant-outline) {
  background-color: transparent;
  box-shadow: inset 0 0 0 1px var(--accent-7);

  /* Panel awareness without backdrop blur */
  :where([data-panel-background='translucent']) & {
    box-shadow: inset 0 0 0 1px var(--accent-a7);
  }
}
```

### 6. **Ghost Variant** (Ultra Minimal)

**Purpose**: Invisible until interaction
**Usage**: Minimal interfaces, floating labels
**Characteristics**:

- Completely transparent by default
- Styling appears only on hover/focus
- Ultra-clean, minimal design

```css
.rt-Component:where(.rt-variant-ghost) {
  background-color: transparent;

  /* Show styling on interaction */
  &:where(:hover, :focus-within) {
    background-color: var(--accent-2);

    :where([data-panel-background='translucent']) & {
      background-color: var(--accent-a2);
      backdrop-filter: var(--backdrop-filter-components);
    }
  }
}
```

## Panel Background System

### Theme-Level Control

The Theme component provides global panel background control:

```jsx
<Theme panelBackground="solid">      {/* All components use solid colors */}
<Theme panelBackground="translucent"> {/* All components use alpha colors + blur */}
```

### Component Categories by Surface Type

Our design system categorizes components into three distinct groups based on their semantic purpose and how they handle color variants:

#### **Interactive Components** (Always Accent-Colored)

Interactive components use accent colors across **ALL variants** including surface variants, since they represent user actions and need consistent branding.

**Components**: Button, IconButton, Badge, Switch, Checkbox (when checked), Radio (when checked), Slider (active portions)

**Surface Variant Behavior**:

- **Button/Badge surface**: `background-color: var(--accent-2)` with `var(--accent-7)` border
- **Soft variant**: `background-color: var(--accent-3)`
- **Outline variant**: `box-shadow: inset 0 0 0 1px var(--accent-7)`
- **Ghost variant**: Shows `background-color: var(--accent-2)` on hover
- **Classic variant**: 3D raised effect with accent colors and accent-based shadows

```css
/* Interactive components ALWAYS use accent colors */
.rt-Button:where(.rt-variant-surface) {
  background-color: var(--accent-2); /* NOT neutral gray */
  box-shadow: inset 0 0 0 1px var(--accent-7);
  color: var(--accent-a11);
}
```

#### **Container Components** (Use Panel Colors - Neutral)

Container components use neutral panel colors to provide surfaces that don't compete with content.

**Components**: Card, Sidebar (container), Dialog, Popover, HoverCard, Tooltip

**Surface Variant Behavior**:

- **Card/Sidebar surface**: `background-color: var(--color-panel)` (neutral gray)
- **Classic variant**: 3D raised with neutral gray colors
- **Soft variant**: Light accent tint for branded containers only

```css
/* Container components use neutral panel colors */
.rt-Card:where(.rt-variant-surface) {
  background-color: var(--color-panel); /* Neutral gray */
  color: var(--gray-12);
}
```

#### **Form Components** (Use Surface Colors - Neutral by Default)

Form components use neutral surface colors by default, with accent colors appearing only on interaction/focus states or in branded variants.

**Components**: TextField, TextArea, Select, CheckboxCards, RadioCards

**Variant Behaviors**:

- **Surface variant**: `background-color: var(--color-surface)` (neutral gray, cleanest appearance)
- **Classic variant**: **3D inset effect** with neutral background and professional depth
- **Soft variant**: `background-color: var(--accent-3)` (branded input with accent tint)
- **Outline variant**: Transparent with accent border appearing on focus
- **Ghost variant**: Transparent until interaction, then shows accent background

#### **Classic Variant for Forms** (3D Inset Design)

The classic variant for form components uses a **3D inset effect** - the visual opposite of buttons' raised 3D appearance. This creates the impression that form inputs are "receptacles" or "wells" where users input data.

**Design Principles**:

- **Inset appearance**: Form inputs should appear recessed/sunken, not raised
- **Neutral colors**: Uses gray-based colors, not accent colors (professional, non-distracting)
- **Subtle depth**: More restrained than interactive components - forms need to be clean and readable
- **Accent focus ring**: Accent color appears only on focus/interaction states
- **Consistent constants**: Uses same shadow/border constants as buttons but with different calculations

**Technical Implementation**:

```css
/* Classic variant - 3D inset form inputs */
.rt-TextFieldRoot:where(.rt-variant-classic) {
  position: relative;
  /* Subtle inset positioning */
  top: calc(var(--classic-elevation-offset) / 3);

  background-color: var(--color-surface);
  color: var(--gray-12);

  /* 3D inset effect using layered shadows */
  box-shadow:
    /* Inner shadow for depth */
    inset 0 calc(var(--classic-border-width) * 2) calc(var(--classic-shadow-blur-medium) / 1.5)
      rgba(0, 0, 0, 0.08),
    /* Border definition */ inset 0 0 0 var(--classic-border-width) var(--gray-a5),
    /* Outer subtle lift */ 0 var(--classic-shadow-offset-y)
      calc(var(--classic-shadow-blur-small) / 2) rgba(0, 0, 0, 0.04);

  /* Reduced inset on hover - more accessible */
  &:where(:hover) {
    box-shadow:
      inset 0 var(--classic-border-width) calc(var(--classic-shadow-blur-medium) / 2)
        rgba(0, 0, 0, 0.06),
      inset 0 0 0 var(--classic-border-width) var(--gray-a4),
      0 var(--classic-shadow-offset-y) calc(var(--classic-shadow-blur-small) / 2)
        rgba(0, 0, 0, 0.04);
  }

  /* Focus state with accent ring but minimal inset */
  &:where(:focus-within) {
    box-shadow:
      inset 0 var(--classic-border-width) calc(var(--classic-shadow-blur-small) / 2)
        rgba(0, 0, 0, 0.04),
      0 0 0 2px var(--focus-8);
  }
}

/* Surface variant - neutral and clean */
.rt-TextFieldRoot:where(.rt-variant-surface) {
  background-color: var(--color-surface); /* Neutral gray */
  color: var(--gray-12);
}

/* Soft variant allows branding */
.rt-TextFieldRoot:where(.rt-variant-soft) {
  background-color: var(--accent-3); /* Branded */
  color: var(--accent-12);
}
```

**Visual Hierarchy**:

- **Raised** (Buttons/Badges): Command attention, call-to-action
- **Flat** (Surface variants): Clean, professional, non-intrusive
- **Inset** (Classic forms): Receptive, inviting input, tactile depth

### Surface Token Systems

#### **Panel Tokens** (Container Surfaces)

```css
/* Base tokens */
--color-panel-solid: var(--gray-2);
--color-panel-translucent: rgba(255, 255, 255, 0.7);

/* Dynamic remapping */
.radix-themes {
  &:where([data-panel-background='solid']) {
    --color-panel: var(--color-panel-solid);
  }
  &:where([data-panel-background='translucent']) {
    --color-panel: var(--color-panel-translucent);
  }
}
```

#### **Surface Tokens** (Form Surfaces)

```css
/* Base tokens */
--color-surface-solid: var(--gray-1);
--color-surface-translucent: rgba(255, 255, 255, 0.85);

/* Dynamic remapping */
.radix-themes {
  &:where([data-panel-background='solid']) {
    --color-surface: var(--color-surface-solid);
  }
  &:where([data-panel-background='translucent']) {
    --color-surface: var(--color-surface-translucent);
  }
}
```

## Component-Level Overrides

### Individual Component Control

Components support `panelBackground` prop to override theme settings:

```jsx
<Theme panelBackground="translucent">
  <Button variant="soft">Uses theme (translucent)</Button>
  <Button variant="soft" panelBackground="solid">
    Override to solid
  </Button>
  <TextField variant="surface" panelBackground="solid">
    Solid form input
  </TextField>
</Theme>
```

### Implementation Pattern

```css
.rt-Component:where(.rt-variant-soft) {
  /* Base state */
  background-color: var(--accent-3);

  /* Theme-level override (lower specificity) */
  :where([data-panel-background='translucent']) & {
    background-color: var(--accent-a3);
    backdrop-filter: var(--backdrop-filter-components);
  }

  /* Component-level override (higher specificity) */
  &:where([data-panel-background='solid']) {
    background-color: var(--accent-3);
    backdrop-filter: none;
  }

  &:where([data-panel-background='translucent']) {
    background-color: var(--accent-a3);
    backdrop-filter: var(--backdrop-filter-components);
  }
}
```

## Variant Usage Guidelines

### When to Use Each Variant

| Variant     | Interactive Components     | Container Components   | Form Components       |
| ----------- | -------------------------- | ---------------------- | --------------------- |
| **Classic** | 3D raised buttons/badges   | Traditional cards      | Traditional inputs    |
| **Solid**   | Primary actions            | N/A                    | N/A                   |
| **Soft**    | Secondary actions          | Branded containers     | Branded forms         |
| **Surface** | **Accent-colored** buttons | **Neutral** containers | **Neutral** forms     |
| **Outline** | Minimal buttons            | N/A                    | Clean, minimal forms  |
| **Ghost**   | Subtle interactions        | N/A                    | Floating label inputs |

### Color Usage by Component Type

| Variant     | Interactive (Button/Badge) | Container (Card/Sidebar) | Form (TextField/TextArea/Select) |
| ----------- | -------------------------- | ------------------------ | -------------------------------- |
| **Classic** | `--accent-2` + 3D raised   | `--gray-2` + 3D raised   | `--color-surface` + 3D inset     |
| **Solid**   | `--accent-9` + contrast    | N/A                      | N/A                              |
| **Soft**    | `--accent-3` background    | `--accent-3` branded     | `--accent-3` branded             |
| **Surface** | `--accent-2` + border      | `--color-panel` neutral  | `--color-surface` neutral        |
| **Outline** | `--accent-7` border        | N/A                      | `--accent-7` focus               |
| **Ghost**   | `--accent-2` on hover      | N/A                      | `--accent-2` on hover            |

**Key Distinction**: Interactive components use accent colors even in "neutral" variants (surface), while containers and forms use true neutral colors for their surface variants.

### Component Support Matrix

| Component      | Classic | Solid | Soft | Surface | Outline | Ghost |
| -------------- | ------- | ----- | ---- | ------- | ------- | ----- |
| **Button**     | ✅      | ✅    | ✅   | ✅      | ✅      | ✅    |
| **IconButton** | ✅      | ✅    | ✅   | ✅      | ✅      | ✅    |
| **TextField**  | ✅      | ❌    | ✅   | ✅      | ✅      | ✅    |
| **TextArea**   | ✅      | ❌    | ✅   | ✅      | ✅      | ✅    |
| **Select**     | ✅      | ❌    | ✅   | ✅      | ✅      | ✅    |
| **Card**       | ✅      | ❌    | ✅   | ✅      | ❌      | ❌    |
| **Badge**      | ✅      | ✅    | ✅   | ✅      | ✅      | ✅    |
| **Sidebar**    | ❌      | ❌    | ✅   | ✅      | ❌      | ✅    |

## Implementation Status

### ✅ Complete (Panel Aware & Full Variant Support)

All components below have **COMPLETE** panel background awareness with both theme-level and component-level `panelBackground` prop support:

#### **Form Components**

- **TextField**: ✅ All 5 variants (classic, surface, soft, outline, ghost) + full panel awareness + component-level `panelBackground` prop + 3D inset classic variant using proper design system tokens
- **TextArea**: ✅ All 5 variants (classic, surface, soft, outline, ghost) + full panel awareness + component-level `panelBackground` prop + 3D inset classic variant using proper design system tokens (identical to TextField)
- **Select**: ✅ All 5 variants (classic, surface, soft, outline, ghost) + full panel awareness + component-level `panelBackground` prop + 3D inset classic variant using proper design system tokens + trigger styling identical to TextField + content styling consistent with base menu system

#### **Interactive Components**

- **Button**: ✅ All 6 variants (classic, solid, surface, soft, outline, ghost) + full panel awareness + component-level `panelBackground` prop + 3D raised classic variant + consistent icon sizing with content icon constants
- **IconButton**: ✅ All 6 variants (classic, solid, surface, soft, outline, ghost) + full panel awareness + component-level `panelBackground` prop + consistent icon sizing with content icon constants
- **Badge**: ✅ All 6 variants (classic, solid, surface, soft, outline, ghost) + full panel awareness + component-level `panelBackground` prop + 3D raised classic variant + ghost variant with reduced padding

#### **Container Components**

- **Sidebar**: ✅ Container and menu variants with component-level `panelBackground` support + Badge integration with automatic ghost variant defaults and size mapping

#### **System Components**

- **Theme**: ✅ Complete panel background system with theme-level control

### 🔄 In Progress

- **Switch**: Need panel background awareness
- **Checkbox, Radio**: Need variant expansion

### 🎯 Design System Achievements

#### **Icon Sizing Standardization**

- **Trigger Icons**: Centralized constants for dropdown/select chevrons (9-12px range)
- **Content Icons**: Standardized button/menu icon sizing with 1.175 multiplier (14-20px range)
- **Indicator Icons**: Consistent checkbox/radio/sub-trigger sizing (8-10px range)
- **Zero Magic Numbers**: All icon sizes use semantic constants from `constants.css`

#### **Color System Consolidation**

- **Panel Background Tokens**: Centralized opacity and mix percentage constants
- **Classic Shadow System**: Eliminated hardcoded rgba values, unified approach across TextField/TextArea
- **Color Mix Percentages**: Standardized 25%/65%/75% constants across shadow and border systems

### 📋 Planned

- **Card**: Consider outline variant
- **All form components**: Standardize variant support
- **Documentation**: Component-specific variant guides

## Sidebar Badge Integration

### **Smart Badge Defaults**

The Sidebar component provides intelligent badge integration with automatic styling:

```tsx
// Simple string - automatically gets soft variant + sidebar size
<Sidebar.MenuButton badge="New">Dashboard</Sidebar.MenuButton>

// Object with automatic defaults
<Sidebar.MenuButton badge={{ content: "Beta" }}>Analytics</Sidebar.MenuButton>

// Override when needed for emphasis
<Sidebar.MenuButton badge={{ content: "99+", variant: "solid", color: "red" }}>
  Notifications
</Sidebar.MenuButton>
```

### **Automatic Features**

- **Soft variant default**: All sidebar badges use subtle soft styling by default for better visibility
- **Size mapping**: Badge size automatically matches sidebar size (`sidebar="1"` → `badge="1"`)
- **Reduced padding**: Ghost badges get minimalist padding when explicitly used
- **Override support**: Full Badge API available when emphasis is needed

### **Benefits**

- **Visual hierarchy**: Soft badges provide subtle but clear information display
- **Responsive scaling**: Badges automatically scale with sidebar size changes
- **Minimal configuration**: Most badges need only content string
- **Flexible overrides**: Full control available when needed

## Visual Benefits

### Solid Panel Background

- **Better contrast** with solid color scales
- **Improved readability** on opaque backgrounds
- **Consistent brand presence** without transparency artifacts

### Translucent Panel Background

- **Modern glass effects** with alpha transparency
- **Backdrop blur compatibility** for advanced UI aesthetics
- **Layered visual hierarchy** through transparency

## Migration Guide

### For Existing Components

1. **Identify current variant behavior**
2. **Add panel background awareness**
3. **Implement missing variants**
4. **Test across both panel modes**
5. **Add component-level override support**

### Breaking Changes

**None** - All changes maintain full API compatibility. Existing code continues to work unchanged while gaining enhanced functionality.

---

This systematic approach provides a **complete, flexible, and future-proof variant system** that scales across all component types while maintaining design consistency and user choice.
