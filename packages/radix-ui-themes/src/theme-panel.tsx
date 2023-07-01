'use client';

import * as React from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { gray as radixColorsGray, grayDark as radixColorsGrayDark } from '@radix-ui/colors';
import {
  Box,
  Checkbox,
  Code,
  Em,
  Flex,
  Grid,
  IconButton,
  Popover,
  RadioGroup,
  Select,
  Separator,
  Slider,
  Strong,
  Text,
  // helpers
  themeAccentScalesGrouped,
  themeGrayScalesGrouped,
  getMatchingGrayScale,
  themeBackgroundColors,
  themeTextColors,
  themeRadii,
  themeScalings,
} from './index';
import { useThemeConfigContext } from './theme-config';

import type {
  ThemeAccentScale,
  ThemeGrayScale,
  ThemeBackgroundColor,
  ThemeTextColor,
  ThemeScaling,
} from './index';

interface ThemePanelProps extends Omit<ThemePanelImplProps, keyof ThemePanelImplPrivateProps> {
  defaultVisible?: boolean;
}
const ThemePanel = React.forwardRef<ThemePanelImplElement, ThemePanelProps>(
  ({ defaultVisible, ...props }, forwardedRef) => {
    const [mounted, setMounted] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    React.useLayoutEffect(() => {
      setMounted(true);
      setTimeout(() => setVisible(defaultVisible ?? false), 0);
    }, [defaultVisible]);

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
    const themeConfigContext = useThemeConfigContext();
    const {
      mode,
      onModeChange,
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
    } = themeConfigContext;

    const pureGray9 = mode === 'dark' ? radixColorsGrayDark.gray9 : radixColorsGray.gray9;
    const autoMatchedGray = getMatchingGrayScale(accentScale);
    const resolvedGrayScale = grayScale === 'auto' ? autoMatchedGray : grayScale;

    // quickly show/hide using cmd+c
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

    // quickly toggle dark mode using cmd+d
    React.useEffect(() => {
      function handleKeydown(event: KeyboardEvent) {
        if (event.metaKey && event.key === 'd') {
          event.preventDefault();
          onModeChange(mode === 'dark' ? 'light' : 'dark');
        }
      }
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    }, [mode, onModeChange]);

    return (
      <Box
        p="5"
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
          borderRadius: 'min(var(--br-4), var(--panel-max-br))',
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
        <Box m="-5" mb="0" p="5" style={{ backgroundColor: 'var(--black-a2)' }}>
          <Text size="4" trim="both">
            Customize{' '}
            <Text size="1" color="gray" asChild>
              <span>(⌘C)</span>
            </Text>
          </Text>
        </Box>

        <Separator size="4" mb="4" mx="-5" style={{ width: 'auto' }} />
        <Text size="2" weight="bold" mb="3">
          Color
        </Text>

        <Flex direction="column" gap="1" mb="3">
          <Label htmlFor="accent-scale">Accent scale</Label>
          <Select.Root
            value={accentScale}
            onValueChange={(value) => onAccentScaleChange(value as ThemeAccentScale)}
          >
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
                              <Text size="2" color="gray" asChild>
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
          <Select.Root
            value={grayScale}
            onValueChange={(value) => onGrayScaleChange(value as ThemeGrayScale)}
          >
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
                              <Text size="2" color="gray" asChild>
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
                      radius="full"
                      aria-label="More information about background color options"
                    >
                      <InfoCircledIcon style={{ display: 'block', opacity: 0.8 }} />
                    </IconButton>
                  </Popover.Trigger>
                  <Popover.Content side="top" align="center" collisionPadding={8}>
                    <Box p="4" style={{ width: 340 }}>
                      <Text size="2" color="gray" mb="3">
                        Background color
                      </Text>
                      <DescriptionList.Root>
                        <DescriptionList.Term>
                          <Code size="3">&quot;auto&quot;</Code>
                        </DescriptionList.Term>
                        <DescriptionList.Details>
                          Chosing this option will set the background to <Strong>White</Strong> in
                          light mode and <Strong>Gray 1</Strong>
                          <Text size="2" color="gray" asChild>
                            <Em> ({resolvedGrayScale} 1)</Em>
                          </Text>{' '}
                          in dark mode.
                        </DescriptionList.Details>
                        <DescriptionList.Term>
                          <Code size="3">&quot;gray&quot;</Code>
                        </DescriptionList.Term>
                        <DescriptionList.Details mb="0">
                          Chosing this option will set the background to <Strong>Gray 1</Strong>
                          <Text size="2" color="gray" asChild>
                            <Em> ({resolvedGrayScale} 1)</Em>
                          </Text>{' '}
                          for both light and dark modes.
                        </DescriptionList.Details>
                      </DescriptionList.Root>
                    </Box>
                  </Popover.Content>
                </Popover.Root>
              </Label>
            </Flex>
            <RadioGroup.Root
              value={backgroundColor}
              onValueChange={(value: ThemeBackgroundColor) => onBackgroundColorChange(value)}
            >
              <Flex direction="column" gap="1">
                {themeBackgroundColors.map((value) => (
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
                      radius="full"
                      aria-label="More information about text color options"
                    >
                      <InfoCircledIcon style={{ display: 'block', opacity: 0.8 }} />
                    </IconButton>
                  </Popover.Trigger>
                  <Popover.Content side="top" align="center" collisionPadding={8}>
                    <Box p="4" style={{ width: 320 }}>
                      <Text size="2" color="gray" mb="3">
                        Text color
                      </Text>
                      <DescriptionList.Root>
                        <DescriptionList.Term>
                          <Code size="3">&quot;auto&quot;</Code>
                        </DescriptionList.Term>
                        <DescriptionList.Details>
                          Chosing this option will set the text to <Strong>Gray 12</Strong>
                          <Text size="2" color="gray" asChild>
                            <Em> ({resolvedGrayScale} 12)</Em>
                          </Text>{' '}
                          for both light and dark modes.
                        </DescriptionList.Details>
                        <DescriptionList.Term>
                          <Code size="3">&quot;accent&quot;</Code>
                        </DescriptionList.Term>
                        <DescriptionList.Details mb="0">
                          Chosing this option will set the background to <Strong>Accent 12</Strong>
                          <Text size="2" color="gray" asChild>
                            <Em> ({accentScale} 12)</Em>
                          </Text>{' '}
                          for both light and dark modes.
                        </DescriptionList.Details>
                      </DescriptionList.Root>
                    </Box>
                  </Popover.Content>
                </Popover.Root>
              </Label>
            </Flex>
            <RadioGroup.Root
              value={textColor}
              onValueChange={(value: ThemeTextColor) => onTextColorChange(value)}
            >
              <Flex direction="column" gap="1">
                {themeTextColors.map((value) => (
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

          <Label htmlFor="darkMode">Dark mode</Label>
          <Box>
            <label htmlFor="darkMode">
              <Checkbox
                id="darkMode"
                checked={mode === 'dark'}
                onCheckedChange={(value) => onModeChange(value === true ? 'dark' : 'light')}
                mr="2"
              />
              <Text size="2" asChild>
                <span>⌘D</span>
              </Text>
            </label>
          </Box>
        </Grid>

        <Separator size="4" my="4" mx="-5" style={{ width: 'auto' }} />
        <Text size="2" weight="bold" mb="3">
          Style
        </Text>

        <Flex direction="column" gap="1" mb="3">
          <Label htmlFor="radius">ThemeRadius › {radius}</Label>
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
            value={[themeRadii.indexOf(radius)]}
            onValueChange={([value]) => onRadiusChange(themeRadii[value])}
            min={0}
            max={themeRadii.length - 1}
            step={1}
          />
        </Flex>

        <Flex direction="column" gap="1">
          <Label htmlFor="scaling">ThemeScaling</Label>
          <Select.Root
            value={scaling}
            onValueChange={(value) => onScalingChange(value as ThemeScaling)}
          >
            <Select.Trigger id="scaling" variant="surface" color="gray" highContrast />
            <Select.Content variant="soft" color="gray">
              {themeScalings.map((value) => (
                <Select.Item key={value} value={value}>
                  {value}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
      </Box>
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
