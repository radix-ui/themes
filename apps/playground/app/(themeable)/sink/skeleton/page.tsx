import { ArrowRightIcon, InfoCircledIcon, StarIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  Badge,
  Blockquote,
  Box,
  Button,
  Callout,
  Card,
  Checkbox,
  Code,
  Flex,
  Grid,
  Heading,
  IconButton,
  Kbd,
  Link,
  RadioGroup,
  Select,
  Skeleton,
  Slider,
  Switch,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { PlaygroundForm, SelectItemsDemo, TableExample } from '../_components';

export default function SkeletonPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Skeleton</DocsSectionHeading>
      <DocsSectionBody>
        <Flex gap="9">
          <Box style={{ width: 400 }}>
            <Card size="4">
              <PlaygroundForm />
            </Card>

            <Flex gap="3" align="center" mt="6" wrap="wrap">
              <Avatar fallback="BG" />
              <Badge size="2" color="green">
                New
              </Badge>
              <Button>
                Next <ArrowRightIcon />
              </Button>
              <Checkbox size="3" defaultChecked />
              <Code>console.log()</Code>
              <IconButton>
                <StarIcon />
              </IconButton>
              <Kbd>⌘ Q</Kbd>
              <Link href="/">This is a link</Link>
              <RadioGroup.Root defaultValue="value" size="3">
                <RadioGroup.Item value="value" />
              </RadioGroup.Root>
              <Select.Root defaultValue="apple">
                <Select.Trigger />
                <Select.Content>
                  <SelectItemsDemo />
                </Select.Content>
              </Select.Root>
              <div style={{ minWidth: 150 }}>
                <Slider defaultValue={[33]} />
              </div>
              <Switch defaultChecked />
              <TextField.Root placeholder="Your name" />
              <TextArea placeholder="Your feedback" />
              <Heading size="5">Principles of the Typographic Craft</Heading>

              <Blockquote size="2" style={{ maxWidth: '50ch' }} color="gray">
                The goal of typography is to relate font size, line height, and line width in a
                proportional way that maximizes <Text highContrast>beauty</Text> and makes reading
                easier and more pleasant. The question is: What proportion(s) will give us the best
                results?
              </Blockquote>

              <Callout.Root>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  We have detected multiple issues in your application configuration file. Please
                  read our <Link href="/">Configuration Guide</Link> for more details.
                </Callout.Text>
              </Callout.Root>

              <TableExample variant="surface" noEmail />

              <Card size="5" />
            </Flex>
          </Box>

          <Box style={{ width: 400 }}>
            <Card size="4">
              <Flex direction="column" gap="3">
                <Grid gap="1">
                  <Text weight="bold">
                    <Skeleton>Email</Skeleton>
                  </Text>
                  <Skeleton>
                    <TextField.Root variant="classic" placeholder="Your email" />
                  </Skeleton>
                </Grid>
                <Grid gap="1">
                  <Text weight="bold">
                    <Skeleton>Subject</Skeleton>
                  </Text>
                  <Select.Root defaultValue="customer">
                    <Skeleton>
                      <Select.Trigger variant="classic" />
                    </Skeleton>
                  </Select.Root>
                </Grid>
                <Grid gap="1">
                  <Text weight="bold">
                    <Skeleton>Feedback</Skeleton>
                  </Text>
                  <Skeleton>
                    <TextArea variant="classic" placeholder="Your feedback" />
                  </Skeleton>
                </Grid>
                <Grid columns="2" gap="2">
                  <Skeleton>
                    <Button variant="surface">Back</Button>
                  </Skeleton>
                  <Skeleton>
                    <Button variant="classic">Submit</Button>
                  </Skeleton>
                </Grid>
              </Flex>
            </Card>

            <Flex gap="3" align="center" mt="6" wrap="wrap">
              <Skeleton>
                <Avatar fallback="BG" />
              </Skeleton>
              <Skeleton>
                <Badge size="2" color="green">
                  New
                </Badge>
              </Skeleton>
              <Skeleton>
                <Button>
                  Next <ArrowRightIcon />
                </Button>
              </Skeleton>
              <Skeleton>
                <Checkbox size="3" defaultChecked />
              </Skeleton>
              <Skeleton>
                <Code>console.log()</Code>
              </Skeleton>
              <Skeleton>
                <IconButton>
                  <StarIcon />
                </IconButton>
              </Skeleton>
              <Skeleton>
                <Kbd>⌘ Q</Kbd>
              </Skeleton>
              <Skeleton>
                <Link href="/">This is a link</Link>
              </Skeleton>
              <RadioGroup.Root defaultValue="value" size="3">
                <Skeleton>
                  <RadioGroup.Item value="value" />
                </Skeleton>
              </RadioGroup.Root>
              <Select.Root defaultValue="apple">
                <Skeleton>
                  <Select.Trigger />
                </Skeleton>
                <Select.Content>
                  <SelectItemsDemo />
                </Select.Content>
              </Select.Root>
              <div style={{ minWidth: 150 }}>
                <Skeleton>
                  <Slider defaultValue={[33]} />
                </Skeleton>
              </div>
              <Skeleton>
                <Switch defaultChecked />
              </Skeleton>
              <Skeleton>
                <TextField.Root placeholder="Your name" />
              </Skeleton>
              <Skeleton>
                <TextArea placeholder="Your feedback" />
              </Skeleton>
              <Skeleton>
                <Heading size="5">Principles of the Typographic Craft</Heading>
              </Skeleton>

              <Skeleton>
                <Blockquote size="2" style={{ maxWidth: '50ch' }} color="gray">
                  The goal of typography is to relate font size, line height, and line width in a
                  proportional way that maximizes <Text highContrast>beauty</Text> and makes reading
                  easier and more pleasant. The question is: What proportion(s) will give us the
                  best results?
                </Blockquote>
              </Skeleton>

              <Skeleton>
                <Callout.Root>
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    We have detected multiple issues in your application configuration file. Please
                    read our <Link href="/">Configuration Guide</Link> for more details.
                  </Callout.Text>
                </Callout.Root>
              </Skeleton>

              <Skeleton>
                <TableExample variant="surface" noEmail />
              </Skeleton>

              <Skeleton>
                <Card size="5" />
              </Skeleton>
            </Flex>
          </Box>
        </Flex>
      </DocsSectionBody>
    </DocsSection>
  );
}
