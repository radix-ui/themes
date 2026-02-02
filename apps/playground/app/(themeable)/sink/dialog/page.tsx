import { Button, Dialog, Flex } from '@radix-ui/themes';
import { DocsSection, DocsSectionBody, DocsSectionHeading } from '../docs-section';
import { InfoCircledIcon, Share2Icon } from '@radix-ui/react-icons';

export default function DialogPage() {
  return (
    <DocsSection>
      <DocsSectionHeading>Dialog</DocsSectionHeading>
      <DocsSectionBody>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="solid">Open</Button>
          </Dialog.Trigger>
          <Dialog.Content asChild maxWidth="450px">
            <Flex direction="column" gap="3">
              <InfoCircledIcon style={{ position: 'absolute', top: '24px', right: '20px' }} />
              <Dialog.Title>Share resource</Dialog.Title>
              <Dialog.Description>
                Jan Tschichold was a German calligrapher, typographer and book designer. He played a
                significant role in the development of graphic design in the 20th century.
              </Dialog.Description>
              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button variant="solid">
                    Share <Share2Icon />
                  </Button>
                </Dialog.Close>
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </DocsSectionBody>
    </DocsSection>
  );
}
