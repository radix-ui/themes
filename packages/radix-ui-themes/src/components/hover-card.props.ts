import { asChildPropDef } from '../props/as-child.prop.js';
import { heightPropDefs } from '../props/height.props.js';
import { widthPropDefs } from '../props/width.props.js';

import type { PropDef, GetPropDefTypes } from '../props/prop-def.js';

const contentSizes = ['1', '2', '3'] as const;

const hoverCardContentPropDefs = {
  ...asChildPropDef,
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: contentSizes,
    default: '2',
    responsive: true,
  },
  width: widthPropDefs.width,
  minWidth: widthPropDefs.minWidth,
  maxWidth: { ...widthPropDefs.maxWidth, default: '480px' },
  ...heightPropDefs,
} satisfies {
  width: PropDef<string>;
  minWidth: PropDef<string>;
  maxWidth: PropDef<string>;
  size: PropDef<(typeof contentSizes)[number]>;
};

type HoverCardContentOwnProps = GetPropDefTypes<
  typeof hoverCardContentPropDefs &
    typeof asChildPropDef &
    typeof widthPropDefs &
    typeof heightPropDefs
>;

export { hoverCardContentPropDefs };
export type { HoverCardContentOwnProps };
