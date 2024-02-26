'use client';
import Link from 'next/link';
import {
  Badge,
  Box,
  Button,
  CheckboxGroupItem,
  CheckboxGroupRoot,
  Container,
  DataListItem,
  DataListLabel,
  DataListRoot,
  DataListValue,
  Flex,
  Heading,
  IconButton,
  RadioGroupItem,
  RadioGroupRoot,
  Section,
  Separator,
  Text,
  Theme,
} from '@radix-ui/themes';
import { StarFilledIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import React from 'react';

export default function DataListPage() {
  const [debug, setDebug] = React.useState(true);
  const [trim, setTrim] = React.useState<'normal' | 'start' | 'end' | 'both'>('normal');

  return (
    <html data-debug-layout={debug}>
      <body>
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

        <Theme>
          <Container size="2">
            <Section>
              <Flex gap="7" direction="column">
                <Box>
                  <Box mb="5">
                    <Text as="div" size="2" weight="bold" mb="1">
                      Debug layout
                    </Text>
                    <CheckboxGroupRoot
                      value={debug ? ['debug'] : []}
                      onValueChange={(value) => setDebug(value.includes('debug'))}
                    >
                      <CheckboxGroupItem value="debug">Show debug view</CheckboxGroupItem>
                    </CheckboxGroupRoot>
                  </Box>

                  <Box mb="5">
                    <Text as="div" size="2" weight="bold" mb="1">
                      Trim
                    </Text>
                    <RadioGroupRoot
                      value={trim}
                      onValueChange={(value: typeof trim) => setTrim(value)}
                    >
                      <RadioGroupItem value="normal">Normal</RadioGroupItem>
                      <RadioGroupItem value="start">Start</RadioGroupItem>
                      <RadioGroupItem value="end">End</RadioGroupItem>
                      <RadioGroupItem value="both">Both</RadioGroupItem>
                    </RadioGroupRoot>
                  </Box>

                  <Separator size="4" />
                </Box>

                <Flex direction="column">
                  <Heading mb="4" size="3">
                    Mixed content
                  </Heading>
                  <DataListRoot trim={trim}>
                    <DataListItem>
                      <DataListLabel>Status</DataListLabel>
                      <DataListValue>
                        <Badge color="green" size="1">
                          Active
                        </Badge>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem align="center">
                      <DataListLabel>Name</DataListLabel>
                      <DataListValue>
                        <Button size="1">Add</Button>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem align="center">
                      <DataListLabel>Flex</DataListLabel>
                      <DataListValue>
                        <Flex align="center" gap="2">
                          <IconButton size="1" variant="soft">
                            <InfoCircledIcon />
                          </IconButton>
                          <Text>Info</Text>
                        </Flex>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Email</DataListLabel>
                      <DataListValue>vlad@workos.com</DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Organization</DataListLabel>
                      <DataListValue>
                        <Link href="https://workos.com">WorkOS</Link>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Long value</DataListLabel>
                      <DataListValue>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisl et
                        libero ultricies viverra quis vitae quam. Proin a feugiat metus.
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Truncated value</DataListLabel>
                      <DataListValue>
                        <Text truncate>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisl et
                          libero ultricies viverra quis vitae quam. Proin a feugiat metus.
                        </Text>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem align="center">
                      <DataListLabel>Authentication methods</DataListLabel>
                      <DataListValue>
                        <Flex gap="2" align="center">
                          <StarFilledIcon />
                          <StarFilledIcon />
                        </Flex>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Accent</DataListLabel>
                      <DataListValue>
                        <Flex gap="2" align="center">
                          <Box
                            width="16px"
                            height="16px"
                            style={{ backgroundColor: 'royalblue' }}
                          />
                          <Text>Blue</Text>
                        </Flex>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Long value</DataListLabel>
                      <DataListValue>
                        Sed luctus, est id feugiat blandit, sapien nisl lobortis arcu, eu malesuada
                        nulla ex ut lorem. In odio nisl, consectetur id commodo vel, posuere eu
                        risus.
                      </DataListValue>
                    </DataListItem>
                  </DataListRoot>
                </Flex>

                <Flex direction="column">
                  <Heading mb="4" size="3">
                    Mixed alignment
                  </Heading>

                  <Flex direction="column" gap="6">
                    <DataListRoot trim={trim}>
                      {[1, 2, 3].map((i) => (
                        <DataListItem align="baseline" key={i}>
                          <DataListLabel>Align</DataListLabel>
                          <DataListValue>Baseline</DataListValue>
                        </DataListItem>
                      ))}
                    </DataListRoot>

                    <DataListRoot trim={trim}>
                      {[1, 2, 3].map((i) => (
                        <DataListItem align="start" key={i}>
                          <DataListLabel>Align</DataListLabel>
                          <DataListValue>Start</DataListValue>
                        </DataListItem>
                      ))}
                    </DataListRoot>

                    <DataListRoot trim={trim}>
                      {[1, 2, 3].map((i) => (
                        <DataListItem align="stretch" key={i}>
                          <DataListLabel>Align</DataListLabel>
                          <DataListValue>Stretch</DataListValue>
                        </DataListItem>
                      ))}
                    </DataListRoot>

                    <DataListRoot trim={trim}>
                      {[1, 2, 3].map((i) => (
                        <DataListItem align="center" key={i}>
                          <DataListLabel>Align</DataListLabel>
                          <DataListValue>Center</DataListValue>
                        </DataListItem>
                      ))}
                    </DataListRoot>

                    <DataListRoot trim={trim}>
                      {[1, 2, 3].map((i) => (
                        <DataListItem align="end" key={i}>
                          <DataListLabel>Align</DataListLabel>
                          <DataListValue>End</DataListValue>
                        </DataListItem>
                      ))}
                    </DataListRoot>

                    <DataListRoot trim={trim}>
                      {[1, 2, 3].map((i) => (
                        <DataListItem align="baseline" key={i}>
                          <DataListLabel>Align</DataListLabel>
                          <DataListValue>
                            <Button size="2">Baseline</Button>
                          </DataListValue>{' '}
                        </DataListItem>
                      ))}
                    </DataListRoot>

                    <DataListRoot trim={trim}>
                      {[1, 2, 3].map((i) => (
                        <DataListItem align="start" key={i}>
                          <DataListLabel>Align</DataListLabel>
                          <DataListValue>
                            <Button size="2">Start</Button>
                          </DataListValue>
                        </DataListItem>
                      ))}
                    </DataListRoot>

                    <DataListRoot trim={trim}>
                      {[1, 2, 3].map((i) => (
                        <DataListItem align="stretch" key={i}>
                          <DataListLabel>Align</DataListLabel>
                          <DataListValue>
                            <Button size="2">Stretch</Button>
                          </DataListValue>
                        </DataListItem>
                      ))}
                    </DataListRoot>

                    <DataListRoot trim={trim}>
                      {[1, 2, 3].map((i) => (
                        <DataListItem align="center" key={i}>
                          <DataListLabel>Align</DataListLabel>
                          <DataListValue>
                            <Button size="2">Center</Button>
                          </DataListValue>
                        </DataListItem>
                      ))}
                    </DataListRoot>

                    <DataListRoot trim={trim}>
                      {[1, 2, 3].map((i) => (
                        <DataListItem align="end" key={i}>
                          <DataListLabel>Align</DataListLabel>
                          <DataListValue>
                            <Button size="2">End</Button>
                          </DataListValue>
                        </DataListItem>
                      ))}
                    </DataListRoot>
                  </Flex>
                </Flex>

                <Flex direction="column">
                  <Heading mb="4" size="3">
                    Single item
                  </Heading>
                  <DataListRoot trim={trim}>
                    <DataListItem>
                      <DataListLabel>Foo</DataListLabel>
                      <DataListValue>Bar</DataListValue>
                    </DataListItem>
                  </DataListRoot>
                </Flex>

                <Flex direction="column">
                  <Heading mb="4" size="3">
                    Long labels
                  </Heading>
                  <DataListRoot trim={trim}>
                    <DataListItem>
                      <DataListLabel>Name</DataListLabel>
                      <DataListValue>Vlad Moroz</DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Email</DataListLabel>
                      <DataListValue>vlad@workos.com</DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>
                        Lorem ipsum dolor sit amet consectetur adipscing elit
                      </DataListLabel>
                      <DataListValue>
                        <Link href="https://workos.com">WorkOS</Link>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel maxWidth="360px">
                        <Text truncate>
                          Sed luctus, est id feugiat blandit, sapien nisl lobortis arcu, eu
                          malesuada nulla ex ut lorem. In odio nisl, consectetur id commodo vel,
                          posuere eu risus.
                        </Text>
                      </DataListLabel>
                      <DataListValue>← should be truncated</DataListValue>
                    </DataListItem>
                  </DataListRoot>
                </Flex>

                <Flex direction="column">
                  <Heading mb="4" size="3">
                    Vertical layout
                  </Heading>
                  <DataListRoot orientation="vertical" trim={trim}>
                    <DataListItem>
                      <DataListLabel>Status</DataListLabel>
                      <DataListValue>
                        <Badge color="green" size="1">
                          Active
                        </Badge>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Name</DataListLabel>
                      <DataListValue>
                        <Button size="1">Add</Button>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Flex</DataListLabel>
                      <DataListValue>
                        <Flex align="center" gap="2">
                          <IconButton size="1" variant="soft">
                            <InfoCircledIcon />
                          </IconButton>
                          <Text>Info</Text>
                        </Flex>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Email</DataListLabel>
                      <DataListValue>vlad@workos.com</DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Organization</DataListLabel>
                      <DataListValue>
                        <Link href="https://workos.com">WorkOS</Link>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Long value</DataListLabel>
                      <DataListValue>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisl et
                        libero ultricies viverra quis vitae quam. Proin a feugiat metus.
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Truncated value</DataListLabel>
                      <DataListValue>
                        <Text truncate>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisl et
                          libero ultricies viverra quis vitae quam. Proin a feugiat metus.
                        </Text>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Authentication methods</DataListLabel>
                      <DataListValue>
                        <Flex gap="2">
                          <StarFilledIcon />
                          <StarFilledIcon />
                        </Flex>
                      </DataListValue>
                    </DataListItem>

                    <DataListItem>
                      <DataListLabel>Long value</DataListLabel>
                      <DataListValue>
                        Sed luctus, est id feugiat blandit, sapien nisl lobortis arcu, eu malesuada
                        nulla ex ut lorem. In odio nisl, consectetur id commodo vel, posuere eu
                        risus.
                      </DataListValue>
                    </DataListItem>
                  </DataListRoot>
                </Flex>
              </Flex>
            </Section>
          </Container>
        </Theme>
      </body>
    </html>
  );
}
