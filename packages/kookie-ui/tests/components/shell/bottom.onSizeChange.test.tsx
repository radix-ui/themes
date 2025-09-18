import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { fireEvent } from '@testing-library/react';
import { Shell } from '../../../src/components/index';

function App({
  onSizeChange,
  min = 100,
  max = 400,
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
      <Shell.Content>content</Shell.Content>
      <Shell.Bottom presentation={{ initial: 'fixed' }} defaultOpen resizable minSize={min} maxSize={max} onSizeChange={onSizeChange} sizeUpdate={sizeUpdate} sizeUpdateMs={sizeUpdateMs}>
        bottom
        <Shell.Bottom.Handle />
      </Shell.Bottom>
    </Shell.Root>
  );
}

describe('Bottom onSizeChange', () => {
  it('emits px on boundary keys (Home/End), clamped to min/max', () => {
    const spy = vi.fn();
    renderWithProviders(<App onSizeChange={spy} min={100} max={400} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(spy).toHaveBeenCalled();
    let [size, meta] = spy.mock.calls.at(-1)!;
    expect(meta).toEqual({ reason: 'resize' });
    expect(size).toBe(400);
    fireEvent.keyDown(slider, { key: 'Home' });
    [size, meta] = spy.mock.calls.at(-1)!;
    expect(meta).toEqual({ reason: 'resize' });
    expect(size).toBe(100);
  });

  it('throttle: rapid key repeats limited to budget', () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    renderWithProviders(<App onSizeChange={spy} sizeUpdate="throttle" sizeUpdateMs={50} />);
    const slider = screen.getByRole('slider');
    for (let i = 0; i < 10; i++) fireEvent.keyDown(slider, { key: 'End' });
    vi.advanceTimersByTime(40);
    const calls40 = spy.mock.calls.length;
    for (let i = 0; i < 10; i++) fireEvent.keyDown(slider, { key: 'Home' });
    vi.advanceTimersByTime(40);
    const calls80 = spy.mock.calls.length;
    expect(calls80 - calls40).toBe(0);
    vi.advanceTimersByTime(20);
    fireEvent.keyDown(slider, { key: 'End' });
    expect(spy.mock.calls.length).toBeGreaterThan(calls80);
    vi.useRealTimers();
  });
});
