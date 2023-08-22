'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { avatarPropDefs } from './avatar.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { PropsWithoutRefOrColor, MarginProps, GetPropDefTypes } from '../helpers';

type AvatarElement = React.ElementRef<typeof AvatarPrimitive.Image>;
type AvatarOwnProps = GetPropDefTypes<typeof avatarPropDefs>;
interface AvatarProps
  extends PropsWithoutRefOrColor<typeof AvatarPrimitive.Image>,
    MarginProps,
    AvatarOwnProps {
  // TODO: See if we can automate making prop defs with `required: true` non nullable
  fallback: NonNullable<AvatarOwnProps['fallback']>;
}
const Avatar = React.forwardRef<AvatarElement, AvatarProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = avatarPropDefs.size.default,
    variant = avatarPropDefs.variant.default,
    color = avatarPropDefs.color.default,
    highContrast = avatarPropDefs.highContrast.default,
    radius = avatarPropDefs.radius.default,
    fallback,
    ...imageProps
  } = marginRest;
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  return (
    <AvatarPrimitive.Root
      data-accent-color={color}
      data-radius={radius}
      className={classNames(
        'rt-AvatarRoot',
        className,
        withBreakpoints(size, 'rt-r-size'),
        `rt-variant-${variant}`,
        { 'rt-high-contrast': highContrast },
        withMarginProps(marginProps)
      )}
      style={style}
    >
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
    </AvatarPrimitive.Root>
  );
});
Avatar.displayName = 'Avatar';

export { Avatar };
export type { AvatarProps };
