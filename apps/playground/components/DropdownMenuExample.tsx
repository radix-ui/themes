import React from 'react';
import { DropdownMenu, Button, Flex, Grid, Heading, Text, Tabs } from '@kushagradhawan/kookie-ui';
import {
  User,
  Settings,
  LogOut,
  Copy,
  Scissors,
  ClipboardPaste,
  Edit,
  Trash2,
  Star,
  Heart,
  Bookmark,
  Share,
  Download,
  Upload,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Palette,
  Sun,
  Moon,
  Monitor,
  ArrowRight,
  FileText,
  FolderOpen,
  MoreHorizontal,
  Archive,
  Package,
  HardDrive,
} from 'lucide-react';

export function DropdownMenuExample() {
  const contentVariants = ['solid', 'soft'] as const;
  const allColors = [
    'gray',
    'gold',
    'bronze',
    'brown',
    'yellow',
    'amber',
    'orange',
    'tomato',
    'red',
    'ruby',
    'crimson',
    'pink',
    'plum',
    'purple',
    'violet',
    'iris',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'jade',
    'green',
    'grass',
    'lime',
    'mint',
    'sky',
  ] as const;
  const sizes = ['1', '2'] as const;

  const [bookmarked, setBookmarked] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [showPreview, setShowPreview] = React.useState(true);
  const [isLocked, setIsLocked] = React.useState(false);
  const [volume, setVolume] = React.useState(true);
  const [theme, setTheme] = React.useState('system');

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="1">
        <Heading size="5">DropdownMenu</Heading>
        <Text size="2" color="gray">
          A menu that appears when a trigger element is clicked, with support for icons, sub-menus,
          and interactive items.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="features">
        <Tabs.List>
          <Tabs.Trigger value="features">Features</Tabs.Trigger>
          <Tabs.Trigger value="content">Content variants</Tabs.Trigger>
          <Tabs.Trigger value="colors">All colors</Tabs.Trigger>
          <Tabs.Trigger value="sizes">All sizes</Tabs.Trigger>
          <Tabs.Trigger value="multiline">Multi-line Content</Tabs.Trigger>
          <Tabs.Trigger value="examples">Real examples</Tabs.Trigger>
        </Tabs.List>

        {/* Features Showcase */}
        <Tabs.Content value="features">
          <Flex pt="6" direction="column" gap="6">
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Basic Menu with Icons
              </Text>
              <Flex gap="3" wrap="wrap">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      Account Menu
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content style={{ width: '240px' }}>
                    <DropdownMenu.Item>
                      <User />
                      <Flex direction="row" align="center">
                        <Text>Profile</Text>
                      </Flex>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Settings />
                      Settings
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red">
                      <LogOut />
                      Sign out
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      Edit Actions
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item shortcut="⌘C">
                      <Copy />
                      Copy
                    </DropdownMenu.Item>
                    <DropdownMenu.Item shortcut="⌘X">
                      <Scissors />
                      Cut
                    </DropdownMenu.Item>
                    <DropdownMenu.Item shortcut="⌘V">
                      <ClipboardPaste />
                      Paste
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>
                      <Edit />
                      Rename
                    </DropdownMenu.Item>
                    <DropdownMenu.Item color="red">
                      <Trash2 />
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Checkbox Items
              </Text>
              <Flex gap="3" wrap="wrap">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      View Options
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>View Settings</DropdownMenu.Label>
                    <DropdownMenu.CheckboxItem
                      checked={showPreview}
                      onCheckedChange={setShowPreview}
                    >
                      <Eye />
                      Show Preview
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.CheckboxItem
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    >
                      {notifications ? <Bell /> : <BellOff />}
                      Notifications
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.CheckboxItem checked={isLocked} onCheckedChange={setIsLocked}>
                      {isLocked ? <Lock /> : <Unlock />}
                      Lock Interface
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.CheckboxItem checked={volume} onCheckedChange={setVolume}>
                      {volume ? <Volume2 /> : <VolumeX />}
                      Sound Effects
                    </DropdownMenu.CheckboxItem>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      Favorites
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item>
                      <Star />
                      Star this item
                    </DropdownMenu.Item>
                    <DropdownMenu.CheckboxItem checked={bookmarked} onCheckedChange={setBookmarked}>
                      <Bookmark />
                      Bookmark
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.Item>
                      <Heart />
                      Add to favorites
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Radio Groups
              </Text>
              <Flex gap="3" wrap="wrap">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      Theme: {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>Theme</DropdownMenu.Label>
                    <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
                      <DropdownMenu.RadioItem value="light">
                        <Sun />
                        Light
                      </DropdownMenu.RadioItem>
                      <DropdownMenu.RadioItem value="dark">
                        <Moon />
                        Dark
                      </DropdownMenu.RadioItem>
                      <DropdownMenu.RadioItem value="system">
                        <Monitor />
                        System
                      </DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Sub-menus
              </Text>
              <Flex gap="3" wrap="wrap">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      File Actions
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item>
                      <Edit />
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>
                        <Share />
                        Share
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>
                          <Copy />
                          Copy link
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Download />
                          Download
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Upload />
                          Upload to cloud
                        </DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>
                        <Palette />
                        More options
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>
                          <Eye />
                          Preview
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Star />
                          Add to favorites
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item color="red">
                          <Trash2 />
                          Delete
                        </DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red">
                      <Trash2 />
                      Delete file
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* Content Variants */}
        <Tabs.Content value="content">
          <Flex pt="6" direction="column" gap="6">
            {contentVariants.map((variant) => (
              <Flex key={variant} direction="column" gap="3">
                <Text size="3" weight="medium" style={{ textTransform: 'capitalize' }}>
                  {variant} variant
                </Text>
                <Flex gap="3" wrap="wrap">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="outline">
                        {variant} Menu
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content variant={variant}>
                      <DropdownMenu.Item>
                        <User />
                        Profile
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <Settings />
                        Settings
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item color="red">
                        <LogOut />
                        Sign out
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>

                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="outline">
                        With High Contrast
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content variant={variant} highContrast>
                      <DropdownMenu.Item>
                        <Copy />
                        Copy
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <Edit />
                        Edit
                      </DropdownMenu.Item>
                      <DropdownMenu.Item color="red">
                        <Trash2 />
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Tabs.Content>

        {/* All Colors */}
        <Tabs.Content value="colors">
          <Flex pt="6" direction="column" gap="6">
            {contentVariants.map((variant) => (
              <Flex key={variant} direction="column" gap="3">
                <Text size="3" weight="medium" style={{ textTransform: 'capitalize' }}>
                  {variant} variant
                </Text>
                <Grid
                  columns="6"
                  gap="3"
                  style={{
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    alignItems: 'start',
                  }}
                >
                  {allColors.slice(0, 18).map((color) => (
                    <DropdownMenu.Root key={color}>
                      <DropdownMenu.Trigger>
                        <Button variant="outline" style={{ width: '100%' }}>
                          {color}
                          <DropdownMenu.TriggerIcon />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content variant={variant} color={color}>
                        <DropdownMenu.Item>
                          <User />
                          Profile
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Settings />
                          Settings
                        </DropdownMenu.Item>
                        <DropdownMenu.Item color={color}>
                          <Star />
                          Colored item
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  ))}
                </Grid>
              </Flex>
            ))}
          </Flex>
        </Tabs.Content>

        {/* All Sizes */}
        <Tabs.Content value="sizes">
          <Flex pt="6" direction="column" gap="6">
            {sizes.map((size) => (
              <Flex key={size} direction="column" gap="3">
                <Text size="3" weight="medium">
                  Size {size}
                </Text>
                <Flex gap="3" wrap="wrap">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="outline" size={size}>
                        Basic Menu (Size {size})
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content size={size}>
                      <DropdownMenu.Item>
                        <User strokeWidth={1.5} />
                        Profile
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <Settings strokeWidth={1.5} />
                        Settings
                      </DropdownMenu.Item>
                      <DropdownMenu.Item shortcut="⌘K">
                        <Edit strokeWidth={1.5} />
                        Edit
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>
                          <Share strokeWidth={1.5} />
                          Share
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                          <DropdownMenu.Item>
                            <Copy strokeWidth={1.5} />
                            Copy link
                          </DropdownMenu.Item>
                          <DropdownMenu.Item>
                            <Download strokeWidth={1.5} />
                            Download
                          </DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                      <DropdownMenu.Item color="red">
                        <LogOut strokeWidth={1.5} />
                        Sign out
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>

                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="outline" size={size}>
                        Checkbox Menu (Size {size})
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content size={size}>
                      <DropdownMenu.Label>Display Options</DropdownMenu.Label>
                      <DropdownMenu.CheckboxItem checked>
                        <Eye />
                        Show toolbar
                      </DropdownMenu.CheckboxItem>
                      <DropdownMenu.CheckboxItem>
                        <Bell />
                        Notifications
                      </DropdownMenu.CheckboxItem>
                      <DropdownMenu.CheckboxItem checked>
                        <Volume2 />
                        Sound effects
                      </DropdownMenu.CheckboxItem>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Tabs.Content>

        {/* Multi-line Content Tab */}
        <Tabs.Content value="multiline">
          <Flex pt="6" direction="column" gap="6">
            <Flex direction="column" gap="2">
              <Text size="3" weight="medium">
                Multi-line Content Examples
              </Text>
              <Text size="2" color="gray">
                Dropdown menu items now support flexible height for multi-line content,
                descriptions, and complex layouts.
              </Text>
            </Flex>

            <Grid columns="3" gap="6">
              {/* Multi-line text items */}
              <Flex direction="column" gap="3">
                <Text size="2" weight="medium">
                  Multi-line Text
                </Text>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      <FileText />
                      Text Options
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content style={{ width: '240px' }}>
                    <DropdownMenu.Item>
                      <FileText />
                      <Flex direction="column" gap="1">
                        <Text size="2" weight="medium">
                          Create New Document
                        </Text>
                        <Text size="1" color="gray">
                          Start with a blank document or template
                        </Text>
                      </Flex>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <FolderOpen />
                      <Flex direction="column" gap="1">
                        <Text size="2" weight="medium">
                          Open Recent
                        </Text>
                        <Text size="1" color="gray">
                          Access your recently opened files
                        </Text>
                      </Flex>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>
                      <Upload />
                      <Flex direction="column" gap="1">
                        <Text size="2" weight="medium">
                          Import from Cloud
                        </Text>
                        <Text size="1" color="gray">
                          Import documents from Google Drive, Dropbox, or OneDrive
                        </Text>
                      </Flex>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>

              {/* Settings with descriptions */}
              <Flex direction="column" gap="3">
                <Text size="2" weight="medium">
                  Settings with Descriptions
                </Text>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      <Settings />
                      Preferences
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>Display Settings</DropdownMenu.Label>
                    <DropdownMenu.CheckboxItem
                      checked={showPreview}
                      onCheckedChange={setShowPreview}
                    >
                      <Eye />
                      <Flex direction="column" gap="1">
                        <Text size="2" weight="medium">
                          Show Preview
                        </Text>
                        <Text size="1" color="gray">
                          Display file previews in the sidebar
                        </Text>
                      </Flex>
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.CheckboxItem
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    >
                      {notifications ? <Bell /> : <BellOff />}
                      <Flex direction="column" gap="1">
                        <Text size="2" weight="medium">
                          Enable Notifications
                        </Text>
                        <Text size="1" color="gray">
                          Receive alerts for important updates and events
                        </Text>
                      </Flex>
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Label>Privacy</DropdownMenu.Label>
                    <DropdownMenu.CheckboxItem checked={isLocked} onCheckedChange={setIsLocked}>
                      {isLocked ? <Lock /> : <Unlock />}
                      <Flex direction="column" gap="1">
                        <Text size="2" weight="medium">
                          Lock Interface
                        </Text>
                        <Text size="1" color="gray">
                          Require authentication before accessing sensitive features
                        </Text>
                      </Flex>
                    </DropdownMenu.CheckboxItem>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>

              {/* Action items with context */}
              <Flex direction="column" gap="3">
                <Text size="2" weight="medium">
                  Actions with Context
                </Text>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      <MoreHorizontal />
                      Actions
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item>
                      <Share />
                      <Flex direction="column" gap="1">
                        <Text size="2" weight="medium">
                          Share Project
                        </Text>
                        <Text size="1" color="gray">
                          Generate a shareable link or invite collaborators
                        </Text>
                      </Flex>
                      <Text size="1" color="gray" style={{ marginLeft: 'auto' }}>
                        ⌘S
                      </Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Download />
                      <Flex direction="column" gap="1">
                        <Text size="2" weight="medium">
                          Export Data
                        </Text>
                        <Text size="1" color="gray">
                          Download in various formats: PDF, CSV, JSON
                        </Text>
                      </Flex>
                      <Text size="1" color="gray" style={{ marginLeft: 'auto' }}>
                        ⌘E
                      </Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>
                        <Archive />
                        <Flex direction="column" gap="1">
                          <Text size="2" weight="medium">
                            Archive Options
                          </Text>
                          <Text size="1" color="gray">
                            Compress and store for later
                          </Text>
                        </Flex>
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>
                          <Package />
                          <Flex direction="column" gap="1">
                            <Text size="2" weight="medium">
                              Create ZIP Archive
                            </Text>
                            <Text size="1" color="gray">
                              Standard compression format
                            </Text>
                          </Flex>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <HardDrive />
                          <Flex direction="column" gap="1">
                            <Text size="2" weight="medium">
                              Archive to Cloud
                            </Text>
                            <Text size="1" color="gray">
                              Store in cloud storage
                            </Text>
                          </Flex>
                        </DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Grid>

            <Flex direction="column" gap="6">
              <Flex direction="column" gap="2">
                <Text size="3" weight="medium">
                  Items with Trailing Action Icons
                </Text>
                <Text size="2" color="gray">
                  Examples showing how to add action buttons at the end of menu items.
                </Text>
              </Flex>

              <Grid columns="2" gap="6">
                {/* Messages list with delete actions */}
                <Flex direction="column" gap="3">
                  <Text size="2" weight="medium">
                    Message List with Actions
                  </Text>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="outline">
                        <Bell />
                        Messages
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content style={{ width: '280px' }}>
                      <DropdownMenu.Label>Recent Messages</DropdownMenu.Label>
                      <DropdownMenu.Item>
                        <User />
                        <Flex direction="column" gap="1" style={{ flex: 1 }}>
                          <Text size="2" weight="medium">
                            This was last message...
                          </Text>
                          <Text size="1" color="gray">
                            2 hours ago
                          </Text>
                        </Flex>
                        <Trash2
                          style={{ cursor: 'pointer', opacity: 0.7 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            alert('Delete message');
                          }}
                        />
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <User />
                        <Flex direction="column" gap="1" style={{ flex: 1 }}>
                          <Text size="2" weight="medium">
                            This was last message...
                          </Text>
                          <Text size="1" color="gray">
                            2 hours ago
                          </Text>
                        </Flex>
                        <Trash2
                          style={{ cursor: 'pointer', opacity: 0.7 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            alert('Delete message');
                          }}
                        />
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <User />
                        <Flex direction="column" gap="1" style={{ flex: 1 }}>
                          <Text size="2" weight="medium">
                            This was last message...
                          </Text>
                          <Text size="1" color="gray">
                            2 hours ago
                          </Text>
                        </Flex>
                        <Trash2
                          style={{ cursor: 'pointer', opacity: 0.7 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            alert('Delete message');
                          }}
                        />
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item>
                        <Eye />
                        View All Messages
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Flex>

                {/* File list with multiple actions */}
                <Flex direction="column" gap="3">
                  <Text size="2" weight="medium">
                    File List with Multiple Actions
                  </Text>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button variant="outline">
                        <FolderOpen />
                        Recent Files
                        <DropdownMenu.TriggerIcon />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content style={{ width: '300px' }}>
                      <DropdownMenu.Label>Recent Documents</DropdownMenu.Label>
                      <DropdownMenu.Item>
                        <FileText />
                        <Flex direction="column" gap="1" style={{ flex: 1 }}>
                          <Text size="2" weight="medium">
                            Project Proposal.docx
                          </Text>
                          <Text size="1" color="gray">
                            Modified 1 hour ago • 2.4 MB
                          </Text>
                        </Flex>
                        <Flex gap="1" align="center">
                          <Edit
                            style={{ cursor: 'pointer', opacity: 0.7 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Edit file');
                            }}
                          />
                          <Share
                            style={{ cursor: 'pointer', opacity: 0.7 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Share file');
                            }}
                          />
                          <Trash2
                            style={{ cursor: 'pointer', opacity: 0.7 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Delete file');
                            }}
                          />
                        </Flex>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <FileText />
                        <Flex direction="column" gap="1" style={{ flex: 1 }}>
                          <Text size="2" weight="medium">
                            Meeting Notes.md
                          </Text>
                          <Text size="1" color="gray">
                            Modified 3 hours ago • 1.2 MB
                          </Text>
                        </Flex>
                        <Flex gap="1" align="center">
                          <Edit
                            style={{ cursor: 'pointer', opacity: 0.7 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Edit file');
                            }}
                          />
                          <Share
                            style={{ cursor: 'pointer', opacity: 0.7 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Share file');
                            }}
                          />
                          <Trash2
                            style={{ cursor: 'pointer', opacity: 0.7 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Delete file');
                            }}
                          />
                        </Flex>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <FileText />
                        <Flex direction="column" gap="1" style={{ flex: 1 }}>
                          <Text size="2" weight="medium">
                            Budget_2024_Final.xlsx
                          </Text>
                          <Text size="1" color="gray">
                            Modified yesterday • 5.1 MB
                          </Text>
                        </Flex>
                        <Flex gap="1" align="center">
                          <Edit
                            style={{ cursor: 'pointer', opacity: 0.7 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Edit file');
                            }}
                          />
                          <Share
                            style={{ cursor: 'pointer', opacity: 0.7 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Share file');
                            }}
                          />
                          <Trash2
                            style={{ cursor: 'pointer', opacity: 0.7 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              alert('Delete file');
                            }}
                          />
                        </Flex>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item>
                        <Eye />
                        Browse All Files
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Flex>
              </Grid>

              <Flex direction="column" gap="3">
                <Text size="2" weight="medium">
                  Design Patterns for Trailing Icons
                </Text>
                <Text size="2" color="gray">
                  Different approaches to handle trailing actions in menu items.
                </Text>

                <Grid columns="3" gap="4">
                  {/* Single action pattern */}
                  <Flex direction="column" gap="3">
                    <Text size="2" weight="medium" color="gray">
                      Single Action
                    </Text>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button variant="soft" size="2">
                          Single Action
                          <DropdownMenu.TriggerIcon />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content style={{ width: '240px' }}>
                        <DropdownMenu.Item>
                          <Bell />
                          <Flex direction="column" gap="1" style={{ flex: 1 }}>
                            <Text size="2" weight="medium">
                              Notification Settings
                            </Text>
                            <Text size="1" color="gray">
                              Configure your alert preferences
                            </Text>
                          </Flex>
                          <Edit style={{ cursor: 'pointer', opacity: 0.7 }} />
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Lock />
                          <Flex direction="column" gap="1" style={{ flex: 1 }}>
                            <Text size="2" weight="medium">
                              Privacy Settings
                            </Text>
                            <Text size="1" color="gray">
                              Manage your privacy options
                            </Text>
                          </Flex>
                          <Edit style={{ cursor: 'pointer', opacity: 0.7 }} />
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Flex>

                  {/* Multiple actions pattern */}
                  <Flex direction="column" gap="3">
                    <Text size="2" weight="medium" color="gray">
                      Multiple Actions
                    </Text>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button variant="soft" size="2">
                          Multiple Actions
                          <DropdownMenu.TriggerIcon />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content style={{ width: '260px' }}>
                        <DropdownMenu.Item>
                          <FileText />
                          <Flex direction="column" gap="1" style={{ flex: 1 }}>
                            <Text size="2" weight="medium">
                              Document.pdf
                            </Text>
                            <Text size="1" color="gray">
                              Last modified today
                            </Text>
                          </Flex>
                          <Flex gap="1" align="center">
                            <Download style={{ cursor: 'pointer', opacity: 0.7 }} />
                            <Share style={{ cursor: 'pointer', opacity: 0.7 }} />
                            <MoreHorizontal style={{ cursor: 'pointer', opacity: 0.7 }} />
                          </Flex>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Flex>

                  {/* Keyboard shortcut pattern */}
                  <Flex direction="column" gap="3">
                    <Text size="2" weight="medium" color="gray">
                      With Shortcuts
                    </Text>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <Button variant="soft" size="2">
                          With Shortcuts
                          <DropdownMenu.TriggerIcon />
                        </Button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content style={{ width: '280px' }}>
                        <DropdownMenu.Item>
                          <Copy />
                          <Flex direction="column" gap="1" style={{ flex: 1 }}>
                            <Text size="2" weight="medium">
                              Copy to Clipboard
                            </Text>
                            <Text size="1" color="gray">
                              Copy the selected content
                            </Text>
                          </Flex>
                          <Text size="1" color="gray">
                            ⌘C
                          </Text>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Download />
                          <Flex direction="column" gap="1" style={{ flex: 1 }}>
                            <Text size="2" weight="medium">
                              Download File
                            </Text>
                            <Text size="1" color="gray">
                              Save to your computer
                            </Text>
                          </Flex>
                          <Text size="1" color="gray">
                            ⌘D
                          </Text>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Flex>
                </Grid>
              </Flex>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="2" weight="medium">
                Size Comparison with Multi-line Content
              </Text>
              <Flex gap="4">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline" size="1">
                      Size 1
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content size="1">
                    <DropdownMenu.Item>
                      <FileText strokeWidth={1.5} />
                      <Flex direction="column" gap="1">
                        <Text size="1" weight="medium">
                          Create Document
                        </Text>
                        <Text size="1" color="gray">
                          Start with a blank document
                        </Text>
                      </Flex>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Settings strokeWidth={1.5} />
                      <Flex direction="column" gap="1">
                        <Text size="1" weight="medium">
                          Settings
                        </Text>
                        <Text size="1" color="gray">
                          Configure your preferences
                        </Text>
                      </Flex>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline" size="2">
                      Size 2
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content size="2">
                    <DropdownMenu.Item>
                      <FileText />
                      <Flex direction="column" gap="1">
                        <Text size="2" weight="medium">
                          Create Document
                        </Text>
                        <Text size="1" color="gray">
                          Start with a blank document or choose from templates
                        </Text>
                      </Flex>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Settings />
                      <Flex direction="column" gap="1">
                        <Text size="2" weight="medium">
                          Settings
                        </Text>
                        <Text size="1" color="gray">
                          Configure your preferences and application settings
                        </Text>
                      </Flex>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>
          </Flex>
        </Tabs.Content>

        {/* Real Examples */}
        <Tabs.Content value="examples">
          <Flex pt="6" direction="column" gap="6">
            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                User Profile Menu
              </Text>
              <Flex gap="3" wrap="wrap">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="ghost">
                      <User />
                      John Doe
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end">
                    <DropdownMenu.Label>My Account</DropdownMenu.Label>
                    <DropdownMenu.Item>
                      <User />
                      Profile
                      <Text size="1" color="gray" style={{ marginLeft: 'auto' }}>
                        ⌘P
                      </Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Settings />
                      Settings
                      <Text size="1" color="gray" style={{ marginLeft: 'auto' }}>
                        ⌘,
                      </Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>
                      <Bell />
                      Notifications
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Lock />
                      Privacy
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red">
                      <LogOut />
                      Sign out
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Table Row Actions
              </Text>
              <Flex gap="3" wrap="wrap">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="ghost" size="1">
                      Actions
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content size="1" align="end">
                    <DropdownMenu.Item>
                      <Eye />
                      View details
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Edit />
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Copy />
                      Duplicate
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>
                        <Share />
                        Share
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>
                          <Copy />
                          Copy link
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <Download />
                          Export
                        </DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red">
                      <Trash2 />
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>

            <Flex direction="column" gap="3">
              <Text size="3" weight="medium">
                Editor Toolbar
              </Text>
              <Flex gap="3" wrap="wrap">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="outline">
                      <Edit />
                      Format
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item shortcut="⌘B">
                      <Text weight="bold">Bold</Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item shortcut="⌘I">
                      <Text style={{ fontStyle: 'italic' }}>Italic</Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item shortcut="⌘U">
                      <Text style={{ textDecoration: 'underline' }}>Underline</Text>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>
                        <Palette />
                        Text Color
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>
                          <div
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 2,
                              backgroundColor: 'black',
                            }}
                          />
                          Black
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <div
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 2,
                              backgroundColor: 'red',
                            }}
                          />
                          Red
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                          <div
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 2,
                              backgroundColor: 'blue',
                            }}
                          />
                          Blue
                        </DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
