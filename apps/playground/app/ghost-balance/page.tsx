import * as React from 'react';
import { Theme, Container, Section, Flex, Grid, Button, IconButton, Link } from '@radix-ui/themes';
import {
  ChatBubbleIcon,
  FileTextIcon,
  QuestionMarkCircledIcon,
  SunIcon,
} from '@radix-ui/react-icons';

export default function Ghost() {
  return (
    <Theme asChild accentScale="mint">
      <html lang="en">
        <body>
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
                    </Flex>
                  </Section>
                ))}
              </Grid>
            </Container>
          </div>
        </body>
      </html>
    </Theme>
  );
}
