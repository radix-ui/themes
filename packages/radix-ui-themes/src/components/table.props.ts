import { radiusProp } from '../helpers';
import type { PropDef } from '../helpers';

const tableRootPropDefs = {
  radius: radiusProp,
} satisfies {
  radius: typeof radiusProp;
};

const rowAlign = ['start', 'center', 'end', 'baseline'] as const;

const tableRowPropDefs = {
  align: { type: 'enum', values: rowAlign, default: undefined, responsive: true },
} satisfies {
  align: PropDef<(typeof rowAlign)[number]>;
};

const cellJustify = ['start', 'center', 'end'] as const;

const tableCellPropDefs = {
  justify: { type: 'enum', values: cellJustify, default: undefined, responsive: true },
  width: { type: 'string | number', default: undefined },
} satisfies {
  justify: PropDef<(typeof cellJustify)[number]>;
  width: PropDef<string | number>;
};

export { tableRootPropDefs, tableRowPropDefs, tableCellPropDefs };
