'use client';
import * as React from 'react';
import { Chatbar, IconButton, Flex, Box, Text } from '@kushagradhawan/kookie-ui';
import { ArrowRight, Plus } from 'lucide-react';

export default function Page() {
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [rejections, setRejections] = React.useState<Array<{ file: File; reason: string }>>([]);
  const [lastSubmission, setLastSubmission] = React.useState<{
    value: string;
    attachments: any[];
  } | null>(null);
  const [attachmentAttempts, setAttachmentAttempts] = React.useState<
    Array<{
      timestamp: Date;
      method: string;
      files: File[];
      success: boolean;
      reason?: string;
    }>
  >([]);

  const handleSubmit = (payload: { value: string; attachments: any[] }) => {
    const trimmed = payload.value.trim();
    if (trimmed.length === 0 && payload.attachments.length === 0) return;

    // Store the last submission for debugging
    setLastSubmission(payload);

    // Log to console for debugging
    console.log('Chatbar submit:', payload);

    setValue('');
  };

  const handleReject = (rej: Array<{ file: File; reason: 'type' | 'size' | 'count' }>) => {
    console.log('File rejection:', rej);
    setRejections((prev) => [...rej, ...prev].slice(0, 5));

    // Log rejection attempts
    const rejectionAttempt = {
      timestamp: new Date(),
      method: 'rejected',
      files: rej.map((r) => r.file),
      success: false,
      reason: rej.map((r) => r.reason).join(', '),
    };
    setAttachmentAttempts((prev) => [rejectionAttempt, ...prev.slice(0, 10)]);
  };

  // Custom attachment change handler to track attempts
  const handleAttachmentsChange = (attachments: any[]) => {
    console.log('Attachments changed:', attachments);

    // Track successful attachments
    if (attachments.length > 0) {
      const successAttempt = {
        timestamp: new Date(),
        method: 'success',
        files: attachments.map((a) => ({ name: a.name, size: a.size, type: a.type }) as any),
        success: true,
      };
      setAttachmentAttempts((prev) => [successAttempt, ...prev.slice(0, 10)]);
    }
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
          onAttachmentsChange={handleAttachmentsChange}
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

          <Text size="2" color="gray">
            Attachment Attempts (latest first):
          </Text>
          {attachmentAttempts.slice(0, 5).map((attempt, i) => (
            <Text key={i} size="2" color={attempt.success ? 'green' : 'red'}>
              {attempt.timestamp.toLocaleTimeString()} - {attempt.method} - {attempt.files.length}{' '}
              file(s)
              {attempt.reason && ` - ${attempt.reason}`}
            </Text>
          ))}

          {lastSubmission && (
            <>
              <Text size="2" color="gray">
                Last Submission:
              </Text>
              <Text size="2" color="gray">
                Message: "{lastSubmission.value || '(empty)'}"
              </Text>
              <Text size="2" color="gray">
                Attachments:{' '}
                {lastSubmission.attachments.length > 0
                  ? `${lastSubmission.attachments.length} file(s)`
                  : 'None'}
              </Text>
              {lastSubmission.attachments.length > 0 && (
                <Flex direction="column" gap="1" style={{ paddingLeft: 'var(--space-2)' }}>
                  {lastSubmission.attachments.map((attachment, i) => (
                    <Text key={i} size="1" color="gray">
                      • {attachment.name} ({attachment.type}, {Math.round(attachment.size / 1024)}
                      KB)
                    </Text>
                  ))}
                </Flex>
              )}
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
