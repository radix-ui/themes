'use client';

import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
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

export const TableOfContents = memo(function TableOfContents({
  className,
  renderContainer,
}: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Memoize the heading extraction logic
  const extractHeadings = useCallback(() => {
    // Find the main content area (the Box containing the documentation)
    const contentArea = document.querySelector('[data-content-area]');
    if (!contentArea) return null;

    // Extract headings from the content area only - only h2 and h3
    const headingElements = Array.from(contentArea.querySelectorAll('h2'));

    const headings = headingElements
      .map((heading) => {
        const text = heading.textContent || '';
        let id = heading.id;

        // If no ID exists, generate one and add it to the element
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

    console.log('Found headings:', headings);
    setToc(headings);

    // Set up intersection observer for active heading
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

      return observer;
    }
    return null;
  }, []);

  // Memoize the mutation observer callback
  const handleMutation = useCallback((mutations: MutationRecord[]) => {
    let shouldReextract = false;

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Check if a heading was added or if any child contains headings
            if (element.matches('h2, h3') || element.querySelector('h2, h3')) {
              shouldReextract = true;
            }
          }
        });
      }
    });

    return shouldReextract;
  }, []);

  useEffect(() => {
    // Initial extraction
    let intersectionObserver = extractHeadings();

    // Set up MutationObserver to watch for new headings being added
    const mutationObserver = new MutationObserver((mutations) => {
      const shouldReextract = handleMutation(mutations);

      if (shouldReextract) {
        console.log('DOM changed, re-extracting headings...');
        intersectionObserver?.disconnect();
        intersectionObserver = extractHeadings();
      }
    });

    // Observe the entire document for changes
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Also try again after a delay as fallback
    const timeoutId = setTimeout(() => {
      console.log('Timeout fallback, re-extracting headings...');
      intersectionObserver?.disconnect();
      intersectionObserver = extractHeadings();
    }, 1000);

    return () => {
      intersectionObserver?.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [extractHeadings, handleMutation]);

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
            color={activeId === item.id ? undefined : 'gray'}
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
