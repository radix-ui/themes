import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import { Shell } from '../../../src/components/index';

describe('Inspector dev guards', () => {
  it('warns if both open and defaultOpen are provided', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderWithProviders(
      <Shell.Root>
        <Shell.Content>content</Shell.Content>
        {/* @ts-expect-error intentional misuse */}
        <Shell.Inspector presentation={{ initial: 'fixed' }} open defaultOpen>
          inspector
        </Shell.Inspector>
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
            <Shell.Inspector presentation={{ initial: 'fixed' }} open>
              inspector
            </Shell.Inspector>
          ) : (
            <Shell.Inspector presentation={{ initial: 'fixed' }} defaultOpen>
              inspector
            </Shell.Inspector>
          )}
        </Shell.Root>
      );
    }
    renderWithProviders(<Fixture />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
