'use client';
import * as React from 'react';
import { Chatbar, IconButton, Flex, Box } from '@kushagradhawan/kookie-ui';
import { ArrowRight, Plus } from 'lucide-react';

export default function Page() {
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleSend = (v: string) => {
    const trimmed = v.trim();
    if (trimmed.length === 0) return;
    setValue('');
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
          onSend={handleSend}
          width="500px"
          minLines={2}
          maxLines={10}
        >
          <Chatbar.InlineStart>
            <IconButton aria-label="Add" variant="ghost" size="2">
              <Plus />
            </IconButton>
          </Chatbar.InlineStart>

          <Chatbar.Textarea submitOnEnter placeholder="Ask anything" />

          <Chatbar.InlineEnd>
            <Chatbar.Send>
              <ArrowRight />
            </Chatbar.Send>
          </Chatbar.InlineEnd>

          <Chatbar.Row>
            <Chatbar.RowStart>
              <IconButton aria-label="Add" variant="ghost" size="2">
                <Plus />
              </IconButton>
              <IconButton aria-label="Add" variant="ghost" size="2">
                <Plus />
              </IconButton>
              <IconButton aria-label="Add" variant="ghost" size="2">
                <Plus />
              </IconButton>
              <IconButton aria-label="Add" variant="ghost" size="2">
                <Plus />
              </IconButton>
              <IconButton aria-label="Add" variant="ghost" size="2">
                <Plus />
              </IconButton>
            </Chatbar.RowStart>
            <Chatbar.RowEnd>
              <Chatbar.Send>
                <ArrowRight />
              </Chatbar.Send>
            </Chatbar.RowEnd>
          </Chatbar.Row>
        </Chatbar.Root>
      </Box>
    </Flex>
  );
}
