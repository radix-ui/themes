'use client';

import * as React from 'react';
import {
  Theme,
  //
  AspectRatio,
  Box,
  Button,
  Em,
  Flex,
  Grid,
  Heading,
  Kbd,
  ScrollArea,
  Text,
  Tooltip,
  // helpers
  themePropDefs,
  themeAccentColorsOrdered,
  getMatchingGrayColor,
  useThemeContext,
  radixGrayScalesDesaturated,
} from './index';

import type { ThemeOptions } from './index';

interface ThemePanelProps extends Omit<ThemePanelImplProps, keyof ThemePanelImplPrivateProps> {
  defaultOpen?: boolean;
}
const ThemePanel = React.forwardRef<ThemePanelImplElement, ThemePanelProps>(
  ({ defaultOpen = true, ...props }, forwardedRef) => {
    const [mounted, setMounted] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    React.useLayoutEffect(() => {
      setMounted(true);
      setTimeout(() => setOpen(defaultOpen), 0);
    }, [defaultOpen]);

    return mounted ? (
      <ThemePanelImpl {...props} ref={forwardedRef} open={open} onOpenChange={setOpen} />
    ) : null;
  }
);
ThemePanel.displayName = 'ThemePanel';

type ThemePanelImplElement = React.ElementRef<typeof Box>;
interface ThemePanelImplProps
  extends React.ComponentPropsWithoutRef<typeof Box>,
    ThemePanelImplPrivateProps {}
interface ThemePanelImplPrivateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const ThemePanelImpl = React.forwardRef<ThemePanelImplElement, ThemePanelImplProps>(
  (props, forwardedRef) => {
    const { open, onOpenChange, ...panelProps } = props;
    const themeContext = useThemeContext();
    const {
      appearance,
      onAppearanceChange,
      accentColor,
      onAccentColorChange,
      grayColor,
      onGrayColorChange,
      panelBackground,
      onPanelBackgroundChange,
      radius,
      onRadiusChange,
      scaling,
      onScalingChange,
    } = themeContext;

    const autoMatchedGray = getMatchingGrayColor(accentColor);
    const resolvedGrayColor = grayColor === 'auto' ? autoMatchedGray : grayColor;

    const [copyState, setCopyState] = React.useState<'idle' | 'copying' | 'copied'>('idle');
    async function handleCopyThemeConfig() {
      const theme: Partial<ThemeOptions> = {
        appearance: appearance === themePropDefs.appearance.default ? undefined : appearance,
        accentColor: accentColor === themePropDefs.accentColor.default ? undefined : accentColor,
        grayColor: grayColor === themePropDefs.grayColor.default ? undefined : grayColor,
        panelBackground:
          panelBackground === themePropDefs.panelBackground.default ? undefined : panelBackground,
        radius: radius === themePropDefs.radius.default ? undefined : radius,
        scaling: scaling === themePropDefs.scaling.default ? undefined : scaling,
      };
      const props = Object.keys(theme)
        .filter((key) => theme[key as keyof ThemeOptions] !== undefined)
        .map((key) => `${key}="${theme[key as keyof ThemeOptions]}"`)
        .join(' ');
      setCopyState('copying');
      await navigator.clipboard.writeText(props);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    }

    // quickly show/hide using ⌘C
    React.useEffect(() => {
      function handleKeydown(event: KeyboardEvent) {
        const isCmdC =
          event.metaKey && event.key === 'c' && !event.shiftKey && !event.altKey && !event.ctrlKey;
        if (isCmdC && window.getSelection()?.toString() === '') {
          onOpenChange(!open);
        }
      }
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    }, [onOpenChange, open]);

    // quickly toggle appearance using cmd+d
    React.useEffect(() => {
      function handleKeydown(event: KeyboardEvent) {
        if (event.metaKey && event.key === 'd') {
          event.preventDefault();
          onAppearanceChange(appearance === 'dark' ? 'light' : 'dark');
        }
      }
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    }, [appearance, onAppearanceChange]);

    const [resolvedAppearance, setResolvedAppearance] = React.useState<'light' | 'dark' | null>(
      appearance === 'inherit' ? null : appearance
    );
    React.useEffect(() => {
      const root = document.documentElement;
      const body = document.body;

      function update() {
        const hasDarkClass =
          root.classList.contains('dark') ||
          root.classList.contains('dark-theme') ||
          body.classList.contains('dark') ||
          body.classList.contains('dark-theme');

        onAppearanceChange(hasDarkClass ? 'dark' : 'light');
        setResolvedAppearance(hasDarkClass ? 'dark' : 'light');
      }

      update();

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName === 'class') update();
        });
      });
      observer.observe(root, { attributes: true });
      observer.observe(body, { attributes: true });
      return () => observer.disconnect();
    }, [onAppearanceChange]);

    return (
      <Theme asChild radius="medium" scaling="100%">
        <Flex
          direction="column"
          position="fixed"
          top="0"
          right="0"
          mr="4"
          mt="4"
          // @ts-ignore
          inert={open ? undefined : ''}
          {...panelProps}
          ref={forwardedRef}
          style={{
            zIndex: 9999,
            overflow: 'hidden',
            maxHeight: 'calc(100vh - var(--space-4) - var(--space-4))',
            borderRadius: 'var(--radius-4)',
            backgroundColor: 'var(--color-panel-solid)',
            boxShadow: 'var(--shadow-6)',
            transformOrigin: 'top right',
            transitionProperty: 'opacity, transform',
            transitionDuration: open ? '350ms, 800ms' : '200ms, 350ms',
            transitionTimingFunction: open ? 'linear, cubic-bezier(0.16, 1, 0.3, 1)' : 'ease-out',
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            opacity: open ? 1 : 0,
            ...props.style,
          }}
        >
          <ScrollArea>
            <Box grow="1" p="5" position="relative">
              <Box position="absolute" top="0" right="0" m="3">
                <Tooltip content="Press ⌘C to quickly show/hide" side="left">
                  <Kbd tabIndex={0} className="rt-ThemePanelShortcut">
                    ⌘C
                  </Kbd>
                </Tooltip>
              </Box>

              <Heading size="5" trim="both" as="h3" mb="6">
                Theme
              </Heading>

              <Text id="accent-color-title" as="p" size="2" weight="medium" mt="5">
                Accent color
              </Text>

              <Grid columns="10" gap="2" mt="3" role="group" aria-labelledby="accent-color-title">
                {themeAccentColorsOrdered.map((color) => (
                  <label
                    key={color}
                    className="rt-ThemePanelSwatch"
                    style={{ backgroundColor: `var(--${color}-9)` }}
                  >
                    <Tooltip
                      content={
                        <>
                          {upperFirst(color)}
                          {color === 'gray' && <Em> ({upperFirst(resolvedGrayColor)})</Em>}
                        </>
                      }
                    >
                      <input
                        type="radio"
                        name="accentColor"
                        value={color}
                        checked={accentColor === color}
                        onChange={(event) =>
                          onAccentColorChange(event.target.value as ThemeOptions['accentColor'])
                        }
                      />
                    </Tooltip>
                  </label>
                ))}
              </Grid>

              <Flex asChild align="center" justify="between">
                <Text as="p" id="gray-color-title" size="2" weight="medium" mt="5">
                  Gray color
                </Text>
              </Flex>

              <Grid columns="10" gap="2" mt="3" role="group" aria-labelledby="gray-color-title">
                {['auto', 'gray', ...radixGrayScalesDesaturated].map((gray) => (
                  <Flex key={gray} asChild align="center" justify="center">
                    <label
                      className="rt-ThemePanelSwatch"
                      style={{
                        backgroundColor:
                          gray === 'auto'
                            ? `var(--${autoMatchedGray}-9)`
                            : gray === 'gray'
                            ? 'var(--gray-9)'
                            : `var(--${gray}-9)`,
                        // we override --gray so pure gray doesn't exist anymore
                        // recover something as close as possible by desaturating
                        filter: gray === 'gray' ? 'saturate(0)' : undefined,
                      }}
                    >
                      <Tooltip
                        content={
                          <>
                            {upperFirst(gray)}
                            {gray === 'auto' && <Em> ({upperFirst(autoMatchedGray)})</Em>}
                          </>
                        }
                      >
                        <input
                          type="radio"
                          name="grayColor"
                          value={gray}
                          checked={grayColor === gray}
                          onChange={(event) =>
                            onGrayColorChange(event.target.value as ThemeOptions['grayColor'])
                          }
                        />
                      </Tooltip>
                    </label>
                  </Flex>
                ))}
              </Grid>

              <Text id="appearance-title" as="p" size="2" weight="medium" mt="5">
                Appearance
              </Text>

              <Grid columns="2" gap="2" mt="3" role="group" aria-labelledby="appearance-title">
                {(['light', 'dark'] as const).map((value) => (
                  <label key={value} className="rt-ThemePanelRadioCard">
                    <input
                      type="radio"
                      name="appearance"
                      value={value}
                      checked={resolvedAppearance === value}
                      onChange={(event) =>
                        onAppearanceChange(event.target.value as ThemeOptions['appearance'])
                      }
                      // TODO: Stop-gap solution for `onChange` stopping working after a few changes
                      onClick={() => onAppearanceChange(value)}
                    />
                    <Flex align="center" justify="center" height="6">
                      <Text size="1" weight="medium">
                        {upperFirst(value)}
                      </Text>
                    </Flex>
                  </label>
                ))}
              </Grid>

              <Text id="radius-title" as="p" size="2" weight="medium" mt="5">
                Radius
              </Text>

              <Grid columns="5" gap="2" mt="3" role="group" aria-labelledby="radius-title">
                {themePropDefs.radius.values.map((value) => (
                  <Flex key={value} direction="column" gap="2" align="center">
                    <label className="rt-ThemePanelRadioCard">
                      <input
                        type="radio"
                        name="radius"
                        value={value}
                        checked={radius === value}
                        onChange={(event) =>
                          onRadiusChange(event.target.value as ThemeOptions['radius'])
                        }
                      />
                      <Theme asChild radius={value}>
                        <Box
                          m="3"
                          width="6"
                          height="6"
                          style={{
                            borderTopLeftRadius: 'var(--radius-4)',
                            backgroundColor: 'var(--gray-a4)',
                            borderTop: '4px solid var(--gray-a8)',
                            borderLeft: '4px solid var(--gray-a8)',
                          }}
                        />
                      </Theme>
                    </label>
                    <Text size="1" color="gray">
                      {upperFirst(value)}
                    </Text>
                  </Flex>
                ))}
              </Grid>

              <Text id="scaling-title" as="p" size="2" weight="medium" mt="5">
                Scaling
              </Text>

              <Grid columns="5" gap="2" mt="3" role="group" aria-labelledby="scaling-title">
                {themePropDefs.scaling.values.map((value) => (
                  <label key={value} className="rt-ThemePanelRadioCard">
                    <input
                      type="radio"
                      name="scaling"
                      value={value}
                      checked={scaling === value}
                      onChange={(event) =>
                        onScalingChange(event.target.value as ThemeOptions['scaling'])
                      }
                    />

                    <Flex align="center" justify="center" height="6">
                      <Theme asChild scaling={value}>
                        <Flex align="center" justify="center">
                          <Text size="1" weight="medium">
                            {upperFirst(value)}
                          </Text>
                        </Flex>
                      </Theme>
                    </Flex>
                  </label>
                ))}
              </Grid>

              <Text id="panel-background-title" as="p" size="2" weight="medium" mt="5">
                Panel background
              </Text>

              <Grid
                columns="2"
                gap="2"
                mt="3"
                role="group"
                aria-labelledby="panel-background-title"
              >
                {themePropDefs.panelBackground.values.map((value) => (
                  <label key={value} className="rt-ThemePanelRadioCard">
                    <input
                      type="radio"
                      name="panelBackground"
                      value={value}
                      checked={panelBackground === value}
                      onChange={(event) =>
                        onPanelBackgroundChange(
                          event.target.value as ThemeOptions['panelBackground']
                        )
                      }
                    />
                    <Flex align="center" justify="center" height="6">
                      <Text size="1" weight="medium">
                        {upperFirst(value)}
                      </Text>
                    </Flex>
                  </label>
                ))}
              </Grid>

              <Tooltip
                content="Copy props, then paste them on your `Theme`"
                multiline
                style={{ maxWidth: 170 }}
              >
                <Button mt="5" style={{ width: '100%' }} onClick={handleCopyThemeConfig}>
                  {copyState === 'idle'
                    ? 'Copy theme config'
                    : copyState === 'copying'
                    ? 'Copying...'
                    : 'Copied!'}
                </Button>
              </Tooltip>
            </Box>
          </ScrollArea>
        </Flex>
      </Theme>
    );
  }
);
ThemePanelImpl.displayName = 'ThemePanelImpl';

function Label(props: any) {
  return (
    <Text {...props} size="1" color="gray" asChild>
      <label>{props.children}</label>
    </Text>
  );
}
function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { ThemePanel };
