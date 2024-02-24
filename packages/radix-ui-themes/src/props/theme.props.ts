import { asChildProp } from './as-child.prop.js';
import type { GetPropDefTypes, PropDef } from './prop-def.js';

// prettier-ignore
const accentColorsRegular = ['tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'brown', 'orange'] as const;
const accentColorsBright = ['sky', 'mint', 'lime', 'yellow', 'amber'] as const;
const accentColorsMetal = ['gold', 'bronze'] as const;
const accentColors = [...accentColorsRegular, ...accentColorsBright, ...accentColorsMetal] as const;
const grayColors = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand'] as const;

const themeAccentColors = [...accentColors, 'gray'] as const;
// prettier-ignore
const themeAccentColorsOrdered = ['gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'] as const;
const themeAccentColorsGrouped = [
  { label: 'Regulars', values: accentColorsRegular },
  { label: 'Brights', values: accentColorsBright },
  { label: 'Metals', values: accentColorsMetal },
  { label: 'Gray', values: ['gray'] as const },
];
const themeGrayColors = ['auto', ...grayColors] as const;

const appearances = ['inherit', 'light', 'dark'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;
const radii = ['none', 'small', 'medium', 'large', 'full'] as const;
const scalings = ['90%', '95%', '100%', '105%', '110%'] as const;

const themePropDefs = {
  ...asChildProp,
  hasBackground: { type: 'boolean', default: true },
  appearance: { type: 'enum', values: appearances, default: 'inherit' },
  accentColor: { type: 'enum', values: themeAccentColors, default: 'indigo' },
  grayColor: { type: 'enum', values: themeGrayColors, default: 'auto' },
  panelBackground: { type: 'enum', values: panelBackgrounds, default: 'translucent' },
  radius: { type: 'enum', values: radii, default: 'medium' },
  scaling: { type: 'enum', values: scalings, default: '100%' },
} satisfies {
  hasBackground: PropDef<boolean>;
  appearance: PropDef<(typeof appearances)[number]>;
  accentColor: PropDef<(typeof themeAccentColors)[number]>;
  grayColor: PropDef<(typeof themeGrayColors)[number]>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number]>;
  radius: PropDef<(typeof radii)[number]>;
  scaling: PropDef<(typeof scalings)[number]>;
};

export { themePropDefs, themeAccentColors, themeAccentColorsGrouped, themeAccentColorsOrdered };
