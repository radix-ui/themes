import * as React from 'react';
import classNames from 'classnames';
import { Text } from './text';
import { linkPropDefs } from './link.props';

import {
  type PropsWithoutRefOrColor,
  type MarginProps,
  type GetPropDefTypes,
  extractProps,
} from '../helpers';

type LinkElement = React.ElementRef<'a'>;
type LinkOwnProps = GetPropDefTypes<typeof linkPropDefs>;
interface LinkProps extends PropsWithoutRefOrColor<'a'>, MarginProps, LinkOwnProps {
  asChild?: boolean;
}
const Link = React.forwardRef<LinkElement, LinkProps>((props, forwardedRef) => {
  const { children, className, asChild = false, ...linkProps } = extractProps(props, linkPropDefs);
  return (
    <Text
      {...linkProps}
      ref={forwardedRef}
      asChild
      className={classNames('rt-reset', 'rt-Link', className)}
    >
      {asChild ? children : <a>{children}</a>}
    </Text>
  );
});
Link.displayName = 'Link';

export { Link };
export type { LinkProps };
