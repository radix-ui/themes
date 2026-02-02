import { Fragment } from 'react';
import { Text, Code, Grid, Flex, Box, Tabs, Table } from '@radix-ui/themes';
import { tabsListPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function TabsPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Tabs</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Body>
            {tabsListPropDefs.size.values.map((size) => (
              <Table.Row key={size}>
                <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                <Table.Cell>
                  <Tabs.Root defaultValue="account" activationMode="manual">
                    <Tabs.List size={size}>
                      <Tabs.Trigger value="account">Account</Tabs.Trigger>
                      <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
                      <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="account">
                      <Box py="5">Account</Box>
                    </Tabs.Content>
                    <Tabs.Content value="documents">
                      <Box py="5">Documents</Box>
                    </Tabs.Content>
                    <Tabs.Content value="settings">
                      <Box py="5">Settings</Box>
                    </Tabs.Content>
                  </Tabs.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Text as="p" my="5">
          <Code>color</Code> can be set per instance:
        </Text>
        <details>
          <summary>
            <Text size="2" color="gray">
              See color combinations
            </Text>
          </summary>
          <Grid gap="5" columns="3" align="center">
            {tabsListPropDefs.color.values.map((color) => (
              <Fragment key={color}>
                <Text>{color}</Text>
                <Flex>
                  <Tabs.Root defaultValue="account" activationMode="manual">
                    <Tabs.List size="1" color={color}>
                      <Tabs.Trigger value="account">Account</Tabs.Trigger>
                      <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
                      <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="account">
                      <Box py="5">Account</Box>
                    </Tabs.Content>
                    <Tabs.Content value="documents">
                      <Box py="5">Documents</Box>
                    </Tabs.Content>
                    <Tabs.Content value="settings">
                      <Box py="5">Settings</Box>
                    </Tabs.Content>
                  </Tabs.Root>
                </Flex>
                <Flex>
                  <Tabs.Root defaultValue="account" activationMode="manual">
                    <Tabs.List size="1" color={color} highContrast>
                      <Tabs.Trigger value="account">Account</Tabs.Trigger>
                      <Tabs.Trigger value="documents">Documents</Tabs.Trigger>
                      <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="account">
                      <Box py="5">Account</Box>
                    </Tabs.Content>
                    <Tabs.Content value="documents">
                      <Box py="5">Documents</Box>
                    </Tabs.Content>
                    <Tabs.Content value="settings">
                      <Box py="5">Settings</Box>
                    </Tabs.Content>
                  </Tabs.Root>
                </Flex>
              </Fragment>
            ))}
          </Grid>
        </details>
        <details>
          <summary>
            <Text size="2" color="gray">
              See wrap & justify options
            </Text>
          </summary>

          {tabsListPropDefs.wrap.values.map((wrap) => (
            <Flex key={wrap} gap="6">
              {tabsListPropDefs.justify.values.map((justify) => (
                <Box py="5" width="320px" key={justify}>
                  <Tabs.Root defaultValue="file" activationMode="manual">
                    <Tabs.List size="1" wrap={wrap} justify={justify}>
                      <Tabs.Trigger value="file">File</Tabs.Trigger>
                      <Tabs.Trigger value="edit">Edit</Tabs.Trigger>
                      <Tabs.Trigger value="view">View</Tabs.Trigger>
                      <Tabs.Trigger value="history">History</Tabs.Trigger>
                      <Tabs.Trigger value="bookmarks">Bookmarks</Tabs.Trigger>
                      <Tabs.Trigger value="profiles">Profiles</Tabs.Trigger>
                      <Tabs.Trigger value="tab">Tab</Tabs.Trigger>
                      <Tabs.Trigger value="window">Window</Tabs.Trigger>
                      <Tabs.Trigger value="help">Help</Tabs.Trigger>
                    </Tabs.List>
                  </Tabs.Root>
                </Box>
              ))}
            </Flex>
          ))}
        </details>
      </DocsSectionBody>
    </DocsSection>
  );
}
