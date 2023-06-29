'use client';

import * as React from 'react';
import {
  ThemeConfig,
  Provider,
  Avatar,
  avatarVariants,
  Box,
  Button,
  buttonVariants,
  Checkbox,
  checkboxVariants,
  Container,
  dropdownMenuVariants,
  Flex,
  Grid,
  Heading,
  IconButton,
  Link,
  RadioGroup,
  selectContentVariants,
  sliderVariants,
  Switch,
  switchVariants,
  TextArea,
  textAreaVariants,
  Text,
  VisuallyHidden,
  // helpers:
  allColorScales,
  backgroundColorValues,
  textColorValues,
  radiusValues,
} from '@radix-ui/themes';
import {
  ReloadIcon,
  Share2Icon,
  StarIcon,
  Cross1Icon,
  HeartFilledIcon,
  SunIcon,
  MoonIcon,
  DesktopIcon,
  CheckIcon,
  ChevronDownIcon,
  UpdateIcon,
  ModulzLogoIcon,
  TwitterLogoIcon,
  GitHubLogoIcon,
  BookmarkIcon,
} from '@radix-ui/react-icons';
import { Arrow } from '@radix-ui/react-arrow';
import { ControlPanel } from '../../components/control-panel';
import { peopleByColorScale } from './people';
import styles from './page.module.css';

import type {
  AvatarVariant,
  ButtonVariant,
  CheckboxVariant,
  DropdownMenuVariant,
  SelectContentVariant,
  SliderVariant,
  SwitchVariant,
  TextAreaVariant,
  ColorScale,
  SelectTriggerVariant,
} from '@radix-ui/themes';

const THEME_SWITCH_INTERVAL = 5000;
const AVATARS_LIST_WIDTH = 350;
const FEEDBACK_DIALOG_WIDTH = 300;
const FILTERS_PANEL_WIDTH = 450;

export default function Showcase() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [color, setColor] = React.useState<ColorScale>('indigo');
  const [primaryVariant, setPrimaryVariant] = React.useState<ButtonVariant>('solid');
  const [secondaryVariant, setSecondaryVariant] = React.useState<ButtonVariant>('subtle');
  const [avatarVariant, setAvatarVariant] = React.useState<AvatarVariant>('subtle');
  const [avatarNameColor, setAvatarNameColor] = React.useState<ColorScale | undefined>(undefined);
  const [feedbackTitleColor, setFeedbackTitleColor] = React.useState<ColorScale | undefined>(
    undefined
  );
  const [feedbackVariant, setFeedbackVariant] = React.useState<TextAreaVariant>('surface');
  const [likeCount, setLikeCount] = React.useState(17);
  const [likeButtonVariant, setLikeButtonVariant] = React.useState<ButtonVariant>('subtle');
  const [themeSelectTriggerVariant, setThemeSelectTriggerVariant] =
    React.useState<SelectTriggerVariant>('subtle');
  const [themeSelectContentVariant, setThemeSelectContentVariant] =
    React.useState<SelectContentVariant>('solid');
  const [sliderValue, setSliderValue] = React.useState(6);
  const [sliderVariant, setSliderVariant] = React.useState<SliderVariant>('solid');
  const [switchVariant, setSwitchVariant] = React.useState<SwitchVariant>('solid');
  const [controlsVariant, setControlsVariant] = React.useState<CheckboxVariant>('solid-mono');
  const [includeUnderOffer, setIncludeUnderOffer] = React.useState(true);
  const [dropdownTriggerVariant, setDropdownTriggerVariant] =
    React.useState<ButtonVariant>('ghost');
  const [dropdownMenuVariant, setDropdownMenuVariant] =
    React.useState<DropdownMenuVariant>('subtle');

  React.useEffect(() => {
    const id = setTimeout(() => {
      const root = document.documentElement;

      const nextColor = wrapArray(allColorScales, allColorScales.indexOf(color) + 3)[0];
      root.dataset.accentScale = nextColor;
      setColor(nextColor);

      root.dataset.backgroundColor = randomItemInArray(backgroundColorValues);
      root.dataset.textColor = randomItemInArray(textColorValues);
      root.dataset.radius = randomItemInArray(radiusValues);
      // const nextDarkMode = Math.random() > 0.5;
      // setDarkMode(nextDarkMode);
      // if (nextDarkMode) {
      //   root.classList.remove('light-theme');
      //   root.classList.add('dark-theme');
      // } else {
      //   root.classList.remove('dark-theme');
      //   root.classList.add('light-theme');
      // }

      const nextPrimaryVariant = randomItemInArray(buttonVariants);
      const isNextPrimaryVariantMono = nextPrimaryVariant.endsWith('mono');
      setPrimaryVariant(nextPrimaryVariant);
      // setSecondaryVariant(
      //   nextPrimaryVariant.startsWith('subtle') || nextPrimaryVariant.startsWith('outline')
      //     ? `ghost${isNextPrimaryVariantMono ? '-mono' : ''}`
      //     : `subtle${isNextPrimaryVariantMono ? '-mono' : ''}`
      // );
      setSecondaryVariant(
        nextPrimaryVariant.startsWith('subtle') || nextPrimaryVariant.startsWith('outline')
          ? 'ghost'
          : 'subtle'
      );

      setAvatarVariant(randomItemInArray(avatarVariants));
      const useAvatarNameColor = Math.random() > 0.5;
      setAvatarNameColor(useAvatarNameColor ? nextColor : undefined);

      const useFeedbackTitleColor = Math.random() > 0.5;
      setFeedbackTitleColor(useFeedbackTitleColor ? nextColor : undefined);
      setFeedbackVariant(randomItemInArray(textAreaVariants));

      setLikeButtonVariant(randomItemInArray(buttonVariants));
      setLikeCount(Math.floor(Math.random() * 30) + 1);

      setThemeSelectTriggerVariant(randomItemInArray(buttonVariants));
      setThemeSelectContentVariant(randomItemInArray(selectContentVariants));

      setSliderValue(Math.floor(Math.random() * 5) + 2);
      setSliderVariant(
        randomItemInArray(sliderVariants.filter((variant) => !variant.endsWith('mono')))
      );
      setSwitchVariant(randomItemInArray(switchVariants));
      setControlsVariant(randomItemInArray(checkboxVariants));
      setIncludeUnderOffer(Math.random() > 0.4);

      setDropdownTriggerVariant(randomItemInArray(buttonVariants));
      setDropdownMenuVariant(randomItemInArray(dropdownMenuVariants));

      // animations
      const animatedElements = Array.from(root.querySelectorAll('[data-animate]')) as HTMLElement[];
      animatedElements.forEach((el) => (el.dataset.animate = 'animate'));
      setTimeout(() => animatedElements.forEach((el) => (el.dataset.animate = '')), 1000);
    }, THEME_SWITCH_INTERVAL);
    return () => {
      clearTimeout(id);
    };
  }, [color]);

  const simulateMissingAvatar = Math.random() > 0.8;
  const missingAvatarIndex = Math.floor(Math.random() * 4);

  return (
    <ThemeConfig asChild backgroundColor="gray" textColor="accent" radius="full">
      <html lang="en">
        <body className="rui-reset-root">
          <div id="root">
            <Provider>
              <ControlPanel />

              {/* <Grid display="inline-grid" columns="4" gap="3">
                {allColorScales.map((color) => {
                  const people = peopleByColorScale[color];
                  return (
                    <Box p="2" key={color} style={{ backgroundColor: `var(--${color}-9)` }}>
                      <Flex gap="3" align="center">
                        {people.map((person) => (
                          <Avatar key={person.image} src={person.image} fallback="A" size="3" />
                        ))}
                      </Flex>
                    </Box>
                  );
                })}
              </Grid> */}

              <Box py="9">
                <VisuallyHidden>
                  The following section represents an assortment of components periodically updated
                  to use different theming options.
                </VisuallyHidden>
                <div
                  style={{ position: 'relative', pointerEvents: 'none', userSelect: 'none' }}
                  aria-hidden
                >
                  {['light-theme', 'dark-theme'].map((theme) => (
                    <Box
                      key={theme}
                      p="9"
                      className={`${theme} ${styles.root}`}
                      style={
                        theme === 'dark-theme'
                          ? { position: 'absolute', inset: 0, zIndex: 1 }
                          : { position: 'relative', zIndex: 0 }
                      }
                    >
                      <Container>
                        <Flex direction="column" gap="2">
                          <Flex align="end" gap="2">
                            <Box shrink="0" style={{ width: FILTERS_PANEL_WIDTH, height: 50 }} />
                            <Flex shrink="0" justify="end" style={{ width: FEEDBACK_DIALOG_WIDTH }}>
                              {/* like button */}
                              <Flex
                                direction="column"
                                align="center"
                                style={{ position: 'relative' }}
                                mt="6"
                              >
                                <Button
                                  variant={likeButtonVariant}
                                  data-animate
                                  className={likeCount % 2 ? 'rui-IconButton' : ''}
                                  tabIndex={-1}
                                >
                                  {likeCount % 2 ? null : 'Like'}
                                  <HeartFilledIcon />
                                </Button>
                                <Flex
                                  direction="column"
                                  align="center"
                                  data-animate
                                  style={{
                                    '--delay': '100ms',
                                    position: 'absolute',
                                    bottom: 'calc(100% + 4px)',
                                    minWidth: 'max-content',
                                    zIndex: 9999,
                                  }}
                                >
                                  <div className="rui-TooltipContent">
                                    <div className="rui-TooltipText">
                                      <Text size="1">{likeCount}k likes</Text>
                                    </div>
                                  </div>
                                  <Arrow className="rui-TooltipArrow" />
                                </Flex>
                              </Flex>
                            </Flex>

                            <Box>
                              {/* avatar list */}
                              <Flex
                                direction="column"
                                style={{
                                  width: AVATARS_LIST_WIDTH,
                                  border: `1px solid var(${
                                    avatarNameColor === undefined ? '--gray-a6' : '--accent-6'
                                  })`,
                                  borderRadius: 'min(var(--br-3), var(--panel-max-br))',
                                }}
                                data-transition
                              >
                                {peopleByColorScale[color].map((person, index) => (
                                  <React.Fragment key={index}>
                                    <Flex
                                      align="center"
                                      justify="between"
                                      gap="4"
                                      p="4"
                                      style={{
                                        borderTop:
                                          index > 0
                                            ? `1px solid var(${
                                                avatarNameColor === undefined
                                                  ? '--gray-a6'
                                                  : '--accent-6'
                                              })`
                                            : undefined,
                                        '--delay': `${index * 50}ms`,
                                      }}
                                      data-transition
                                    >
                                      <Flex align="center" gap="4">
                                        <span data-animate>
                                          <Avatar
                                            src={
                                              simulateMissingAvatar && missingAvatarIndex === index
                                                ? undefined
                                                : person.image
                                            }
                                            size="3"
                                            variant={avatarVariant}
                                            fallback={person.name
                                              .toUpperCase()
                                              .split(' ')
                                              .map((word) => word[0])
                                              .join('')}
                                          />
                                        </span>
                                        <Flex direction="column" gap="1">
                                          <Text
                                            size="2"
                                            weight="bold"
                                            color={avatarNameColor}
                                            data-animate
                                          >
                                            {person.name}
                                          </Text>
                                          <Text size="1" color="gray" data-animate>
                                            {`@${person.name.toLowerCase().replace(' ', '')}`}
                                          </Text>
                                        </Flex>
                                      </Flex>
                                      <Button
                                        size="2"
                                        variant={primaryVariant}
                                        data-animate
                                        className={
                                          avatarNameColor !== undefined
                                            ? 'rui-IconButton'
                                            : undefined
                                        }
                                        tabIndex={-1}
                                      >
                                        {avatarNameColor !== undefined ? <StarIcon /> : 'Follow'}
                                      </Button>
                                    </Flex>
                                  </React.Fragment>
                                ))}
                              </Flex>
                            </Box>
                          </Flex>

                          <Flex align="start" gap="2">
                            {/* bookmarks dropdown */}
                            <Flex
                              direction="column"
                              align="end"
                              shrink="0"
                              style={{ width: FILTERS_PANEL_WIDTH, alignSelf: 'end' }}
                            >
                              <Box position="relative" style={{ top: 'calc(-1 * var(--space-8))' }}>
                                <Flex position="relative" direction="column" align="end" gap="1">
                                  <Button
                                    size="1"
                                    variant={dropdownTriggerVariant}
                                    data-animate
                                    className={likeCount % 2 ? '' : 'rui-IconButton'}
                                    tabIndex={-1}
                                  >
                                    {likeCount % 2 ? 'Bookmarks' : null}
                                    <BookmarkIcon />
                                  </Button>
                                  <div
                                    className={`rui-BaseMenuContent size-1 variant-${dropdownMenuVariant}`}
                                    style={{
                                      minWidth: 220,
                                      position: 'absolute',
                                      bottom: 'calc(100% + 4px)',
                                      zIndex: 9999,
                                    }}
                                    data-transition
                                  >
                                    <div className="rui-BaseMenuItem">
                                      Bookmarks
                                      <div className="rui-BaseMenuShortcut">⌥⌘B</div>
                                    </div>
                                    <div className="rui-BaseMenuItem">
                                      Bookmark page
                                      <div className="rui-BaseMenuShortcut">⌘D</div>
                                    </div>
                                    <div className="rui-BaseMenuSeparator" />
                                    <div className="rui-BaseMenuLabel">Recently viewed</div>
                                    <div className="rui-BaseMenuItem" data-highlighted data-animate>
                                      <Flex gap="2">
                                        <GitHubLogoIcon />
                                        radix-ui/primitives: Rad…
                                      </Flex>
                                    </div>
                                    <div
                                      className="rui-BaseMenuItem"
                                      data-animate
                                      style={{ '--delay': '50ms' }}
                                    >
                                      <Flex gap="2">
                                        <ModulzLogoIcon />
                                        Modulz
                                      </Flex>
                                    </div>
                                    <div
                                      className="rui-BaseMenuItem"
                                      data-animate
                                      style={{ '--delay': '100ms' }}
                                    >
                                      <Flex gap="2">
                                        <TwitterLogoIcon />
                                        WorkOS Twitter
                                      </Flex>
                                    </div>
                                  </div>
                                </Flex>
                              </Box>
                            </Flex>

                            <Box shrink="0">
                              {/* feedback dialog */}
                              <div
                                className="rui-DialogContent rui-AlertDialogContent"
                                tabIndex={-1}
                                style={{
                                  position: 'relative',
                                  width: FEEDBACK_DIALOG_WIDTH,
                                  '--dialog-padding': 'var(--space-4)',
                                }}
                                data-transition
                              >
                                <Heading size="3" color={feedbackTitleColor} mb="3">
                                  Do you have feedback?
                                </Heading>
                                <Text size="2" mb="4">
                                  Help us improve our product by sharing your ideas with us!
                                </Text>

                                <Flex direction="column" gap="3">
                                  <Grid gap="1">
                                    <Text size="1" weight="bold" color="gray">
                                      Feedback
                                    </Text>
                                    <TextArea
                                      size="2"
                                      variant={feedbackVariant}
                                      placeholder="Your feedback"
                                      style={{ minHeight: 100 }}
                                      data-transition
                                      tabIndex={-1}
                                    />
                                  </Grid>
                                </Flex>

                                <Flex gap="3" mt="4" justify="end">
                                  <Button
                                    size="1"
                                    variant={secondaryVariant}
                                    tabIndex={-1}
                                    data-animate
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="1"
                                    variant={primaryVariant}
                                    data-animate
                                    style={{ '--delay': '100ms' }}
                                    tabIndex={-1}
                                  >
                                    Share
                                    <Share2Icon />
                                  </Button>
                                </Flex>
                                <Box position="absolute" top="0" right="0" mr="3" mt="3">
                                  <IconButton
                                    size="1"
                                    variant={secondaryVariant}
                                    radius="full"
                                    data-animate
                                    style={{ '--delay': '100ms' }}
                                    tabIndex={-1}
                                  >
                                    <Cross1Icon />
                                  </IconButton>
                                </Box>
                              </div>
                            </Box>

                            <div>
                              {/* theme select */}
                              <Flex
                                display="inline-flex"
                                direction="column"
                                align="center"
                                style={{ position: 'relative' }}
                              >
                                <button
                                  className={`rui-reset-button rui-SelectTrigger size-2 variant-${themeSelectTriggerVariant}`}
                                  data-animate
                                  tabIndex={-1}
                                >
                                  <span>{darkMode ? 'Dark' : 'Light'}</span>
                                  <ChevronDownIcon className="rui-SelectIcon" />
                                </button>
                                <div
                                  style={{
                                    '--delay': '100ms',
                                    position: 'absolute',
                                    top: 'calc(100% + 4px)',
                                    zIndex: 9999,
                                  }}
                                >
                                  <div
                                    className={`rui-SelectContent size-2 variant-${themeSelectContentVariant}`}
                                    data-transition
                                  >
                                    <div className="rui-SelectViewport">
                                      <div
                                        className="rui-SelectItem SelectCheckboxItem"
                                        data-highlighted
                                        data-animate
                                        style={{ '--delay': '100ms' }}
                                      >
                                        {darkMode === false && (
                                          <span className="rui-SelectItemIndicator">
                                            <CheckIcon />
                                          </span>
                                        )}
                                        <Flex align="center" justify="between" grow="1">
                                          Light
                                          <Box mr="-3">
                                            <SunIcon />
                                          </Box>
                                        </Flex>
                                      </div>
                                      <div
                                        className="rui-SelectItem SelectCheckboxItem"
                                        data-animate
                                        style={{ '--delay': '200ms' }}
                                      >
                                        {darkMode && (
                                          <span className="rui-SelectItemIndicator">
                                            <CheckIcon />
                                          </span>
                                        )}
                                        <Flex align="center" justify="between" grow="1">
                                          Dark
                                          <Box mr="-3">
                                            <MoonIcon />
                                          </Box>
                                        </Flex>
                                      </div>
                                      <div
                                        className="rui-SelectItem SelectCheckboxItem"
                                        data-animate
                                        style={{
                                          '--delay': '300ms',
                                        }}
                                      >
                                        <Flex align="center" justify="between" grow="1">
                                          System
                                          <Box mr="-3" ml="3">
                                            <DesktopIcon />
                                          </Box>
                                        </Flex>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Flex>
                            </div>
                          </Flex>

                          <Box mt="-8" ml="8">
                            {/* filter panel */}
                            <Box
                              p="3"
                              style={{
                                backgroundColor: 'var(--color-panel)',
                                border: `1px solid var(${
                                  avatarNameColor === undefined ? '--gray-a5' : '--accent-5'
                                })`,
                                borderRadius: 'min(var(--br-3), var(--panel-max-br))',
                                width: FILTERS_PANEL_WIDTH,
                              }}
                            >
                              <Heading size="3" mb="3">
                                Filters
                              </Heading>

                              <Grid gap="3" columns="2">
                                <Flex align="center">
                                  <Switch
                                    variant={switchVariant}
                                    checked={includeUnderOffer}
                                    mr="2"
                                    data-animate
                                    tabIndex={-1}
                                  />
                                  <Text size="2">Include Under Offer</Text>
                                </Flex>

                                <Flex direction="column" gap="1">
                                  <Text size="2">
                                    Search radius:
                                    <Text size="1" color="gray" asChild>
                                      <span> +{sliderValue} miles</span>
                                    </Text>
                                  </Text>
                                  <Box
                                    grow="1"
                                    className={`rui-SliderRoot size-1 variant-${sliderVariant}`}
                                    data-orientation="horizontal"
                                  >
                                    <div className="rui-SliderTrack" data-orientation="horizontal">
                                      <div
                                        className="rui-SliderRange"
                                        data-orientation="horizontal"
                                        style={{ width: `${sliderValue * 10}%` }}
                                        data-transition
                                      />
                                    </div>
                                    <div
                                      className="rui-SliderThumb"
                                      data-transition
                                      style={{ position: 'absolute', left: `${sliderValue * 10}%` }}
                                    />
                                  </Box>
                                </Flex>

                                <Flex direction="column" gap="1">
                                  <Text size="1" weight="bold" color="gray">
                                    Min. Beds
                                  </Text>
                                  <RadioGroup.Root
                                    defaultValue="2"
                                    variant={controlsVariant}
                                    tabIndex={-1}
                                  >
                                    <Flex direction="column" gap="1">
                                      <Text size="2">
                                        <label>
                                          <RadioGroup.Item value="studio" mr="2" data-animate />
                                          Studio
                                        </label>
                                      </Text>
                                      <Text size="2">
                                        <label>
                                          <RadioGroup.Item
                                            value="1"
                                            mr="2"
                                            data-animate
                                            style={{ '--delay': '50ms' }}
                                          />
                                          1 Bed
                                        </label>
                                      </Text>
                                      <Text size="2">
                                        <label>
                                          <RadioGroup.Item
                                            value="2"
                                            mr="2"
                                            data-animate
                                            style={{ '--delay': '100ms' }}
                                          />
                                          2 Beds
                                        </label>
                                      </Text>
                                      <Text size="2">
                                        <label>
                                          <RadioGroup.Item
                                            value="3+"
                                            mr="2"
                                            data-animate
                                            style={{ '--delay': '150ms' }}
                                          />
                                          3+ Beds
                                        </label>
                                      </Text>
                                    </Flex>
                                  </RadioGroup.Root>
                                </Flex>

                                <Flex direction="column" gap="1">
                                  <Text size="1" weight="bold" color="gray">
                                    Must Haves
                                  </Text>
                                  <Text size="2">
                                    <Checkbox
                                      variant={controlsVariant}
                                      defaultChecked
                                      data-animate
                                      tabIndex={-1}
                                      mr="2"
                                    />
                                    Parking
                                  </Text>
                                  <Text size="2">
                                    <Checkbox
                                      variant={controlsVariant}
                                      defaultChecked
                                      data-animate
                                      style={{ '--delay': '50ms' }}
                                      tabIndex={-1}
                                      mr="2"
                                    />
                                    Garden
                                  </Text>
                                  <Text size="2">
                                    <Checkbox
                                      variant={controlsVariant}
                                      data-animate
                                      style={{ '--delay': '100ms' }}
                                      tabIndex={-1}
                                      mr="2"
                                    />
                                    Swimming pool
                                  </Text>
                                </Flex>

                                <div />

                                <Flex align="center" justify="end" gap="3">
                                  <Link
                                    size="1"
                                    weight="bold"
                                    data-animate
                                    style={{ '--delay': '200ms' }}
                                    tabIndex={-1}
                                  >
                                    reset
                                  </Link>
                                  <Button
                                    size="1"
                                    variant={secondaryVariant}
                                    data-animate
                                    style={{ '--delay': '200ms' }}
                                    tabIndex={-1}
                                  >
                                    <UpdateIcon />
                                    Update filters
                                  </Button>
                                </Flex>
                              </Grid>
                            </Box>
                          </Box>
                        </Flex>
                      </Container>
                    </Box>
                  ))}
                </div>
              </Box>
            </Provider>
          </div>
        </body>
      </html>
    </ThemeConfig>
  );
}

function randomItemInArray<T>(array: readonly T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function wrapArray<T>(array: readonly T[], startIndex: number) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
