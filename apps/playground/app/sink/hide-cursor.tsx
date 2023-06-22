'use client';

import * as React from 'react';
import { useIdle } from 'react-use';

function hideCursor() {
  document.body.classList.add('hide-cursor');
}
function showCursor() {
  document.body.classList.remove('hide-cursor');
}

export function HideCursor() {
  const isIdle = useIdle(1000);

  React.useEffect(() => {
    if (isIdle) {
      hideCursor();
    } else {
      showCursor();
    }
  }, [isIdle]);

  return null;
}
