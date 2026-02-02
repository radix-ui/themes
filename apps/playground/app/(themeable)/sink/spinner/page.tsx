import { Spinner, Flex, Button, TextField, Grid } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { LoadingButtons } from '../../../../components/loading-buttons';

export default function SpinnerPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Spinner</DocsSectionHeading>
      <DocsSectionBody>
        <Grid gap="4">
          <Flex gap="4" align="center">
            <Spinner size="1" />
            <Spinner size="2" />
            <Spinner size="3" />

            <Spinner>
              <Button>Hello</Button>
            </Spinner>
          </Flex>

          <Flex gap="4" align="center">
            <TextField.Root defaultValue="horsebatterystaple" type="password" size="1">
              <TextField.Slot>
                <Spinner size="1" />
              </TextField.Slot>
            </TextField.Root>

            <TextField.Root defaultValue="horsebatterystaple" type="password" size="2">
              <TextField.Slot>
                <Spinner size="2" />
              </TextField.Slot>
            </TextField.Root>

            <TextField.Root defaultValue="horsebatterystaple" type="password" size="3">
              <TextField.Slot>
                <Spinner size="3" />
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          <LoadingButtons />
        </Grid>
      </DocsSectionBody>
    </DocsSection>
  );
}
