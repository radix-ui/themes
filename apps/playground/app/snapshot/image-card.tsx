'use client';

import * as React from 'react';
import { Tooltip, IconButton, Popover, Text, Button } from '@radix-ui/themes';
import { HeartFilledIcon, PlusIcon, DownloadIcon } from '@radix-ui/react-icons';
import styles from './page.module.css';

function ImageCard({ id }: any) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={styles.imageCard}>
      <img
        src={`https://images.unsplash.com/photo-${id}?w=400&h=400&dpr=2&auto=format&fit=crop&w=2574&q=70`}
        style={{
          display: 'block',
          width: '100%',
          objectFit: 'cover',
          height: 400,
        }}
      />
      <div className={styles.imageCardOverlay} data-visible={open ? '' : undefined}>
        <div style={{ position: 'absolute', top: 'var(--space-3)', right: 'var(--space-3)' }}>
          <Tooltip content="Add to favorites">
            <IconButton
              size="3"
              variant="solid"
              highContrast
              radius="full"
              style={{ marginRight: 'var(--space-3)' }}
            >
              <HeartFilledIcon />
            </IconButton>
          </Tooltip>
          <Tooltip content="Add to library">
            <IconButton size="3" variant="solid" highContrast radius="full">
              <PlusIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Tooltip content="Download">
            <Popover.Trigger>
              <IconButton
                size="3"
                variant="solid"
                highContrast
                radius="full"
                style={{ position: 'absolute', bottom: 'var(--space-3)', right: 'var(--space-3)' }}
              >
                <DownloadIcon />
              </IconButton>
            </Popover.Trigger>
          </Tooltip>
          <Popover.Content align="center" className={styles.downloadPopover}>
            <div style={{ boxSizing: 'border-box', width: 200, padding: 'var(--space-4)' }}>
              <Text as="p" size="3" style={{ marginBottom: 'var(--space-2)' }}>
                Choose a size:
              </Text>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-1)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {['Small', 'Medium', 'Large'].map((size) => (
                  <label
                    key={size}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      defaultChecked
                      style={{ marginTop: -1 }}
                    />
                    <Text size="2">{size}</Text>
                  </label>
                ))}
              </div>

              <Popover.Close>
                <Button variant="solid" size="2">
                  Download <DownloadIcon />
                </Button>
              </Popover.Close>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
}

export { ImageCard };
