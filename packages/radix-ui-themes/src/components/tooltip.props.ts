import { widthPropDefs } from '../props/width.props.js';
import { textPropDefs } from './text.props.js';

import type { PropDef, GetPropDefTypes } from '../props/prop-def.js';

const tooltipPropDefs = {
  content: { type: 'ReactNode', required: true },
  width: widthPropDefs.width,
  minWidth: widthPropDefs.minWidth,
  maxWidth: { ...widthPropDefs.maxWidth, default: '360px' },
  textAs: textPropDefs['as']
} satisfies {
  width: PropDef<string>;
  minWidth: PropDef<string>;
  maxWidth: PropDef<string>;
  content: PropDef<React.ReactNode>;
  textAs: PropDef<string>;
};

type TooltipOwnProps = GetPropDefTypes<typeof tooltipPropDefs & typeof widthPropDefs>;

export { tooltipPropDefs };
export type { TooltipOwnProps };
