import classNames from 'classnames';
import { getResponsiveStyles } from '../responsive';
import { mergeStyles } from '../merge-styles';

import type { PropDef, GetPropDefTypes } from './prop-def';

// prettier-ignore
const marginValues = ['auto', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-1', '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9'] as const;

const marginPropDefs = {
  m: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-m',
    customProperty: '--margin',
  },
  mx: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-mx',
    customProperty: '--margin-left, --margin-right',
  },
  my: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-my',
    customProperty: '--margin-top, --margin-bottom',
  },
  mt: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-mt',
    customProperty: '--margin-top',
  },
  mr: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-mr',
    customProperty: '--margin-right',
  },
  mb: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-mb',
    customProperty: '--margin-bottom',
  },
  ml: {
    type: 'enum | string',
    values: marginValues,
    default: undefined,
    responsive: true,
    className: 'rt-r-ml',
    customProperty: '--margin-left',
  },
} satisfies {
  m: PropDef<(typeof marginValues)[number]>;
  mx: PropDef<(typeof marginValues)[number]>;
  my: PropDef<(typeof marginValues)[number]>;
  mt: PropDef<(typeof marginValues)[number]>;
  mr: PropDef<(typeof marginValues)[number]>;
  mb: PropDef<(typeof marginValues)[number]>;
  ml: PropDef<(typeof marginValues)[number]>;
};

type MarginProps = GetPropDefTypes<typeof marginPropDefs>;

function extractMarginProps<T extends MarginProps>(props: T) {
  const {
    m = marginPropDefs.m.default,
    mx = marginPropDefs.mx.default,
    my = marginPropDefs.my.default,
    mt = marginPropDefs.mt.default,
    mr = marginPropDefs.mr.default,
    mb = marginPropDefs.mb.default,
    ml = marginPropDefs.ml.default,
    ...rest
  } = props;
  return { m, mx, my, mt, mr, mb, ml, rest };
}

function getMarginStyles(props: MarginProps) {
  const [mClassNames, mCustomProperties] = getResponsiveStyles({
    className: 'rt-r-m',
    customProperty: '--margin',
    propValues: marginValues,
    value: props.m,
  });

  const [mxClassNames, mxCustomProperties] = getResponsiveStyles({
    className: 'rt-r-mx',
    customProperty: '--margin-left, --margin-right',
    propValues: marginValues,
    value: props.mx,
  });

  const [myClassNames, myCustomProperties] = getResponsiveStyles({
    className: 'rt-r-my',
    customProperty: '--margin-top, --margin-bottom',
    propValues: marginValues,
    value: props.my,
  });

  const [mtClassNames, mtCustomProperties] = getResponsiveStyles({
    className: 'rt-r-mt',
    customProperty: '--margin-top',
    propValues: marginValues,
    value: props.mt,
  });

  const [mrClassNames, mrCustomProperties] = getResponsiveStyles({
    className: 'rt-r-mr',
    customProperty: '--margin-right',
    propValues: marginValues,
    value: props.mr,
  });

  const [mbClassNames, mbCustomProperties] = getResponsiveStyles({
    className: 'rt-r-mb',
    customProperty: '--margin-bottom',
    propValues: marginValues,
    value: props.mb,
  });

  const [mlClassNames, mlCustomProperties] = getResponsiveStyles({
    className: 'rt-r-ml',
    customProperty: '--margin-left',
    propValues: marginValues,
    value: props.ml,
  });

  return [
    classNames(
      mClassNames,
      mxClassNames,
      myClassNames,
      mtClassNames,
      mrClassNames,
      mbClassNames,
      mlClassNames
    ),
    mergeStyles(
      mCustomProperties,
      mxCustomProperties,
      myCustomProperties,
      mtCustomProperties,
      mrCustomProperties,
      mbCustomProperties,
      mlCustomProperties
    ),
  ] as const;
}

export { marginPropDefs, extractMarginProps, getMarginStyles };
export type { MarginProps };
