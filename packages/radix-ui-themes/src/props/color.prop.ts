import type { PropDef } from './prop-def.js';

// prettier-ignore
const accentColors = ['gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'] as const;

const grayColors = ['auto', 'gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const;

const colorPropDef = {
  color: {
    type: 'enum',
    values: accentColors,
    default: '' as (typeof accentColors)[number] | undefined,
  },
} satisfies {
  color: PropDef<(typeof accentColors)[number]>;
};

// Difference between `colorPropDef` and `inheritedColorPropDef` is in the defaults:
//
// `default: ''` sets an empty `data-accent-color` attribute to define the right
// high-contrast colors for descendants that inherit a colour by default.
//
// `default: undefined` allows components like Text to inherit color directly,
// but respond to `data-accent-color` on parent when it's `highContrast`.
const inheritedColorPropDef = {
  color: {
    type: 'enum',
    values: accentColors,
    default: undefined as (typeof accentColors)[number] | undefined,
  },
} satisfies {
  color: PropDef<(typeof accentColors)[number]>;
};

export {
  colorPropDef,
  inheritedColorPropDef,
  //
  accentColors,
  grayColors,
};
