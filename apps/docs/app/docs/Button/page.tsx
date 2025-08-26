'use client';

import React from 'react';
import ComponentPage from '../../components/component-page';
import GuidelinesMDX from './guidelines.mdx';
import OverviewMDX from './overview.mdx';
import SpecsMDX from './specs.mdx';
import ApiMDX from './api.mdx';
import AccessibilityMDX from './accessibility.mdx';
import ChangelogMDX from './changelog.mdx';

const tabs = [
  { value: 'overview', label: 'Overview', component: OverviewMDX },
  { value: 'api', label: 'API', component: ApiMDX },
  { value: 'accessibility', label: 'Accessibility', component: AccessibilityMDX },
  { value: 'guidelines', label: 'Guidelines', component: GuidelinesMDX },
  { value: 'specs', label: 'Specs', component: SpecsMDX },
  { value: 'changelog', label: 'Changelog', component: ChangelogMDX },
];

export default function ButtonPage() {
  return <ComponentPage tabs={tabs} />;
}
