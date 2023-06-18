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
  buttonRadiusValues,
  scalingValues,
} from '@radix-ui/themes';

import type { ColorScale, ButtonRadius, ColorFeel, GrayScale, Scaling } from '@radix-ui/themes';

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
  const doc = document.documentElement;

  const defaultColorScale = doc.dataset.colorScale as ColorScale;
  const defaultGrayScale = doc.dataset.grayScale as GrayScale;
  const defaultDarkMode = doc.classList.contains('dark-theme');
  const defaultBackgroundFeel = doc.dataset.backgroundFeel as ColorFeel;
  const defaultForegroundFeel = doc.dataset.foregroundFeel as ColorFeel;
  const defaultButtonRadius = doc.dataset.buttonRadius as ButtonRadius;
  const defaultScaling = doc.dataset.scaling as Scaling;

  const [colorScale, setColorScale] = React.useState<ColorScale>(defaultColorScale);
  const [grayScale, setGrayScale] = React.useState<GrayScale>(defaultGrayScale);
  const [backgroundFeel, setBackgroundFeel] = React.useState<ColorFeel>(defaultBackgroundFeel);
  const [foregroundFeel, setForegroundFeel] = React.useState<ColorFeel>(defaultForegroundFeel);
  const [darkMode, setDarkMode] = React.useState(defaultDarkMode);
  const [buttonRadius, setButtonRadius] = React.useState<ButtonRadius>(defaultButtonRadius);
  const [scaling, setScaling] = React.useState<Scaling>(defaultScaling);

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
    if (colorScale) document.documentElement.dataset.colorScale = colorScale;
  }, [colorScale]);

  React.useLayoutEffect(() => {
    if (backgroundFeel) document.documentElement.dataset.backgroundFeel = backgroundFeel;
  }, [backgroundFeel]);

  React.useLayoutEffect(() => {
    if (foregroundFeel) document.documentElement.dataset.foregroundFeel = foregroundFeel;
  }, [foregroundFeel]);

  React.useLayoutEffect(() => {
    if (grayScale) document.documentElement.dataset.grayScale = grayScale;
  }, [grayScale]);

  React.useLayoutEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add('light-theme');
    }
  }, [darkMode]);

  React.useLayoutEffect(() => {
    if (buttonRadius) document.documentElement.dataset.buttonRadius = buttonRadius;
  }, [buttonRadius]);

  React.useLayoutEffect(() => {
    if (scaling) document.documentElement.dataset.scaling = scaling;
  }, [scaling]);

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
        borderRadius: 'var(--brs-4)',
        backgroundColor: 'var(--panel)',
        boxShadow: '0 0 0 0.5px var(--monoA6), var(--shadow-3)',
        transformOrigin: 'top right',
        transitionProperty: 'opacity, transform',
        transitionDuration: visible ? '350ms, 800ms' : '200ms, 350ms',
        transitionTimingFunction: visible ? 'linear, cubic-bezier(0.16, 1, 0.3, 1)' : 'ease-out',
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        opacity: visible ? 1 : 0,
      }}
    >
      <Box m="-5" mb="0" p="5" style={{ backgroundColor: 'var(--blackA2)' }}>
        <Text size="4" trim="both">
          Customize{' '}
          <Text size="1" color="gray" asChild>
            <span>(⌘C)</span>
          </Text>
        </Text>
      </Box>

      <Separator color="gray" size="4" mb="4" mx="-5" style={{ width: 'auto' }} />
      <Text size="2" weight="bold" mb="3">
        Color
      </Text>

      <Flex direction="column" gap="1" mb="3">
        <Label htmlFor="color">Color scale</Label>
        <Select.Root
          id="color"
          value={colorScale}
          onValueChange={(value) => setColorScale(value as ColorScale)}
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
                        data-color-scale={color}
                        style={{
                          display: 'inline-block',
                          width: 'var(--space-2)',
                          height: 'var(--space-2)',
                          borderRadius: '100%',
                          backgroundColor: 'var(--color9)',
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

      <Separator color="gray" size="4" my="4" mx="-5" style={{ width: 'auto' }} />
      <Text size="2" weight="bold" mb="3">
        Style
      </Text>

      <Flex direction="column" gap="1" mb="3">
        <Label htmlFor="button-radius">Radius</Label>
        <Select.Root
          id="button-radius"
          value={buttonRadius}
          onValueChange={(value) => setButtonRadius(value as ButtonRadius)}
          menuVariant="subtle-mono"
          style={{ minWidth: 120 }}
        >
          {buttonRadiusValues.map((value) => (
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
