import { themePropDefs } from './theme.props.js';
import type { PropDef } from './prop-def.js';

const colorProp = {
  type: 'enum',
  values: themePropDefs.accentColor.values,
  default: '' as (typeof themePropDefs.accentColor.values)[number] | undefined,
} satisfies PropDef<(typeof themePropDefs.accentColor.values)[number]>;

const inheritedColorProp = {
  type: 'enum',
  values: themePropDefs.accentColor.values,
  default: undefined as (typeof themePropDefs.accentColor.values)[number] | undefined,
} satisfies PropDef<(typeof themePropDefs.accentColor.values)[number]>;

// Difference between `colorProp` and `inheritedColorProp` is in the defaults:
//
// default: '' sets an empty `data-accent-color` attribute to define the right
// high-contrast colors for descendants that inherit a colour by default, e.g.:
//
// ```
// <Text>
//   This text inherits body color
// </Text>
//
// <Callout.Root>
//   <Callout.Text>
//     <Text>
//       This text inherits Callout color
//     </Text>
//     <Text highContrast>
//       This text uses high-contrast version of the Callout color
//     </Text>
//   <Callout.Text>
// </Callout.Root>
// ```
//
// default: undefined allows Text to inherit color directly, but respond to the behaviour above.

export { colorProp, inheritedColorProp };
