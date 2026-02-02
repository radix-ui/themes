import { Fragment } from 'react';
import { Text, Container, Section, RadioCards, Heading, Box, Separator } from '@radix-ui/themes';
import { radioCardsRootPropDefs } from '@radix-ui/themes/props';
import { CrumpledPaperIcon, CubeIcon, GlobeIcon, VercelLogoIcon } from '@radix-ui/react-icons';

export default function Test() {
  return (
    <Container py="8" mx="4" size="3">
      {radioCardsRootPropDefs.size.values.map((size) => (
        <Fragment key={size}>
          <Section size="3">
            <Heading mb="5">Size {size}</Heading>
            <Box mb="7">
              <Text as="div" color="gray" size="2" mb="3">
                Plain text
              </Text>
              <RadioCards.Root size={size} defaultValue="1">
                <RadioCards.Item value="1">Next.js</RadioCards.Item>
                <RadioCards.Item value="2">React Router</RadioCards.Item>
                <RadioCards.Item value="3">Astro</RadioCards.Item>
                <RadioCards.Item value="4">HTMX</RadioCards.Item>
              </RadioCards.Root>
            </Box>

            <Box>
              <Text as="div" color="gray" size="2" mb="3">
                With icons
              </Text>
              <RadioCards.Root size={size} defaultValue="1">
                <RadioCards.Item value="1">
                  <VercelLogoIcon />
                  Next.js
                </RadioCards.Item>
                <RadioCards.Item value="2">
                  <CubeIcon />
                  React Router
                </RadioCards.Item>
                <RadioCards.Item value="3">
                  <GlobeIcon />
                  Astro
                </RadioCards.Item>
                <RadioCards.Item value="4">
                  <CrumpledPaperIcon />
                  HTMX
                </RadioCards.Item>
              </RadioCards.Root>
            </Box>
          </Section>

          <Separator size="4" />
        </Fragment>
      ))}
    </Container>
  );
}
