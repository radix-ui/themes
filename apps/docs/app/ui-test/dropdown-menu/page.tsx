'use client';

import * as React from 'react';
import { DropdownMenu, Button, Flex, Box, Text, Heading, Slider, IconButton } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';

// ============================================
// SOLUTION: Mobile Drill-Down Dropdown Menu
// ============================================
// Instead of cascading submenus that overflow on mobile,
// replace the menu content when navigating into a submenu.

type MenuLevel = 'root' | 'level1' | 'level2' | 'level3';

function MobileDrillDownMenu() {
  const [activeLevel, setActiveLevel] = React.useState<MenuLevel>('root');
  const [open, setOpen] = React.useState(false);

  // Reset to root when menu closes
  React.useEffect(() => {
    if (!open) {
      // Small delay to let animation finish before resetting
      const timer = setTimeout(() => setActiveLevel('root'), 150);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const BackButton = ({ onClick }: { onClick: () => void }) => (
    <DropdownMenu.Item onSelect={(e) => { e.preventDefault(); onClick(); }}>
      <Flex align="center" gap="2">
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        <Text>Back</Text>
      </Flex>
    </DropdownMenu.Item>
  );

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger>
        <Button variant="soft" color="green">Mobile Drill-Down Menu</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={{ minWidth: 200 }}>
        {activeLevel === 'root' && (
          <>
            <DropdownMenu.Item>Home</DropdownMenu.Item>
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onSelect={(e) => { e.preventDefault(); setActiveLevel('level1'); }}>
              Settings →
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">Logout</DropdownMenu.Item>
          </>
        )}

        {activeLevel === 'level1' && (
          <>
            <BackButton onClick={() => setActiveLevel('root')} />
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Settings</DropdownMenu.Label>
            <DropdownMenu.Item>General</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={(e) => { e.preventDefault(); setActiveLevel('level2'); }}>
              Privacy →
            </DropdownMenu.Item>
            <DropdownMenu.Item>Notifications</DropdownMenu.Item>
          </>
        )}

        {activeLevel === 'level2' && (
          <>
            <BackButton onClick={() => setActiveLevel('level1')} />
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Privacy</DropdownMenu.Label>
            <DropdownMenu.Item>Profile visibility</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={(e) => { e.preventDefault(); setActiveLevel('level3'); }}>
              Data & storage →
            </DropdownMenu.Item>
            <DropdownMenu.Item>Blocked users</DropdownMenu.Item>
          </>
        )}

        {activeLevel === 'level3' && (
          <>
            <BackButton onClick={() => setActiveLevel('level2')} />
            <DropdownMenu.Separator />
            <DropdownMenu.Label>Data & Storage</DropdownMenu.Label>
            <DropdownMenu.Item>Download my data</DropdownMenu.Item>
            <DropdownMenu.Item>Clear cache</DropdownMenu.Item>
            <DropdownMenu.Item color="red">Delete account</DropdownMenu.Item>
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default function DropdownMenuTest() {
  const [collisionPadding, setCollisionPadding] = React.useState(10);
  const [sideOffset, setSideOffset] = React.useState(1);
  const [alignOffset, setAlignOffset] = React.useState(0);

  return (
    <Box p="6" style={{ minHeight: '100vh' }}>
      <Heading size="6" mb="4">Dropdown Menu - Nested SubMenus Test</Heading>
      
      <Text as="p" size="2" color="gray" mb="6">
        Test collision behavior with deeply nested submenus. Resize window to mobile width to see overflow issues.
      </Text>

      {/* SOLUTION: Mobile Drill-Down Pattern */}
      <Box mb="6" p="4" style={{ background: 'var(--green-3)', borderRadius: 'var(--radius-3)', border: '2px solid var(--green-6)' }}>
        <Heading size="4" mb="2" color="green">✅ Solution: Drill-Down Pattern</Heading>
        <Text as="p" size="2" color="gray" mb="4">
          Instead of cascading submenus, replace the menu content when navigating. Works perfectly on mobile!
        </Text>
        <MobileDrillDownMenu />
      </Box>

      <Box mb="6" p="4" style={{ background: 'var(--red-3)', borderRadius: 'var(--radius-3)', border: '2px solid var(--red-6)' }}>
        <Heading size="4" mb="2" color="red">❌ Problem: Native SubContent</Heading>
        <Text as="p" size="2" color="gray" mb="4">
          Radix SubContent cannot have `side` or `align` props - they're explicitly omitted from the type.
          On mobile, nested submenus overflow the viewport.
        </Text>
      </Box>

      {/* Controls */}
      <Box mb="6" p="4" style={{ background: 'var(--gray-2)', borderRadius: 'var(--radius-3)' }}>
        <Heading size="3" mb="4">SubContent Props</Heading>
        
        <Flex direction="column" gap="4">
          <Box>
            <Text size="2" mb="2" as="div">collisionPadding: {collisionPadding}px</Text>
            <Slider 
              value={[collisionPadding]} 
              onValueChange={(v) => setCollisionPadding(v[0])} 
              min={0} 
              max={50} 
              step={5}
            />
          </Box>
          
          <Box>
            <Text size="2" mb="2" as="div">sideOffset: {sideOffset}px</Text>
            <Slider 
              value={[sideOffset]} 
              onValueChange={(v) => setSideOffset(v[0])} 
              min={0} 
              max={20} 
              step={1}
            />
          </Box>
          
          <Box>
            <Text size="2" mb="2" as="div">alignOffset: {alignOffset}px</Text>
            <Slider 
              value={[alignOffset]} 
              onValueChange={(v) => setAlignOffset(v[0])} 
              min={-20} 
              max={20} 
              step={1}
            />
          </Box>
        </Flex>
      </Box>

      {/* Test Menus in Different Positions */}
      <Flex gap="4" wrap="wrap" mb="6">
        {/* Left-positioned menu */}
        <Box p="4" style={{ background: 'var(--blue-2)', borderRadius: 'var(--radius-3)', flex: 1, minWidth: 200 }}>
          <Text size="2" weight="bold" mb="3" as="div">Menu on Left Edge</Text>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="soft">Open Menu</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Regular Item 1</DropdownMenu.Item>
              <DropdownMenu.Item>Regular Item 2</DropdownMenu.Item>
              <DropdownMenu.Separator />
              
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>Level 1 Submenu →</DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent 
                  collisionPadding={collisionPadding}
                  sideOffset={sideOffset}
                  alignOffset={alignOffset}
                >
                  <DropdownMenu.Item>L1 Item 1</DropdownMenu.Item>
                  <DropdownMenu.Item>L1 Item 2</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>Level 2 Submenu →</DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent
                      collisionPadding={collisionPadding}
                      sideOffset={sideOffset}
                      alignOffset={alignOffset}
                    >
                      <DropdownMenu.Item>L2 Item 1</DropdownMenu.Item>
                      <DropdownMenu.Item>L2 Item 2</DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Level 3 Submenu →</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent
                          collisionPadding={collisionPadding}
                          sideOffset={sideOffset}
                          alignOffset={alignOffset}
                        >
                          <DropdownMenu.Item>L3 Item 1</DropdownMenu.Item>
                          <DropdownMenu.Item>L3 Item 2</DropdownMenu.Item>
                          <DropdownMenu.Item>L3 Item 3</DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>

        {/* Center-positioned menu */}
        <Box p="4" style={{ background: 'var(--green-2)', borderRadius: 'var(--radius-3)', flex: 1, minWidth: 200 }}>
          <Text size="2" weight="bold" mb="3" as="div">Menu in Center</Text>
          <Flex justify="center">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft" color="green">Open Menu</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>Regular Item 1</DropdownMenu.Item>
                <DropdownMenu.Item>Regular Item 2</DropdownMenu.Item>
                <DropdownMenu.Separator />
                
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger>Level 1 Submenu →</DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent
                    collisionPadding={collisionPadding}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                  >
                    <DropdownMenu.Item>L1 Item 1</DropdownMenu.Item>
                    <DropdownMenu.Item>L1 Item 2</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>Level 2 Submenu →</DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent
                        collisionPadding={collisionPadding}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                      >
                        <DropdownMenu.Item>L2 Item 1</DropdownMenu.Item>
                        <DropdownMenu.Item>L2 Item 2</DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        
                        <DropdownMenu.Sub>
                          <DropdownMenu.SubTrigger>Level 3 Submenu →</DropdownMenu.SubTrigger>
                          <DropdownMenu.SubContent
                            collisionPadding={collisionPadding}
                            sideOffset={sideOffset}
                            alignOffset={alignOffset}
                          >
                            <DropdownMenu.Item>L3 Item 1</DropdownMenu.Item>
                            <DropdownMenu.Item>L3 Item 2</DropdownMenu.Item>
                            <DropdownMenu.Item>L3 Item 3</DropdownMenu.Item>
                          </DropdownMenu.SubContent>
                        </DropdownMenu.Sub>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Box>

        {/* Right-positioned menu */}
        <Box p="4" style={{ background: 'var(--orange-2)', borderRadius: 'var(--radius-3)', flex: 1, minWidth: 200 }}>
          <Text size="2" weight="bold" mb="3" as="div">Menu on Right Edge</Text>
          <Flex justify="end">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="soft" color="orange">Open Menu</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <DropdownMenu.Item>Regular Item 1</DropdownMenu.Item>
                <DropdownMenu.Item>Regular Item 2</DropdownMenu.Item>
                <DropdownMenu.Separator />
                
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger>Level 1 Submenu →</DropdownMenu.SubTrigger>
                  <DropdownMenu.SubContent
                    collisionPadding={collisionPadding}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                  >
                    <DropdownMenu.Item>L1 Item 1</DropdownMenu.Item>
                    <DropdownMenu.Item>L1 Item 2</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>Level 2 Submenu →</DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent
                        collisionPadding={collisionPadding}
                        sideOffset={sideOffset}
                        alignOffset={alignOffset}
                      >
                        <DropdownMenu.Item>L2 Item 1</DropdownMenu.Item>
                        <DropdownMenu.Item>L2 Item 2</DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        
                        <DropdownMenu.Sub>
                          <DropdownMenu.SubTrigger>Level 3 Submenu →</DropdownMenu.SubTrigger>
                          <DropdownMenu.SubContent
                            collisionPadding={collisionPadding}
                            sideOffset={sideOffset}
                            alignOffset={alignOffset}
                          >
                            <DropdownMenu.Item>L3 Item 1</DropdownMenu.Item>
                            <DropdownMenu.Item>L3 Item 2</DropdownMenu.Item>
                            <DropdownMenu.Item>L3 Item 3</DropdownMenu.Item>
                          </DropdownMenu.SubContent>
                        </DropdownMenu.Sub>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </DropdownMenu.SubContent>
                </DropdownMenu.Sub>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Box>
      </Flex>

      {/* Info Box */}
      <Box p="4" style={{ background: 'var(--gray-3)', borderRadius: 'var(--radius-3)' }}>
        <Heading size="3" mb="2">Testing Notes</Heading>
        <Text as="div" size="2" mb="2">
          • Resize browser to mobile width (375px) to test collision behavior
        </Text>
        <Text as="div" size="2" mb="2">
          • SubContent uses <code>avoidCollisions=true</code> by default - submenus should flip to opposite side when hitting viewport edge
        </Text>
        <Text as="div" size="2" mb="2">
          • Increase <code>collisionPadding</code> to make collision detection more aggressive
        </Text>
        <Text as="div" size="2">
          • Note: <code>side</code> and <code>align</code> props are NOT available on SubContent (Radix limitation)
        </Text>
      </Box>
    </Box>
  );
}

