import React from 'react';
import { Image, Flex, Grid, Heading, Text, Tabs, AspectRatio } from '@kushagradhawan/kookie-ui';

export function ImageExample() {
  const fitOptions = ['cover', 'contain', 'fill', 'scale-down', 'none'] as const;
  const shadowOptions = ['1', '2', '3', '4', '5', '6'] as const;
  const radiusOptions = [
    { key: 'none', label: 'No radius' },
    { key: 'small', label: 'Small' },
    { key: 'medium', label: 'Medium' },
    { key: 'large', label: 'Large' },
    { key: 'full', label: 'Full' },
  ] as const;

  // Sample images - using local images
  const sampleImages = {
    landscape: '/images/test-image-7.jpg',
    portrait: '/images/test-image-7.jpg',
    square: '/images/test-image-7.jpg',
    wide: '/images/test-image-7.jpg',
  };

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="1">
        <Heading size="5">Image</Heading>
        <Text size="2" color="gray">
          Display images with responsive sizing, object-fit, shadows, and radius options.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="basic">
        <Tabs.List>
          <Tabs.Trigger value="basic">Basic usage</Tabs.Trigger>
          <Tabs.Trigger value="variants">Variants</Tabs.Trigger>
          <Tabs.Trigger value="aschild">As another element</Tabs.Trigger>
          <Tabs.Trigger value="fit">Object fit</Tabs.Trigger>
          <Tabs.Trigger value="shadows">Shadows</Tabs.Trigger>
          <Tabs.Trigger value="radius">Radius</Tabs.Trigger>
          <Tabs.Trigger value="aspect-ratio">With AspectRatio</Tabs.Trigger>
        </Tabs.List>

        {/* Basic Usage Tab */}
        <Tabs.Content value="basic">
          <Flex pt="6" direction="column" gap="4">
            <Text size="3" weight="medium">
              Basic Examples
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
                  Fixed dimensions
                </Text>
                <Image
                  src={sampleImages.landscape}
                  alt="Beautiful landscape"
                  width="200px"
                  height="150px"
                  fit="cover"
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" color="gray" weight="medium">
                  Responsive width
                </Text>
                <Image
                  src={sampleImages.portrait}
                  alt="Nature photo"
                  width="100%"
                  height="150px"
                  fit="cover"
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text size="2" color="gray" weight="medium">
                  With radius & shadow
                </Text>
                <Image
                  src={sampleImages.square}
                  alt="Scenic view"
                  width="150px"
                  height="150px"
                  radius="medium"
                  shadow="3"
                  fit="cover"
                />
              </Flex>
            </Grid>
          </Flex>
        </Tabs.Content>

        {/* Variants Tab */}
        <Tabs.Content value="variants">
          <Flex pt="6" direction="column" gap="4">
            <Text size="3" weight="medium">
              Image Variants
            </Text>
            <Grid
              columns="2"
              gap="6"
              style={{
                gridTemplateColumns: 'repeat(2, 1fr)',
                alignItems: 'start',
              }}
            >
              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Surface
                </Text>
                <Image
                  src={sampleImages.landscape}
                  alt="Surface variant"
                  width="100%"
                  height="180px"
                  variant="surface"
                  fit="cover"
                  shadow="2"
                />
                <Text size="1" color="gray">
                  variant="surface"
                </Text>
              </Flex>

              <Flex direction="column" gap="3">
                <Text size="2" color="gray" weight="medium">
                  Blur
                </Text>
                <Image
                  src={sampleImages.landscape}
                  alt="Blur variant"
                  width="100%"
                  height="180px"
                  variant="blur"
                  fit="cover"
                />
                <Text size="1" color="gray">
                  variant="blur"
                </Text>
              </Flex>
            </Grid>

            <Flex direction="column" gap="3" mt="4">
              <Text size="2" weight="medium">
                Blur variant with radius
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
                    Small radius
                  </Text>
                  <Image
                    src={sampleImages.landscape}
                    alt="Blur with small radius"
                    width="100%"
                    height="150px"
                    variant="blur"
                    radius="small"
                    fit="cover"
                  />
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    Medium radius
                  </Text>
                  <Image
                    src={sampleImages.landscape}
                    alt="Blur with medium radius"
                    width="100%"
                    height="150px"
                    variant="blur"
                    radius="medium"
                    fit="cover"
                  />
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    Large radius
                  </Text>
                  <Image
                    src={sampleImages.landscape}
                    alt="Blur with large radius"
                    width="100%"
                    height="150px"
                    variant="blur"
                    radius="large"
                    fit="cover"
                  />
                </Flex>
              </Grid>
            </Flex>

            <Flex direction="column" gap="3" mt="6">
              <Text size="2" weight="medium">
                Blur + Shadow combinations
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
                    Blur + Shadow 2
                  </Text>
                  <Text size="1" color="gray">
                    variant="blur" shadow="2"
                  </Text>
                  <Image
                    src={sampleImages.landscape}
                    alt="Blur with shadow 2"
                    width="100%"
                    height="150px"
                    variant="blur"
                    shadow="2"
                    radius="medium"
                    fit="cover"
                  />
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    Blur + Shadow 4
                  </Text>
                  <Text size="1" color="gray">
                    variant="blur" shadow="4"
                  </Text>
                  <Image
                    src={sampleImages.landscape}
                    alt="Blur with shadow 4"
                    width="100%"
                    height="150px"
                    variant="blur"
                    shadow="4"
                    radius="medium"
                    fit="cover"
                  />
                </Flex>

                <Flex direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    No shadow
                  </Text>
                  <Text size="1" color="gray">
                    variant="blur" only
                  </Text>
                  <Image
                    src={sampleImages.landscape}
                    alt="Blur without shadow"
                    width="100%"
                    height="150px"
                    variant="blur"
                    radius="medium"
                    fit="cover"
                  />
                </Flex>
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* AsChild Tab */}
        <Tabs.Content value="aschild">
          <Flex pt="6" direction="column" gap="6">
            <Flex direction="column" gap="2">
              <Text size="3" weight="medium">
                As another element
              </Text>
              <Text size="2" color="gray">
                Use the asChild prop to render the image as a link or a button. This prop adds
                styles for the interactive states, like hover and focus.
              </Text>
            </Flex>

            <Flex direction="column" gap="4">
              <Text size="2" weight="medium">
                Interactive Examples
              </Text>
              <Grid
                columns="2"
                gap="6"
                style={{
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  alignItems: 'start',
                }}
              >
                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    As Link
                  </Text>
                  <Text size="1" color="gray">
                    Hover to see interactive states
                  </Text>
                  <Image
                    src={sampleImages.landscape}
                    alt="Clickable image"
                    width="100%"
                    height="160px"
                    fit="cover"
                    shadow="2"
                    asChild
                  >
                    <a href="#" />
                  </Image>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" color="gray" weight="medium">
                    Blur + Button
                  </Text>
                  <Text size="1" color="gray">
                    variant="blur" asChild
                  </Text>
                  <Image
                    src={sampleImages.landscape}
                    alt="Blur button"
                    width="100%"
                    height="160px"
                    fit="cover"
                    variant="blur"
                    shadow="3"
                    radius="medium"
                    asChild
                  >
                    <button onClick={() => alert('Blur button clicked!')} />
                  </Image>
                </Flex>
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* Object Fit Tab */}
        <Tabs.Content value="fit">
          <Flex pt="6" direction="column" gap="4">
            <Text size="3" weight="medium">
              Object Fit Options
            </Text>
            <Grid
              columns="5"
              gap="4"
              style={{
                gridTemplateColumns: 'repeat(5, 1fr)',
                alignItems: 'start',
              }}
            >
              {fitOptions.map((fit) => (
                <Flex key={fit} direction="column" gap="2">
                  <Text
                    size="2"
                    color="gray"
                    weight="medium"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {fit.replace('-', ' ')}
                  </Text>
                  <Image
                    src={sampleImages.landscape}
                    alt={`Object fit ${fit}`}
                    width="100%"
                    height="150px"
                    fit={fit}
                  />
                  <Text size="1" color="gray">
                    fit="{fit}"
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Flex>
        </Tabs.Content>

        {/* Shadows Tab */}
        <Tabs.Content value="shadows">
          <Flex pt="6" direction="column" gap="4">
            <Text size="3" weight="medium">
              Shadow Variations
            </Text>
            <Grid
              columns="6"
              gap="4"
              style={{
                gridTemplateColumns: 'repeat(6, 1fr)',
                alignItems: 'start',
              }}
            >
              {shadowOptions.map((shadow) => (
                <Flex key={shadow} direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    Shadow {shadow}
                  </Text>
                  <Image
                    src={sampleImages.square}
                    alt={`Shadow ${shadow}`}
                    width="100px"
                    height="100px"
                    shadow={shadow}
                    fit="cover"
                  />
                  <Text size="1" color="gray">
                    shadow="{shadow}"
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Flex>
        </Tabs.Content>

        {/* Radius Tab */}
        <Tabs.Content value="radius">
          <Flex pt="6" direction="column" gap="4">
            <Text size="3" weight="medium">
              Border Radius Options
            </Text>
            <Grid
              columns="5"
              gap="4"
              style={{
                gridTemplateColumns: 'repeat(5, 1fr)',
                alignItems: 'start',
              }}
            >
              {radiusOptions.map((radius) => (
                <Flex key={radius.key} direction="column" gap="2">
                  <Text size="2" color="gray" weight="medium">
                    {radius.label}
                  </Text>
                  <Image
                    src={sampleImages.square}
                    alt={`Radius ${radius.label}`}
                    width="120px"
                    height="120px"
                    radius={radius.key}
                    shadow="2"
                    fit="cover"
                  />
                  <Text size="1" color="gray">
                    radius="{radius.key}"
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Flex>
        </Tabs.Content>

        {/* AspectRatio Tab */}
        <Tabs.Content value="aspect-ratio">
          <Flex pt="6" direction="column" gap="6">
            <Text size="3" weight="medium">
              Image with AspectRatio
            </Text>

            <Flex direction="column" gap="4">
              <Text size="2" color="gray">
                Use AspectRatio to maintain consistent proportions across different screen sizes.
              </Text>

              <Grid
                columns="2"
                gap="6"
                style={{
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  alignItems: 'start',
                }}
              >
                <Flex direction="column" gap="3">
                  <Text size="2" weight="medium">
                    16:9 Aspect Ratio
                  </Text>
                  <Text size="1" color="gray">
                    Perfect for video thumbnails
                  </Text>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={sampleImages.wide}
                      alt="16:9 aspect ratio image"
                      width="100%"
                      height="100%"
                      fit="cover"
                      shadow="2"
                    />
                  </AspectRatio>
                </Flex>

                <Flex direction="column" gap="3">
                  <Text size="2" weight="medium">
                    1:1 Aspect Ratio
                  </Text>
                  <Text size="1" color="gray">
                    Great for social media posts
                  </Text>
                  <AspectRatio ratio={1}>
                    <Image
                      src={sampleImages.square}
                      alt="1:1 aspect ratio image"
                      width="100%"
                      height="100%"
                      fit="cover"
                      radius="medium"
                      shadow="2"
                    />
                  </AspectRatio>
                </Flex>
              </Grid>
            </Flex>

            <Flex direction="column" gap="4">
              <Text size="2" weight="medium">
                Different Ratios Comparison
              </Text>
              <Grid
                columns="4"
                gap="4"
                style={{
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  alignItems: 'start',
                }}
              >
                {[
                  { ratio: 4 / 3, label: '4:3' },
                  { ratio: 3 / 2, label: '3:2' },
                  { ratio: 16 / 9, label: '16:9' },
                  { ratio: 21 / 9, label: '21:9' },
                ].map(({ ratio, label }) => (
                  <Flex key={label} direction="column" gap="2">
                    <Text size="2" color="gray" weight="medium">
                      {label}
                    </Text>
                    <AspectRatio ratio={ratio}>
                      <Image
                        src={sampleImages.landscape}
                        alt={`${label} aspect ratio`}
                        width="100%"
                        height="100%"
                        fit="cover"
                        shadow="1"
                      />
                    </AspectRatio>
                  </Flex>
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
