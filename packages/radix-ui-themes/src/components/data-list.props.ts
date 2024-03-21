import {
  widthPropDefs,
  leadingTrimPropDef,
  colorPropDef,
  highContrastPropDef,
} from '../props/index.js';
import type { PropDef } from '../props/index.js';

const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const orientationValues = ['horizontal', 'vertical'] as const;
const sizes = ['1', '2', '3'] as const;

const dataListRootPropDefs = {
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
    ...leadingTrimPropDef.trim,
    className: 'rt-r-trim', // Custom trim styles due to grid layout
  },
} satisfies {
  orientation: PropDef<(typeof orientationValues)[number]>;
  size: PropDef<(typeof sizes)[number]>;
  trim: typeof leadingTrimPropDef.trim;
};

const dataListItemPropDefs = {
  align: {
    type: 'enum',
    className: 'rt-r-ai',
    values: alignValues,
    responsive: true,
  },
} satisfies {
  align: PropDef<(typeof alignValues)[number]>;
};

const dataListLabelPropDefs = {
  ...widthPropDefs,
  ...colorPropDef,
  ...highContrastPropDef,
};

export { dataListRootPropDefs, dataListItemPropDefs, dataListLabelPropDefs };
