'use client';

import React from 'react';
import { Combobox, Flex } from '@kushagradhawan/kookie-ui';
import { MapPin, Landmark, Mountain, Palmtree, Building2, Coffee, Cherry, Soup, Pizza, Beer, Flag, Trees, Pyramid, TreePalm, Ship, TentTree } from 'lucide-react';
import Playground from '@/components/playground';

const variants = ['classic', 'surface', 'soft', 'outline', 'ghost'] as const;
const contentVariants = ['solid', 'soft'] as const;
const inputVariants = ['classic', 'surface', 'soft', 'outline', 'ghost'] as const;
const sizes = ['1', '2', '3'] as const;
const triggerWidths = ['fit-content', '200px', '240px', '320px', '100%'] as const;
const accentColors = ['theme', 'gray', 'iris', 'crimson', 'jade', 'gold'] as const;

const countriesByContinent = [
  {
    continent: 'Europe',
    countries: [
      { value: 'france', label: 'France', icon: Coffee },
      { value: 'germany', label: 'Germany', icon: Beer },
      { value: 'italy', label: 'Italy', icon: Pizza },
      { value: 'spain', label: 'Spain', icon: Palmtree },
      { value: 'uk', label: 'United Kingdom', icon: Landmark },
    ],
  },
  {
    continent: 'North America',
    countries: [
      { value: 'usa', label: 'United States', icon: Flag },
      { value: 'canada', label: 'Canada', icon: Trees },
      { value: 'mexico', label: 'Mexico', icon: Pyramid },
    ],
  },
  {
    continent: 'Asia',
    countries: [
      { value: 'japan', label: 'Japan', icon: Cherry },
      { value: 'china', label: 'China', icon: Building2 },
      { value: 'india', label: 'India', icon: Soup },
      { value: 'south-korea', label: 'South Korea', icon: Mountain },
    ],
  },
  {
    continent: 'South America',
    countries: [
      { value: 'brazil', label: 'Brazil', icon: TreePalm },
      { value: 'argentina', label: 'Argentina', icon: Ship },
      { value: 'chile', label: 'Chile', icon: TentTree },
    ],
  },
];

// Flatten countries for quick lookup (used by displayValue function)
const allCountries = countriesByContinent.flatMap((g) => g.countries);

/**
 * Display value resolver function - recommended for performance.
 * This avoids needing forceMount on Content since we can resolve labels from data.
 */
const getCountryLabel = (value: string | null) => allCountries.find((c) => c.value === value)?.label;

export default function ComboBoxPlayground() {
  const [size, setSize] = React.useState<(typeof sizes)[number]>('2');
  const [variant, setVariant] = React.useState<(typeof variants)[number]>('soft');
  const [contentVariant, setContentVariant] = React.useState<(typeof contentVariants)[number]>('soft');
  const [inputVariant, setInputVariant] = React.useState<(typeof inputVariants)[number]>('soft');
  const [color, setColor] = React.useState<(typeof accentColors)[number]>('theme');
  const [disabled, setDisabled] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(true);
  const [triggerWidth, setTriggerWidth] = React.useState<(typeof triggerWidths)[number]>('240px');
  const [loop, setLoop] = React.useState(true);
  const [value, setValue] = React.useState<string | null>('france');
  const resolvedContentWidth = triggerWidth === 'fit-content' ? '240px' : triggerWidth;

  const generateCode = () => {
    const rootProps = [`size="${size}"`];
    if (highContrast) rootProps.push('highContrast');
    if (disabled) rootProps.push('disabled');

    const triggerProps = [`variant="${variant}"`];
    if (color !== 'theme') triggerProps.push(`color="${color}"`);
    if (triggerWidth !== 'fit-content') triggerProps.push(`width="${triggerWidth}"`);

    const listMarkup = countriesByContinent
      .map(
        (group) => `        <Combobox.Group>
          <Combobox.Label>${group.continent}</Combobox.Label>
${group.countries
  .map(
    (country) => `          <Combobox.Item value="${country.value}">
            <Flex gap="2" align="center">
              <${country.icon.name} size={16} />
              ${country.label}
            </Flex>
          </Combobox.Item>`,
  )
  .join('\n')}
        </Combobox.Group>`,
      )
      .join('\n');

    // Get all unique icons
    const allIcons = countriesByContinent.flatMap((g) => g.countries.map((c) => c.icon.name));
    const uniqueIcons = [...new Set(allIcons)];

    return `import { Combobox, Flex } from '@kushagradhawan/kookie-ui';
import { ${uniqueIcons.join(', ')} } from 'lucide-react';

const countriesByContinent = [
  {
    continent: 'Europe',
    countries: [
      { value: 'france', label: 'France', icon: Coffee },
      { value: 'germany', label: 'Germany', icon: Beer },
      { value: 'italy', label: 'Italy', icon: Pizza },
      { value: 'spain', label: 'Spain', icon: Palmtree },
      { value: 'uk', label: 'United Kingdom', icon: Landmark },
    ],
  },
  {
    continent: 'North America',
    countries: [
      { value: 'usa', label: 'United States', icon: Flag },
      { value: 'canada', label: 'Canada', icon: Trees },
      { value: 'mexico', label: 'Mexico', icon: Pyramid },
    ],
  },
  {
    continent: 'Asia',
    countries: [
      { value: 'japan', label: 'Japan', icon: Cherry },
      { value: 'china', label: 'China', icon: Building2 },
      { value: 'india', label: 'India', icon: Soup },
      { value: 'south-korea', label: 'South Korea', icon: Mountain },
    ],
  },
  {
    continent: 'South America',
    countries: [
      { value: 'brazil', label: 'Brazil', icon: TreePalm },
      { value: 'argentina', label: 'Argentina', icon: Ship },
      { value: 'chile', label: 'Chile', icon: TentTree },
    ],
  },
];

// Flatten for quick lookup - displayValue function resolves labels from data
const allCountries = countriesByContinent.flatMap((g) => g.countries);
const getCountryLabel = (value: string | null) => 
  allCountries.find((c) => c.value === value)?.label;

const [value, setValue] = React.useState<string | null>(${value ? `'${value}'` : 'null'});

return (
  <Combobox.Root 
    ${rootProps.join(' ')} 
    value={value} 
    onValueChange={setValue} 
    loop={${loop}}
    displayValue={getCountryLabel}
  >
    <Combobox.Trigger ${triggerProps.join(' ')}>
      <Combobox.Value placeholder="Select a country" />
    </Combobox.Trigger>
    <Combobox.Content width="${resolvedContentWidth}" variant="${contentVariant}">
      <Combobox.Input${inputVariant !== 'surface' ? ` variant="${inputVariant}"` : ''} placeholder="Search countries..." />
      <Combobox.List>
${listMarkup}
        <Combobox.Empty>No results found</Combobox.Empty>
      </Combobox.List>
    </Combobox.Content>
  </Combobox.Root>
);

// Performance tip: Using displayValue with a lookup function is more performant
// than forceMount, as items only mount when the dropdown opens.
// The displayValue function receives the current value and returns the label.`;
  };

  const component = (
    <Combobox.Root size={size} value={value} onValueChange={setValue} loop={loop} disabled={disabled} highContrast={highContrast} displayValue={getCountryLabel}>
      <Combobox.Trigger variant={variant} color={color === 'theme' ? undefined : (color as any)} width={triggerWidth === 'fit-content' ? undefined : triggerWidth}>
        <Combobox.Value placeholder="Select a country" />
      </Combobox.Trigger>
      <Combobox.Content width={resolvedContentWidth} variant={contentVariant}>
        <Combobox.Input variant={inputVariant} placeholder="Search countries..." />
        <Combobox.List>
          {countriesByContinent.map((group) => (
            <Combobox.Group key={group.continent}>
              <Combobox.Label>{group.continent}</Combobox.Label>
              {group.countries.map((country) => {
                const Icon = country.icon;
                return (
                  <Combobox.Item key={country.value} value={country.value}>
                    <Flex gap="2" align="center">
                      <Icon size={16} />
                      {country.label}
                    </Flex>
                  </Combobox.Item>
                );
              })}
            </Combobox.Group>
          ))}
          <Combobox.Empty>No matches found</Combobox.Empty>
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );

  const items = [
    {
      id: 'size',
      label: 'Size',
      type: 'select' as const,
      value: size,
      onChange: (next: string) => setSize(next as (typeof sizes)[number]),
      options: sizes.map((option) => ({ label: option, value: option })),
      placeholder: 'Select size',
    },
    {
      id: 'variant',
      label: 'Trigger Variant',
      type: 'select' as const,
      value: variant,
      onChange: (next: string) => setVariant(next as (typeof variants)[number]),
      options: variants.map((option) => ({ label: option, value: option })),
      placeholder: 'Select variant',
    },
    {
      id: 'contentVariant',
      label: 'Content Variant',
      type: 'select' as const,
      value: contentVariant,
      onChange: (next: string) => setContentVariant(next as (typeof contentVariants)[number]),
      options: contentVariants.map((option) => ({ label: option, value: option })),
      placeholder: 'Select variant',
    },
    {
      id: 'inputVariant',
      label: 'Input Variant',
      type: 'select' as const,
      value: inputVariant,
      onChange: (next: string) => setInputVariant(next as (typeof inputVariants)[number]),
      options: inputVariants.map((option) => ({ label: option, value: option })),
      placeholder: 'Search field variant',
    },
    {
      id: 'color',
      label: 'Accent',
      type: 'select' as const,
      value: color,
      onChange: (next: string) => setColor(next as (typeof accentColors)[number]),
      options: accentColors.map((option) => ({ label: option, value: option })),
      placeholder: 'Theme',
      appearance: 'swatch' as const,
    },
    {
      id: 'width',
      label: 'Trigger Width',
      type: 'select' as const,
      value: triggerWidth,
      onChange: (next: string) => setTriggerWidth(next as (typeof triggerWidths)[number]),
      options: triggerWidths.map((option) => ({ label: option, value: option })),
      placeholder: 'Width',
    },
    {
      id: 'loop',
      label: 'Loop focus',
      type: 'switch' as const,
      value: loop,
      onChange: setLoop,
    },
    {
      id: 'disabled',
      label: 'Disabled',
      type: 'switch' as const,
      value: disabled,
      onChange: setDisabled,
    },
    {
      id: 'highContrast',
      label: 'High Contrast',
      type: 'switch' as const,
      value: highContrast,
      onChange: setHighContrast,
    },
  ];

  return <Playground component={component} code={generateCode()} items={items} />;
}
