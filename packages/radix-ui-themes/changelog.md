# Changelog

## 2.0.2

- Fix an issue when Chrome would sometimes crash while using CSS inspector on a Radix Themes stylesheet

## 2.0.1

- `Card`
  - Fix an issue when `variant="surface"` border color may disappear in browsers that don't support `color-mix`
  - Tweak `variant="surface"` border color
- `Code`
  - When `variant="ghost"` is used within a `Link`, make sure that `underline="hover"` on the `Link` is respected.
- `TextField`
  - Improve vertical text alignment with common fonts
  - Don’t apply the autofill accent color when the input is disabled
  - Make sure the autofill accent color always pairs with the focus outline color

## 2.0.0

- General
  - Combine selectors in the CSS build, improving the developer experience when inspecting elements in the browser.
  - Remove comments from the CSS build.
  - Cap CSS selector specificity at `0,1,0` for styling HTML elements and at `0,1,1` for styling pseudo-elements, improving compatibility with Tailwind.
    - **[Upgrade guide]** If you were relying on any specificity quirks of Radix Themes, make sure that your style overrides still work as expected.
  - Rework dark mode colors, refine light mode colors (via Radix Colors 3.0.0).
    - Fix oversaturated transparent grays.
    - **[Upgrade guide]** If you were using the color tokens for your custom styles, make sure that your designs look as expected.
    - **[Upgrade guide]** If you were overriding certain colors, make sure that your overrides are harmonized with the new color scales.
  - Rework transparent black and white color scales.
    - **[Upgrade guide]** If you were using transparent black and white color scales for your custom styles (`--black-a1`, `--white-a1`, etc.), make sure to check the new values and update the steps used so that your designs look as expected:
      - Change `--black-a1` to `rgba(0, 0, 0, 0.01)`
      - Change `--black-a2` to `rgba(0, 0, 0, 0.024)`
      - Change `--black-a3` to `--black-a1`
      - Change `--black-a4` to `--black-a2`
      - Change `--black-a5` to `--black-a2`
      - Change `--black-a6` to `--black-a3`
      - Change `--black-a7` to `--black-a3` or `--black-a4`
      - Change `--black-a8` to `--black-a5`
      - Change `--black-a9` to `--black-a6` or `--black-a7`
      - Change `--black-a10` to `--black-a7`
      - Change `--black-a11` to `--black-a8`
      - Change `--black-a12` to `--black-a11`
      - Change `--white-a1` to `transparent`
      - Change `--white-a2` to `rgba(255, 255, 255, 0.01)`
      - Change `--white-a3` to `--white-a1` or `--white-a2`
      - Change `--white-a4` to `--white-a2`
      - Change `--white-a5` to `--white-a3`
      - Change `--white-a6` to `--white-a3` or `--white-a4`
      - Change `--white-a7` to `--white-a4`
      - Change `--white-a8` to `--white-a5`
      - Change `--white-a9` to `--white-a6`
      - Change `--white-a10` to `--white-a7`
      - Change `--white-a11` to `--white-a9`
      - Change `--white-a12` to `--white-a11` or `--white-a12`
  - Refine the shadow scale.
  - Maintain theme accent color for focus rings on most `color="gray"` components similarly to the text selection color.
  - Change some internal component-specific CSS variables to follow a naming pattern.
  - Make sure that forced light/dark appearance on the `Theme` component also sets the corresponding browser colors, like the correct input autofill background color.
  - Rename all `@keyframes` animations with `rt-` prefix and into kebab case.
  - Use `outline` rather than `box-shadow` for most focus styles, which avoids a slight anti-aliasing issue in Chrome on focused elements.
- `AlertDialog`, `Dialog`
  - Add padding around dialog content to prevent it from touching the viewport edges
  - Make sure that the dialog content doesn’t overflow viewport on iOS
- `Avatar`
  - Don’t enforce fallback icon size
    - **[Upgrade guide]** If you were using `svg` assets as a fallback, make sure to set an appropriate size manually.
- Add CSS variables to control the cursor style on interactive elements:
  - `--cursor-button: default;`
  - `--cursor-checkbox: default;`
  - `--cursor-disabled: not-allowed;`
  - `--cursor-link: pointer;`
  - `--cursor-menu-item: default;`
  - `--cursor-radio: default;`
  - `--cursor-slider-thumb: default;`
  - `--cursor-slider-thumb-active: default;`
  - `--cursor-switch: default;`
- Replace `.rt-reset-button` and `.rt-reset-a` classes with a single `.rt-reset` class
  - The new `.rt-reset` class can be use to reset `a`, `button`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `ol`, `ul`, `p`, and `pre` tags when building custom components.
  - **[Upgrade guide]** If you were using these classes for your custom components, update the class name used.
- `Blockquote`
  - **[Breaking]** Remove `trim` prop
- `Button`, `IconButton`
  - Refine and normalise the look and feel of the disabled states.
  - Apply disabled styles to other elements when using `disabled` together with `asChild`
  - Improve `variant="classic"` look and feel across different accent colors in light and dark mode.
- `Callout`
  - Tweak how the layout works to allow nesting multiple `Callout.Text` elements within `Callout.Root`
    - **[Upgrade guide]** If you were relying on how `Callout.Root` happened to provide flex properties, change your layout to use a `Flex` component explicitly.
  - Fix an issue when the callout would inherit text color unless an explicit `color` prop was passed.
    - **[Upgrade guide]** If you preferred the previous look, pass `highContrast` prop to your callouts to make the text darker.
  - Use a gray background for a gray `variant="surface"`
  - Use a darker outline color `variant="outline"`
- `Checkbox`
  - **[Breaking]** Improve layout so that wrapping a checkbox in `Text` component automatically aligns the checkbox with the first line of the text.
    - **[Upgrade guide]** Make sure that your layouts with checkboxes look as expected. If not, wrap your checkboxes in `<Text as="label" size="...">`, using your preferred text size.
  - **[Breaking]** Rework sizes – add a smaller `size="1"`, change the default size to `size="2"`, add a more refined `size="3"`
    - **[Upgrade guide]** If you were using `size="1"` or `size="2"` checkboxes via an explicit `size` prop, rename them to `size="2"` and `size="3"` respectively.
  - Refine the look and feel of `variant="classic"`.
  - Refine and normalise the look and feel of the disabled states.
- `Card`
  - Update the `variant="classic"` shadow so that it doesn’t extend outside of the element.
  - Refine hover and pressed styles for `variant="classic"`
  - Add missing pressed styles.
  - Refine how the inner shadows are applied so that they blend with the background outside of the component.
- `Code`
  - Add interactive styles when `Code` is within `Link`
  - Fix an issue when `variant="ghost"` font size would be inconsistent depending on whether the size was based on a parent `Text` element or came from the code’s own `size` prop
  - Scale the outline thickness relative to the font size for `variant="outline"` and `variant="surface"`
  - Improve `::selection` background color for `variant="solid"`
  - Add CSS variables to `.radix-themes` for customising the padding of `Code` variants in case the default values don’t work well with the vertical metrics of custom code font.
    - `--code-padding-top`
    - `--code-padding-bottom`
- `DropdownMenu`, `ContextMenu`
  - Reduce border radius when theme setting is `radius="full"`
  - Refine horizontal paddings
  - Refine label look and feel
- `Grid`
  - Fix a bug when nesting `Grid` components could cause the descendant `Grid`’s to inherit some parent styles unintentionally.
- `Inset`
  - Add `clip` prop to control whether content is clipped to the padding or to the border of the parent element.
  - Automatically adjust table cell padding for when `Table` is inside `Inset`
- `Kbd`
  - Tweak vertical alignment
- `Link`
  - Desaturate the underline color.
  - Make links automatically high-contrast within colored `Heading` elements (similarly to the automatic high-contrast within `Text`).
  - Scale the underline thickness relative to the font size for `variant="outline"` and `variant="surface"`
- `RadioGroup`
  - **[Breaking]** Improve layout so that wrapping a radio button in `Text` component automatically aligns the radio button with the first line of the text.
    - **[Upgrade guide]** Make sure that your layouts with radio buttons look as expected. If not, wrap your radio buttons in `<Text as="label" size="...">`, using your preferred text size.
  - **[Breaking]** Rework sizes – add a smaller `size="1"`, change the default size to `size="2"`, add a more refined `size="3"`
    - **[Upgrade guide]** If you were using `size="1"` or `size="2"` radio buttons via an explicit `size` prop, rename them to `size="2"` and `size="3"` respectively.
  - Refine the look and feel of `variant="classic"`.
  - Refine and normalise the look and feel of the disabled states.
- `Select`
  - Fix invisible scrollbar in long item lists
  - Improve `variant="classic"` look and feel across light and dark mode.
  - Align `SelectContent` to the left of the trigger when using `position="popper"`
  - Refine horizontal paddings
  - Refine label look and feel
  - Rework `size="3"`
- `ScrollArea`
  - Upgrade the primitive version, fixing an upstream type issue
  - Rename scrollbar margin variables to include the scrollbar orientation and declare them on `.radix-themes` to facilitate easier scrollbar position adjustments
    - **[Upgrade guide]** If you were using the variables `--scrollarea-scrollbar-margin-top`, `--scrollarea-scrollbar-margin-left`, etc. make sure that they follow the new names and are set at the appropriate level. There's no need to target `.rt-ScrollAreaScrollbar` element to set the variables anymore, as they can be set just on the component that needs the override. New variables:
      - `--scrollarea-scrollbar-horizontal-margin-top`
      - `--scrollarea-scrollbar-horizontal-margin-bottom`
      - `--scrollarea-scrollbar-horizontal-margin-left`
      - `--scrollarea-scrollbar-horizontal-margin-right`
      - `--scrollarea-scrollbar-vertical-margin-top`
      - `--scrollarea-scrollbar-vertical-margin-bottom`
      - `--scrollarea-scrollbar-vertical-margin-left`
      - `--scrollarea-scrollbar-vertical-margin-right`
- `Slider`
  - Refine the shadows and colors used in the components.
  - Refine and normalise the look and feel of the disabled states.
  - Fix an issue where high contrast sliders would have an incorrect disabled style.
- `Switch`
  - **[Breaking]** Improve layout so that wrapping a switch in `Switch` component automatically aligns the switch with the first line of the text.
    - **[Upgrade guide]** Make sure that your layouts with switches look as expected. If not, wrap your switches in `<Text as="label" size="...">`, using your preferred text size.
  - **[Breaking]** Rework sizes, making `size="2"` and `size="3"` smaller.
    - **[Upgrade guide]** Use `size="3"` instead of `size="2"` to match the previous look.
  - Refine the shadows and colors used in the components.
  - Refine and normalise the look and feel of the disabled states.
- `Table`
  - Refine how the outer border is applied so that it blends with the background outside of the component.
- `Tabs`
  - Add CSS variables to `.radix-themes` for customising the letter spacing and word spacing of active and inactive tabs so that you can minimise the apparent shift in weight in case the default values don’t work for your custom font.
    - `--tabs-trigger-active-letter-spacing`
    - `--tabs-trigger-active-word-spacing`
    - `--tabs-trigger-inactive-letter-spacing`
    - `--tabs-trigger-inactive-word-spacing`
- `Text`
  - Add `as="label"` option to the `as` prop
  - Improve how prop types are resolved when `as` prop isn’t specified
- `TextArea`
  - Rework the internal implementation, now using multiple HTML nodes for styling purposes.
    - Adjust the layout styles so that `TextArea` behaves like a true `display: block` element, filling the available space horizontally.
    - The `style` and `className` are now forwarded to the wrapping `div` element. The `ref` and other props are still forwarded to the `textarea` itself.
    - **[Upgrade guide]** If you were overriding `TextArea` styles via `style`, `className`, or custom CSS that targets the related HTML nodes, make sure that your custom styles work as expected.
    - **[Upgrade guide]** If you were relying on the intrinsic width of `TextArea` set by the browser, make sure that your layout looks as expected.
  - Refine padding values for a more balanced look.
    - Use matching scroll margins for a nicer typing experience when the `TextArea` overflows.
  - Refine how the inner shadows are applied so that they blend with the background outside of the component.
  - Refine and normalise the look and feel of disabled and read-only states.
  - Fix a Safari bug when the text value would appear tinted in the disabled input.
  - Improve autofill styles.
- `TextField`
  - Reset `z-index` of the container to avoid potential stacking issues.
  - Refine padding values for a more balanced look.
    - Use `text-indent` instead of `padding-left` so that long values aren't truncated on the left when the cursor is at the end of the input.
  - Refine how the inner shadows are applied so that they blend with the background outside of the component.
  - Refine and normalise the look and feel of disabled and read-only states.
  - Fix a Safari bug when the text value would appear tinted in the disabled input.
  - Remove ellipsis truncation, as this prevented long values from being shown when scrolling on the input horizontally in Chrome.
  - Improve autofill styles.
- `ThemePanel`
  - Disable transitions when changing the appearance.
  - Improve contrast in the border radius preview.
- `Tooltip`
  - Reduce border radius when theme setting is `radius="full"`
  - **[Breaking]** Remove `multiline` prop
    - **[Upgrade guide]** If you were using `multiline` prop, pass `style={{ maxWidth: 250 }}` to the relevant Tooltip elements.

## 1.1.2

- General
  - Make sure to also export `ThemeProps` and `ThemePanelProps`

## 1.1.1

- General
  - Export prop types from all components

## 1.1.0

- General
  - Three new color scales: `ruby`, `iris`, and `jade`
  - Set explicit versions of the Radix Primitives dependencies to allow stable builds
  - Use an explicit `React.FC` type for `ContextMenuSub`, `DialogRoot`, `HoverCardRoot`, and `PopoverRoot`, resolving a type error with certain setups

## 1.0.0

Public release 🎉

## 0.0.48

- General
  - Fix SVG icon attribute warning

## 0.0.47

- `Button`
  - Tweak `classic` variant chrome
- `Checkbox`
  - Update the check icon
- `Dialog`
  - Darken the overlay in dark mode
- `DropdownMenu`, `ContextMenu`
  - Update icons
  - Tweak trigger open states
  - Replace dot icon with check icon for the radio items as the more common design
- `Select`
  - Update the check icon
  - Tweak `classic` variant chrome
  - Polish trigger arrow icon size and positioning
- `Table`
  - Add overflow scrollbars
- `ThemePanel`
  - Fix `onAppearanceChange` type

## 0.0.46

- General
  - Upgrade to Radix Colors `2.0.1`, which updates all `a1` and some `a2` steps in dark mode.
- `ThemePanel`
  - Add `onApperanceChange` prop to delegate updating the theme classes to another solution (ie. next-themes)

## 0.0.45

- General
  - Upgrade to Radix Colors `2.0.0-alpha.3`. Much better contrast across the board in dark mode, darker high contrast grays in light mode, completely reworked bright colors like lime, yellow, amber, mint, and sky.
- `DropdownMenu`, `Select`
  - Fix vertical alignment of text within menu items
- `Switch`
  - Fix Autoprefixer `transition-property` warning

## 0.0.44

- General
  - Respect the theme class format on the `html` element when updating the appearance
- `Blockquote`
  - Tweak spacing
- `Button`
  - Fix disabled ghost button padding
- `ThemePanel`
  - Improve tooltips content

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
