import React from 'react';
import { TextArea, Flex, Grid, Heading, Text, Tabs } from '@kushagradhawan/kookie-ui';

export function TextAreaExample() {
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
  const resizeOptions = [
    { key: 'none', label: 'None' },
    { key: 'vertical', label: 'Vertical' },
    { key: 'horizontal', label: 'Horizontal' },
    { key: 'both', label: 'Both' },
  ] as const;

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="1">
        <Heading size="5">TextArea</Heading>
        <Text size="2" color="gray">
          Multi-line text input with various styles, sizes, and resize options.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="theme">
        <Tabs.List>
          <Tabs.Trigger value="theme">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all">All colors</Tabs.Trigger>
          <Tabs.Trigger value="sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="resize">Resize options</Tabs.Trigger>
        </Tabs.List>

        {/* Theme Colors Tab - Variants × States */}
        <Tabs.Content value="theme">
          <Flex pt="6">
            <Grid
              columns="6"
              gap="3"
              style={{
                gridTemplateColumns: 'auto repeat(5, 1fr)',
                alignItems: 'start',
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
                  <TextArea
                    variant={variant}
                    size="2"
                    defaultValue="This is the accent color variant with some example text content."
                    rows={3}
                  />
                  <TextArea
                    variant={variant}
                    size="2"
                    color="gray"
                    defaultValue="This is the gray color variant with example content."
                    rows={3}
                    style={{ padding: '12px 8px' }}
                  />
                  <TextArea
                    variant={variant}
                    size="2"
                    placeholder="Enter your text here..."
                    rows={3}
                  />
                  <TextArea
                    variant={variant}
                    size="2"
                    disabled
                    defaultValue="This field is disabled and cannot be edited."
                    rows={3}
                  />
                  <TextArea
                    variant={variant}
                    size="2"
                    readOnly
                    defaultValue="This field is read-only and cannot be modified."
                    rows={3}
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
                  alignItems: 'start',
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
                      <TextArea
                        key={`${color}-${variant}`}
                        variant={variant}
                        color={color}
                        size="2"
                        defaultValue={`This is a ${color} ${variant} textarea with some example content to show the styling.`}
                        rows={3}
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
                  alignItems: 'start',
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
                      <TextArea
                        key={`${size}-${radius.key}`}
                        size={size}
                        radius={radius.key}
                        color="blue"
                        placeholder={`Size ${size} with ${radius.label.toLowerCase()} radius. This is a textarea component.`}
                        rows={4}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* Resize Options Tab */}
        <Tabs.Content value="resize">
          <Flex pt="6" direction="column" gap="8">
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Resize Behavior
              </Text>
              <Grid
                columns="2"
                gap="4"
                style={{
                  gridTemplateColumns: '1fr 1fr',
                  alignItems: 'start',
                }}
              >
                {resizeOptions.map((resizeOption) => (
                  <Flex key={resizeOption.key} direction="column" gap="2">
                    <Text size="2" color="gray" weight="medium">
                      {resizeOption.label}
                    </Text>
                    <TextArea
                      resize={resizeOption.key}
                      placeholder={`This textarea can be resized ${resizeOption.label.toLowerCase()}. Try dragging the resize handle in the bottom-right corner.`}
                      rows={4}
                      defaultValue={`Resize: ${resizeOption.label}\n\nThis textarea demonstrates the ${resizeOption.label.toLowerCase()} resize behavior. You can adjust its dimensions by dragging the resize handle.`}
                    />
                  </Flex>
                ))}
              </Grid>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Different Sizes with Resize
              </Text>
              <Grid
                columns="3"
                gap="4"
                style={{
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  alignItems: 'start',
                }}
              >
                {sizes.map((size) => (
                  <Flex key={size} direction="column" gap="2">
                    <Text size="2" color="gray" weight="medium">
                      Size {size}
                    </Text>
                    <TextArea
                      size={size}
                      resize="both"
                      placeholder={`Size ${size} with both resize enabled`}
                      rows={3}
                      defaultValue={`This is size ${size} with resize enabled in both directions.`}
                    />
                  </Flex>
                ))}
              </Grid>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Fixed Height Examples
              </Text>
              <Grid
                columns="1"
                gap="4"
                style={{
                  maxWidth: '600px',
                }}
              >
                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    Auto-expanding (no resize)
                  </Text>
                  <TextArea
                    resize="none"
                    placeholder="This textarea cannot be resized manually"
                    rows={2}
                    defaultValue="Fixed size textarea that cannot be resized by the user."
                  />
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    Large content area
                  </Text>
                  <TextArea
                    resize="vertical"
                    placeholder="Enter detailed information..."
                    rows={6}
                    defaultValue="This is a larger textarea with vertical resize enabled. Perfect for longer content like descriptions, comments, or detailed feedback."
                  />
                </Flex>
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
