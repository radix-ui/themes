'use client';

import React from 'react';
import {
  Popover,
  Text,
  Flex,
  Box,
  Heading,
  Tabs,
  Table,
  Button,
  IconButton,
  TextArea,
  TextField,
} from '@kushagradhawan/kookie-ui';
import { MessageCircle, User, Info, Send, Bot, Heart, Star, MapPin } from 'lucide-react';

const sizes = ['1', '2', '3', '4'] as const;

// Helper function to get appropriate text size based on popover size
const getTextSize = (popoverSize: string): '1' | '2' | '3' => {
  const sizeMap = { '1': '1', '2': '2', '3': '2', '4': '3' } as const;
  return sizeMap[popoverSize as keyof typeof sizeMap];
};

// Helper function to get appropriate heading size based on popover size
const getHeadingSize = (popoverSize: string): '2' | '3' | '4' | '5' => {
  const sizeMap = { '1': '2', '2': '3', '3': '4', '4': '5' } as const;
  return sizeMap[popoverSize as keyof typeof sizeMap];
};

// Helper function to get appropriate button size based on popover size
const getButtonSize = (popoverSize: string): '1' | '2' => {
  const sizeMap = { '1': '1', '2': '1', '3': '2', '4': '2' } as const;
  return sizeMap[popoverSize as keyof typeof sizeMap];
};

// Helper function to get appropriate input size based on popover size
const getInputSize = (popoverSize: string): '1' | '2' | '3' => {
  const sizeMap = { '1': '1', '2': '2', '3': '2', '4': '3' } as const;
  return sizeMap[popoverSize as keyof typeof sizeMap];
};

export default function PopoverPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Heading size="6" weight="bold">
        Popover
      </Heading>
      <Text size="3" color="gray" mt="2">
        A floating panel that displays rich content relative to a trigger element.
      </Text>

      <Tabs.Root defaultValue="sizes">
        <Tabs.List size="2">
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
          <Tabs.Trigger value="rich-content">Rich Content</Tabs.Trigger>
        </Tabs.List>

        {/* Sizes Tab */}
        <Tabs.Content value="sizes">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Size
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Quick Info
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Detailed Content
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {sizes.map((size) => (
                  <Table.Row key={size}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray">
                        Size {size}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Popover.Root>
                        <Popover.Trigger>
                          <IconButton variant="soft" size={size}>
                            <Info />
                          </IconButton>
                        </Popover.Trigger>
                        <Popover.Content size={size} style={{ width: '280px' }}>
                          <Flex direction="column" gap="2">
                            <Text size={getTextSize(size)} weight="medium">
                              Quick tip
                            </Text>
                            <Text size="1" color="gray">
                              This feature helps you organize your content more effectively.
                            </Text>
                          </Flex>
                        </Popover.Content>
                      </Popover.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Popover.Root>
                        <Popover.Trigger>
                          <Button variant="soft" size={size}>
                            <User />
                            View Profile
                          </Button>
                        </Popover.Trigger>
                        <Popover.Content size={size} style={{ width: '320px' }}>
                          <Flex direction="column" gap="3">
                            <Flex align="center" gap="3">
                              <Box
                                style={{
                                  width:
                                    size === '1'
                                      ? '32px'
                                      : size === '2'
                                        ? '40px'
                                        : size === '3'
                                          ? '48px'
                                          : '56px',
                                  height:
                                    size === '1'
                                      ? '32px'
                                      : size === '2'
                                        ? '40px'
                                        : size === '3'
                                          ? '48px'
                                          : '56px',
                                  borderRadius: '50%',
                                  backgroundColor: 'var(--accent-3)',
                                }}
                              />
                              <Flex direction="column" gap="1">
                                <Text size={getTextSize(size)} weight="medium">
                                  Sarah Chen
                                </Text>
                                <Text size="1" color="gray">
                                  Product Designer
                                </Text>
                              </Flex>
                            </Flex>
                            <Text size="1" color="gray">
                              Sarah specializes in creating intuitive user experiences for complex
                              enterprise software. She has over 5 years of experience in design
                              systems and user research.
                            </Text>
                            <Flex gap="2">
                              <Button size={getButtonSize(size)} variant="soft">
                                Follow
                              </Button>
                              <Button size={getButtonSize(size)} variant="ghost">
                                Message
                              </Button>
                            </Flex>
                          </Flex>
                        </Popover.Content>
                      </Popover.Root>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Rich Content Tab */}
        <Tabs.Content value="rich-content">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '140px' }}>
                    <Text size="1" color="gray">
                      Content Type
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Example
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '400px' }}>
                    <Text size="1" color="gray">
                      Description
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {/* AI Chat Bot */}
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      AI Assistant
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Popover.Root>
                      <Popover.Trigger>
                        <Button variant="soft" color="blue">
                          <Bot />
                          Ask AI
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content size="3" style={{ width: '380px' }}>
                        <Flex direction="column" gap="4">
                          <Flex align="center" gap="2">
                            <Bot size={16} />
                            <Text size="2" weight="medium">
                              AI Assistant
                            </Text>
                          </Flex>

                          <Box
                            p="3"
                            style={{
                              backgroundColor: 'var(--gray-2)',
                              borderRadius: 'var(--radius-3)',
                            }}
                          >
                            <Text size="2" color="gray">
                              Hello! I'm here to help you with questions about the design system,
                              component usage, or any other development topics. What would you like
                              to know?
                            </Text>
                          </Box>

                          <Flex direction="column" gap="2">
                            <TextArea
                              placeholder="Ask me anything..."
                              size="2"
                              style={{ minHeight: '60px' }}
                            />
                            <Flex justify="end">
                              <Button size="2" variant="soft">
                                <Send size={14} />
                                Send
                              </Button>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Popover.Content>
                    </Popover.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Interactive AI chat interface with input field and conversation history
                    </Text>
                  </Table.Cell>
                </Table.Row>

                {/* User Card */}
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      User Profile
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Popover.Root>
                      <Popover.Trigger>
                        <Button variant="ghost" size="2">
                          @alexsmith
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content size="3" style={{ width: '300px' }}>
                        <Flex direction="column" gap="4">
                          <Flex align="center" gap="3">
                            <Box
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--blue-3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Text size="4" weight="bold" color="blue">
                                AS
                              </Text>
                            </Box>
                            <Flex direction="column" gap="1">
                              <Text size="4" weight="medium">
                                Alex Smith
                              </Text>
                              <Text size="2" color="gray">
                                Senior Frontend Engineer
                              </Text>
                            </Flex>
                          </Flex>

                          <Flex direction="column" gap="2">
                            <Flex align="center" gap="2">
                              <MapPin size={16} />
                              <Text size="2" color="gray">
                                San Francisco, CA
                              </Text>
                            </Flex>
                            <Text size="2" color="gray">
                              Building beautiful user interfaces with React and TypeScript.
                              Passionate about design systems and developer experience.
                            </Text>
                          </Flex>

                          <Flex justify="between" align="center">
                            <Flex gap="2">
                              <Button size="2" variant="soft">
                                <Heart size={14} />
                                Follow
                              </Button>
                              <Button size="2" variant="ghost">
                                Message
                              </Button>
                            </Flex>
                            <Flex align="center" gap="1">
                              <Star size={14} />
                              <Text size="2" color="gray">
                                4.9
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Popover.Content>
                    </Popover.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Rich user profile card with avatar, bio, location, and action buttons
                    </Text>
                  </Table.Cell>
                </Table.Row>

                {/* Quick Form */}
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Quick Form
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Popover.Root>
                      <Popover.Trigger>
                        <Button variant="soft" color="green">
                          <MessageCircle />
                          Leave Feedback
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content size="4" style={{ width: '380px' }}>
                        <Flex direction="column" gap="5">
                          <Heading size="5">Quick Feedback</Heading>

                          <Flex direction="column" gap="4">
                            <Flex direction="column" gap="2">
                              <Text size="3" weight="medium">
                                Your name
                              </Text>
                              <TextField.Root size="3" placeholder="Enter your name" />
                            </Flex>

                            <Flex direction="column" gap="2">
                              <Text size="3" weight="medium">
                                Message
                              </Text>
                              <TextArea
                                size="3"
                                placeholder="What's on your mind?"
                                style={{ minHeight: '100px' }}
                              />
                            </Flex>

                            <Text size="2" color="gray">
                              Your feedback helps us improve the product. We read every message and
                              appreciate your thoughts.
                            </Text>
                          </Flex>

                          <Flex justify="between">
                            <Button size="2" variant="ghost">
                              Cancel
                            </Button>
                            <Button size="2" variant="soft" color="green">
                              Send Feedback
                            </Button>
                          </Flex>
                        </Flex>
                      </Popover.Content>
                    </Popover.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Compact form interface for quick data collection with validation
                    </Text>
                  </Table.Cell>
                </Table.Row>

                {/* Information Card */}
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Info Card
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Popover.Root>
                      <Popover.Trigger>
                        <Button variant="ghost" size="2">
                          <Info />
                          Component Details
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content size="2" style={{ width: '320px' }}>
                        <Flex direction="column" gap="3">
                          <Flex direction="column" gap="1">
                            <Text size="3" weight="medium">
                              Button Component
                            </Text>
                            <Text size="1" color="gray">
                              v2.1.3 • Last updated 2 days ago
                            </Text>
                          </Flex>

                          <Text size="2" color="gray">
                            A versatile button component that supports multiple variants, sizes, and
                            states. Fully accessible with keyboard navigation and screen reader
                            support.
                          </Text>

                          <Flex direction="column" gap="2">
                            <Text size="2" weight="medium">
                              Key Features:
                            </Text>
                            <Flex direction="column" gap="1">
                              <Text size="1" color="gray">
                                • 6 visual variants (solid, soft, outline, etc.)
                              </Text>
                              <Text size="1" color="gray">
                                • 4 sizes with consistent spacing
                              </Text>
                              <Text size="1" color="gray">
                                • Icon support and loading states
                              </Text>
                              <Text size="1" color="gray">
                                • Full accessibility compliance
                              </Text>
                            </Flex>
                          </Flex>

                          <Button size="1" variant="soft">
                            View Documentation
                          </Button>
                        </Flex>
                      </Popover.Content>
                    </Popover.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="1" color="gray">
                      Detailed information card with structured content and metadata
                    </Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
