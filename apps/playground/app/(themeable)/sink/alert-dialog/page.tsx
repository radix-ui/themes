import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';

export default function AlertDialogPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>AlertDialog</DocsSectionHeading>
      <DocsSectionBody>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant="solid">Open</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content maxWidth="450px">
            <Flex direction="column" gap="3">
              <AlertDialog.Title>Revoke setup link</AlertDialog.Title>
              <AlertDialog.Description>
                The setup link will no longer be accessible and any existing setup
                sessions will be revoked.
              </AlertDialog.Description>
              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                  <Button variant="solid" color="red">
                    Revoke link
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </DocsSectionBody>
    </DocsSection>
  );
}
