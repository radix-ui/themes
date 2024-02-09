import { GetPropDefTypes, PropDef } from './prop-def.js';

const heightValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const heightPropDefs = {
  height: {
    type: 'enum | string',
    className: 'rt-r-h',
    customProperties: ['--height'],
    values: heightValues,
    default: undefined,
    responsive: true,
  },
  minHeight: {
    type: 'enum | string',
    className: 'rt-r-min-h',
    customProperties: ['--min-height'],
    values: heightValues,
    default: undefined,
    responsive: true,
  },
  maxHeight: {
    type: 'enum | string',
    className: 'rt-r-max-h',
    customProperties: ['--max-height'],
    values: heightValues,
    default: undefined,
    responsive: true,
  },
} satisfies {
  height: PropDef<(typeof heightValues)[number]>;
  minHeight: PropDef<(typeof heightValues)[number]>;
  maxHeight: PropDef<(typeof heightValues)[number]>;
};

type HeightProps = GetPropDefTypes<typeof heightPropDefs>;

export { heightPropDefs };
export type { HeightProps };
