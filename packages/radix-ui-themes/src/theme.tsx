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
  onPanelBackgroundChange: (panelBackground: ThemeOptions['panelBackground']) => void;
  onRadiusChange: (radius: ThemeOptions['radius']) => void;
  onScalingChange: (scaling: ThemeOptions['scaling']) => void;
}

interface ThemeContextValue extends ThemeOptions, ThemeChangeHandlers {
  resolvedGrayScale: ThemeOptions['grayScale'];
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
      <TooltipPrimitive.Provider>
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
    accentScale: accentScaleProp = themePropDefs.accentScale.default,
    grayScale: grayScaleProp = themePropDefs.grayScale.default,
    panelBackground: panelBackgroundProp = themePropDefs.panelBackground.default,
    radius: radiusProp = themePropDefs.radius.default,
    scaling: scalingProp = themePropDefs.scaling.default,
    background = themePropDefs.background.default,
    ...rootProps
  } = props;
  const [appearance, setAppearance] = React.useState(appearanceProp);
  React.useEffect(() => setAppearance(appearanceProp), [appearanceProp]);

  const [accentScale, setAccentScale] = React.useState(accentScaleProp);
  React.useEffect(() => setAccentScale(accentScaleProp), [accentScaleProp]);

  const [grayScale, setGrayScale] = React.useState(grayScaleProp);
  React.useEffect(() => setGrayScale(grayScaleProp), [grayScaleProp]);

  const [panelBackground, setPanelBackground] = React.useState(panelBackgroundProp);
  React.useEffect(() => setPanelBackground(panelBackgroundProp), [panelBackgroundProp]);

  const [radius, setRadius] = React.useState(radiusProp);
  React.useEffect(() => setRadius(radiusProp), [radiusProp]);

  const [scaling, setScaling] = React.useState(scalingProp);
  React.useEffect(() => setScaling(scalingProp), [scalingProp]);

  // Initial appearance on page load when `appearance` is explicitly set to `light` or `dark`
  const ExplicitRootAppearanceScript = React.memo(
    ({ appearance }: { appearance: Omit<ThemeOptions['appearance'], 'inherit'> }) => (
      <script
        dangerouslySetInnerHTML={{
          __html: `!(function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');d.style.colorScheme='${appearance}';c.add('${appearance}');}catch(e){}})();`,
        }}
      ></script>
    ),
    () => true // Never re-render
  );
  ExplicitRootAppearanceScript.displayName = 'ExplicitRootAppearanceScript';

  // Client-side only changes (when `appearance` is changed via `ThemePanel` or when the prop is changed while developing)
  React.useEffect(() => {
    if (appearance === 'inherit') return;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.style.colorScheme = appearance;
    root.classList.add(appearance);
  }, [appearance]);

  const resolvedGrayScale = grayScale === 'auto' ? getMatchingGrayScale(accentScale) : grayScale;

  return (
    <>
      {appearance !== 'inherit' && <ExplicitRootAppearanceScript appearance={appearance} />}

      {background && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
:root, .light, .light-theme { --color-page-background: white; }
.dark, .dark-theme { --color-page-background: var(--${resolvedGrayScale}-1); }
body { background-color: var(--color-page-background); }
`,
          }}
        />
      )}

      <ThemeImpl
        {...rootProps}
        ref={forwardedRef}
        isRoot
        background={background}
        //
        appearance={appearance}
        accentScale={accentScale}
        grayScale={grayScale}
        panelBackground={panelBackground}
        radius={radius}
        scaling={scaling}
        //
        onAppearanceChange={setAppearance}
        onAccentScaleChange={setAccentScale}
        onGrayScaleChange={setGrayScale}
        onPanelBackgroundChange={setPanelBackground}
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
  isRoot?: boolean;
  background?: boolean;
}
interface ThemeImplPrivateProps extends Partial<ThemeChangeHandlers> {}
const ThemeImpl = React.forwardRef<ThemeImplElement, ThemeImplProps>((props, forwardedRef) => {
  const context = React.useContext(ThemeContext);
  const {
    asChild,
    isRoot,
    background = themePropDefs.background.default,
    //
    appearance = context?.appearance ?? themePropDefs.appearance.default,
    accentScale = context?.accentScale ?? themePropDefs.accentScale.default,
    grayScale = context?.resolvedGrayScale ?? themePropDefs.grayScale.default,
    panelBackground = context?.panelBackground ?? themePropDefs.panelBackground.default,
    radius = context?.radius ?? themePropDefs.radius.default,
    scaling = context?.scaling ?? themePropDefs.scaling.default,
    //
    onAppearanceChange = noop,
    onAccentScaleChange = noop,
    onGrayScaleChange = noop,
    onPanelBackgroundChange = noop,
    onRadiusChange = noop,
    onScalingChange = noop,
    //
    ...themeProps
  } = props;
  const Comp = asChild ? Slot : 'div';
  const resolvedGrayScale = grayScale === 'auto' ? getMatchingGrayScale(accentScale) : grayScale;
  const isExplicitAppearance = props.appearance !== undefined && props.appearance !== 'inherit';
  const shouldSetBackground = background === true && !isRoot && isExplicitAppearance;
  return (
    <ThemeContext.Provider
      value={React.useMemo(
        () => ({
          appearance,
          accentScale,
          grayScale,
          resolvedGrayScale,
          panelBackground,
          radius,
          scaling,
          //
          onAppearanceChange,
          onAccentScaleChange,
          onGrayScaleChange,
          onPanelBackgroundChange,
          onRadiusChange,
          onScalingChange,
        }),
        [
          appearance,
          accentScale,
          grayScale,
          resolvedGrayScale,
          panelBackground,
          radius,
          scaling,
          //
          onAppearanceChange,
          onAccentScaleChange,
          onGrayScaleChange,
          onPanelBackgroundChange,
          onRadiusChange,
          onScalingChange,
        ]
      )}
    >
      <Comp
        data-accent-scale={accentScale}
        data-gray-scale={resolvedGrayScale}
        // for nested `Theme` background
        data-background={shouldSetBackground ? 'true' : 'false'}
        data-panel-background={panelBackground}
        data-radius={radius}
        data-scaling={scaling}
        ref={forwardedRef}
        {...themeProps}
        className={classNames(
          'radix-themes',
          {
            root: isRoot,
            // Only apply theme class to nested `Theme` sections.
            //
            // If it's the root `Theme`, we either rely on
            // - something else setting the theme class when root `appearance` is `inherit`
            // - our script setting it when root `appearance` is explicit
            light: !isRoot && appearance === 'light',
            dark: !isRoot && appearance === 'dark',
          },
          themeProps.className
        )}
      />
    </ThemeContext.Provider>
  );
});
ThemeImpl.displayName = 'ThemeImpl';

export { Theme, useThemeContext };
