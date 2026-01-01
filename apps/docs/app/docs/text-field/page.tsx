import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import TextFieldPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/text-field');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function TextFieldPage() {
  const metadata = getCachedDocMetadata('/docs/text-field');

  return <TextFieldPageClient metadata={metadata || undefined} />;
}
