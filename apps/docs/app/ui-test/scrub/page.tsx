'use client';

import React, { useState } from 'react';
import {
  TextField,
  Text,
  Flex,
  Box,
  Heading,
  Card,
  Separator,
  Badge,
  Code,
  Slider,
  Switch,
} from '@kushagradhawan/kookie-ui';
import { Ruler, Move, Settings2, Zap } from 'lucide-react';

export default function ScrubTestPage() {
  // Basic example
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(50);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // Advanced example with custom settings
  const [opacity, setOpacity] = useState(100);
  const [rotation, setRotation] = useState(0);

  // Configurable demo
  const [demoValue, setDemoValue] = useState(50);
  const [sensitivity, setSensitivity] = useState(1);
  const [step, setStep] = useState(1);
  const [shiftMultiplier, setShiftMultiplier] = useState(10);
  const [altMultiplier, setAltMultiplier] = useState(0.1);
  const [useBounds, setUseBounds] = useState(false);
  const [minBound, setMinBound] = useState(0);
  const [maxBound, setMaxBound] = useState(100);

  return (
    <Box p="6" style={{ maxWidth: 900, margin: '0 auto' }}>
      <Flex direction="column" gap="6">
        {/* Header */}
        <Flex direction="column" gap="2">
          <Badge size="2" variant="soft" color="blue" style={{ alignSelf: 'flex-start' }}>
            New Feature
          </Badge>
          <Heading size="7" weight="bold">
            TextField Scrubbing
          </Heading>
          <Text size="3" color="gray">
            Drag on the label slot to adjust numeric values. Hold <Code>Shift</Code> for coarse
            adjustment or <Code>Alt/Option</Code> for fine adjustment.
          </Text>
        </Flex>

        <Separator size="4" />

        {/* Basic Example */}
        <Card size="3">
          <Flex direction="column" gap="4">
            <Flex align="center" gap="2">
              <Ruler size={18} />
              <Heading size="4">Basic Example</Heading>
            </Flex>
            <Text size="2" color="gray">
              Drag on &quot;Width&quot; or &quot;Height&quot; labels to scrub the values.
            </Text>

            <Flex gap="4" wrap="wrap">
              <Box style={{ width: 160 }}>
                <TextField.Root
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                >
                  <TextField.Slot
                    side="left"
                    scrub
                    scrubValue={width}
                    scrubMin={0}
                    scrubMax={400}
                    onScrub={(delta, isChanging) => {
                      setWidth((prev) => Math.round(prev + delta));
                      setIsScrubbing(isChanging);
                    }}
                  >
                    <Text size="2" weight="medium">
                      Width
                    </Text>
                  </TextField.Slot>
                  <TextField.Slot side="right">
                    <Text size="1" color="gray">
                      px
                    </Text>
                  </TextField.Slot>
                </TextField.Root>
              </Box>

              <Box style={{ width: 160 }}>
                <TextField.Root
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                >
                  <TextField.Slot
                    side="left"
                    scrub
                    scrubValue={height}
                    scrubMin={0}
                    scrubMax={400}
                    onScrub={(delta, isChanging) => {
                      setHeight((prev) => Math.round(prev + delta));
                      setIsScrubbing(isChanging);
                    }}
                  >
                    <Text size="2" weight="medium">
                      Height
                    </Text>
                  </TextField.Slot>
                  <TextField.Slot side="right">
                    <Text size="1" color="gray">
                      px
                    </Text>
                  </TextField.Slot>
                </TextField.Root>
              </Box>
            </Flex>

            {/* Preview box */}
            <Flex align="center" gap="3">
              <Box
                style={{
                  width: width,
                  height: height,
                  minWidth: 20,
                  minHeight: 20,
                  maxWidth: 400,
                  maxHeight: 400,
                  backgroundColor: 'var(--accent-4)',
                  border: '2px solid var(--accent-8)',
                  borderRadius: 'var(--radius-2)',
                  transition: isScrubbing ? 'none' : 'all 0.1s ease-out',
                }}
              />
              {isScrubbing && (
                <Badge color="blue" variant="soft">
                  Scrubbing...
                </Badge>
              )}
            </Flex>
          </Flex>
        </Card>

        {/* Advanced Example */}
        <Card size="3">
          <Flex direction="column" gap="4">
            <Flex align="center" gap="2">
              <Move size={18} />
              <Heading size="4">Transform Controls</Heading>
            </Flex>
            <Text size="2" color="gray">
              Fine-grained control with different step values and bounds.
            </Text>

            <Flex gap="4" wrap="wrap">
              <Box style={{ width: 180 }}>
                <TextField.Root
                  type="number"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                >
                  <TextField.Slot
                    side="left"
                    scrub
                    scrubValue={opacity}
                    scrubStep={1}
                    scrubMin={0}
                    scrubMax={100}
                    onScrub={(delta) => setOpacity((prev) => Math.round(prev + delta))}
                  >
                    <Text size="2" weight="medium">
                      Opacity
                    </Text>
                  </TextField.Slot>
                  <TextField.Slot side="right">
                    <Text size="1" color="gray">
                      %
                    </Text>
                  </TextField.Slot>
                </TextField.Root>
              </Box>

              <Box style={{ width: 180 }}>
                <TextField.Root
                  type="number"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                >
                  <TextField.Slot
                    side="left"
                    scrub
                    scrubValue={rotation}
                    scrubStep={1}
                    scrubSensitivity={2}
                    scrubShiftMultiplier={15}
                    scrubAltMultiplier={0.1}
                    onScrub={(delta) => setRotation((prev) => Math.round((prev + delta) * 10) / 10)}
                  >
                    <Text size="2" weight="medium">
                      Rotation
                    </Text>
                  </TextField.Slot>
                  <TextField.Slot side="right">
                    <Text size="1" color="gray">
                      °
                    </Text>
                  </TextField.Slot>
                </TextField.Root>
              </Box>
            </Flex>

            {/* Preview */}
            <Flex align="center" justify="center" style={{ height: 120 }}>
              <Box
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: 'var(--accent-9)',
                  borderRadius: 'var(--radius-3)',
                  opacity: opacity / 100,
                  transform: `rotate(${rotation}deg)`,
                  transition: 'opacity 0.1s, transform 0.1s',
                }}
              />
            </Flex>
          </Flex>
        </Card>

        {/* Configurable Demo */}
        <Card size="3">
          <Flex direction="column" gap="4">
            <Flex align="center" gap="2">
              <Settings2 size={18} />
              <Heading size="4">Configurable Demo</Heading>
            </Flex>
            <Text size="2" color="gray">
              Adjust the scrubbing parameters to see how they affect the behavior.
            </Text>

            <Flex gap="6" wrap="wrap">
              {/* The scrub input */}
              <Box style={{ flex: '1 1 200px' }}>
                <Flex direction="column" gap="3">
                  <TextField.Root
                    type="number"
                    size="3"
                    value={demoValue}
                    onChange={(e) => setDemoValue(Number(e.target.value))}
                  >
                    <TextField.Slot
                      side="left"
                      scrub
                      scrubValue={demoValue}
                      scrubStep={step}
                      scrubSensitivity={sensitivity}
                      scrubShiftMultiplier={shiftMultiplier}
                      scrubAltMultiplier={altMultiplier}
                      scrubMin={useBounds ? minBound : undefined}
                      scrubMax={useBounds ? maxBound : undefined}
                      onScrub={(delta) => setDemoValue((prev) => Math.round((prev + delta) * 100) / 100)}
                    >
                      <Text size="2" weight="bold">
                        Value
                      </Text>
                    </TextField.Slot>
                  </TextField.Root>

                  <Flex align="center" gap="2">
                    <Zap size={14} />
                    <Text size="1" color="gray">
                      Current: <Code>{demoValue}</Code>
                    </Text>
                  </Flex>
                </Flex>
              </Box>

              {/* Controls */}
              <Box style={{ flex: '1 1 300px' }}>
                <Flex direction="column" gap="4">
                  <Flex direction="column" gap="2">
                    <Flex justify="between">
                      <Text size="2" weight="medium">
                        Sensitivity
                      </Text>
                      <Text size="1" color="gray">
                        {sensitivity}px per step
                      </Text>
                    </Flex>
                    <Slider
                      value={[sensitivity]}
                      onValueChange={([v]) => setSensitivity(v)}
                      min={0.5}
                      max={5}
                      step={0.5}
                    />
                  </Flex>

                  <Flex direction="column" gap="2">
                    <Flex justify="between">
                      <Text size="2" weight="medium">
                        Step
                      </Text>
                      <Text size="1" color="gray">
                        {step}
                      </Text>
                    </Flex>
                    <Slider
                      value={[step]}
                      onValueChange={([v]) => setStep(v)}
                      min={0.1}
                      max={10}
                      step={0.1}
                    />
                  </Flex>

                  <Flex direction="column" gap="2">
                    <Flex justify="between">
                      <Text size="2" weight="medium">
                        Shift Multiplier
                      </Text>
                      <Text size="1" color="gray">
                        {shiftMultiplier}x
                      </Text>
                    </Flex>
                    <Slider
                      value={[shiftMultiplier]}
                      onValueChange={([v]) => setShiftMultiplier(v)}
                      min={1}
                      max={20}
                      step={1}
                    />
                  </Flex>

                  <Flex direction="column" gap="2">
                    <Flex justify="between">
                      <Text size="2" weight="medium">
                        Alt Multiplier
                      </Text>
                      <Text size="1" color="gray">
                        {altMultiplier}x
                      </Text>
                    </Flex>
                    <Slider
                      value={[altMultiplier]}
                      onValueChange={([v]) => setAltMultiplier(v)}
                      min={0.01}
                      max={1}
                      step={0.01}
                    />
                  </Flex>

                  <Separator />

                  <Flex align="center" justify="between">
                    <Text size="2" weight="medium">
                      Use Bounds
                    </Text>
                    <Switch checked={useBounds} onCheckedChange={setUseBounds} />
                  </Flex>

                  {useBounds && (
                    <Flex gap="3">
                      <Box style={{ flex: 1 }}>
                        <TextField.Root
                          type="number"
                          size="1"
                          value={minBound}
                          onChange={(e) => setMinBound(Number(e.target.value))}
                        >
                          <TextField.Slot side="left">
                            <Text size="1">Min</Text>
                          </TextField.Slot>
                        </TextField.Root>
                      </Box>
                      <Box style={{ flex: 1 }}>
                        <TextField.Root
                          type="number"
                          size="1"
                          value={maxBound}
                          onChange={(e) => setMaxBound(Number(e.target.value))}
                        >
                          <TextField.Slot side="left">
                            <Text size="1">Max</Text>
                          </TextField.Slot>
                        </TextField.Root>
                      </Box>
                    </Flex>
                  )}
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Card>

        {/* Instructions */}
        <Card size="2" style={{ backgroundColor: 'var(--gray-a2)' }}>
          <Flex direction="column" gap="2">
            <Heading size="3">How to Use</Heading>
            <Flex direction="column" gap="1" asChild>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>
                  <Text size="2">
                    <strong>Drag horizontally</strong> on a label to adjust the value
                  </Text>
                </li>
                <li>
                  <Text size="2">
                    Hold <Code>Shift</Code> while dragging for <strong>coarse</strong> adjustment
                  </Text>
                </li>
                <li>
                  <Text size="2">
                    Hold <Code>Alt</Code> / <Code>Option</Code> while dragging for{' '}
                    <strong>fine</strong> adjustment
                  </Text>
                </li>
                <li>
                  <Text size="2">
                    The virtual cursor <strong>wraps around</strong> the slot edges
                  </Text>
                </li>
                <li>
                  <Text size="2">You can still click to focus and type values directly</Text>
                </li>
              </ul>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Box>
  );
}

