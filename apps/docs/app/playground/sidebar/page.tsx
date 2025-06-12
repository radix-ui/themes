'use client'

import {
  Text,
  Sidebar,
  Button,
  Flex,
  Box,
  Card,
  Heading,
  DropdownMenu,
  Avatar,
  Image,
} from '@kushagradhawan/kookie-ui'
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  Mail, 
  Calendar, 
  Folder, 
  Bell, 
  Home,
  ShoppingCart,
  Heart,
  ChevronDown,
  Building2,
  Plus,
  Check,
  PanelLeft
} from 'lucide-react'
import { useState } from 'react'

export default function SidebarPlayground() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [sidebarType, setSidebarType] = useState<'sidebar' | 'floating'>('sidebar')
  const [variant, setVariant] = useState<'soft' | 'surface' | 'ghost'>('surface')
  const [menuVariant, setMenuVariant] = useState<'solid' | 'soft'>('soft')
  const [size, setSize] = useState<'1' | '2'>('2')
  const [side, setSide] = useState<'left' | 'right'>('left')
  const [selectedWorkspace, setSelectedWorkspace] = useState('Acme Corp')

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Background Image */}
      <Image 
        src="https://images.unsplash.com/photo-1745434038522-5803c66fddfc?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        fit="cover"
        fadeIn={true}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          objectFit: 'cover'
        }}
      />
      
      <Sidebar.Provider defaultOpen={true} side={side}>
        <Flex height="100vh">
        
        <Sidebar.Root 
          side={side} 
          type={sidebarType} 
          variant={variant}
          menuVariant={menuVariant}
          size={size} 
          collapsible="icon"
        >
          
          {/* Header with avatar */}
          <Sidebar.Header>
            <Sidebar.MenuButton>
              <Avatar size="2" src="/logo-dark-large.png" fallback="JD" />
            </Sidebar.MenuButton>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Menu>
              
              {/* Main navigation group */}
              <Sidebar.Group>
                <Sidebar.GroupLabel>
                  <Text>Navigation</Text>
                </Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton 
                      isActive={activeItem === 'dashboard'}
                      onClick={() => setActiveItem('dashboard')}
                    >
                      <Home />
                      <Text>Dashboard</Text>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>

                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton 
                      isActive={activeItem === 'analytics'}
                      onClick={() => setActiveItem('analytics')}
                    >
                      <BarChart3 />
                      <Text>Analytics</Text>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.GroupContent>
              </Sidebar.Group>

              {/* User management group */}
              <Sidebar.Group>
                <Sidebar.GroupLabel>
                  <Text>Management</Text>
                </Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton 
                      isActive={activeItem === 'users'}
                      onClick={() => setActiveItem('users')}
                    >
                      <Users />
                      <Text>Users</Text>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>

                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton 
                      isActive={activeItem === 'documents'}
                      onClick={() => setActiveItem('documents')}
                    >
                      <FileText />
                      <Text>Documents</Text>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>

                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton 
                      isActive={activeItem === 'orders'}
                      onClick={() => setActiveItem('orders')}
                    >
                      <ShoppingCart />
                      <Text>Orders</Text>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.GroupContent>
              </Sidebar.Group>

              {/* Projects group with sub-menu */}
              <Sidebar.Group>
                <Sidebar.GroupLabel>
                  <Text>Projects</Text>
                </Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuSub>
                      <Sidebar.MenuSubTrigger>
                        <Folder />
                        <Text>All Projects</Text>
                      </Sidebar.MenuSubTrigger>
                      <Sidebar.MenuSubContent>
                        <Sidebar.MenuButton 
                          isActive={activeItem === 'project-alpha'}
                          onClick={() => setActiveItem('project-alpha')}
                        >
                          <Text>Project Alpha</Text>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuButton 
                          isActive={activeItem === 'project-beta'}
                          onClick={() => setActiveItem('project-beta')}
                        >
                          <Text>Project Beta</Text>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuButton 
                          isActive={activeItem === 'project-gamma'}
                          onClick={() => setActiveItem('project-gamma')}
                        >
                          <Text>Project Gamma</Text>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuSubContent>
                    </Sidebar.MenuSub>
                  </Sidebar.MenuItem>

                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton 
                      isActive={activeItem === 'favorites'}
                      onClick={() => setActiveItem('favorites')}
                    >
                      <Heart />
                      <Text>Favorites</Text>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.GroupContent>
              </Sidebar.Group>

              {/* Tools group */}
              <Sidebar.Group>
                <Sidebar.GroupLabel>
                  <Text>Tools</Text>
                </Sidebar.GroupLabel>
                <Sidebar.GroupContent>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton 
                      isActive={activeItem === 'calendar'}
                      onClick={() => setActiveItem('calendar')}
                    >
                      <Calendar />
                      <Text>Calendar</Text>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>

                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton 
                      isActive={activeItem === 'messages'}
                      onClick={() => setActiveItem('messages')}
                    >
                      <Mail />
                      <Text>Messages</Text>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>

                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton 
                      isActive={activeItem === 'notifications'}
                      onClick={() => setActiveItem('notifications')}
                    >
                      <Bell />
                      <Text>Notifications</Text>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>

                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton 
                      isActive={activeItem === 'settings'}
                      onClick={() => setActiveItem('settings')}
                    >
                      <Settings />
                      <Text>Settings</Text>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.GroupContent>
              </Sidebar.Group>
              
            </Sidebar.Menu>
          </Sidebar.Content>

          {/* Footer with workspace dropdown */}
          <Sidebar.Footer>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Sidebar.MenuButton>
                  <Building2 />
                  <Text>{selectedWorkspace}</Text>
                  <ChevronDown />
                </Sidebar.MenuButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="start" sideOffset={8}>
                <DropdownMenu.Item onClick={() => setSelectedWorkspace('Acme Corp')}>
                  {selectedWorkspace === 'Acme Corp' && <Check />}
                  <Text>Acme Corp</Text>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => setSelectedWorkspace('Globex Inc')}>
                  {selectedWorkspace === 'Globex Inc' && <Check />}
                  <Text>Globex Inc</Text>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => setSelectedWorkspace('Umbrella Corp')}>
                  {selectedWorkspace === 'Umbrella Corp' && <Check />}
                  <Text>Umbrella Corp</Text>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <Plus />
                  <Text>Create workspace</Text>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Sidebar.Footer>

        </Sidebar.Root>

        <Flex direction="column" flexGrow="1" p="6">
        
        <Flex align="center" justify="between" mb="6">
          <Box>
            <Heading size="6" mb="2">Sidebar Playground</Heading>
            <Text color="gray">Interactive sidebar with workspace selector and user menu dropdowns</Text>
          </Box>
          <Sidebar.Trigger>
            <PanelLeft />
          </Sidebar.Trigger>
        </Flex>

        <Card mb="6">
          <Box p="4">
            <Heading size="4" mb="4">Controls</Heading>
          
          <Flex direction="column" gap="4">
            
            <Box>
              <Text weight="bold" mb="2">Type</Text>
              <Flex gap="2">
                <Button 
                  variant={sidebarType === 'sidebar' ? 'solid' : 'soft'}
                  onClick={() => setSidebarType('sidebar')}
                >
                  Default
                </Button>
                <Button 
                  variant={sidebarType === 'floating' ? 'solid' : 'soft'}
                  onClick={() => setSidebarType('floating')}
                >
                  Floating
                </Button>
              </Flex>
            </Box>

            <Box>
              <Text weight="bold" mb="2">Background Variant</Text>
              <Flex gap="2">
                <Button 
                  variant={variant === 'soft' ? 'solid' : 'soft'}
                  onClick={() => setVariant('soft')}
                >
                  Soft
                </Button>
                <Button 
                  variant={variant === 'surface' ? 'solid' : 'soft'}
                  onClick={() => setVariant('surface')}
                >
                  Surface
                </Button>
                <Button 
                  variant={variant === 'ghost' ? 'solid' : 'soft'}
                  onClick={() => setVariant('ghost')}
                >
                  Ghost
                </Button>
              </Flex>
            </Box>

            <Box>
              <Text weight="bold" mb="2">Menu Button Variant</Text>
              <Flex gap="2">
                <Button 
                  variant={menuVariant === 'solid' ? 'solid' : 'soft'}
                  onClick={() => setMenuVariant('solid')}
                >
                  Solid
                </Button>
                <Button 
                  variant={menuVariant === 'soft' ? 'solid' : 'soft'}
                  onClick={() => setMenuVariant('soft')}
                >
                  Soft
                </Button>
              </Flex>
            </Box>

            <Box>
              <Text weight="bold" mb="2">Side</Text>
              <Flex gap="2">
                <Button 
                  variant={side === 'left' ? 'solid' : 'soft'}
                  onClick={() => setSide('left')}
                >
                  Left
                </Button>
                <Button 
                  variant={side === 'right' ? 'solid' : 'soft'}
                  onClick={() => setSide('right')}
                >
                  Right
                </Button>
              </Flex>
            </Box>

            <Box>
              <Text weight="bold" mb="2">Size</Text>
              <Flex gap="2">
                <Button 
                  variant={size === '1' ? 'solid' : 'soft'}
                  onClick={() => setSize('1')}
                >
                  Size 1 (Compact)
                </Button>
                <Button 
                  variant={size === '2' ? 'solid' : 'soft'}
                  onClick={() => setSize('2')}
                >
                  Size 2 (Default)
                </Button>
              </Flex>
            </Box>

          </Flex>
          </Box>
        </Card>


        <Card>
          <Box p="4">
            <Heading size="4" mb="4">Current State</Heading>
          <Flex direction="column" gap="2">
            <Text><Text weight="bold">Type:</Text> {sidebarType}</Text>
            <Text><Text weight="bold">Side:</Text> {side}</Text>
            <Text><Text weight="bold">Background:</Text> {variant}</Text>
            <Text><Text weight="bold">Menu Buttons:</Text> {menuVariant}</Text>
            <Text><Text weight="bold">Size:</Text> {size}</Text>
            <Text><Text weight="bold">Active Item:</Text> {activeItem}</Text>
          </Flex>
          </Box>
        </Card>

      </Flex>

    </Flex>
    </Sidebar.Provider>
    </div>
  )
} 