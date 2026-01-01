import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ColorsPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/colors');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ColorsPage() {
  const metadata = getCachedDocMetadata('/docs/colors');

  return <ColorsPageClient metadata={metadata || undefined} />;
}
