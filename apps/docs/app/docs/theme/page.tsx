import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ThemePageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/theme');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ThemePage() {
  const metadata = getCachedDocMetadata('/docs/theme');

  return <ThemePageClient metadata={metadata || undefined} />;
}
