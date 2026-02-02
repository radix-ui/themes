import { AspectRatio, Grid, Text } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { AspectRatioImage } from '../_components';

export default function AspectRatioPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>AspectRatio</DocsSectionHeading>
      <DocsSectionBody>
        <Grid gap="5" columns="4">
          <div>
            <Text as="p" size="1" color="gray" mb="2">
              1x2
            </Text>
            <AspectRatio ratio={1 / 2}>
              <AspectRatioImage />
            </AspectRatio>
          </div>
          <div>
            <Text as="p" size="1" color="gray" mb="2">
              1x1
            </Text>
            <AspectRatio>
              <AspectRatioImage />
            </AspectRatio>
          </div>
          <div>
            <Text as="p" size="1" color="gray" mb="2">
              16x9
            </Text>
            <AspectRatio ratio={16 / 9}>
              <AspectRatioImage />
            </AspectRatio>
          </div>
          <div>
            <Text as="p" size="1" color="gray" mb="2">
              2x1
            </Text>
            <AspectRatio ratio={2 / 1}>
              <AspectRatioImage />
            </AspectRatio>
          </div>
        </Grid>
      </DocsSectionBody>
    </DocsSection>
  );
}
