/**
 * Frontmatter metadata structure for MDX documentation files
 */
export interface DocFrontmatter {
  title: string;
  description?: string;
  source?: string;
  category?: string; // Optional override, auto-detected if not provided
}

/**
 * Extended metadata with auto-populated fields
 */
export interface DocMetadata extends DocFrontmatter {
  category: string; // Always populated (either from frontmatter or auto-detected)
  pathname: string;
}
