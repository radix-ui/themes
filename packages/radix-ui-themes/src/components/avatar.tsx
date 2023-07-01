'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import {
  avatarSizeDefault,
  avatarVariantDefault,
  avatarColorDefault,
  avatarHighContrastDefault,
  avatarRadiusDefault,
} from './avatar.props';
import { extractMarginProps, withMarginProps, withBreakpoints } from '../helpers';

import type { AvatarSize, AvatarVariant } from './avatar.props';
import type { PropsWithoutRefOrColor, MarginProps, Responsive } from '../helpers';
import type { ThemeAccentScale, ThemeRadius } from '../theme';

type AvatarElement = React.ElementRef<typeof AvatarPrimitive.Image>;
interface AvatarProps extends PropsWithoutRefOrColor<typeof AvatarPrimitive.Image>, MarginProps {
  size?: Responsive<AvatarSize>;
  variant?: AvatarVariant;
  color?: ThemeAccentScale;
  highContrast?: boolean;
  radius?: ThemeRadius;
  fallback: React.ReactNode;
}
const Avatar = React.forwardRef<AvatarElement, AvatarProps>((props, forwardedRef) => {
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const {
    className,
    style,
    size = avatarSizeDefault,
    variant = avatarVariantDefault,
    color = avatarColorDefault,
    highContrast = avatarHighContrastDefault,
    radius = avatarRadiusDefault,
    fallback,
    ...imageProps
  } = marginRest;
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  return (
    <AvatarPrimitive.Root
      data-accent-scale={color}
      data-radius={radius}
      className={classNames(
        'rui-AvatarRoot',
        withMarginProps(marginProps),
        `variant-${variant}`,
        { highContrast },
        withBreakpoints(size, 'size'),
        className
      )}
      style={style}
    >
      {status === 'idle' || status === 'loading' ? <span className="rui-AvatarFallback" /> : null}

      {status === 'error' ? (
        <AvatarPrimitive.Fallback
          className={classNames('rui-AvatarFallback', {
            '1-letter': typeof fallback === 'string' && fallback.length === 1,
            '2-letters': typeof fallback === 'string' && fallback.length === 2,
          })}
          delayMs={0}
        >
          {fallback}
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

export { Avatar };
