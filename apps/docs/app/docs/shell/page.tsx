import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ShellPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/shell');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ShellPage() {
  const metadata = getCachedDocMetadata('/docs/shell');

  return <ShellPageClient metadata={metadata || undefined} />;
}
