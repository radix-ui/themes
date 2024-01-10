import Link from 'next/link';
import {
  DataListRoot,
  DataListData,
  DataListItem,
  DataListLabel,
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
          </Container>
          <Container m="6">
            <Text weight="medium">Vertical Layout</Text>
            <DataListRoot layout="vertical" mt="2">
              <DataListItem>
                <DataListLabel>Obi wan</DataListLabel>
                <DataListData>Jedi Master</DataListData>
              </DataListItem>
              <DataListItem>
                <DataListLabel>Anakin</DataListLabel>
                <DataListData>Padewan</DataListData>
              </DataListItem>
            </DataListRoot>
          </Container>
          <Container m="6">
            <Text weight="medium">Varied data</Text>
            <DataListRoot mt="2">
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
          </Container>
        </Theme>
      </body>
    </html>
  );
}
