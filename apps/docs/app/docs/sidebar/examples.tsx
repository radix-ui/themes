'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, Separator, Box, Sidebar } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Home01Icon, Settings01Icon, FolderOpenIcon, Search01Icon, UserIcon } from '@hugeicons/core-free-icons';

export function SidebarExamples() {
  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Expanded with Icons */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Expanded with Icons</SectionHeader.Title>
            <SectionHeader.Description>
              Standard panel layout with icons and text labels. The default presentation for most navigation sidebars.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="20rem">
          <Box style={{ width: 240 }}>
            <Sidebar.Root presentation="expanded" size="2">
              <Sidebar.Content>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton isActive>
                      <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
                      Home
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
                      Search
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <HugeiconsIcon icon={FolderOpenIcon} strokeWidth={1.75} />
                      Projects
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                      Settings
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Content>
            </Sidebar.Root>
          </Box>
        </PreviewBlock>
        <CodeBlock
          code={`<Sidebar.Root presentation="expanded" size="2">
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton isActive>
          <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
          Home
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
          Search
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          <HugeiconsIcon icon={FolderOpenIcon} strokeWidth={1.75} />
          Projects
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
          Settings
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Thin with Icons */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Thin with Icons</SectionHeader.Title>
            <SectionHeader.Description>
              Compact rail layout with icons stacked vertically. Text labels appear below icons in a smaller font. Ideal for space-constrained layouts.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="20rem">
          <Box style={{ width: 72 }}>
            <Sidebar.Root presentation="thin" size="2">
              <Sidebar.Content>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton isActive>
                      <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
                      Home
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
                      Search
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <HugeiconsIcon icon={FolderOpenIcon} strokeWidth={1.75} />
                      Projects
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>
                      <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                      Settings
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Content>
            </Sidebar.Root>
          </Box>
        </PreviewBlock>
        <CodeBlock
          code={`<Sidebar.Root presentation="thin" size="2">
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton isActive>
          <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
          Home
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
          Search
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
      {/* ... more items */}
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Expanded without Icons */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Expanded without Icons</SectionHeader.Title>
            <SectionHeader.Description>
              Text-only navigation for simpler interfaces or when icons would be redundant. Works well for settings panels or documentation sidebars.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="20rem">
          <Box style={{ width: 240 }}>
            <Sidebar.Root presentation="expanded" size="2">
              <Sidebar.Content>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton isActive>Dashboard</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>Analytics</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>Reports</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>Settings</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Content>
            </Sidebar.Root>
          </Box>
        </PreviewBlock>
        <CodeBlock
          code={`<Sidebar.Root presentation="expanded" size="2">
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton isActive>Dashboard</Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>Analytics</Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>Reports</Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>Settings</Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 4: Thin without Icons */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Thin without Icons</SectionHeader.Title>
            <SectionHeader.Description>
              Text-only items in thin mode. Labels are centered and truncated. Best for short labels or when combined with icons elsewhere.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="20rem">
          <Box style={{ width: 72 }}>
            <Sidebar.Root presentation="thin" size="2">
              <Sidebar.Content>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton isActive>Home</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>Search</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>Files</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton>Settings</Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Content>
            </Sidebar.Root>
          </Box>
        </PreviewBlock>
        <CodeBlock
          code={`<Sidebar.Root presentation="thin" size="2">
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton isActive>Home</Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>Search</Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>Files</Sidebar.MenuButton>
      </Sidebar.MenuItem>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton>Settings</Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 5: Size Comparison */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Size Comparison</SectionHeader.Title>
            <SectionHeader.Description>
              Size 1 provides compact density for information-dense layouts. Size 2 is the standard spacing for most applications.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="20rem">
          <Flex gap="6">
            <Box style={{ width: 200 }}>
              <Sidebar.Root presentation="expanded" size="1">
                <Sidebar.Content>
                  <Sidebar.Group>
                    <Sidebar.GroupLabel>Size 1</Sidebar.GroupLabel>
                    <Sidebar.GroupContent>
                      <Sidebar.Menu>
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton isActive>
                            <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
                            Home
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton>
                            <HugeiconsIcon icon={UserIcon} strokeWidth={1.75} />
                            Profile
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton>
                            <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                            Settings
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                      </Sidebar.Menu>
                    </Sidebar.GroupContent>
                  </Sidebar.Group>
                </Sidebar.Content>
              </Sidebar.Root>
            </Box>
            <Box style={{ width: 220 }}>
              <Sidebar.Root presentation="expanded" size="2">
                <Sidebar.Content>
                  <Sidebar.Group>
                    <Sidebar.GroupLabel>Size 2</Sidebar.GroupLabel>
                    <Sidebar.GroupContent>
                      <Sidebar.Menu>
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton isActive>
                            <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
                            Home
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton>
                            <HugeiconsIcon icon={UserIcon} strokeWidth={1.75} />
                            Profile
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton>
                            <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                            Settings
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                      </Sidebar.Menu>
                    </Sidebar.GroupContent>
                  </Sidebar.Group>
                </Sidebar.Content>
              </Sidebar.Root>
            </Box>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`{/* Size 1: Compact density */}
<Sidebar.Root presentation="expanded" size="1">
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton isActive>
          <HomeIcon />
          Home
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>

{/* Size 2: Standard spacing */}
<Sidebar.Root presentation="expanded" size="2">
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton isActive>
          <HomeIcon />
          Home
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 6: Thin Size Comparison */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Thin Size Comparison</SectionHeader.Title>
            <SectionHeader.Description>
              Size affects icon scaling and padding in thin mode. Size 1 creates a tighter rail, size 2 provides more breathing room.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="20rem">
          <Flex gap="6">
            <Box style={{ width: 56 }}>
              <Sidebar.Root presentation="thin" size="1">
                <Sidebar.Content>
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton isActive>
                        <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
                        Home
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton>
                        <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
                        Search
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton>
                        <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                        Settings
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.Content>
              </Sidebar.Root>
            </Box>
            <Box style={{ width: 72 }}>
              <Sidebar.Root presentation="thin" size="2">
                <Sidebar.Content>
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton isActive>
                        <HugeiconsIcon icon={Home01Icon} strokeWidth={1.75} />
                        Home
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton>
                        <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
                        Search
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton>
                        <HugeiconsIcon icon={Settings01Icon} strokeWidth={1.75} />
                        Settings
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.Content>
              </Sidebar.Root>
            </Box>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`{/* Size 1: Tighter rail */}
<Sidebar.Root presentation="thin" size="1">
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton isActive>
          <HomeIcon />
          Home
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>

{/* Size 2: More breathing room */}
<Sidebar.Root presentation="thin" size="2">
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton isActive>
          <HomeIcon />
          Home
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}

