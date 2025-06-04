import { widthPropDefs } from '../props/width.props.js';

import type { PropDef, GetPropDefTypes } from '../props/prop-def.js';

const tooltipPropDefs = {
  content: { type: 'ReactNode', required: true },
  width: widthPropDefs.width,
  minWidth: widthPropDefs.minWidth,
  maxWidth: { ...widthPropDefs.maxWidth, default: '360px' },
} satisfies {
  width: PropDef<string>;
  minWidth: PropDef<string>;
  maxWidth: PropDef<string>;
  content: PropDef<React.ReactNode>;
};

type TooltipOwnProps = GetPropDefTypes<typeof tooltipPropDefs & typeof widthPropDefs>;

export { tooltipPropDefs };
export type { TooltipOwnProps };
