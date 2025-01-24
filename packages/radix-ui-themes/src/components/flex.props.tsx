import { asChildPropDef } from '../props/as-child.prop.js';
import { gapPropDefs } from '../props/gap.props.js';

import type { PropDef, GetPropDefTypes } from '../props/prop-def.js';

const as = ['div', 'span'] as const;
const displayValues = ['none', 'inline-flex', 'flex'] as const;
const directionValues = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const justifyValues = ['start', 'center', 'end', 'between'] as const;
const wrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;

const flexPropDefs = {
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
   * display="inline-flex"
   * display={{ sm: 'none', lg: 'flex' }}
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
   * Sets the CSS **flex-direction** property.
   * Supports the corresponding CSS values and responsive objects.
   *
   * @example
   * direction="column"
   * direction={{ sm: 'column', lg: 'row' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
   */
  direction: {
    type: 'enum',
    className: 'rt-r-fd',
    values: directionValues,
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
  /**
   * Sets the CSS **flex-wrap** property.
   * Supports the corresponding CSS values and responsive objects.
   *
   * @example
   * wrap="wrap"
   * wrap={{ sm: 'wrap', lg: 'nowrap' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
   */
  wrap: {
    type: 'enum',
    className: 'rt-r-fw',
    values: wrapValues,
    responsive: true,
  },
  ...gapPropDefs,
} satisfies {
  as: PropDef<(typeof as)[number]>;
  display: PropDef<(typeof displayValues)[number]>;
  direction: PropDef<(typeof directionValues)[number]>;
  align: PropDef<(typeof alignValues)[number]>;
  justify: PropDef<(typeof justifyValues)[number]>;
  wrap: PropDef<(typeof wrapValues)[number]>;
};

function parseJustifyValue(value: string) {
  return value === 'between' ? 'space-between' : value;
}

// Use all of the imported prop defs to ensure that JSDoc works
type FlexOwnProps = GetPropDefTypes<
  typeof flexPropDefs & typeof gapPropDefs & typeof asChildPropDef
>;

export { flexPropDefs };
export type { FlexOwnProps };
