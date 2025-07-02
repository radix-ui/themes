import { asChildPropDef } from '../props/as-child.prop.js';
import { heightPropDefs } from '../props/height.props.js';
import { widthPropDefs } from '../props/width.props.js';

import type { PropDef, GetPropDefTypes } from '../props/prop-def.js';

const contentSizes = ['1', '2', '3', '4'] as const;
const panelBackgrounds = ['solid', 'translucent'] as const;

const popoverContentPropDefs = {
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: contentSizes,
    default: '2',
    responsive: true,
  },
  panelBackground: { type: 'enum', values: panelBackgrounds, default: undefined },
  width: widthPropDefs.width,
  minWidth: widthPropDefs.minWidth,
  maxWidth: { ...widthPropDefs.maxWidth, default: '480px' },
  ...heightPropDefs,
} satisfies {
  width: PropDef<string>;
  minWidth: PropDef<string>;
  maxWidth: PropDef<string>;
  size: PropDef<(typeof contentSizes)[number]>;
  panelBackground: PropDef<(typeof panelBackgrounds)[number] | undefined>;
};

type PopoverContentOwnProps = GetPropDefTypes<
  typeof popoverContentPropDefs &
    typeof asChildPropDef &
    typeof widthPropDefs &
    typeof heightPropDefs
>;

export { popoverContentPropDefs };
export type { PopoverContentOwnProps };
