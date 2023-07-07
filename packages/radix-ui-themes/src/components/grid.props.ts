import type { PropDef } from '../helpers';

const displayValues = ['none', 'inline-grid', 'grid'] as const;
const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const flowValues = ['row', 'column', 'dense', 'row-dense', 'column-dense'] as const;
const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const justifyValues = ['start', 'center', 'end', 'between'] as const;
const gapValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const gridPropDefs = {
  display: { type: 'enum', values: displayValues, default: 'grid', responsive: true },
  columns: { type: 'enum', values: columnsValues, default: '1', responsive: true },
  flow: { type: 'enum', values: flowValues, default: undefined, responsive: true },
  align: { type: 'enum', values: alignValues, default: 'stretch', responsive: true },
  justify: { type: 'enum', values: justifyValues, default: 'start', responsive: true },
  gap: { type: 'enum', values: gapValues, default: undefined, responsive: true },
  gapX: { type: 'enum', values: gapValues, default: undefined, responsive: true },
  gapY: { type: 'enum', values: gapValues, default: undefined, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
  columns: PropDef<(typeof columnsValues)[number]>;
  flow: PropDef<(typeof flowValues)[number]>;
  align: PropDef<(typeof alignValues)[number]>;
  justify: PropDef<(typeof justifyValues)[number]>;
  gap: PropDef<(typeof gapValues)[number]>;
  gapX: PropDef<(typeof gapValues)[number]>;
  gapY: PropDef<(typeof gapValues)[number]>;
};

export { gridPropDefs };
