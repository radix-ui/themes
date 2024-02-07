'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { avatarPropDefs } from './avatar.props.js';
import { extractProps, getRoot } from '../helpers/index.js';
import { marginPropDefs } from '../props/index.js';

import type { ComponentPropsWithoutColor } from '../helpers/index.js';
import type { MarginProps, GetPropDefTypes } from '../props/index.js';

interface AvatarProps extends MarginProps, AvatarImplProps {}
const Avatar = React.forwardRef<AvatarImplElement, AvatarProps>((props, forwardedRef) => {
  const {
    asChild,
    children: childrenProp,
    className,
    style,
    color,
    radius,
    ...imageProps
  } = extractProps(props, avatarPropDefs, marginPropDefs);

  const { Root: AvatarRoot } = getRoot({
    asChild,
    children: childrenProp,
    parent: AvatarPrimitive.Root,
  });

  return (
    // TODO as a rule, should we rather spread the props on root?
    <AvatarRoot
      data-accent-color={color}
      data-radius={radius}
      className={classNames('rt-reset', 'rt-AvatarRoot', className)}
      style={style}
    >
      <AvatarImpl ref={forwardedRef} {...imageProps} />
    </AvatarRoot>
  );
});
Avatar.displayName = 'Avatar';

type AvatarImplElement = React.ElementRef<typeof AvatarPrimitive.Image>;
type AvatarOwnProps = GetPropDefTypes<typeof avatarPropDefs>;

interface AvatarImplProps
  extends ComponentPropsWithoutColor<typeof AvatarPrimitive.Image>,
    AvatarOwnProps {
  // TODO: See if we can automate making prop defs with `required: true` non nullable
  fallback: NonNullable<AvatarOwnProps['fallback']>;
}

const AvatarImpl = React.forwardRef<AvatarImplElement, AvatarImplProps>(
  ({ fallback, ...imageProps }, forwardedRef) => {
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
    return (
      <>
        {status === 'idle' || status === 'loading' ? <span className="rt-AvatarFallback" /> : null}

        {status === 'error' ? (
          <AvatarPrimitive.Fallback
            className={classNames('rt-AvatarFallback', {
              'rt-one-letter': typeof fallback === 'string' && fallback.length === 1,
              'rt-two-letters': typeof fallback === 'string' && fallback.length === 2,
            })}
            delayMs={0}
          >
            {fallback}
          </AvatarPrimitive.Fallback>
        ) : null}

        <AvatarPrimitive.Image
          ref={forwardedRef}
          className="rt-AvatarImage"
          {...imageProps}
          onLoadingStatusChange={(status) => {
            imageProps.onLoadingStatusChange?.(status);
            setStatus(status);
          }}
        />
      </>
    );
  }
);

AvatarImpl.displayName = 'AvatarImpl';

export { Avatar };
export type { AvatarProps };
