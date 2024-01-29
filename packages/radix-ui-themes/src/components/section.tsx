import * as React from 'react';
import classNames from 'classnames';
import { sectionPropDefs } from './section.props';
import { deprecatedLayoutPropDefs, extractProps, layoutPropDefs, marginPropDefs } from '../helpers';

import type { MarginProps, LayoutProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type SectionElement = React.ElementRef<'div'>;
type SectionOwnProps = GetPropDefTypes<typeof sectionPropDefs>;
interface SectionProps
  extends PropsWithoutRefOrColor<'div'>,
    MarginProps,
    LayoutProps,
    SectionOwnProps {}
const Section = React.forwardRef<SectionElement, SectionProps>((props, forwardedRef) => {
  const { className, ...sectionProps } = extractProps(
    props,
    sectionPropDefs,
    layoutPropDefs,
    deprecatedLayoutPropDefs,
    marginPropDefs
  );
  return (
    <section {...sectionProps} ref={forwardedRef} className={classNames('rt-Section', className)} />
  );
});
Section.displayName = 'Section';

export { Section };
export type { SectionProps };
