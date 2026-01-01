import React from 'react';
import { getCachedDocMetadata } from '@/lib/docs-metadata';
import NavbarPageClient from './page-client';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = getCachedDocMetadata('/docs/navbar');

  if (!metadata) {
    return {};
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function NavbarPage() {
  const metadata = getCachedDocMetadata('/docs/navbar');

  return <NavbarPageClient metadata={metadata || undefined} />;
}
