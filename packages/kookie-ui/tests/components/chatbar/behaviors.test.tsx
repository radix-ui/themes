import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import { Chatbar, IconButton } from '../../../src/components/index';

function ChatbarFixture(props: React.ComponentProps<typeof Chatbar.Root>) {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <Chatbar.Root {...props} value={value} onValueChange={setValue}>
        <Chatbar.AttachmentsRow />
        <Chatbar.Textarea aria-label="Message" />
        <Chatbar.Row>
          <Chatbar.AttachTrigger>
            <IconButton aria-label="Attach" />
          </Chatbar.AttachTrigger>
          <Chatbar.Send>Send</Chatbar.Send>
        </Chatbar.Row>
      </Chatbar.Root>
      {/* outside focus target */}
      <button aria-label="outside" />
    </div>
  );
}

describe('Chatbar behaviors', () => {
  it('expands on focus when expandOn="focus" and collapses on blur when empty', async () => {
    renderWithProviders(<ChatbarFixture expandOn="focus" />);
    const root = screen.getByLabelText('Message').closest('.rt-ChatbarRoot') as HTMLElement;
    expect(root).toHaveAttribute('data-state', 'closed');
    await userEvent.click(screen.getByLabelText('Message'));
    expect(root).toHaveAttribute('data-state', 'open');
    await userEvent.click(screen.getByLabelText('outside'));
    expect(root).toHaveAttribute('data-state', 'closed');
  });

  it('pasting files adds attachments and prevents filename text insertion', async () => {
    renderWithProviders(<ChatbarFixture expandOn="focus" paste />);
    const textarea = screen.getByLabelText('Message');
    const root = textarea.closest('.rt-ChatbarRoot') as HTMLElement;

    // Focus to open
    await userEvent.click(textarea);
    expect(root).toHaveAttribute('data-state', 'open');

    // Prepare a fake clipboard with a file item
    const file = new File(['file-bytes'], 'image.png', { type: 'image/png' });
    const clipboardData = {
      items: [
        {
          kind: 'file',
          getAsFile: () => file,
        },
      ],
    } as unknown as DataTransfer;

    fireEvent.paste(textarea, { clipboardData });

    // Attachments row should now render
    const list = screen.getByRole('list', { name: /attachments/i });
    expect(list).toBeInTheDocument();
    // Text value should remain empty (no filename pasted)
    expect((textarea as HTMLTextAreaElement).value).toBe('');
  });

  it('does not collapse on blur during native file dialog (guarded)', async () => {
    renderWithProviders(<ChatbarFixture expandOn="focus" />);
    const textarea = screen.getByLabelText('Message');
    const root = textarea.closest('.rt-ChatbarRoot') as HTMLElement;

    // Focus to open
    await userEvent.click(textarea);
    expect(root).toHaveAttribute('data-state', 'open');

    // Safari-like sequence: pointer down on attach trigger sets guard, then blur with relatedTarget=null
    const attachBtn = screen.getByRole('button', { name: /add attachments/i });
    fireEvent.pointerDown(attachBtn);
    fireEvent.blur(textarea, { relatedTarget: null });

    // Should remain open due to guard
    expect(root).toHaveAttribute('data-state', 'open');
  });
});
