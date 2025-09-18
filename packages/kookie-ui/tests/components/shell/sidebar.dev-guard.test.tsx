import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import { Shell } from '../../../src/components/index';

describe('Sidebar dev guards', () => {
  it('warns if both state and defaultState are provided', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderWithProviders(
      <Shell.Root>
        {/* @ts-expect-error intentional misuse */}
        <Shell.Sidebar presentation="fixed" state="expanded" defaultState="collapsed" onStateChange={() => {}}>
          sidebar
        </Shell.Sidebar>
        <Shell.Content>content</Shell.Content>
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
          {controlled ? (
            <Shell.Sidebar presentation="fixed" state="expanded">
              sidebar
            </Shell.Sidebar>
          ) : (
            <Shell.Sidebar presentation="fixed" defaultState="expanded">
              sidebar
            </Shell.Sidebar>
          )}
          <Shell.Content>content</Shell.Content>
        </Shell.Root>
      );
    }
    renderWithProviders(<Fixture />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
