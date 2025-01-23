import { asChildPropDef } from '../props/as-child.prop.js';
import { gapPropDefs } from '../props/gap.props.js';

import type { PropDef, GetPropDefTypes } from '../props/prop-def.js';

const as = ['div', 'span'] as const;
const displayValues = ['none', 'inline-grid', 'grid'] as const;
const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const rowsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const flowValues = ['row', 'column', 'dense', 'row-dense', 'column-dense'] as const;
const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const justifyValues = ['start', 'center', 'end', 'between'] as const;

const gridPropDefs = {
  /**
   * Controls whether to render **div** or **span**
   *
   * @example
   * as="div"
   * as="span"
   */
  as: { type: 'enum', values: as, default: 'div' },
  ...asChildPropDef,
  /**
   * Sets the CSS **display** property.
   * Supports a subset of the corresponding CSS values and responsive objects.
   *
   * @example
   * display="inline-grid"
   * display={{ sm: 'none', lg: 'grid' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/display
   */
  display: {
    type: 'enum',
    className: 'rt-r-display',
    values: displayValues,
    responsive: true,
  },
  /**
   * Sets the CSS **grid-template** property.
   * Supports a subset of the corresponding CSS values and responsive objects.
   *
   * @example
   * template='"header header" "sidebar content"'
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
   */
  areas: {
    type: 'string',
    className: 'rt-r-gta',
    customProperties: ['--grid-template-areas'],
    responsive: true,
  },
  /**
   * Sets the CSS **grid-template-columns** property.
   * Supports numeric string values, CSS strings and responsive objects.
   *
   * Use numeric string values to create grid columns of even size.
   *
   * @example
   * columns="3"
   * columns="100px 1fr"
   * columns={{ xs: '1', md: 'auto 1fr' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   */
  columns: {
    type: 'enum | string',
    className: 'rt-r-gtc',
    customProperties: ['--grid-template-columns'],
    values: columnsValues,
    parseValue: parseGridValue,
    responsive: true,
  },
  /**
   * Sets the CSS **grid-template-rows** property.
   * Supports numeric string values, CSS strings and responsive objects.
   *
   * Use numeric string values to create grid rows of even size.
   *
   * @example
   * rows="3"
   * rows="100px 1fr"
   * rows={{ xs: '1', md: 'auto 1fr' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
   */
  rows: {
    type: 'enum | string',
    className: 'rt-r-gtr',
    customProperties: ['--grid-template-rows'],
    values: rowsValues,
    parseValue: parseGridValue,
    responsive: true,
  },
  /**
   * Sets the CSS **grid-auto-flow** property.
   * Supports the corresponding CSS values and responsive objects.
   *
   * @example
   * flow="column"
   * flow={{ sm: 'column', lg: 'row' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
   */
  flow: {
    type: 'enum',
    className: 'rt-r-gaf',
    values: flowValues,
    responsive: true,
  },
  /**
   * Sets the CSS **align-items** property.
   * Supports the corresponding CSS values and responsive objects.
   *
   * @example
   * align="center"
   * align={{ sm: 'baseline', lg: 'center' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
   */
  align: {
    type: 'enum',
    className: 'rt-r-ai',
    values: alignValues,
    responsive: true,
  },
  /**
   * Sets the CSS **justify-content** property.
   * Supports a subset of the corresponding CSS values and responsive objects.
   *
   * @example
   * justify="between"
   * justify={{ sm: 'start', lg: 'center' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
   */
  justify: {
    type: 'enum',
    className: 'rt-r-jc',
    values: justifyValues,
    parseValue: parseJustifyValue,
    responsive: true,
  },
  ...gapPropDefs,
} satisfies {
  as: PropDef<(typeof as)[number]>;
  display: PropDef<(typeof displayValues)[number]>;
  areas: PropDef<string>;
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

// Use all of the imported prop defs to ensure that JSDoc works
type GridOwnProps = GetPropDefTypes<typeof gridPropDefs & typeof asChildPropDef>;

export { gridPropDefs };
export type { GridOwnProps };
