import * as React from 'react';
import {
  Theme,
  ThemePanel,
  Container,
  Section,
  Flex,
  Button,
  IconButton,
  Text,
} from '@kushagradhawan/kookie-ui';
import { HeartIcon, StarIcon, BookmarkIcon } from '@radix-ui/react-icons';

export default function Test() {
  return (
    <html lang="en">
      <body>
        <Theme asChild>
          <div id="root">
            <ThemePanel defaultOpen={false} />
            <Container px="5">
              <Section>
                <Flex direction="column" gap="6">
                  <div>
                    <Text size="6" weight="bold" mb="4">
                      Full Width Buttons
                    </Text>

                    <Flex direction="column" gap="3">
                      <Button fullWidth variant="solid" size="1">
                        Small Full Width Button
                      </Button>
                      <Button fullWidth variant="solid" size="2">
                        Medium Full Width Button
                      </Button>
                      <Button fullWidth variant="solid" size="3">
                        Large Full Width Button
                      </Button>
                      <Button fullWidth variant="solid" size="4">
                        Extra Large Full Width Button
                      </Button>
                    </Flex>
                  </div>

                  <div>
                    <Text size="5" weight="bold" mb="4">
                      Full Width Variants
                    </Text>

                    <Flex direction="column" gap="3">
                      <Button fullWidth variant="classic" color="blue">
                        Classic Full Width
                      </Button>
                      <Button fullWidth variant="solid" color="green">
                        Solid Full Width
                      </Button>
                      <Button fullWidth variant="soft" color="orange">
                        Soft Full Width
                      </Button>
                      <Button fullWidth variant="surface" color="purple">
                        Surface Full Width
                      </Button>
                      <Button fullWidth variant="outline" color="red">
                        Outline Full Width
                      </Button>
                      <Button fullWidth variant="ghost" color="gray">
                        Ghost Full Width
                      </Button>
                    </Flex>
                  </div>

                  <div>
                    <Text size="5" weight="bold" mb="4">
                      Full Width Icon Buttons
                    </Text>

                    <Flex direction="column" gap="3">
                      <IconButton fullWidth variant="solid" color="red" size="3">
                        <HeartIcon />
                      </IconButton>
                      <IconButton fullWidth variant="soft" color="blue" size="3">
                        <StarIcon />
                      </IconButton>
                      <IconButton fullWidth variant="outline" color="green" size="3">
                        <BookmarkIcon />
                      </IconButton>
                    </Flex>
                  </div>

                  <div>
                    <Text size="5" weight="bold" mb="4">
                      Comparison: Regular vs Full Width
                    </Text>

                    <Flex direction="column" gap="3">
                      <Flex gap="3">
                        <Button variant="solid" color="blue">
                          Regular Button
                        </Button>
                        <Button variant="solid" color="green">
                          Another Regular
                        </Button>
                      </Flex>

                      <Button fullWidth variant="solid" color="blue">
                        Full Width Button Takes Entire Container
                      </Button>

                      <Flex gap="3">
                        <IconButton variant="solid" color="red">
                          <HeartIcon />
                        </IconButton>
                        <IconButton variant="solid" color="blue">
                          <StarIcon />
                        </IconButton>
                      </Flex>

                      <IconButton fullWidth variant="solid" color="red" size="3">
                        <HeartIcon />
                      </IconButton>
                    </Flex>
                  </div>
                </Flex>
              </Section>
            </Container>
          </div>
        </Theme>
      </body>
    </html>
  );
}
