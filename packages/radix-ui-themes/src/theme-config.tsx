'use client';

import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import {
  themeModeDefault,
  themeAccentScaleDefault,
  themeGrayScaleDefault,
  themeBackgroundColorDefault,
  themeTextColorDefault,
  themeRadiusDefault,
  themeScalingDefault,
  getMatchingGrayScale,
} from './theme';

import type {
  ThemeMode,
  ThemeAccentScale,
  ThemeGrayScale,
  ThemeBackgroundColor,
  ThemeTextColor,
  ThemeRadius,
  ThemeScaling,
} from './theme';

const noop = () => {};

interface ThemeConfigValues {
  mode: ThemeMode;
  accentScale: ThemeAccentScale;
  grayScale: ThemeGrayScale;
  backgroundColor: ThemeBackgroundColor;
  textColor: ThemeTextColor;
  radius: ThemeRadius;
  scaling: ThemeScaling;
}
interface ThemeConfigChangeHandlers {
  onModeChange: (mode: ThemeMode) => void;
  onAccentScaleChange: (accentScale: ThemeAccentScale) => void;
  onGrayScaleChange: (grayScale: ThemeGrayScale) => void;
  onBackgroundColorChange: (backgroundColor: ThemeBackgroundColor) => void;
  onTextColorChange: (textColor: ThemeTextColor) => void;
  onRadiusChange: (radius: ThemeRadius) => void;
  onScalingChange: (scaling: ThemeScaling) => void;
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
      mode: modeProp = themeModeDefault,
      accentScale: accentScaleProp = themeAccentScaleDefault,
      grayScale: grayScaleProp = themeGrayScaleDefault,
      backgroundColor: backgroundColorProp = themeBackgroundColorDefault,
      textColor: textColorProp = themeTextColorDefault,
      radius: radiusProp = themeRadiusDefault,
      scaling: scalingProp = themeScalingDefault,
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
      mode = context?.mode ?? themeModeDefault,
      accentScale = context?.accentScale ?? themeAccentScaleDefault,
      grayScale = context?.grayScale ?? themeGrayScaleDefault,
      backgroundColor = context?.backgroundColor ?? themeBackgroundColorDefault,
      textColor = context?.textColor ?? themeTextColorDefault,
      radius = context?.radius ?? themeRadiusDefault,
      scaling = context?.scaling ?? themeScalingDefault,
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
    const resolvedGrayScale = grayScale === 'auto' ? getMatchingGrayScale(accentScale) : grayScale;
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

export { ThemeConfig, useThemeConfigContext };
