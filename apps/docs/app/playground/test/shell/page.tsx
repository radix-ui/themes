'use client';

import * as React from 'react';
import { Shell, Flex, Box, Text, Button, Code } from '@kushagradhawan/kookie-ui';
import { PanelLeft } from 'lucide-react';

export default function ShellDemoPage() {
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <Shell.Root>
      <Shell.Header>
        <Flex align="center" gap="3" px="3" py="2">
          <Shell.Trigger side="start" aria-label="Toggle sidebar">
            <PanelLeft />
          </Shell.Trigger>
          <LayoutMeters side="start" contentRef={contentRef} />
        </Flex>
      </Shell.Header>

      <Shell.Sidebar side="start" defaultValue="collapsed" as="div">
        <Shell.Sidebar.Rail>
          <RailDemo />
        </Shell.Sidebar.Rail>
        <Shell.Sidebar.Panel>
          <PanelDemo />
        </Shell.Sidebar.Panel>
      </Shell.Sidebar>

      <Shell.Content>
        <ContentLong ref={contentRef} />
      </Shell.Content>

      <Shell.Footer>
        <Flex align="center" px="3" style={{ inlineSize: '100%', blockSize: '56px' }}>
          <Text size="2" color="gray">
            Global Footer — outside content scroll
          </Text>
        </Flex>
      </Shell.Footer>
    </Shell.Root>
  );
}

function LayoutMeters(props: {
  side: 'start' | 'end';
  contentRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { side, contentRef } = props;
  const sidebar = Shell.useSidebar(side);

  const [railPx, setRailPx] = React.useState<number>(0);
  const [panelPx, setPanelPx] = React.useState<number>(0);
  const [contentPx, setContentPx] = React.useState<number>(0);
  const [els, setEls] = React.useState<{
    rail: HTMLElement | null;
    panel: HTMLElement | null;
  } | null>(null);

  React.useEffect(() => {
    const root = document.querySelector(
      `.rt-ShellSidebar[data-side="${side}"]`,
    ) as HTMLElement | null;
    const rail = (root?.querySelector('.rt-ShellSidebarRail') as HTMLElement | null) ?? null;
    const panel = (root?.querySelector('.rt-ShellSidebarPanel') as HTMLElement | null) ?? null;
    setEls({ rail, panel });
  }, [side]);

  const recompute = React.useCallback(() => {
    const nextRail = els?.rail ? Math.round(els.rail.getBoundingClientRect().width) : 0;
    const nextPanel = els?.panel ? Math.round(els.panel.getBoundingClientRect().width) : 0;
    setRailPx(nextRail);
    setPanelPx(nextPanel);

    const el = contentRef.current;
    if (el) setContentPx(Math.round(el.clientWidth));
  }, [els, contentRef]);

  React.useEffect(() => {
    recompute();
  }, [recompute, sidebar.rail.isOpen, sidebar.panel.isVisible]);

  React.useEffect(() => {
    const ro = new ResizeObserver(() => recompute());
    const contentEl = contentRef.current;
    if (contentEl) ro.observe(contentEl);
    if (els?.rail) ro.observe(els.rail);
    if (els?.panel) ro.observe(els.panel);

    const onResize = () => recompute();
    window.addEventListener('resize', onResize);
    return () => {
      if (contentEl) ro.unobserve(contentEl);
      if (els?.rail) ro.unobserve(els.rail);
      if (els?.panel) ro.unobserve(els.panel);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [recompute, contentRef, els]);

  return (
    <Flex align="center" gap="3" wrap="wrap">
      <Meter label="Rail" value={railPx} />
      <Meter label="Panel" value={panelPx} />
      <Meter label="Content" value={contentPx} />
    </Flex>
  );
}

function Meter(props: { label: string; value: number }) {
  return (
    <Flex align="center" gap="2" px="2" py="1" data-meter>
      <Text size="1" color="gray">
        {props.label}:
      </Text>
      <Code size="1">{props.value}px</Code>
    </Flex>
  );
}

const ContentLong = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Box>>(
  function ContentLong(props, ref) {
    return (
      <Box ref={ref} data-content px="4" py="4" height="300vh" style={{ inlineSize: '100%' }}>
        <Flex direction="column" gap="3">
          <Text size="2">Long content (300vh) for scroll testing</Text>
          <Text size="1" color="gray">
            Headless
          </Text>
        </Flex>
      </Box>
    );
  },
);

function RailDemo() {
  const { panel } = Shell.useSidebar('start');
  const [section, setSection] = React.useState<'A' | 'B' | 'C'>('A');
  return (
    <Flex direction="column" align="center" gap="1" px="2" py="2">
      <Button
        size="2"
        variant="ghost"
        onClick={() => {
          setSection('A');
          panel.show();
        }}
      >
        A
      </Button>
      <Button
        size="2"
        variant="ghost"
        onClick={() => {
          setSection('B');
          panel.show();
        }}
      >
        B
      </Button>
      <Button
        size="2"
        variant="ghost"
        onClick={() => {
          setSection('C');
          panel.hide();
        }}
      >
        C
      </Button>
    </Flex>
  );
}

function PanelDemo() {
  const { panel } = Shell.useSidebar('start');
  return (
    <Flex direction="column" gap="1" px="2" py="2">
      <Button size="1" variant="soft" onClick={() => panel.hide()}>
        Close
      </Button>
    </Flex>
  );
}
