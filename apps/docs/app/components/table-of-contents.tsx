'use client';

import React, { useEffect, useState, useCallback, useMemo, memo, useRef } from 'react';
import { Box, Text, Link, Flex } from '@kushagradhawan/kookie-ui';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
  renderContainer?: (tocContent: React.ReactNode) => React.ReactNode | null;
}

// Function to generate slug from text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim();
};

export const TableOfContents = memo(function TableOfContents({ className, renderContainer }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<number | null>(null);

  // Memoize the heading extraction logic
  const extractHeadings = useCallback(() => {
    // Use requestAnimationFrame to defer DOM operations
    rafIdRef.current = requestAnimationFrame(() => {
      const contentArea = document.querySelector('[data-content-area]');
      if (!contentArea) return;

      const headingElements = Array.from(contentArea.querySelectorAll('h2'));

      const headings = headingElements
        .map((heading) => {
          const text = heading.textContent || '';
          let id = heading.id;

          if (!id && text) {
            id = generateSlug(text);
            heading.id = id;
          }

          return {
            id,
            text,
            level: parseInt(heading.tagName.charAt(1)),
          };
        })
        .filter((item) => item.id && item.text);

      setToc(headings);

      // Disconnect any previous observer before creating a new one
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (headings.length > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(entry.target.id);
              }
            });
          },
          { rootMargin: '-20% 0% -35% 0%' },
        );

        headings.forEach(({ id }) => {
          const element = document.getElementById(id);
          if (element) observer.observe(element);
        });

        observerRef.current = observer;
      }
    });
  }, []);

  useEffect(() => {
    // Initial extraction with a small delay to ensure DOM is ready
    timeoutIdRef.current = window.setTimeout(() => {
      extractHeadings();
    }, 100);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [extractHeadings]);

  // Memoize the link styles
  const getLinkStyle = useCallback(
    (level: number): React.CSSProperties => ({
      display: 'block',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingLeft: level === 3 ? '12px' : '0',
    }),
    [],
  );

  // Early return if no TOC items
  if (toc.length === 0) return null;

  const tocContent = (
    <Flex direction="column" gap="3" className={className}>
      <Text size="1" weight="medium" color="gray">
        On this page
      </Text>
      <Flex direction="column" gap="2">
        {toc.map((item) => (
          <Link
            key={item.id}
            color="gray"
            // color={activeId === item.id ? undefined : 'gray'}
            highContrast={activeId === item.id ? true : false}
            size="1"
            href={`#${item.id}`}
            style={getLinkStyle(item.level)}
          >
            {item.text}
          </Link>
        ))}
      </Flex>
    </Flex>
  );

  // If renderContainer is provided, use it; otherwise return the content directly
  if (renderContainer) {
    return renderContainer(tocContent);
  }

  return tocContent;
});
