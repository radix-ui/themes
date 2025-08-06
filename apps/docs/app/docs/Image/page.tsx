'use client';

import React from 'react';
import ComponentPage from '../../components/ComponentPage';
import OverviewMDX from './overview.mdx';
import ApiMDX from './api.mdx';

const tabs = [
  { value: 'overview', label: 'Overview', component: OverviewMDX },
  { value: 'api', label: 'API', component: ApiMDX },
];

export default function ImagePage() {
  return <ComponentPage tabs={tabs} />;
}
