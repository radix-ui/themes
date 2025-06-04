import { asChildPropDef } from '../props/as-child.prop.js';

import type { PropDef, GetPropDefTypes } from '../props/prop-def.js';

const sizes = ['1', '2', '3', '4'] as const;
const displayValues = ['none', 'initial'] as const;

const sectionPropDefs = {
  ...asChildPropDef,
  /**
   * Controls the vertical padding of the section.
   *
   * @values
   * | Size     | Padding |
   * | :------- | ------: |
   * | size="1" | 24px    |
   * | size="2" | 40px    |
   * | size="3" | 64px    |
   * | size="4" | 80px    |
   *
   * @example
   * size="4"
   * size={{ sm: '3', lg: '4' }}
   *
   * @link
   * https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/section.css
   */
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: '3',
    responsive: true,
  },
  /**
   * Controls whether the section is visible or hidden.
   * Supports "none", "initial", and responsive object values.
   *
   * @example
   * display="none"
   * display={{ sm: 'none', lg: 'initial' }}
   */
  display: {
    type: 'enum',
    className: 'rt-r-display',
    values: displayValues,
    parseValue: parseDisplayValue,
    responsive: true,
  },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  display: PropDef<(typeof displayValues)[number]>;
};

function parseDisplayValue(value: string) {
  return value === 'initial' ? 'block' : value;
}

// Use all of the imported prop defs to ensure that JSDoc works
type SectionOwnProps = GetPropDefTypes<typeof sectionPropDefs & typeof asChildPropDef>;

export { sectionPropDefs };
export type { SectionOwnProps };
