import * as React from 'react';
import classNames from 'classnames';
import { Text } from './text.js';
import { linkPropDefs } from './link.props.js';
import { extractProps } from '../helpers/index.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/index.js';
import type { GetPropDefTypes, MarginProps } from '../props/index.js';

type LinkElement = React.ElementRef<'a'>;
type LinkOwnProps = GetPropDefTypes<typeof linkPropDefs>;
interface LinkProps extends ComponentPropsWithout<'a', RemovedProps>, MarginProps, LinkOwnProps {}
const Link = React.forwardRef<LinkElement, LinkProps>((props, forwardedRef) => {
  const { children, className, color, asChild, ...linkProps } = extractProps(props, linkPropDefs);
  return (
    <Text
      {...linkProps}
      data-accent-color={color}
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
