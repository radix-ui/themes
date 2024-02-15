import * as React from 'react';
import {
  Theme,
  ThemePanel,
  Container,
  Section,
  Grid,
  Flex,
  TextFieldRoot,
  TextFieldSlot,
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

                    <TextFieldRoot size="1" placeholder="Search" />
                    <TextFieldRoot size="2" placeholder="Search" />
                    <TextFieldRoot size="3" placeholder="Search" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Spinner
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Your password">
                      <TextFieldSlot side="right">
                        <Spinner size="1" />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Your password">
                      <TextFieldSlot side="right">
                        <Spinner size="2" />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Your password">
                      <TextFieldSlot side="right">
                        <Spinner size="3" />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <div />

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="left"'}
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="right"'}
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slots without sides
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="left", side="right"'}
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="right", side="left"'}
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="left", no side'}
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot side="left">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'side="right", no side'}
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Slot {'no side, side="right"'}
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldSlot color="red" side="right">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Ghost buttons
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Your password">
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Your password">
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Your password">
                      <TextFieldSlot>
                        <IconButton size="2" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <IconButton size="2" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Your password">
                      <TextFieldSlot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" disabled placeholder="Your password">
                      <TextFieldSlot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Mixed content
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldSlot>
                        <IconButton size="2" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="2" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldSlot gap="4">
                        <IconButton size="3" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="3" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" disabled placeholder="Search">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldSlot gap="4">
                        <IconButton size="3" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="3" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Fringe (overrides)
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldSlot pr="0" gap="1">
                        <IconButton size="1" variant="soft" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="soft" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2" placeholder="Search">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldSlot px="1" gap="1">
                        <IconButton size="1" variant="soft" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="soft" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="Search">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldSlot px="1" gap="1">
                        <IconButton size="2" variant="soft" radius="full">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="2" variant="soft" radius="full">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" placeholder="your.email" defaultValue="benoit">
                      <TextFieldSlot>
                        <EnvelopeOpenIcon />
                      </TextFieldSlot>
                      <TextFieldSlot px="1" gap="2">
                        <Text size="3">@workos.com</Text>
                        <Tooltip content="Send email">
                          <IconButton variant="solid">
                            <PaperPlaneIcon />
                          </IconButton>
                        </Tooltip>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot
                      size="3"
                      radius="full"
                      placeholder="your.email"
                      defaultValue="benoit"
                    >
                      <TextFieldSlot>
                        <EnvelopeOpenIcon />
                      </TextFieldSlot>
                      <TextFieldSlot px="1" gap="2">
                        <Text size="3">@workos.com</Text>
                        <Button variant="solid">Send</Button>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot
                      size="3"
                      radius="full"
                      disabled
                      placeholder="your.email"
                      defaultValue="benoit"
                    >
                      <TextFieldSlot>
                        <EnvelopeOpenIcon />
                      </TextFieldSlot>
                      <TextFieldSlot px="1" gap="2">
                        <Text size="3">@workos.com</Text>
                        <Button variant="solid">Send</Button>
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type date
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Date" type="date" />
                    <TextFieldRoot size="2" placeholder="Date" type="date" />
                    <TextFieldRoot size="3" placeholder="Date" type="date" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type datetime-local
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Local datetime" type="datetime-local" />
                    <TextFieldRoot size="2" placeholder="Local datetime" type="datetime-local" />
                    <TextFieldRoot size="3" placeholder="Local datetime" type="datetime-local" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type month
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Month" type="month" />
                    <TextFieldRoot size="2" placeholder="Month" type="month" />
                    <TextFieldRoot size="3" placeholder="Month" type="month" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type number
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Number" type="number" />
                    <TextFieldRoot size="2" placeholder="Number" type="number" />
                    <TextFieldRoot size="3" placeholder="Number" type="number" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type search
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Search" type="search" />
                    <TextFieldRoot size="2" placeholder="Search" type="search" />
                    <TextFieldRoot size="3" placeholder="Search" type="search" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type time
                    </Heading>

                    <TextFieldRoot size="1" placeholder="Time" type="time" />

                    <Flex gap="4">
                      <TextFieldRoot size="2" placeholder="Time" type="time" />

                      <TextFieldRoot size="2" placeholder="Time" type="time">
                        <TextFieldSlot side="right" pr="1">
                          <Button size="1">Submit</Button>
                        </TextFieldSlot>
                      </TextFieldRoot>
                    </Flex>

                    <Flex gap="4">
                      <TextFieldRoot size="3" placeholder="Time" type="time" />

                      <TextFieldRoot size="3" placeholder="Time" type="time">
                        <TextFieldSlot side="right" pr="2">
                          <Button size="1">Submit</Button>
                        </TextFieldSlot>
                      </TextFieldRoot>
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
