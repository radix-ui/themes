import type { PropDef } from '../helpers';
import { paddingPropDefs, widthPropDefs } from '../helpers';

const sizes = ['1', '2', '3'] as const;
const variants = ['surface', 'ghost'] as const;
const layoutValues = ['auto', 'fixed'] as const;

const tableRootPropDefs = {
  layout: { type: 'enum', values: layoutValues, default: undefined, responsive: true },
  size: { type: 'enum', values: sizes, default: '2', responsive: true },
  variant: { type: 'enum', values: variants, default: 'ghost' },
} satisfies {
  layout: PropDef<(typeof layoutValues)[number]>;
  size: PropDef<(typeof sizes)[number]>;
  variant: PropDef<(typeof variants)[number]>;
};

const rowAlign = ['start', 'center', 'end', 'baseline'] as const;

const tableRowPropDefs = {
  align: { type: 'enum', values: rowAlign, default: undefined, responsive: true },
} satisfies {
  align: PropDef<(typeof rowAlign)[number]>;
};

const justifyValues = ['start', 'center', 'end'] as const;

const tableCellPropDefs = {
  justify: { type: 'enum', values: justifyValues, default: undefined, responsive: true },
  ...widthPropDefs,
  ...paddingPropDefs,
} satisfies {
  justify: PropDef<(typeof justifyValues)[number]>;
};

export { tableRootPropDefs, tableRowPropDefs, tableCellPropDefs };
