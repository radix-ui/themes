import { GetPropDefTypes, PropDef } from './prop-def';

const widthValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const widthPropDefs = {
  width: {
    type: 'enum | string',
    className: 'rt-r-w',
    customProperty: '--width',
    values: widthValues,
    default: undefined,
    responsive: true,
  },
  minWidth: {
    type: 'enum | string',
    className: 'rt-r-min-w',
    customProperty: '--min-width',
    values: widthValues,
    default: undefined,
    responsive: true,
  },
  maxWidth: {
    type: 'enum | string',
    className: 'rt-r-max-w',
    customProperty: '--max-width',
    values: widthValues,
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
