import React from 'react';
import { Select, Flex, Grid, Heading, Text, Tabs } from '@kushagradhawan/kookie-ui';

export function SelectExample() {
  const triggerVariants = ['classic', 'surface', 'soft', 'ghost'] as const;
  const contentVariants = ['solid', 'soft'] as const;
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

  const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'strawberry', label: 'Strawberry' },
  ];

  const countries = [
    { value: 'us', label: 'United States', group: 'North America' },
    { value: 'ca', label: 'Canada', group: 'North America' },
    { value: 'mx', label: 'Mexico', group: 'North America' },
    { value: 'uk', label: 'United Kingdom', group: 'Europe' },
    { value: 'fr', label: 'France', group: 'Europe' },
    { value: 'de', label: 'Germany', group: 'Europe' },
    { value: 'jp', label: 'Japan', group: 'Asia' },
    { value: 'kr', label: 'South Korea', group: 'Asia' },
    { value: 'cn', label: 'China', group: 'Asia' },
  ];

  const groupedCountries = countries.reduce(
    (acc, country) => {
      if (!acc[country.group]) {
        acc[country.group] = [];
      }
      acc[country.group].push(country);
      return acc;
    },
    {} as Record<string, typeof countries>,
  );

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="1">
        <Heading size="5">Select</Heading>
        <Text size="2" color="gray">
          Choose from a list of options with various trigger and content styles.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="theme">
        <Tabs.List>
          <Tabs.Trigger value="theme">Theme colors</Tabs.Trigger>
          <Tabs.Trigger value="all">All colors</Tabs.Trigger>
          <Tabs.Trigger value="sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="content">Content variants</Tabs.Trigger>
          <Tabs.Trigger value="grouped">Grouped options</Tabs.Trigger>
        </Tabs.List>

        {/* Theme Colors Tab - Trigger Variants × States */}
        <Tabs.Content value="theme">
          <Flex pt="6">
            <Grid
              columns="5"
              gap="3"
              style={{
                gridTemplateColumns: 'auto repeat(4, 1fr)',
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

              {triggerVariants.map((variant) => (
                <React.Fragment key={variant}>
                  <Text
                    size="2"
                    color="gray"
                    style={{ textAlign: 'right', textTransform: 'capitalize' }}
                  >
                    {variant}
                  </Text>
                  <Select.Root size="2" defaultValue="apple">
                    <Select.Trigger variant={variant} />
                    <Select.Content>
                      {fruits.map((fruit) => (
                        <Select.Item key={fruit.value} value={fruit.value}>
                          {fruit.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <Select.Root size="2" defaultValue="banana">
                    <Select.Trigger variant={variant} color="gray" />
                    <Select.Content>
                      {fruits.map((fruit) => (
                        <Select.Item key={fruit.value} value={fruit.value}>
                          {fruit.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <Select.Root size="2">
                    <Select.Trigger variant={variant} placeholder="Select fruit..." />
                    <Select.Content>
                      {fruits.map((fruit) => (
                        <Select.Item key={fruit.value} value={fruit.value}>
                          {fruit.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <Select.Root size="2" disabled>
                    <Select.Trigger variant={variant} placeholder="Disabled" />
                    <Select.Content>
                      {fruits.map((fruit) => (
                        <Select.Item key={fruit.value} value={fruit.value}>
                          {fruit.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </React.Fragment>
              ))}
            </Grid>
          </Flex>
        </Tabs.Content>

        {/* All Colors Tab - Colors × Trigger Variants */}
        <Tabs.Content value="all">
          <Flex pt="6" direction="column" gap="8">
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Normal
              </Text>
              <Grid
                columns="5"
                gap="3"
                style={{
                  gridTemplateColumns: 'auto repeat(4, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'stretch',
                }}
              >
                <div></div>
                {triggerVariants.map((variant) => (
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
                    {triggerVariants.map((variant) => (
                      <Select.Root key={`${color}-${variant}`} size="2" defaultValue="apple">
                        <Select.Trigger variant={variant} color={color} />
                        <Select.Content>
                          {fruits.map((fruit) => (
                            <Select.Item key={fruit.value} value={fruit.value}>
                              {fruit.label}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
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
                      <Select.Root key={`${size}-${radius.key}`} size={size} defaultValue="orange">
                        <Select.Trigger radius={radius.key} color="blue" />
                        <Select.Content>
                          {fruits.map((fruit) => (
                            <Select.Item key={fruit.value} value={fruit.value}>
                              {fruit.label}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
                    ))}
                  </React.Fragment>
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* Content Variants Tab */}
        <Tabs.Content value="content">
          <Flex pt="6" direction="column" gap="8">
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Content Style Variations
              </Text>
              <Grid
                columns="3"
                gap="4"
                style={{
                  gridTemplateColumns: 'auto repeat(2, 1fr)',
                  alignItems: 'center',
                  justifyItems: 'stretch',
                }}
              >
                <div></div>
                {contentVariants.map((variant) => (
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

                <Text size="2" color="gray" style={{ textAlign: 'right' }}>
                  Default
                </Text>
                {contentVariants.map((variant) => (
                  <Select.Root key={`default-${variant}`} size="2" defaultValue="apple">
                    <Select.Trigger />
                    <Select.Content variant={variant}>
                      {fruits.map((fruit) => (
                        <Select.Item key={fruit.value} value={fruit.value}>
                          {fruit.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                ))}

                <Text size="2" color="gray" style={{ textAlign: 'right' }}>
                  Blue
                </Text>
                {contentVariants.map((variant) => (
                  <Select.Root key={`blue-${variant}`} size="2" defaultValue="banana">
                    <Select.Trigger color="blue" />
                    <Select.Content variant={variant} color="blue">
                      {fruits.map((fruit) => (
                        <Select.Item key={fruit.value} value={fruit.value}>
                          {fruit.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                ))}

                <Text size="2" color="gray" style={{ textAlign: 'right' }}>
                  High Contrast
                </Text>
                {contentVariants.map((variant) => (
                  <Select.Root key={`hc-${variant}`} size="2" defaultValue="grape">
                    <Select.Trigger color="crimson" />
                    <Select.Content variant={variant} color="crimson" highContrast>
                      {fruits.map((fruit) => (
                        <Select.Item key={fruit.value} value={fruit.value}>
                          {fruit.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* Grouped Options Tab */}
        <Tabs.Content value="grouped">
          <Flex pt="6" direction="column" gap="8">
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Grouped Options
              </Text>
              <Grid
                columns="2"
                gap="4"
                style={{
                  gridTemplateColumns: '1fr 1fr',
                  alignItems: 'start',
                }}
              >
                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    Basic Groups
                  </Text>
                  <Select.Root size="2" defaultValue="us">
                    <Select.Trigger placeholder="Select country..." />
                    <Select.Content>
                      {Object.entries(groupedCountries).map(([group, countries]) => (
                        <Select.Group key={group}>
                          <Select.Label>{group}</Select.Label>
                          {countries.map((country) => (
                            <Select.Item key={country.value} value={country.value}>
                              {country.label}
                            </Select.Item>
                          ))}
                        </Select.Group>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    With Separators
                  </Text>
                  <Select.Root size="2">
                    <Select.Trigger color="purple" placeholder="Select option..." />
                    <Select.Content color="purple">
                      <Select.Group>
                        <Select.Label>Fruits</Select.Label>
                        <Select.Item value="apple">Apple</Select.Item>
                        <Select.Item value="banana">Banana</Select.Item>
                        <Select.Item value="orange">Orange</Select.Item>
                      </Select.Group>
                      <Select.Separator />
                      <Select.Group>
                        <Select.Label>Vegetables</Select.Label>
                        <Select.Item value="carrot">Carrot</Select.Item>
                        <Select.Item value="potato">Potato</Select.Item>
                        <Select.Item value="onion">Onion</Select.Item>
                      </Select.Group>
                      <Select.Separator />
                      <Select.Group>
                        <Select.Label>Grains</Select.Label>
                        <Select.Item value="rice">Rice</Select.Item>
                        <Select.Item value="wheat">Wheat</Select.Item>
                        <Select.Item value="oats">Oats</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Grid>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Different Styles
              </Text>
              <Grid
                columns="3"
                gap="4"
                style={{
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  alignItems: 'start',
                }}
              >
                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    Ghost Trigger
                  </Text>
                  <Select.Root size="2" defaultValue="apple">
                    <Select.Trigger variant="ghost" color="green" />
                    <Select.Content variant="soft" color="green">
                      {fruits.map((fruit) => (
                        <Select.Item key={fruit.value} value={fruit.value}>
                          {fruit.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    Soft Trigger
                  </Text>
                  <Select.Root size="2" defaultValue="banana">
                    <Select.Trigger variant="soft" color="orange" />
                    <Select.Content variant="solid" color="orange">
                      {fruits.map((fruit) => (
                        <Select.Item key={fruit.value} value={fruit.value}>
                          {fruit.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    Classic Trigger
                  </Text>
                  <Select.Root size="2" defaultValue="grape">
                    <Select.Trigger variant="classic" color="red" />
                    <Select.Content variant="solid" color="red" highContrast>
                      {fruits.map((fruit) => (
                        <Select.Item key={fruit.value} value={fruit.value}>
                          {fruit.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
