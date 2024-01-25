import type { PropDef } from '..';

const textWrapValues = ['wrap', 'nowrap', 'pretty', 'balance'] as const;

const textWrapProp = {
  type: 'enum',
  className: 'rt-r-tw',
  values: textWrapValues,
  default: undefined,
  responsive: true,
} satisfies PropDef<(typeof textWrapValues)[number]>;

export { textWrapProp };
