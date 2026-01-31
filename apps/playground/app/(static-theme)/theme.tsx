'use client';

import { Theme as RadixTheme, ThemeProps } from '@radix-ui/themes';
import { accentColors, appearances, radii, scalings } from '@radix-ui/themes/props';
import { useSearchParams } from 'next/navigation';

export function Theme(props: ThemeProps) {
  const searchParams = useSearchParams();
  const appearance = searchParams.get('appearance') ?? 'dark';
  const accentColor = searchParams.get('accentColor') ?? 'violet';
  const radius = searchParams.get('radius') ?? 'large';
  const scaling = searchParams.get('scaling') ?? '110%';
  return (
    <RadixTheme
      appearance={isAppearance(appearance) ? appearance : 'dark'}
      accentColor={isAccentColor(accentColor) ? accentColor : undefined}
      radius={isRadius(radius) ? radius : undefined}
      scaling={isScaling(scaling) ? scaling : undefined}
      {...props}
    />
  );
}

function isAppearance(value: unknown): value is (typeof appearances)[number] {
  return typeof value === 'string' && appearances.includes(value as (typeof appearances)[number]);
}

function isAccentColor(value: unknown): value is (typeof accentColors)[number] {
  return typeof value === 'string' && accentColors.includes(value as (typeof accentColors)[number]);
}

function isRadius(value: unknown): value is (typeof radii)[number] {
  return typeof value === 'string' && radii.includes(value as (typeof radii)[number]);
}

function isScaling(value: unknown): value is (typeof scalings)[number] {
  return typeof value === 'string' && scalings.includes(value as (typeof scalings)[number]);
}
