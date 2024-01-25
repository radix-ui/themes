import { gapProps } from '../helpers';
import type { PropDef } from '../helpers';

const displayValues = ['none', 'inline-grid', 'grid'] as const;
const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const rowsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const flowValues = ['row', 'column', 'dense', 'row-dense', 'column-dense'] as const;
const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const justifyValues = ['start', 'center', 'end', 'between'] as const;

const gridPropDefs = {
  display: {
    type: 'enum',
    className: 'rt-r-display',
    values: displayValues,
    default: undefined,
    responsive: true,
  },
  columns: {
    type: 'enum | string',
    className: 'rt-r-gtc',
    customProperties: ['--grid-template-columns'],
    values: columnsValues,
    parseValue: parseGridValue,
    default: undefined,
    responsive: true,
  },
  rows: {
    type: 'enum | string',
    className: 'rt-r-gtr',
    customProperties: ['--grid-template-rows'],
    values: rowsValues,
    parseValue: parseGridValue,
    default: undefined,
    responsive: true,
  },
  flow: {
    type: 'enum',
    className: 'rt-r-gaf',
    values: flowValues,
    default: undefined,
    responsive: true,
  },
  align: {
    type: 'enum',
    className: 'rt-r-ai',
    values: alignValues,
    default: undefined,
    responsive: true,
  },
  justify: {
    type: 'enum',
    className: 'rt-r-jc',
    values: justifyValues,
    parseValue: parseJustifyValue,
    default: undefined,
    responsive: true,
  },
  ...gapProps,
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
  columns: PropDef<(typeof columnsValues)[number]>;
  rows: PropDef<(typeof rowsValues)[number]>;
  flow: PropDef<(typeof flowValues)[number]>;
  align: PropDef<(typeof alignValues)[number]>;
  justify: PropDef<(typeof justifyValues)[number]>;
};

function parseGridValue(value: string): string {
  if ((gridPropDefs.columns.values as readonly string[]).includes(value)) {
    return value;
  }

  return value?.match(/^\d+$/) ? `repeat(${value}, minmax(0, 1fr))` : value;
}

function parseJustifyValue(value: string) {
  return value === 'between' ? 'space-between' : value;
}

export { gridPropDefs };
