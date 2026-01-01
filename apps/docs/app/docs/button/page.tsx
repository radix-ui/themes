import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import ButtonPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/button');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function ButtonPage() {
  const metadata = getCachedDocMetadata('/docs/button');

  return <ButtonPageClient metadata={metadata || undefined} />;
}
