import { Chatbar, IconButton, Flex, RadioCards, CheckboxCards, Card, Text } from '@kushagradhawan/kookie-ui';
import { Paperclip } from 'lucide-react';
import React from 'react';

export default function ComponentShowcase() {
  const [radioValue, setRadioValue] = React.useState('dog');
  const [checkboxValues, setCheckboxValues] = React.useState<string[]>(['apple']);

  return (
    <Flex gap="4" direction="column">
      <Chatbar.Root
        size="2"
        variant="classic"
        open
        expandOn="both"
        minLines={2}
        maxLines={6}
        accept={['image/*']}
        sendMode="always"
        disabled={false}
        readOnly={false}
        dropzone={true}
        multiple={true}
        color="gray"
        paste={true}
        clearOnSubmit={true}
        onSubmit={({ value, attachments }) => {
          console.log('Submitted:', { value, attachments });
        }}
        onAttachmentReject={(rejections) => {
          console.log('Rejected attachments:', rejections);
        }}
        style={{ width: '100%' }}
      >
        <Chatbar.AttachmentsRow />
        <Chatbar.Textarea placeholder="Type a message..." />
        <Chatbar.Row>
          <Chatbar.AttachTrigger asChild>
            <IconButton size="2" highContrast variant="soft">
              <Paperclip />
            </IconButton>
          </Chatbar.AttachTrigger>
          <Chatbar.Send highContrast variant="ghost"></Chatbar.Send>
        </Chatbar.Row>
      </Chatbar.Root>
      <RadioCards.Root size="2" variant="classic" value={radioValue} onValueChange={setRadioValue}>
        <RadioCards.Item value="dog">
          <Flex direction="column" gap="1" align="start" style={{ width: '100%' }} p="1">
            <Text size="2" weight="medium">
              Dog
            </Text>
            <Text size="2" color="gray">
              Man's best friend
            </Text>
          </Flex>
        </RadioCards.Item>
        <RadioCards.Item value="cat">
          <Flex direction="column" gap="1" align="start" style={{ width: '100%' }} p="1">
            <Text size="2" weight="medium">
              Cat
            </Text>
            <Text size="2" color="gray">
              Independent spirit
            </Text>
          </Flex>
        </RadioCards.Item>
        <RadioCards.Item value="parrot">
          <Flex direction="column" gap="1" align="start" style={{ width: '100%' }} p="1">
            <Text size="2" weight="medium">
              Parrot
            </Text>
            <Text size="2" color="gray">
              Colorful and talkative
            </Text>
          </Flex>
        </RadioCards.Item>
      </RadioCards.Root>
      <CheckboxCards.Root size="2" variant="classic" value={checkboxValues} onValueChange={setCheckboxValues}>
        <CheckboxCards.Item value="apple">
          <Flex direction="column" gap="1" align="start" style={{ width: '100%' }} p="1">
            <Text size="2" weight="medium">
              Apple
            </Text>
            <Text size="2" color="gray">
              A sweet red fruit
            </Text>
          </Flex>
        </CheckboxCards.Item>
        <CheckboxCards.Item value="banana">
          <Flex direction="column" gap="1" align="start" style={{ width: '100%' }} p="1">
            <Text size="2" weight="medium">
              Banana
            </Text>
            <Text size="2" color="gray">
              Long yellow fruit
            </Text>
          </Flex>
        </CheckboxCards.Item>
        <CheckboxCards.Item value="grape">
          <Flex direction="column" gap="1" align="start" style={{ width: '100%' }} p="1">
            <Text size="2" weight="medium">
              Grape
            </Text>
            <Text size="2" color="gray">
              Tiny juicy fruit
            </Text>
          </Flex>
        </CheckboxCards.Item>
      </CheckboxCards.Root>
    </Flex>
  );
}
