import type { Text } from './text';
import { PropDef, trimProp, textSize } from '../helpers';
import { textPropDefs } from './text.props';

const directionValues = ['row', 'column'] as const;
const gapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

export const dataListPropDefs = {
  direction: { type: 'enum', values: directionValues, default: undefined, responsive: true },
  gap: { type: 'enum', values: gapValues, default: '4', responsive: true },
  gapX: { type: 'enum', values: gapValues, default: undefined, responsive: true },
  gapY: { type: 'enum', values: gapValues, default: undefined, responsive: true },
  size: textPropDefs.size,
} satisfies {
  direction?: PropDef<(typeof directionValues)[number]>;
  gap?: PropDef<(typeof gapValues)[number]>;
  gapX?: PropDef<(typeof gapValues)[number]>;
  gapY?: PropDef<(typeof gapValues)[number]>;
  size?: typeof textSize;
};
