'use client';

import * as React from 'react';
import { useCallbackRef } from 'radix-ui/internal';

import {
  AccessibleIcon,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Kbd,
  Popover,
  ScrollArea,
  Text,
  Tooltip,
} from '../index.js';
import { Theme, useThemeContext } from './theme.js';
import { inert } from '../helpers/inert.js';
import { getMatchingGrayColor } from '../helpers/get-matching-gray-color.js';
import { themePropDefs } from './theme.props.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

interface ThemePanelProps extends Omit<ThemePanelImplProps, keyof ThemePanelImplPrivateProps> {
  defaultOpen?: boolean;
}
const ThemePanel = React.forwardRef<ThemePanelImplElement, ThemePanelProps>(
  ({ defaultOpen = true, ...props }, forwardedRef) => {
    const [open, setOpen] = React.useState(defaultOpen);
    return <ThemePanelImpl {...props} ref={forwardedRef} open={open} onOpenChange={setOpen} />;
  }
);
ThemePanel.displayName = 'ThemePanel';

type ThemePanelImplElement = React.ElementRef<'div'>;
interface ThemePanelImplPrivateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
interface ThemePanelImplProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    ThemePanelImplPrivateProps {
  onAppearanceChange?: (value: 'light' | 'dark') => void;
}
const ThemePanelImpl = React.forwardRef<ThemePanelImplElement, ThemePanelImplProps>(
  (props, forwardedRef) => {
    const { open, onOpenChange, onAppearanceChange: onAppearanceChangeProp, ...panelProps } = props;
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

    const hasOnAppearanceChangeProp = onAppearanceChangeProp !== undefined;
    const handleAppearanceChangeProp = useCallbackRef(onAppearanceChangeProp);
    const handleAppearanceChange = React.useCallback(
      (value: 'light' | 'dark') => {
        const cleanup = disableAnimation();

        if (appearance !== 'inherit') {
          onAppearanceChange(value);
          return;
        }

        if (hasOnAppearanceChangeProp) {
          handleAppearanceChangeProp(value);
        } else {
          setResolvedAppearance(value);
          updateRootAppearanceClass(value);
        }

        cleanup();
      },
      [appearance, onAppearanceChange, hasOnAppearanceChangeProp, handleAppearanceChangeProp]
    );

    const autoMatchedGray = getMatchingGrayColor(accentColor);
    const resolvedGrayColor = grayColor === 'auto' ? autoMatchedGray : grayColor;

    const [copyState, setCopyState] = React.useState<'idle' | 'copying' | 'copied'>('idle');
    async function handleCopyThemeConfig() {
      const theme = {
        appearance: appearance === themePropDefs.appearance.default ? undefined : appearance,
        accentColor: accentColor === themePropDefs.accentColor.default ? undefined : accentColor,
        grayColor: grayColor === themePropDefs.grayColor.default ? undefined : grayColor,
        panelBackground:
          panelBackground === themePropDefs.panelBackground.default ? undefined : panelBackground,
        radius: radius === themePropDefs.radius.default ? undefined : radius,
        scaling: scaling === themePropDefs.scaling.default ? undefined : scaling,
      } satisfies GetPropDefTypes<typeof themePropDefs>;

      const props = Object.keys(theme)
        .filter((key) => theme[key as keyof typeof theme] !== undefined)
        .map((key) => `${key}="${theme[key as keyof typeof theme]}"`)
        .join(' ');

      const textToCopy = props ? `<Theme ${props}>` : '<Theme>';

      setCopyState('copying');
      await navigator.clipboard.writeText(textToCopy);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    }

    const [resolvedAppearance, setResolvedAppearance] = React.useState<'light' | 'dark' | null>(
      appearance === 'inherit' ? null : appearance
    );

    const keyboardInputElement = `
      [contenteditable],
      [role="combobox"],
      [role="listbox"],
      [role="menu"],
      input:not([type="radio"], [type="checkbox"]),
      select,
      textarea
    `;

    // quickly show/hide using "T" keypress
    React.useEffect(() => {
      function handleKeydown(event: KeyboardEvent) {
        const isModifierActive = event.altKey || event.ctrlKey || event.shiftKey || event.metaKey;
        const isKeyboardInputActive = document.activeElement?.closest(keyboardInputElement);
        const isKeyT = event.key?.toUpperCase() === 'T' && !isModifierActive;
        if (isKeyT && !isKeyboardInputActive) {
          onOpenChange(!open);
        }
      }
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    }, [onOpenChange, open, keyboardInputElement]);

    // quickly toggle appearance using "D" keypress
    React.useEffect(() => {
      function handleKeydown(event: KeyboardEvent) {
        const isModifierActive = event.altKey || event.ctrlKey || event.shiftKey || event.metaKey;
        const isKeyboardInputActive = document.activeElement?.closest(keyboardInputElement);
        const isKeyD = event.key?.toUpperCase() === 'D' && !isModifierActive;
        if (isKeyD && !isKeyboardInputActive) {
          handleAppearanceChange(resolvedAppearance === 'light' ? 'dark' : 'light');
        }
      }
      document.addEventListener('keydown', handleKeydown);
      return () => document.removeEventListener('keydown', handleKeydown);
    }, [handleAppearanceChange, resolvedAppearance, keyboardInputElement]);

    React.useEffect(() => {
      const root = document.documentElement;
      const body = document.body;

      function update() {
        const hasDarkClass =
          root.classList.contains('dark') ||
          root.classList.contains('dark-theme') ||
          body.classList.contains('dark') ||
          body.classList.contains('dark-theme');

        if (appearance === 'inherit') {
          setResolvedAppearance(hasDarkClass ? 'dark' : 'light');
        } else {
          setResolvedAppearance(appearance);
        }
      }

      const classNameObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName === 'class') {
            update();
          }
        });
      });

      update();

      // Observe <html> and <body> for `class` changes only when the appearance is inherited from them
      if (appearance === 'inherit') {
        classNameObserver.observe(root, { attributes: true });
        classNameObserver.observe(body, { attributes: true });
      }

      return () => classNameObserver.disconnect();
    }, [appearance]);

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
          inert={open ? undefined : inert}
          {...panelProps}
          ref={forwardedRef}
          style={{
            zIndex: 9999,
            overflow: 'hidden',
            maxHeight: 'calc(100vh - var(--space-4) - var(--space-4))',
            borderRadius: 'var(--radius-4)',
            backgroundColor: 'var(--color-panel-solid)',
            transformOrigin: 'top center',
            transitionProperty: 'transform, box-shadow',
            transitionDuration: '200ms',
            transitionTimingFunction: open ? 'ease-out' : 'ease-in',
            transform: open ? 'none' : 'translateX(105%)',
            boxShadow: open ? 'var(--shadow-5)' : 'var(--shadow-2)',
            ...props.style,
          }}
        >
          <ScrollArea>
            <Box flexGrow="1" p="5" position="relative">
              <Box position="absolute" top="0" right="0" m="2">
                <Tooltip
                  content="Press T to show/hide the Theme Panel"
                  side="bottom"
                  sideOffset={6}
                >
                  <Kbd asChild size="3" tabIndex={0} className="rt-ThemePanelShortcut">
                    <button onClick={() => onOpenChange(!open)}>T</button>
                  </Kbd>
                </Tooltip>
              </Box>

              <Heading size="5" trim="both" as="h3" mb="5">
                Theme
              </Heading>

              <Text id="accent-color-title" as="p" size="2" weight="medium" mt="5">
                Accent color
              </Text>

              <Grid columns="10" gap="2" mt="3" role="group" aria-labelledby="accent-color-title">
                {themePropDefs.accentColor.values.map((color) => (
                  <label
                    key={color}
                    className="rt-ThemePanelSwatch"
                    style={{ backgroundColor: `var(--${color}-9)` }}
                  >
                    <Tooltip
                      content={`${upperFirst(color)}${
                        accentColor === 'gray' && resolvedGrayColor !== 'gray'
                          ? ` (${upperFirst(resolvedGrayColor)})`
                          : ''
                      }`}
                    >
                      <input
                        className="rt-ThemePanelSwatchInput"
                        type="radio"
                        name="accentColor"
                        value={color}
                        checked={accentColor === color}
                        onChange={(event) =>
                          onAccentColorChange(event.target.value as typeof accentColor)
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
                {themePropDefs.grayColor.values.map((gray) => (
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
                        content={`${upperFirst(gray)}${
                          gray === 'auto' ? ` (${upperFirst(autoMatchedGray)})` : ''
                        }`}
                      >
                        <input
                          className="rt-ThemePanelSwatchInput"
                          type="radio"
                          name="grayColor"
                          value={gray}
                          checked={grayColor === gray}
                          onChange={(event) =>
                            onGrayColorChange(event.target.value as typeof grayColor)
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
                      className="rt-ThemePanelRadioCardInput"
                      type="radio"
                      name="appearance"
                      value={value}
                      checked={resolvedAppearance === value}
                      onChange={(event) =>
                        handleAppearanceChange(event.target.value as 'light' | 'dark')
                      }
                    />
                    <Flex align="center" justify="center" height="32px" gap="2">
                      {value === 'light' ? (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ margin: '0 -1px' }}
                        >
                          <path
                            d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ margin: '0 -1px' }}
                        >
                          <path
                            d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
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
                  <Flex key={value} direction="column" align="center">
                    <label className="rt-ThemePanelRadioCard">
                      <input
                        className="rt-ThemePanelRadioCardInput"
                        type="radio"
                        name="radius"
                        id={`theme-panel-radius-${value}`}
                        value={value}
                        checked={radius === value}
                        onChange={(event) => onRadiusChange(event.target.value as typeof radius)}
                      />
                      <Theme asChild radius={value}>
                        <Box
                          m="3"
                          width="32px"
                          height="32px"
                          style={{
                            borderTopLeftRadius: value === 'full' ? '80%' : 'var(--radius-5)',
                            backgroundImage:
                              'linear-gradient(to bottom right, var(--accent-3), var(--accent-4))',
                            borderTop: '2px solid var(--accent-a8)',
                            borderLeft: '2px solid var(--accent-a8)',
                          }}
                        />
                      </Theme>
                    </label>
                    <Box asChild pt="2">
                      <Text asChild size="1" color="gray">
                        <label htmlFor={`theme-panel-radius-${value}`}>{upperFirst(value)}</label>
                      </Text>
                    </Box>
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
                      className="rt-ThemePanelRadioCardInput"
                      type="radio"
                      name="scaling"
                      value={value}
                      checked={scaling === value}
                      onChange={(event) => onScalingChange(event.target.value as typeof scaling)}
                    />

                    <Flex align="center" justify="center" height="32px">
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

              <Flex mt="5" align="center" gap="2">
                <Text id="panel-background-title" as="p" size="2" weight="medium">
                  Panel background
                </Text>

                <Popover.Root>
                  <Popover.Trigger>
                    <IconButton size="1" variant="ghost" color="gray">
                      <AccessibleIcon label="Learn more about panel background options">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          />
                        </svg>
                      </AccessibleIcon>
                    </IconButton>
                  </Popover.Trigger>

                  <Popover.Content size="1" style={{ maxWidth: 220 }} side="top" align="center">
                    <Text as="p" size="2">
                      Whether Card and Table panels are translucent, showing some of the background
                      behind them.
                    </Text>
                  </Popover.Content>
                </Popover.Root>
              </Flex>

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
                      className="rt-ThemePanelRadioCardInput"
                      type="radio"
                      name="panelBackground"
                      value={value}
                      checked={panelBackground === value}
                      onChange={(event) =>
                        onPanelBackgroundChange(event.target.value as typeof panelBackground)
                      }
                    />
                    <Flex align="center" justify="center" height="32px" gap="2">
                      {value === 'solid' ? (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ margin: '0 -2px' }}
                        >
                          <path
                            d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ margin: '0 -2px' }}
                        >
                          <path
                            opacity=".05"
                            d="M6.78296 13.376C8.73904 9.95284 8.73904 5.04719 6.78296 1.62405L7.21708 1.37598C9.261 4.95283 9.261 10.0472 7.21708 13.624L6.78296 13.376Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                          <path
                            opacity=".1"
                            d="M7.28204 13.4775C9.23929 9.99523 9.23929 5.00475 7.28204 1.52248L7.71791 1.2775C9.76067 4.9119 9.76067 10.0881 7.71791 13.7225L7.28204 13.4775Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                          <path
                            opacity=".15"
                            d="M7.82098 13.5064C9.72502 9.99523 9.72636 5.01411 7.82492 1.50084L8.26465 1.26285C10.2465 4.92466 10.2451 10.085 8.26052 13.7448L7.82098 13.5064Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                          <path
                            opacity=".2"
                            d="M8.41284 13.429C10.1952 9.92842 10.1957 5.07537 8.41435 1.57402L8.85999 1.34729C10.7139 4.99113 10.7133 10.0128 8.85841 13.6559L8.41284 13.429Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                          <path
                            opacity=".25"
                            d="M9.02441 13.2956C10.6567 9.8379 10.6586 5.17715 9.03005 1.71656L9.48245 1.50366C11.1745 5.09919 11.1726 9.91629 9.47657 13.5091L9.02441 13.2956Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                          <path
                            opacity=".3"
                            d="M9.66809 13.0655C11.1097 9.69572 11.1107 5.3121 9.67088 1.94095L10.1307 1.74457C11.6241 5.24121 11.6231 9.76683 10.1278 13.2622L9.66809 13.0655Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                          <path
                            opacity=".35"
                            d="M10.331 12.7456C11.5551 9.52073 11.5564 5.49103 10.3347 2.26444L10.8024 2.0874C12.0672 5.42815 12.0659 9.58394 10.7985 12.9231L10.331 12.7456Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                          <path
                            opacity=".4"
                            d="M11.0155 12.2986C11.9938 9.29744 11.9948 5.71296 11.0184 2.71067L11.4939 2.55603C12.503 5.6589 12.502 9.35178 11.4909 12.4535L11.0155 12.2986Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                          <path
                            opacity=".45"
                            d="M11.7214 11.668C12.4254 9.01303 12.4262 5.99691 11.7237 3.34116L12.2071 3.21329C12.9318 5.95292 12.931 9.05728 12.2047 11.7961L11.7214 11.668Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                          <path
                            opacity=".5"
                            d="M12.4432 10.752C12.8524 8.63762 12.8523 6.36089 12.4429 4.2466L12.9338 4.15155C13.3553 6.32861 13.3554 8.66985 12.9341 10.847L12.4432 10.752Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                          <path
                            d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                      <Text size="1" weight="medium">
                        {upperFirst(value)}
                      </Text>
                    </Flex>
                  </label>
                ))}
              </Grid>

              <Button mt="5" style={{ width: '100%' }} onClick={handleCopyThemeConfig}>
                {copyState === 'copied' ? 'Copied' : 'Copy Theme'}
              </Button>
            </Box>
          </ScrollArea>
        </Flex>
      </Theme>
    );
  }
);
ThemePanelImpl.displayName = 'ThemePanelImpl';

// https://github.com/pacocoursey/next-themes/blob/main/packages/next-themes/src/index.tsx#L285
function disableAnimation() {
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
}

function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateRootAppearanceClass(appearance: 'light' | 'dark') {
  const root = document.documentElement;
  const hasLightTheme = root.classList.contains('light-theme');
  const hasDarkTheme = root.classList.contains('dark-theme');
  const hasLight = root.classList.contains('light');
  const hasDark = root.classList.contains('dark');

  if (hasLightTheme || hasDarkTheme) {
    root.classList.remove('light-theme', 'dark-theme');
    root.style.colorScheme = appearance;
    root.classList.add(`${appearance}-theme`);
  }

  if (hasLight || hasDark) {
    root.classList.remove('light', 'dark');
    root.style.colorScheme = appearance;
    root.classList.add(appearance);
  }

  if (!hasLightTheme && !hasDarkTheme && !hasLight && !hasDark) {
    root.style.colorScheme = appearance;
    root.classList.add(appearance);
  }
}

export { ThemePanel };
export type { ThemePanelProps };
