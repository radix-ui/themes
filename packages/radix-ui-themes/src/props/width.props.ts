import { GetPropDefTypes, PropDef } from './prop-def.js';

const widthPropDefs = {
  width: {
    type: 'string',
    className: 'rt-r-w',
    customProperties: ['--width'],
    default: undefined,
    responsive: true,
  },
  minWidth: {
    type: 'string',
    className: 'rt-r-min-w',
    customProperties: ['--min-width'],
    default: undefined,
    responsive: true,
  },
  maxWidth: {
    type: 'string',
    className: 'rt-r-max-w',
    customProperties: ['--max-width'],
    default: undefined,
    responsive: true,
  },
} satisfies {
  width: PropDef<string>;
  minWidth: PropDef<string>;
  maxWidth: PropDef<string>;
};

type WidthProps = GetPropDefTypes<typeof widthPropDefs>;

export { widthPropDefs };
export type { WidthProps };
