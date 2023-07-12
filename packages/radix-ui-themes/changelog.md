# Changelog

## 0.0.27

**Warning!** This release contains some breaking changes.

- General:
  - [**Breaking**] `[data-rui-root]` is now `.radix-themes`
  - `rui-` prefixes are now `rt-` prefixes (could be breaking if you rely on internal stuff)
- `Select`: Tweak icon gap
- `Card`: Add built-in negative margin support to ghost cards

## 0.0.26

- `Callout`: New component
- `Card`: New component
- `ContextMenu`/`DropdownMenu`: Fix link items (`<DropdownMenuItem asChild><a>…`)

## 0.0.25

- General:
  - Create new static context on `[data-rui-root]` so overlayed components work correctly out of the box
  - Fix `--color-surface-1` value in nested themes
- `Button`, `IconButton`: Tweak ghost variant sizing
- `Badge`: Scale based on font-size/line-height
- `Heading`: Fix leading-trim regression

## 0.0.24

- General:
  - Fix Context issues in Next.js RSC component. This was fixed using proper module resolution using `exports` field in `package.json`, it seems without it it's confusing Next.

## 0.0.23

- `DropdownMenu`, `ContextMenu`: Improve experience using scroll margins
- `Select`:
  - Fix issue with scrollarea integration messing up scroll position
  - Improve experience using scroll margins
- `Button`, `IconButton`: Improve balancing using built-in negative margins
- `Checkbox`: Fix radius regression
- Typography:
  - Remove `--default-font-size-adjust`
  - Remove `--heading-font-weight`
  - Fix `--default-font-style` value
  - Fix `--heading-font-style` value
- General:
  - Use naming convention for internal CSS variables

## 0.0.22

This update is all about tokens!

- `--fs-` tokens renamed to long-form `--font-size-`
- `--br-` tokens renamed to long-form `--radius-`
  - [**Breaking**] The border radius scale has been reworked to be more explicit:
    - The `"full"` radius now is a multiplier of `2` which avoids big panels to become circles
    - Raw border radius tokens have been removed, instead opt-into full radius using `--radius-full` in a `max` CSS function
- Implement the entire token suite for font sizes, line heights, letter-spacings, leading-trim, font-weight, font-families, etc

## 0.0.21

- General:
  - Fix missing export for tooltip prop defs

## 0.0.20

- General:
  - [**Breaking**] Add missing / rename wrong prop defs

## 0.0.19

**Warning!** This release contains some breaking changes.

- `Sup`: [**Breaking**] This component was removed
- `Link`: Now extends `Text` and supports all its props except `align`
- `Button`, `IconButton`: Add `asChild` support (for analogous use of `<Button asChild><a>…`)
- `Blockquote`: Now extends `Text` and supports all its props except `align`
- `Heading`: Add `weight` support
- General:
  - Use local icons internally instead of Radix icons to avoid package bloat
  - [**Breaking**] Rework exposed props definitions

## 0.0.18

**Warning!** This release contains some breaking changes.

- `RadixThemesProvider`: [**Breaking**] The component was removed, only `Theme` is required now
- `Heading`: Improve types output slightly
- `Container`, `Section`: Add all layout props
- General:
  - Improve `::selection` color
  - Add `auto` support in margin values

## 0.0.17

**Warning!** This release contains some breaking changes.

- `Provider`:
  - [**Breaking**] The component was renamed to `RadixThemesProvider`
- `ThemeConfig`:
  - [**Breaking**] The component was renamed to `Theme`
  - [**Breaking**] The `mode` prop was renamed to `appearance`
  - Now live-reloads correctly when changing a prop in JSX
- `Heading`: Add `as` prop for quick level change (allows `h1` to `h6`)
- `Text`:
  - Add `as` prop for specific quick change (allows `span` (default), `div` and `p`)
  - [**Breaking**] Now renders a `span` by default (instead of `p`).
    - Most of your usages of `Text` should be replaced by `<Text as="p">`
    - Your usages of `<Text asChild><span>…` should be replaced simply by `<Text>…`
    - Your usages of `<Text asChild><span>…` should be replaced simply by `<Text>…`
- `DropdownMenu`, `ContextMenu`:
  - [**Breaking**] The `mode` prop on `Content` was removed
  - Ensure extra left padding on items only when checkable items are present in the menu
- `Select`:
  - [**Breaking**] The `mode` prop on `Content` was removed
  - Fix `Content` type (remove wrong `size` prop, exists on `Root`, not on `Content`)
- `AlertDialog`, `Dialog` `HoverCard`, `Popover`:
  - [**Breaking**] The `mode` prop on `Content` was removed

## 0.0.16

- `Dialog`, `AlertDialog`: Fix overlay color when `mode` is set
- `Select`:
  - Add `placeholder` styling
  - Add internal `ScrollArea` to provide overflow affordance
  - Adjust `disabled` item color
- `DropdownMenu`, `ContextMenu`:
  - Add internal `ScrollArea` to provide overflow affordance
  - Adjust `disabled` item color
- `Text`: Fix `trim` for non-defined sizes
- General:
  - Popper components, default `collisionPadding` to `10` for consistency
  - Fix responsive styles bug (output order)

## 0.0.15

- `Slider`: Fix `size="1"` thumb not showing

## 0.0.14

- General:
  - Ensure all arbitrary px values are also scaled (line-heights, etc)
  - Put popper animations behind `prefers-reduced-motion` media query
- `ThemePanel`: Add "copy theme config" functionality
- `Badge`:
  - Add `solid` variant
  - Add `radius` support
- `Separator`: Handle `color` more simply (default to `color="gray"` like `Badge`)
- `Heading`:
  - Add `align` support
  - Add `highContrast` support
- `Text`:
  - Add `highContrast` support
  - Don't set default `font-weight` anymore (now inherits by default)
  - No default `size` anymore (now inherits by default)
- `Link`:
  - Don't set default `font-weight` anymore (now inherits by default)

## 0.0.13

**Warning!** This release contains lots of breaking changes.

- `AlertDialog`, `Dialog`, `ContextMenu`, `DropdownMenu`, `HoverCard`, `Popover`, `Select`: Add new `mode` prop to `Content` part
- General:
  - [**Breaking**] `ThemeConfig` is now mandatory
  - All tokens are now scoped to the root `ThemeConfig` component
  - All config values are now explicitly set in the DOM (no more implied defaults in CSS).
  - [**Breaking**] This also removed the need for the intermediary `--natural-gray` scale.
  - [**Breaking**] Default prop value names have been renamed throughout (i.e. `defaultAvatarSize` => `avatarSizeDefault`)
- `ThemeConfig`:
  - [**Breaking**] `darkMode` boolean prop was replaced with new `mode` enum prop (values: `light` | `dark` | `invert`)
  - You can now nest `ThemeConfig` components:
    - Theme config inherits from the parent config by default. New values can be passed to override.
    - This can be used to switch sections from light to dark mode (or automatically with `invert`)
    - It can also be used to make different sections use different accent scales, or any other config value
- New `ThemePanel` component to tweak the theme option live
  - Drop it into your own app anywhere under the root `ThemeConfig`

## 0.0.12

- `AlertDialog`, `Dialog`, `ContextMenu`, `DropdownMenu`, `HoverCard`, `Popover`, `Select`, `Tooltip`: Expose portal `container` prop

## 0.0.11

**Warning!** This release contains lots of breaking changes.

- `Select`:
  - [**Breaking**] API is now more open with `Trigger` and `Content` part
- `DropdownMenu` / `ContextMenu`:
  - [**Breaking**] style props (`size`, `variant`, `color`) now passed to `Content`, no need to pass again to `SubContent`
  - `Item` now supports `color` too
- `Dialog`: Now always `modal`
- `Slider`: Fix `key` bug
- `Link`:
  - [**Breaking**] Bring back `highContrast` instead of `variant="high-contrast"`
- General:
  - [**Breaking**] No more `-mono` variants on any components and added `highContrast` instead
    - Note: The old `-mono` look can usually b achieved now with `color="gray"` and `highContrast`
  - [**Breaking**] `subtle` variants are now named `soft` everywhere

## 0.0.10

- Fix build issue with new `ThemeConfig` file

## 0.0.9

**Warning!** This release contains lots of breaking changes.

- `Container`: Add `width: 100%` to ensure it fills its parent
- `Avatar`: `fallback` is now a required prop (removed default person icon)
- General:
  - [**Breaking**] Update to latest Radix Colors (new color variable naming convention)
  - [**Breaking**] Update Radix Themes colors to follow same convention
  - [**Breaking**] "color" scale is now called "accent" scale (e.g. in CSS variables, in theme configuration, etc.)
  - Add new `--accent-9-contrast` step to account for text color on "solid" background (step 9)
  - [**Breaking**] Prefixed all color aliases with `--color-` (e.g. `--panel` is now `--color-panel`)
  - [**Breaking**] Border radius tokens:
    - (e.g. `--br-3`) are now the dynamic values (i.e. based on global/local radius config)
    - the raw (static) values are now suffixed with `-raw` (e.g. `--br-3-raw`)
    - max constraint should now be applied on a case by case locally (not baked into the tokens anymore)
  - [**Breaking**] Button radius is now called radius
  - [**Breaking**] Scaling values have changed from names (like "larger") to % values (90%, 95%, 100%, 105%, 110%)
  - [**Breaking**] Overalled gray scale configuration: No more `--mono-*` scale, instead always use `--gray-*` scale
  - [**Breaking**] Overalled background/foreground feel options:
    - "Background feel" is now "Background color" and options are "auto" or "gray"
    - "Foreground feel" is now "Text color" and options are "auto" or "accent"
  - Add new `ThemeConfig` component to allow typesafe theme configuration

## 0.0.8

- `Link`: Remove `gap` prop. Can now be achived using `Flex asChild` composition instead.

## 0.0.7

- `Code`: Add `outline` and `outline-mono` variants
- `Box`, `Flex`, `Grid`: Add `asChild` support

## 0.0.6

- `Code`: Remove `highlighted` prop in favour of multiple new `variants`
- `Avatar`:
  - Add missing `defaultAvatarRadius` export
  - Fix loading state not showing fallback background

## 0.0.5

- Fix color resolving in nested light/dark sections (messed up after `0.0.4` changes)

## 0.0.4

- Update CSS tokens to ensure we have a default look and feel even without providing `data-*` theme configuration

## 0.0.3

- `Kbd`, `Slider`, `Switch`: Fix dark mode overrides to ensure correct resolving in nested light/dark sections
- Reorganise code/exports to suit Next.js 13's RSC support. Notable change for using compound components inside an RSC, you now need to import each part separately (e.g. `DropdownRoot` and `DropdownTrigger`, instead of `Dropdown.Root` and `Dropdown.Trigger`)

## 0.0.2

- All: expose discrete values / default values for props to be consumed in docs
- `Code`: Remove default `size`

## 0.0.1

- Isolate resets
