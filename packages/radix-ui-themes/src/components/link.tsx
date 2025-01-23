import * as React from 'react';
import classNames from 'classnames';

import { Text } from './text.js';
import { extractProps } from '../helpers/extract-props.js';
import { linkPropDefs } from './link.props.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

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
      {asChild ? (
        children
      ) : (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a>{children}</a>
      )}
    </Text>
  );
});
Link.displayName = 'Link';

export { Link };
export type { LinkProps };
