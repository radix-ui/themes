'use client';

import * as React from 'react';
import { Link2Icon, LinkBreak2Icon } from '@radix-ui/react-icons';
import {
  Box,
  Checkbox,
  Flex,
  Grid,
  IconButton,
  RadioGroup,
  Select,
  Separator,
  Text,
  // helpers
  groupedColors,
  colorFeelValues,
  grayScaleValues,
  radiusValues,
  scalingValues,
} from '@radix-ui/themes';

import type { ColorScale, Radius, ColorFeel, GrayScale, Scaling } from '@radix-ui/themes';

const DEFAULT_ACCENT_SCALE: ColorScale = 'indigo';
const DEFAULT_GRAY_SCALE: GrayScale = 'natural';
const DEFAULT_BACKGROUND_FEEL: ColorFeel = 'natural';
const DEFAULT_FOREGROUND_FEEL: ColorFeel = 'natural';
const DEFAULT_DARK_MODE: boolean = false;
const DEFAULT_RADIUS: Radius = 'medium';
const DEFAULT_SCALING: Scaling = 'regular';

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
  const defaultGrayScale = (root.dataset.grayScale as GrayScale) || DEFAULT_GRAY_SCALE;
  const defaultDarkMode = root.classList.contains('dark-theme') || DEFAULT_DARK_MODE;
  const defaultBackgroundFeel =
    (root.dataset.backgroundFeel as ColorFeel) || DEFAULT_BACKGROUND_FEEL;
  const defaultForegroundFeel =
    (root.dataset.foregroundFeel as ColorFeel) || DEFAULT_FOREGROUND_FEEL;
  const defaultRadius = (root.dataset.radius as Radius) || DEFAULT_RADIUS;
  const defaultScaling = (root.dataset.scaling as Scaling) || DEFAULT_SCALING;

  const [accentScale, setAccentScale] = React.useState(defaultAccentScale);
  const [grayScale, setGrayScale] = React.useState(defaultGrayScale);
  const [backgroundFeel, setBackgroundFeel] = React.useState(defaultBackgroundFeel);
  const [foregroundFeel, setForegroundFeel] = React.useState(defaultForegroundFeel);
  const [darkMode, setDarkMode] = React.useState(defaultDarkMode);
  const [radius, setRadius] = React.useState(defaultRadius);
  const [scaling, setScaling] = React.useState(defaultScaling);

  const [feelLocked, setFeelLocked] = React.useState(backgroundFeel === foregroundFeel);

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
    if (backgroundFeel !== DEFAULT_BACKGROUND_FEEL) {
      root.dataset.backgroundFeel = backgroundFeel;
    } else {
      delete root.dataset.backgroundFeel;
    }
  }, [root, backgroundFeel]);

  React.useLayoutEffect(() => {
    if (foregroundFeel !== DEFAULT_FOREGROUND_FEEL) {
      root.dataset.foregroundFeel = foregroundFeel;
    } else {
      delete root.dataset.foregroundFeel;
    }
  }, [root, foregroundFeel]);

  React.useLayoutEffect(() => {
    if (grayScale !== DEFAULT_GRAY_SCALE) {
      root.dataset.grayScale = grayScale;
    } else {
      delete root.dataset.grayScale;
    }
  }, [root, grayScale]);

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
        boxShadow: '0 0 0 0.5px var(--mono-a6), var(--shadow-3)',
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
          {groupedColors.map(({ label, colors }, index) => (
            <React.Fragment key={label}>
              {index > 0 ? <Select.Separator /> : null}
              <Select.Group>
                <Select.Label>{label}</Select.Label>
                {colors.map((color) => (
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

      <Grid columns="3" gapX="0" gapY="3" mb="3">
        <Flex direction="column" gap="1">
          <Label>Gray scale</Label>
          <RadioGroup.Root
            value={grayScale}
            onValueChange={(value) => setGrayScale(value as GrayScale)}
          >
            <Flex direction="column" gap="1">
              {grayScaleValues.map((scale) => (
                <Text key={scale} size="2" asChild>
                  <label>
                    <RadioGroup.Item value={scale} mr="2" />
                    {upperFirst(scale)}
                  </label>
                </Text>
              ))}
            </Flex>
          </RadioGroup.Root>
        </Flex>

        <div />

        <Flex direction="column" gap="1">
          <Label htmlFor="darkMode">Dark mode</Label>
          <Box>
            <Checkbox
              id="darkMode"
              checked={darkMode}
              onCheckedChange={(value) => setDarkMode(value as boolean)}
              mr="2"
            />
            <Text size="2" asChild>
              <label htmlFor="darkMode">⌘D</label>
            </Text>
          </Box>
        </Flex>

        <Flex direction="column" gap="1">
          <Label>Background</Label>
          <RadioGroup.Root
            value={backgroundFeel}
            onValueChange={(feel: ColorFeel) => {
              setBackgroundFeel(feel);
              if (feelLocked) {
                setForegroundFeel(feel);
              }
            }}
          >
            <Flex direction="column" gap="1">
              {colorFeelValues.map((feel) => (
                <Text key={feel} size="2" asChild>
                  <label>
                    <RadioGroup.Item value={feel} mr="2" />
                    {upperFirst(feel)}
                  </label>
                </Text>
              ))}
            </Flex>
          </RadioGroup.Root>
        </Flex>

        <Flex
          justify="center"
          align="center"
          style={{ alignSelf: 'start', position: 'relative', top: -3 }}
        >
          <Separator color="color" decorative />
          <IconButton
            type="button"
            size="1"
            variant="outline"
            onClick={() => {
              setFeelLocked((prev) => !prev);
              if (backgroundFeel !== foregroundFeel) {
                setForegroundFeel(backgroundFeel);
              }
            }}
          >
            {feelLocked ? <Link2Icon /> : <LinkBreak2Icon />}
          </IconButton>
          <Separator color="color" decorative />
        </Flex>

        <Flex direction="column" gap="1">
          <Label>Foreground</Label>
          <RadioGroup.Root
            value={foregroundFeel}
            onValueChange={(feel: ColorFeel) => {
              setForegroundFeel(feel);
              if (feelLocked) {
                setBackgroundFeel(feel);
              }
            }}
          >
            <Flex direction="column" gap="1">
              {colorFeelValues.map((feel) => (
                <Text key={feel} size="2" asChild>
                  <label>
                    <RadioGroup.Item value={feel} mr="2" />
                    {upperFirst(feel)}
                  </label>
                </Text>
              ))}
            </Flex>
          </RadioGroup.Root>
        </Flex>
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
          style={{ minWidth: 120 }}
        >
          {radiusValues.map((value) => (
            <Select.Item key={value} value={value}>
              {upperFirst(value)}
            </Select.Item>
          ))}
        </Select.Root>
      </Flex>

      <Flex direction="column" gap="1">
        <Label htmlFor="scaling">Size</Label>
        <Select.Root
          id="scaling"
          value={scaling}
          onValueChange={(value) => setScaling(value as Scaling)}
          menuVariant="subtle-mono"
          style={{ minWidth: 120 }}
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

export { ControlPanel };
