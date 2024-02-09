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
  TextFieldInput,
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
                <Grid columns="3" gap="6">
                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Just the input
                    </Heading>

                    <TextFieldInput size="1" placeholder="Your name" />
                    <TextFieldInput size="2" placeholder="Your name" />
                    <TextFieldInput size="3" placeholder="Your name" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Spinner (right)
                    </Heading>

                    <TextFieldRoot size="1">
                      <TextFieldInput placeholder="Your password" />
                      <TextFieldSlot>
                        <Spinner size="1" />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2">
                      <TextFieldInput placeholder="Your password" />
                      <TextFieldSlot>
                        <Spinner size="2" />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldInput placeholder="Your password" />
                      <TextFieldSlot color="red">
                        <Spinner size="3" />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>
                  <div />

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Icons (left)
                    </Heading>

                    <TextFieldRoot size="1">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Search" />
                    </TextFieldRoot>

                    <TextFieldRoot size="2">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Search" />
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Search" />
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Icons (right)
                    </Heading>

                    <TextFieldRoot size="1">
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2">
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Icons (both sides)
                    </Heading>

                    <TextFieldRoot size="1">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldSlot>
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot color="red">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Ghost buttons
                    </Heading>

                    <TextFieldRoot size="1">
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your password" />
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2">
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your password" />
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldSlot>
                        <IconButton size="2" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your password" />
                      <TextFieldSlot>
                        <IconButton size="2" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldSlot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your password" />
                      <TextFieldSlot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldSlot>
                        <IconButton size="3" variant="ghost" color="gray">
                          <LockClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput disabled placeholder="Your password" />
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

                    <TextFieldRoot size="1">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot>
                        <IconButton size="1" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot>
                        <IconButton size="2" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="2" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot gap="4">
                        <IconButton size="3" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="3" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput disabled placeholder="Your name" />
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

                    <TextFieldRoot size="1">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot pr="0" gap="1">
                        <IconButton size="1" variant="soft" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="soft" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="2">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot px="1" gap="1">
                        <IconButton size="1" variant="soft" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="soft" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldSlot>
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="Your name" />
                      <TextFieldSlot px="1" gap="1">
                        <IconButton size="2" variant="soft" radius="full">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="2" variant="soft" radius="full">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3">
                      <TextFieldSlot>
                        <EnvelopeOpenIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="your.email" defaultValue="benoit" />
                      <TextFieldSlot px="1" gap="2">
                        <Text size="3">@workos.com</Text>
                        <Tooltip content="Send email">
                          <IconButton variant="solid">
                            <PaperPlaneIcon />
                          </IconButton>
                        </Tooltip>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" radius="full">
                      <TextFieldSlot>
                        <EnvelopeOpenIcon />
                      </TextFieldSlot>
                      <TextFieldInput placeholder="your.email" defaultValue="benoit" />
                      <TextFieldSlot px="1" gap="2">
                        <Text size="3">@workos.com</Text>
                        <Button variant="solid">Send</Button>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot size="3" radius="full">
                      <TextFieldSlot>
                        <EnvelopeOpenIcon />
                      </TextFieldSlot>
                      <TextFieldInput disabled placeholder="your.email" defaultValue="benoit" />
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

                    <TextFieldInput size="1" placeholder="Date" type="date" />
                    <TextFieldInput size="2" placeholder="Date" type="date" />
                    <TextFieldInput size="3" placeholder="Date" type="date" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type datetime-local
                    </Heading>

                    <TextFieldInput size="1" placeholder="Local datetime" type="datetime-local" />
                    <TextFieldInput size="2" placeholder="Local datetime" type="datetime-local" />
                    <TextFieldInput size="3" placeholder="Local datetime" type="datetime-local" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type month
                    </Heading>

                    <TextFieldInput size="1" placeholder="Month" type="month" />
                    <TextFieldInput size="2" placeholder="Month" type="month" />
                    <TextFieldInput size="3" placeholder="Month" type="month" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type number
                    </Heading>

                    <TextFieldInput size="1" placeholder="Number" type="number" />
                    <TextFieldInput size="2" placeholder="Number" type="number" />
                    <TextFieldInput size="3" placeholder="Number" type="number" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type search
                    </Heading>

                    <TextFieldInput size="1" placeholder="Search" type="search" />
                    <TextFieldInput size="2" placeholder="Search" type="search" />
                    <TextFieldInput size="3" placeholder="Search" type="search" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading size="3" mb="2">
                      Type time
                    </Heading>

                    <TextFieldInput size="1" placeholder="Time" type="time" />

                    <Flex gap="4">
                      <TextFieldInput size="2" placeholder="Time" type="time" />

                      <TextFieldRoot size="2">
                        <TextFieldInput placeholder="Time" type="time" />
                        <TextFieldSlot pr="1">
                          <Button size="1">Submit</Button>
                        </TextFieldSlot>
                      </TextFieldRoot>
                    </Flex>

                    <Flex gap="4">
                      <TextFieldInput size="3" placeholder="Time" type="time" />

                      <TextFieldRoot size="3">
                        <TextFieldInput placeholder="Time" type="time" />
                        <TextFieldSlot pr="2">
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
