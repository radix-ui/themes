# Changelog

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
