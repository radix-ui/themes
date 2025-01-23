import type { PropDef } from './prop-def';

// prettier-ignore
const accentColors = ['gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'] as const;

const grayColors = ['auto', 'gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const;

const colorPropDef = {
  color: {
    type: 'enum',
    values: accentColors,
    default: undefined as (typeof accentColors)[number] | undefined,
  },
} satisfies {
  color: PropDef<(typeof accentColors)[number]>;
};

// 1. When used on components that compose Text, sets the color of the text to the current accent.
// 2. Defines accent color for descendant text components with `highContrast={true}`.
const accentColorPropDef = {
  color: {
    type: 'enum',
    values: accentColors,
    default: '' as (typeof accentColors)[number],
  },
} satisfies {
  color: PropDef<(typeof accentColors)[number]>;
};

export {
  accentColorPropDef,
  colorPropDef,
  //
  accentColors,
  grayColors,
};
