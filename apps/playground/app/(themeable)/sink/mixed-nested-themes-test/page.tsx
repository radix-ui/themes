import { Theme } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { SampleNestedUI } from '../_components';

export default function MixedNestedThemesTest() {
  return (
    <DocsSection>
      <DocsSectionHeading>Mixed nested themes test</DocsSectionHeading>
      <DocsSectionBody>
        <SampleNestedUI title="Global theme">
          <Theme asChild accentColor="mint" appearance="dark" radius="none" scaling="90%">
            <SampleNestedUI title="Dark, Mint, no radius, 90%">
              <Theme asChild accentColor="amber" appearance="light" radius="full" scaling="110%">
                <SampleNestedUI title="Light, Amber, full radius, 110%">
                  <Theme
                    asChild
                    accentColor="tomato"
                    appearance="dark"
                    radius="large"
                    scaling="100%"
                  >
                    <SampleNestedUI title="Dark, Tomato, large radius, 100%" />
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
