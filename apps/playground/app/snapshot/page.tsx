import * as React from 'react';
import { HamburgerMenuIcon, UploadIcon } from '@radix-ui/react-icons';
import {
  Theme,
  Button,
  Text,
  Heading,
  Link,
  Separator,
  IconButton,
  DropdownMenu,
  Dialog,
  //
  ThemePanel,
} from '@radix-ui/themes';
import { ImageCard } from './image-card';
import { SnapshotLogo } from '../../components/snapshot-logo';
import styles from './page.module.css';

export default function Snapshot() {
  return (
    <html lang="en">
      <body>
        <Theme asChild appearance="dark" accentColor="grass" radius="small" scaling="110%">
          <div id="root">
            <ThemePanel />

            <div className={styles.root}>
              <header>
                <div
                  className={styles.container}
                  style={{
                    display: 'flex',
                    gap: 'var(--space-5)',
                    alignItems: 'center',
                    paddingTop: 'var(--space-3)',
                    paddingBottom: 'var(--space-3)',
                  }}
                >
                  <SnapshotLogo width="140" height="48" style={{ marginLeft: -13 }} />
                  <input
                    className={styles.search}
                    type="search"
                    placeholder="Search high-resolution images"
                  />
                  <Link href="#" size="2" color="gray" weight="bold">
                    Explore
                  </Link>
                  <Link href="#" size="2" color="gray" weight="bold">
                    Favorites
                  </Link>
                  <Link href="#" size="2" color="gray" weight="bold">
                    Library
                  </Link>
                  <Separator orientation="vertical" size="2" />
                  <Link href="#" size="2" color="gray" weight="bold">
                    Login
                  </Link>
                  <SubmitPhotoDialog>
                    <Button variant="soft" color="gray">
                      Submit a photo
                    </Button>
                  </SubmitPhotoDialog>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <IconButton
                        variant="ghost"
                        style={{ marginRight: 'calc(var(--space-1)*-1)' }}
                      >
                        <HamburgerMenuIcon />
                      </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content variant="soft" align="end">
                      <DropdownMenu.Label>Account</DropdownMenu.Label>
                      <DropdownMenu.Item shortcut="⌘+P">Profile</DropdownMenu.Item>
                      <DropdownMenu.Item shortcut="⌘+L">Library</DropdownMenu.Item>
                      <DropdownMenu.Item>Settings</DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Label>Snapshot</DropdownMenu.Label>
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Company</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                          <DropdownMenu.Item>About</DropdownMenu.Item>
                          <DropdownMenu.Item>History</DropdownMenu.Item>
                          <DropdownMenu.Item>Join the team</DropdownMenu.Item>
                          <DropdownMenu.Item>Blog</DropdownMenu.Item>
                          <DropdownMenu.Item>Press</DropdownMenu.Item>
                          <DropdownMenu.Item>Contact us</DropdownMenu.Item>
                          <DropdownMenu.Item>Help center</DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Community</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                          <DropdownMenu.Item>Become a contributor</DropdownMenu.Item>
                          <DropdownMenu.Item>Topics</DropdownMenu.Item>
                          <DropdownMenu.Item>Collections</DropdownMenu.Item>
                          <DropdownMenu.Item>Trends</DropdownMenu.Item>
                          <DropdownMenu.Item>Press</DropdownMenu.Item>
                          <DropdownMenu.Item>Awards</DropdownMenu.Item>
                          <DropdownMenu.Item>Stats</DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item>Logout</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </div>
                <div
                  className={styles.container}
                  style={{ paddingTop: 'var(--space-3)', paddingBottom: 'var(--space-3)' }}
                >
                  <nav style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center' }}>
                    <Link href="#" size="2" color="gray" weight="bold">
                      Editorial
                    </Link>
                    <Separator orientation="vertical" size="2" />
                    <Link href="#" size="2" highContrast weight="bold">
                      Green Life
                    </Link>
                    <Link href="#" size="2" color="gray" weight="bold">
                      Nature
                    </Link>
                    <Link href="#" size="2" color="gray" weight="bold">
                      Food & Drink
                    </Link>
                    <Link href="#" size="2" color="gray" weight="bold">
                      Portraits
                    </Link>
                    <Link href="#" size="2" color="gray" weight="bold">
                      Travel
                    </Link>
                    <Link href="#" size="2" color="gray" weight="bold">
                      Architecture & Interiors
                    </Link>
                    <Link href="#" size="2" color="gray" weight="bold">
                      Water
                    </Link>
                    <Link href="#" size="2" color="gray" weight="bold">
                      Summer
                    </Link>
                    <Link href="#" size="2" color="gray" weight="bold">
                      Animals
                    </Link>
                    <Link href="#" size="2" color="gray" weight="bold">
                      Fashion
                    </Link>
                  </nav>
                </div>
              </header>
              <div style={{ position: 'relative' }}>
                <img
                  style={{ display: 'block', width: '100%' }}
                  role="presentation"
                  src="https://images.unsplash.com/photo-1675371788315-60fa0ef48267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=2&auto=format%2Ccompress&fit=crop&w=1599&h=594"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    color: 'var(--white-a12)',
                    padding: 'var(--space-8) var(--space-5)',
                    backgroundImage: 'linear-gradient(135deg, var(--black-a11), transparent)',
                  }}
                >
                  <div style={{ maxWidth: '35%' }}>
                    <Heading size="9">Green Life</Heading>
                    <Text
                      as="p"
                      style={{ marginBottom: 'var(--space-5)', color: 'var(--white-a11)' }}
                    >
                      Curated by WorkOS
                    </Text>

                    <Text as="p" weight="bold" style={{ marginBottom: 'var(--space-2)' }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita sed, sit
                      recusandae rem debitis maxime id cumque commodi iste alias optio ad beatae
                      veniam fugiat dolorem itaque aliquid! Nisi, exercitationem!
                    </Text>

                    <Text
                      as="p"
                      size="2"
                      style={{ marginBottom: 'var(--space-6)', color: 'var(--white-a11)' }}
                    >
                      Sponsored by Radix UI
                    </Text>

                    <SubmitPhotoDialog>
                      <Button variant="solid" size="3">
                        Submit a photo
                      </Button>
                    </SubmitPhotoDialog>
                  </div>
                </div>
              </div>
              <div className={`${styles.container} ${styles.grid}`}>
                {['1601815560619-c5aeb2cb9297', '1683223336014-06e82d91c95e'].map((id) => (
                  <ImageCard key={id} id={id} />
                ))}
                <div style={{ border: '1px solid var(--gray-7)', padding: 'var(--space-5)' }}>
                  <Text as="p" size="4" weight="bold" style={{ marginBottom: 'var(--space-5)' }}>
                    Contributors
                  </Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {[
                      'Vlad Moroz',
                      'Benoît Grélard',
                      'Caitlyn Thomson',
                      'Andy Hook',
                      'Vitor Capretz',
                    ].map((name) => (
                      <div key={name}>
                        <Text as="p" size="2" weight="bold">
                          {name}
                        </Text>
                        <Text as="p" color="gray" size="1">
                          {name.toLocaleLowerCase().replace(' ', '_')}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
                {[
                  '1683490484039-c9839f9b2382',
                  '1683408581419-33e8f174ab10',
                  '1683035094630-146fdff5b960',
                  '1683402971094-879a7d879171',
                  '1588661565258-8ecc570d1403',
                  '1683402969702-4c7558fd41e3',
                ].map((id) => (
                  <ImageCard key={id} id={id} />
                ))}
              </div>
            </div>
          </div>
        </Theme>
      </body>
    </html>
  );
}

function SubmitPhotoDialog({ children }: any) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Dialog.Title>Submit a photo</Dialog.Title>
          <Dialog.Description size="2">
            Drop a photo here or click to browse your files.
          </Dialog.Description>

          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              border: '2px dashed var(--accent-6)',
              backgroundColor: 'var(--gray-a1)',
              height: 100,
              color: 'var(--gray-6)',
            }}
          >
            <UploadIcon width="50" height="50" />
          </div>

          <div
            style={{
              display: 'flex',
              alignSelf: 'end',
              gap: 'var(--space-3)',
              marginTop: 'var(--space-4)',
            }}
          >
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button variant="solid">
                Submit photo <UploadIcon />
              </Button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
