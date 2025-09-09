'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import ContentMDX from './content.mdx';

const tabs = [{ value: 'overview', label: 'Overview', component: ContentMDX }];

export default function FontCustomizationPage() {
  return <ComponentPage tabs={tabs} />;
}
