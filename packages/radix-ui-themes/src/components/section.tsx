import * as React from 'react';
import classNames from 'classnames';
import { sectionPropDefs } from './section.props';
import {
  extractMarginProps,
  withMarginProps,
  extractLayoutProps,
  withLayoutProps,
  withBreakpoints,
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
    size = sectionPropDefs.size.default,
    display = sectionPropDefs.display.default,
    ...sectionProps
  } = layoutRest;
  return (
    <section
      {...sectionProps}
      ref={forwardedRef}
      className={classNames(
        'rt-Section',
        className,
        withBreakpoints(size, 'rt-r-size'),
        withBreakpoints(display, 'rt-r-display'),
        withLayoutProps(layoutProps),
        withMarginProps(marginProps)
      )}
    />
  );
});
Section.displayName = 'Section';

export { Section };
export type { SectionProps };
