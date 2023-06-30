# Changelog

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
