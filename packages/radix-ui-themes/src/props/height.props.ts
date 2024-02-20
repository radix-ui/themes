import { GetPropDefTypes, PropDef } from './prop-def.js';

const heightPropDefs = {
  height: {
    type: 'string',
    className: 'rt-r-h',
    customProperties: ['--height'],
    default: undefined,
    responsive: true,
  },
  minHeight: {
    type: 'string',
    className: 'rt-r-min-h',
    customProperties: ['--min-height'],
    default: undefined,
    responsive: true,
  },
  maxHeight: {
    type: 'string',
    className: 'rt-r-max-h',
    customProperties: ['--max-height'],
    default: undefined,
    responsive: true,
  },
} satisfies {
  height: PropDef<string>;
  minHeight: PropDef<string>;
  maxHeight: PropDef<string>;
};

type HeightProps = GetPropDefTypes<typeof heightPropDefs>;

export { heightPropDefs };
export type { HeightProps };
