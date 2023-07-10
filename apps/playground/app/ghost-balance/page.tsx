import * as React from 'react';
import { Theme, Container, Section, Flex, Grid, Button, IconButton, Link } from '@radix-ui/themes';
import { SunIcon } from '@radix-ui/react-icons';

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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <circle cx={12} cy={12} r={10} />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
                          </svg>
                          Help
                        </Button>
                        <Button variant="ghost" size="2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="none"
                            stroke="currentcolor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            style={{
                              marginLeft: '-2px',
                            }}
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8 2 22M17.5 15H9" />
                          </svg>
                          Feedback
                        </Button>
                        <Flex asChild align="center" gap="1">
                          <Link size="2" href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            </svg>
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
