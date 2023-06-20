const tabsListSizes = ['1', '2'] as const;
type TabsListSize = (typeof tabsListSizes)[number];
const defaultTabsListSize: TabsListSize = '2';

export { tabsListSizes, defaultTabsListSize };
export type { TabsListSize };
