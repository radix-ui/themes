'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { DirectionProvider } from '@radix-ui/react-direction';
import { Slot } from '@radix-ui/react-slot';
import { getMatchingGrayColor } from './theme-options.js';
import { themePropDefs } from './props/index.js';

import type { ThemeOptions } from './theme-options.js';
import type { ComponentPropsWithoutColor } from './helpers/index.js';

const noop = () => {};

interface ThemeChangeHandlers {
  onAppearanceChange: (appearance: ThemeOptions['appearance']) => void;
  onAccentColorChange: (accentColor: ThemeOptions['accentColor']) => void;
  onGrayColorChange: (grayColor: ThemeOptions['grayColor']) => void;
  onPanelBackgroundChange: (panelBackground: ThemeOptions['panelBackground']) => void;
  onRadiusChange: (radius: ThemeOptions['radius']) => void;
  onScalingChange: (scaling: ThemeOptions['scaling']) => void;
}

interface ThemeContextValue extends ThemeOptions, ThemeChangeHandlers {
  resolvedGrayColor: ThemeOptions['grayColor'];
}
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
    return (
      <TooltipPrimitive.Provider delayDuration={200}>
        <DirectionProvider dir="ltr">
          <ThemeRoot {...props} ref={forwardedRef} />
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
    accentColor: accentColorProp = themePropDefs.accentColor.default,
    grayColor: grayColorProp = themePropDefs.grayColor.default,
    panelBackground: panelBackgroundProp = themePropDefs.panelBackground.default,
    radius: radiusProp = themePropDefs.radius.default,
    scaling: scalingProp = themePropDefs.scaling.default,
    hasBackground = themePropDefs.hasBackground.default,
    ...rootProps
  } = props;
  const [appearance, setAppearance] = React.useState(appearanceProp);
  React.useEffect(() => setAppearance(appearanceProp), [appearanceProp]);

  const [accentColor, setAccentColor] = React.useState(accentColorProp);
  React.useEffect(() => setAccentColor(accentColorProp), [accentColorProp]);

  const [grayColor, setGrayColor] = React.useState(grayColorProp);
  React.useEffect(() => setGrayColor(grayColorProp), [grayColorProp]);

  const [panelBackground, setPanelBackground] = React.useState(panelBackgroundProp);
  React.useEffect(() => setPanelBackground(panelBackgroundProp), [panelBackgroundProp]);

  const [radius, setRadius] = React.useState(radiusProp);
  React.useEffect(() => setRadius(radiusProp), [radiusProp]);

  const [scaling, setScaling] = React.useState(scalingProp);
  React.useEffect(() => setScaling(scalingProp), [scalingProp]);

  return (
    <ThemeImpl
      {...rootProps}
      ref={forwardedRef}
      isRoot
      hasBackground={hasBackground}
      //
      appearance={appearance}
      accentColor={accentColor}
      grayColor={grayColor}
      panelBackground={panelBackground}
      radius={radius}
      scaling={scaling}
      //
      onAppearanceChange={setAppearance}
      onAccentColorChange={setAccentColor}
      onGrayColorChange={setGrayColor}
      onPanelBackgroundChange={setPanelBackground}
      onRadiusChange={setRadius}
      onScalingChange={setScaling}
    />
  );
});
ThemeRoot.displayName = 'ThemeRoot';

type ThemeImplElement = React.ElementRef<'div'>;
interface ThemeImplProps extends ThemeImplPublicProps, ThemeImplPrivateProps {}
interface ThemeImplPublicProps
  extends Omit<ComponentPropsWithoutColor<'div'>, 'dir'>,
    Partial<ThemeOptions> {
  asChild?: boolean;
  isRoot?: boolean;
  hasBackground?: boolean;
}
interface ThemeImplPrivateProps extends Partial<ThemeChangeHandlers> {}
const ThemeImpl = React.forwardRef<ThemeImplElement, ThemeImplProps>((props, forwardedRef) => {
  const context = React.useContext(ThemeContext);
  const {
    asChild,
    isRoot,
    hasBackground: hasBackgroundProp,
    //
    appearance = context?.appearance ?? themePropDefs.appearance.default,
    accentColor = context?.accentColor ?? themePropDefs.accentColor.default,
    grayColor = context?.resolvedGrayColor ?? themePropDefs.grayColor.default,
    panelBackground = context?.panelBackground ?? themePropDefs.panelBackground.default,
    radius = context?.radius ?? themePropDefs.radius.default,
    scaling = context?.scaling ?? themePropDefs.scaling.default,
    //
    onAppearanceChange = noop,
    onAccentColorChange = noop,
    onGrayColorChange = noop,
    onPanelBackgroundChange = noop,
    onRadiusChange = noop,
    onScalingChange = noop,
    //
    ...themeProps
  } = props;
  const Comp = asChild ? Slot : 'div';
  const resolvedGrayColor = grayColor === 'auto' ? getMatchingGrayColor(accentColor) : grayColor;
  const isExplicitAppearance = props.appearance === 'light' || props.appearance === 'dark';
  const hasBackground =
    hasBackgroundProp === undefined ? isRoot || isExplicitAppearance : hasBackgroundProp;
  return (
    <ThemeContext.Provider
      value={React.useMemo(
        () => ({
          appearance,
          accentColor,
          grayColor,
          resolvedGrayColor,
          panelBackground,
          radius,
          scaling,
          //
          onAppearanceChange,
          onAccentColorChange,
          onGrayColorChange,
          onPanelBackgroundChange,
          onRadiusChange,
          onScalingChange,
        }),
        [
          appearance,
          accentColor,
          grayColor,
          resolvedGrayColor,
          panelBackground,
          radius,
          scaling,
          //
          onAppearanceChange,
          onAccentColorChange,
          onGrayColorChange,
          onPanelBackgroundChange,
          onRadiusChange,
          onScalingChange,
        ]
      )}
    >
      <Comp
        data-is-root-theme={isRoot ? 'true' : 'false'}
        data-accent-color={accentColor}
        data-gray-color={resolvedGrayColor}
        // for nested `Theme` background
        data-has-background={hasBackground ? 'true' : 'false'}
        data-panel-background={panelBackground}
        data-radius={radius}
        data-scaling={scaling}
        ref={forwardedRef}
        {...themeProps}
        className={classNames(
          'radix-themes',
          {
            light: appearance === 'light',
            dark: appearance === 'dark',
          },
          themeProps.className
        )}
      />
    </ThemeContext.Provider>
  );
});
ThemeImpl.displayName = 'ThemeImpl';

export { Theme, useThemeContext };
export type { ThemeProps };
