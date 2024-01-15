import type { GetPropDefTypes, PropDef } from './prop-def';

const paddingValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const paddingPropDefs = {
  p: {
    type: 'enum | string',
    className: 'rt-r-p',
    customProperty: '--padding',
    values: paddingValues,
    default: undefined,
    responsive: true,
  },
  px: {
    type: 'enum | string',
    className: 'rt-r-px',
    customProperty: '--padding-left, --padding-right',
    values: paddingValues,
    default: undefined,
    responsive: true,
  },
  py: {
    type: 'enum | string',
    className: 'rt-r-py',
    customProperty: '--padding-top, --padding-bottom',
    values: paddingValues,
    default: undefined,
    responsive: true,
  },
  pt: {
    type: 'enum | string',
    className: 'rt-r-pt',
    customProperty: '--padding-top',
    values: paddingValues,
    default: undefined,
    responsive: true,
  },
  pr: {
    type: 'enum | string',
    className: 'rt-r-pr',
    customProperty: '--padding-right',
    values: paddingValues,
    default: undefined,
    responsive: true,
  },
  pb: {
    type: 'enum | string',
    className: 'rt-r-pb',
    customProperty: '--padding-bottom',
    values: paddingValues,
    default: undefined,
    responsive: true,
  },
  pl: {
    type: 'enum | string',
    className: 'rt-r-pl',
    customProperty: '--padding-left',
    values: paddingValues,
    default: undefined,
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
