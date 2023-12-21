import * as React from 'react';
import classNames from 'classnames';
import { sectionPropDefs } from './section.props';
import {
  extractLayoutProps,
  extractMarginProps,
  getLayoutStyles,
  mergeStyles,
  withBreakpoints,
  withMarginProps,
} from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes } from '../helpers';

type SectionElement = React.ElementRef<'div'>;
type SectionOwnProps = GetPropDefTypes<typeof sectionPropDefs>;
interface SectionProps
  extends React.ComponentPropsWithoutRef<'div'>,
    MarginProps,
    LayoutProps,
    SectionOwnProps {}
const Section = React.forwardRef<SectionElement, SectionProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const {
    className,
    style,
    size = sectionPropDefs.size.default,
    display = sectionPropDefs.display.default,
    ...sectionProps
  } = layoutRest;
  const [layoutClassNames, layoutCustomProperties] = getLayoutStyles(layoutProps);
  return (
    <section
      {...sectionProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Section',
        className,
        withBreakpoints(size, 'rt-r-size'),
        withBreakpoints(display, 'rt-r-display'),
        withMarginProps(marginProps),
        layoutClassNames
      )}
      style={mergeStyles(layoutCustomProperties, style)}
    />
  );
});
Section.displayName = 'Section';

export { Section };
export type { SectionProps };
