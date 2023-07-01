'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import {
  defaultThemeMode,
  defaultThemeAccentScale,
  defaultThemeGrayScale,
  defaultThemeBackgroundColor,
  defaultThemeTextColor,
  defaultThemeRadius,
  defaultThemeScaling,
  getNaturallyPairedGrayScale,
} from './helpers';

import type {
  ThemeMode,
  Color,
  GrayScaleControl,
  BackgroundColorControl,
  TextColorControl,
  Radius,
  Scaling,
} from './helpers';

const noop = () => {};

interface ThemeConfigValues {
  mode: ThemeMode | 'invert';
  accentScale: Color;
  grayScale: GrayScaleControl;
  backgroundColor: BackgroundColorControl;
  textColor: TextColorControl;
  radius: Radius;
  scaling: Scaling;
}
interface ThemeConfigChangeHandlers {
  onModeChange: (mode: ThemeMode) => void;
  onAccentScaleChange: (accentScale: Color) => void;
  onGrayScaleChange: (grayScale: GrayScaleControl) => void;
  onBackgroundColorChange: (backgroundColor: BackgroundColorControl) => void;
  onTextColorChange: (textColor: TextColorControl) => void;
  onRadiusChange: (radius: Radius) => void;
  onScalingChange: (scaling: Scaling) => void;
}

interface ThemeConfigContextValue extends ThemeConfigValues, ThemeConfigChangeHandlers {}
const ThemeConfigContext = React.createContext<ThemeConfigContextValue | undefined>(undefined);

function useThemeConfigContext() {
  const context = React.useContext(ThemeConfigContext);
  if (context === undefined) {
    throw new Error('useThemeConfigContext must be used within a ThemeConfig');
  }
  return context;
}

interface ThemeConfigProps extends ThemeConfigRootProps {}
const ThemeConfig = React.forwardRef<ThemeConfigImplElement, ThemeConfigProps>(
  (props, forwardedRef) => {
    const context = React.useContext(ThemeConfigContext);
    const isRoot = context === undefined;
    if (isRoot) {
      return <ThemeConfigRoot {...props} ref={forwardedRef} />;
    }
    return <ThemeConfigImpl {...props} ref={forwardedRef} />;
  }
);
ThemeConfig.displayName = 'ThemeConfig';

interface ThemeConfigRootProps extends ThemeConfigImplPublicProps {}
const ThemeConfigRoot = React.forwardRef<ThemeConfigImplElement, ThemeConfigRootProps>(
  (props, forwardedRef) => {
    const {
      mode: modeProp = defaultThemeMode,
      accentScale: accentScaleProp = defaultThemeAccentScale,
      grayScale: grayScaleProp = defaultThemeGrayScale,
      backgroundColor: backgroundColorProp = defaultThemeBackgroundColor,
      textColor: textColorProp = defaultThemeTextColor,
      radius: radiusProp = defaultThemeRadius,
      scaling: scalingProp = defaultThemeScaling,
      ...rootProps
    } = props;
    const [mode, setMode] = React.useState(modeProp);
    const [accentScale, setAccentScale] = React.useState(accentScaleProp);
    const [grayScale, setGrayScale] = React.useState(grayScaleProp);
    const [backgroundColor, setBackgroundColor] = React.useState(backgroundColorProp);
    const [textColor, setTextColor] = React.useState(textColorProp);
    const [radius, setRadius] = React.useState(radiusProp);
    const [scaling, setScaling] = React.useState(scalingProp);
    return (
      <>
        <ThemeConfigImpl
          {...rootProps}
          ref={forwardedRef}
          //
          mode={mode as ThemeMode}
          accentScale={accentScale}
          grayScale={grayScale}
          backgroundColor={backgroundColor}
          textColor={textColor}
          radius={radius}
          scaling={scaling}
          //
          onModeChange={setMode}
          onAccentScaleChange={setAccentScale}
          onGrayScaleChange={setGrayScale}
          onBackgroundColorChange={setBackgroundColor}
          onTextColorChange={setTextColor}
          onRadiusChange={setRadius}
          onScalingChange={setScaling}
        />
      </>
    );
  }
);
ThemeConfigRoot.displayName = 'ThemeConfigRoot';

type ThemeConfigImplElement = React.ElementRef<'div'>;
interface ThemeConfigImplProps extends ThemeConfigImplPublicProps, ThemeConfigImplPrivateProps {}
interface ThemeConfigImplPublicProps
  extends React.ComponentPropsWithoutRef<'div'>,
    Partial<ThemeConfigValues> {
  asChild?: boolean;
  applyBackgroundColor?: boolean;
  applyTextColor?: boolean;
}
interface ThemeConfigImplPrivateProps extends Partial<ThemeConfigChangeHandlers> {}
const ThemeConfigImpl = React.forwardRef<ThemeConfigImplElement, ThemeConfigImplProps>(
  (props, forwardedRef) => {
    const context = React.useContext(ThemeConfigContext);
    const {
      asChild,
      applyBackgroundColor = true,
      applyTextColor = true,
      //
      mode = context?.mode ?? defaultThemeMode,
      accentScale = context?.accentScale ?? defaultThemeAccentScale,
      grayScale = context?.grayScale ?? defaultThemeGrayScale,
      backgroundColor = context?.backgroundColor ?? defaultThemeBackgroundColor,
      textColor = context?.textColor ?? defaultThemeTextColor,
      radius = context?.radius ?? defaultThemeRadius,
      scaling = context?.scaling ?? defaultThemeScaling,
      //
      onModeChange = noop,
      onAccentScaleChange = noop,
      onGrayScaleChange = noop,
      onBackgroundColorChange = noop,
      onTextColorChange = noop,
      onRadiusChange = noop,
      onScalingChange = noop,
      //
      ...themeConfigProps
    } = props;
    const resolvedGrayScale =
      grayScale === 'auto' ? getNaturallyPairedGrayScale(accentScale) : grayScale;
    const resolvedMode = mode === 'invert' ? (context?.mode === 'dark' ? 'light' : 'dark') : mode;
    const Comp = asChild ? Slot : 'div';
    return (
      <ThemeConfigContext.Provider
        value={React.useMemo(
          () => ({
            mode: resolvedMode,
            accentScale,
            grayScale,
            backgroundColor,
            textColor,
            radius,
            scaling,
            //
            onModeChange,
            onAccentScaleChange,
            onGrayScaleChange,
            onBackgroundColorChange,
            onTextColorChange,
            onRadiusChange,
            onScalingChange,
          }),
          [
            resolvedMode,
            accentScale,
            grayScale,
            backgroundColor,
            textColor,
            radius,
            scaling,
            //
            onModeChange,
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
          data-text-color-applied={applyTextColor === true ? '' : undefined}
          data-radius={radius}
          data-scaling={scaling}
          ref={forwardedRef}
          {...themeConfigProps}
          className={classNames(
            {
              'light-theme': resolvedMode === 'light',
              'dark-theme': resolvedMode === 'dark',
            },
            themeConfigProps.className
          )}
        />
      </ThemeConfigContext.Provider>
    );
  }
);
ThemeConfigImpl.displayName = 'ThemeConfigImpl';

export { ThemeConfig, ThemeConfigContext, useThemeConfigContext };
