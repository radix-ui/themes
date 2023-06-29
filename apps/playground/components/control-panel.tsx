'use client';

import * as React from 'react';
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
  groupedColors,
  defaultThemeAccentScale,
  groupedGrays,
  defaultThemeGrayScale,
  getNaturallyPairedGrayScale,
  backgroundColorValues,
  defaultThemeBackgroundColor,
  textColorValues,
  defaultThemeTextColor,
  defaultThemeDarkMode,
  radiusValues,
  defaultThemeRadius,
  scalingValues,
  defaultThemeScaling,
} from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { gray as radixColorsGray, grayDark as radixColorsGrayDark } from '@radix-ui/colors';

import type {
  ColorScale,
  GrayScaleControl,
  BackgroundColorControl,
  TextColorControl,
  Radius,
  Scaling,
} from '@radix-ui/themes';

interface ControlPanelProps {
  defaultVisible?: boolean;
}
const ControlPanel: React.FC<ControlPanelProps> = ({ defaultVisible }) => {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useLayoutEffect(() => {
    setMounted(true);
    setTimeout(() => setVisible(defaultVisible ?? false), 0);
  }, [defaultVisible]);

  return mounted ? <ControlPanelImpl visible={visible} onVisibleChange={setVisible} /> : null;
};

interface ControlPanelImplProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}
const ControlPanelImpl: React.FC<ControlPanelImplProps> = ({ visible, onVisibleChange }) => {
  const resetRoot = document.querySelector('.rui-reset-root') as HTMLElement | undefined;
  const root = resetRoot ?? document.documentElement;

  const initialAccentScale = (root.dataset.accentScale as ColorScale) || defaultThemeAccentScale;
  const initialGrayScale = (root.dataset.grayScale as GrayScaleControl) || defaultThemeGrayScale;
  const initialDarkMode = root.classList.contains('dark-theme') || defaultThemeDarkMode;
  const initialBackgroundColor =
    (root.dataset.backgroundColor as BackgroundColorControl) || defaultThemeBackgroundColor;
  const initialTextColor = (root.dataset.textColor as TextColorControl) || defaultThemeTextColor;
  const initialRadius = (root.dataset.radius as Radius) || defaultThemeRadius;
  const initialScaling = (root.dataset.scaling as Scaling) || defaultThemeScaling;

  const [accentScale, setAccentScale] = React.useState(initialAccentScale);
  const [grayScale, setGrayScale] = React.useState(initialGrayScale);
  const [backgroundColor, setBackgroundColor] = React.useState(initialBackgroundColor);
  const [textColor, setTextColor] = React.useState(initialTextColor);
  const [darkMode, setDarkMode] = React.useState(initialDarkMode);
  const [radius, setRadius] = React.useState(initialRadius);
  const [scaling, setScaling] = React.useState(initialScaling);

  const pureGray9 = darkMode ? radixColorsGrayDark.gray9 : radixColorsGray.gray9;
  const naturalGray = getNaturallyPairedGrayScale(accentScale);
  const resolvedGrayScale = grayScale === 'auto' ? naturalGray : grayScale;

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
        setDarkMode(!darkMode);
      }
    }
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [darkMode, setDarkMode]);

  React.useLayoutEffect(() => {
    if (accentScale !== defaultThemeAccentScale) {
      root.dataset.accentScale = accentScale;
    } else {
      delete root.dataset.accentScale;
    }
  }, [root, accentScale]);

  React.useLayoutEffect(() => {
    if (grayScale !== defaultThemeGrayScale) {
      root.dataset.grayScale = grayScale;
    } else {
      delete root.dataset.grayScale;
    }
  }, [root, grayScale]);

  React.useLayoutEffect(() => {
    if (backgroundColor !== defaultThemeBackgroundColor) {
      root.dataset.backgroundColor = backgroundColor;
    } else {
      delete root.dataset.backgroundColor;
    }
  }, [root, backgroundColor]);

  React.useLayoutEffect(() => {
    if (textColor !== defaultThemeTextColor) {
      root.dataset.textColor = textColor;
    } else {
      delete root.dataset.textColor;
    }
  }, [root, textColor]);

  React.useLayoutEffect(() => {
    if (darkMode) {
      root.classList.remove('light-theme');
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
      if (darkMode !== defaultThemeDarkMode) root.classList.add('light-theme');
    }
  }, [root, darkMode]);

  React.useLayoutEffect(() => {
    if (radius !== defaultThemeRadius) {
      root.dataset.radius = radius;
    } else {
      delete root.dataset.radius;
    }
  }, [root, radius]);

  React.useLayoutEffect(() => {
    if (scaling !== defaultThemeScaling) {
      root.dataset.scaling = scaling;
    } else {
      delete root.dataset.scaling;
    }
  }, [root, scaling]);

  return (
    <Box
      p="5"
      position="fixed"
      top="0"
      right="0"
      mr="4"
      mt="4"
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
          onValueChange={(value) => setAccentScale(value as ColorScale)}
        >
          <Select.Trigger id="accent-scale" variant="surface" color="gray" highContrast />
          <Select.Content variant="subtle" color="gray">
            {groupedColors.map(({ label, values }, index) => (
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
          onValueChange={(value) => setGrayScale(value as GrayScaleControl)}
        >
          <Select.Trigger id="gray-scale" variant="surface" color="gray" highContrast />
          <Select.Content variant="subtle" color="gray">
            {groupedGrays.map(({ label, values }, index) => (
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
                                ? `var(--${naturalGray}-9)`
                                : gray === 'gray'
                                ? pureGray9
                                : `var(--${gray}-9)`,
                          }}
                        />
                        <Flex align="baseline" gap="1">
                          {gray}
                          {gray === 'auto' ? (
                            <Text size="2" color="gray" asChild>
                              <Em> ({naturalGray})</Em>
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
            onValueChange={(value: BackgroundColorControl) => setBackgroundColor(value)}
          >
            <Flex direction="column" gap="1">
              {backgroundColorValues.map((value) => (
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
            onValueChange={(value: TextColorControl) => setTextColor(value)}
          >
            <Flex direction="column" gap="1">
              {textColorValues.map((value) => (
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
              checked={darkMode}
              onCheckedChange={(value) => setDarkMode(value as boolean)}
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
        <Label htmlFor="radius">Radius › {radius}</Label>
        {/* <Select.Root value={radius} onValueChange={(value) => setRadius(value as Radius)}>
          <Select.Trigger id="radius" variant="surface" color="gray" highContrast />
          <Select.Content variant="subtle" color="gray">
            {radiusValues.map((value) => (
              <Select.Item key={value} value={value}>
                {value}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root> */}
        <Slider
          id="radius"
          value={[radiusValues.indexOf(radius)]}
          onValueChange={([value]) => setRadius(radiusValues[value])}
          min={0}
          max={radiusValues.length - 1}
          step={1}
        />
      </Flex>

      <Flex direction="column" gap="1">
        <Label htmlFor="scaling">Scaling</Label>
        <Select.Root value={scaling} onValueChange={(value) => setScaling(value as Scaling)}>
          <Select.Trigger id="scaling" variant="surface" color="gray" highContrast />
          <Select.Content variant="subtle" color="gray">
            {scalingValues.map((value) => (
              <Select.Item key={value} value={value}>
                {value}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    </Box>
  );
};

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

export { ControlPanel };
