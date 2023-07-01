const tabsListSizes = ['1', '2'] as const;
type TabsListSize = (typeof tabsListSizes)[number];
const tabsListSizeDefault: TabsListSize = '2';

export { tabsListSizes, tabsListSizeDefault };
export type { TabsListSize };
