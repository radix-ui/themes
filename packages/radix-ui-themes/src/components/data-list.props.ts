import { PropDef, trimProp, textSize } from '../helpers';
import { textPropDefs } from './text.props';

const directionValues = ['row', 'column'] as const;
const gapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

export const dataListPropDefs = {
  columns: { type: 'string', default: undefined, responsive: true },
  direction: {
    type: 'enum',
    className: 'rt-r-direction',
    values: directionValues,
    default: undefined,
    responsive: true,
  },
  gap: { type: 'enum', className: 'rt-r-gap', values: gapValues, default: '4', responsive: true },
  gapX: {
    type: 'enum',
    className: 'rt-r-gap-x',
    values: gapValues,
    default: undefined,
    responsive: true,
  },
  gapY: {
    type: 'enum',
    className: 'rt-r-gap-y',
    values: gapValues,
    default: undefined,
    responsive: true,
  },
  size: textPropDefs.size,
} satisfies {
  columns?: PropDef<'string'>;
  direction?: PropDef<(typeof directionValues)[number]>;
  gap?: PropDef<(typeof gapValues)[number]>;
  gapX?: PropDef<(typeof gapValues)[number]>;
  gapY?: PropDef<(typeof gapValues)[number]>;
  size?: typeof textSize;
};
