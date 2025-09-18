import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { fireEvent } from '@testing-library/react';
import { Shell } from '../../../src/components/index';

function App({
  onSizeChange,
  min = 120,
  max = 300,
  sizeUpdate,
  sizeUpdateMs,
}: {
  onSizeChange?: (size: number, meta: { reason: string }) => void;
  min?: number;
  max?: number;
  sizeUpdate?: 'throttle' | 'debounce';
  sizeUpdateMs?: number;
}) {
  return (
    <Shell.Root>
      <Shell.Rail presentation="fixed" />
      <Shell.Panel resizable expandedSize={200} minSize={min} maxSize={max} defaultOpen onSizeChange={onSizeChange} sizeUpdate={sizeUpdate} sizeUpdateMs={sizeUpdateMs}>
        panel
        <Shell.Panel.Handle />
      </Shell.Panel>
      <Shell.Content>content</Shell.Content>
    </Shell.Root>
  );
}

describe('Panel onSizeChange', () => {
  it('emits px on drag end (reason=resize)', () => {
    const spy = vi.fn();
    renderWithProviders(<App onSizeChange={spy} />);
    const slider = screen.getByRole('slider');
    // Start drag
    fireEvent.pointerDown(slider, { pointerId: 1, clientX: 0 });
    fireEvent.pointerMove(window, { clientX: 250 });
    fireEvent.pointerUp(window);
    expect(spy).toHaveBeenCalled();
    const [size, meta] = spy.mock.calls.at(-1)!;
    expect(typeof size).toBe('number');
    expect(meta).toEqual({ reason: 'resize' });
  });

  it('Arrow/Home/End adjust and emit onSizeChange at end of key action', () => {
    const spy = vi.fn();
    renderWithProviders(<App onSizeChange={spy} min={120} max={300} />);
    const slider = screen.getByRole('slider');
    // End -> max
    fireEvent.keyDown(slider, { key: 'End' });
    expect(spy).toHaveBeenCalled();
    let [size, meta] = spy.mock.calls.at(-1)!;
    expect(meta).toEqual({ reason: 'resize' });
    expect(size).toBe(300);
    // Home -> min
    fireEvent.keyDown(slider, { key: 'Home' });
    [size, meta] = spy.mock.calls.at(-1)!;
    expect(meta).toEqual({ reason: 'resize' });
    expect(size).toBe(120);
  });

  it('throttle: rapid key repeats limited to budget', async () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    renderWithProviders(<App onSizeChange={spy} sizeUpdate="throttle" sizeUpdateMs={50} />);
    const slider = screen.getByRole('slider');
    for (let i = 0; i < 10; i++) fireEvent.keyDown(slider, { key: 'End' });
    // Advance less than the threshold
    vi.advanceTimersByTime(40);
    // No more calls beyond initial
    const calls40 = spy.mock.calls.length;
    for (let i = 0; i < 10; i++) fireEvent.keyDown(slider, { key: 'Home' });
    vi.advanceTimersByTime(40);
    const calls80 = spy.mock.calls.length;
    expect(calls80 - calls40).toBe(0);
    // Advance past threshold and fire again
    vi.advanceTimersByTime(20);
    fireEvent.keyDown(slider, { key: 'End' });
    expect(spy.mock.calls.length).toBeGreaterThan(calls80);
    vi.useRealTimers();
  });
});
