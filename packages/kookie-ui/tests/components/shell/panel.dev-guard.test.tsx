import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import { Shell } from '../../../src/components/index';

describe('Panel dev guards', () => {
  it('warns if both open and defaultOpen are provided', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderWithProviders(
      <Shell.Root>
        <Shell.Rail presentation="fixed" />
        {/* @ts-expect-error intentional misuse for dev guard */}
        <Shell.Panel open defaultOpen>
          panel
        </Shell.Panel>
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
          <Shell.Rail presentation="fixed" />
          {controlled ? <Shell.Panel open>panel</Shell.Panel> : <Shell.Panel defaultOpen>panel</Shell.Panel>}
          <Shell.Content>content</Shell.Content>
        </Shell.Root>
      );
    }
    renderWithProviders(<Fixture />);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
