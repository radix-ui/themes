'use client';

import * as React from 'react';
import { PreviewBlock, CodeBlock, SectionHeader } from '@kushagradhawan/kookie-blocks';
import { Flex, TextField, Text, Separator, Card, Heading, Button, Inset, Image } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, Mail01Icon, LockPasswordIcon, ViewIcon, ViewOffIcon, UserIcon, Link01Icon } from '@hugeicons/core-free-icons';

export function TextFieldExamples() {
  // Search state
  const [searchQuery, setSearchQuery] = React.useState('');

  // Login form state
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // Property panel state
  const [width, setWidth] = React.useState(1920);
  const [height, setHeight] = React.useState(1080);

  const handleEmailBlur = () => {
    if (email && !email.includes('@')) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <Flex direction="column" gap="9">
      {/* Example 1: Search Interface */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Search Interface</SectionHeader.Title>
            <SectionHeader.Description>
              The surface variant works well for search inputs. Use icon slots to provide visual context and help users understand the input purpose at a glance.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="8rem">
          <TextField.Root variant="surface" size="2" placeholder="Search documents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: 320 }}>
            <TextField.Slot>
              <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
            </TextField.Slot>
          </TextField.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<TextField.Root
  variant="surface"
  size="2"
  placeholder="Search documents..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
>
  <TextField.Slot>
    <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
  </TextField.Slot>
</TextField.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 2: Login Form */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Login Form</SectionHeader.Title>
            <SectionHeader.Description>
              The surface variant provides clean form inputs inside elevated cards. Password fields include a visibility toggle in the right slot. Try entering an invalid email to see error validation
              in action.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="dots" height="40rem">
          <Card variant="classic" size="2" style={{ maxWidth: 400 }}>
            <Flex direction="column">
              <Inset clip="padding-box" side="top" pb="current">
                <Image
                  src="https://images.unsplash.com/photo-1637664025413-630c2aa76b5a?q=80&w=1288&auto=format&fit=crop"
                  alt="Abstract gradient"
                  radius="none"
                  style={{ height: 240, objectFit: 'cover' }}
                />
              </Inset>
              <Flex direction="column" gap="6" p="2">
                <Flex direction="column" gap="1">
                  <Heading size="6" weight="medium">
                    Welcome back
                  </Heading>
                  <Text size="3" color="gray">
                    Sign in to continue to your account.
                  </Text>
                </Flex>
                <Flex direction="column" gap="2">
                  <TextField.Root
                    variant="surface"
                    size="2"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    error={!!emailError}
                    errorMessage={emailError}
                  >
                    <TextField.Slot>
                      <HugeiconsIcon icon={Mail01Icon} strokeWidth={1.75} />
                    </TextField.Slot>
                  </TextField.Root>
                  <TextField.Root variant="surface" size="2" type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}>
                    <TextField.Slot>
                      <HugeiconsIcon icon={LockPasswordIcon} strokeWidth={1.75} />
                    </TextField.Slot>
                    <TextField.Slot side="right">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          display: 'flex',
                          color: 'inherit',
                        }}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} strokeWidth={1.75} />
                      </button>
                    </TextField.Slot>
                  </TextField.Root>
                </Flex>
                <Button variant="solid" size="2" color="gray" highContrast>
                  Sign In
                </Button>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`<Card variant="classic" size="2" style={{ maxWidth: 400 }}>
  <Flex direction="column">
    <Inset clip="padding-box" side="top" pb="current">
      <Image
        src="/path/to/image.jpg"
        alt="Card media"
        radius="none"
        style={{ height: 240, objectFit: 'cover' }}
      />
    </Inset>
    <Flex direction="column" gap="6" p="2">
      <Flex direction="column" gap="1">
        <Heading size="6" weight="medium">Welcome back</Heading>
        <Text size="3" color="gray">
          Sign in to continue to your account.
        </Text>
      </Flex>
      <Flex direction="column" gap="2">
        <TextField.Root
          variant="surface"
          size="2"
          type="email"
          placeholder="Email address"
          error={!!emailError}
          errorMessage={emailError}
        >
          <TextField.Slot>
            <HugeiconsIcon icon={Mail01Icon} strokeWidth={1.75} />
          </TextField.Slot>
        </TextField.Root>
        <TextField.Root
          variant="surface"
          size="2"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
        >
          <TextField.Slot>
            <HugeiconsIcon icon={LockPasswordIcon} strokeWidth={1.75} />
          </TextField.Slot>
          <TextField.Slot side="right">
            <button onClick={() => setShowPassword(!showPassword)}>
              <HugeiconsIcon
                icon={showPassword ? ViewOffIcon : ViewIcon}
                strokeWidth={1.75}
              />
            </button>
          </TextField.Slot>
        </TextField.Root>
      </Flex>
      <Button variant="solid" size="2" color="gray" highContrast>
        Sign In
      </Button>
    </Flex>
  </Flex>
</Card>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 3: Property Panel */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Property Panel</SectionHeader.Title>
            <SectionHeader.Description>
              Design tool-style inputs with scrubbing behavior. Drag the labels horizontally to adjust values - hold Shift for 10x speed or Alt/Option for fine control. Size 1 keeps the interface
              compact.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="10rem">
          <Card variant="classic" size="1" style={{ width: 200 }}>
            <Flex direction="column" gap="2" p="2">
              <Text size="1" weight="medium" color="gray">
                Dimensions
              </Text>
              <Flex direction="column" gap="1">
                <TextField.Root variant="soft" size="1" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value) || 0)}>
                  <TextField.Slot scrub scrubValue={width} scrubMin={1} scrubMax={7680} scrubStep={1} scrubSensitivity={2} onScrub={(delta) => setWidth((prev) => prev + delta)}>
                    <Text size="1" weight="medium" style={{ width: 12 }}>
                      W
                    </Text>
                  </TextField.Slot>
                  <TextField.Slot side="right">
                    <Text size="1" color="gray">
                      px
                    </Text>
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root variant="soft" size="1" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)}>
                  <TextField.Slot scrub scrubValue={height} scrubMin={1} scrubMax={4320} scrubStep={1} scrubSensitivity={2} onScrub={(delta) => setHeight((prev) => prev + delta)}>
                    <Text size="1" weight="medium" style={{ width: 12 }}>
                      H
                    </Text>
                  </TextField.Slot>
                  <TextField.Slot side="right">
                    <Text size="1" color="gray">
                      px
                    </Text>
                  </TextField.Slot>
                </TextField.Root>
              </Flex>
            </Flex>
          </Card>
        </PreviewBlock>
        <CodeBlock
          code={`const [width, setWidth] = React.useState(1920);
const [height, setHeight] = React.useState(1080);

<TextField.Root
  variant="soft"
  size="1"
  type="number"
  value={width}
  onChange={(e) => setWidth(Number(e.target.value) || 0)}
>
  <TextField.Slot
    scrub
    scrubValue={width}
    scrubMin={1}
    scrubMax={7680}
    scrubStep={1}
    scrubSensitivity={2}
    onScrub={(delta) => setWidth((prev) => prev + delta)}
  >
    <Text size="1" weight="medium" style={{ width: 12 }}>
      W
    </Text>
  </TextField.Slot>
  <TextField.Slot side="right">
    <Text size="1" color="gray">
      px
    </Text>
  </TextField.Slot>
</TextField.Root>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 4: Profile Settings */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Profile Settings</SectionHeader.Title>
            <SectionHeader.Description>
              The outline variant provides clear boundaries in structured forms. Icons in slots reinforce input purpose and improve scannability across multiple fields.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock background="none" height="14rem">
          <Flex direction="column" gap="3" style={{ width: 320 }}>
            <TextField.Root variant="outline" size="2" color="gray" placeholder="Display name">
              <TextField.Slot>
                <HugeiconsIcon icon={UserIcon} strokeWidth={1.75} />
              </TextField.Slot>
            </TextField.Root>
            <TextField.Root variant="outline" size="2" color="gray" type="email" placeholder="Email address">
              <TextField.Slot>
                <HugeiconsIcon icon={Mail01Icon} strokeWidth={1.75} />
              </TextField.Slot>
            </TextField.Root>
            <TextField.Root variant="outline" size="2" color="gray" type="url" placeholder="Website">
              <TextField.Slot>
                <HugeiconsIcon icon={Link01Icon} strokeWidth={1.75} />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
        </PreviewBlock>
        <CodeBlock
          code={`<Flex direction="column" gap="3">
  <TextField.Root
    variant="outline"
    size="2"
    color="gray"
    placeholder="Display name"
  >
    <TextField.Slot>
      <HugeiconsIcon icon={UserIcon} strokeWidth={1.75} />
    </TextField.Slot>
  </TextField.Root>
  <TextField.Root
    variant="outline"
    size="2"
    color="gray"
    type="email"
    placeholder="Email address"
  >
    <TextField.Slot>
      <HugeiconsIcon icon={Mail01Icon} strokeWidth={1.75} />
    </TextField.Slot>
  </TextField.Root>
  <TextField.Root
    variant="outline"
    size="2"
    color="gray"
    type="url"
    placeholder="Website"
  >
    <TextField.Slot>
      <HugeiconsIcon icon={Link01Icon} strokeWidth={1.75} />
    </TextField.Slot>
  </TextField.Root>
</Flex>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>

      <Separator size="4" />

      {/* Example 5: Translucent Material */}
      <Flex direction="column" gap="4">
        <SectionHeader.Root>
          <SectionHeader.Content>
            <SectionHeader.Title>Translucent Material</SectionHeader.Title>
            <SectionHeader.Description>
              The translucent material creates depth over images and dynamic backgrounds. Use the soft variant for subtle integration that doesn't compete with visual content.
            </SectionHeader.Description>
          </SectionHeader.Content>
        </SectionHeader.Root>
        <PreviewBlock
          height="12rem"
          p="0"
          showThemeToggle={false}
          appearance="dark"
          variant="ghost"
          background={{
            backgroundColor: 'hsl(220, 20%, 10%)',
            backgroundImage:
              'url(https://images.unsplash.com/photo-1765568562586-6a6a0e961582?q=80&w=3432&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <TextField.Root variant="soft" size="2" material="translucent" placeholder="Search the universe..." style={{ width: 320 }}>
            <TextField.Slot>
              <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
            </TextField.Slot>
          </TextField.Root>
        </PreviewBlock>
        <CodeBlock
          code={`<Theme appearance="dark" material="translucent">
  <TextField.Root
    variant="soft"
    size="2"
    placeholder="Search the universe..."
  >
    <TextField.Slot>
      <HugeiconsIcon icon={Search01Icon} strokeWidth={1.75} />
    </TextField.Slot>
  </TextField.Root>
</Theme>`}
          language="tsx"
          showLineNumbers={true}
          collapsible={false}
        />
      </Flex>
    </Flex>
  );
}
