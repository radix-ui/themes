'use client';

import * as React from 'react';
import { ArrowRightIcon, StarIcon } from '@radix-ui/react-icons';
import { Button, Flex, IconButton, Spinner } from '@radix-ui/themes';

export function LoadingButtons() {
  const [loading1, onClick1] = useLoading();
  const [loading2, onClick2] = useLoading();
  const [loading3, onClick3] = useLoading();
  const [loading4, onClick4] = useLoading();

  return (
    <Flex gap="5">
      <Flex direction="column" align="center" gap="5">
        {([undefined, 'ghost'] as const).map((variant, i) => (
          <IconButton key={i} loading={loading1} onClick={onClick1} size="4" variant={variant}>
            <StarIcon width="20" height="20" />
          </IconButton>
        ))}
      </Flex>

      <Flex direction="column" align="center" gap="5">
        {([undefined, 'ghost'] as const).map((variant, i) => (
          <Button key={i} loading={loading2} onClick={onClick2} size="4" variant={variant}>
            Continue
          </Button>
        ))}
      </Flex>

      <Flex direction="column" align="center" gap="5">
        {([undefined, 'ghost'] as const).map((variant, i) => (
          <Button key={i} loading={loading3} onClick={onClick3} size="4" variant={variant}>
            Continue
            <ArrowRightIcon width="20" height="20" />
          </Button>
        ))}
      </Flex>

      <Flex direction="column" align="center" gap="5">
        {([undefined, 'ghost'] as const).map((variant, i) => (
          <Button key={i} disabled={loading4} onClick={onClick4} size="4" variant={variant}>
            Continue
            <Spinner loading={loading4} size="3">
              <ArrowRightIcon width="20" height="20" />
            </Spinner>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}

function useLoading() {
  const [loading, setLoading] = React.useState(false);
  const handleClick = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return [loading, handleClick] as const;
}
