import * as React from 'react';

// In React 19+, boolean attributes like inert are preserved; in earlier versions we omit it.
// Use: {...(hidden ? { inert } : {})}
export const inert: boolean | undefined = parseFloat(React.version) >= 19 ? true : undefined;
