'use client';

import React, { useMemo, memo } from 'react';
import { Box, Flex, Container, Text, Link, Separator } from '@kushagradhawan/kookie-ui';
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

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <Flex gap={{ initial: '6', md: '6' }} align="start" direction={{ initial: 'column', lg: 'row' }}>
      {/* Main content area */}
      <Flex direction="column" gap="6" p={{ initial: '2', sm: '4' }} flexGrow="1" style={{ minWidth: 0 }}>
        {/* Documentation Content */}
        <Container size="2" style={contentAreaStyle} data-content-area>
          <Box p="4" width="100%">
            {children}
            <Flex align="center" justify="center" width="100%" pt="8">
              <Text size="2" color="gray" align="center">
                © {currentYear}{' '}
                <Link href="https://www.kushagradhawan.com" target="_blank" rel="noreferrer">
                  Kushagra Dhawan
                </Link>
                . Licensed under MIT.{' '}
                <Link href="https://github.com/KushagraDhawan1997/kookie-ui" target="_blank" rel="noreferrer">
                  GitHub
                </Link>
                .
              </Text>
            </Flex>
          </Box>
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
