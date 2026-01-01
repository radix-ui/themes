import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import MaterialPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/material');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function MaterialPage() {
  const metadata = getCachedDocMetadata('/docs/material');

  return <MaterialPageClient metadata={metadata || undefined} />;
}
