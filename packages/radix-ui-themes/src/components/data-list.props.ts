import { widthPropDefs, trimProp, gapProp } from '../helpers';
import type { PropDef } from '../helpers';

const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const orientationValues = ['horizontal', 'vertical'] as const;
const sizes = ['1', '2', '3'] as const;

const dataListPropDefs = {
  ...gapProp,
  gap: {
    ...gapProp.gap,
    default: '4',
  },
  orientation: {
    type: 'enum',
    className: 'rt-r-orientation',
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
    className: 'rt-r-trim', // Custom trim styles due to grid layout
  },
} satisfies {
  gap?: Omit<typeof gapProp.gap, 'default'> & { default: string };
  orientation?: PropDef<(typeof orientationValues)[number]>;
  size?: PropDef<(typeof sizes)[number]>;
  trim?: typeof trimProp;
};

const dataListItemPropDefs = {
  align: {
    type: 'enum',
    className: 'rt-r-ai',
    values: alignValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  align?: PropDef<(typeof alignValues)[number]>;
};

const dataListLabelPropDefs = widthPropDefs;

export { dataListPropDefs, dataListItemPropDefs, dataListLabelPropDefs };
