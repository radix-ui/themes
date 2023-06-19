'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { PersonIcon } from '@radix-ui/react-icons';
import { extractMarginProps, withMargin, withBreakpoints } from '../helpers';

import type { MarginProps, Color, ButtonRadius, Responsive } from '../helpers';

const avatarSizes = ['1', '2', '3', '4', '5'] as const;
type AvatarSize = (typeof avatarSizes)[number];
const defaultAvatarSize: AvatarSize = '3';

const avatarVariants = ['solid', 'solid-mono', 'subtle', 'subtle-mono'] as const;
type AvatarVariant = (typeof avatarVariants)[number];
const defaultAvatarVariant: AvatarVariant = 'subtle';

const defaultColor: Color | undefined = undefined;

type AvatarElement = React.ElementRef<typeof AvatarPrimitive.Image>;
interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>,
    MarginProps {
  size?: Responsive<AvatarSize>;
  variant?: AvatarVariant;
  color?: Color;
  radius?: ButtonRadius;
  fallback?: React.ReactNode;
}
const Avatar = React.forwardRef<AvatarElement, AvatarProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = defaultAvatarSize,
    variant = defaultAvatarVariant,
    color = defaultColor,
    radius,
    fallback,
    ...imageProps
  } = marginRest;
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  return (
    <AvatarPrimitive.Root
      data-color-scale={color}
      data-button-radius={radius}
      className={classNames(
        'rui-AvatarRoot',
        `variant-${variant}`,
        withMargin(marginProps),
        withBreakpoints(size, 'size'),
        className
      )}
      style={style}
    >
      {status === 'loading' ? <span className="rui-AvatarFallback" /> : null}

      {status === 'idle' || status === 'error' ? (
        <AvatarPrimitive.Fallback
          className={classNames('rui-AvatarFallback', {
            '1-letter': typeof fallback === 'string' && fallback.length === 1,
            '2-letters': typeof fallback === 'string' && fallback.length === 2,
          })}
          delayMs={0}
        >
          {fallback ?? <PersonIcon />}
        </AvatarPrimitive.Fallback>
      ) : null}

      <AvatarPrimitive.Image
        ref={forwardedRef}
        className="rui-AvatarImage"
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

export { avatarSizes, defaultAvatarSize, avatarVariants, defaultAvatarVariant, Avatar };
export type { AvatarSize, AvatarVariant };
