import { GetPropDefTypes, PropDef } from './prop-def.js';

const widthValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

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
  width: PropDef<(typeof widthValues)[number]>;
  minWidth: PropDef<(typeof widthValues)[number]>;
  maxWidth: PropDef<(typeof widthValues)[number]>;
};

type WidthProps = GetPropDefTypes<typeof widthPropDefs>;

export { widthPropDefs };
export type { WidthProps };
