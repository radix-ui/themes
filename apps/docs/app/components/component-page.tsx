'use client';

import React, { useCallback, useMemo, memo, Suspense } from 'react';
import { TabNav, Box, Flex, Container } from '@kushagradhawan/kookie-ui';
import { useSearchParams, useRouter } from 'next/navigation';
import { TableOfContents } from './table-of-contents';

interface Tab {
  value: string;
  label: string;
  component: React.ComponentType;
}

interface ComponentPageProps {
  tabs?: Tab[];
  defaultTab?: string;
  children?: React.ReactNode;
}

const ComponentPage = memo(function ComponentPage({
  tabs,
  defaultTab = 'overview',
  children,
}: ComponentPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Memoize the active tab to avoid unnecessary recalculations
  const activeTab = useMemo(() => {
    return searchParams.get('tab') || defaultTab;
  }, [searchParams, defaultTab]);

  // Memoize the tab click handler
  const handleTabClick = useCallback(
    (tabValue: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('tab', tabValue);
      router.push(`?${params.toString()}`);
    },
    [searchParams, router],
  );

  // Memoize the active tab data
  const activeTabData = useMemo(() => {
    return tabs?.find((tab) => tab.value === activeTab) || tabs?.[0];
  }, [tabs, activeTab]);

  // Memoize the sticky header styles
  const stickyHeaderStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: 'var(--color-background)',
      zIndex: 10,
    }),
    [],
  );

  const tocStyle: React.CSSProperties = useMemo(
    () => ({
      width: '200px',
      minWidth: '200px',
    }),
    [],
  );

  const contentAreaStyle: React.CSSProperties = useMemo(
    () => ({
      minWidth: 0,
    }),
    [],
  );

  // Validate that we have a valid component to render for tabbed content
  const ActiveComponent = activeTabData?.component;
  const hasValidTabs = tabs && tabs.length > 0;
  const hasValidComponent = ActiveComponent && typeof ActiveComponent === 'function';

  // Determine what content to render
  const renderContent = () => {
    if (!hasValidTabs) {
      return children;
    }

    if (!hasValidComponent) {
      console.error('Invalid component found:', ActiveComponent);
      return <div>Error: Invalid component configuration</div>;
    }

    return <ActiveComponent />;
  };

  return (
    <Container py="9" size={{ initial: '1', sm: '2', md: '4' }}>
      <Flex
        gap={{ initial: '6', md: '9' }}
        align="start"
        direction={{ initial: 'column', lg: 'row' }}
      >
        {/* Main content area with TabNav and content */}
        <Flex
          direction="column"
          gap="6"
          px={{ initial: '4', sm: '6', md: '8' }}
          flexGrow="1"
          style={{ minWidth: 0 }}
        >
          {/* Tab Navigation - only render if tabs exist */}
          {hasValidTabs && (
            <Box position="sticky" top="0" py="2" style={{ ...stickyHeaderStyle, minWidth: 0 }}>
              <TabNav.Root size="2">
                {tabs.map((tab) => (
                  <TabNav.Link
                    key={tab.value}
                    active={activeTab === tab.value}
                    onClick={() => handleTabClick(tab.value)}
                  >
                    {tab.label}
                  </TabNav.Link>
                ))}
              </TabNav.Root>
            </Box>
          )}

          {/* Documentation Content */}
          <Box px={{ initial: '4', sm: '6', md: '8' }} style={contentAreaStyle} data-content-area>
            {renderContent()}
          </Box>
        </Flex>

        {/* Table of Contents - always reserves space */}
        <Box
          style={tocStyle}
          position="sticky"
          top="200px"
          display={{ initial: 'none', lg: 'block' }}
        >
          <TableOfContents
            key={activeTab} // Force re-render when tab changes
            renderContainer={(tocContent) => tocContent || null}
          />
        </Box>
      </Flex>
    </Container>
  );
});

// Wrapper component with Suspense boundary for useSearchParams
const ComponentPageWithSuspense = (props: ComponentPageProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentPage {...props} />
    </Suspense>
  );
};

export default ComponentPageWithSuspense;
