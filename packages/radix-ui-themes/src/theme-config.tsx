import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import {
  defaultThemeAccentScale,
  defaultThemeBackgroundColor,
  defaultThemeGrayScale,
  defaultThemeRadius,
  defaultThemeScaling,
  defaultThemeTextColor,
} from './helpers';

import type {
  Color,
  GrayScaleControl,
  BackgroundColorControl,
  TextColorControl,
  Radius,
  Scaling,
} from './helpers';

type ThemeConfigElement = React.ElementRef<'div'>;
interface ThemeConfigProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  accentScale?: Color;
  grayScale?: GrayScaleControl;
  backgroundColor?: BackgroundColorControl;
  textColor?: TextColorControl;
  darkMode?: boolean;
  radius?: Radius;
  scaling?: Scaling;
}
const ThemeConfig = React.forwardRef<ThemeConfigElement, ThemeConfigProps>(
  (props, forwardedRef) => {
    const {
      asChild,
      accentScale,
      grayScale,
      backgroundColor,
      textColor,
      darkMode,
      radius,
      scaling,
      ...themeConfigProps
    } = props;
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        data-accent-scale={accentScale !== defaultThemeAccentScale ? accentScale : undefined}
        data-gray-scale={grayScale !== defaultThemeGrayScale ? grayScale : undefined}
        data-background-color={
          backgroundColor !== defaultThemeBackgroundColor ? backgroundColor : undefined
        }
        data-text-color={textColor !== defaultThemeTextColor ? textColor : undefined}
        data-radius={radius !== defaultThemeRadius ? radius : undefined}
        data-scaling={scaling !== defaultThemeScaling ? scaling : undefined}
        ref={forwardedRef}
        {...themeConfigProps}
        className={classNames(
          'rui-reset-root',
          { 'dark-theme': darkMode },
          themeConfigProps.className
        )}
      />
    );
  }
);
ThemeConfig.displayName = 'ThemeConfig';

export { ThemeConfig };
