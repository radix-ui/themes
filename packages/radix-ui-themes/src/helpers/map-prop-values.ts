import { baseButtonPropDefs } from '../components/base-button.props.js';
import { calloutRootPropDefs } from '../components/callout.props.js';
import { spinnerPropDefs } from '../components/spinner.props.js';
import { textPropDefs } from '../components/text.props.js';

import type { Responsive } from '../props/index.js';

function mapResponsiveProp<Input extends string, Output>(
  propValue: Responsive<Input> | undefined,
  mapValue: (value: Input) => Output
): Responsive<Output> | undefined {
  if (propValue === undefined) return undefined;
  if (typeof propValue === 'string') {
    return mapValue(propValue);
  }
  return Object.fromEntries(
    Object.entries(propValue).map(([key, value]) => [key, mapValue(value)])
  );
}

function mapCalloutSizeToTextSize(
  size: (typeof calloutRootPropDefs.size.values)[number]
): (typeof textPropDefs.size.values)[number] {
  return size === '3' ? '3' : '2';
}

function mapButtonSizeToSpinnerSize(
  size: (typeof baseButtonPropDefs.size.values)[number]
): (typeof spinnerPropDefs.size.values)[number] {
  switch (size) {
    case '1':
      return '1';
    case '2':
    case '3':
      return '2';
    case '4':
      return '3';
  }
}

export { mapResponsiveProp, mapCalloutSizeToTextSize, mapButtonSizeToSpinnerSize };
