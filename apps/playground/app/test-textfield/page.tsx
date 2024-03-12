import * as React from 'react';
import {
  Theme,
  ThemePanel,
  Container,
  Section,
  Grid,
  Flex,
  TextField,
  Heading,
  IconButton,
  Button,
  Text,
  Tooltip,
  Spinner,
} from '@radix-ui/themes';
import {
  StarIcon,
  ExclamationTriangleIcon,
  EyeClosedIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  Share2Icon,
  EnvelopeOpenIcon,
  PaperPlaneIcon,
  LockClosedIcon,
} from '@radix-ui/react-icons';

export default function Test() {
  return (
    <html lang="en">
      <body>
        <Theme asChild>
          <div id="root">
            <ThemePanel defaultOpen={false} />
            <Container>
              <Section>
                <Grid columns="3" gapX="6" gapY="9">
                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Just the input
                    </Heading>

                    <TextField.Root size="1" placeholder="Search" />
                    <TextField.Root size="2" placeholder="Search" />
                    <TextField.Root size="3" placeholder="Search" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Spinner
                    </Heading>

                    <TextField.Root size="1" placeholder="Your password">
                      <TextField.Slot side="right">
                        <Spinner size="1" />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Your password">
                      <TextField.Slot side="right">
                        <Spinner size="2" />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Your password">
                      <TextField.Slot side="right">
                        <Spinner size="3" />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <div />

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="left"'}
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="right"'}
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slots without sides
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="left", side="right"'}
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="right", side="left"'}
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="left", no side'}
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot side="left">
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="right", no side'}
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'no side, side="right"'}
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot>
                        <MagnifyingGlassIcon />
                      </TextField.Slot>
                      <TextField.Slot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Ghost buttons
                    </Heading>

                    <TextField.Root size="1" placeholder="Your password">
                      <TextField.Slot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextField.Slot>
                      <TextField.Slot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Your password">
                      <TextField.Slot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextField.Slot>
                      <TextField.Slot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Your password">
                      <TextField.Slot>
                        <IconButton size="2" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextField.Slot>
                      <TextField.Slot>
                        <IconButton size="2" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Your password">
                      <TextField.Slot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextField.Slot>
                      <TextField.Slot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" disabled placeholder="Your password">
                      <TextField.Slot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextField.Slot>
                      <TextField.Slot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Mixed content
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot>
                        <InfoCircledIcon />
                      </TextField.Slot>
                      <TextField.Slot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot>
                        <InfoCircledIcon />
                      </TextField.Slot>
                      <TextField.Slot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot>
                        <InfoCircledIcon />
                      </TextField.Slot>
                      <TextField.Slot>
                        <IconButton size="2" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="2" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot>
                        <InfoCircledIcon />
                      </TextField.Slot>
                      <TextField.Slot gap="4">
                        <IconButton size="3" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="3" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" disabled placeholder="Search">
                      <TextField.Slot>
                        <InfoCircledIcon />
                      </TextField.Slot>
                      <TextField.Slot gap="4">
                        <IconButton size="3" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="3" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Fringe (overrides)
                    </Heading>

                    <TextField.Root size="1" placeholder="Search">
                      <TextField.Slot>
                        <InfoCircledIcon />
                      </TextField.Slot>
                      <TextField.Slot pr="0" gap="1">
                        <IconButton size="1" variant="soft" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="soft" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="2" placeholder="Search">
                      <TextField.Slot>
                        <InfoCircledIcon />
                      </TextField.Slot>
                      <TextField.Slot px="1" gap="1">
                        <IconButton size="1" variant="soft" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="soft" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="Search">
                      <TextField.Slot>
                        <InfoCircledIcon />
                      </TextField.Slot>
                      <TextField.Slot px="1" gap="1">
                        <IconButton size="2" variant="soft" radius="full">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="2" variant="soft" radius="full">
                          <StarIcon />
                        </IconButton>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root size="3" placeholder="your.email" defaultValue="benoit">
                      <TextField.Slot>
                        <EnvelopeOpenIcon />
                      </TextField.Slot>
                      <TextField.Slot px="1" gap="2">
                        <Text size="3">@workos.com</Text>
                        <Tooltip content="Send email">
                          <IconButton variant="solid">
                            <PaperPlaneIcon />
                          </IconButton>
                        </Tooltip>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root
                      size="3"
                      radius="full"
                      placeholder="your.email"
                      defaultValue="benoit"
                    >
                      <TextField.Slot>
                        <EnvelopeOpenIcon />
                      </TextField.Slot>
                      <TextField.Slot px="1" gap="2">
                        <Text size="3">@workos.com</Text>
                        <Button variant="solid">Send</Button>
                      </TextField.Slot>
                    </TextField.Root>

                    <TextField.Root
                      size="3"
                      radius="full"
                      disabled
                      placeholder="your.email"
                      defaultValue="benoit"
                    >
                      <TextField.Slot>
                        <EnvelopeOpenIcon />
                      </TextField.Slot>
                      <TextField.Slot px="1" gap="2">
                        <Text size="3">@workos.com</Text>
                        <Button variant="solid">Send</Button>
                      </TextField.Slot>
                    </TextField.Root>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type date
                    </Heading>

                    <TextField.Root size="1" placeholder="Date" type="date" />
                    <TextField.Root size="2" placeholder="Date" type="date" />
                    <TextField.Root size="3" placeholder="Date" type="date" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type datetime-local
                    </Heading>

                    <TextField.Root size="1" placeholder="Local datetime" type="datetime-local" />
                    <TextField.Root size="2" placeholder="Local datetime" type="datetime-local" />
                    <TextField.Root size="3" placeholder="Local datetime" type="datetime-local" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type month
                    </Heading>

                    <TextField.Root size="1" placeholder="Month" type="month" />
                    <TextField.Root size="2" placeholder="Month" type="month" />
                    <TextField.Root size="3" placeholder="Month" type="month" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type number
                    </Heading>

                    <TextField.Root size="1" placeholder="Number" type="number" />
                    <TextField.Root size="2" placeholder="Number" type="number" />
                    <TextField.Root size="3" placeholder="Number" type="number" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type search
                    </Heading>

                    <TextField.Root size="1" placeholder="Search" type="search" />
                    <TextField.Root size="2" placeholder="Search" type="search" />
                    <TextField.Root size="3" placeholder="Search" type="search" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type time
                    </Heading>

                    <TextField.Root size="1" placeholder="Time" type="time" />

                    <Flex gap="4">
                      <TextField.Root size="2" placeholder="Time" type="time" />

                      <TextField.Root size="2" placeholder="Time" type="time">
                        <TextField.Slot side="right" pr="1">
                          <Button size="1">Submit</Button>
                        </TextField.Slot>
                      </TextField.Root>
                    </Flex>

                    <Flex gap="4">
                      <TextField.Root size="3" placeholder="Time" type="time" />

                      <TextField.Root size="3" placeholder="Time" type="time">
                        <TextField.Slot side="right" pr="2">
                          <Button size="1">Submit</Button>
                        </TextField.Slot>
                      </TextField.Root>
                    </Flex>
                  </Flex>
                </Grid>
              </Section>
            </Container>
          </div>
        </Theme>
      </body>
    </html>
  );
}
