'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { DirectionProvider } from '@radix-ui/react-direction';
import { Slot } from '@radix-ui/react-slot';
import { themePropDefs, getMatchingGrayColor } from './theme-options';

import type { ThemeOptions } from './theme-options';
import { BreakpointsObject, BreakpointsProvider } from './helpers';

const noop = () => {};

interface ThemeChangeHandlers {
  onAppearanceChange: (appearance: ThemeOptions['appearance']) => void;
  onAccentColorChange: (accentColor: ThemeOptions['accentColor']) => void;
  onGrayColorChange: (grayColor: ThemeOptions['grayColor']) => void;
  onPanelBackgroundChange: (panelBackground: ThemeOptions['panelBackground']) => void;
  onRadiusChange: (radius: ThemeOptions['radius']) => void;
  onScalingChange: (scaling: ThemeOptions['scaling']) => void;
  onSpacingChange: (spacing: ThemeOptions['spacing']) => void;
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
    accentColor: accentColorProp = themePropDefs.accentColor.default,
    grayColor: grayColorProp = themePropDefs.grayColor.default,
    panelBackground: panelBackgroundProp = themePropDefs.panelBackground.default,
    radius: radiusProp = themePropDefs.radius.default,
    scaling: scalingProp = themePropDefs.scaling.default,
    spacing: spacingProp = themePropDefs.spacing.default,
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

  const [spacing, setSpacing] = React.useState(spacingProp);
  React.useEffect(() => setSpacing(spacingProp), [spacingProp]);

  // Set appearance when `appearance` is explicitly set to `light` or `dark`
  React.useEffect(
    () => {
      try{
        let removeClass: string[];
        switch(appearance) {
          case 'light': removeClass = ['dark']; break;
          case 'dark': removeClass = ['light']; break;
          default: removeClass = ['light', 'dark'];
        }

        const classList = document.documentElement.classList;
        classList.remove(...removeClass);
        if (appearance === 'light' || appearance === 'dark') {
          const html = document.documentElement;
          if (html.style.colorScheme !== appearance) {
            html.style.colorScheme = appearance;
          }
          if (!classList.contains(appearance)) {
            classList.add(appearance);
          }
        }
      } catch(e) {}
    }, 
    [appearance]
  );

  // Client-side only changes when `appearance` prop is changed while developing
  React.useEffect(() => updateThemeAppearanceClass(appearanceProp), [appearanceProp]);

  const resolvedGrayColor = grayColor === 'auto' ? getMatchingGrayColor(accentColor) : grayColor;

  // Keep in sync with ./styles/breakpoints.css
  const breakpoints: BreakpointsObject<number> = {
    initial: 0,
    xs: 520,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1640
  };

  return (
    <>
      {hasBackground && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
:root, .light, .light-theme { --color-page-background: white; }
.dark, .dark-theme { --color-page-background: var(--${resolvedGrayColor}-1); }
body { background-color: var(--color-page-background); }
`,
          }}
        />
      )}

      <BreakpointsProvider breakpoints={breakpoints} >
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
          spacing={spacing}
          //
          onAppearanceChange={setAppearance}
          onAccentColorChange={setAccentColor}
          onGrayColorChange={setGrayColor}
          onPanelBackgroundChange={setPanelBackground}
          onRadiusChange={setRadius}
          onScalingChange={setScaling}
          onSpacingChange={setSpacing}
        />
      </BreakpointsProvider>
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
  hasBackground?: boolean;
}
interface ThemeImplPrivateProps extends Partial<ThemeChangeHandlers> {}
const ThemeImpl = React.forwardRef<ThemeImplElement, ThemeImplProps>((props, forwardedRef) => {
  const context = React.useContext(ThemeContext);
  const {
    asChild,
    isRoot,
    hasBackground,
    //
    appearance = context?.appearance ?? themePropDefs.appearance.default,
    accentColor = context?.accentColor ?? themePropDefs.accentColor.default,
    grayColor = context?.resolvedGrayColor ?? themePropDefs.grayColor.default,
    panelBackground = context?.panelBackground ?? themePropDefs.panelBackground.default,
    radius = context?.radius ?? themePropDefs.radius.default,
    scaling = context?.scaling ?? themePropDefs.scaling.default,
    spacing = context?.spacing ?? themePropDefs.spacing.default,
    //
    onAppearanceChange = noop,
    onAccentColorChange = noop,
    onGrayColorChange = noop,
    onPanelBackgroundChange = noop,
    onRadiusChange = noop,
    onScalingChange = noop,
    onSpacingChange = noop,
    //
    style,
    ...themeProps
  } = props;
  const Comp = asChild ? Slot : 'div';
  const resolvedGrayColor = grayColor === 'auto' ? getMatchingGrayColor(accentColor) : grayColor;
  const isExplicitAppearance = props.appearance !== undefined && props.appearance !== 'inherit';
  const isExplicitGrayColor = props.grayColor !== undefined;
  const shouldHaveBackground =
    !isRoot &&
    (hasBackground === true ||
      (hasBackground !== false && (isExplicitAppearance || isExplicitGrayColor)));
  const themeStyle = {
    ...style,
    '--spacing-factor': spacing
  };
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
          spacing,
          //
          onAppearanceChange,
          onAccentColorChange,
          onGrayColorChange,
          onPanelBackgroundChange,
          onRadiusChange,
          onScalingChange,
          onSpacingChange,
        }),
        [
          appearance,
          accentColor,
          grayColor,
          resolvedGrayColor,
          panelBackground,
          radius,
          scaling,
          spacing,
          //
          onAppearanceChange,
          onAccentColorChange,
          onGrayColorChange,
          onPanelBackgroundChange,
          onRadiusChange,
          onScalingChange,
          onSpacingChange,
        ]
      )}
    >
      <Comp
        data-is-root-theme={isRoot ? 'true' : 'false'}
        data-accent-color={accentColor}
        data-gray-color={resolvedGrayColor}
        // for nested `Theme` background
        data-has-background={shouldHaveBackground ? 'true' : 'false'}
        data-panel-background={panelBackground}
        data-radius={radius}
        data-scaling={scaling}
        ref={forwardedRef}
        {...themeProps}
        className={classNames(
          'radix-themes',
          {
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
        style={themeStyle}
      />
    </ThemeContext.Provider>
  );
});
ThemeImpl.displayName = 'ThemeImpl';

function updateThemeAppearanceClass(appearance: ThemeOptions['appearance']) {
  if (appearance === 'inherit') return;
  const root = document.documentElement;

  if (root.classList.contains('light-theme') || root.classList.contains('dark-theme')) {
    root.classList.remove('light-theme', 'dark-theme');
    root.style.colorScheme = appearance;
    root.classList.add(`${appearance}-theme`);
  }

  if (root.classList.contains('light') || root.classList.contains('dark')) {
    root.classList.remove('light', 'dark');
    root.style.colorScheme = appearance;
    root.classList.add(appearance);
  }
}

export { Theme, useThemeContext, updateThemeAppearanceClass };
