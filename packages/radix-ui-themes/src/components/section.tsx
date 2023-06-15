import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withBreakpoints, withMargin } from '../helpers';

import type { MarginProps, Responsive } from '../helpers';

type SectionElement = React.ElementRef<'div'>;
interface SectionProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps {
  size?: Responsive<'1' | '2' | '3'>;
}
const Section = React.forwardRef<SectionElement, SectionProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, size = '3', ...sectionProps } = marginRest;

  return (
    <section
      {...sectionProps}
      ref={forwardedRef}
      className={classNames(
        className,
        'rui-Section',
        withBreakpoints(size, 'size'),
        withMargin(marginProps)
      )}
    />
  );
});
Section.displayName = 'Section';

export { Section };
