import * as React from 'react';
import classNames from 'classnames';
import { sectionSizeDefault } from './section.props';
import { extractMarginProps, withBreakpoints, withMarginProps } from '../helpers';

import type { SectionSize } from './section.props';
import type { MarginProps, Responsive } from '../helpers';

type SectionElement = React.ElementRef<'div'>;
interface SectionProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps {
  size?: Responsive<SectionSize>;
}
const Section = React.forwardRef<SectionElement, SectionProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, size = sectionSizeDefault, ...sectionProps } = marginRest;
  return (
    <section
      {...sectionProps}
      ref={forwardedRef}
      className={classNames(
        className,
        'rui-Section',
        withBreakpoints(size, 'size'),
        withMarginProps(marginProps)
      )}
    />
  );
});
Section.displayName = 'Section';

export { Section };
