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
  Text,
  Heading,
  Button,
  IconButton,
} from '@radix-ui/themes';
import { StarIcon, MagicWandIcon, StarFilledIcon, InfoCircledIcon } from '@radix-ui/react-icons';

export default function DataListPage() {
  return (
    <html>
      <body>
        <Theme>
          <Box ml="5" style={{ maxWidth: '688px', margin: 'auto' }}>
            <Flex gap="2" mt="4" direction="column">
              <Heading mb="5" size="3">
                Default
              </Heading>
              <DataListRoot mt="2">
                <DataListItem>
                  <DataListLabel>Jedi Master</DataListLabel>
                  <DataListData>Obi wan</DataListData>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Padewan</DataListLabel>
                  <DataListData>Anakin Skywalker</DataListData>
                </DataListItem>
              </DataListRoot>
            </Flex>
            <Flex gap="2" mt="4" direction="column">
              <Heading mb="5" size="3">
                Vertical Layout
              </Heading>
              <DataListRoot direction="column" mt="2">
                <DataListItem>
                  <DataListLabel>Jedi Master</DataListLabel>
                  <DataListData>Obi wan</DataListData>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Padewan</DataListLabel>
                  <DataListData>Anakin Skywalker</DataListData>
                </DataListItem>
              </DataListRoot>
            </Flex>

            <Box mb="6" mt="6">
              <Heading mb="5" size="3">
                With varied content
              </Heading>
              <DataListRoot direction={{ initial: 'column', sm: 'row' }}>
                <DataListItem>
                  <DataListLabel>Status</DataListLabel>
                  <DataListData>
                    <Badge color="green" size="1" style={{ marginLeft: -2 }}>
                      Active
                    </Badge>
                  </DataListData>
                </DataListItem>

                <DataListItem align="center">
                  <DataListLabel>Name</DataListLabel>
                  <DataListData>
                    <Button size="1">Add</Button>
                  </DataListData>
                </DataListItem>

                <DataListItem>
                  <DataListLabel>Email</DataListLabel>
                  <DataListData>vlad@workos.com</DataListData>
                </DataListItem>

                <DataListItem>
                  <DataListLabel>Organization</DataListLabel>
                  <DataListData>
                    <Link href="https://workos.com">WorkOS</Link>
                  </DataListData>
                </DataListItem>

                <DataListItem>
                  <DataListLabel>Long value</DataListLabel>
                  <DataListData>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisl et libero
                    ultricies viverra quis vitae quam. Proin a feugiat metus.
                  </DataListData>
                </DataListItem>

                <DataListItem align="center">
                  <DataListLabel>Authentication methods</DataListLabel>
                  <DataListData>
                    <Flex gap="2">
                      <StarIcon />
                      <MagicWandIcon />
                      <StarFilledIcon />
                    </Flex>
                  </DataListData>
                </DataListItem>

                <DataListItem>
                  <DataListLabel>Long value</DataListLabel>
                  <DataListData>
                    Sed luctus, est id feugiat blandit, sapien nisl lobortis arcu, eu malesuada
                    nulla ex ut lorem. In odio nisl, consectetur id commodo vel, posuere eu risus.
                  </DataListData>
                </DataListItem>
              </DataListRoot>
            </Box>

            <Box mb="6">
              <Heading mb="5" size="3">
                With nested flex
              </Heading>
              <DataListRoot>
                <DataListItem>
                  <DataListLabel width={80}>Appearance</DataListLabel>
                  <DataListData>
                    <Flex align="center" gap="1">
                      <IconButton size="1">
                        <InfoCircledIcon />
                      </IconButton>
                      <Text>System</Text>
                    </Flex>
                  </DataListData>
                </DataListItem>
              </DataListRoot>
            </Box>

            <Box mb="6">
              <Heading mb="5" size="3">
                One after another
              </Heading>
              <DataListRoot>
                <DataListItem>
                  <DataListLabel>Appearance</DataListLabel>
                  <DataListData>System</DataListData>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Radius</DataListLabel>
                  <DataListData>Medium</DataListData>
                </DataListItem>
              </DataListRoot>
              <DataListRoot mt="4">
                <DataListItem>
                  <DataListLabel>Page background</DataListLabel>
                  <DataListData>White</DataListData>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Link color</DataListLabel>
                  <DataListData>Blue</DataListData>
                </DataListItem>
              </DataListRoot>
            </Box>

            <Box mb="6">
              <Heading mb="5" size="3">
                With long label
              </Heading>
              <DataListRoot direction={{ initial: 'column', sm: 'row' }}>
                <DataListItem>
                  <DataListLabel width="350px">Name</DataListLabel>
                  <DataListData>Vlad Moroz</DataListData>
                </DataListItem>
                <DataListItem>
                  <DataListLabel width="350px">Email</DataListLabel>
                  <DataListData>vlad@workos.com</DataListData>
                </DataListItem>
                <DataListItem>
                  <DataListLabel width="350px">
                    Lorem ipsum dolor sit amet consectetur adipscing elit
                  </DataListLabel>
                  <DataListData>
                    <Link href="https://workos.com">WorkOS</Link>
                  </DataListData>
                </DataListItem>
              </DataListRoot>
            </Box>

            <Box mb="6">
              <Heading mb="5" size="3">
                With varied X & Y gaps
              </Heading>
              <DataListRoot direction={{ initial: 'column', sm: 'row' }} gapX="7" gapY="2">
                <DataListItem>
                  <DataListLabel>Name</DataListLabel>
                  <DataListData>Vlad Moroz</DataListData>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Email</DataListLabel>
                  <DataListData>vlad@workos.com</DataListData>
                </DataListItem>
                <DataListItem>
                  <DataListLabel>Lorem ipsum dolor</DataListLabel>
                  <DataListData>
                    <Link href="https://workos.com">WorkOS</Link>
                  </DataListData>
                </DataListItem>
              </DataListRoot>
            </Box>
          </Box>
        </Theme>
      </body>
    </html>
  );
}
