import { PropDef, trimProp, textSize } from '../helpers';
import { textPropDefs } from './text.props';

const gapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

// Todo figure out if we can enum with the template literal..
export const dataListPropDefs = {
  columns: { type: 'string', default: '200px 1fr', responsive: true },
  gap: { type: 'enum', values: gapValues, default: '4', responsive: true },
  gapX: { type: 'enum', values: gapValues, default: undefined, responsive: true },
  gapY: { type: 'enum', values: gapValues, default: undefined, responsive: true },
  size: textPropDefs.size,
  trim: trimProp,
} satisfies {
  columns?: PropDef<`none` | `${string} 1fr`>;
  gap?: PropDef<(typeof gapValues)[number]>;
  gapX?: PropDef<(typeof gapValues)[number]>;
  gapY?: PropDef<(typeof gapValues)[number]>;
  size?: typeof textSize;
  trim?: typeof trimProp;
};
