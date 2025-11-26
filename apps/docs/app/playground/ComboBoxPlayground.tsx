'use client';

import React from 'react';
import { Combobox } from '@kushagradhawan/kookie-ui';
import Playground from '../components/playground';

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
      { value: 'france', label: 'France' },
      { value: 'germany', label: 'Germany' },
      { value: 'italy', label: 'Italy' },
      { value: 'spain', label: 'Spain' },
      { value: 'uk', label: 'United Kingdom' },
    ],
  },
  {
    continent: 'North America',
    countries: [
      { value: 'usa', label: 'United States' },
      { value: 'canada', label: 'Canada' },
      { value: 'mexico', label: 'Mexico' },
    ],
  },
  {
    continent: 'Asia',
    countries: [
      { value: 'japan', label: 'Japan' },
      { value: 'china', label: 'China' },
      { value: 'india', label: 'India' },
      { value: 'south-korea', label: 'South Korea' },
    ],
  },
  {
    continent: 'South America',
    countries: [
      { value: 'brazil', label: 'Brazil' },
      { value: 'argentina', label: 'Argentina' },
      { value: 'chile', label: 'Chile' },
    ],
  },
];

export default function ComboBoxPlayground() {
  const [size, setSize] = React.useState<(typeof sizes)[number]>('2');
  const [variant, setVariant] = React.useState<(typeof variants)[number]>('surface');
  const [contentVariant, setContentVariant] = React.useState<(typeof contentVariants)[number]>('solid');
  const [inputVariant, setInputVariant] = React.useState<(typeof inputVariants)[number]>('surface');
  const [color, setColor] = React.useState<(typeof accentColors)[number]>('theme');
  const [disabled, setDisabled] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);
  const [triggerWidth, setTriggerWidth] = React.useState<(typeof triggerWidths)[number]>('240px');
  const [loop, setLoop] = React.useState(true);
  const [value, setValue] = React.useState<string | null>('france');
  const resolvedContentWidth = triggerWidth === 'fit-content' ? '240px' : triggerWidth;

  const generateCode = () => {
    const triggerProps = [`size="${size}"`, `variant="${variant}"`];
    if (color !== 'theme') triggerProps.push(`color="${color}"`);
    if (highContrast) triggerProps.push('highContrast');
    if (triggerWidth !== 'fit-content') triggerProps.push(`width="${triggerWidth}"`);
    if (disabled) triggerProps.push('disabled');

    const listMarkup = countriesByContinent
      .map(
        (group) => `        <Combobox.Group>
          <Combobox.Label>${group.continent}</Combobox.Label>
${group.countries.map((country) => `          <Combobox.Item value="${country.value}">${country.label}</Combobox.Item>`).join('\n')}
        </Combobox.Group>`,
      )
      .join('\n');

    return `const countriesByContinent = [
  {
    continent: 'Europe',
    countries: [
      { value: 'france', label: 'France' },
      { value: 'germany', label: 'Germany' },
      { value: 'italy', label: 'Italy' },
      { value: 'spain', label: 'Spain' },
      { value: 'uk', label: 'United Kingdom' },
    ],
  },
  {
    continent: 'North America',
    countries: [
      { value: 'usa', label: 'United States' },
      { value: 'canada', label: 'Canada' },
      { value: 'mexico', label: 'Mexico' },
    ],
  },
  {
    continent: 'Asia',
    countries: [
      { value: 'japan', label: 'Japan' },
      { value: 'china', label: 'China' },
      { value: 'india', label: 'India' },
      { value: 'south-korea', label: 'South Korea' },
    ],
  },
  {
    continent: 'South America',
    countries: [
      { value: 'brazil', label: 'Brazil' },
      { value: 'argentina', label: 'Argentina' },
      { value: 'chile', label: 'Chile' },
    ],
  },
];

const [value, setValue] = React.useState<string | null>(${value ? `'${value}'` : 'null'});

return (
  <Combobox.Root size="${size}" value={value} onValueChange={setValue} loop={${loop}}${disabled ? ' disabled' : ''}>
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
);`;
  };

  const component = (
    <Combobox.Root size={size} value={value} onValueChange={setValue} loop={loop} disabled={disabled}>
      <Combobox.Trigger
        variant={variant}
        color={color === 'theme' ? undefined : (color as any)}
        disabled={disabled}
        highContrast={highContrast}
        width={triggerWidth === 'fit-content' ? undefined : triggerWidth}
      >
        <Combobox.Value placeholder="Select a country" />
      </Combobox.Trigger>
      <Combobox.Content width={resolvedContentWidth} variant={contentVariant}>
        <Combobox.Input variant={inputVariant} placeholder="Search countries..." />
        <Combobox.List>
          {countriesByContinent.map((group) => (
            <Combobox.Group key={group.continent}>
              <Combobox.Label>{group.continent}</Combobox.Label>
              {group.countries.map((country) => (
                <Combobox.Item key={country.value} value={country.value}>
                  {country.label}
                </Combobox.Item>
              ))}
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
