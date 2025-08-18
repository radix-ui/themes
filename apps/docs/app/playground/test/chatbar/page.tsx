'use client';
import * as React from 'react';
import { Chatbar, IconButton, Flex, Box, Text } from '@kushagradhawan/kookie-ui';
import { ArrowRight, Plus } from 'lucide-react';

export default function Page() {
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [rejections, setRejections] = React.useState<Array<{ file: File; reason: string }>>([]);

  const handleSubmit = (payload: { value: string; attachments: any[] }) => {
    const trimmed = payload.value.trim();
    if (trimmed.length === 0 && payload.attachments.length === 0) return;
    setValue('');
  };

  const handleReject = (rej: Array<{ file: File; reason: 'type' | 'size' | 'count' }>) => {
    setRejections((prev) => [...rej, ...prev].slice(0, 5));
  };

  return (
    <Flex height="100vh" align="center" justify="center">
      <Box>
        <Chatbar.Root
          value={value}
          onValueChange={setValue}
          open={open}
          onOpenChange={setOpen}
          expandOn="focus"
          size="2"
          variant="classic"
          sendMode="whenDirty"
          onSubmit={handleSubmit}
          width="600px"
          minLines={2}
          maxLines={10}
          //  Dropzone
          dropzone={true}
          // Attachments config
          accept={['image/*', '.pdf', '.txt', '.zip']}
          multiple
          maxAttachments={10}
          maxFileSize={10_000_000}
          paste
          onAttachmentReject={handleReject}
        >
          <Chatbar.AttachmentsRow />
          <Chatbar.InlineStart>
            <Chatbar.AttachTrigger asChild>
              <IconButton aria-label="Add" variant="classic" size="2">
                <Plus />
              </IconButton>
            </Chatbar.AttachTrigger>
          </Chatbar.InlineStart>

          <Chatbar.Textarea submitOnEnter placeholder="Ask anything" />

          <Chatbar.InlineEnd>
            <Chatbar.Send>
              <ArrowRight />
            </Chatbar.Send>
          </Chatbar.InlineEnd>

          <Chatbar.Row>
            <Chatbar.RowStart>
              <Chatbar.AttachTrigger asChild>
                <IconButton aria-label="Add" variant="classic" size="2">
                  <Plus />
                </IconButton>
              </Chatbar.AttachTrigger>
            </Chatbar.RowStart>
            <Chatbar.RowEnd>
              <Chatbar.Send>
                <ArrowRight />
              </Chatbar.Send>
            </Chatbar.RowEnd>
          </Chatbar.Row>
        </Chatbar.Root>
        <Flex direction="column" gap="2" pt="2">
          <Text size="2" color="gray">
            Rejections (latest first):
          </Text>
          {rejections.slice(0, 5).map((r, i) => (
            <Text key={i} size="2" color="gray">
              {r.file.name} - {r.reason}
            </Text>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}
