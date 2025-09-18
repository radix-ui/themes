import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import { Shell } from '../../../src/components/index';

describe('Bottom dev guards', () => {
  it('warns if both open and defaultOpen are provided', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderWithProviders(
      <Shell.Root>
        <Shell.Content>content</Shell.Content>
        {/* @ts-expect-error intentional misuse */}
        <Shell.Bottom presentation={{ initial: 'fixed' }} open defaultOpen>
          bottom
        </Shell.Bottom>
      </Shell.Root>,
    );
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('warns when switching between controlled and uncontrolled across renders', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    function Fixture() {
      const [controlled, setControlled] = React.useState(false);
      React.useEffect(() => setControlled(true), []);
      return (
        <Shell.Root>
          <Shell.Content>content</Shell.Content>
          {controlled ? (
            <Shell.Bottom presentation={{ initial: 'fixed' }} open>
              bottom
            </Shell.Bottom>
          ) : (
            <Shell.Bottom presentation={{ initial: 'fixed' }} defaultOpen>
              bottom
            </Shell.Bottom>
          )}
        </Shell.Root>
      );
    }
    renderWithProviders(<Fixture />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
