import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import TextAreaPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/text-area');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function TextAreaPage() {
  const metadata = getCachedDocMetadata('/docs/text-area');

  return <TextAreaPageClient metadata={metadata || undefined} />;
}
