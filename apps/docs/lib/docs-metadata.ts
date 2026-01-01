import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { navigationGroups } from '@/app/components/navigation-config';
import type { DocFrontmatter, DocMetadata } from './frontmatter';

/**
 * Finds the category for a given pathname by matching against navigation config
 */
export function findCategoryForPath(pathname: string): string | null {
  for (const group of navigationGroups) {
    const foundItem = group.items.find((item) => item.href === pathname);
    if (foundItem) {
      return group.label;
    }
  }
  return null;
}

/**
 * Extracts frontmatter from an MDX file
 * @param pathname - The route pathname (e.g., '/docs/button')
 * @returns Parsed frontmatter or null if file not found
 */
export function getDocMetadata(pathname: string): DocMetadata | null {
  try {
    // Convert pathname to file path
    // Examples: '/docs/button' -> 'app/docs/button/content.mdx'
    const segments = pathname.split('/').filter(Boolean);
    const docsPath = path.join(process.cwd(), 'app', ...segments);

    // Try common MDX file patterns
    const possibleFiles = [
      path.join(docsPath, 'content.mdx'),
      path.join(docsPath, `${segments[segments.length - 1]}.mdx`),
    ];

    let fileContent: string | null = null;
    for (const filePath of possibleFiles) {
      if (fs.existsSync(filePath)) {
        fileContent = fs.readFileSync(filePath, 'utf8');
        break;
      }
    }

    if (!fileContent) {
      return null;
    }

    // Parse frontmatter
    const { data } = matter(fileContent);
    const frontmatter = data as DocFrontmatter;

    // Auto-detect category if not provided
    const category = frontmatter.category || findCategoryForPath(pathname) || 'Documentation';

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      source: frontmatter.source,
      category,
      pathname,
    };
  } catch (error) {
    console.error(`Error reading metadata for ${pathname}:`, error);
    return null;
  }
}

/**
 * In-memory cache for metadata (rebuilt on each server start)
 * This is safe because Next.js rebuilds on file changes in dev
 */
const metadataCache = new Map<string, DocMetadata | null>();

/**
 * Cached version of getDocMetadata
 */
export function getCachedDocMetadata(pathname: string): DocMetadata | null {
  if (metadataCache.has(pathname)) {
    return metadataCache.get(pathname)!;
  }

  const metadata = getDocMetadata(pathname);
  metadataCache.set(pathname, metadata);
  return metadata;
}
