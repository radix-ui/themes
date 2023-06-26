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
  Strong,
  Text,
  // helpers
  groupedColorScales,
  groupedGrayScales,
  getNaturallyPairedGrayScale,
  backgroundColorValues,
  textColorValues,
  radiusValues,
  scalingValues,
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

const DEFAULT_ACCENT_SCALE: ColorScale = 'indigo';
const DEFAULT_GRAY_SCALE: GrayScaleControl = 'auto';
const DEFAULT_BACKGROUND_COLOR: BackgroundColorControl = 'auto';
const DEFAULT_TEXT_COLOR: TextColorControl = 'auto';
const DEFAULT_DARK_MODE: boolean = false;
const DEFAULT_RADIUS: Radius = 'medium';
const DEFAULT_SCALING: Scaling = '100%';

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
  const root = document.documentElement;

  const defaultAccentScale = (root.dataset.accentScale as ColorScale) || DEFAULT_ACCENT_SCALE;
  const defaultGrayScale = (root.dataset.grayScale as GrayScaleControl) || DEFAULT_GRAY_SCALE;
  const defaultDarkMode = root.classList.contains('dark-theme') || DEFAULT_DARK_MODE;
  const defaultBackgroundColor =
    (root.dataset.backgroundColor as BackgroundColorControl) || DEFAULT_BACKGROUND_COLOR;
  const defaultTextColor = (root.dataset.textColor as TextColorControl) || DEFAULT_TEXT_COLOR;
  const defaultRadius = (root.dataset.radius as Radius) || DEFAULT_RADIUS;
  const defaultScaling = (root.dataset.scaling as Scaling) || DEFAULT_SCALING;

  const [accentScale, setAccentScale] = React.useState(defaultAccentScale);
  const [grayScale, setGrayScale] = React.useState(defaultGrayScale);
  const [backgroundColor, setBackgroundColor] = React.useState(defaultBackgroundColor);
  const [textColor, setTextColor] = React.useState(defaultTextColor);
  const [darkMode, setDarkMode] = React.useState(defaultDarkMode);
  const [radius, setRadius] = React.useState(defaultRadius);
  const [scaling, setScaling] = React.useState(defaultScaling);

  const pureGray9 = darkMode ? radixColorsGrayDark.gray9 : radixColorsGray.gray9;
  const naturalGray = getNaturallyPairedGrayScale(accentScale);
  const resolvedGrayScale = grayScale === 'auto' ? naturalGray : grayScale;

  // const [feelLocked, setFeelLocked] = React.useState(backgroundColor === textColor);

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
    if (accentScale !== DEFAULT_ACCENT_SCALE) {
      root.dataset.accentScale = accentScale;
    } else {
      delete root.dataset.accentScale;
    }
  }, [root, accentScale]);

  React.useLayoutEffect(() => {
    if (grayScale !== DEFAULT_GRAY_SCALE) {
      root.dataset.grayScale = grayScale;
    } else {
      delete root.dataset.grayScale;
    }
  }, [root, grayScale]);

  React.useLayoutEffect(() => {
    if (backgroundColor !== DEFAULT_BACKGROUND_COLOR) {
      root.dataset.backgroundColor = backgroundColor;
    } else {
      delete root.dataset.backgroundColor;
    }
  }, [root, backgroundColor]);

  React.useLayoutEffect(() => {
    if (textColor !== DEFAULT_TEXT_COLOR) {
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
      if (darkMode !== DEFAULT_DARK_MODE) root.classList.add('light-theme');
    }
  }, [root, darkMode]);

  React.useLayoutEffect(() => {
    if (radius !== DEFAULT_RADIUS) {
      root.dataset.radius = radius;
    } else {
      delete root.dataset.radius;
    }
  }, [root, radius]);

  React.useLayoutEffect(() => {
    if (scaling !== DEFAULT_SCALING) {
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
          id="accent-scale"
          value={accentScale}
          onValueChange={(value) => setAccentScale(value as ColorScale)}
          menuVariant="subtle-mono"
          style={{ minWidth: 120 }}
        >
          {groupedColorScales.map(({ label, scales }, index) => (
            <React.Fragment key={label}>
              {index > 0 ? <Select.Separator /> : null}
              <Select.Group>
                <Select.Label>{label}</Select.Label>
                {scales.map((color) => (
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
                      {upperFirst(color)}
                    </Flex>
                  </Select.Item>
                ))}
              </Select.Group>
            </React.Fragment>
          ))}
        </Select.Root>
      </Flex>

      <Flex direction="column" gap="1" mb="3">
        <Label htmlFor="gray-scale">Gray scale</Label>
        <Select.Root
          id="gray-scale"
          value={grayScale}
          onValueChange={(value) => setGrayScale(value as GrayScaleControl)}
          menuVariant="subtle-mono"
          style={{ minWidth: 120 }}
        >
          {groupedGrayScales.map(({ label, scales }, index) => (
            <React.Fragment key={label}>
              {index > 0 ? <Select.Separator /> : null}
              <Select.Group>
                <Select.Label>{label}</Select.Label>
                {scales.map((gray) => (
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
                        {upperFirst(gray)}
                        {gray === 'auto' ? (
                          <Text size="2" color="gray" asChild>
                            <Em> ({upperFirst(naturalGray)})</Em>
                          </Text>
                        ) : null}
                      </Flex>
                    </Flex>
                  </Select.Item>
                ))}
              </Select.Group>
            </React.Fragment>
          ))}
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
                    variant="ghost-mono"
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
                          <Em> ({upperFirst(resolvedGrayScale)} 1)</Em>
                        </Text>{' '}
                        in dark mode.
                      </DescriptionList.Details>
                      <DescriptionList.Term>
                        <Code size="3">&quot;gray&quot;</Code>
                      </DescriptionList.Term>
                      <DescriptionList.Details mb="0">
                        Chosing this option will set the background to <Strong>Gray 1</Strong>
                        <Text size="2" color="gray" asChild>
                          <Em> ({upperFirst(resolvedGrayScale)} 1)</Em>
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
                    {upperFirst(value)}
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
                    variant="ghost-mono"
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
                          <Em> ({upperFirst(resolvedGrayScale)} 12)</Em>
                        </Text>{' '}
                        for both light and dark modes.
                      </DescriptionList.Details>
                      <DescriptionList.Term>
                        <Code size="3">&quot;accent&quot;</Code>
                      </DescriptionList.Term>
                      <DescriptionList.Details mb="0">
                        Chosing this option will set the background to <Strong>Accent 12</Strong>
                        <Text size="2" color="gray" asChild>
                          <Em> ({upperFirst(accentScale)} 12)</Em>
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
                    {upperFirst(value)}
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
        <Label htmlFor="radius">Radius</Label>
        <Select.Root
          id="radius"
          value={radius}
          onValueChange={(value) => setRadius(value as Radius)}
          menuVariant="subtle-mono"
        >
          {radiusValues.map((value) => (
            <Select.Item key={value} value={value}>
              {upperFirst(value)}
            </Select.Item>
          ))}
        </Select.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Label htmlFor="scaling">Scaling</Label>
        <Select.Root
          id="scaling"
          value={scaling}
          onValueChange={(value) => setScaling(value as Scaling)}
          menuVariant="subtle-mono"
        >
          {scalingValues.map((value) => (
            <Select.Item key={value} value={value}>
              {upperFirst(value)}
            </Select.Item>
          ))}
        </Select.Root>
      </Flex>
    </Box>
  );
};

function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
