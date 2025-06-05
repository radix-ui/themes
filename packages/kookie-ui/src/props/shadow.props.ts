import type { PropDef, GetPropDefTypes } from './prop-def.js';

const shadowValues = ['1', '2', '3', '4', '5', '6'] as const;

const shadowPropDefs = {
  /**
   * Sets the CSS **box-shadow** property using design system shadow tokens.
   * Supports shadow scale values and responsive objects.
   *
   * @example
   * shadow="3"
   * shadow={{ sm: '2', lg: '4' }}
   *
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
   */
  shadow: {
    type: 'enum',
    className: 'rt-r-shadow',
    values: shadowValues,
    responsive: true,
  },
} satisfies {
  shadow: PropDef<(typeof shadowValues)[number]>;
};

type ShadowProps = GetPropDefTypes<typeof shadowPropDefs>;

export { shadowPropDefs };
export type { ShadowProps };
