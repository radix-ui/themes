import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import TypographyPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/typography');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function TypographyPage() {
  const metadata = getCachedDocMetadata('/docs/typography');

  return <TypographyPageClient metadata={metadata || undefined} />;
}
