'use client';

import * as React from 'react';
import {
  ChevronDownIcon,
  GridIcon,
  HamburgerMenuIcon,
  MinusIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import {
  Theme,
  Button,
  Text,
  IconButton,
  Link,
  DropdownMenu,
  Dialog,
  Popover,
  Separator,
  //
  ThemePanel,
} from '@radix-ui/themes';
import styles from './page.module.css';

export default function HomeOS() {
  const [adultCount, setAdultCount] = React.useState(1);
  const [childCount, setChildCount] = React.useState(0);
  const [infantCount, setInfantCount] = React.useState(0);

  const totalCount = adultCount + childCount + infantCount;

  return (
    <html lang="en">
      <body>
        <Theme asChild accentColor="orange" radius="large">
          <div id="root">
            <ThemePanel />

            <div className={styles.root}>
              <div
                style={{
                  width: 1250,
                  border: '1px solid var(--gray-8)',
                  borderRadius: 'var(--radius-4)',
                  backgroundColor: 'var(--gray-1)',
                  background: 'linear-gradient(150deg, transparent 60%, var(--gray-2) 100%)',
                }}
              >
                <header
                  style={{
                    padding: 'var(--space-4) var(--space-6)',
                    borderBottom: '1px solid var(--gray-8)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <svg
                      width="20"
                      height="22"
                      viewBox="0 0 20 22"
                      style={{ fill: 'var(--accent-9)' }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.38606 0.210648C9.74717 -0.0702159 10.2528 -0.0702159 10.6139 0.210648L19.6139 7.21065C19.8575 7.4001 20 7.69141 20 8V19C20 19.7957 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7957 22 17 22H3C2.20435 22 1.44129 21.6839 0.87868 21.1213C0.31607 20.5587 0 19.7957 0 19V8C0 7.69141 0.142473 7.4001 0.386059 7.21065L9.38606 0.210648ZM8 20H12V12H8V20ZM14 20V11C14 10.4477 13.5523 10 13 10H7C6.44772 10 6 10.4477 6 11V20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V8.48908L10 2.26686L18 8.48908V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H14Z"
                      />
                    </svg>
                    <Text weight="bold">HomeOS</Text>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                      <Button variant="ghost" color="gray">
                        Guest
                      </Button>
                      <Button variant="ghost" color="gray">
                        Host
                      </Button>
                      <Button variant="ghost" color="gray">
                        Travel
                      </Button>
                      <Button variant="ghost" color="gray">
                        Experience
                      </Button>
                    </div>

                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger>
                        <IconButton
                          variant="ghost"
                          color="gray"
                          style={{ marginRight: `calc(var(--space-2) * -1)` }}
                        >
                          <HamburgerMenuIcon />
                        </IconButton>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content align="end">
                        <DropdownMenu.Item>Sign up</DropdownMenu.Item>
                        <DropdownMenu.Item>Log in</DropdownMenu.Item>

                        <DropdownMenu.Separator />

                        <DropdownMenu.Item>Air Cover</DropdownMenu.Item>
                        <DropdownMenu.Item>Cancellations</DropdownMenu.Item>
                        <DropdownMenu.Sub>
                          <DropdownMenu.SubTrigger>Hosting</DropdownMenu.SubTrigger>

                          <DropdownMenu.SubContent>
                            <DropdownMenu.Item>Resources</DropdownMenu.Item>
                            <DropdownMenu.Item>Community forum</DropdownMenu.Item>
                            <DropdownMenu.Item>Hosting guide</DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item>Your home</DropdownMenu.Item>
                          </DropdownMenu.SubContent>
                        </DropdownMenu.Sub>

                        <DropdownMenu.Separator />

                        <DropdownMenu.Item>Help Centre</DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </div>
                </header>

                <main style={{ padding: 'var(--space-6)' }}>
                  <div style={{ marginBottom: 'var(--space-5)' }}>
                    <Text as="p" size="7" weight="bold">
                      Private Room in Elegant French Gothic Home
                    </Text>
                  </div>

                  <PhotoArea />

                  <div style={{ display: 'flex', gap: 100, marginTop: 'var(--space-6)' }}>
                    <div style={{ flexGrow: 1 }}>
                      <Text
                        as="p"
                        size="5"
                        weight="bold"
                        style={{ marginBottom: 'var(--space-4)' }}
                      >
                        Room in a apartment hosted by Valentina
                      </Text>

                      <div
                        style={{
                          display: 'grid',
                          gap: 'var(--space-4)',
                          gridTemplateColumns: '1fr 1fr 1fr',
                        }}
                      >
                        <Card>
                          <svg
                            viewBox="0 0 32 32"
                            style={{
                              height: 24,
                              width: 24,
                              fill: 'currentcolor',
                              display: 'block',
                              flexShrink: 0,
                            }}
                          >
                            <path d="M28 4a2 2 0 0 1 1.995 1.85L30 6v7.839l1.846 5.537a3 3 0 0 1 .115.468l.03.24.009.24V30h-2v-2H2v2H0v-9.675a3 3 0 0 1 .087-.717l.067-.232L2 13.836V6a2 2 0 0 1 1.697-1.977l.154-.018L4 4zm2 18H2v4h28zm-1.388-6H3.387l-1.333 4h27.891zM28 6H4v8h2v-4a2 2 0 0 1 1.85-1.995L8 8h16a2 2 0 0 1 1.995 1.85L26 10v4h2zm-13 4H8v4h7zm9 0h-7v4h7z"></path>
                          </svg>
                          <Text size="2" weight="bold">
                            1 bed
                          </Text>
                        </Card>
                        <Card>
                          <svg
                            viewBox="0 0 32 32"
                            style={{
                              height: 24,
                              width: 24,
                              fill: 'currentcolor',
                              display: 'block',
                              flexShrink: 0,
                            }}
                          >
                            <path d="M7 1a3 3 0 0 0-2.995 2.824L4 4v27h2V4a1 1 0 0 1 .883-.993L7 3h11a1 1 0 0 1 .993.883L19 4v1h-5a1 1 0 0 0-.993.883L13 6v3h-3v2h19V9h-2V6a1 1 0 0 0-.883-.993L26 5h-5V4a3 3 0 0 0-2.824-2.995L18 1H7zm13 28a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM15 7h10v2H15V7z"></path>
                          </svg>
                          <Text size="2" weight="bold">
                            Shared bathroom
                          </Text>
                        </Card>
                        <Card>
                          <svg
                            viewBox="0 0 32 32"
                            style={{
                              height: 24,
                              width: 24,
                              fill: 'currentcolor',
                              display: 'block',
                              flexShrink: 0,
                            }}
                          >
                            <path d="M31.707,15.293,29,12.58594,18.12109,1.707a3.07251,3.07251,0,0,0-4.24218,0L3,12.58594.293,15.293,1.707,16.707,3,15.41406V28a2.00229,2.00229,0,0,0,2,2H27a2.0026,2.0026,0,0,0,2-2V15.41406l1.293,1.293ZM9.0799,28A7.00456,7.00456,0,0,1,15,22.07983V19.78815a2.49986,2.49986,0,1,1,2,.00012V22.0799A7.00512,7.00512,0,0,1,22.9201,28ZM27,28H24.92218A9.00972,9.00972,0,0,0,19.252,20.60742a4.5,4.5,0,1,0-6.5039,0A9.01069,9.01069,0,0,0,7.07782,28H5V13.41406l10.293-10.293a1.00142,1.00142,0,0,1,1.41406,0L27,13.41406Z"></path>
                          </svg>
                          <Text size="2" weight="bold">
                            Host or others may share home
                          </Text>
                        </Card>
                      </div>
                      <Separator size="4" style={{ marginTop: 30, marginBottom: 30 }} />

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div style={{ display: 'flex', gap: 15 }}>
                          <svg
                            viewBox="0 0 32 32"
                            style={{
                              height: 24,
                              width: 24,
                              fill: 'currentcolor',
                              display: 'block',
                            }}
                          >
                            <path d="m17 6c1.0543618 0 1.9181651.81587779 1.9945143 1.85073766l.0054857.14926234.0008825 8.7646837c.082702.0740788.161269.1526799.235312.2354146l4.7638055-.0000983v-3h-3c-.6424073 0-1.1071307-.5923403-.9796308-1.2018783l.0309475-.1143495 2-5.99999997c.12374-.37122012.4508064-.63259558.8326391-.67705046l.1160442-.00672177h4c.3913004 0 .7426904.22762818.9056101.57580861l.0430732.10796362 2 5.99999997c.203147.6094411-.2118379 1.2376308-.8304154 1.3094267l-.1182679.0068011h-3v3h5c.5128358 0 .9355072.3860402.9932723.8833789l.0067277.1166211v12h-2v-3h-10v3h-2v-3h-16v3h-2v-11c0-.8885473.3862919-1.6868712 1.00009834-2.2361945l-.00009834-8.7638055c0-1.0543618.81587779-1.91816512 1.85073766-1.99451426l.14926234-.00548574zm13 13h-10v6h10zm-13-1h-14c-.51283584 0-.93550716.3860402-.99327227.8833789l-.00672773.1166211v6h16v-6c0-.4733869-.3289337-.8699473-.7707092-.9735893l-.1126697-.019683zm8 3c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1-1-.4477153-1-1 .4477153-1 1-1zm-8-13h-14v8h2v-3c0-1.0543618.81587779-1.9181651 1.85073766-1.9945143l.14926234-.0054857h6c1.0543618 0 1.9181651.8158778 1.9945143 1.8507377l.0054857.1492623v3h2zm-4 5h-6v3h6zm13.279-5h-2.559l-1.333 4h5.225z"></path>
                          </svg>
                          <Text as="p" weight="bold">
                            Room in an apartment
                          </Text>
                        </div>
                        <div style={{ display: 'flex', gap: 15 }}>
                          <svg
                            viewBox="0 0 32 32"
                            style={{
                              height: 24,
                              width: 24,
                              fill: 'currentcolor',
                              display: 'block',
                            }}
                          >
                            <path d="m11.6667 0-.00095 1.666h8.667l.00055-1.666h2l-.00055 1.666 6.00065.00063c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323v15.91907c0 .4715696-.1664445.9258658-.4669028 1.2844692l-.1188904.1298308-8.7476886 8.7476953c-.3334303.3332526-.7723097.5367561-1.2381975.5778649l-.1758207.0077398h-12.91915c-2.68874373 0-4.88181754-2.1223321-4.99538046-4.7831124l-.00461954-.2168876v-21.66668c0-1.05436021.81587582-1.91815587 1.85073739-1.99450431l.14926261-.00548569 5.999-.00063.00095-1.666zm16.66605 11.666h-24.666v13.6673c0 1.5976581 1.24893332 2.9036593 2.82372864 2.9949072l.17627136.0050928 10.999-.0003.00095-5.6664c0-2.6887355 2.122362-4.8818171 4.7832071-4.9953804l.2168929-.0046196 5.66595-.0006zm-.081 8-5.58495.0006c-1.5977285 0-2.9037573 1.2489454-2.9950071 2.8237299l-.0050929.1762701-.00095 5.5864zm-18.586-16-5.999.00062v5.99938h24.666l.00065-5.99938-6.00065-.00062.00055 1.66733h-2l-.00055-1.66733h-8.667l.00095 1.66733h-2z"></path>
                          </svg>
                          <Text as="p" weight="bold">
                            Free cancellation before 24 May
                          </Text>
                        </div>
                      </div>

                      <Separator size="4" style={{ marginTop: 30, marginBottom: 30 }} />

                      <Text
                        as="p"
                        weight="bold"
                        size="5"
                        style={{ marginBottom: 'var(--space-2)' }}
                      >
                        About this place
                      </Text>

                      <Text as="p" style={{ marginBottom: 'var(--space-4)' }}>
                        Nice apartment with a very cozy living room, a large terrace, an equipped
                        kitchen, two bedrooms and a bathroom. The house is very bright thanks to the
                        large windows. It is located in a quiet area where several means of
                        transport that connect it both to the center of the city in 15/20min and to
                        the airport of Milan in 15 min.
                      </Text>

                      <Link color="gray">Learn more</Link>
                    </div>

                    <div style={{ paddingRight: 'var(--space-6)', position: 'relative' }}>
                      <div
                        style={{
                          borderRadius: 'var(--radius-4)',
                          marginTop: -90,
                          width: 340,
                          backgroundColor: 'var(--color-background)',
                          boxShadow: 'var(--shadow-3)',
                          padding: 30,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 15,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                          }}
                        >
                          <div>
                            <Text size="6" weight="bold">
                              £70
                            </Text>{' '}
                            <Text color="gray">night</Text>
                          </div>
                          <Link size="2" color="gray">
                            4 reviews
                          </Link>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-2)',
                            marginBottom: 'var(--space-2)',
                          }}
                        >
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr',
                              gap: 'var(--space-2)',
                            }}
                          >
                            <LabelValueCard label="Check-in" value="31/05/2023" />
                            <LabelValueCard label="Check-out" value="05/06/2023" />
                          </div>

                          <Popover.Root>
                            <Popover.Trigger>
                              <button className={styles.guestTrigger}>
                                <div>
                                  <Text as="p" size="1" weight="bold">
                                    Guests
                                  </Text>

                                  <Text as="p" size="2">
                                    {totalCount} guest{totalCount > 1 ? 's' : ''}
                                  </Text>
                                </div>

                                <ChevronDownIcon />
                              </button>
                            </Popover.Trigger>
                            <Popover.Content
                              align="center"
                              style={{
                                boxSizing: 'border-box',
                                padding: 'var(--space-5)',
                                backgroundColor: 'var(--gray-1)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--space-4)',
                              }}
                            >
                              <GuestSelectorItem
                                label="Adults"
                                subLabel="Age 13+"
                                value={adultCount}
                                onValueChange={setAdultCount}
                              />

                              <GuestSelectorItem
                                label="Children"
                                subLabel="Ages 2–12"
                                value={childCount}
                                onValueChange={setChildCount}
                              />

                              <GuestSelectorItem
                                label="Infants"
                                subLabel="Under 2"
                                value={infantCount}
                                onValueChange={setInfantCount}
                              />
                            </Popover.Content>
                          </Popover.Root>

                          <ConfirmBookingDialog guestCount={totalCount}>
                            <Button size="3" variant="solid" style={{ width: '100%' }}>
                              Reserve
                            </Button>
                          </ConfirmBookingDialog>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--space-3)',
                          }}
                        >
                          <ItemisedRow label="£70 x 5 nights" amount="£348" />
                          <ItemisedRow label="Cleaning fee" amount="£17" />
                          <ItemisedRow label="Service fee" amount="£62" />
                          <ItemisedRow label="Taxes" amount="£13" />
                        </div>
                        <Separator size="4" />
                        <ItemisedRow label="Total" amount="£440" />
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </Theme>
      </body>
    </html>
  );
}

const ItemisedRow: React.FC<{ label: string; amount: string }> = ({ label, amount }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Text>{label}</Text> <Text weight="bold">{amount}</Text>
    </div>
  );
};

const PhotoArea: React.FC = () => {
  return (
    <div
      style={{
        height: 500,
        borderRadius: 'var(--radius-6)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1.25fr 1fr',
        gap: 'var(--space-2)',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--gray-4)',
          backgroundImage:
            'url("https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <div
        style={{
          backgroundColor: 'var(--gray-4)',
          backgroundImage:
            'url("https://images.unsplash.com/photo-1585128792020-803d29415281?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />
      <Button
        variant="solid"
        highContrast
        style={{
          position: 'absolute',
          top: 'var(--space-6)',
          right: 'var(--space-6)',
        }}
      >
        <span
          style={{
            color: 'var(--gray-8)',
          }}
        >
          <GridIcon />
        </span>
        Show all photos
      </Button>
    </div>
  );
};

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        padding: `var(--space-3) var(--space-5)`,
        border: '1px solid var(--gray-7)',
        borderRadius: 'var(--radius-3)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
      }}
    >
      {children}
    </div>
  );
};

function ConfirmBookingDialog({ children, guestCount }: any) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 550 }}>
        <Dialog.Title size="5">Confirm and pay</Dialog.Title>
        <Dialog.Description
          size="2"
          style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-5)' }}
        >
          Your booking is only moments away.
        </Dialog.Description>

        <Text as="p" weight="bold" style={{ marginBottom: 'var(--space-3)' }}>
          Your trip
        </Text>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <LabelValueCard label="Check-in" value="31/05/2023" />
          <LabelValueCard label="Check-out" value="05/06/2023" />
          <LabelValueCard
            label="Guests"
            value={`${guestCount} guest${guestCount > 1 ? 's' : ''}`}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-5)',
          }}
        >
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="solid">Confirm booking</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

const LabelValueCard: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div
      style={{
        padding: 'var(--space-3) var(--space-4)',
        border: '1px solid var(--gray-7)',
        borderRadius: 'var(--radius-3)',
      }}
    >
      <Text as="p" size="1" weight="bold">
        {label}
      </Text>

      <Text as="p" size="2">
        {value}
      </Text>
    </div>
  );
};

const GuestSelectorItem: React.FC<{
  value: number;
  onValueChange: (value: number) => void;
  label: string;
  subLabel: string;
}> = ({ label, subLabel, value, onValueChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <Text size="2" weight="bold">
          {label}
        </Text>
        <Text size="2" color="gray">
          {subLabel}
        </Text>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
        <IconButton
          disabled={value === 0}
          size="1"
          variant="outline"
          radius="full"
          onClick={() => onValueChange(value - 1)}
        >
          <MinusIcon />
        </IconButton>

        <Text size="2" weight="bold" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </Text>

        <IconButton size="1" variant="solid" radius="full" onClick={() => onValueChange(value + 1)}>
          <PlusIcon />
        </IconButton>
      </div>
    </div>
  );
};
