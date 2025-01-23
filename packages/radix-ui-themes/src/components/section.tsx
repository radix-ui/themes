import * as React from 'react';
import classNames from 'classnames';
import { Slot } from 'radix-ui';

import { sectionPropDefs } from './section.props';
import { extractProps } from '../helpers/extract-props';
import { layoutPropDefs } from '../props/layout.props';
import { marginPropDefs } from '../props/margin.props';

import type { LayoutProps } from '../props/layout.props';
import type { MarginProps } from '../props/margin.props';
import type { SectionOwnProps } from './section.props';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props';

type SectionElement = React.ElementRef<'div'>;
interface SectionProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    MarginProps,
    LayoutProps,
    SectionOwnProps {}
const Section = React.forwardRef<SectionElement, SectionProps>((props, forwardedRef) => {
  const { asChild, className, ...sectionProps } = extractProps(
    props,
    sectionPropDefs,
    layoutPropDefs,
    marginPropDefs
  );
  const Comp = asChild ? Slot.Root : 'section';
  return (
    <Comp {...sectionProps} ref={forwardedRef} className={classNames('rt-Section', className)} />
  );
});
Section.displayName = 'Section';

export { Section };
export type { SectionProps };
