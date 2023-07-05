import * as React from 'react';
import classNames from 'classnames';
import { sectionSizeDefault } from './section.props';
import {
  extractMarginProps,
  withMarginProps,
  extractLayoutProps,
  withLayoutProps,
  withBreakpoints,
} from '../helpers';

import type { SectionSize, SectionDisplay } from './section.props';
import type { MarginProps, LayoutProps, Responsive } from '../helpers';

type SectionElement = React.ElementRef<'div'>;
interface SectionProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps, LayoutProps {
  size?: Responsive<SectionSize>;
  display?: Responsive<SectionDisplay>;
}
const Section = React.forwardRef<SectionElement, SectionProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const { className, size = sectionSizeDefault, display, ...sectionProps } = layoutRest;
  return (
    <section
      {...sectionProps}
      ref={forwardedRef}
      className={classNames(
        className,
        'rui-Section',
        withBreakpoints(size, 'size'),
        withMarginProps(marginProps),
        withLayoutProps(layoutProps),
        withBreakpoints(display, 'rui-display')
      )}
    />
  );
});
Section.displayName = 'Section';

export { Section };
