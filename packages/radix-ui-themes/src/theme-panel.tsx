'use client';

import * as React from 'react';
import { gray as radixColorsGray, grayDark as radixColorsGrayDark } from '@radix-ui/colors';
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
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Switch,
  Text,
  Tooltip,
  // helpers
  themePropDefs,
  themeAccentScalesOrdered,
  getMatchingGrayScale,
  useThemeContext,
  radixGrayScalesDesaturated,
} from './index';

import type { ThemeOptions } from './index';

interface ThemePanelProps extends Omit<ThemePanelImplProps, keyof ThemePanelImplPrivateProps> {
  initiallyHidden?: boolean;
}
const ThemePanel = React.forwardRef<ThemePanelImplElement, ThemePanelProps>(
  ({ initiallyHidden, ...props }, forwardedRef) => {
    const [mounted, setMounted] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    React.useLayoutEffect(() => {
      setMounted(true);
      setTimeout(() => setVisible(!initiallyHidden ? true : false), 0);
    }, [initiallyHidden]);

    return mounted ? (
      <ThemePanelImpl
        {...props}
        ref={forwardedRef}
        visible={visible}
        onVisibleChange={setVisible}
      />
    ) : null;
  }
);
ThemePanel.displayName = 'ThemePanel';

type ThemePanelImplElement = React.ElementRef<typeof Box>;
interface ThemePanelImplProps
  extends React.ComponentPropsWithoutRef<typeof Box>,
    ThemePanelImplPrivateProps {}
interface ThemePanelImplPrivateProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}
const ThemePanelImpl = React.forwardRef<ThemePanelImplElement, ThemePanelImplProps>(
  (props, forwardedRef) => {
    const { visible, onVisibleChange, ...panelProps } = props;
    const themeContext = useThemeContext();
    const {
      appearance,
      onAppearanceChange,
      accentScale,
      onAccentScaleChange,
      grayScale,
      onGrayScaleChange,
      backgroundColor,
      onBackgroundColorChange,
      panelBackground,
      onPanelBackgroundChange,
      textColor,
      onTextColorChange,
      radius,
      onRadiusChange,
      scaling,
      onScalingChange,
    } = themeContext;

    const pureGray9 = appearance === 'dark' ? radixColorsGrayDark.gray9 : radixColorsGray.gray9;
    const autoMatchedGray = getMatchingGrayScale(accentScale);
    const resolvedGrayScale = grayScale === 'auto' ? autoMatchedGray : grayScale;

    const [copyState, setCopyState] = React.useState<'idle' | 'copying' | 'copied'>('idle');
    async function handleCopyThemeConfig() {
      const theme: Partial<ThemeOptions> = {
        appearance: appearance === themePropDefs.appearance.default ? undefined : appearance,
        accentScale: accentScale === themePropDefs.accentScale.default ? undefined : accentScale,
        grayScale: grayScale === themePropDefs.grayScale.default ? undefined : grayScale,
        backgroundColor:
          backgroundColor === themePropDefs.backgroundColor.default ? undefined : backgroundColor,
        panelBackground:
          panelBackground === themePropDefs.panelBackground.default ? undefined : panelBackground,
        textColor: textColor === themePropDefs.textColor.default ? undefined : textColor,
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
          onVisibleChange(!visible);
        }
      }
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    }, [onVisibleChange, visible]);

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

    return (
      <Flex
        direction="column"
        position="fixed"
        top="0"
        right="0"
        mr="4"
        mt="4"
        // @ts-ignore
        inert={visible ? undefined : ''}
        {...panelProps}
        ref={forwardedRef}
        style={{
          zIndex: 9999,
          overflow: 'hidden',
          height: 'calc(100vh - var(--space-4) - var(--space-4))',
          borderRadius: 'var(--radius-4)',
          backgroundColor: 'var(--color-panel-solid)',
          boxShadow: 'var(--shadow-6)',
          transformOrigin: 'top right',
          transitionProperty: 'opacity, transform',
          transitionDuration: visible ? '350ms, 800ms' : '200ms, 350ms',
          transitionTimingFunction: visible ? 'linear, cubic-bezier(0.16, 1, 0.3, 1)' : 'ease-out',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          opacity: visible ? 1 : 0,
          ...props.style,
        }}
      >
        {/* <Flex p="5" justify="between" shrink="0">
          <Kbd>⌘C</Kbd>
        </Flex> */}

        <ScrollArea>
          <Box grow="1" p="5">
            <Heading size="5" trim="both" as="h3" mb="6">
              Theme
            </Heading>

            <Text id="accent-color-title" as="p" size="2" weight="medium" mt="5">
              Accent color
            </Text>

            <Grid columns="10" gap="2" mt="3" role="group" aria-labelledby="accent-color-title">
              {themeAccentScalesOrdered.map((color) => (
                <label
                  key={color}
                  className="ThemePanelSwatch"
                  style={{ backgroundColor: `var(--${color}-9)` }}
                >
                  <Tooltip
                    content={
                      <>
                        {upperFirst(color)}
                        {color === 'gray' && <Em> ({upperFirst(resolvedGrayScale)})</Em>}
                      </>
                    }
                  >
                    <input
                      type="radio"
                      name="accentScale"
                      value={color}
                      checked={accentScale === color}
                      onChange={(event) =>
                        onAccentScaleChange(event.target.value as ThemeOptions['accentScale'])
                      }
                    />
                  </Tooltip>
                </label>
              ))}
            </Grid>

            <Flex asChild align="center" justify="between">
              <Text as="p" size="2" weight="medium" mt="5">
                <span id="gray-color-title">Gray color</span>
                <label>
                  <Text weight="regular">auto</Text>
                  <Switch
                    size="1"
                    color="gray"
                    highContrast
                    radius="full"
                    ml="1"
                    checked={grayScale === 'auto'}
                    onCheckedChange={(checked) => {
                      onGrayScaleChange(checked === true ? 'auto' : resolvedGrayScale);
                    }}
                  />
                </label>
              </Text>
            </Flex>

            <Grid columns="10" gap="2" mt="3" role="group" aria-labelledby="gray-color-title">
              {['gray', ...radixGrayScalesDesaturated].map((gray) => (
                <Flex key={gray} asChild align="center" justify="center">
                  <label
                    className="ThemePanelSwatch gray"
                    style={{
                      backgroundColor: gray === 'gray' ? pureGray9 : `var(--${gray}-9)`,
                    }}
                  >
                    <Tooltip content={upperFirst(gray)}>
                      <input
                        type="radio"
                        name="grayScale"
                        value={gray}
                        checked={
                          grayScale === gray || (grayScale === 'auto' && gray === autoMatchedGray)
                        }
                        onChange={(event) =>
                          onGrayScaleChange(event.target.value as ThemeOptions['grayScale'])
                        }
                      />
                    </Tooltip>
                  </label>
                </Flex>
              ))}
            </Grid>

            <Text asChild id="appearance-title" size="2" weight="medium" mt="5">
              <Label htmlFor="appearance" style={{ display: 'block' }}>
                Appearance
              </Label>
            </Text>

            <Select.Root value={appearance} onValueChange={onAppearanceChange}>
              <Select.Trigger
                id="appearance"
                variant="surface"
                color="gray"
                highContrast
                mt="3"
                style={{ width: '100%' }}
              />
              <Select.Content variant="soft" color="gray">
                {themePropDefs.appearance.values.map((value) => (
                  <Select.Item key={value} value={value}>
                    {value}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <Text id="radius-title" as="p" size="2" weight="medium" mt="5">
              Radius
            </Text>

            <Grid columns="5" gap="2" mt="3" role="group" aria-labelledby="radius-title">
              {themePropDefs.radius.values.map((value) => (
                <Flex key={value} direction="column" gap="2" align="center">
                  <label className="ThemePanelRadioCard">
                    <input
                      type="radio"
                      name="radius"
                      value={value}
                      checked={radius === value}
                      onChange={(event) =>
                        onRadiusChange(event.target.value as ThemeOptions['radius'])
                      }
                    />
                    <Theme asChild radius={value} applyBackgroundColor={false}>
                      <Box
                        m="3"
                        width="6"
                        height="6"
                        style={{
                          borderTopLeftRadius: 'var(--radius-4)',
                          backgroundColor: 'var(--accent-9)',
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
                <label key={value} className="ThemePanelRadioCard">
                  <input
                    type="radio"
                    name="scaling"
                    value={value}
                    checked={scaling === value}
                    onChange={(event) =>
                      onScalingChange(event.target.value as ThemeOptions['scaling'])
                    }
                  />

                  <Theme asChild scaling={value} applyBackgroundColor={false}>
                    <AspectRatio ratio={1}>
                      <Flex align="center" justify="center" height="100%">
                        <Text size="1" weight="medium">
                          {value}
                        </Text>
                      </Flex>
                    </AspectRatio>
                  </Theme>
                </label>
              ))}
            </Grid>

            <Separator size="4" mt="5" mb="5" mx="-5" style={{ width: 'auto' }} />

            <Grid columns="3" gap="2" mb="3">
              <Flex direction="column" gap="1">
                <Flex asChild gap="1" align="center">
                  <Label>Page background</Label>
                </Flex>
                <RadioGroup.Root value={backgroundColor} onValueChange={onBackgroundColorChange}>
                  <Flex direction="column" gap="1">
                    {themePropDefs.backgroundColor.values.map((value) => (
                      <Text key={value} size="2" asChild>
                        <label>
                          <RadioGroup.Item value={value} mr="2" />
                          {value}
                        </label>
                      </Text>
                    ))}
                  </Flex>
                </RadioGroup.Root>
              </Flex>

              <Flex direction="column" gap="1">
                <Flex asChild gap="1" align="center">
                  <Label>Text color</Label>
                </Flex>
                <RadioGroup.Root value={textColor} onValueChange={onTextColorChange}>
                  <Flex direction="column" gap="1">
                    {themePropDefs.textColor.values.map((value) => (
                      <Text key={value} size="2" asChild>
                        <label>
                          <RadioGroup.Item value={value} mr="2" />
                          {value}
                        </label>
                      </Text>
                    ))}
                  </Flex>
                </RadioGroup.Root>
              </Flex>

              <Flex direction="column" gap="1" mb="3">
                <Label>Panel background</Label>
                <RadioGroup.Root value={panelBackground} onValueChange={onPanelBackgroundChange}>
                  <Flex direction="column" gap="1">
                    {themePropDefs.panelBackground.values.map((value) => (
                      <Text key={value} size="2" asChild>
                        <label>
                          <RadioGroup.Item value={value} mr="2" />
                          {value}
                        </label>
                      </Text>
                    ))}
                  </Flex>
                </RadioGroup.Root>
              </Flex>
            </Grid>
          </Box>
        </ScrollArea>

        <Box p="3" shrink="0" style={{ borderTop: '1px solid var(--gray-6)' }}>
          <Tooltip
            content="Copy props, then paste them on your `Theme`"
            multiline
            style={{ maxWidth: 170 }}
          >
            <Button style={{ width: '100%' }} onClick={handleCopyThemeConfig}>
              {copyState === 'idle'
                ? 'Copy theme config'
                : copyState === 'copying'
                ? 'Copying...'
                : 'Copied!'}
            </Button>
          </Tooltip>
        </Box>
      </Flex>
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
