import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import { fireEvent } from '@testing-library/react';
import { Shell } from '../../../src/components/index';
import { useLeftMode, usePanelMode, useSidebarMode, useInspectorMode, useBottomMode, useShellActions, usePeek } from '../../../src/components/shell.context';

function Counter({ id, useSlice }: { id: string; useSlice: () => { label: string; value: string } }) {
  const rendersRef = React.useRef(0);
  rendersRef.current += 1;
  const slice = useSlice();
  return <div data-testid={`counter-${id}`} data-value={`${slice.label}:${slice.value}`} data-renders={rendersRef.current} />;
}

const MemoCounter = React.memo(Counter);

function useLeftSlice() {
  const { leftMode } = useLeftMode();
  return { label: 'left', value: leftMode } as const;
}
function usePanelSlice() {
  const { panelMode } = usePanelMode();
  return { label: 'panel', value: panelMode } as const;
}
function useSidebarSlice() {
  const { sidebarMode } = useSidebarMode();
  return { label: 'sidebar', value: sidebarMode } as const;
}
function useInspectorSlice() {
  const { inspectorMode } = useInspectorMode();
  return { label: 'inspector', value: inspectorMode } as const;
}
function useBottomSlice() {
  const { bottomMode } = useBottomMode();
  return { label: 'bottom', value: bottomMode } as const;
}

function Controls() {
  const actions = useShellActions();
  const { peekPane, clearPeek } = usePeek();
  return (
    <>
      <button onClick={() => actions.expandPane('panel')} data-testid="expand-panel" />
      <button onClick={() => actions.collapsePane('panel')} data-testid="collapse-panel" />
      <button onClick={() => actions.expandPane('inspector')} data-testid="expand-inspector" />
      <button onClick={() => actions.collapsePane('inspector')} data-testid="collapse-inspector" />
      <button onClick={() => actions.expandPane('bottom')} data-testid="expand-bottom" />
      <button onClick={() => actions.collapsePane('bottom')} data-testid="collapse-bottom" />
      <button onMouseEnter={() => peekPane('panel')} onMouseLeave={() => clearPeek()} data-testid="peek-panel" />
      <button onMouseEnter={() => peekPane('sidebar')} onMouseLeave={() => clearPeek()} data-testid="peek-sidebar" />
      <button onMouseEnter={() => peekPane('inspector')} onMouseLeave={() => clearPeek()} data-testid="peek-inspector" />
      <button onMouseEnter={() => peekPane('bottom')} onMouseLeave={() => clearPeek()} data-testid="peek-bottom" />
    </>
  );
}

function App() {
  return (
    <Shell.Root>
      <Shell.Rail presentation="fixed" />
      <Shell.Panel>panel</Shell.Panel>
      <Shell.Sidebar presentation={{ initial: 'fixed' }}>sidebar</Shell.Sidebar>
      <Shell.Content>
        <Controls />
        <MemoCounter id="left" useSlice={useLeftSlice} />
        <MemoCounter id="panel" useSlice={usePanelSlice} />
        <MemoCounter id="sidebar" useSlice={useSidebarSlice} />
        <MemoCounter id="inspector" useSlice={useInspectorSlice} />
        <MemoCounter id="bottom" useSlice={useBottomSlice} />
      </Shell.Content>
      <Shell.Inspector>inspector</Shell.Inspector>
      <Shell.Bottom>bottom</Shell.Bottom>
    </Shell.Root>
  );
}

describe('Selector hooks rerender guards', () => {
  it('panel updates do not rerender sidebar/inspector/bottom counters', () => {
    renderWithProviders(<App />);
    const panel = screen.getByTestId('counter-panel');
    const sidebar = screen.getByTestId('counter-sidebar');
    const inspector = screen.getByTestId('counter-inspector');
    const bottom = screen.getByTestId('counter-bottom');

    const sidebarR1 = Number(sidebar.getAttribute('data-renders'));
    const inspectorR1 = Number(inspector.getAttribute('data-renders'));
    const bottomR1 = Number(bottom.getAttribute('data-renders'));

    fireEvent.click(screen.getByTestId('expand-panel'));

    // panel changes
    const panelAfter = Number(panel.getAttribute('data-renders'));
    expect(panelAfter).toBeGreaterThanOrEqual(1);

    // unrelated counters stable
    const sidebarR2 = Number(sidebar.getAttribute('data-renders'));
    const inspectorR2 = Number(inspector.getAttribute('data-renders'));
    const bottomR2 = Number(bottom.getAttribute('data-renders'));
    expect(sidebarR2).toBe(sidebarR1);
    expect(inspectorR2).toBe(inspectorR1);
    expect(bottomR2).toBe(bottomR1);
  });

  it('inspector/bottom updates do not rerender panel/sidebar counters', () => {
    renderWithProviders(<App />);
    const panel = screen.getByTestId('counter-panel');
    const sidebar = screen.getByTestId('counter-sidebar');

    const panelR1 = Number(panel.getAttribute('data-renders'));
    const sidebarR1 = Number(sidebar.getAttribute('data-renders'));

    fireEvent.click(screen.getByTestId('expand-inspector'));
    fireEvent.click(screen.getByTestId('expand-bottom'));

    const panelR2 = Number(panel.getAttribute('data-renders'));
    const sidebarR2 = Number(sidebar.getAttribute('data-renders'));

    expect(panelR2).toBe(panelR1);
    expect(sidebarR2).toBe(sidebarR1);
  });

  it('peek interactions do not rerender unrelated slice counters', () => {
    renderWithProviders(<App />);
    const panel = screen.getByTestId('counter-panel');
    const sidebar = screen.getByTestId('counter-sidebar');
    const inspector = screen.getByTestId('counter-inspector');
    const bottom = screen.getByTestId('counter-bottom');

    const panelR1 = Number(panel.getAttribute('data-renders'));
    const sidebarR1 = Number(sidebar.getAttribute('data-renders'));
    const inspectorR1 = Number(inspector.getAttribute('data-renders'));
    const bottomR1 = Number(bottom.getAttribute('data-renders'));

    fireEvent.mouseEnter(screen.getByTestId('peek-panel'));
    fireEvent.mouseLeave(screen.getByTestId('peek-panel'));
    fireEvent.mouseEnter(screen.getByTestId('peek-sidebar'));
    fireEvent.mouseLeave(screen.getByTestId('peek-sidebar'));
    fireEvent.mouseEnter(screen.getByTestId('peek-inspector'));
    fireEvent.mouseLeave(screen.getByTestId('peek-inspector'));
    fireEvent.mouseEnter(screen.getByTestId('peek-bottom'));
    fireEvent.mouseLeave(screen.getByTestId('peek-bottom'));

    const panelR2 = Number(panel.getAttribute('data-renders'));
    const sidebarR2 = Number(sidebar.getAttribute('data-renders'));
    const inspectorR2 = Number(inspector.getAttribute('data-renders'));
    const bottomR2 = Number(bottom.getAttribute('data-renders'));

    expect(panelR2).toBe(panelR1);
    expect(sidebarR2).toBe(sidebarR1);
    expect(inspectorR2).toBe(inspectorR1);
    expect(bottomR2).toBe(bottomR1);
  });
});
