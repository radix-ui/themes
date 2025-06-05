'use client';

import React, { useState } from 'react';
import {
  ToggleButton,
  ToggleIconButton,
  Flex,
  Grid,
  Heading,
  Text,
  Tabs,
} from '@kushagradhawan/kookie-ui';
import {
  Heart,
  Star,
  Bookmark,
  Share,
  Settings,
  Plus,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

export function ToggleButtonExample() {
  const variants = ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'] as const;
  const allColors = [
    'gray',
    'gold',
    'bronze',
    'brown',
    'yellow',
    'amber',
    'orange',
    'tomato',
    'red',
    'ruby',
    'crimson',
    'pink',
    'plum',
    'purple',
    'violet',
    'iris',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'jade',
    'green',
    'grass',
    'lime',
    'mint',
    'sky',
  ] as const;
  const sizes = ['1', '2', '3', '4'] as const;
  const radiusOptions = [
    { key: 'none', label: 'No radius' },
    { key: 'small', label: 'Small' },
    { key: 'medium', label: 'Medium' },
    { key: 'large', label: 'Large' },
    { key: 'full', label: 'Full' },
  ] as const;

  const icons = [Heart, Star, Bookmark, Share, Settings, Plus];
  const iconLabels = ['Like', 'Favorite', 'Bookmark', 'Share', 'Settings', 'Add'];

  const getIcon = (index: number) => {
    const Icon = icons[index % icons.length];
    return <Icon size={16} />;
  };

  const getIconLabel = (index: number) => {
    return iconLabels[index % iconLabels.length];
  };

  // State for interactive examples
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string, pressed: boolean) => {
    setToggleStates((prev) => ({ ...prev, [key]: pressed }));
  };

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="1">
        <Heading size="5">ToggleButton & ToggleIconButton</Heading>
        <Text size="2" color="gray">
          Buttons that can be toggled on/off, perfect for tool palettes, filters, and state
          controls.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="theme">
        <Tabs.List>
          <Tabs.Trigger value="theme">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all">All colors</Tabs.Trigger>
          <Tabs.Trigger value="sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="interactive">Interactive</Tabs.Trigger>
        </Tabs.List>

        {/* Theme Colors Tab - Variants × States */}
        <Tabs.Content value="theme">
          <Flex pt="6" direction="column" gap="8">
            {/* ToggleButton Section */}
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                ToggleButton
              </Text>
              <Grid
                columns="8"
                gap="2"
                style={{
                  gridTemplateColumns: 'auto repeat(7, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <div></div>
                <Text size="2" color="gray" weight="medium">
                  Accent
                </Text>
                <Text size="2" color="gray" weight="medium">
                  Gray
                </Text>
                <Text size="2" color="gray" weight="medium">
                  High Contrast
                </Text>
                <Text size="2" color="gray" weight="medium">
                  Pressed
                </Text>
                <Text size="2" color="gray" weight="medium">
                  Disabled
                </Text>
                <Text size="2" color="gray" weight="medium">
                  Loading
                </Text>
                <Text size="2" color="gray" weight="medium">
                  Loading+Pressed
                </Text>

                {variants.map((variant, variantIndex) => (
                  <React.Fragment key={variant}>
                    <Text
                      size="2"
                      color="gray"
                      style={{ textAlign: 'right', textTransform: 'capitalize' }}
                    >
                      {variant}
                    </Text>
                    <ToggleButton variant={variant} size="2">
                      Toggle <ToggleLeft size={16} />
                    </ToggleButton>
                    <ToggleButton variant={variant} size="2" color="gray">
                      Toggle <ToggleLeft size={16} />
                    </ToggleButton>
                    <ToggleButton variant={variant} size="2" highContrast>
                      Toggle <ToggleLeft size={16} />
                    </ToggleButton>
                    <ToggleButton variant={variant} size="2" defaultPressed>
                      Toggle <ToggleRight size={16} />
                    </ToggleButton>
                    <ToggleButton variant={variant} size="2" disabled>
                      Toggle <ToggleLeft size={16} />
                    </ToggleButton>
                    <ToggleButton variant={variant} size="2" loading>
                      Toggle <ToggleLeft size={16} />
                    </ToggleButton>
                    <ToggleButton variant={variant} size="2" loading defaultPressed>
                      Toggle <ToggleRight size={16} />
                    </ToggleButton>
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>

            {/* ToggleIconButton Section */}
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                ToggleIconButton
              </Text>
              <Grid
                columns="8"
                gap="2"
                style={{
                  gridTemplateColumns: 'auto repeat(7, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <div></div>
                <Text size="2" color="gray" weight="medium">
                  Accent
                </Text>
                <Text size="2" color="gray" weight="medium">
                  Gray
                </Text>
                <Text size="2" color="gray" weight="medium">
                  High Contrast
                </Text>
                <Text size="2" color="gray" weight="medium">
                  Pressed
                </Text>
                <Text size="2" color="gray" weight="medium">
                  Disabled
                </Text>
                <Text size="2" color="gray" weight="medium">
                  Loading
                </Text>
                <Text size="2" color="gray" weight="medium">
                  Loading+Pressed
                </Text>

                {variants.map((variant, variantIndex) => (
                  <React.Fragment key={variant}>
                    <Text
                      size="2"
                      color="gray"
                      style={{ textAlign: 'right', textTransform: 'capitalize' }}
                    >
                      {variant}
                    </Text>
                    <ToggleIconButton
                      variant={variant}
                      size="2"
                      aria-label={getIconLabel(variantIndex)}
                    >
                      {getIcon(variantIndex)}
                    </ToggleIconButton>
                    <ToggleIconButton
                      variant={variant}
                      size="2"
                      color="gray"
                      aria-label={getIconLabel(variantIndex)}
                    >
                      {getIcon(variantIndex)}
                    </ToggleIconButton>
                    <ToggleIconButton
                      variant={variant}
                      size="2"
                      highContrast
                      aria-label={getIconLabel(variantIndex)}
                    >
                      {getIcon(variantIndex)}
                    </ToggleIconButton>
                    <ToggleIconButton
                      variant={variant}
                      size="2"
                      defaultPressed
                      aria-label={getIconLabel(variantIndex)}
                    >
                      {getIcon(variantIndex)}
                    </ToggleIconButton>
                    <ToggleIconButton
                      variant={variant}
                      size="2"
                      disabled
                      aria-label={getIconLabel(variantIndex)}
                    >
                      {getIcon(variantIndex)}
                    </ToggleIconButton>
                    <ToggleIconButton
                      variant={variant}
                      size="2"
                      loading
                      aria-label={getIconLabel(variantIndex)}
                    >
                      {getIcon(variantIndex)}
                    </ToggleIconButton>
                    <ToggleIconButton
                      variant={variant}
                      size="2"
                      loading
                      defaultPressed
                      aria-label={getIconLabel(variantIndex)}
                    >
                      {getIcon(variantIndex)}
                    </ToggleIconButton>
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* All Colors Tab - Colors × Variants */}
        <Tabs.Content value="all">
          <Flex pt="6" direction="column" gap="8">
            {/* ToggleButton Normal */}
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                ToggleButton - Normal
              </Text>
              <Grid
                columns="7"
                gap="2"
                style={{
                  gridTemplateColumns: 'auto repeat(6, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <div></div>
                {variants.map((variant) => (
                  <Text
                    key={variant}
                    size="2"
                    color="gray"
                    weight="medium"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {variant}
                  </Text>
                ))}

                {allColors.map((color, colorIndex) => (
                  <React.Fragment key={color}>
                    <Text
                      size="2"
                      color="gray"
                      style={{ textAlign: 'right', textTransform: 'capitalize' }}
                    >
                      {color}
                    </Text>
                    {variants.map((variant, variantIndex) => (
                      <ToggleButton
                        key={`${color}-${variant}`}
                        variant={variant}
                        color={color}
                        size="2"
                      >
                        Toggle
                      </ToggleButton>
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>

            {/* ToggleButton Pressed */}
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                ToggleButton - Pressed
              </Text>
              <Grid
                columns="7"
                gap="2"
                style={{
                  gridTemplateColumns: 'auto repeat(6, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <div></div>
                {variants.map((variant) => (
                  <Text
                    key={variant}
                    size="2"
                    color="gray"
                    weight="medium"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {variant}
                  </Text>
                ))}

                {allColors.map((color, colorIndex) => (
                  <React.Fragment key={color}>
                    <Text
                      size="2"
                      color="gray"
                      style={{ textAlign: 'right', textTransform: 'capitalize' }}
                    >
                      {color}
                    </Text>
                    {variants.map((variant, variantIndex) => (
                      <ToggleButton
                        key={`${color}-${variant}-pressed`}
                        variant={variant}
                        color={color}
                        size="2"
                        defaultPressed
                      >
                        Pressed
                      </ToggleButton>
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>

            {/* ToggleIconButton Section */}
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                ToggleIconButton - All States
              </Text>
              <Grid
                columns="3"
                gap="6"
                style={{
                  gridTemplateColumns: 'repeat(3, 1fr)',
                }}
              >
                {/* Normal State */}
                <Flex direction="column" gap="3">
                  <Text size="2" weight="medium" color="gray">
                    Normal
                  </Text>
                  <Grid
                    columns="7"
                    gap="2"
                    style={{
                      gridTemplateColumns: 'auto repeat(6, 1fr)',
                      alignItems: 'center',
                      justifyItems: 'center',
                    }}
                  >
                    <div></div>
                    {variants.map((variant) => (
                      <Text
                        key={variant}
                        size="1"
                        color="gray"
                        weight="medium"
                        style={{ textTransform: 'capitalize', writingMode: 'vertical-rl' }}
                      >
                        {variant}
                      </Text>
                    ))}

                    {allColors.slice(0, 8).map((color, colorIndex) => (
                      <React.Fragment key={color}>
                        <Text
                          size="1"
                          color="gray"
                          style={{ textAlign: 'right', textTransform: 'capitalize' }}
                        >
                          {color}
                        </Text>
                        {variants.map((variant, variantIndex) => (
                          <ToggleIconButton
                            key={`${color}-${variant}`}
                            variant={variant}
                            color={color}
                            size="2"
                            aria-label={`${getIconLabel(variantIndex)} ${color} ${variant}`}
                          >
                            {getIcon(variantIndex)}
                          </ToggleIconButton>
                        ))}
                      </React.Fragment>
                    ))}
                  </Grid>
                </Flex>

                {/* Pressed State */}
                <Flex direction="column" gap="3">
                  <Text size="2" weight="medium" color="gray">
                    Pressed
                  </Text>
                  <Grid
                    columns="7"
                    gap="2"
                    style={{
                      gridTemplateColumns: 'auto repeat(6, 1fr)',
                      alignItems: 'center',
                      justifyItems: 'center',
                    }}
                  >
                    <div></div>
                    {variants.map((variant) => (
                      <Text
                        key={variant}
                        size="1"
                        color="gray"
                        weight="medium"
                        style={{ textTransform: 'capitalize', writingMode: 'vertical-rl' }}
                      >
                        {variant}
                      </Text>
                    ))}

                    {allColors.slice(0, 8).map((color, colorIndex) => (
                      <React.Fragment key={color}>
                        <Text
                          size="1"
                          color="gray"
                          style={{ textAlign: 'right', textTransform: 'capitalize' }}
                        >
                          {color}
                        </Text>
                        {variants.map((variant, variantIndex) => (
                          <ToggleIconButton
                            key={`${color}-${variant}-pressed`}
                            variant={variant}
                            color={color}
                            size="2"
                            defaultPressed
                            aria-label={`${getIconLabel(variantIndex)} ${color} ${variant} pressed`}
                          >
                            {getIcon(variantIndex)}
                          </ToggleIconButton>
                        ))}
                      </React.Fragment>
                    ))}
                  </Grid>
                </Flex>

                {/* Disabled State */}
                <Flex direction="column" gap="3">
                  <Text size="2" weight="medium" color="gray">
                    Disabled
                  </Text>
                  <Grid
                    columns="7"
                    gap="2"
                    style={{
                      gridTemplateColumns: 'auto repeat(6, 1fr)',
                      alignItems: 'center',
                      justifyItems: 'center',
                    }}
                  >
                    <div></div>
                    {variants.map((variant) => (
                      <Text
                        key={variant}
                        size="1"
                        color="gray"
                        weight="medium"
                        style={{ textTransform: 'capitalize', writingMode: 'vertical-rl' }}
                      >
                        {variant}
                      </Text>
                    ))}

                    {allColors.slice(0, 8).map((color, colorIndex) => (
                      <React.Fragment key={color}>
                        <Text
                          size="1"
                          color="gray"
                          style={{ textAlign: 'right', textTransform: 'capitalize' }}
                        >
                          {color}
                        </Text>
                        {variants.map((variant, variantIndex) => (
                          <ToggleIconButton
                            key={`${color}-${variant}-disabled`}
                            variant={variant}
                            color={color}
                            size="2"
                            disabled
                            aria-label={`${getIconLabel(variantIndex)} ${color} ${variant} disabled`}
                          >
                            {getIcon(variantIndex)}
                          </ToggleIconButton>
                        ))}
                      </React.Fragment>
                    ))}
                  </Grid>
                </Flex>
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* All Sizes Tab - Sizes × Radius */}
        <Tabs.Content value="sizes">
          <Flex pt="6" direction="column" gap="8">
            {/* ToggleButton Sizes */}
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                ToggleButton - All Sizes
              </Text>
              <Grid
                columns="6"
                gap="3"
                style={{
                  gridTemplateColumns: 'auto repeat(5, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'start',
                }}
              >
                <div></div>
                {radiusOptions.map((radius) => (
                  <Text key={radius.key} size="2" color="gray" weight="medium">
                    {radius.label}
                  </Text>
                ))}

                {sizes.map((size) => (
                  <React.Fragment key={size}>
                    <Text size="2" color="gray" style={{ textAlign: 'right' }}>
                      Size {size}
                    </Text>
                    {radiusOptions.map((radius) => (
                      <ToggleButton
                        key={`${size}-${radius.key}`}
                        size={size}
                        radius={radius.key}
                        color="blue"
                      >
                        Toggle <ChevronRight size={14} />
                      </ToggleButton>
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>

            {/* ToggleIconButton Sizes */}
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                ToggleIconButton - All Sizes
              </Text>
              <Grid
                columns="6"
                gap="3"
                style={{
                  gridTemplateColumns: 'auto repeat(5, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'start',
                }}
              >
                <div></div>
                {radiusOptions.map((radius) => (
                  <Text key={radius.key} size="2" color="gray" weight="medium">
                    {radius.label}
                  </Text>
                ))}

                {sizes.map((size) => (
                  <React.Fragment key={size}>
                    <Text size="2" color="gray" style={{ textAlign: 'right' }}>
                      Size {size}
                    </Text>
                    {radiusOptions.map((radius) => (
                      <ToggleIconButton
                        key={`${size}-${radius.key}`}
                        size={size}
                        radius={radius.key}
                        color="blue"
                        aria-label={`Bookmark size ${size} ${radius.label} radius`}
                      >
                        <Bookmark
                          size={size === '1' ? 12 : size === '2' ? 14 : size === '3' ? 16 : 18}
                        />
                      </ToggleIconButton>
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* Interactive Tab */}
        <Tabs.Content value="interactive">
          <Flex pt="6" direction="column" gap="8">
            {/* Interactive ToggleButton Toolbar */}
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Interactive ToggleButton Toolbar
              </Text>
              <Flex
                gap="2"
                align="center"
                style={{ padding: '8px', background: 'var(--gray-2)', borderRadius: '8px' }}
              >
                <ToggleButton
                  variant="soft"
                  size="2"
                  pressed={toggleStates['bold']}
                  onPressedChange={(pressed) => handleToggle('bold', pressed)}
                >
                  Bold
                </ToggleButton>
                <ToggleButton
                  variant="soft"
                  size="2"
                  pressed={toggleStates['italic']}
                  onPressedChange={(pressed) => handleToggle('italic', pressed)}
                >
                  Italic
                </ToggleButton>
                <ToggleButton
                  variant="soft"
                  size="2"
                  pressed={toggleStates['underline']}
                  onPressedChange={(pressed) => handleToggle('underline', pressed)}
                >
                  Underline
                </ToggleButton>
              </Flex>
            </Flex>

            {/* Interactive ToggleIconButton Toolbar */}
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Interactive ToggleIconButton Toolbar
              </Text>
              <Flex
                gap="2"
                align="center"
                style={{ padding: '8px', background: 'var(--gray-2)', borderRadius: '8px' }}
              >
                {icons.map((Icon, index) => (
                  <ToggleIconButton
                    key={index}
                    variant="soft"
                    size="2"
                    pressed={toggleStates[`icon-${index}`]}
                    onPressedChange={(pressed) => handleToggle(`icon-${index}`, pressed)}
                    aria-label={`Toggle ${getIconLabel(index)}`}
                  >
                    <Icon size={16} />
                  </ToggleIconButton>
                ))}
              </Flex>
            </Flex>

            {/* State Display */}
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">
                Current Toggle States:
              </Text>
              <Text size="2" color="gray" style={{ fontFamily: 'monospace' }}>
                {JSON.stringify(toggleStates, null, 2)}
              </Text>
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
