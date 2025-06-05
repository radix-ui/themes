# Changelog

## 0.1.8

### 🖼️ New Image Component

- **Added comprehensive Image component**: Framework-agnostic image component with full prop-based styling
  - **Object fit control**: `fit` prop with values `cover`, `contain`, `fill`, `scale-down`, `none`
  - **Shadow system**: `shadow` prop with values `1` through `6` using design system shadow tokens
  - **Radius support**: Fully responsive to theme radius settings and explicit `radius` prop
  - **Responsive sizing**: Support for `width`, `height`, `maxWidth`, `maxHeight` with responsive objects
  - **Native lazy loading**: `loading="lazy"` by default with option for `loading="eager"`
  - **Accessibility ready**: Proper alt text handling and all standard img attributes
- **Shadow prop system**: New `shadow.props.ts` with design system integration
- **Enhanced CSS utilities**: Added object-fit and box-shadow utilities to component system

### 🔧 Font Rendering Fixes

- **Fixed Text component font inheritance**: Added explicit `font-family: var(--default-font-family)` to ensure Geist font renders consistently
  - Resolves issue where Text components wouldn't show Geist font when used as a library
  - Now consistent with Button and other components that explicitly declare font-family
  - Better fallback handling for environments without proper Theme wrapper

### 📚 Documentation & Examples

- **Comprehensive ImageExample**: Added playground examples showcasing all Image component features
  - Basic usage patterns (landscape, portrait, square formats)
  - Object fit demonstrations with visual comparisons
  - Shadow variations across all shadow levels
  - Radius options from theme integration
  - Responsive sizing patterns and constraints
  - Real-world usage examples (hero images, cards, thumbnails)

### 🎨 Theme Integration

- **Improved radius inheritance**: Fixed Image component to properly inherit theme radius scaling
  - Responds correctly to ThemePanel radius changes
  - Uses `max(var(--radius-3), var(--radius-full))` pattern consistent with other components
  - Proper CSS variable cascade from theme context

## 0.1.6

### 🚀 Production Readiness Improvements

- **BREAKING**: IconButton now requires accessibility attributes (`aria-label`, `aria-labelledby`, or visible text children)
- **Fixed critical disabled state issues**:
  - Added `cursor: not-allowed` to all disabled button variants
  - Added `pointer-events: none` to prevent interaction with disabled buttons
  - Improved visual feedback for disabled states across all button types

### 🎨 Button Styling Enhancements

- **Fixed Toggle Button pressed state**: Now properly scales with `transform: scale(0.98)` like active states
- **Fixed Toggle Button disabled state**: Disabled toggle buttons now appear grayed out instead of retaining color
- **Enhanced hover/active state consistency** across all button variants
- **Added reduced motion support**: Respects `prefers-reduced-motion: reduce` for transforms and animations
- **Improved CSS specificity**: Removed `!important` declarations and restructured selectors for better maintainability

### ♿ Accessibility Enhancements

- **Enhanced loading state accessibility**:
  - Added `aria-busy="true"` to loading buttons
  - Added `aria-describedby` linking to loading announcement
  - Screen readers now announce "Loading, please wait..." during loading states
  - Improved spinner accessibility with proper ARIA attributes
- **Better focus management**: Enhanced keyboard navigation support
- **WCAG compliance**: All button components now meet accessibility guidelines

### 🎛️ Design System Improvements

- **New transition token system**: Added comprehensive transition and timing tokens
  - Duration tokens: `--duration-1` through `--duration-5` (100ms to 500ms)
  - Easing tokens: `--ease-1` through `--ease-5` with different curves
  - Component-specific transitions: `--transition-button`, `--transition-focus`
  - Automatic reduced motion support via `prefers-reduced-motion: reduce`
- **Enhanced shadow tokens**: Improved button shadow consistency with better contrast
  - Updated `--shadow-3` for better visual hierarchy in light and dark themes
  - Better border visibility in both standard and dark modes

### 🔧 Technical Improvements

- Improved CSS specificity and state management for button interactions
- Better disabled state styling with proper visual hierarchy
- Enhanced development warnings for accessibility compliance
- Optimized button interaction performance
- Fixed TypeScript errors in ToggleIconButton component
- Updated examples with proper accessibility attributes
- **Fixed TypeScript consistency**: BaseButton now uses ComponentPropsWithout pattern like all other components
- **Code quality improvements**: Fixed trailing commas and formatting in checkbox/radio card components

### 📚 Example Updates

- **ToggleButtonExample**: Added comprehensive accessibility attributes to all icon buttons
- **Enhanced interactive examples**: Better state management and visual feedback
- **Improved layout organization**: Cleaner grid layouts and better visual hierarchy

## 0.1.4

- Initial release of Kookie UI
- Modern React component library with beautiful design tokens
- Polymorphic component support with `as` prop
- Toggle button components with visual feedback
- Full-width button support
- Comprehensive theming system based on Radix Colors
- TypeScript support with complete type definitions

## 0.1.3

- Enhanced hover variants for improved component interactions
- Bumped TypeScript to latest version for better type safety and developer experience
- Improved overall component consistency and visual polish

## 0.1.2

- Modified classic variants for Button, TextArea, TextField, Select, Dropdown, and Card components
- Updated radius token values across the design system

## 0.1.1

- Made Geist the default font family across all components
- Added new Text size = 0 (10px) for label usage

## 0.1.0

- Initial foundation and core component architecture
- Basic component library setup
