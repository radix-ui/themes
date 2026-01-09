import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import SheetPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/sheet');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function SheetPage() {
  const metadata = getCachedDocMetadata('/docs/sheet');

  return <SheetPageClient metadata={metadata || undefined} />;
}
