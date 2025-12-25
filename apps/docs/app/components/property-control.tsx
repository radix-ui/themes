'use client';

import * as React from 'react';
import * as Label from '@radix-ui/react-label';
import { Card, Flex, Grid, Text, DropdownMenu, Switch, Box, Button, Theme } from '@kushagradhawan/kookie-ui';

interface RootProps {
  width?: string | number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

function Root({ width, style, children }: RootProps) {
  return (
    <Card size="2" variant="ghost" style={{ width: width || 'fit-content', height: 'fit-content', ...style }}>
      <Flex direction="column" gap="4">
        {children}
      </Flex>
    </Card>
  );
}

interface FieldProps {
  children: React.ReactNode;
}

function Field({ children }: FieldProps) {
  return (
    <Grid columns={{ initial: '1', sm: '2' }} align="center" gap="8" style={{ minHeight: 'var(--space-5)' }}>
      {children}
    </Grid>
  );
}

interface LabelProps extends React.ComponentPropsWithoutRef<typeof Label.Root> {}
function PropertyLabel({ children, ...props }: LabelProps) {
  return (
    <Label.Root {...props}>
      <Text size="1" highContrast color="gray">
        {children}
      </Text>
    </Label.Root>
  );
}

interface ControlProps {
  children: React.ReactNode;
}

function Control({ children }: ControlProps) {
  return <Flex align="center">{children}</Flex>;
}

// Schema-driven controls
type SelectOption = { label: string; value: string };

type SelectItem = {
  id: string;
  label: string;
  type: 'select';
  value: string;
  options: SelectOption[];
  placeholder?: string;
  appearance?: 'swatch';
  onChange: (value: string) => void;
};

type SwitchItem = {
  id: string;
  label: string;
  type: 'switch';
  value: boolean;
  onChange: (checked: boolean) => void;
};

type Item = SelectItem | SwitchItem;

function getSwatchVar(value: string): string {
  // 'theme' uses accent color; others map to their color family -9 token
  return value === 'theme' ? 'var(--accent-9)' : `var(--${value}-9)`;
}

function Swatch({ value }: { value: string }) {
  return (
    <Box
      as="span"
      width="var(--space-3)"
      height="var(--space-3)"
      style={{
        borderRadius: '9999px',
        background: getSwatchVar(value),
      }}
    />
  );
}

function Group({ width, items, style }: { width?: string | number; items: Item[]; style?: React.CSSProperties }) {
  return (
    <Root width={width} style={style}>
      <Flex direction="column" gap="1">
        {items.map((item) => (
          <Field key={item.id}>
            <PropertyLabel htmlFor={item.id}>{item.label}</PropertyLabel>
            <Control>
              {item.type === 'select' ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button size="1" variant="soft" highContrast>
                      {item.appearance === 'swatch' && <Swatch value={item.value} />}
                      <span style={{ textTransform: 'capitalize' }}>{item.options.find((o) => o.value === item.value)?.label || item.placeholder || 'Select'}</span>
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content variant="soft" highContrast>
                    <DropdownMenu.RadioGroup value={item.value} onValueChange={item.onChange}>
                      {item.options.map((opt) => (
                        <DropdownMenu.RadioItem key={opt.value} value={opt.value}>
                          {item.appearance === 'swatch' ? (
                            <Flex align="center" gap="2">
                              <Swatch value={opt.value} />
                              <Text size="1" style={{ textTransform: 'capitalize' }}>
                                {opt.label}
                              </Text>
                            </Flex>
                          ) : (
                            <Text size="1" style={{ textTransform: 'capitalize' }}>
                              {opt.label}
                            </Text>
                          )}
                        </DropdownMenu.RadioItem>
                      ))}
                    </DropdownMenu.RadioGroup>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              ) : (
                <Switch size="1" highContrast id={item.id} checked={item.value} onCheckedChange={item.onChange} />
              )}
            </Control>
          </Field>
        ))}
      </Flex>
    </Root>
  );
}

export type { Item as PropertyControlItem, SelectItem as PropertyControlSelectItem, SwitchItem as PropertyControlSwitchItem, SelectOption as PropertyControlSelectOption };

export const PropertyControl = {
  Root,
  Field,
  Label: PropertyLabel,
  Control,
  Group,
};
