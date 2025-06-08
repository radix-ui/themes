import React from 'react';
import { Button, Flex, Grid, Heading, Text, Tabs } from '@kushagradhawan/kookie-ui';
import { ChevronRight } from 'lucide-react';

export function ButtonExample() {
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

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="1">
        <Heading size="5">Button</Heading>
        <Text size="2" color="gray">
          Trigger an action or event, such as submitting a form or displaying a dialog.
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
              gap="3"
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

              {variants.map((variant) => (
                <React.Fragment key={variant}>
                  <Text
                    size="2"
                    color="gray"
                    style={{ textAlign: 'right', textTransform: 'capitalize' }}
                  >
                    {variant}
                  </Text>
                  <Button variant={variant} size="2">
                    Next <ChevronRight />
                  </Button>
                  <Button variant={variant} size="2" color="gray">
                    Next <ChevronRight />
                  </Button>
                  <Button variant={variant} size="2" highContrast>
                    Next <ChevronRight />
                  </Button>
                  <Button variant={variant} size="2" disabled>
                    Next <ChevronRight />
                  </Button>
                  <Button variant={variant} size="2" loading>
                    Next <ChevronRight />
                  </Button>
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
                gap="3"
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
                      <Button key={`${color}-${variant}`} variant={variant} color={color} size="2">
                        Next <ChevronRight />
                      </Button>
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
                gap="3"
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
                      <Button
                        key={`${color}-${variant}-hc`}
                        variant={variant}
                        color={color}
                        size="2"
                        highContrast
                      >
                        Next <ChevronRight />
                      </Button>
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
                      <Button
                        key={`${size}-${radius.key}`}
                        size={size}
                        radius={radius.key}
                        color="blue"
                      >
                        Next <ChevronRight />
                      </Button>
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
                      <Button
                        key={`${size}-${radius.key}-hc`}
                        size={size}
                        radius={radius.key}
                        color="blue"
                        highContrast
                      >
                        Next <ChevronRight />
                      </Button>
                    ))}
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
                Use the asChild prop to render the button as a link or other element. Use the as
                prop to change the underlying HTML element.
              </Text>
            </Flex>

            <Flex direction="column" gap="4">
              <Text size="2" weight="medium">
                Using asChild prop
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
                    Button as Link
                  </Text>
                  <Text size="1" color="gray">
                    asChild on a link element
                  </Text>
                  <Button variant="solid" size="2" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Visit External Site <ChevronRight />
                    </a>
                  </Button>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Ghost as Link
                  </Text>
                  <Text size="1" color="gray">
                    Subtle navigation
                  </Text>
                  <Button variant="ghost" size="2" color="blue" asChild>
                    <a href="#navigation">
                      Go to Section <ChevronRight />
                    </a>
                  </Button>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Outline as Link
                  </Text>
                  <Text size="1" color="gray">
                    Secondary action
                  </Text>
                  <Button variant="outline" size="2" asChild>
                    <a href="/docs">
                      Learn More <ChevronRight />
                    </a>
                  </Button>
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
                  <Button variant="soft" size="2" as="div" onClick={() => alert('Div clicked!')}>
                    Click Me <ChevronRight />
                  </Button>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Button as span
                  </Text>
                  <Text size="1" color="gray">
                    as="span" for inline
                  </Text>
                  <Button
                    variant="surface"
                    size="2"
                    as="span"
                    onClick={() => alert('Span clicked!')}
                  >
                    Inline Action <ChevronRight />
                  </Button>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Form submit
                  </Text>
                  <Text size="1" color="gray">
                    type="submit" for forms
                  </Text>
                  <Button
                    variant="classic"
                    size="2"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Form submitted!');
                    }}
                  >
                    Submit <ChevronRight />
                  </Button>
                </Flex>
              </Grid>
            </Flex>

            <Flex direction="column" gap="4">
              <Text size="2" weight="medium">
                Accessibility examples
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
                    Download link
                  </Text>
                  <Text size="1" color="gray">
                    Proper download semantics
                  </Text>
                  <Button variant="solid" color="green" size="2" asChild>
                    <a href="/file.pdf" download="document.pdf">
                      Download PDF <ChevronRight />
                    </a>
                  </Button>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    External link
                  </Text>
                  <Text size="1" color="gray">
                    Opens in new tab safely
                  </Text>
                  <Button variant="outline" color="blue" size="2" asChild>
                    <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                      External Link <ChevronRight />
                    </a>
                  </Button>
                </Flex>
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
