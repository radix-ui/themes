'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { DirectionProvider } from '@radix-ui/react-direction';
import { Slot } from '@radix-ui/react-slot';
import { themePropDefs, getMatchingGrayScale } from './theme-options';

import type { ThemeOptions } from './theme-options';

const noop = () => {};

interface ThemeChangeHandlers {
  onAppearanceChange: (appearance: ThemeOptions['appearance']) => void;
  onAccentScaleChange: (accentScale: ThemeOptions['accentScale']) => void;
  onGrayScaleChange: (grayScale: ThemeOptions['grayScale']) => void;
  onBackgroundColorChange: (backgroundColor: ThemeOptions['backgroundColor']) => void;
  onTextColorChange: (textColor: ThemeOptions['textColor']) => void;
  onRadiusChange: (radius: ThemeOptions['radius']) => void;
  onScalingChange: (scaling: ThemeOptions['scaling']) => void;
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
    return (
      <TooltipPrimitive.Provider>
        <DirectionProvider dir="ltr">
          <ThemeRoot {...props} ref={forwardedRef} key={key} />
        </DirectionProvider>
      </TooltipPrimitive.Provider>
    );
  }
  return <ThemeImpl {...props} ref={forwardedRef} />;
});
Theme.displayName = 'Theme';

interface ThemeRootProps extends ThemeImplPublicProps {}
const ThemeRoot = React.forwardRef<ThemeImplElement, ThemeRootProps>((props, forwardedRef) => {
  const {
    appearance: appearanceProp = themePropDefs.appearance.default,
    accentScale: accentScaleProp = themePropDefs.accentScale.default,
    grayScale: grayScaleProp = themePropDefs.grayScale.default,
    backgroundColor: backgroundColorProp = themePropDefs.backgroundColor.default,
    textColor: textColorProp = themePropDefs.textColor.default,
    radius: radiusProp = themePropDefs.radius.default,
    scaling: scalingProp = themePropDefs.scaling.default,
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
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'dir'>,
    Partial<ThemeOptions> {
  asChild?: boolean;
  applyBackgroundColor?: boolean;
}
interface ThemeImplPrivateProps extends Partial<ThemeChangeHandlers> {}
const ThemeImpl = React.forwardRef<ThemeImplElement, ThemeImplProps>((props, forwardedRef) => {
  const context = React.useContext(ThemeContext);
  const {
    asChild,
    applyBackgroundColor = themePropDefs.applyBackgroundColor.default,
    //
    appearance = context?.appearance ?? themePropDefs.appearance.default,
    accentScale = context?.accentScale ?? themePropDefs.accentScale.default,
    grayScale = context?.grayScale ?? themePropDefs.grayScale.default,
    backgroundColor = context?.backgroundColor ?? themePropDefs.backgroundColor.default,
    textColor = context?.textColor ?? themePropDefs.textColor.default,
    radius = context?.radius ?? themePropDefs.radius.default,
    scaling = context?.scaling ?? themePropDefs.scaling.default,
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
