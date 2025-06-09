# Kookie UI Documentation - Unified Playground + MDX Site

## Overview

Create a **unified Next.js + MDX documentation site** that includes both a global playground and individual component playgrounds. Move the current playground into the docs site as the "Global Playground" while adding focused component playgrounds for each component.

---

## Phase 1: Unified Documentation Site Setup

**Timeline: 1-2 days**

### 1.1 Create Unified Documentation Site

- [ ] Create `apps/docs` directory 
- [ ] Initialize Next.js 14 with App Router:
  ```bash
  cd apps && npx create-next-app@latest docs --typescript --tailwind --app --src-dir
  ```
- [ ] Install MDX dependencies:
  ```bash
  cd docs
  pnpm add @next/mdx @mdx-js/loader @mdx-js/react
  pnpm add @types/mdx remark-gfm rehype-highlight
  pnpm add lucide-react
  ```

### 1.2 Move Current Playground Into Docs Site

- [ ] **Move** `apps/playground/components/*` → `apps/docs/src/components/playground/`
- [ ] Create global playground route: `apps/docs/src/app/playground/page.tsx`
- [ ] Import and display comprehensive examples:
  ```typescript
  // apps/docs/src/app/playground/page.tsx
  import { DropdownMenuExample } from '@/components/playground/DropdownMenuExample'
  import { ButtonExample } from '@/components/playground/ButtonExample'

  export default function PlaygroundPage() {
    return (
      <div className="container mx-auto py-8">
        <h1>Global Playground</h1>
        <Tabs defaultValue="button">
          <TabsList>
            <TabsTrigger value="button">Button</TabsTrigger>
            <TabsTrigger value="dropdown">DropdownMenu</TabsTrigger>
            {/* All components */}
          </TabsList>
          <TabsContent value="button">
            <ButtonExample />
          </TabsContent>
          <TabsContent value="dropdown">
            <DropdownMenuExample />
          </TabsContent>
        </Tabs>
      </div>
    )
  }
  ```

### 1.3 Component-Specific Playgrounds

- [ ] Create individual component playground sections:
  ```typescript
  // apps/docs/src/components/component-playground.tsx
  export function ComponentPlayground({ 
    component,
    examples 
  }: {
    component: string
    examples: React.ComponentType[]
  }) {
    return (
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          {component} Playground
        </h3>
        <Tabs defaultValue="basic">
          <TabsList>
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="variants">All Variants</TabsTrigger>
            <TabsTrigger value="interactive">Interactive</TabsTrigger>
          </TabsList>
          {examples.map((Example, i) => (
            <TabsContent key={i} value={`example-${i}`}>
              <Example />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    )
  }
  ```

### 1.4 Update Monorepo Configuration

- [ ] Remove old playground from `turbo.json`
- [ ] Add docs app to `turbo.json`:
  ```json
  {
    "docs:dev": {
      "cache": false,
      "persistent": true
    },
    "docs:build": {
      "dependsOn": ["build"],
      "outputs": [".next/**", "!.next/cache/**"]
    }
  }
  ```
- [ ] Update root package.json scripts:
  ```json
  {
    "docs": "pnpm --filter docs dev",
    "docs:build": "pnpm --filter docs build",
    "playground": "pnpm docs" // Redirect to docs site
  }
  ```

---

## Site Structure: Global + Component Playgrounds

### 1. Global Playground (`/playground`)
```typescript
// Your current comprehensive playground - MOVED to docs site
export function GlobalPlayground() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1>Kookie UI Playground</h1>
      <p>Comprehensive testing environment for all components</p>
      
      <Tabs defaultValue="button">
        <TabsList>
          <TabsTrigger value="button">Button</TabsTrigger>
          <TabsTrigger value="dropdown">DropdownMenu</TabsTrigger>
          <TabsTrigger value="textfield">TextField</TabsTrigger>
          {/* All components */}
        </TabsList>
        
        <TabsContent value="button">
          <ButtonExample /> {/* Your existing comprehensive example */}
        </TabsContent>
        
        <TabsContent value="dropdown">
          <DropdownMenuExample /> {/* Your existing comprehensive example */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

### 2. Component Documentation (`/components/button`)
```mdx
# Button

Displays a button or a component that looks like a button.

## Quick Example

<ComponentExample>
  <Button>Click me</Button>
</ComponentExample>

## Installation

```bash
pnpm add @kushagradhawan/kookie-ui
```

## Component Playground

<ComponentPlayground 
  component="Button"
  examples={[
    ButtonBasicExample,
    ButtonVariantsExample,
    ButtonInteractiveExample
  ]}
/>

## All Variants & States

<ComponentMatrix>
  <ButtonComprehensiveMatrix />
</ComponentMatrix>

## API Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'solid' \| 'soft' \| 'outline' \| 'ghost' | 'solid' | Visual style |

## Examples

### Basic Usage

<ComponentExample>
  <Button variant="solid">Primary Button</Button>
</ComponentExample>

### All Variants

<ComponentExample>
  <div className="flex gap-2">
    <Button variant="solid">Solid</Button>
    <Button variant="soft">Soft</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
</ComponentExample>
```

### 3. Navigation Between Playgrounds
```typescript
// Docs site navigation
const navigation = [
  {
    title: "Playground",
    href: "/playground", // Global playground
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "/components/button" }, // Individual playground + docs
      { title: "DropdownMenu", href: "/components/dropdown-menu" },
      // Each has its own focused playground
    ]
  }
]
```

---

## Phase 2: Extract and Organize Playground Components

**Timeline: 1-2 days**

### 2.1 Shared Playground Components

- [ ] Create reusable playground building blocks:
  ```typescript
  // apps/docs/src/components/playground/shared/
  export const ColorMatrix = ({ component, variant }) => {
    return (
      <Grid columns="6" gap="3">
        {colors.map(color => (
          <ComponentWrapper key={color} color={color}>
            {component}
          </ComponentWrapper>
        ))}
      </Grid>
    )
  }

  export const VariantMatrix = ({ component, variants }) => {
    return (
      <Flex gap="3">
        {variants.map(variant => (
          <ComponentWrapper key={variant} variant={variant}>
            {component}
          </ComponentWrapper>
        ))}
      </Flex>
    )
  }
  ```

### 2.2 Component-Specific Playgrounds

- [ ] Extract focused examples from comprehensive ones:
  ```typescript
  // apps/docs/src/components/playground/button/
  export const ButtonBasicExample = () => (
    <Button>Click me</Button>
  )

  export const ButtonVariantsExample = () => (
    <Flex gap="2">
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </Flex>
  )

  export const ButtonComprehensiveMatrix = () => (
    // Extract the comprehensive matrix from ButtonExample
    <ColorMatrix component={Button} variants={['solid', 'soft']} />
  )
  ```

### 2.3 Interactive Playground Features

- [ ] Add real-time prop editing:
  ```typescript
  export const InteractivePlayground = ({ component: Component }) => {
    const [variant, setVariant] = useState('solid')
    const [size, setSize] = useState('2')
    const [color, setColor] = useState('blue')

    return (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4>Controls</h4>
          <Select value={variant} onValueChange={setVariant}>
            <SelectItem value="solid">Solid</SelectItem>
            <SelectItem value="soft">Soft</SelectItem>
          </Select>
          {/* More controls */}
        </div>
        
        <div>
          <h4>Preview</h4>
          <Component variant={variant} size={size} color={color}>
            Example
          </Component>
        </div>
      </div>
    )
  }
  ```

---

## Phase 3: Enhanced Documentation Experience

**Timeline: 2-3 days**

### 3.1 Navigation & Search

- [ ] **Global Playground Link** - Quick access to comprehensive testing
- [ ] **Component-specific Playgrounds** - Focused development per component
- [ ] **Cross-linking** - Jump between global and component views

### 3.2 Copy-Paste Experience

- [ ] **Code examples** - Copy button on all examples
- [ ] **Live editing** - Modify examples in real-time
- [ ] **Export to playground** - Send configuration to global playground

### 3.3 Development Workflow Integration

- [ ] **Hot reloading** - Changes reflect immediately
- [ ] **Error boundaries** - Graceful error handling in playgrounds
- [ ] **Performance monitoring** - Track component performance

---

## Site Structure (Updated)

```
HelloKookie/
├── apps/
│   └── docs/                          # Unified documentation site
│       ├── src/
│       │   ├── app/
│       │   │   ├── playground/          # Global playground (moved from apps/playground)
│       │   │   │   └── page.tsx         # Comprehensive testing environment
│       │   │   ├── components/
│       │   │   │   ├── button/
│       │   │   │   │   └── page.mdx     # Button docs + component playground
│       │   │   │   └── dropdown-menu/
│       │   │   │       └── page.mdx     # DropdownMenu docs + component playground
│       │   │   └── layout.tsx
│       │   └── components/
│       │       ├── playground/          # Playground components (moved)
│       │       │   ├── ButtonExample.tsx
│       │       │   ├── DropdownMenuExample.tsx
│       │       │   ├── button/          # Component-specific playground pieces
│       │       │   │   ├── BasicExample.tsx
│       │       │   │   ├── VariantsExample.tsx
│       │       │   │   └── ComprehensiveMatrix.tsx
│       │       │   └── shared/          # Reusable playground utilities
│       │       │       ├── ColorMatrix.tsx
│       │       │       └── VariantMatrix.tsx
│       │       ├── component-example.tsx
│       │       ├── component-playground.tsx
│       │       └── code-block.tsx
│       ├── next.config.js
│       └── package.json
├── packages/
│   └── kookie-ui/
└── turbo.json
```

---

## Development Workflow

### Global Testing & Development
```bash
# Start docs site
pnpm docs

# Navigate to /playground
# Test all components together
# Comprehensive matrices and edge cases
```

### Component-Specific Development
```bash
# Same docs site
pnpm docs

# Navigate to /components/button
# Focused playground + documentation
# Individual component testing
```

### Documentation Writing
```bash
# Write MDX with embedded playgrounds
# Real examples from global playground
# Component-specific focused examples
```

---

## Benefits of Unified Approach

### For Development
- **One environment** - Everything in one place
- **Consistent experience** - Same UI patterns throughout
- **Easy navigation** - Jump between global and focused views
- **Reusable components** - Share playground pieces between global and component views

### For Documentation
- **Complete coverage** - Global overview + detailed component docs
- **Interactive examples** - Live playgrounds everywhere
- **Professional presentation** - Cohesive design system showcase
- **Easy maintenance** - One site to manage

### For Users
- **Quick overview** - Global playground for exploration
- **Focused learning** - Component-specific playgrounds for implementation
- **Copy-paste ready** - Examples that work immediately
- **Progressive disclosure** - Start simple, dive deep as needed

---

## Next Steps

1. **Create unified docs site** - Single Next.js app
2. **Move current playground** - Into `/playground` route of docs site
3. **Create component playgrounds** - Individual focused testing environments
4. **Add MDX documentation** - Component docs with embedded playgrounds
5. **Link everything together** - Seamless navigation between global and component views

This gives you the **ultimate development and documentation experience** - comprehensive testing environment combined with professional component documentation!

Want to start implementing this unified approach?
