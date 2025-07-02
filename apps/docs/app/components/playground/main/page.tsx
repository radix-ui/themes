'use client';

import { Theme, Box, Flex, Heading, Separator, Container, Image } from '@kushagradhawan/kookie-ui';
import { useControls, Leva } from 'leva';
import AvatarPlayground from '../AvatarPlayground';
import BadgePlayground from '../BadgePlayground';
import ButtonPlayground from '../ButtonPlayground';
import CardPlayground from '../CardPlayground';
import DialogPlayground from '../DialogPlayground';
import DropdownMenuPlayground from '../DropdownMenuPlayground';
import IconButtonPlayground from '../IconButtonPlayground';
import SelectPlayground from '../SelectPlayground';
import TextAreaPlayground from '../TextAreaPlayground';
import TextFieldPlayground from '../TextFieldPlayground';
import AlertDialogPlayground from '../AlertDialogPlayground';
import CalloutPlayground from '../CalloutPlayground';
import ContextMenuPlayground from '../ContextMenuPlayground';
import TabsPlayground from '../TabsPlayground';
import PopoverPlayground from '../PopoverPlayground';

const backgroundImages = {
  'Abstract Dark':
    'https://images.unsplash.com/photo-1678025276032-fd796f4a0ec2?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Abstract Light':
    'https://images.unsplash.com/photo-1746003288323-89dba68721f6?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  '3D Render':
    'https://images.unsplash.com/photo-1741145018917-216c9275bc3a?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

export default function MainPlayground() {
  const backgroundControls = useControls('Background Image', {
    enabled: { value: false, label: 'Show Background' },
    image: {
      value: 'Abstract Light',
      options: Object.keys(backgroundImages),
      label: 'Image',
    },
    opacity: { value: 1, min: 0, max: 1, step: 0.1, label: 'Opacity' },
    blur: { value: true, label: 'Blur Effect' },
  });

  return (
    <>
      <Leva
        collapsed={false}
        oneLineLabels
        titleBar={{ title: 'Playground Controls' }}
        theme={{
          sizes: {
            titleBarHeight: '36px',
          },
        }}
      />
      <Theme>
        {backgroundControls.enabled && (
          <Box
            p="6"
            position="fixed"
            top="0"
            left="0"
            style={{ zIndex: -1 }}
            height="100vh"
            width="100vw"
          >
            <Image
              src={backgroundImages[backgroundControls.image as keyof typeof backgroundImages]}
              alt="Background Image"
              width="100%"
              height="100%"
              variant={backgroundControls.blur ? 'blur' : 'surface'}
              style={{
                zIndex: -1,
                opacity: backgroundControls.opacity,
              }}
              wrapperStyle={{ width: '100%', height: '100%', display: 'block' }}
              fit="cover"
            />
          </Box>
        )}
        <Container size="4" py="9">
          <Flex direction="column" gap="9">
            {/* Alert Dialog Playground */}

            <Box>
              <AlertDialogPlayground />
            </Box>

            {/* Avatar Playground */}
            <Box>
              <AvatarPlayground />
            </Box>

            {/* Badge Playground */}
            <Box>
              <BadgePlayground />
            </Box>

            {/* Button Playground */}
            <Box>
              <ButtonPlayground />
            </Box>

            {/* Card Playground */}
            <Box>
              <CardPlayground />
            </Box>

            {/* Callout Playground */}
            <Box>
              <CalloutPlayground />
            </Box>

            {/* ContextMenu Playground */}
            <Box>
              <ContextMenuPlayground />
            </Box>

            {/* Dialog Playground */}
            <Box>
              <DialogPlayground />
            </Box>

            {/* DropdownMenu Playground */}
            <Box>
              <DropdownMenuPlayground />
            </Box>

            {/* Icon Button Playground */}
            <Box>
              <IconButtonPlayground />
            </Box>

            {/* Popover Playground */}
            <Box>
              <PopoverPlayground />
            </Box>

            {/* Select Playground */}
            <Box>
              <SelectPlayground />
            </Box>

            {/* TextArea Playground */}
            <Box>
              <TextAreaPlayground />
            </Box>

            {/* TextField Playground */}
            <Box>
              <TextFieldPlayground />
            </Box>

            {/* Tabs Playground */}
            <Box>
              <TabsPlayground />
            </Box>

            {/* Future component playgrounds will be added here */}
          </Flex>
        </Container>
      </Theme>
    </>
  );
}
