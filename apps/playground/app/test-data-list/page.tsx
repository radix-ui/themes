'use client';
import Link from 'next/link';
import {
  Badge,
  Box,
  Button,
  CheckboxGroup,
  Container,
  DataList,
  Flex,
  Heading,
  IconButton,
  RadioGroup,
  Section,
  Separator,
  Text,
  Theme,
} from '@radix-ui/themes';
import { StarFilledIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import React from 'react';
import { NextThemeProvider } from '../next-theme-provider';

export default function DataListPage() {
  const [debug, setDebug] = React.useState(true);
  const [trim, setTrim] = React.useState<'normal' | 'start' | 'end' | 'both'>('normal');

  return (
    <html data-debug-layout={debug}>
      <body style={{ minWidth: 768 }}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              [data-debug-layout="true"] {
                .rt-DataListRoot {
                  outline: 1px dashed var(--purple-a7);
                  outline-offset: -1px;
                }

                .rt-DataListItem {
                  background-color: var(--red-a3);
                }

                .rt-DataListLabel {
                  position: relative;

                  &::before {
                    content: '';
                    position: absolute;
                    height: 1px;
                    left: 0;
                    top: 15px;
                    width: var(--container-2);
                    pointer-events: none;
                    background-color: var(--red-a8);
                  }
                }
              }
            `,
          }}
        />

        <NextThemeProvider>
          <Theme>
            <Container size="2" mx="5">
              <Section>
                <Flex gap="7" direction="column">
                  <Box>
                    <Box mb="5">
                      <Text as="div" size="2" weight="bold" mb="1">
                        Debug layout
                      </Text>
                      <CheckboxGroup.Root
                        value={debug ? ['debug'] : []}
                        onValueChange={(value) => setDebug(value.includes('debug'))}
                      >
                        <CheckboxGroup.Item value="debug">Show debug view</CheckboxGroup.Item>
                      </CheckboxGroup.Root>
                    </Box>

                    <Box mb="5">
                      <Text as="div" size="2" weight="bold" mb="1">
                        Trim
                      </Text>
                      <RadioGroup.Root
                        value={trim}
                        onValueChange={(value: typeof trim) => setTrim(value)}
                      >
                        <RadioGroup.Item value="normal">Normal</RadioGroup.Item>
                        <RadioGroup.Item value="start">Start</RadioGroup.Item>
                        <RadioGroup.Item value="end">End</RadioGroup.Item>
                        <RadioGroup.Item value="both">Both</RadioGroup.Item>
                      </RadioGroup.Root>
                    </Box>

                    <Separator size="4" />
                  </Box>

                  <Flex direction="column">
                    <Heading mb="4" size="3">
                      Mixed content
                    </Heading>
                    <DataList.Root trim={trim}>
                      <DataList.Item>
                        <DataList.Label>Status</DataList.Label>
                        <DataList.Value>
                          <Badge color="green" size="1">
                            Active
                          </Badge>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item align="center">
                        <DataList.Label>Name</DataList.Label>
                        <DataList.Value>
                          <Button size="1">Add</Button>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item align="center">
                        <DataList.Label>Flex</DataList.Label>
                        <DataList.Value>
                          <Flex align="center" gap="2">
                            <IconButton size="1" variant="soft">
                              <InfoCircledIcon />
                            </IconButton>
                            <Text>Info</Text>
                          </Flex>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Email</DataList.Label>
                        <DataList.Value>vlad@workos.com</DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Organization</DataList.Label>
                        <DataList.Value>
                          <Link href="https://workos.com">WorkOS</Link>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Long value</DataList.Label>
                        <DataList.Value>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisl et
                          libero ultricies viverra quis vitae quam. Proin a feugiat metus.
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Truncated value</DataList.Label>
                        <DataList.Value>
                          <Text truncate>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisl
                            et libero ultricies viverra quis vitae quam. Proin a feugiat metus.
                          </Text>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item align="center">
                        <DataList.Label>Authentication methods</DataList.Label>
                        <DataList.Value>
                          <Flex gap="2" align="center">
                            <StarFilledIcon />
                            <StarFilledIcon />
                          </Flex>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Accent</DataList.Label>
                        <DataList.Value>
                          <Flex gap="2" align="center">
                            <Box
                              width="16px"
                              height="16px"
                              style={{ backgroundColor: 'royalblue' }}
                            />
                            <Text>Blue</Text>
                          </Flex>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Long value</DataList.Label>
                        <DataList.Value>
                          Sed luctus, est id feugiat blandit, sapien nisl lobortis arcu, eu
                          malesuada nulla ex ut lorem. In odio nisl, consectetur id commodo vel,
                          posuere eu risus.
                        </DataList.Value>
                      </DataList.Item>
                    </DataList.Root>
                  </Flex>

                  <Flex direction="column">
                    <Heading mb="4" size="3">
                      Mixed alignment
                    </Heading>

                    <Flex direction="column" gap="6">
                      <DataList.Root trim={trim}>
                        {[1, 2, 3].map((i) => (
                          <DataList.Item align="baseline" key={i}>
                            <DataList.Label>Align</DataList.Label>
                            <DataList.Value>Baseline</DataList.Value>
                          </DataList.Item>
                        ))}
                      </DataList.Root>

                      <DataList.Root trim={trim}>
                        {[1, 2, 3].map((i) => (
                          <DataList.Item align="start" key={i}>
                            <DataList.Label>Align</DataList.Label>
                            <DataList.Value>Start</DataList.Value>
                          </DataList.Item>
                        ))}
                      </DataList.Root>

                      <DataList.Root trim={trim}>
                        {[1, 2, 3].map((i) => (
                          <DataList.Item align="stretch" key={i}>
                            <DataList.Label>Align</DataList.Label>
                            <DataList.Value>Stretch</DataList.Value>
                          </DataList.Item>
                        ))}
                      </DataList.Root>

                      <DataList.Root trim={trim}>
                        {[1, 2, 3].map((i) => (
                          <DataList.Item align="center" key={i}>
                            <DataList.Label>Align</DataList.Label>
                            <DataList.Value>Center</DataList.Value>
                          </DataList.Item>
                        ))}
                      </DataList.Root>

                      <DataList.Root trim={trim}>
                        {[1, 2, 3].map((i) => (
                          <DataList.Item align="end" key={i}>
                            <DataList.Label>Align</DataList.Label>
                            <DataList.Value>End</DataList.Value>
                          </DataList.Item>
                        ))}
                      </DataList.Root>

                      <DataList.Root trim={trim}>
                        {[1, 2, 3].map((i) => (
                          <DataList.Item align="baseline" key={i}>
                            <DataList.Label>Align</DataList.Label>
                            <DataList.Value>
                              <Button size="2">Baseline</Button>
                            </DataList.Value>{' '}
                          </DataList.Item>
                        ))}
                      </DataList.Root>

                      <DataList.Root trim={trim}>
                        {[1, 2, 3].map((i) => (
                          <DataList.Item align="start" key={i}>
                            <DataList.Label>Align</DataList.Label>
                            <DataList.Value>
                              <Button size="2">Start</Button>
                            </DataList.Value>
                          </DataList.Item>
                        ))}
                      </DataList.Root>

                      <DataList.Root trim={trim}>
                        {[1, 2, 3].map((i) => (
                          <DataList.Item align="stretch" key={i}>
                            <DataList.Label>Align</DataList.Label>
                            <DataList.Value>
                              <Button size="2">Stretch</Button>
                            </DataList.Value>
                          </DataList.Item>
                        ))}
                      </DataList.Root>

                      <DataList.Root trim={trim}>
                        {[1, 2, 3].map((i) => (
                          <DataList.Item align="center" key={i}>
                            <DataList.Label>Align</DataList.Label>
                            <DataList.Value>
                              <Button size="2">Center</Button>
                            </DataList.Value>
                          </DataList.Item>
                        ))}
                      </DataList.Root>

                      <DataList.Root trim={trim}>
                        {[1, 2, 3].map((i) => (
                          <DataList.Item align="end" key={i}>
                            <DataList.Label>Align</DataList.Label>
                            <DataList.Value>
                              <Button size="2">End</Button>
                            </DataList.Value>
                          </DataList.Item>
                        ))}
                      </DataList.Root>
                    </Flex>
                  </Flex>

                  <Flex direction="column">
                    <Heading mb="4" size="3">
                      Single item
                    </Heading>
                    <DataList.Root trim={trim}>
                      <DataList.Item>
                        <DataList.Label>Foo</DataList.Label>
                        <DataList.Value>Bar</DataList.Value>
                      </DataList.Item>
                    </DataList.Root>
                  </Flex>

                  <Flex direction="column">
                    <Heading mb="4" size="3">
                      Long labels
                    </Heading>
                    <DataList.Root trim={trim}>
                      <DataList.Item>
                        <DataList.Label>Name</DataList.Label>
                        <DataList.Value>Vlad Moroz</DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Email</DataList.Label>
                        <DataList.Value>vlad@workos.com</DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>
                          Lorem ipsum dolor sit amet consectetur adipscing elit
                        </DataList.Label>
                        <DataList.Value>
                          <Link href="https://workos.com">WorkOS</Link>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label maxWidth="360px">
                          <Text truncate>
                            Sed luctus, est id feugiat blandit, sapien nisl lobortis arcu, eu
                            malesuada nulla ex ut lorem. In odio nisl, consectetur id commodo vel,
                            posuere eu risus.
                          </Text>
                        </DataList.Label>
                        <DataList.Value>← should be truncated</DataList.Value>
                      </DataList.Item>
                    </DataList.Root>
                  </Flex>

                  <Flex direction="column">
                    <Heading mb="4" size="3">
                      Vertical layout
                    </Heading>
                    <DataList.Root orientation="vertical" trim={trim}>
                      <DataList.Item>
                        <DataList.Label>Status</DataList.Label>
                        <DataList.Value>
                          <Badge color="green" size="1">
                            Active
                          </Badge>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Name</DataList.Label>
                        <DataList.Value>
                          <Button size="1">Add</Button>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Flex</DataList.Label>
                        <DataList.Value>
                          <Flex align="center" gap="2">
                            <IconButton size="1" variant="soft">
                              <InfoCircledIcon />
                            </IconButton>
                            <Text>Info</Text>
                          </Flex>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Email</DataList.Label>
                        <DataList.Value>vlad@workos.com</DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Organization</DataList.Label>
                        <DataList.Value>
                          <Link href="https://workos.com">WorkOS</Link>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Long value</DataList.Label>
                        <DataList.Value>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisl et
                          libero ultricies viverra quis vitae quam. Proin a feugiat metus.
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Truncated value</DataList.Label>
                        <DataList.Value>
                          <Text truncate>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisl
                            et libero ultricies viverra quis vitae quam. Proin a feugiat metus.
                          </Text>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Authentication methods</DataList.Label>
                        <DataList.Value>
                          <Flex gap="2">
                            <StarFilledIcon />
                            <StarFilledIcon />
                          </Flex>
                        </DataList.Value>
                      </DataList.Item>

                      <DataList.Item>
                        <DataList.Label>Long value</DataList.Label>
                        <DataList.Value>
                          Sed luctus, est id feugiat blandit, sapien nisl lobortis arcu, eu
                          malesuada nulla ex ut lorem. In odio nisl, consectetur id commodo vel,
                          posuere eu risus.
                        </DataList.Value>
                      </DataList.Item>
                    </DataList.Root>
                  </Flex>
                </Flex>
              </Section>
            </Container>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}
