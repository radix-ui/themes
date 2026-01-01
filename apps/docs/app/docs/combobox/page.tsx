import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ComboboxPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/combobox');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ComboboxPage() {
  const metadata = getCachedDocMetadata('/docs/combobox');

  return <ComboboxPageClient metadata={metadata || undefined} />;
}
