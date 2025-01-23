import { asChildPropDef } from '../props/as-child.prop.js';

import type { PropDef, GetPropDefTypes } from '../props/prop-def.js';

const sizes = ['1', '2', '3', '4'] as const;
const displayValues = ['none', 'initial'] as const;
const alignValues = ['left', 'center', 'right'] as const;

const containerPropDefs = {
  ...asChildPropDef,
  /**
   * Controls the **max-width** of the content within the container.
   * Supports the predefined values and responsive objects.
   *
   * @values
   * | Size     | Max. width |
   * | :------- | ---------: |
   * | size="1" | 448px      |
   * | size="2" | 688px      |
   * | size="3" | 880px      |
   * | size="4" | 1136px     |
   *
   * @example
   * size="4"
   * size={{ sm: '3', lg: '4' }}
   *
   * @link
   * https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/container.css
   */
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: sizes,
    default: '4',
    responsive: true,
  },
  /**
   * Controls whether the container is visible or hidden.
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
  /**
   * Controls the alignment of the content within the container.
   *
   * @example
   * align="center"
   * align={{ initial: 'left', lg: 'center' }}
   */
  align: {
    type: 'enum',
    className: 'rt-r-ai',
    values: alignValues,
    parseValue: parseAlignValue,
    responsive: true,
  },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
  display: PropDef<(typeof displayValues)[number]>;
  align: PropDef<(typeof alignValues)[number]>;
};

function parseDisplayValue(value: string) {
  return value === 'initial' ? 'flex' : value;
}

function parseAlignValue(value: string) {
  return value === 'left' ? 'start' : value === 'right' ? 'end' : value;
}

// Use all of the imported prop defs to ensure that JSDoc works
type ContainerOwnProps = GetPropDefTypes<typeof containerPropDefs & typeof asChildPropDef>;

export { containerPropDefs };
export type { ContainerOwnProps };
