import Link from 'next/link';
import {
  Badge,
  Box,
  DataListRoot,
  DataListData,
  DataListItem,
  DataListLabel,
  Flex,
  Theme,
  Container,
  Text,
} from '@radix-ui/themes';
import { StarIcon, MagicWandIcon, StarFilledIcon } from '@radix-ui/react-icons';

export default function DataListPage() {
  return (
    <html>
      <body>
        <Theme>
          <Box ml="5">
            <Flex gap="2" mt="4" direction="column">
              <Text weight="medium" mb="2">
                Default
              </Text>
              <DataListRoot mt="2">
                <DataListItem>
                  <DataListLabel>Obi wan</DataListLabel>
                  <DataListData>Jedi Master</DataListData>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Anakin</DataListLabel>
                  <DataListData>Padewan</DataListData>
                </DataListItem>
              </DataListRoot>
            </Flex>
            <Flex gap="2" mt="4" direction="column">
              <Text weight="medium">Vertical Layout</Text>
              <DataListRoot direction="column" mt="2">
                <DataListItem>
                  <DataListLabel>Obi wan</DataListLabel>
                  <DataListData>Jedi Master</DataListData>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Anakin</DataListLabel>
                  <DataListData>Padewan</DataListData>
                </DataListItem>
              </DataListRoot>
            </Flex>
            <Flex gap="2" mt="4" direction="column">
              <Text weight="medium">Varied data</Text>
              <DataListRoot mt="2" direction="column">
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
              </DataListRoot>
            </Flex>
            <Flex gap="2" mt="4" direction="column">
              <Text weight="medium">Varied data 2</Text>
              <DataListRoot direction="row">
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
                      <StarIcon />
                      <MagicWandIcon />
                      <StarFilledIcon />
                    </Flex>
                  </DataListData>
                </DataListItem>
              </DataListRoot>
            </Flex>
          </Box>
        </Theme>
      </body>
    </html>
  );
}
