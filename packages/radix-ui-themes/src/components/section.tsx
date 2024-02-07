import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { sectionPropDefs } from './section.props.js';
import { extractProps } from '../helpers/index.js';
import { deprecatedLayoutPropDefs, layoutPropDefs, marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, LayoutProps, GetPropDefTypes } from '../props/index.js';

type SectionElement = React.ElementRef<'div'>;
type SectionOwnProps = GetPropDefTypes<typeof sectionPropDefs>;
interface SectionProps
  extends ComponentPropsWithoutColor<'div'>,
    MarginProps,
    LayoutProps,
    SectionOwnProps {}
const Section = React.forwardRef<SectionElement, SectionProps>((props, forwardedRef) => {
  const { asChild, className, ...sectionProps } = extractProps(
    props,
    sectionPropDefs,
    layoutPropDefs,
    deprecatedLayoutPropDefs,
    marginPropDefs
  );
  const Comp = asChild ? Slot : 'section';
  return (
    <Comp {...sectionProps} ref={forwardedRef} className={classNames('rt-Section', className)} />
  );
});
Section.displayName = 'Section';

export { Section };
export type { SectionProps };
