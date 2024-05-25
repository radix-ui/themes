import { version } from 'react';

export function isBeforeReact19() {
  return parseInt(version.split('.')[0], 10) < 19;
}
