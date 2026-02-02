import {
  Blockquote,
  Box,
  Button,
  Code,
  Em,
  Flex,
  Grid,
  Heading,
  Kbd,
  Link,
  Quote,
  Separator,
  Strong,
  Text,
} from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function TypographyPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Typography</DocsSectionHeading>
      <DocsSectionBody>
        <Flex direction="column" gap="5" style={{ maxWidth: 688 }}>
          <Text as="p" size="3">
            The CSS rule <Code>-webkit-font-smoothing: antialiased;</Code> has been applied to all
            fonts.google.com pages where fonts are rendered. This results in browsers using the{' '}
            <Strong>greyscale antialiasing method</Strong> rather than default{' '}
            <Em>subpixel rendering</Em> of fonts. Press <Kbd>⌘ Q</Kbd> to quit.{' '}
            <Quote>
              I believe this was probably introduced to get around inconsistencies in rendering
              between browsers
            </Quote>
            , particular between Chrome and Safari on MacOS.
          </Text>

          <Heading size="9">
            The principles of the Typographic Craft are difficult to master
          </Heading>

          <Heading size="8">
            The goal of typography is to relate font size, line height, and line width
          </Heading>

          <Heading size="7">
            The goal of typography is to relate font size, line height, and line width in a
            proportional way
          </Heading>

          <Heading size="6">
            The goal of typography is to relate font size, line height, and line width in a
            proportional way
          </Heading>

          <Text color="gray" size="5">
            The goal of typography is to relate font size, line height, and line width in a
            proportional way that maximizes beauty and makes reading easier and more pleasant.
          </Text>

          <Text as="p" size="4">
            The goal of typography is to relate font size, line height, and line width in a
            proportional way that maximizes beauty and makes reading easier and more pleasant. The
            question is: What proportion(s) will give us the best results? The golden ratio is often
            observed in nature where beauty and utility intersect; perhaps we can use this
            &quot;divine&quot; proportion to enhance these attributes in our typography.
          </Text>

          <Text as="p" size="3" style={{ maxWidth: 600 }}>
            The goal of typography is to relate font size, line height, and line width in a
            proportional way that maximizes beauty and makes reading easier and more pleasant. The
            question is: What proportion(s) will give us the best results? The golden ratio is often
            observed in nature where beauty and utility intersect; perhaps we can use this
            &quot;divine&quot; proportion to enhance these attributes in our typography.
          </Text>

          <Grid columns="2" gap="5">
            <Text as="p" size="2" style={{ maxWidth: 400 }}>
              The goal of typography is to relate font size, line height, and line width in a
              proportional way that maximizes beauty and makes reading easier and more pleasant. The
              question is: What proportion(s) will give us the best results? The golden ratio is
              often observed in nature where beauty and utility intersect; perhaps we can use this
              &quot;divine&quot; proportion to enhance these attributes in our typography.
            </Text>

            <Text as="p" size="1" style={{ maxWidth: 400 }}>
              The goal of typography is to relate font size, line height, and line width in a
              proportional way that maximizes beauty and makes reading easier and more pleasant. The
              question is: What proportion(s) will give us the best results? The golden ratio is
              often observed in nature where beauty and utility intersect; perhaps we can use this
              &quot;divine&quot; proportion to enhance these attributes in our typography.
            </Text>
          </Grid>

          <Separator size="3" my="5" />

          <Flex gap="4" mb="5">
            <Link color="purple" href="/">
              This is a link
            </Link>
            <Link color="gray" href="/">
              This is a link
            </Link>
            <Link color="green" href="/">
              This is a link
            </Link>
            <Link color="red" href="/">
              This is a link
            </Link>
            <Link color="yellow" href="/">
              This is a link
            </Link>
            <Link color="blue" href="/">
              This is a link
            </Link>
          </Flex>
          <Flex gap="4" mb="5">
            <Link color="purple" highContrast href="/">
              This is a link
            </Link>
            <Link color="gray" highContrast href="/">
              This is a link
            </Link>
            <Link color="green" highContrast href="/">
              This is a link
            </Link>
            <Link color="red" highContrast href="/">
              This is a link
            </Link>
            <Link color="yellow" highContrast href="/">
              This is a link
            </Link>
            <Link color="blue" highContrast href="/">
              This is a link
            </Link>
          </Flex>

          <Separator size="3" my="5" />

          <Box style={{ width: '55%' }}>
            <Heading size="5" mb="2">
              The principles of the Typographic Craft are difficult to master
            </Heading>
            <Text as="p" size="4">
              The goal of typography is to relate font size, line height, and line width in a
              proportional way that maximizes beauty and makes reading easier and more pleasant.
            </Text>
          </Box>

          <Grid columns="2" gap="5" mb="7">
            <Box>
              <Heading size="4" mb="2">
                The principles of the Typographic Craft are difficult to master
              </Heading>
              <Text as="p" size="3">
                The goal of typography is to relate font size, line height, and line width in a
                proportional way that maximizes beauty and makes reading easier and more pleasant.
              </Text>
            </Box>
            <Box>
              <Heading size="3" mb="2">
                The principles of the Typographic Craft are difficult to master
              </Heading>
              <Text as="p" size="2">
                The goal of typography is to relate font size, line height, and line width in a
                proportional way that maximizes beauty and makes reading easier and more pleasant.
              </Text>
            </Box>
          </Grid>

          <Grid columns="3" gap="5">
            <Box>
              <Heading size="2" mb="1">
                The principles of the Typographic Craft are difficult to master
              </Heading>
              <Text as="p" size="2">
                The goal of typography is to relate font size, line height, and line width in a
                proportional way that maximizes beauty and makes reading easier and more pleasant.
              </Text>
            </Box>
            <Box>
              <Heading size="2" mb="1">
                The principles of the Typographic Craft are difficult to master
              </Heading>
              <Text as="p" size="1">
                The goal of typography is to relate font size, line height, and line width in a
                proportional way that maximizes beauty and makes reading easier and more pleasant.
              </Text>
            </Box>
            <Box>
              <Heading size="1" mb="1">
                The principles of the Typographic Craft are difficult to master
              </Heading>
              <Text as="p" size="1">
                The goal of typography is to relate font size, line height, and line width in a
                proportional way that maximizes beauty and makes reading easier and more pleasant.
              </Text>
            </Box>
          </Grid>

          <Separator size="3" my="5" />

          <Grid columns="2" gap="5">
            <Box style={{ maxWidth: 250 }}>
              <Text as="p" size="1" weight="bold">
                Quick Look
              </Text>
              <Text as="p" color="gray" size="1">
                Extensions from added software
              </Text>
            </Box>
            <Box style={{ maxWidth: 250 }}>
              <Text as="p" size="2" weight="bold">
                Quick Look
              </Text>
              <Text as="p" color="gray" size="1">
                Extensions from added software
              </Text>
            </Box>
          </Grid>
          <Grid columns="2" gap="5">
            <Box style={{ maxWidth: 250 }}>
              <Text as="p" size="2" weight="bold">
                Quick Look
              </Text>
              <Text as="p" color="gray" size="2">
                Extensions from added software
              </Text>
            </Box>
            <Box style={{ maxWidth: 250 }}>
              <Text as="p" size="3" weight="bold">
                Quick Look
              </Text>
              <Text as="p" color="gray" size="2">
                Extensions from added software
              </Text>
            </Box>
          </Grid>

          <Separator size="3" my="5" />

          <Grid columns="2" gap="5">
            <Box style={{ maxWidth: 250 }}>
              <Text as="p" size="1" weight="bold">
                Quick Look
              </Text>
              <Text as="p" color="gray" size="1">
                Extensions from added software for something to do with Apple Finder.
              </Text>
            </Box>
            <Box style={{ maxWidth: 250 }}>
              <Text as="p" size="2" weight="bold">
                Quick Look
              </Text>
              <Text as="p" color="gray" size="1">
                Extensions from added software for something to do with Apple Finder.
              </Text>
            </Box>
          </Grid>

          <Grid columns="2" gap="5">
            <Box style={{ maxWidth: 250 }}>
              <Text as="p" size="2" weight="bold">
                Quick Look
              </Text>
              <Text as="p" color="gray" size="2">
                Extensions from added software for something to do with Apple Finder.
              </Text>
            </Box>
            <Box style={{ maxWidth: 250 }}>
              <Text as="p" size="3" weight="bold">
                Quick Look
              </Text>
              <Text as="p" color="gray" size="2">
                Extensions from added software for something to do with Apple Finder.
              </Text>
            </Box>
          </Grid>

          <Separator size="3" my="5" />

          <Grid columns="2" gap="5">
            <Box style={{ maxWidth: 250, textAlign: 'center' }}>
              <Button variant="solid" size="1" mb="1">
                Quick Look
              </Button>
              <Text as="p" color="gray" size="1">
                Verification needed
              </Text>
            </Box>
            <Box style={{ maxWidth: 250, textAlign: 'center' }}>
              <Button variant="solid" size="2" mb="1">
                Quick Look
              </Button>
              <Text as="p" color="gray" size="1">
                Verification needed
              </Text>
            </Box>
            <Box style={{ maxWidth: 250, textAlign: 'center' }}>
              <Button variant="solid" size="1" mb="1">
                Quick Look
              </Button>
              <Text as="p" color="gray" size="2">
                Verification needed
              </Text>
            </Box>
            <Box style={{ maxWidth: 250, textAlign: 'center' }}>
              <Button variant="solid" size="2" mb="1">
                Quick Look
              </Button>
              <Text as="p" color="gray" size="2">
                Verification needed
              </Text>
            </Box>
          </Grid>

          <Separator size="3" my="5" />

          <Blockquote>
            The CSS rule <Code>-webkit-font-smoothing: antialiased;</Code> has been applied to all
            fonts.google.com pages where fonts are rendered. This results in browsers using the{' '}
            <strong>greyscale antialiasing method</strong> rather than default{' '}
            <Em>subpixel rendering</Em> of fonts. Press <Kbd>⌘ Q</Kbd> to quit.{' '}
            <Quote>
              I believe this was probably introduced to get around inconsistencies in rendering
              between browsers
            </Quote>
            , particular between Chrome and Safari on MacOS.
          </Blockquote>
        </Flex>
      </DocsSectionBody>
    </DocsSection>
  );
}
