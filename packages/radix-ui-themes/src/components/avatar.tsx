'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import { avatarPropDefs } from './avatar.props.js';
import { extractProps } from '../helpers/extract-props.js';
import { getSubtree } from '../helpers/get-subtree.js';
import { marginPropDefs } from '../props/margin.props.js';

import type { MarginProps } from '../props/margin.props.js';
import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

interface AvatarProps extends MarginProps, AvatarImplProps {}
const Avatar = React.forwardRef<AvatarImplElement, AvatarProps>((props, forwardedRef) => {
  const { asChild, children, className, style, color, radius, ...imageProps } = extractProps(
    props,
    avatarPropDefs,
    marginPropDefs
  );

  return (
    // TODO as a rule, should we rather spread the props on root?
    <AvatarPrimitive.Root
      data-accent-color={color}
      data-radius={radius}
      className={classNames('rt-reset', 'rt-AvatarRoot', className)}
      style={style}
      asChild={asChild}
    >
      {getSubtree({ asChild, children }, <AvatarImpl ref={forwardedRef} {...imageProps} />)}
    </AvatarPrimitive.Root>
  );
});
Avatar.displayName = 'Avatar';

type AvatarImplElement = React.ElementRef<typeof AvatarPrimitive.Image>;
type AvatarOwnProps = GetPropDefTypes<typeof avatarPropDefs>;

interface AvatarImplProps
  extends ComponentPropsWithout<typeof AvatarPrimitive.Image, RemovedProps>,
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
