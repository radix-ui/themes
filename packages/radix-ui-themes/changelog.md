# Changelog

## Up next

- `Blockquote`
  - Tweak spacing

## 0.0.43

- General:
  - Fix nested themes regression (recovering `:is(.dark, .dark-theme)` selector)

## 0.0.42

- General:
  - [**Breaking**] Fixed typo: `buttonPropsDefs` -> `buttonPropDefs`
  - Remove unneeded `:is(.dark, .dark-theme)` selector for dark mode colors, since we don't recommend wrapping the `html` element anymore
  - Tweak translucent panel color in light mode
  - Add a special `--gray-2-translucent` step for translucent panel color in dark mode
- `Avatar`:
  - Fix text fallback size regression
  - [**Breaking**] Don't default to `gray` color
- `Badge`:
  - [**Breaking**] Don't default to `gray` color
  - Recover missing `solid` high-contrast for all colors
- `Blockquote`:
  - Tweak the design
- `Button`, `IconButton`:
  - Refine when pressed state is applied so that buttons that open a modal panel don’t flash `:active`
  - Fix disabled `variant="classic"` when pressed
- `Callout`:
  - Always set `text-align: left`
  - [**Breaking**] Don't default to `gray` color
- `Code`:
  - Fix `variant="ghost"` ignoring the `color` prop
- `Container`:
  - [**Breaking**] Rename `size="3"` to `size="4"` and change its width to `1136px`.
  - Make `size="4"` the default (almost matching the previous default width)
  - Add a new `size="3"` at `880px`
- `Em`:
  - Update default font family.
- `Inset`:
  - [**Breaking**] Make `"all"` the default `side` value
- `Kbd`:
  - Don’t inherit font weight.
  - Tweak vertical alignment.
- `Quote`:
  - Add styles and corresponding CSS variables (similar to `Em`).
- `ScrollArea`:
  - Add internal CSS variables to control the scroll bar spacing `--scrollarea-scrollbar-margin-top`, `--scrollarea-scrollbar-margin-bottom`, `--scrollarea-scrollbar-margin-left`, `--scrollarea-scrollbar-margin-right`
- `Select`:
  - Tweak `classic` variant shadow in dark mode to better match other form components
- `Tabs`:
  - Improve text alignment consistency between active and inactive tab trigger states
- `Table`:
  - Rework `TableRoot` part so that cell borders don’t overlap the outer table border. This change the `TableRoot`’s topmost element into a `div`.
  - Fix `vertical-align` and `text-align` regression
- `TextField`, `TextArea`:
  - Tweak `soft` variant when read-only
- `ThemePanel`
  - Tweak the design
  - Don’t animate the panel on initial render if `defaultOpen` is `true`

## 0.0.41

- General:
  - Gatekeep hover styles behind `@media (hover: hover)`
  - No class is unprefixed anymore (apart from `.radix-themes` and `.light`, `.light-theme`, `.dark`, `.dark-theme`)
  - Everything is prefixed with `.rt-`
  - Every responsive class is always prefixed with `.rt-r-`
- `Button`, `IconButton`:
  - Fix `ghost` variant responsive bug
- `Switch`:
  - Fix the animation when switching between checked and unchecked state
- `Theme`:
  - Fix issue when `hasBackground={false}` wasn't respected
  - Root vs. Nested `Theme` delineation now uses `data-is-root-theme="true|false"` instead of `.root`

## 0.0.40

- `ContextMenu`, `DropdownMenu`:
  - Fix `asChild` composition with `SubTrigger`, `CheckboxItem`, `RadioItem`
- `ScrollArea`:
  - Ensure compatibility with `max-height` (make `Root` flex column)
- `ThemePanel`:
  - [**Breaking**] Rename `initiallyHidden` (default `false`) to `defaultOpen` (default `true`)
  - Remove `inherit` option from `appearance` control (reacts to class changes now)

## 0.0.39

- General:
  - [**Breaking**] Import styles from `@radix-ui/themes/styles.css` instead of `@radix-ui/react-themes/index.css`
- `ContextMenu`:
  - Add `contextMenuCheckboxItemPropDefs`
- `DropdownMenu`:
  - Add `dropdownMenuCheckboxItemPropDefs`
- `Select`:
  - [**Breaking**] Remove `solid` and `outline` trigger variants
  - Tweak all other variant design to be more akin to other form components
  - Add `size` 3
- `TextField`, `TextArea`:
  - Tweak `soft` to use `--accent-12`
- `Theme`:
  - [**Breaking**] Rename `background` prop to `hasBackground` (and `data-background` attribute to `data-has-background`)

## 0.0.38

- General
  - [**Breaking**] Import styles from `@radix-ui/themes/index.css` instead of `@radix-ui/react-themes/dist/index.css`
  - Update shadows in dark mode
  - Fix `--default-letter-spacing` variable being not applied to the typographic components
  - Rename `Segoe UI` and `Open Sans` with custom metrics to `Segoe UI (Custom)` and `Open Sans (Custom)` in the `@font-face`
  - Remove Google Fonts
- `Badge`:
  - Tweak `outline` and `surface` borders
- `Button`
  - Bump up icon opacity to `0.9`
  - Fix `classic` blend mode and improve high-contrast hover
- `Code`:
  - Update the font stack
  - Tweak `outline` border
- `Em`:
  - Update the font stack
  - Fix `--em-font-size-adjust` not working
- `Kbd`:
  - [**Breaking**] Remove `width` prop
  - Rework sizing, add `size` prop
  - Tweak the chrome
- `Strong`:
  - Fix `--strong-font-size-adjust` not working
- `Slider`, `Switch`
  - Update high contrast variant design
- `Theme`:
  - [**Breaking**] Remove `textColor` prop
  - [**Breaking**] Remove `backgroundColor` prop
  - [**Breaking**] Rename `applyBackground` prop to `background` (and `data-background-applied` attribute to `data-background`)
  - [**Breaking**] Rename `accentScale` prop to `accentColor` (and `data-accent-scale` attribute to `data-accent-color`)
  - [**Breaking**] Rename `grayScale` prop to `grayColor` (and `data-gray-scale` attribute to `data-gray-color`)
  - [**Breaking**] Should always be within `body` now (rather than wrapping `html` or `body`)
  - [**Breaking**] When `appearance` is `dark` or `light`, we inject a script (similar to `next-themes`) to set the theme class / color-scheme on `html`. Because of this, `suppressHydrationWarning` needs to be added to `html`.
- `ThemePanel`:
  - New design

## 0.0.37

- General:
  - Fix negative margin overrides inheritance
  - [**Breaking**] Rename `--color-surface-1` to `--color-surface`
  - [**Breaking**] Rename `--color-surface-2` to `--color-panel-translucent`
  - [**Breaking**] Rename `--color-panel` to `--color-panel-solid`
  - [**Breaking**] Rename `--accent-surface` to `--color-surface-accent`
  - [**Breaking**] Remove `--color-canvas`
  - Add new `panelBackground` setting on `Theme` (and `ThemePanel`)
- `Button`, `IconButton`:
  - Add new `classic` variant
- `Card`:
  - [**Breaking**] Rename `surface` variant to `classic`
  - [**Breaking**] Rename `solid` variant to `surface`
- `Checkbox`:
  - [**Breaking**] Rename `surface` variant to `classic`
  - [**Breaking**] Rename `solid` variant to `surface`
- `Link`:
  - Add `underline` (`auto`, `hover`, `always`) prop. `auto` is the default and behaviour is unchanged.
- `RadioGroup`:
  - [**Breaking**] Rename `surface` variant to `classic`
  - [**Breaking**] Rename `solid` variant to `surface`
- `Select`:
  - Add new `classic` variant
  - [**Breaking**] Remove `solid` overrides, closest style for now is `<Select.Trigger variant="surface" highContrast>`
- `Slider`:
  - [**Breaking**] Rename `surface` variant to `classic`
  - [**Breaking**] Rename `solid` variant to `surface`
- `Switch`:
  - [**Breaking**] Rename `surface` variant to `classic`
  - [**Breaking**] Rename `solid` variant to `surface`
- `Table`:
  - Fix pointer-events issue
- `TextArea`:
  - [**Breaking**] Rename `surface` variant to `classic`
  - [**Breaking**] Rename `solid` variant to `surface`
- `TextField`:
  - [**Breaking**] Rename `surface` variant to `classic`
  - [**Breaking**] Rename `solid` variant to `surface`

## 0.0.36

- General:
  - Refine `--shadow-1`
- `Button`, `IconButton`:
  - Add size 4
- `Callout`:
  - [**Breaking**] Remove `radius` prop
- `Card`:
  - [**Breaking**] Remove `radius` prop
- `Checkbox`:
  - Refine colors for `solid` unchecked variant
  - [**Breaking**] Remove `radius` prop
- `Select`:
  - [**Breaking**] Move `radius` prop from `Root` to `Trigger`
- `Slider`:
  - Refine `Thumb` and `Range` shadows
- `RadioGroup`:
  - Refine colors for `solid` unchecked variant
- `Switch`:
  - Refine colors for `surface` unchecked variant
- `Table`:
  - [**Breaking**] Remove `radius` prop
  - [**Breaking**] Remove optional `Root` prop (`Content` was renamed to `Root` instead) and add a new `variant` prop
    - Tables previously no wrapped in `Root` part should look the same out of the box (replace `Content` with `Root`)
    - Tables previously wrapped in `Root`: remove `Root`, rename `Content` to `Root` and add `variant="surface"`
- `TextArea`:
  - [**Breaking**] Remove `radius` prop

## 0.0.35

- General:
  - Upgrade Radix Colors to `2.0.0-alpha.1`
- `Button`:
  - Refine colors for `outline` and `surface` variants
  - Use a smaller border radius for `size="1"` buttons
  - Use a softer border color for `variant="outline" highContrast` buttons
- `Card`:
  - Refine colors and shadows when hovered and pressed
- `Switch`:
  - Improve `soft` variant saturation when checked
- `TextArea`, `TextField`
  - Refine colors for the `solid` variant

## 0.0.34

- General:
  - Make `--color-surface-2` and `--accent-surface` slightly transparent in light mode
  - [**Breaking**] Rework all shadow token values and how they are used
    - `--shadow-2` and `--shadow-3` are the new steps
    - Other steps renamed and tweaked
    - Switch your `--shadow-2` to `--shadow-4` if you want to approximate the old look
    - Switch your `--shadow-3` to `--shadow-6` if you want to approximate the old look
    - Switch your `--shadow-4` to `--shadow-5` if you want to approximate the old look
    - Switch your `--shadow-5` to `--shadow-4` if you want to approximate the old look
- `Card`:
  - [**Breaking**] Remove `outline` variant
  - [**Breaking**] Add new `solid` variant and make it the default
  - Rework `surface` variant design
- `Dialog`:
  - Tweak the overlay color in light mode

## 0.0.33

- General:
  - Improve `--shadow-1` in dark mode
- `Slider`:
  - Add new `surface` variant, rework `soft` variant
  - [**Breaking**] Switch your `variant` to `surface` if you want the old look
- `Switch`:
  - Improve `soft` and `surface` variants design

## 0.0.32

- General:
  - Add `--color-surface-1`
  - `--color-surface` is now `--color-surface-2`
  - Add `--color-canvas` (used in `solid` variants for form controls)
- `Button`, `IconButton`:
  - Update font-weight to `--font-weight-medium` on all except `ghost` variant
  - Color polish
- `TextField`:
  - Add new `solid` variant
  - [**Breaking**] Default `variant` is now `solid`
- `TextArea`:
  - Add new `solid` variant
  - [**Breaking**] Default `variant` is now `solid`
- `Checkbox`:
  - Add new `surface` and `soft` variants
  - [**Breaking**] Switch your `variant` to `surface` if you want the old look
- `RadioGroup`:
  - Add new `surface` and `soft` variants
  - [**Breaking**] Switch your `variant` to `surface` if you want the old look
- `Select`:
  - [**Breaking**] Default variant is now `solid`
  - `solid` variant look and feel adjusted to match form controls (e.g. `TextField`, `Checkbox`, etc)
- `Switch`:
  - Add new `surface` and `soft` variants
  - [**Breaking**] Switch your `variant` to `surface` if you want the old look

## 0.0.31

**Warning!** This release contains some breaking changes.

- `Grid`:
  - Add support for arbitrary values in `columns`
  - Add `rows` prop with arbitrary values support
- `Inset`:
  - New component supported inside `Dialog`, `AlertDialog`, `Card`, `HoverCard`, `Popover`
  - Automatic padding adjustments for `Table` inside `Inset`
- `Slider`: Forward `tabIndex` correctly to `Thumb`
- `Code`:
  - [**Breaking**] Polish size, `--code-font-size-adjust` is now `0.95`
  - [**Breaking**] Rename `plain` variant to `ghost`
- `Callout`: [**Breaking**] Remove `solid` variant
- `Table`: Add `size` prop to `TableContent`
- `Popover`: [**Breaking**] Now comes with its own internal padding
- General:
  - Fix light/dark color inheritance
    - [**Breaking**] `--color-surface-1-accent` is now `--accent-surface`
    - [**Breaking**] `--color-surface-1` is now `--color-surface`
  - Polish color usages (alpha, etc)
  - Polish focus states throughout

## 0.0.30

- `TextField`: `Root` is now `display: flex`
- General:
  - Fix inherited appearance colors
  - Support `.light` / `.dark` out of the box

## 0.0.29

**Warning!** This release contains some breaking changes.

- `Table`: New component
- [**Breaking**] `TextField`: Add slots support (basic breaking change fix: `TextField` -> `TextFieldInput`)
- General:
  - `ThemePanel`: Remove keying and `__useKey` prop (now syncs prop changes internally)
  - Support global appearance inheritance (next-themes integration):
    - [**Breaking**] `appearance="invert"` was removed on `Theme`

## 0.0.28

- `Avatar`: Add 4 extra sizes
- General:
  - Don't reset `cursor` in CSS resets for `button` and `a` elements
  - Fix callout post CSS warning
  - Expose private `__useKey` prop on `Theme` to disable keying the root `Theme` in the docs.

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
