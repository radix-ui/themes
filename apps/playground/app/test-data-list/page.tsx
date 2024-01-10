import Link from 'next/link';
import {
  Badge,
  DataListRoot,
  DataListRootGrid,
  DataListData,
  DataListItem,
  DataListLabel,
  Flex,
  Theme,
  Container,
  Text,
} from '@radix-ui/themes';

export default function DataListPage() {
  return (
    <html>
      <body>
        <Theme>
          <Container m="6">
            <Text weight="medium">Default</Text>
            <DataListRootGrid mt="2">
              <DataListItem>
                <DataListLabel>Obi wan</DataListLabel>
                <DataListData>Jedi Master</DataListData>
              </DataListItem>
              <DataListItem>
                <DataListLabel>Anakin</DataListLabel>
                <DataListData>Padewan</DataListData>
              </DataListItem>
            </DataListRootGrid>
          </Container>
          <Container m="6">
            <Text weight="medium">Vertical Layout</Text>
            <DataListRootGrid direction="column" mt="2">
              <DataListItem>
                <DataListLabel>Obi wan</DataListLabel>
                <DataListData>Jedi Master</DataListData>
              </DataListItem>
              <DataListItem>
                <DataListLabel>Anakin</DataListLabel>
                <DataListData>Padewan</DataListData>
              </DataListItem>
            </DataListRootGrid>
          </Container>
          <Container m="6">
            <Text weight="medium">Varied data</Text>
            <DataListRootGrid mt="2">
              <DataListItem>
                <DataListLabel>Name</DataListLabel>
                <DataListData>Jane Roe</DataListData>
              </DataListItem>

              <DataListItem>
                <DataListLabel>Email</DataListLabel>
                <DataListData>janeroe@foo-corp.com</DataListData>
              </DataListItem>

              <DataListItem>
                <DataListLabel>Organization</DataListLabel>
                <DataListData>
                  <Link href="https://foo-corp.com">Foo Corp</Link>
                </DataListData>
              </DataListItem>
            </DataListRootGrid>
          </Container>
          <Container m="6">
            <DataListRootGrid mt="2">
              <DataListItem>
                <DataListLabel>Name</DataListLabel>
                <DataListData>Jane Roe</DataListData>
              </DataListItem>

              <DataListItem>
                <DataListLabel>Email</DataListLabel>
                <DataListData>janeroe@foo-corp.com</DataListData>
              </DataListItem>

              <DataListItem>
                <DataListLabel>Organization</DataListLabel>
                <DataListData>
                  <Link href="https://foo-corp.com">Foo Corp</Link>
                </DataListData>
              </DataListItem>
            </DataListRootGrid>
          </Container>
          <Container m="6">
            <DataListRootGrid>
              <DataListItem>
                <DataListLabel>Status</DataListLabel>
                <DataListData>
                  <Badge color="green" size="1" style={{ marginLeft: -2 }}>
                    Active
                  </Badge>
                </DataListData>
              </DataListItem>

              <DataListItem>
                <DataListLabel>Name</DataListLabel>
                <DataListData>Jane Roe</DataListData>
              </DataListItem>

              <DataListItem>
                <DataListLabel>Email</DataListLabel>
                <DataListData>janeroe@foo-corpcom</DataListData>
              </DataListItem>

              <DataListItem align="center">
                <DataListLabel>Authentication</DataListLabel>
                <DataListData>
                  <Flex gap="2" mx="-1">
                    {/* <ProviderIcon provider="google" size="2" />
                    <ProviderIcon provider="microsoft" size="2" /> */}
                  </Flex>
                </DataListData>
              </DataListItem>
            </DataListRootGrid>
          </Container>
        </Theme>
      </body>
    </html>
  );
}
