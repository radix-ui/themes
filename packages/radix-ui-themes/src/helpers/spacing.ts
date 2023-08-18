import { useThemeContext } from '../theme';
import { themePropDefs } from '../theme-options';

function withSpacing(spacingFactor: number, scalingFactor: number, spacing: number) {
  return `${spacingFactor * scalingFactor * (spacing ?? 0)}px`;
}

function useSpacing() {
  const { spacing: spacingFactor, scaling } = useThemeContext();
  let scalingFactor = 1;
  if (themePropDefs.scaling.values.includes(scaling)) {
    scalingFactor = Number.parseFloat(scaling) / 100;
  }

  const wrappedWithSpacing = (spacing: number) => withSpacing(spacingFactor, scalingFactor, spacing);

  return { spacingFactor, withSpacing: wrappedWithSpacing };
}

export { useSpacing, withSpacing };
