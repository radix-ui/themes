import { Theme } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { SampleNestedUI } from '../_components';

export default function NestedAppearancesTest() {
  return (
    <DocsSection>
      <DocsSectionHeading>Nested appearances test</DocsSectionHeading>
      <DocsSectionBody>
        <SampleNestedUI title="Global appearance">
          <Theme asChild appearance="dark">
            <SampleNestedUI title="Always dark">
              <Theme asChild appearance="light">
                <SampleNestedUI title="Always light">
                  <Theme asChild appearance="dark">
                    <SampleNestedUI title="Always dark" />
                  </Theme>
                </SampleNestedUI>
              </Theme>
            </SampleNestedUI>
          </Theme>
        </SampleNestedUI>
      </DocsSectionBody>
    </DocsSection>
  );
}
