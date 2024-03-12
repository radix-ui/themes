import * as React from 'react';
import {
  Theme,
  Container,
  Section,
  Flex,
  Grid,
  Button,
  IconButton,
  Link,
  Popover,
} from '@radix-ui/themes';
import {
  ChatBubbleIcon,
  DotsHorizontalIcon,
  FileTextIcon,
  QuestionMarkCircledIcon,
  SunIcon,
} from '@radix-ui/react-icons';

export default function Ghost() {
  return (
    <html lang="en">
      <body>
        <Theme asChild accentColor="mint">
          <div id="root">
            <Container>
              <Grid columns="2">
                {(['row', 'column'] as const).map((direction) => (
                  <Section key={direction}>
                    <Flex direction={direction === 'row' ? 'column' : 'row'} gap="7">
                      <Flex
                        direction={direction}
                        align={direction === 'row' ? 'center' : 'start'}
                        gap="4"
                      >
                        <Button variant="ghost" size="1">
                          Action
                        </Button>
                        <Button variant="ghost" size="1">
                          Cancel
                        </Button>
                        <Button size="1">Save</Button>
                        <Button size="1">Delete</Button>
                        <IconButton variant="ghost" size="1" radius="full">
                          <SunIcon />
                        </IconButton>
                      </Flex>

                      <Flex
                        direction={direction}
                        align={direction === 'row' ? 'center' : 'start'}
                        gap="4"
                      >
                        <Button variant="ghost" size="2">
                          Action
                        </Button>
                        <Button variant="ghost" size="2">
                          Cancel
                        </Button>
                        <Button size="2">Save</Button>
                        <Button size="2">Delete</Button>
                        <IconButton variant="ghost" size="2" radius="full">
                          <SunIcon />
                        </IconButton>
                      </Flex>

                      <Flex
                        direction={direction}
                        align={direction === 'row' ? 'center' : 'start'}
                        gap="5"
                      >
                        <Button variant="ghost" size="3">
                          Action
                        </Button>
                        <Button variant="ghost" size="3">
                          Cancel
                        </Button>
                        <Button size="3">Save</Button>
                        <Button size="3">Delete</Button>
                        <IconButton variant="ghost" size="3" radius="full">
                          <SunIcon />
                        </IconButton>
                      </Flex>

                      <Flex
                        direction={direction}
                        align={direction === 'row' ? 'center' : 'start'}
                        gap="4"
                      >
                        <Button variant="ghost" size="2">
                          <QuestionMarkCircledIcon />
                          Help
                        </Button>
                        <Button variant="ghost" size="2">
                          <ChatBubbleIcon />
                          Feedback
                        </Button>
                        <Flex asChild align="center" gap="1">
                          <Link size="2" href="#">
                            <FileTextIcon />
                            Docs
                          </Link>
                        </Flex>
                        <IconButton variant="ghost" size="2" radius="full">
                          <SunIcon />
                        </IconButton>
                      </Flex>

                      <Flex
                        direction={direction}
                        align={direction === 'row' ? 'center' : 'start'}
                        gap="4"
                      >
                        <Popover.Root>
                          <Popover.Trigger>
                            <Button variant="ghost">Open</Button>
                          </Popover.Trigger>
                          <Popover.Content sideOffset={0} style={{ padding: 100 }} />
                        </Popover.Root>

                        <Popover.Root>
                          <Popover.Trigger>
                            <IconButton variant="ghost">
                              <DotsHorizontalIcon />
                            </IconButton>
                          </Popover.Trigger>
                          <Popover.Content sideOffset={0} style={{ padding: 100 }} />
                        </Popover.Root>
                      </Flex>
                    </Flex>
                  </Section>
                ))}
              </Grid>

              <Flex direction="column" gap="2" mb="5">
                <Flex align="center" gap="5">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Save</Button>
                </Flex>

                <Flex align="center">
                  <Button variant="ghost" mr="5">
                    Cancel
                  </Button>
                  <Button>Save</Button>
                </Flex>
              </Flex>

              <Flex direction="column" gap="2" style={{ width: 500 }}>
                <Flex align="center" justify="between">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Save</Button>
                </Flex>

                <Flex align="center">
                  <Button variant="ghost" mr="auto">
                    Cancel
                  </Button>
                  <Button>Save</Button>
                </Flex>
              </Flex>
            </Container>
          </div>
        </Theme>
      </body>
    </html>
  );
}
