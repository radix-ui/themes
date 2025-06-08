import React from 'react';
import { IconButton, Flex, Grid, Heading, Text, Tabs } from '@kushagradhawan/kookie-ui';
import {
  Heart,
  Star,
  Bookmark,
  Share,
  Settings,
  Plus,
  ArrowLeft,
  ExternalLink,
  Download,
  Search,
  Trash2,
  Edit,
} from 'lucide-react';

export function IconButtonExample() {
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
  const getIcon = (index: number) => {
    const Icon = icons[index % icons.length];
    return <Icon size={16} />;
  };

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="1">
        <Heading size="5">IconButton</Heading>
        <Text size="2" color="gray">
          Trigger an action or event using an icon, perfect for toolbars and compact interfaces.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="theme">
        <Tabs.List>
          <Tabs.Trigger value="theme">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all">All colors</Tabs.Trigger>
          <Tabs.Trigger value="sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="aselements">As another element</Tabs.Trigger>
        </Tabs.List>

        {/* Theme Colors Tab - Variants × States */}
        <Tabs.Content value="theme">
          <Flex pt="6">
            <Grid
              columns="6"
              gap="2"
              style={{
                gridTemplateColumns: 'auto repeat(5, 1fr)',
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
                Disabled
              </Text>
              <Text size="2" color="gray" weight="medium">
                Loading
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
                  <IconButton variant={variant} size="2">
                    {getIcon(variantIndex)}
                  </IconButton>
                  <IconButton variant={variant} size="2" color="gray">
                    {getIcon(variantIndex)}
                  </IconButton>
                  <IconButton variant={variant} size="2" highContrast>
                    {getIcon(variantIndex)}
                  </IconButton>
                  <IconButton variant={variant} size="2" disabled>
                    {getIcon(variantIndex)}
                  </IconButton>
                  <IconButton variant={variant} size="2" loading>
                    {getIcon(variantIndex)}
                  </IconButton>
                </React.Fragment>
              ))}
            </Grid>
          </Flex>
        </Tabs.Content>

        {/* All Colors Tab - Colors × Variants */}
        <Tabs.Content value="all">
          <Flex pt="6" direction="column" gap="8">
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
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
                      <IconButton
                        key={`${color}-${variant}`}
                        variant={variant}
                        color={color}
                        size="2"
                      >
                        {getIcon(colorIndex + variantIndex)}
                      </IconButton>
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                High Contrast
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
                      <IconButton
                        key={`${color}-${variant}-hc`}
                        variant={variant}
                        color={color}
                        size="2"
                        highContrast
                      >
                        {getIcon(colorIndex + variantIndex)}
                      </IconButton>
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* All Sizes Tab - Sizes × Radius */}
        <Tabs.Content value="sizes">
          <Flex pt="6" direction="column" gap="8">
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Normal
              </Text>
              <Grid
                columns="6"
                gap="2"
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

                {sizes.map((size, sizeIndex) => (
                  <React.Fragment key={size}>
                    <Text size="2" color="gray" style={{ textAlign: 'right' }}>
                      Size {size}
                    </Text>
                    {radiusOptions.map((radius, radiusIndex) => {
                      const Icon = icons[(sizeIndex + radiusIndex) % icons.length];
                      return (
                        <IconButton
                          key={`${size}-${radius.key}`}
                          size={size}
                          radius={radius.key}
                          color="blue"
                          variant="ghost"
                        >
                          <Icon />
                        </IconButton>
                      );
                    })}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                High Contrast
              </Text>
              <Grid
                columns="6"
                gap="2"
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

                {sizes.map((size, sizeIndex) => (
                  <React.Fragment key={size}>
                    <Text size="2" color="gray" style={{ textAlign: 'right' }}>
                      Size {size}
                    </Text>
                    {radiusOptions.map((radius, radiusIndex) => {
                      const Icon = icons[(sizeIndex + radiusIndex) % icons.length];
                      return (
                        <IconButton
                          key={`${size}-${radius.key}-hc`}
                          size={size}
                          radius={radius.key}
                          color="blue"
                          highContrast
                        >
                          <Icon />
                        </IconButton>
                      );
                    })}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* As Another Element Tab - asChild and as prop */}
        <Tabs.Content value="aselements">
          <Flex pt="6" direction="column" gap="6">
            <Flex direction="column" gap="2">
              <Text size="3" weight="medium">
                As another element
              </Text>
              <Text size="2" color="gray">
                Use the asChild prop to render the icon button as a link or other element. Use the
                as prop to change the underlying HTML element.
              </Text>
            </Flex>

            <Flex direction="column" gap="4">
              <Text size="2" weight="medium">
                Using asChild prop
              </Text>
              <Grid
                columns="4"
                gap="4"
                style={{
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  alignItems: 'start',
                }}
              >
                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Navigation Link
                  </Text>
                  <Text size="1" color="gray">
                    IconButton as link
                  </Text>
                  <IconButton variant="soft" size="3" color="blue" asChild aria-label="Go back">
                    <a href="#back">
                      <ArrowLeft size={18} />
                    </a>
                  </IconButton>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    External Link
                  </Text>
                  <Text size="1" color="gray">
                    Opens in new tab
                  </Text>
                  <IconButton
                    variant="outline"
                    size="3"
                    color="green"
                    asChild
                    aria-label="Visit GitHub"
                  >
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} />
                    </a>
                  </IconButton>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Download Link
                  </Text>
                  <Text size="1" color="gray">
                    Download action
                  </Text>
                  <IconButton
                    variant="solid"
                    size="3"
                    color="purple"
                    asChild
                    aria-label="Download file"
                  >
                    <a href="/file.pdf" download="document.pdf">
                      <Download size={18} />
                    </a>
                  </IconButton>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Ghost Link
                  </Text>
                  <Text size="1" color="gray">
                    Subtle action
                  </Text>
                  <IconButton variant="ghost" size="3" color="gray" asChild aria-label="Settings">
                    <a href="/settings">
                      <Settings size={18} />
                    </a>
                  </IconButton>
                </Flex>
              </Grid>
            </Flex>

            <Flex direction="column" gap="4">
              <Text size="2" weight="medium">
                Using as prop
              </Text>
              <Grid
                columns="3"
                gap="4"
                style={{
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  alignItems: 'start',
                }}
              >
                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Button as div
                  </Text>
                  <Text size="1" color="gray">
                    as="div" with onClick
                  </Text>
                  <IconButton
                    variant="surface"
                    size="3"
                    as="div"
                    onClick={() => alert('Heart clicked!')}
                    aria-label="Like"
                  >
                    <Heart size={18} />
                  </IconButton>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Button as span
                  </Text>
                  <Text size="1" color="gray">
                    as="span" for inline
                  </Text>
                  <IconButton
                    variant="soft"
                    size="3"
                    as="span"
                    onClick={() => alert('Star clicked!')}
                    aria-label="Favorite"
                  >
                    <Star size={18} />
                  </IconButton>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Form Button
                  </Text>
                  <Text size="1" color="gray">
                    type="submit" for forms
                  </Text>
                  <IconButton
                    variant="classic"
                    size="3"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Search submitted!');
                    }}
                    aria-label="Search"
                  >
                    <Search size={18} />
                  </IconButton>
                </Flex>
              </Grid>
            </Flex>

            <Flex direction="column" gap="4">
              <Text size="2" weight="medium">
                Accessibility considerations
              </Text>
              <Text size="2" color="gray">
                Always provide aria-label or aria-labelledby for icon buttons since they don't have
                visible text.
              </Text>
              <Grid
                columns="2"
                gap="4"
                style={{
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  alignItems: 'start',
                }}
              >
                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    With aria-label
                  </Text>
                  <Text size="1" color="gray">
                    Screen reader accessible
                  </Text>
                  <IconButton variant="solid" size="3" color="red" aria-label="Delete item">
                    <Trash2 size={18} />
                  </IconButton>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    With tooltip context
                  </Text>
                  <Text size="1" color="gray">
                    Visual and screen reader help
                  </Text>
                  <IconButton
                    variant="outline"
                    size="3"
                    color="blue"
                    aria-label="Edit content"
                    title="Edit this item"
                  >
                    <Edit size={18} />
                  </IconButton>
                </Flex>
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
