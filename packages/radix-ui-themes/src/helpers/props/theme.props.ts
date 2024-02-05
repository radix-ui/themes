import { radixColorScales, radixGrayScales } from '../radix-colors.js';
import { asChildProp } from './as-child.prop.js';
import type { GetPropDefTypes, PropDef } from './prop-def.js';

const appearances = ['inherit', 'light', 'dark'] as const;
const accentColors = [...radixColorScales, 'gray'] as const;
const grayColors = [...radixGrayScales, 'auto'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;
const radii = ['none', 'small', 'medium', 'large', 'full'] as const;
const scalings = ['90%', '95%', '100%', '105%', '110%'] as const;

const themePropDefs = {
  asChild: asChildProp,
  hasBackground: { type: 'boolean', default: true },
  appearance: { type: 'enum', values: appearances, default: 'inherit' },
  accentColor: { type: 'enum', values: accentColors, default: 'indigo' },
  grayColor: { type: 'enum', values: grayColors, default: 'auto' },
  panelBackground: { type: 'enum', values: panelBackgrounds, default: 'translucent' },
  radius: { type: 'enum', values: radii, default: 'medium' },
  scaling: { type: 'enum', values: scalings, default: '100%' },
} satisfies {
  asChild: typeof asChildProp;
  hasBackground: PropDef<boolean>;
  appearance: PropDef<(typeof appearances)[number]>;
  accentColor: PropDef<(typeof accentColors)[number]>;
  grayColor: PropDef<(typeof grayColors)[number]>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number]>;
  radius: PropDef<(typeof radii)[number]>;
  scaling: PropDef<(typeof scalings)[number]>;
};

type ThemeProps = GetPropDefTypes<typeof themePropDefs>;

export { themePropDefs };
export type { ThemeProps };
