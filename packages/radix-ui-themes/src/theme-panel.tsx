'use client';

import * as React from 'react';
import { gray as radixColorsGray, grayDark as radixColorsGrayDark } from '@radix-ui/colors';
import {
  Box,
  Button,
  Checkbox,
  Code,
  Em,
  Flex,
  Grid,
  Heading,
  IconButton,
  Kbd,
  Popover,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Slider,
  Strong,
  Text,
  Tooltip,
  // helpers
  themePropDefs,
  themeAccentScalesGrouped,
  themeGrayScalesGrouped,
  getMatchingGrayScale,
  useThemeContext,
} from './index';
import { InfoCircledIcon } from './icons';

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
          backgroundColor: 'var(--color-panel)',
          boxShadow: '0 0 0 0.5px var(--gray-a6), var(--shadow-3)',
          transformOrigin: 'top right',
          transitionProperty: 'opacity, transform',
          transitionDuration: visible ? '350ms, 800ms' : '200ms, 350ms',
          transitionTimingFunction: visible ? 'linear, cubic-bezier(0.16, 1, 0.3, 1)' : 'ease-out',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          opacity: visible ? 1 : 0,
          ...props.style,
        }}
      >
        <Flex
          p="3"
          align="baseline"
          justify="between"
          shrink="0"
          style={{ backgroundColor: 'var(--black-a2)', boxShadow: '0 0 0 1px var(--gray-6)' }}
        >
          <Heading size="4" weight="regular" as="h3">
            Configure theme
          </Heading>
          <Kbd>⌘C</Kbd>
        </Flex>

        <ScrollArea>
          <Box grow="1" p="5">
            <Text as="p" size="2" weight="bold" mb="3">
              Color
            </Text>

            <Flex direction="column" gap="1" mb="3">
              <Label htmlFor="appearance">Appearance</Label>
              <Select.Root value={appearance} onValueChange={onAppearanceChange}>
                <Select.Trigger id="appearance" variant="surface" color="gray" highContrast />
                <Select.Content variant="soft" color="gray">
                  {themePropDefs.appearance.values.map((value) => (
                    <Select.Item key={value} value={value}>
                      {value}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction="column" gap="1" mb="3">
              <Label htmlFor="accent-scale">Accent scale</Label>
              <Select.Root value={accentScale} onValueChange={onAccentScaleChange}>
                <Select.Trigger id="accent-scale" variant="surface" color="gray" highContrast />
                <Select.Content variant="soft" color="gray">
                  {themeAccentScalesGrouped.map(({ label, values }, index) => (
                    <React.Fragment key={label}>
                      {index > 0 ? <Select.Separator /> : null}
                      <Select.Group>
                        {label ? <Select.Label>{label}</Select.Label> : null}
                        {values.map((color) => (
                          <Select.Item key={color} value={color}>
                            <Flex align="center" gap="2">
                              <span
                                data-accent-scale={color}
                                style={{
                                  display: 'inline-block',
                                  width: 'var(--space-2)',
                                  height: 'var(--space-2)',
                                  borderRadius: '100%',
                                  backgroundColor: 'var(--accent-9)',
                                }}
                              />
                              <Flex align="baseline" gap="1">
                                {color}
                                {color === 'gray' && !['auto', 'gray'].includes(grayScale) ? (
                                  <Text size="2" color="gray">
                                    <Em> ({grayScale})</Em>
                                  </Text>
                                ) : null}
                              </Flex>
                            </Flex>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </React.Fragment>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>

            <Flex direction="column" gap="1" mb="3">
              <Label htmlFor="gray-scale">Gray scale</Label>
              <Select.Root value={grayScale} onValueChange={onGrayScaleChange}>
                <Select.Trigger id="gray-scale" variant="surface" color="gray" highContrast />
                <Select.Content variant="soft" color="gray">
                  {themeGrayScalesGrouped.map(({ label, values }, index) => (
                    <React.Fragment key={label}>
                      {index > 0 ? <Select.Separator /> : null}
                      <Select.Group>
                        <Select.Label>{label}</Select.Label>
                        {values.map((gray) => (
                          <Select.Item key={gray} value={gray}>
                            <Flex align="center" gap="2">
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: 'var(--space-2)',
                                  height: 'var(--space-2)',
                                  borderRadius: '100%',
                                  backgroundColor:
                                    gray === 'auto'
                                      ? `var(--${autoMatchedGray}-9)`
                                      : gray === 'gray'
                                      ? pureGray9
                                      : `var(--${gray}-9)`,
                                }}
                              />
                              <Flex align="baseline" gap="1">
                                {gray}
                                {gray === 'auto' ? (
                                  <Text size="2" color="gray">
                                    <Em> ({autoMatchedGray})</Em>
                                  </Text>
                                ) : null}
                              </Flex>
                            </Flex>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </React.Fragment>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>

            <Grid columns="2" gap="5" mb="3" align="center">
              <Flex direction="column" gap="1">
                <Flex asChild gap="1" align="center">
                  <Label>
                    Background
                    <Popover.Root>
                      <Popover.Trigger>
                        <IconButton
                          size="1"
                          variant="ghost"
                          aria-label="More information about background color options"
                        >
                          <InfoCircledIcon style={{ display: 'block', opacity: 0.8 }} />
                        </IconButton>
                      </Popover.Trigger>
                      <Popover.Content side="left" align="center">
                        <Box p="4" style={{ width: 340 }}>
                          <Text as="p" size="2" color="gray" mb="3">
                            Background color
                          </Text>
                          <DescriptionList.Root>
                            <DescriptionList.Term>
                              <Code size="3">&quot;auto&quot;</Code>
                            </DescriptionList.Term>
                            <DescriptionList.Details>
                              Chosing this option will set the background to <Strong>White</Strong>{' '}
                              when appearance is <Code>light</Code> and <Strong>Gray 1</Strong>
                              <Text size="2" color="gray">
                                <Em> ({resolvedGrayScale} 1)</Em>
                              </Text>{' '}
                              when appearance is <Code>dark</Code>.
                            </DescriptionList.Details>
                            <DescriptionList.Term>
                              <Code size="3">&quot;gray&quot;</Code>
                            </DescriptionList.Term>
                            <DescriptionList.Details mb="0">
                              Chosing this option will set the background to <Strong>Gray 1</Strong>
                              <Text size="2" color="gray">
                                <Em> ({resolvedGrayScale} 1)</Em>
                              </Text>
                              .
                            </DescriptionList.Details>
                          </DescriptionList.Root>
                        </Box>
                      </Popover.Content>
                    </Popover.Root>
                  </Label>
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
                  <Label>
                    Text
                    <Popover.Root>
                      <Popover.Trigger>
                        <IconButton
                          size="1"
                          variant="ghost"
                          aria-label="More information about text color options"
                        >
                          <InfoCircledIcon style={{ display: 'block', opacity: 0.8 }} />
                        </IconButton>
                      </Popover.Trigger>
                      <Popover.Content side="left" align="center">
                        <Box p="4" style={{ width: 320 }}>
                          <Text as="p" size="2" color="gray" mb="3">
                            Text color
                          </Text>
                          <DescriptionList.Root>
                            <DescriptionList.Term>
                              <Code size="3">&quot;auto&quot;</Code>
                            </DescriptionList.Term>
                            <DescriptionList.Details>
                              Chosing this option will set the text to <Strong>Gray 12</Strong>
                              <Text size="2" color="gray">
                                <Em> ({resolvedGrayScale} 12)</Em>
                              </Text>
                              .
                            </DescriptionList.Details>
                            <DescriptionList.Term>
                              <Code size="3">&quot;accent&quot;</Code>
                            </DescriptionList.Term>
                            <DescriptionList.Details mb="0">
                              Chosing this option will set the background to{' '}
                              <Strong>Accent 12</Strong>
                              <Text size="2" color="gray">
                                <Em> ({accentScale} 12)</Em>
                              </Text>
                              .
                            </DescriptionList.Details>
                          </DescriptionList.Root>
                        </Box>
                      </Popover.Content>
                    </Popover.Root>
                  </Label>
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
            </Grid>

            <Separator size="4" mt="4" mb="5" mx="-5" style={{ width: 'auto' }} />
            <Text as="p" size="2" weight="bold" mb="3">
              Style
            </Text>

            <Flex direction="column" gap="1" mb="3">
              <Label htmlFor="radius">Radius › {radius}</Label>
              {/* <Select.Root value={radius} onValueChange={(value) => setRadius(value as ThemeRadius)}>
								<Select.Trigger id="radius" variant="surface" color="gray" highContrast />
								<Select.Content variant="soft" color="gray">
									{themeRadii.map((value) => (
										<Select.Item key={value} value={value}>
											{value}
										</Select.Item>
									))}
								</Select.Content>
							</Select.Root> */}
              <Slider
                id="radius"
                value={[themePropDefs.radius.values.indexOf(radius)]}
                onValueChange={([value]) => onRadiusChange(themePropDefs.radius.values[value])}
                min={0}
                max={themePropDefs.radius.values.length - 1}
                step={1}
              />
            </Flex>

            <Flex direction="column" gap="1">
              <Label htmlFor="scaling">Scaling</Label>
              <Select.Root value={scaling} onValueChange={onScalingChange}>
                <Select.Trigger id="scaling" variant="surface" color="gray" highContrast />
                <Select.Content variant="soft" color="gray">
                  {themePropDefs.scaling.values.map((value) => (
                    <Select.Item key={value} value={value}>
                      {value}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </Flex>
            <Separator size="4" mt="4" mb="5" mx="-5" style={{ width: 'auto' }} />
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

function DescriptionListRoot(props: any) {
  return (
    <Box asChild {...props} style={{ margin: 0, ...props.style }}>
      <dl>{props.children}</dl>
    </Box>
  );
}

function DescriptionListTerm(props: any) {
  return (
    <Text asChild size="2" mb="1" {...props}>
      <dt>{props.children}</dt>
    </Text>
  );
}

function DescriptionListDetails(props: any) {
  return (
    <Text asChild size="2" mb="4" {...props}>
      <dd>{props.children}</dd>
    </Text>
  );
}

const DescriptionList = Object.assign(
  {},
  {
    Root: DescriptionListRoot,
    Term: DescriptionListTerm,
    Details: DescriptionListDetails,
  }
);

export { ThemePanel };
