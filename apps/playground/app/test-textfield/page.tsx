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
} from '@radix-ui/themes';
import {
  DragHandleDots2Icon,
  ExclamationTriangleIcon,
  EyeClosedIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  Share2Icon,
  StarIcon,
} from '@radix-ui/react-icons';

export default function Test() {
  return (
    <html lang="en">
      <body>
        <Theme asChild backgroundColor="gray">
          <div id="root">
            <ThemePanel initiallyHidden />
            <Container>
              <Section>
                <Grid columns="4" gap="6">
                  <Flex direction="column" align="start" gap="3">
                    <Heading>Just the input</Heading>
                    <Text size="2" color="gray" mt="-3">
                      nothing fancy!
                    </Text>
                    <TextFieldInput size="1" placeholder="First name" />
                    <TextFieldInput size="2" placeholder="First name" />
                    <TextFieldInput size="3" placeholder="First name" />
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading>With slots</Heading>
                    <Text size="2" color="gray" mt="-3">
                      icons
                    </Text>
                    <TextFieldRoot>
                      <TextFieldSlot px="1">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldInput size="1" placeholder="First name" />
                      <TextFieldSlot px="1">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot px="2">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldInput size="2" placeholder="First name" />
                      <TextFieldSlot px="2">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot pl="3" pr="2">
                        <MagnifyingGlassIcon />
                      </TextFieldSlot>
                      <TextFieldInput size="3" placeholder="First name" />
                      <TextFieldSlot pl="2" pr="3">
                        <ExclamationTriangleIcon />
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading>With slots</Heading>
                    <Text size="2" color="gray" mt="-3">
                      buttons
                    </Text>
                    <TextFieldRoot>
                      <TextFieldSlot>
                        <IconButton size="1" variant="soft" color="gray">
                          <DragHandleDots2Icon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput size="1" placeholder="Password" />
                      <TextFieldSlot>
                        <IconButton size="1" variant="soft" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot px="1">
                        <IconButton size="1" variant="soft" color="gray">
                          <DragHandleDots2Icon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput size="2" placeholder="Password" />
                      <TextFieldSlot px="1">
                        <IconButton size="1" variant="soft" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot pr="2">
                        <IconButton size="2" variant="soft" color="gray">
                          <DragHandleDots2Icon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput size="2" placeholder="Password" />
                      <TextFieldSlot pl="2">
                        <IconButton size="2" variant="soft" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot pl="1" pr="2">
                        <IconButton size="2" variant="soft" color="gray">
                          <DragHandleDots2Icon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput size="3" placeholder="Password" />
                      <TextFieldSlot pl="2" pr="1">
                        <IconButton size="2" variant="soft" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot pr="2">
                        <IconButton size="3" variant="soft" color="gray">
                          <DragHandleDots2Icon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput size="3" placeholder="Password" />
                      <TextFieldSlot pl="2">
                        <IconButton size="3" variant="soft" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading>With slots</Heading>
                    <Text size="2" color="gray" mt="-3">
                      ghost buttons
                    </Text>
                    <TextFieldRoot>
                      <TextFieldSlot pl="1" pr="2">
                        <IconButton size="1" variant="ghost" color="gray">
                          <DragHandleDots2Icon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput size="1" placeholder="Password" />
                      <TextFieldSlot pl="2" pr="1">
                        <IconButton size="1" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot px="2">
                        <IconButton size="1" variant="ghost" color="gray">
                          <DragHandleDots2Icon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput size="2" placeholder="Password" />
                      <TextFieldSlot px="2">
                        <IconButton size="1" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot px="2">
                        <IconButton size="2" variant="ghost" color="gray">
                          <DragHandleDots2Icon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput size="2" placeholder="Password" />
                      <TextFieldSlot px="2">
                        <IconButton size="2" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot px="3">
                        <IconButton size="2" variant="ghost" color="gray">
                          <DragHandleDots2Icon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput size="3" placeholder="Password" />
                      <TextFieldSlot px="3">
                        <IconButton size="2" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot px="3">
                        <IconButton size="3" variant="ghost" color="gray">
                          <DragHandleDots2Icon />
                        </IconButton>
                      </TextFieldSlot>
                      <TextFieldInput size="3" placeholder="Password" />
                      <TextFieldSlot px="3">
                        <IconButton size="3" variant="ghost" color="gray">
                          <EyeClosedIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <div />
                  <div />

                  <Flex direction="column" align="start" gap="3">
                    <Heading>With slots</Heading>
                    <Text size="2" color="gray" mt="-3">
                      mixed
                    </Text>
                    <TextFieldRoot>
                      <TextFieldSlot px="1">
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput size="1" placeholder="First name" />
                      <TextFieldSlot>
                        <IconButton size="1" variant="soft" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="soft" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot px="2">
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput size="2" placeholder="First name" />
                      <TextFieldSlot px="1">
                        <IconButton size="1" variant="soft" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="soft" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot pl="3" pr="2">
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput size="3" placeholder="First name" />
                      <TextFieldSlot px="1">
                        <IconButton size="2" variant="soft" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <Button size="2" variant="soft" color="gray">
                          open
                        </Button>
                      </TextFieldSlot>
                    </TextFieldRoot>
                  </Flex>

                  <Flex direction="column" align="start" gap="3">
                    <Heading>With slots</Heading>
                    <Text size="2" color="gray" mt="-3">
                      mixed + ghost
                    </Text>
                    <TextFieldRoot>
                      <TextFieldSlot px="1">
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput size="1" placeholder="First name" />
                      <TextFieldSlot px="1" gap="2">
                        <IconButton size="1" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot px="2">
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput size="2" placeholder="First name" />
                      <TextFieldSlot px="2" gap="2">
                        <IconButton size="1" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <IconButton size="1" variant="ghost" color="gray">
                          <StarIcon />
                        </IconButton>
                      </TextFieldSlot>
                    </TextFieldRoot>

                    <TextFieldRoot>
                      <TextFieldSlot pl="3" pr="2">
                        <InfoCircledIcon />
                      </TextFieldSlot>
                      <TextFieldInput size="3" placeholder="First name" />
                      <TextFieldSlot px="3" gap="3">
                        <IconButton size="2" variant="ghost" color="gray">
                          <Share2Icon />
                        </IconButton>
                        <Button size="2" variant="ghost" color="gray">
                          open
                        </Button>
                      </TextFieldSlot>
                    </TextFieldRoot>
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
