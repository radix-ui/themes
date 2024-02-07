'use client';

import * as React from 'react';
import { ArrowRightIcon, StarIcon } from '@radix-ui/react-icons';
import { Button, Em, Flex, IconButton, Spinner, Text } from '@radix-ui/themes';
import { buttonPropDefs } from '@radix-ui/themes/props';
import { mapButtonSizeToSpinnerSize, mapResponsiveProp } from '@radix-ui/themes/helpers';

export function LoadingButtons() {
  const [loading1, onClick1] = useLoading();
  const [loading2, onClick2] = useLoading();
  const [loading3, onClick3] = useLoading();
  const [loading4, onClick4] = useLoading();

  return (
    <Flex direction="column" gap="5">
      {buttonPropDefs.size.values.map((size) => (
        <Flex key={size} gap="5">
          <Flex direction="column" align="center" gap="5">
            {([undefined, 'ghost'] as const).map((variant, i) => (
              <IconButton
                key={i}
                loading={loading1}
                onClick={onClick1}
                size={size}
                variant={variant}
              >
                <StarIcon
                  width={mapButtonSizeToIconSize(size)}
                  height={mapButtonSizeToIconSize(size)}
                />
              </IconButton>
            ))}
          </Flex>

          <Flex direction="column" align="center" gap="5">
            {([undefined, 'ghost'] as const).map((variant, i) => (
              <Button key={i} loading={loading2} onClick={onClick2} size={size} variant={variant}>
                Continue
              </Button>
            ))}
          </Flex>

          <Flex direction="column" align="center" gap="5">
            {([undefined, 'ghost'] as const).map((variant, i) => (
              <Button key={i} loading={loading3} onClick={onClick3} size={size} variant={variant}>
                Continue
                <ArrowRightIcon
                  width={mapButtonSizeToIconSize(size)}
                  height={mapButtonSizeToIconSize(size)}
                />
              </Button>
            ))}
          </Flex>

          <Flex direction="column" align="center" gap="5">
            {([undefined, 'ghost'] as const).map((variant, i) => (
              <Button key={i} disabled={loading4} onClick={onClick4} size={size} variant={variant}>
                Continue
                <Spinner
                  loading={loading4}
                  size={mapResponsiveProp(size, mapButtonSizeToSpinnerSize)}
                >
                  <ArrowRightIcon
                    width={mapButtonSizeToIconSize(size)}
                    height={mapButtonSizeToIconSize(size)}
                  />
                </Spinner>
              </Button>
            ))}
          </Flex>
        </Flex>
      ))}

      <Text as="p">
        Lorem ipsum, dolor sit amet{' '}
        <span style={{ display: 'inline-block' }}>
          <Spinner>
            <Em>consectetur</Em>
          </Spinner>
        </span>{' '}
        adipisicing elit. Eum veritatis, cupiditate inventore recusandae sapiente corporis non
        similique facere esse praesentium? Dolorum pariatur omnis doloremque unde nam rem ipsa velit
        vitae.
      </Text>
    </Flex>
  );
}

function mapButtonSizeToIconSize(size: (typeof buttonPropDefs.size.values)[number]) {
  switch (size) {
    case '1':
    case '2':
      return '16';
    case '3':
      return '18';
    case '4':
      return '20';
  }
}

function useLoading() {
  const [loading, setLoading] = React.useState(false);
  const handleClick = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return [loading, handleClick] as const;
}
