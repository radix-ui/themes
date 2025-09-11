'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Button,
  Text,
  Flex,
  Box,
  Heading,
  Tabs,
  Table,
  IconButton,
  Badge,
  DropdownMenu,
} from '@kushagradhawan/kookie-ui';
import { Info, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const sizes = ['1', '2', '3', '4'] as const;
const alignments = ['start', 'center'] as const;

// Helper function to get appropriate text size based on dialog size
const getTextSize = (dialogSize: string): '1' | '2' | '3' => {
  const sizeMap = { '1': '1', '2': '2', '3': '2', '4': '3' } as const;
  return sizeMap[dialogSize as keyof typeof sizeMap];
};

// Helper function to get appropriate heading size based on dialog size
const getHeadingSize = (dialogSize: string): '2' | '3' | '4' | '5' => {
  const sizeMap = { '1': '2', '2': '3', '3': '4', '4': '5' } as const;
  return sizeMap[dialogSize as keyof typeof sizeMap];
};

// Component to test pointer events cleanup
function PointerEventsTestDialog() {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [clickCount, setClickCount] = useState(0);
  const [bodyPointerEvents, setBodyPointerEvents] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Monitor body pointer events
  useEffect(() => {
    const checkBodyPointerEvents = () => {
      const computedStyle = window.getComputedStyle(document.body);
      const pointerEvents = computedStyle.pointerEvents;
      setBodyPointerEvents(pointerEvents);
    };

    // Check initially
    checkBodyPointerEvents();

    // Check periodically
    const interval = setInterval(checkBodyPointerEvents, 100);

    return () => clearInterval(interval);
  }, []);

  const handleTestClick = () => {
    setClickCount((prev) => prev + 1);
    if (testStatus === 'testing') {
      setTestStatus('success');
    }
  };

  const handleUploadAction = async () => {
    setTestStatus('testing');

    // Simulate an upload action that should close the dialog
    // In a real app, this would be an actual upload process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate successful upload - dialog should close automatically
    // This tests if the component properly handles cleanup when dialog closes
    // without explicitly calling Dialog.Close
    setIsDialogOpen(false);
  };

  const resetTest = () => {
    setTestStatus('idle');
    setClickCount(0);
  };

  return (
    <Flex direction="column" gap="3">
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger>
          <Button variant="soft" color="orange">
            <Info />
            Test Upload Dialog
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Image Upload Dialog</Dialog.Title>
          <Dialog.Description>
            This test simulates a real-world scenario where an upload action should close the dialog
            automatically. It checks if pointer events are properly cleaned up when the dialog
            closes without explicitly calling Dialog.Close.
          </Dialog.Description>

          <Flex direction="column" gap="4" mt="4">
            {/* Test Instructions */}
            <Box
              p="3"
              style={{ backgroundColor: 'var(--color-gray-2)', borderRadius: 'var(--radius-2)' }}
            >
              <Text size="2" weight="medium" mb="2">
                Test Steps:
              </Text>
              <Flex direction="column" gap="1" style={{ paddingLeft: '1rem' }}>
                <Text size="1" color="gray">
                  1. Click "Upload Options" dropdown below
                </Text>
                <Text size="1" color="gray">
                  2. Select "Upload Image" (simulates real upload action)
                </Text>
                <Text size="1" color="gray">
                  3. Wait for upload to complete and dialog to close
                </Text>
                <Text size="1" color="gray">
                  4. Click the test button outside to verify pointer events work
                </Text>
              </Flex>
            </Box>

            {/* Dropdown Menu with Upload Action */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="surface" color="blue" disabled={testStatus === 'testing'}>
                  {testStatus === 'testing' ? 'Uploading...' : 'Upload Options'}
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item disabled={testStatus === 'testing'}>
                  Take Photo
                </DropdownMenu.Item>
                <DropdownMenu.Item disabled={testStatus === 'testing'}>
                  Choose from Gallery
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  color="green"
                  onClick={handleUploadAction}
                  disabled={testStatus === 'testing'}
                >
                  {testStatus === 'testing' ? 'Uploading...' : 'Upload Image'}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            {/* Status Display */}
            <Box
              p="3"
              style={{ backgroundColor: 'var(--color-gray-2)', borderRadius: 'var(--radius-2)' }}
            >
              <Text size="2" weight="medium" mb="2">
                Test Status:
              </Text>
              <Flex align="center" gap="2" mb="2">
                {testStatus === 'idle' && <AlertCircle size={16} color="var(--color-gray-9)" />}
                {testStatus === 'testing' && (
                  <AlertCircle size={16} color="var(--color-orange-9)" />
                )}
                {testStatus === 'success' && <CheckCircle size={16} color="var(--color-green-9)" />}
                {testStatus === 'failed' && <XCircle size={16} color="var(--color-red-9)" />}
                <Text size="1" color="gray">
                  {testStatus === 'idle' && 'Ready to test upload action'}
                  {testStatus === 'testing' && 'Uploading... dialog will close automatically'}
                  {testStatus === 'success' && 'Success! Upload completed and pointer events work'}
                  {testStatus === 'failed' && 'Failed - pointer events may be blocked after upload'}
                </Text>
              </Flex>
              <Text size="1" color="gray">
                Body pointer-events: <Text weight="medium">{bodyPointerEvents}</Text>
              </Text>
            </Box>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Button variant="soft" color="gray" onClick={resetTest}>
              Reset Test
            </Button>
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Close Dialog
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* Test Button Outside Dialog */}
      <Flex
        direction="column"
        gap="2"
        p="3"
        style={{ backgroundColor: 'var(--color-gray-1)', borderRadius: 'var(--radius-2)' }}
      >
        <Text size="1" color="gray">
          Test Button (click after upload completes):
        </Text>
        <Button
          variant="outline"
          size="1"
          onClick={handleTestClick}
          disabled={testStatus === 'idle'}
        >
          Click Me ({clickCount} clicks)
        </Button>
        <Text size="1" color="gray">
          This button should be clickable after the upload action closes the dialog automatically.
        </Text>
      </Flex>
    </Flex>
  );
}

// Component to test the overlap scenario where both dialog and dropdown are open
function OverlapTestDialog() {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [clickCount, setClickCount] = useState(0);
  const [bodyPointerEvents, setBodyPointerEvents] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Monitor body pointer events
  useEffect(() => {
    const checkBodyPointerEvents = () => {
      const computedStyle = window.getComputedStyle(document.body);
      const pointerEvents = computedStyle.pointerEvents;
      setBodyPointerEvents(pointerEvents);
    };

    checkBodyPointerEvents();
    const interval = setInterval(checkBodyPointerEvents, 100);
    return () => clearInterval(interval);
  }, []);

  // Add keyboard shortcut to close dialog even when dropdown is open
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDialogOpen) {
        handleDialogClose();
      }
    };

    if (isDialogOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDialogOpen]);

  const handleTestClick = () => {
    setClickCount((prev) => prev + 1);
    if (testStatus === 'testing') {
      setTestStatus('success');
    }
  };

  const handleDialogClose = () => {
    // This simulates closing the dialog while dropdown might still be open
    setIsDialogOpen(false);
    setTestStatus('testing');
  };

  const resetTest = () => {
    setTestStatus('idle');
    setClickCount(0);
    setIsDropdownOpen(false);
  };

  return (
    <Flex direction="column" gap="3">
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger>
          <Button variant="soft" color="red">
            <Info />
            Test Overlap Bug
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Flex justify="between" align="center" mb="2">
            <Dialog.Title>Overlap Test Dialog</Dialog.Title>
            <Button
              variant="ghost"
              size="1"
              color="red"
              onClick={handleDialogClose}
              style={{ position: 'relative', zIndex: 1000 }}
            >
              ✕ Close
            </Button>
          </Flex>
          <Dialog.Description>
            This test reproduces the bug where both dialog and dropdown are open, then dialog closes
            directly. It checks if pointer events are properly cleaned up in this scenario.
            <br />
            <br />
            <Text size="1" color="gray">
              <strong>Note:</strong> This component now includes the Radix UI fix from{' '}
              <a
                href="https://github.com/radix-ui/primitives/issues/1241"
                target="_blank"
                rel="noopener noreferrer"
              >
                issue #1241
              </a>{' '}
              via onCloseAutoFocus handler.
            </Text>
          </Dialog.Description>

          <Flex direction="column" gap="4" mt="4">
            {/* Test Instructions */}
            <Box
              p="3"
              style={{ backgroundColor: 'var(--color-red-2)', borderRadius: 'var(--radius-2)' }}
            >
              <Text size="2" weight="medium" mb="2">
                Bug Reproduction Steps:
              </Text>
              <Flex direction="column" gap="1" style={{ paddingLeft: '1rem' }}>
                <Text size="1" color="gray">
                  1. Open this dialog
                </Text>
                <Text size="1" color="gray">
                  2. Open the dropdown menu below (keep it open)
                </Text>
                <Text size="1" color="gray">
                  3. Close the dialog by pressing <Text weight="medium">ESC key</Text> or clicking
                  the ✕ button in the header
                </Text>
                <Text size="1" color="gray">
                  4. Try clicking the test button outside - it should work
                </Text>
              </Flex>
            </Box>

            {/* Dropdown Menu that stays open */}
            <DropdownMenu.Root open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenu.Trigger>
                <Button variant="surface" color="purple">
                  Open Dropdown (keep open)
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>Option 1</DropdownMenu.Item>
                <DropdownMenu.Item>Option 2</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item color="red">Option 3</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            {/* Status Display */}
            <Box
              p="3"
              style={{ backgroundColor: 'var(--color-gray-2)', borderRadius: 'var(--radius-2)' }}
            >
              <Text size="2" weight="medium" mb="2">
                Test Status:
              </Text>
              <Flex align="center" gap="2" mb="2">
                {testStatus === 'idle' && <AlertCircle size={16} color="var(--color-gray-9)" />}
                {testStatus === 'testing' && (
                  <AlertCircle size={16} color="var(--color-orange-9)" />
                )}
                {testStatus === 'success' && <CheckCircle size={16} color="var(--color-green-9)" />}
                {testStatus === 'failed' && <XCircle size={16} color="var(--color-red-9)" />}
                <Text size="1" color="gray">
                  {testStatus === 'idle' && 'Ready to test overlap scenario'}
                  {testStatus === 'testing' &&
                    'Dialog closed with dropdown open - test button below'}
                  {testStatus === 'success' && 'Success! Pointer events work despite overlap'}
                  {testStatus === 'failed' && 'Bug confirmed - pointer events blocked'}
                </Text>
              </Flex>
              <Text size="1" color="gray">
                Body pointer-events: <Text weight="medium">{bodyPointerEvents}</Text>
              </Text>
              <Text size="1" color="gray" mt="1">
                Dropdown open: <Text weight="medium">{isDropdownOpen ? 'Yes' : 'No'}</Text>
              </Text>
              <Text size="1" color="gray" mt="1">
                Tip: Press <Text weight="medium">ESC</Text> to close dialog even when dropdown is
                open
              </Text>
            </Box>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Button variant="soft" color="gray" onClick={resetTest}>
              Reset Test
            </Button>
            <Button variant="soft" color="red" onClick={handleDialogClose}>
              Close Dialog (Test)
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      {/* Test Button Outside Dialog */}
      <Flex
        direction="column"
        gap="2"
        p="3"
        style={{ backgroundColor: 'var(--color-red-1)', borderRadius: 'var(--radius-2)' }}
      >
        <Text size="1" color="gray">
          Test Button (click after closing dialog with dropdown open):
        </Text>
        <Button
          variant="outline"
          size="1"
          onClick={handleTestClick}
          disabled={testStatus === 'idle'}
        >
          Click Me ({clickCount} clicks)
        </Button>
        <Text size="1" color="gray">
          This button tests if pointer events work after closing dialog while dropdown was open.
        </Text>
      </Flex>
    </Flex>
  );
}

export default function DialogPlayground() {
  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Badge size="2" variant="soft" color="orange" style={{ alignSelf: 'flex-start' }}>
          Updated
        </Badge>
        <Heading size="6" weight="bold">
          Dialog
        </Heading>
        <Text size="3" color="gray">
          A modal dialog that overlays the page content for focused tasks or messages.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="basic">
        <Tabs.List size="2">
          <Tabs.Trigger value="basic">Basic Examples</Tabs.Trigger>
          <Tabs.Trigger value="sizes">Sizes</Tabs.Trigger>
          <Tabs.Trigger value="alignments">Alignments</Tabs.Trigger>
        </Tabs.List>

        {/* Basic Examples Tab */}
        <Tabs.Content value="basic">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Dialog Type
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Trigger
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Description
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Simple Dialog
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button variant="soft">
                          <Info />
                          Open Dialog
                        </Button>
                      </Dialog.Trigger>
                      <Dialog.Content>
                        <Dialog.Title>Welcome to Kookie UI</Dialog.Title>
                        <Dialog.Description>
                          This is a simple dialog with a title and description. You can put any
                          content here.
                        </Dialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="ghost" color="gray">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button>Got it</Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">Basic dialog with title, description, and action buttons</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Confirmation Dialog
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button variant="soft">Confirm Action</Button>
                      </Dialog.Trigger>
                      <Dialog.Content>
                        <Dialog.Title>Confirm Changes</Dialog.Title>
                        <Dialog.Description>
                          Are you sure you want to save these changes? This will update your
                          preferences.
                        </Dialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button>Save Changes</Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">Confirmation dialog for user actions</Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Dialog + DropdownMenu Test
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <PointerEventsTestDialog />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">
                      <Badge size="1" color="orange" variant="soft">
                        Test Case
                      </Badge>
                      <br />
                      Tests pointer-events cleanup when upload action auto-closes dialog
                    </Text>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text size="1" color="gray">
                      Dialog + Dropdown Overlap Test
                    </Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    <OverlapTestDialog />
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2">
                      <Badge size="1" color="red" variant="soft">
                        Bug Test
                      </Badge>
                      <br />
                      Tests pointer-events cleanup when dialog closes while dropdown is open
                    </Text>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

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
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Trigger
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Description
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
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Button variant="soft" size={size}>
                            Open {size}
                          </Button>
                        </Dialog.Trigger>
                        <Dialog.Content size={size}>
                          <Dialog.Title size={getHeadingSize(size)}>
                            Dialog Size {size}
                          </Dialog.Title>
                          <Dialog.Description size={getTextSize(size)}>
                            This dialog demonstrates size {size} with appropriate content scaling.
                          </Dialog.Description>
                          <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                              <Button variant="soft" color="gray">
                                Close
                              </Button>
                            </Dialog.Close>
                          </Flex>
                        </Dialog.Content>
                      </Dialog.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="2">
                        {size === '1' && 'Compact dialog for simple messages'}
                        {size === '2' && 'Standard dialog for most use cases'}
                        {size === '3' && 'Larger dialog for detailed content'}
                        {size === '4' && 'Maximum size for complex layouts'}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>

        {/* Alignments Tab */}
        <Tabs.Content value="alignments">
          <Box pt="4">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ width: '120px' }}>
                    <Text size="1" color="gray">
                      Alignment
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '200px' }}>
                    <Text size="1" color="gray">
                      Trigger
                    </Text>
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ width: '300px' }}>
                    <Text size="1" color="gray">
                      Description
                    </Text>
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {alignments.map((align) => (
                  <Table.Row key={align}>
                    <Table.RowHeaderCell>
                      <Text size="1" color="gray" style={{ textTransform: 'capitalize' }}>
                        {align}
                      </Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Button variant="soft" size="2">
                            {align === 'center' ? 'Center Aligned' : 'Top Aligned'}
                          </Button>
                        </Dialog.Trigger>
                        <Dialog.Content align={align}>
                          <Dialog.Title>
                            {align === 'center' ? 'Centered Dialog' : 'Top Aligned Dialog'}
                          </Dialog.Title>
                          <Dialog.Description>
                            This dialog is aligned to the {align} of the viewport.
                          </Dialog.Description>
                          <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                              <Button variant="soft" color="gray">
                                Close
                              </Button>
                            </Dialog.Close>
                          </Flex>
                        </Dialog.Content>
                      </Dialog.Root>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="2">
                        {align === 'center' && 'Dialog appears in the center of the viewport'}
                        {align === 'start' && 'Dialog appears near the top of the viewport'}
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
