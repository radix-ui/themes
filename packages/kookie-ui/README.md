# Kookie UI

A comprehensive React component library and design system, forked from [Radix UI Themes](https://github.com/radix-ui/themes) with enhancements and customizations.

## Installation

```bash
npm install @kushagradhawan/kookie-ui
# or
pnpm add @kushagradhawan/kookie-ui
# or
yarn add @kushagradhawan/kookie-ui
```

## Quick Start

### 1. Import the CSS

Import the CSS file in your app root:

```tsx
import '@kushagradhawan/kookie-ui/styles.css';
```

### 2. Wrap your app with Theme

```tsx
import { Theme } from '@kushagradhawan/kookie-ui';

export default function App() {
  return (
    <Theme>
      <div>Your app content</div>
    </Theme>
  );
}
```

### 3. Start using components

```tsx
import { Button, Flex, Text } from '@kushagradhawan/kookie-ui';

export default function MyComponent() {
  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Kookie UI!</Text>
      <Button>Click me</Button>
    </Flex>
  );
}
```

## What's Different from Radix UI Themes?

Kookie UI includes all the components and functionality of Radix UI Themes, plus:

- Enhanced component styling and behavior
- Bug fixes and improvements (like the DropdownMenu.TriggerIcon sizing fix)
- Custom branding and design tokens
- Additional features and optimizations

## Getting Updates

Kookie UI follows semantic versioning and is updated frequently:

- **Patch versions** (0.1.0 → 0.1.1): Bug fixes, small improvements
- **Minor versions** (0.1.x → 0.2.0): New features, enhancements
- **Major versions** (0.x.x → 1.0.0): Breaking changes

### Stay Updated

```bash
# Check for updates
npm outdated @kushagradhawan/kookie-ui

# Update to latest patch version
npm update @kushagradhawan/kookie-ui

# Update to latest version (including minor/major)
npm install @kushagradhawan/kookie-ui@latest
```

### Version Pinning Strategies

```json
{
  "dependencies": {
    // Auto-update patches only (recommended for stability)
    "@kushagradhawan/kookie-ui": "~0.1.0",

    // Auto-update minor versions (get new features)
    "@kushagradhawan/kookie-ui": "^0.1.0",

    // Pin to exact version (maximum stability)
    "@kushagradhawan/kookie-ui": "0.1.0"
  }
}
```

## Documentation

Since Kookie UI maintains API compatibility with Radix UI Themes, you can refer to the comprehensive [Radix UI Themes documentation](https://radix-ui.com/themes/docs) for component usage, props, and examples.

For Kookie UI specific changes and enhancements, see our [GitHub repository](https://github.com/kushagradhawan/kookie-ui).

## License

MIT License - see [LICENSE](./LICENSE) for details.

This project is a fork of [Radix UI Themes](https://github.com/radix-ui/themes). Original work Copyright (c) 2023 WorkOS.

## Contributing

Contributions are welcome! Please see our [contributing guidelines](https://github.com/kushagradhawan/kookie-ui/blob/main/CONTRIBUTING.md) for details.

## Support

- [GitHub Issues](https://github.com/kushagradhawan/kookie-ui/issues)
- [Discussions](https://github.com/kushagradhawan/kookie-ui/discussions)
