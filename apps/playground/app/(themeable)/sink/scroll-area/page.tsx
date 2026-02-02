import {
  AspectRatio,
  Box,
  Code,
  Em,
  Kbd,
  Quote,
  ScrollArea,
  Strong,
  Text,
  Table,
} from '@radix-ui/themes';
import { scrollAreaPropDefs } from '@radix-ui/themes/props';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { AspectRatioImage } from '../_components';

export default function ScrollAreaPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>ScrollArea</DocsSectionHeading>
      <DocsSectionBody>
        <Box style={{ width: 300, height: 350 }} mb="6">
          <ScrollArea>
            <Box
              mb="3"
              style={{
                height: 200,
                width: 600,
                backgroundColor: 'var(--accent-3)',
              }}
            />
            <Text as="p">
              The goal of typography is to relate font size, line height, and line width in a
              proportional way that maximizes beauty and makes reading easier and more pleasant. The
              question is: What proportion(s) will give us the best results? The golden ratio is
              often observed in nature where beauty and utility intersect; perhaps we can use this
              &quot;divine&quot; proportion to enhance these attributes in our typography.
            </Text>
            <Box style={{ width: 300 }} my="3">
              <AspectRatio ratio={16 / 9}>
                <AspectRatioImage />
              </AspectRatio>
            </Box>
            <Text as="p" size="3">
              The CSS rule <Code>-webkit-font-smoothing: antialiased;</Code> has been applied to all
              fonts.google.com pages where fonts are rendered. This results in browsers using the{' '}
              <Strong>greyscale antialiasing method</Strong> rather than default{' '}
              <Em>subpixel rendering</Em> of fonts. Press <Kbd>⌘ Q</Kbd> to quit.{' '}
              <Quote>
                I believe this was probably introduced to get around inconsistencies in rendering
                between browsers
              </Quote>
              , particular between Chrome and Safari on MacOS.
            </Text>
            <Box style={{ width: 300 }}>
              <AspectRatio ratio={1}>
                <AspectRatioImage />
              </AspectRatio>
            </Box>
          </ScrollArea>
        </Box>

        <Table.Root>
          <Table.Body>
            {scrollAreaPropDefs.size.values.map((size) => (
              <Table.Row key={size}>
                <Table.RowHeaderCell>size {size}</Table.RowHeaderCell>
                <Table.Cell>
                  <Box style={{ width: 200, height: 20 }}>
                    <ScrollArea type="always" size={size} scrollbars="horizontal">
                      <Box style={{ width: 600, height: '100%' }} />
                    </ScrollArea>
                  </Box>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Text as="p" my="5">
          <Code>radius</Code> can be set per instance:
        </Text>

        <details>
          <summary>
            <Text size="2" color="gray">
              See specific radius examples
            </Text>
          </summary>
          <Box mt="3">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell />
                  {scrollAreaPropDefs.size.values.map((size) => (
                    <Table.ColumnHeaderCell key={size}>size {size}</Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {scrollAreaPropDefs.radius.values.map((radius) => (
                  <Table.Row key={radius}>
                    <Table.RowHeaderCell>{radius}</Table.RowHeaderCell>
                    {scrollAreaPropDefs.size.values.map((size) => (
                      <Table.Cell key={size}>
                        <Box style={{ width: 200, height: 20 }}>
                          <ScrollArea
                            type="always"
                            radius={radius}
                            size={size}
                            scrollbars="horizontal"
                          >
                            <Box style={{ width: 600, height: '100%' }} />
                          </ScrollArea>
                        </Box>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </details>
      </DocsSectionBody>
    </DocsSection>
  );
}
