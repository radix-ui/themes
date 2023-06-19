import * as React from 'react';
import classNames from 'classnames';
import { extractMarginProps, withBreakpoints, withMargin } from '../helpers';

import type { MarginProps, Responsive } from '../helpers';

const sectionSizes = ['1', '2', '3'] as const;
type SectionSize = (typeof sectionSizes)[number];
const defaultSectionSize: SectionSize = '3';

type SectionElement = React.ElementRef<'div'>;
interface SectionProps extends React.ComponentPropsWithoutRef<'div'>, MarginProps {
  size?: Responsive<SectionSize>;
}
const Section = React.forwardRef<SectionElement, SectionProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { className, size = defaultSectionSize, ...sectionProps } = marginRest;

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

export { sectionSizes, defaultSectionSize, Section };
export type { SectionSize };
