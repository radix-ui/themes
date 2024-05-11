import { paddingPropDefs } from '../props/padding.props.js';
import { widthPropDefs } from '../props/width.props.js';

import type { PropDef } from '../props/prop-def.js';

const sizes = ['1', '2', '3'] as const;
const variants = ['surface', 'ghost'] as const;
const layoutValues = ['auto', 'fixed'] as const;

const tableRootPropDefs = {
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: '2',
    responsive: true,
  },
  variant: {
    type: 'enum',
    className: 'rt-variant',
    values: variants,
    default: 'ghost',
  },
  layout: {
    type: 'enum',
    className: 'rt-r-tl',
    values: layoutValues,
    responsive: true,
  },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
  layout: PropDef<(typeof layoutValues)[number]>;
};

const rowAlign = ['start', 'center', 'end', 'baseline'] as const;

const tableRowPropDefs = {
  align: {
    type: 'enum',
    className: 'rt-r-va',
    values: rowAlign,
    parseValue: parseAlignValue,
    responsive: true,
  },
} satisfies {
  align: PropDef<(typeof rowAlign)[number]>;
};

function parseAlignValue(value: string) {
  return {
    baseline: 'baseline',
    start: 'top',
    center: 'middle',
    end: 'bottom',
  }[value];
}

const justifyValues = ['start', 'center', 'end'] as const;

const tableCellPropDefs = {
  justify: {
    type: 'enum',
    className: 'rt-r-ta',
    values: justifyValues,
    parseValue: parseJustifyValue,
    responsive: true,
  },
  ...widthPropDefs,
  ...paddingPropDefs,
} satisfies {
  justify: PropDef<(typeof justifyValues)[number]>;
};

function parseJustifyValue(value: string) {
  return {
    start: 'left',
    center: 'center',
    end: 'right',
  }[value];
}

export { tableRootPropDefs, tableRowPropDefs, tableCellPropDefs };
