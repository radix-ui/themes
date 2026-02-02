import { StarIcon } from '@radix-ui/react-icons';
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Code,
  Container,
  Em,
  Flex,
  IconButton,
  Kbd,
  Quote,
  ScrollArea,
  Section,
  Strong,
  TabNav,
  Text,
} from '@radix-ui/themes';
import NextLink from 'next/link';

export default function Test() {
  return (
    <Container py="8" mx="4">
      <Section size="3">
        <Flex direction="column" gap="6">
          <Flex direction={{ initial: 'column', sm: 'row' }} align="center" gap="3">
            <Avatar fallback="A" />

            <Avatar asChild fallback="A">
              <button aria-label="Avatar button">some child</button>
            </Avatar>

            <Avatar
              fallback="A"
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=160&h=160&dpr=2&q=80"
            />

            <Avatar
              asChild
              fallback="A"
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=160&h=160&dpr=2&q=80"
            >
              <button aria-label="Avatar button" />
            </Avatar>

            <Badge asChild>
              <button>Badge as child</button>
            </Badge>

            <Card>Normal card</Card>

            <Card asChild>
              <button>Card as child</button>
            </Card>

            <Code asChild>
              <button>Code as child</button>
            </Code>
          </Flex>

          <Flex direction={{ initial: 'column', sm: 'row' }} gap="5">
            <TabNav.Root>
              <TabNav.Link href="#">Tab 1</TabNav.Link>
              <TabNav.Link href="#">Tab 2</TabNav.Link>
              <TabNav.Link href="#">Tab 3</TabNav.Link>
            </TabNav.Root>

            <TabNav.Root>
              <TabNav.Link asChild>
                <NextLink href="#">Next Link 1</NextLink>
              </TabNav.Link>
              <TabNav.Link asChild>
                <NextLink href="#">Next Link 2</NextLink>
              </TabNav.Link>
              <TabNav.Link asChild>
                <NextLink href="#">Next Link 3</NextLink>
              </TabNav.Link>
            </TabNav.Root>
          </Flex>

          <Flex direction={{ initial: 'column', sm: 'row' }} gap="5">
            <Box width="300px" height="300px">
              <ScrollArea asChild>
                <section>
                  <Text as="p">
                    The goal of typography is to relate font size, line height, and line width in a
                    proportional way that maximizes beauty and makes reading easier and more
                    pleasant. The question is: What proportion(s) will give us the best results? The
                    golden ratio is often observed in nature where beauty and utility intersect;
                    perhaps we can use this “divine” proportion to enhance these attributes in our
                    typography.
                  </Text>
                  <Text as="p" size="3">
                    The CSS rule <Code>-webkit-font-smoothing: antialiased;</Code> has been applied
                    to all fonts.google.com pages where fonts are rendered. This results in browsers
                    using the <Strong>grayscale antialiasing method</Strong> rather than default{' '}
                    <Em>subpixel rendering</Em> of fonts. Press <Kbd>⌘ Q</Kbd> to quit.{' '}
                    <Quote>
                      I believe this was probably introduced to get around inconsistencies in
                      rendering between browsers
                    </Quote>
                    , particular between Chrome and Safari on MacOS.
                  </Text>
                  <Box style={{ width: 300 }}>
                    <AspectRatio ratio={1}>
                      <img
                        src="https://images.unsplash.com/photo-1683122803696-b3da13b071b2?&auto=format&fit=crop&w=400&q=80"
                        alt="A dragonfly on a branch"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </AspectRatio>
                  </Box>
                </section>
              </ScrollArea>
            </Box>

            <Box asChild>
              <Text>Box as child</Text>
            </Box>
            <Box as="span">Box as span</Box>
            <Box>Box default</Box>
          </Flex>

          <Container asChild>
            <section>Container as child</section>
          </Container>

          <Flex wrap="wrap" width="100%" gap="3">
            <Button asChild>
              <NextLink href="#">Button as child</NextLink>
            </Button>
            <Button loading asChild>
              <NextLink href="#">Loading button as child</NextLink>
            </Button>
            <Button disabled asChild>
              <NextLink href="#">Disabled button as child</NextLink>
            </Button>
            <IconButton aria-label="Icon button as child" asChild>
              <NextLink href="#">
                <StarIcon />
              </NextLink>
            </IconButton>
            <IconButton aria-label="Loading icon button as child" loading asChild>
              <NextLink href="#">
                <StarIcon />
              </NextLink>
            </IconButton>
            <IconButton aria-label="Disabled icon button as child" disabled asChild>
              <NextLink href="#">
                <StarIcon />
              </NextLink>
            </IconButton>
          </Flex>

          <Flex wrap="wrap" width="100%" gap="3">
            <Button asChild>
              <div>Button as child</div>
            </Button>
            <Button loading asChild>
              <div>Loading button as child</div>
            </Button>
            <Button disabled asChild>
              <div>Disabled button as child</div>
            </Button>
            <IconButton aria-label="Icon button as child" asChild>
              <div>
                <StarIcon />
              </div>
            </IconButton>
            <IconButton aria-label="Loading icon button as child" loading asChild>
              <div>
                <StarIcon />
              </div>
            </IconButton>
            <IconButton aria-label="Disabled icon button as child" disabled asChild>
              <div>
                <StarIcon />
              </div>
            </IconButton>
          </Flex>
        </Flex>
      </Section>
    </Container>
  );
}
