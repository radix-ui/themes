'use client';

import * as React from 'react';
import { Theme as RadixTheme, ThemeProps } from '@radix-ui/themes';
import { accentColors, appearances, radii, scalings } from '@radix-ui/themes/props';
import { useSearchParams } from 'next/navigation';

function ThemeImpl({
  appearance,
  accentColor,
  radius,
  scaling,
  ...props
}: ThemeProps & {
  appearance: (typeof appearances)[number] | undefined;
  accentColor: (typeof accentColors)[number] | undefined;
  radius: (typeof radii)[number] | undefined;
  scaling: (typeof scalings)[number] | undefined;
}) {
  return (
    <RadixTheme
      appearance={appearance}
      accentColor={accentColor}
      radius={radius}
      scaling={scaling}
      {...props}
    />
  );
}

function Themeable(props: ThemeProps) {
  const searchParams = useSearchParams();
  const appearance = searchParams.get('appearance');
  const accentColor = searchParams.get('accentColor') ?? 'violet';
  const radius = searchParams.get('radius');
  const scaling = searchParams.get('scaling');
  return (
    <ThemeImpl
      appearance={isAppearance(appearance) ? appearance : 'dark'}
      accentColor={isAccentColor(accentColor) ? accentColor : 'violet'}
      radius={isRadius(radius) ? radius : undefined}
      scaling={isScaling(scaling) ? scaling : undefined}
      {...props}
    />
  );
}

export function Theme(props: ThemeProps) {
  return (
    <React.Suspense
      fallback={
        <ThemeImpl appearance="dark" accentColor="violet" radius={undefined} scaling={undefined} />
      }
    >
      <Themeable {...props} />
    </React.Suspense>
  );
}

function isAppearance(value: unknown): value is (typeof appearances)[number] {
  return isString(value) && appearances.includes(value as (typeof appearances)[number]);
}

function isAccentColor(value: unknown): value is (typeof accentColors)[number] {
  return isString(value) && accentColors.includes(value as (typeof accentColors)[number]);
}

function isRadius(value: unknown): value is (typeof radii)[number] {
  return isString(value) && radii.includes(value as (typeof radii)[number]);
}

function isScaling(value: unknown): value is (typeof scalings)[number] {
  return isString(value) && scalings.includes(value as (typeof scalings)[number]);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}
