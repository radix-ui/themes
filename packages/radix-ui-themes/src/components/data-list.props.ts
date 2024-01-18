import { trimProp } from '../helpers';
import type { PropDef } from '../helpers';

const alignValues = ['start', 'center', 'end', 'baseline'] as const;
const gapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const orientationValues = ['horizontal', 'vertical'] as const;
const sizes = ['1', '2', '3'] as const;
const widthValues = ['1', '2', '3'] as const;

const dataListPropDefs = {
  gap: {
    type: 'enum | string',
    className: 'rt-r-gap',
    customProperties: ['--gap'],
    values: gapValues,
    default: '4',
    responsive: true,
  },
  gapX: {
    type: 'enum | string',
    className: 'rt-r-cg',
    customProperties: ['--column-gap'],
    values: gapValues,
    default: undefined,
    responsive: true,
  },
  gapY: {
    type: 'enum | string',
    className: 'rt-r-rg',
    customProperties: ['--row-gap'],
    values: gapValues,
    default: undefined,
    responsive: true,
  },
  orientation: {
    type: 'enum',
    className: 'rt-r-dl-orient',
    values: orientationValues,
    default: 'horizontal',
    responsive: true,
  },
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: '2',
    responsive: true,
  },
  trim: {
    ...trimProp,
    className: 'rt-r-dl-trim', // Custom trim styles due to grid layout
  },
} satisfies {
  orientation?: PropDef<(typeof orientationValues)[number]>;
  gap?: PropDef<(typeof gapValues)[number]>;
  gapX?: PropDef<(typeof gapValues)[number]>;
  gapY?: PropDef<(typeof gapValues)[number]>;
  size?: PropDef<(typeof sizes)[number]>;
  trim?: typeof trimProp;
};

const dataListItemPropDefs = {
  align: {
    type: 'enum',
    className: 'rt-r-dl-vaf',
    values: alignValues,
    default: 'baseline',
    responsive: true,
  },
} satisfies {
  align?: PropDef<(typeof alignValues)[number]>;
};

const dataListLabelPropDefs = {
  width: {
    type: 'enum | string',
    className: 'rt-r-dl-width',
    customProperties: ['--dl-label-width'],
    values: widthValues,
    default: '2',
    responsive: true,
  },
  minWidth: {
    type: 'enum | string',
    className: 'rt-r-dl-min-width',
    customProperties: ['--dl-label-min-width'],
    values: widthValues,
    default: undefined,
    responsive: true,
  },
  maxWidth: {
    type: 'enum | string',
    className: 'rt-r-dl-max-width',
    customProperties: ['--dl-label-max-width'],
    values: widthValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  width?: PropDef<(typeof widthValues)[number]>;
  minWidth?: PropDef<(typeof widthValues)[number]>;
  maxWidth?: PropDef<(typeof widthValues)[number]>;
};

export { dataListPropDefs, dataListItemPropDefs, dataListLabelPropDefs };
