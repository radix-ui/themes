import { colorPropDef } from '../props/color.prop.js';
import { radiusPropDef } from '../props/radius.prop.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3'] as const;
const variants = ['classic', 'surface', 'soft', 'outline', 'ghost'] as const;
const resizeValues = ['none', 'vertical', 'horizontal', 'both'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;

// prettier-ignore
const textAreaPropDefs = {
  size: { type: 'enum', className: 'rt-r-size', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', className: 'rt-variant', values: variants, default: 'surface' },
  resize: { type: 'enum', className: 'rt-r-resize', values: resizeValues,  responsive: true },
  panelBackground: { type: 'enum', values: panelBackgrounds, default: undefined },
  ...colorPropDef,
  ...radiusPropDef,
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  resize: PropDef<(typeof resizeValues)[number]>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number] | undefined>;
    };

export { textAreaPropDefs };
