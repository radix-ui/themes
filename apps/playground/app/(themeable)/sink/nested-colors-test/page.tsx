import { Theme } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { SampleNestedUI } from '../_components';

export default function NestedColorsTest() {
  return (
    <DocsSection>
      <DocsSectionHeading>Nested colors test</DocsSectionHeading>
      <DocsSectionBody>
        <SampleNestedUI title="Global color">
          <Theme asChild accentColor="mint">
            <SampleNestedUI title="Always mint">
              <Theme asChild accentColor="amber">
                <SampleNestedUI title="Always amber">
                  <Theme asChild accentColor="tomato">
                    <SampleNestedUI title="Always tomato" />
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
