'use client';

import React from 'react';
import { TextField, Text, Flex, Box, Heading, Code, Separator, Badge, Container } from '@kushagradhawan/kookie-ui';
import { HugeiconsIcon } from '@hugeicons/react';
import { Rotate01Icon, TransitionTopIcon, TransitionBottomIcon, SquareIcon, CircleIcon } from '@hugeicons/core-free-icons';

export default function TextFieldScrubTest() {
  // 1. Basic Scrubbing
  const [basicValue, setBasicValue] = React.useState(50);
  
  // 2. Constraints
  const [constrainedValue, setConstrainedValue] = React.useState(50);
  
  // 3. Sensitivity
  const [defaultSensitivity, setDefaultSensitivity] = React.useState(50);
  const [highSensitivity, setHighSensitivity] = React.useState(50);
  
  // 4. Modifiers
  const [modifierValue, setModifierValue] = React.useState(50);
  
  // 5. Real-world: Property Panel
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(100);
  const [rotation, setRotation] = React.useState(0);
  const [opacity, setOpacity] = React.useState(100);
  
  const [isScrubbing, setIsScrubbing] = React.useState(false);

  return (
    <Container size="2" px="8" py="8">
      <Flex direction="column" gap="8">
        {/* Header */}
        <Flex direction="column" gap="3">
        <Flex justify="between" align="center">
          <Heading size="9" weight="medium">TextField Scrubbing</Heading>
          {isScrubbing && (
            <Badge variant="solid" size="2" highContrast>Scrubbing</Badge>
          )}
        </Flex>
        <Text size="2" color="gray">
          Testing interactive value adjustment through structured scenarios
        </Text>
      </Flex>

      <Separator size="4" />

      {/* Test 1: Basic Scrubbing */}
      <Flex direction="column" gap="5">
        <Box>
          <Heading size="6" weight="medium" mb="2">1. Basic Scrubbing</Heading>
          <Text size="2" color="gray">
            Core functionality: drag the label to adjust value
          </Text>
        </Box>
        
        <TextField.Root
          size="2"
          variant="soft"
          type="number"
          value={basicValue}
          onChange={(e) => setBasicValue(Number(e.target.value) || 0)}
        >
          <TextField.Slot
            scrub
            scrubValue={basicValue}
            scrubStep={1}
            onScrub={(delta, isChanging) => {
              setIsScrubbing(isChanging);
              setBasicValue((prev) => prev + delta);
            }}
          >
            <Text size="2" weight="medium">Value</Text>
          </TextField.Slot>
        </TextField.Root>

        <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
          <Text size="2" color="gray">
            <Code variant="soft">scrub</Code> enabled, <Code variant="soft">scrubStep={'{1}'}</Code>, no constraints
          </Text>
        </Box>
      </Flex>

      <Separator size="4" />

      {/* Test 2: Constraints */}
      <Flex direction="column" gap="5">
        <Box>
          <Heading size="6" weight="medium" mb="2">2. Min/Max Constraints</Heading>
          <Text size="2" color="gray">
            Boundary behavior: value clamped between 0-100
          </Text>
        </Box>
        
        <TextField.Root
          size="2"
          variant="soft"
          type="number"
          value={constrainedValue}
          onChange={(e) => setConstrainedValue(Number(e.target.value) || 0)}
        >
          <TextField.Slot
            scrub
            scrubValue={constrainedValue}
            scrubMin={0}
            scrubMax={100}
            scrubStep={1}
            onScrub={(delta) => setConstrainedValue((prev) => prev + delta)}
          >
            <Text size="2" weight="medium">Percentage</Text>
          </TextField.Slot>
          <TextField.Slot side="right">
            <Text size="2" color="gray">%</Text>
          </TextField.Slot>
        </TextField.Root>

        <Box p="5" style={{ 
          width: '100%',
          height: 80,
          background: 'var(--accent-9)',
          opacity: constrainedValue / 100,
          borderRadius: 'var(--radius-3)',
        }}>
          <Text size="5" style={{ color: 'white' }}>{constrainedValue}%</Text>
        </Box>

        <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
          <Text size="2" color="gray">
            <Code variant="soft">scrubMin={'{0}'}</Code>, <Code variant="soft">scrubMax={'{100}'}</Code> — Delta becomes 0 at boundaries
          </Text>
        </Box>
      </Flex>

      <Separator size="4" />

      {/* Test 3: Sensitivity */}
      <Flex direction="column" gap="5">
        <Box>
          <Heading size="6" weight="medium" mb="2">3. Sensitivity Control</Heading>
          <Text size="2" color="gray">
            Adjust how much mouse movement equals one step
          </Text>
        </Box>
        
        <Flex direction="column" gap="3">
          <Box>
            <Text size="2" weight="medium" mb="2">Default (sensitivity = 1)</Text>
            <TextField.Root
              size="2"
              variant="soft"
              type="number"
              value={defaultSensitivity}
              onChange={(e) => setDefaultSensitivity(Number(e.target.value) || 0)}
            >
              <TextField.Slot
                scrub
                scrubValue={defaultSensitivity}
                scrubStep={1}
                scrubSensitivity={1}
                onScrub={(delta) => setDefaultSensitivity((prev) => prev + delta)}
              >
                <Text size="2" weight="medium">Quick</Text>
              </TextField.Slot>
            </TextField.Root>
          </Box>

          <Box>
            <Text size="2" weight="medium" mb="2">High (sensitivity = 5)</Text>
            <TextField.Root
              size="2"
              variant="soft"
              type="number"
              value={highSensitivity}
              onChange={(e) => setHighSensitivity(Number(e.target.value) || 0)}
            >
              <TextField.Slot
                scrub
                scrubValue={highSensitivity}
                scrubStep={1}
                scrubSensitivity={5}
                onScrub={(delta) => setHighSensitivity((prev) => prev + delta)}
              >
                <Text size="2" weight="medium">Precise</Text>
              </TextField.Slot>
            </TextField.Root>
          </Box>
        </Flex>

        <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
          <Text size="2" color="gray">
            <Code variant="soft">scrubSensitivity</Code> controls pixels per step. Higher = more movement required
          </Text>
        </Box>
      </Flex>

      <Separator size="4" />

      {/* Test 4: Modifiers */}
      <Flex direction="column" gap="5">
        <Box>
          <Heading size="6" weight="medium" mb="2">4. Keyboard Modifiers</Heading>
          <Text size="2" color="gray">
            Hold modifier keys while scrubbing for different speeds
          </Text>
        </Box>
        
        <TextField.Root
          size="2"
          variant="soft"
          type="number"
          value={modifierValue}
          onChange={(e) => setModifierValue(Number(e.target.value) || 0)}
        >
          <TextField.Slot
            scrub
            scrubValue={modifierValue}
            scrubStep={1}
            scrubShiftMultiplier={10}
            scrubAltMultiplier={0.1}
            onScrub={(delta) => setModifierValue((prev) => prev + delta)}
          >
            <Text size="2" weight="medium">Value</Text>
          </TextField.Slot>
        </TextField.Root>

        <Flex direction="column" gap="2">
          <Flex gap="2" align="center">
            <Code variant="soft">Drag</Code>
            <Text size="2" color="gray">Normal speed (step × 1)</Text>
          </Flex>
          <Flex gap="2" align="center">
            <Code variant="soft">Shift + Drag</Code>
            <Text size="2" color="gray">Fast (step × 10)</Text>
          </Flex>
          <Flex gap="2" align="center">
            <Code variant="soft">Alt + Drag</Code>
            <Text size="2" color="gray">Slow (step × 0.1)</Text>
          </Flex>
        </Flex>

        <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
          <Text size="2" color="gray">
            <Code variant="soft">scrubShiftMultiplier</Code> and <Code variant="soft">scrubAltMultiplier</Code> customize modifier behavior
          </Text>
        </Box>
      </Flex>

      <Separator size="4" />

      {/* Test 5: Real-World Application */}
      <Flex direction="column" gap="5">
        <Box>
          <Heading size="6" weight="medium" mb="2">5. Real-World: Property Panel</Heading>
          <Text size="2" color="gray">
            Design tool-style interface combining all features
          </Text>
        </Box>

        <Flex direction="column" gap="2">
          <Flex gap="2">
            <TextField.Root
              size="2"
              variant="soft"
              type="number"
              value={x}
              onChange={(e) => setX(Number(e.target.value) || 0)}
              style={{ flex: 1 }}
            >
              <TextField.Slot
                scrub
                scrubValue={x}
                scrubMin={-200}
                scrubMax={200}
                scrubStep={1}
                onScrub={(delta) => setX((prev) => prev + delta)}
              >
                <Text size="2">X</Text>
              </TextField.Slot>
            </TextField.Root>

            <TextField.Root
              size="2"
              variant="soft"
              type="number"
              value={y}
              onChange={(e) => setY(Number(e.target.value) || 0)}
              style={{ flex: 1 }}
            >
              <TextField.Slot
                scrub
                scrubValue={y}
                scrubMin={-200}
                scrubMax={200}
                scrubStep={1}
                onScrub={(delta) => setY((prev) => prev + delta)}
              >
                <Text size="2">Y</Text>
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          <Flex gap="2">
            <TextField.Root
              size="2"
              variant="soft"
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value) || 0)}
              style={{ flex: 1 }}
            >
              <TextField.Slot
                scrub
                scrubValue={width}
                scrubMin={1}
                scrubMax={300}
                scrubStep={1}
                onScrub={(delta) => setWidth((prev) => prev + delta)}
              >
                <Text size="2">W</Text>
              </TextField.Slot>
            </TextField.Root>

            <TextField.Root
              size="2"
              variant="soft"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value) || 0)}
              style={{ flex: 1 }}
            >
              <TextField.Slot
                scrub
                scrubValue={height}
                scrubMin={1}
                scrubMax={300}
                scrubStep={1}
                onScrub={(delta) => setHeight((prev) => prev + delta)}
              >
                <Text size="2">H</Text>
              </TextField.Slot>
            </TextField.Root>
          </Flex>

          <TextField.Root
            size="2"
            variant="soft"
            type="number"
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value) || 0)}
          >
            <TextField.Slot
              scrub
              scrubValue={rotation}
              scrubMin={-180}
              scrubMax={180}
              scrubStep={1}
              onScrub={(delta) => setRotation((prev) => prev + delta)}
            >
              <HugeiconsIcon strokeWidth={1.75} icon={Rotate01Icon} />
            </TextField.Slot>
            <TextField.Slot side="right">
              <Text size="2" color="gray">°</Text>
            </TextField.Slot>
          </TextField.Root>

          <TextField.Root
            size="2"
            variant="soft"
            type="number"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value) || 0)}
          >
            <TextField.Slot
              scrub
              scrubValue={opacity}
              scrubMin={0}
              scrubMax={100}
              scrubStep={1}
              onScrub={(delta) => setOpacity((prev) => prev + delta)}
            >
              <HugeiconsIcon strokeWidth={1.75} icon={CircleIcon} />
            </TextField.Slot>
            <TextField.Slot side="right">
              <Text size="2" color="gray">%</Text>
            </TextField.Slot>
          </TextField.Root>
        </Flex>

        <Box p="6" style={{ minHeight: 200, background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
          <Box style={{ 
            width: width, 
            height: height, 
            background: 'var(--accent-9)',
            opacity: opacity / 100,
            borderRadius: 'var(--radius-3)',
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
          }} />
        </Box>

        <Box p="4" style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
          <Text size="2" color="gray">
            Combined implementation: compact size, constraints, modifiers, and visual feedback
          </Text>
        </Box>
      </Flex>
      </Flex>
    </Container>
  );
}
