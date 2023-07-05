'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import {
  themeAppearanceDefault,
  themeAccentScaleDefault,
  themeGrayScaleDefault,
  themeBackgroundColorDefault,
  themeTextColorDefault,
  themeRadiusDefault,
  themeScalingDefault,
  getMatchingGrayScale,
} from './theme-options';

import type {
  ThemeAppearance,
  ThemeAccentScale,
  ThemeGrayScale,
  ThemeBackgroundColor,
  ThemeTextColor,
  ThemeRadius,
  ThemeScaling,
  ThemeOptions,
} from './theme-options';

const noop = () => {};

interface ThemeChangeHandlers {
  onAppearanceChange: (appearance: ThemeAppearance) => void;
  onAccentScaleChange: (accentScale: ThemeAccentScale) => void;
  onGrayScaleChange: (grayScale: ThemeGrayScale) => void;
  onBackgroundColorChange: (backgroundColor: ThemeBackgroundColor) => void;
  onTextColorChange: (textColor: ThemeTextColor) => void;
  onRadiusChange: (radius: ThemeRadius) => void;
  onScalingChange: (scaling: ThemeScaling) => void;
}

interface ThemeContextValue extends ThemeOptions, ThemeChangeHandlers {}
const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('`useThemeContext` must be used within a `Theme`');
  }
  return context;
}

interface ThemeProps extends ThemeRootProps {}
const Theme = React.forwardRef<ThemeImplElement, ThemeProps>((props, forwardedRef) => {
  const context = React.useContext(ThemeContext);
  const isRoot = context === undefined;
  if (isRoot) {
    const key = Object.entries(props)
      .map(([k, v]) => `${k}=${v}`)
      .join(',');
    return <ThemeRoot {...props} ref={forwardedRef} key={key} />;
  }
  return <ThemeImpl {...props} ref={forwardedRef} />;
});
Theme.displayName = 'Theme';

interface ThemeRootProps extends ThemeImplPublicProps {}
const ThemeRoot = React.forwardRef<ThemeImplElement, ThemeRootProps>((props, forwardedRef) => {
  const {
    appearance: appearanceProp = themeAppearanceDefault,
    accentScale: accentScaleProp = themeAccentScaleDefault,
    grayScale: grayScaleProp = themeGrayScaleDefault,
    backgroundColor: backgroundColorProp = themeBackgroundColorDefault,
    textColor: textColorProp = themeTextColorDefault,
    radius: radiusProp = themeRadiusDefault,
    scaling: scalingProp = themeScalingDefault,
    ...rootProps
  } = props;
  const [appearance, setAppearance] = React.useState(appearanceProp);
  const [accentScale, setAccentScale] = React.useState(accentScaleProp);
  const [grayScale, setGrayScale] = React.useState(grayScaleProp);
  const [backgroundColor, setBackgroundColor] = React.useState(backgroundColorProp);
  const [textColor, setTextColor] = React.useState(textColorProp);
  const [radius, setRadius] = React.useState(radiusProp);
  const [scaling, setScaling] = React.useState(scalingProp);
  return (
    <>
      <ThemeImpl
        {...rootProps}
        ref={forwardedRef}
        //
        appearance={appearance}
        accentScale={accentScale}
        grayScale={grayScale}
        backgroundColor={backgroundColor}
        textColor={textColor}
        radius={radius}
        scaling={scaling}
        //
        onAppearanceChange={setAppearance}
        onAccentScaleChange={setAccentScale}
        onGrayScaleChange={setGrayScale}
        onBackgroundColorChange={setBackgroundColor}
        onTextColorChange={setTextColor}
        onRadiusChange={setRadius}
        onScalingChange={setScaling}
      />
    </>
  );
});
ThemeRoot.displayName = 'ThemeRoot';

type ThemeImplElement = React.ElementRef<'div'>;
interface ThemeImplProps extends ThemeImplPublicProps, ThemeImplPrivateProps {}
interface ThemeImplPublicProps
  extends React.ComponentPropsWithoutRef<'div'>,
    Partial<ThemeOptions> {
  asChild?: boolean;
  applyBackgroundColor?: boolean;
}
interface ThemeImplPrivateProps extends Partial<ThemeChangeHandlers> {}
const ThemeImpl = React.forwardRef<ThemeImplElement, ThemeImplProps>((props, forwardedRef) => {
  const context = React.useContext(ThemeContext);
  const {
    asChild,
    applyBackgroundColor = true,
    //
    appearance = context?.appearance ?? themeAppearanceDefault,
    accentScale = context?.accentScale ?? themeAccentScaleDefault,
    grayScale = context?.grayScale ?? themeGrayScaleDefault,
    backgroundColor = context?.backgroundColor ?? themeBackgroundColorDefault,
    textColor = context?.textColor ?? themeTextColorDefault,
    radius = context?.radius ?? themeRadiusDefault,
    scaling = context?.scaling ?? themeScalingDefault,
    //
    onAppearanceChange = noop,
    onAccentScaleChange = noop,
    onGrayScaleChange = noop,
    onBackgroundColorChange = noop,
    onTextColorChange = noop,
    onRadiusChange = noop,
    onScalingChange = noop,
    //
    ...themeProps
  } = props;
  const resolvedGrayScale = grayScale === 'auto' ? getMatchingGrayScale(accentScale) : grayScale;
  const resolvedAppearance =
    appearance === 'invert' ? (context?.appearance === 'dark' ? 'light' : 'dark') : appearance;
  const Comp = asChild ? Slot : 'div';
  return (
    <ThemeContext.Provider
      value={React.useMemo(
        () => ({
          appearance: resolvedAppearance,
          accentScale,
          grayScale,
          backgroundColor,
          textColor,
          radius,
          scaling,
          //
          onAppearanceChange,
          onAccentScaleChange,
          onGrayScaleChange,
          onBackgroundColorChange,
          onTextColorChange,
          onRadiusChange,
          onScalingChange,
        }),
        [
          resolvedAppearance,
          accentScale,
          grayScale,
          backgroundColor,
          textColor,
          radius,
          scaling,
          //
          onAppearanceChange,
          onAccentScaleChange,
          onGrayScaleChange,
          onBackgroundColorChange,
          onTextColorChange,
          onRadiusChange,
          onScalingChange,
        ]
      )}
    >
      <Comp
        data-rui-root
        data-accent-scale={accentScale}
        data-gray-scale={resolvedGrayScale}
        data-background-color={backgroundColor}
        data-background-color-applied={applyBackgroundColor === true ? '' : undefined}
        data-text-color={textColor}
        data-radius={radius}
        data-scaling={scaling}
        ref={forwardedRef}
        {...themeProps}
        className={classNames(
          {
            'light-theme': resolvedAppearance === 'light',
            'dark-theme': resolvedAppearance === 'dark',
          },
          themeProps.className
        )}
      />
    </ThemeContext.Provider>
  );
});
ThemeImpl.displayName = 'ThemeImpl';

export { Theme, useThemeContext };
