import type * as React from 'react';
import {
  ContextMenu,
  DropdownMenu,
  Flex,
  Grid,
  Select,
  Switch,
  Table,
  Text,
  TextArea,
  TextField,
  Button,
  Heading,
} from '@radix-ui/themes';

export function DropdownMenuContentDemo(props: React.ComponentProps<typeof DropdownMenu.Content>) {
  return (
    <DropdownMenu.Content {...props}>
      <DropdownMenu.Item shortcut="⌘+T">New Tab</DropdownMenu.Item>
      <DropdownMenu.Item shortcut="⌘+N">New Window</DropdownMenu.Item>
      <DropdownMenu.Item shortcut="⇧+⌘+N" disabled>
        New Private Window
      </DropdownMenu.Item>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>More Tools</DropdownMenu.SubTrigger>

        <DropdownMenu.SubContent>
          <DropdownMenu.Item shortcut="⌘+S">Save Page As…</DropdownMenu.Item>
          <DropdownMenu.Item>Create Shortcut…</DropdownMenu.Item>
          <DropdownMenu.Item>Name Window…</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Developer Tools</DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>

      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Label>Other</DropdownMenu.Label>
        <DropdownMenu.Item shortcut="⌘+P">Print</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘+Q" asChild>
          <a href="#logout">Logout</a>
        </DropdownMenu.Item>
      </DropdownMenu.Group>

      {props.variant === 'solid' && (
        <>
          <DropdownMenu.Separator />

          <DropdownMenu.CheckboxItem shortcut="⌘+B" checked>
            Show Bookmarks
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem>Show Full URLs</DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator />

          <DropdownMenu.Label>People</DropdownMenu.Label>
          <DropdownMenu.RadioGroup value="pedro">
            <DropdownMenu.RadioItem value="pedro">Pedro Duarte</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="colm">Colm Tuite</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />

          <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
        </>
      )}
    </DropdownMenu.Content>
  );
}

export function ContextMenuContentDemo(props: React.ComponentProps<typeof ContextMenu.Content>) {
  return (
    <ContextMenu.Content {...props}>
      <ContextMenu.Item shortcut="⌘+T">New Tab</ContextMenu.Item>
      <ContextMenu.Item shortcut="⌘+N">New Window</ContextMenu.Item>
      <ContextMenu.Item shortcut="⇧+⌘+N" disabled>
        New Private Window
      </ContextMenu.Item>
      <ContextMenu.Sub>
        <ContextMenu.SubTrigger>More Tools</ContextMenu.SubTrigger>

        <ContextMenu.SubContent>
          <ContextMenu.Item shortcut="⌘+S">Save Page As…</ContextMenu.Item>
          <ContextMenu.Item>Create Shortcut…</ContextMenu.Item>
          <ContextMenu.Item>Name Window…</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Developer Tools</ContextMenu.Item>
        </ContextMenu.SubContent>
      </ContextMenu.Sub>

      <ContextMenu.Separator />
      <ContextMenu.Group>
        <ContextMenu.Label>Other</ContextMenu.Label>
        <ContextMenu.Item shortcut="⌘+P">Print</ContextMenu.Item>
        <ContextMenu.Item shortcut="⌘+Q" asChild>
          <a href="#logout">Logout</a>
        </ContextMenu.Item>
      </ContextMenu.Group>

      {props.variant === 'solid' && (
        <>
          <ContextMenu.Separator />

          <ContextMenu.CheckboxItem shortcut="⌘+B" checked>
            Show Bookmarks
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem>Show Full URLs</ContextMenu.CheckboxItem>

          <ContextMenu.Separator />

          <ContextMenu.Label>People</ContextMenu.Label>
          <ContextMenu.RadioGroup value="pedro">
            <ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>

          <DropdownMenu.Separator />

          <ContextMenu.Item color="red">Delete</ContextMenu.Item>
        </>
      )}
    </ContextMenu.Content>
  );
}

type RightClickAreaProps = React.ComponentProps<typeof Grid> & {
  size: '1' | '2';
};
export function RightClickArea({ size = '2', ...props }: RightClickAreaProps) {
  return (
    <Grid
      height={size === '2' ? '48px' : '32px'}
      px="3"
      {...props}
      style={{
        placeItems: 'center',
        borderRadius: 'var(--radius-3)',
        border: '1px dashed var(--accent-6)',
        cursor: 'default',
        ...props.style,
      }}
    >
      <Text size="1" color="gray">
        Right-click here
      </Text>
    </Grid>
  );
}

export function SelectItemsDemo() {
  return (
    <>
      <Select.Group>
        <Select.Label>Fruits</Select.Label>
        <Select.Item value="orange">Orange</Select.Item>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="grapes" disabled>
          Grape
        </Select.Item>
      </Select.Group>

      <Select.Separator />

      <Select.Group>
        <Select.Label>Vegetables</Select.Label>
        <Select.Item value="carrot">Carrot</Select.Item>
        <Select.Item value="potato">Potato</Select.Item>
      </Select.Group>
    </>
  );
}

export function AspectRatioImage() {
  return (
    <img
      src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
      alt="A house in a forest"
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    />
  );
}

export function CustomUserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ width: '60%', height: '60%' }}
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SampleNestedUI({
  children,
  title,
  ...props
}: React.ComponentPropsWithRef<typeof Flex>) {
  return (
    <Flex
      p="5"
      gap="9"
      {...props}
      style={{
        boxShadow: '0 0 0 1px var(--gray-a6)',
        borderRadius: 'var(--radius-2)',
      }}
    >
      <div>
        <Heading size="2" trim="start" mb="3">
          {title}
        </Heading>
        <Flex direction="column" gap="3">
          <Grid gap="1">
            <Text as="p" weight="bold">
              Feedback
            </Text>
            <TextArea variant="classic" placeholder="Your feedback" />
          </Grid>
          <Flex asChild justify="between">
            <label>
              <Text color="gray" size="2">
                Attach screenshot?
              </Text>
              <Switch size="1" variant="classic" defaultChecked highContrast />
            </label>
          </Flex>
          <Grid columns="2" gap="2">
            <Button variant="surface">Back</Button>
            <Button variant="classic">Submit</Button>
          </Grid>
        </Flex>
      </div>

      {children}
    </Flex>
  );
}

export function PlaygroundForm({
  size,
  ...props
}: React.ComponentProps<typeof Flex> & {
  size?: React.ComponentProps<typeof TextField.Root>['size'];
}) {
  return (
    <Flex direction="column" gap="3" {...props}>
      <Grid gap="1">
        <Text size={size} weight="bold">
          Email
        </Text>
        <TextField.Root size={size} variant="classic" placeholder="Your email" />
      </Grid>
      <Grid gap="1">
        <Text size={size} weight="bold">
          Subject
        </Text>
        <Select.Root defaultValue="customer" size={size}>
          <Select.Trigger variant="classic" />
          <Select.Content>
            <Select.Item value="customer">Customer feedback</Select.Item>
            <Select.Item value="help">Help</Select.Item>
          </Select.Content>
        </Select.Root>
      </Grid>
      <Grid gap="1">
        <Text size={size} weight="bold">
          Feedback
        </Text>
        <TextArea size={size} variant="classic" placeholder="Your feedback" />
      </Grid>
      <Grid columns="2" gap="2">
        <Button size={size} variant="surface">
          Back
        </Button>
        <Button size={size} variant="classic">
          Submit
        </Button>
      </Grid>
    </Flex>
  );
}

export function TableExample(
  props: React.ComponentProps<typeof Table.Root> & { noEmail?: boolean },
) {
  const { noEmail, ...rootProps } = props;
  return (
    <Table.Root {...rootProps}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
          {!noEmail && <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>}
          <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>Andy</Table.RowHeaderCell>
          {!noEmail && <Table.Cell>andy@workos.com</Table.Cell>}
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeaderCell>Benoit</Table.RowHeaderCell>
          {!noEmail && <Table.Cell>benoit@workos.com</Table.Cell>}
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeaderCell>Lucas</Table.RowHeaderCell>
          {!noEmail && <Table.Cell>lucas@workos.com</Table.Cell>}
          <Table.Cell>Developer</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.RowHeaderCell>Vlad</Table.RowHeaderCell>
          {!noEmail && <Table.Cell>vlad@workos.com</Table.Cell>}
          <Table.Cell>Designer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}
