'use client';

import * as React from 'react';
import { Box, Flex, Card, TextArea, Button, Popover, Text } from '@kushagradhawan/kookie-ui';

function ChatArea() {
  return (
    <>
      <Flex gap="3">
        {['1', '2', '3'].map((size) => (
          <Popover.Root key={size}>
            <Popover.Trigger>
              <Button variant="soft" size={size.toString() as '1' | '2' | '3'}>
                Size {size}
              </Button>
            </Popover.Trigger>
            <Popover.Content size={size.toString() as '1' | '2' | '3'}>
              {/* <Card
                variant="classic"
                size={size.toString() as '1' | '2' | '3'}
                style={{ height: '300px', width: '300px' }}
              > */}
              <Flex
                gap="3"
                direction="column"
                // height="100%"
                justify="end"
                height="600x"
                width="400px"
              >
                <Text size={size.toString() as '1' | '2' | '3'}>Hello</Text>
                <TextArea
                  variant="classic"
                  color="gray"
                  size={size.toString() as '1' | '2' | '3'}
                  style={{ height: '100px' }}
                />
                <Button variant="solid" size={size.toString() as '1' | '2' | '3'}>
                  Generate
                </Button>
              </Flex>
              {/* </Card> */}
            </Popover.Content>
          </Popover.Root>
        ))}
      </Flex>
      <Flex gap="3">
        {['1', '2', '3'].map((size) => (
          <Popover.Root modal={true} key={size}>
            <Popover.Trigger>
              <Button variant="soft" size={size.toString() as '1' | '2' | '3'}>
                Size {size}
              </Button>
            </Popover.Trigger>
            <Popover.Content
              size={size.toString() as '1' | '2' | '3'}
              onInteractOutside={(event) => event.preventDefault()}
            >
              <Card
                variant="classic"
                size={size.toString() as '1' | '2' | '3'}
                style={{ height: '300px', width: '300px' }}
              >
                <Flex
                  gap="3"
                  direction="column"
                  height="100%"
                  justify="end"
                  // height="600x"
                  // width="400px"
                >
                  <Text size={size.toString() as '1' | '2' | '3'}>Hello</Text>
                  <TextArea
                    variant="classic"
                    color="gray"
                    size={size.toString() as '1' | '2' | '3'}
                    style={{ height: '100px' }}
                  />
                  <Button variant="solid" size={size.toString() as '1' | '2' | '3'}>
                    Generate
                  </Button>
                </Flex>
              </Card>
            </Popover.Content>
          </Popover.Root>
        ))}
      </Flex>
    </>
  );
}

export default function ChatGPTInterface() {
  return (
    <Box style={{ height: '100vh', padding: '8px' }}>
      <Flex gap="2" style={{ height: '100%' }}>
        <ChatArea />
      </Flex>
    </Box>
  );
}
