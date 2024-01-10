import classNames from 'classnames';
import { getResponsiveStyles } from '../breakpoints';
import { mergeStyles } from '../merge-styles';

import type { GetPropDefTypes, PropDef } from './prop-def';

const paddingValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;

const paddingPropDefs = {
  p: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  px: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  py: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  pt: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  pr: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  pb: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
  pl: { type: 'enum | string', values: paddingValues, default: undefined, responsive: true },
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

function extractPaddingProps<T extends PaddingProps>(props: T) {
  const {
    p = paddingPropDefs.p.default,
    px = paddingPropDefs.px.default,
    py = paddingPropDefs.py.default,
    pt = paddingPropDefs.pt.default,
    pr = paddingPropDefs.pr.default,
    pb = paddingPropDefs.pb.default,
    pl = paddingPropDefs.pl.default,
    ...rest
  } = props;
  return { p, px, py, pt, pr, pb, pl, rest };
}

function getPaddingStyles(props: PaddingProps) {
  const [pClassNames, pCustomProperties] = getResponsiveStyles({
    className: 'rt-r-p',
    customProperty: '--padding',
    propValues: paddingValues,
    value: props.p,
  });

  const [pxClassNames, pxCustomProperties] = getResponsiveStyles({
    className: 'rt-r-px',
    customProperty: ['--padding-left', '--padding-right'],
    propValues: paddingValues,
    value: props.px,
  });

  const [pyClassNames, pyCustomProperties] = getResponsiveStyles({
    className: 'rt-r-py',
    customProperty: ['--padding-top', '--padding-bottom'],
    propValues: paddingValues,
    value: props.py,
  });

  const [ptClassNames, ptCustomProperties] = getResponsiveStyles({
    className: 'rt-r-pt',
    customProperty: '--padding-top',
    propValues: paddingValues,
    value: props.pt,
  });

  const [prClassNames, prCustomProperties] = getResponsiveStyles({
    className: 'rt-r-pr',
    customProperty: '--padding-right',
    propValues: paddingValues,
    value: props.pr,
  });

  const [pbClassNames, pbCustomProperties] = getResponsiveStyles({
    className: 'rt-r-pb',
    customProperty: '--padding-bottom',
    propValues: paddingValues,
    value: props.pb,
  });

  const [plClassNames, plCustomProperties] = getResponsiveStyles({
    className: 'rt-r-pl',
    customProperty: '--padding-left',
    propValues: paddingValues,
    value: props.pl,
  });

  return [
    classNames(
      pClassNames,
      pxClassNames,
      pyClassNames,
      ptClassNames,
      prClassNames,
      pbClassNames,
      plClassNames
    ),
    mergeStyles(
      pCustomProperties,
      pxCustomProperties,
      pyCustomProperties,
      ptCustomProperties,
      prCustomProperties,
      pbCustomProperties,
      plCustomProperties
    ),
  ] as const;
}

export { paddingPropDefs, extractPaddingProps, getPaddingStyles };
export type { PaddingProps };
