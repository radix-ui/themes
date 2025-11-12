'use client';

import React, { useMemo, memo } from 'react';
import { Box, Flex, Container, Card } from '@kushagradhawan/kookie-ui';
import { TableOfContents } from './table-of-contents';

interface ComponentPageProps {
  children?: React.ReactNode;
}

const ComponentPage = memo(function ComponentPage({ children }: ComponentPageProps) {
  // Memoize the sticky header styles
  const tocStyle: React.CSSProperties = useMemo(
    () => ({
      width: '160px',
      minWidth: '160px',
    }),
    [],
  );

  const contentAreaStyle: React.CSSProperties = useMemo(
    () => ({
      minWidth: 0,
    }),
    [],
  );

  return (
    <Flex gap={{ initial: '6', md: '6' }} align="start" direction={{ initial: 'column', lg: 'row' }}>
      {/* Main content area */}
      <Flex direction="column" gap="6" p={{ initial: '2', sm: '4' }} flexGrow="1" style={{ minWidth: 0 }}>
        {/* Documentation Content */}
        <Container size="2" style={contentAreaStyle} data-content-area>
          <Box p="4">{children}</Box>
        </Container>
      </Flex>

      {/* Table of Contents - always reserves space */}
      <Box style={tocStyle} position="sticky" top="200px" display={{ initial: 'none', lg: 'block' }}>
        <TableOfContents renderContainer={(tocContent) => tocContent || null} />
      </Box>
    </Flex>
  );
});

export default ComponentPage;
