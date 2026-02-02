import { Avatar, Card, Flex, Grid, Heading, Text, Table } from '@radix-ui/themes';
import { cardPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function CardPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Card</DocsSectionHeading>
      <DocsSectionBody>
        <Table.Root>
          <Table.Body>
            {cardPropDefs.variant.values.map((variant) => (
              <Table.Row key={variant}>
                <Table.RowHeaderCell>{variant}</Table.RowHeaderCell>
                <Table.Cell>
                  <Flex gap="5">
                    <Card variant={variant}>
                      <Text as="p" size="2" weight="bold">
                        Quick start
                      </Text>
                      <Text as="p" color="gray" size="2">
                        Create a proof of concept app
                      </Text>
                    </Card>

                    <Card variant={variant} asChild>
                      <a href="#some-page">
                        <Text as="p" size="2" weight="bold">
                          Quick start
                        </Text>
                        <Text as="p" color="gray" size="2">
                          Create a proof of concept app
                        </Text>
                      </a>
                    </Card>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Grid columns="4" gap="5" my="7" style={{ marginLeft: 124 }}>
          <div>
            <Heading>Contacts</Heading>
            <Text as="p" color="gray" mb="4">
              Here are all your contacts:
            </Text>
            <Flex direction="column" gap="3">
              {Array.from({ length: 4 }, (_, i) => (
                <Card key={i} variant="surface" asChild>
                  <a href="#some-page">
                    <Flex align="center" gap="2">
                      <Avatar src="./api/avatar" fallback="D" />
                      <div>
                        <Text as="p" size="2" weight="medium">
                          Poppy Nichols
                        </Text>
                        <Text as="p" color="gray" size="1">
                          poppy.nichols@gmail.com
                        </Text>
                      </div>
                    </Flex>
                  </a>
                </Card>
              ))}
            </Flex>
          </div>
          <div>
            <Heading>Contacts</Heading>
            <Text as="p" color="gray" mb="4">
              Here are all your contacts:
            </Text>
            <Flex direction="column" gap="3">
              {Array.from({ length: 4 }, (_, i) => (
                <Card key={i} variant="classic" asChild>
                  <a href="#some-page">
                    <Flex align="center" gap="2">
                      <Avatar src="./api/avatar" fallback="D" />
                      <div>
                        <Text as="p" size="2" weight="medium">
                          Poppy Nichols
                        </Text>
                        <Text as="p" color="gray" size="1">
                          poppy.nichols@gmail.com
                        </Text>
                      </div>
                    </Flex>
                  </a>
                </Card>
              ))}
            </Flex>
          </div>
          <div>
            <Heading>Contacts</Heading>
            <Text as="p" color="gray" mb="4">
              Here are all your contacts:
            </Text>
            <Flex direction="column" gap="5">
              {Array.from({ length: 4 }, (_, i) => (
                <Card key={i} variant="ghost" asChild>
                  <a href="#some-page">
                    <Flex align="center" gap="2">
                      <Avatar src="./api/avatar" fallback="D" />
                      <div>
                        <Text as="p" size="2" weight="medium">
                          Poppy Nichols
                        </Text>
                        <Text as="p" color="gray" size="1">
                          poppy.nichols@gmail.com
                        </Text>
                      </div>
                    </Flex>
                  </a>
                </Card>
              ))}
            </Flex>
          </div>
        </Grid>

        <Table.Root>
          <Table.Body>
            {cardPropDefs.size.values.map((size) => (
              <Table.Row key={size}>
                <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                <Table.Cell>
                  <Card size={size} style={{ maxWidth: 'fit-content' }}>
                    <Text as="p" size={size} weight="bold" mb={size}>
                      Typography
                    </Text>
                    <Text as="p" color="gray" size={size} style={{ maxWidth: '40ch' }}>
                      The goal of typography is to relate font size, line height, and line width in
                      a proportional way that maximizes beauty and makes reading easier and more
                      pleasant.
                    </Text>
                  </Card>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </DocsSectionBody>
    </DocsSection>
  );
}
