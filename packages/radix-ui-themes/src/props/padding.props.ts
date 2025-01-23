import type { GetPropDefTypes, PropDef } from './prop-def';

const paddingValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const paddingPropDefs = {
  /**
   * Sets the CSS **padding** property.
   * Supports space scale values, CSS strings, and responsive objects.
   *
   * @example
   * p="4"
   * p="100px"
   * p={{ sm: '6', lg: '9' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/padding
   */
  p: {
    type: 'enum | string',
    className: 'rt-r-p',
    customProperties: ['--p'],
    values: paddingValues,
    responsive: true,
  },
  /**
   * Sets the CSS **padding-left** and **padding-right** properties.
   * Supports space scale values, CSS strings, and responsive objects.
   *
   * @example
   * px="4"
   * px="100px"
   * px={{ sm: '6', lg: '9' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left
   * https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right
   */
  px: {
    type: 'enum | string',
    className: 'rt-r-px',
    customProperties: ['--pl', '--pr'],
    values: paddingValues,
    responsive: true,
  },
  /**
   * Sets the CSS **padding-top** and **padding-bottom** properties.
   * Supports space scale values, CSS strings, and responsive objects.
   *
   * @example
   * py="4"
   * py="100px"
   * py={{ sm: '6', lg: '9' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top
   * https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom
   */
  py: {
    type: 'enum | string',
    className: 'rt-r-py',
    customProperties: ['--pt', '--pb'],
    values: paddingValues,
    responsive: true,
  },
  /**
   * Sets the CSS **padding-top** property.
   * Supports space scale values, CSS strings, and responsive objects.
   *
   * @example
   * pt="4"
   * pt="100px"
   * pt={{ sm: '6', lg: '9' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top
   */
  pt: {
    type: 'enum | string',
    className: 'rt-r-pt',
    customProperties: ['--pt'],
    values: paddingValues,
    responsive: true,
  },
  /**
   * Sets the CSS **padding-right** property.
   * Supports space scale values, CSS strings, and responsive objects.
   *
   * @example
   * pr="4"
   * pr="100px"
   * pr={{ sm: '6', lg: '9' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right
   */
  pr: {
    type: 'enum | string',
    className: 'rt-r-pr',
    customProperties: ['--pr'],
    values: paddingValues,
    responsive: true,
  },
  /**
   * Sets the CSS **padding-bottom** property.
   * Supports space scale values, CSS strings, and responsive objects.
   *
   * @example
   * pb="4"
   * pb="100px"
   * pb={{ sm: '6', lg: '9' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom
   */
  pb: {
    type: 'enum | string',
    className: 'rt-r-pb',
    customProperties: ['--pb'],
    values: paddingValues,
    responsive: true,
  },
  /**
   * Sets the CSS **padding-left** property.
   * Supports space scale values, CSS strings, and responsive objects.
   *
   * @example
   * pl="4"
   * pl="100px"
   * pl={{ sm: '6', lg: '9' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left
   */
  pl: {
    type: 'enum | string',
    className: 'rt-r-pl',
    customProperties: ['--pl'],
    values: paddingValues,
    responsive: true,
  },
} satisfies {
  p: PropDef<(typeof paddingValues)[number]>;
  px: PropDef<(typeof paddingValues)[number]>;
  py: PropDef<(typeof paddingValues)[number]>;
  pt: PropDef<(typeof paddingValues)[number]>;
  pr: PropDef<(typeof paddingValues)[number]>;
  pb: PropDef<(typeof paddingValues)[number]>;
  pl: PropDef<(typeof paddingValues)[number]>;
};

type PaddingProps = GetPropDefTypes<typeof paddingPropDefs>;

export { paddingPropDefs };
export type { PaddingProps };
