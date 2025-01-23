import classNames from 'classnames';

import { getResponsiveStyles } from './get-responsive-styles';
import { mergeStyles } from './merge-styles';
import { marginPropDefs } from '../props/margin.props';

import type { MarginProps } from '../props/margin.props';

const marginValues = marginPropDefs.m.values;

export function getMarginStyles(props: MarginProps) {
  const [mClassNames, mCustomProperties] = getResponsiveStyles({
    className: 'rt-r-m',
    customProperties: ['--margin'],
    propValues: marginValues,
    value: props.m,
  });

  const [mxClassNames, mxCustomProperties] = getResponsiveStyles({
    className: 'rt-r-mx',
    customProperties: ['--margin-left', '--margin-right'],
    propValues: marginValues,
    value: props.mx,
  });

  const [myClassNames, myCustomProperties] = getResponsiveStyles({
    className: 'rt-r-my',
    customProperties: ['--margin-top', '--margin-bottom'],
    propValues: marginValues,
    value: props.my,
  });

  const [mtClassNames, mtCustomProperties] = getResponsiveStyles({
    className: 'rt-r-mt',
    customProperties: ['--margin-top'],
    propValues: marginValues,
    value: props.mt,
  });

  const [mrClassNames, mrCustomProperties] = getResponsiveStyles({
    className: 'rt-r-mr',
    customProperties: ['--margin-right'],
    propValues: marginValues,
    value: props.mr,
  });

  const [mbClassNames, mbCustomProperties] = getResponsiveStyles({
    className: 'rt-r-mb',
    customProperties: ['--margin-bottom'],
    propValues: marginValues,
    value: props.mb,
  });

  const [mlClassNames, mlCustomProperties] = getResponsiveStyles({
    className: 'rt-r-ml',
    customProperties: ['--margin-left'],
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
