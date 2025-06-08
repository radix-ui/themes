import React from 'react';
import { TextField, Flex, Grid, Heading, Text, Tabs } from '@kushagradhawan/kookie-ui';
import { Search, User, Mail, Lock } from 'lucide-react';

export function TextFieldExample() {
  const variants = ['classic', 'surface', 'soft'] as const;
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
  const sizes = ['1', '2', '3'] as const;
  const radiusOptions = [
    { key: 'none', label: 'No radius' },
    { key: 'small', label: 'Small' },
    { key: 'medium', label: 'Medium' },
    { key: 'large', label: 'Large' },
    { key: 'full', label: 'Full' },
  ] as const;

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="1">
        <Heading size="5">TextField</Heading>
        <Text size="2" color="gray">
          Capture user input with various styles, slots, and validation states.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="theme">
        <Tabs.List>
          <Tabs.Trigger value="theme">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all">All colors</Tabs.Trigger>
          <Tabs.Trigger value="sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="slots">With slots</Tabs.Trigger>
        </Tabs.List>

        {/* Theme Colors Tab - Variants × States */}
        <Tabs.Content value="theme">
          <Flex pt="6">
            <Grid
              columns="6"
              gap="3"
              style={{
                gridTemplateColumns: 'auto repeat(5, 1fr)',
                alignItems: 'center',
                justifyItems: 'stretch',
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
                Placeholder
              </Text>
              <Text size="2" color="gray" weight="medium">
                Disabled
              </Text>
              <Text size="2" color="gray" weight="medium">
                Read Only
              </Text>

              {variants.map((variant) => (
                <React.Fragment key={variant}>
                  <Text
                    size="2"
                    color="gray"
                    style={{ textAlign: 'right', textTransform: 'capitalize' }}
                  >
                    {variant}
                  </Text>
                  <TextField.Root variant={variant} size="2" defaultValue="Accent color" />
                  <TextField.Root
                    variant={variant}
                    size="2"
                    color="gray"
                    defaultValue="Gray color"
                  />
                  <TextField.Root variant={variant} size="2" placeholder="Enter text..." />
                  <TextField.Root
                    variant={variant}
                    size="2"
                    disabled
                    defaultValue="Disabled field"
                  />
                  <TextField.Root
                    variant={variant}
                    size="2"
                    readOnly
                    defaultValue="Read only field"
                  />
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
                columns="4"
                gap="3"
                style={{
                  gridTemplateColumns: 'auto repeat(3, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'stretch',
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

                {allColors.map((color) => (
                  <React.Fragment key={color}>
                    <Text
                      size="2"
                      color="gray"
                      style={{ textAlign: 'right', textTransform: 'capitalize' }}
                    >
                      {color}
                    </Text>
                    {variants.map((variant) => (
                      <TextField.Root
                        key={`${color}-${variant}`}
                        variant={variant}
                        color={color}
                        size="2"
                        defaultValue={`${color} ${variant}`}
                      />
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
                Size Variations
              </Text>
              <Grid
                columns="6"
                gap="3"
                style={{
                  gridTemplateColumns: 'auto repeat(5, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'stretch',
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
                      <TextField.Root
                        key={`${size}-${radius.key}`}
                        size={size}
                        radius={radius.key}
                        color="blue"
                        placeholder={`Size ${size}, ${radius.label} radius`}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* Slots Tab - Left and Right Slots */}
        <Tabs.Content value="slots">
          <Flex pt="6" direction="column" gap="8">
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                With Icons and Content
              </Text>
              <Grid
                columns="2"
                gap="4"
                style={{
                  gridTemplateColumns: '1fr 1fr',
                  alignItems: 'start',
                }}
              >
                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Left Slots
                  </Text>

                  <TextField.Root placeholder="Search...">
                    <TextField.Slot side="left">
                      <Search size={16} />
                    </TextField.Slot>
                  </TextField.Root>

                  <TextField.Root placeholder="Username">
                    <TextField.Slot side="left">
                      <User size={16} />
                    </TextField.Slot>
                  </TextField.Root>

                  <TextField.Root type="email" placeholder="Email address">
                    <TextField.Slot side="left">
                      <Mail size={16} />
                    </TextField.Slot>
                  </TextField.Root>

                  <TextField.Root type="password" placeholder="Password">
                    <TextField.Slot side="left">
                      <Lock size={16} />
                    </TextField.Slot>
                  </TextField.Root>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Right Slots
                  </Text>

                  <TextField.Root placeholder="Search query">
                    <TextField.Slot side="right">
                      <Search size={16} />
                    </TextField.Slot>
                  </TextField.Root>

                  <TextField.Root placeholder="Enter amount">
                    <TextField.Slot side="right">
                      <Text size="2" color="gray">
                        USD
                      </Text>
                    </TextField.Slot>
                  </TextField.Root>

                  <TextField.Root placeholder="Percentage">
                    <TextField.Slot side="right">
                      <Text size="2" color="gray">
                        %
                      </Text>
                    </TextField.Slot>
                  </TextField.Root>

                  <TextField.Root placeholder="Website URL">
                    <TextField.Slot side="right">
                      <Text size="2" color="gray">
                        .com
                      </Text>
                    </TextField.Slot>
                  </TextField.Root>
                </Flex>
              </Grid>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Both Left and Right Slots
              </Text>
              <Grid
                columns="1"
                gap="3"
                style={{
                  maxWidth: '400px',
                }}
              >
                <TextField.Root placeholder="Search with clear">
                  <TextField.Slot side="left">
                    <Search size={16} />
                  </TextField.Slot>
                  <TextField.Slot side="right">
                    <Text size="1" color="gray">
                      ⌘K
                    </Text>
                  </TextField.Slot>
                </TextField.Root>

                <TextField.Root placeholder="0.00">
                  <TextField.Slot side="left">
                    <Text size="2" color="gray">
                      $
                    </Text>
                  </TextField.Slot>
                  <TextField.Slot side="right">
                    <Text size="2" color="gray">
                      USD
                    </Text>
                  </TextField.Slot>
                </TextField.Root>

                <TextField.Root placeholder="example">
                  <TextField.Slot side="left">
                    <Text size="2" color="gray">
                      https://
                    </Text>
                  </TextField.Slot>
                  <TextField.Slot side="right">
                    <Text size="2" color="gray">
                      .com
                    </Text>
                  </TextField.Slot>
                </TextField.Root>
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
