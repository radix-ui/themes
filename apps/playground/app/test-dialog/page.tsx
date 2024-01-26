import * as React from 'react';
import {
  Theme,
  Flex,
  Button,
  Container,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/themes';
import { NextThemeProvider } from '../next-theme-provider';
import { Share2Icon } from '@radix-ui/react-icons';

export default function Test() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider>
          <Theme asChild>
            <div id="root">
              <Container px="8">
                <Flex align="center" justify="center" height="150vh" gap="5" pb="60vh">
                  <DialogRoot>
                    <DialogTrigger>
                      <Button variant="solid">Short dialog</Button>
                    </DialogTrigger>
                    <DialogContent style={{ maxWidth: 400 }}>
                      <DialogTitle>Short dialog</DialogTitle>
                      <DialogDescription>
                        Under a sky as clear as a sapphire, the audacious wind embarked on yet
                        another sojourn. Its origin, coupled with its destination, remained a
                        riddle, shelved in the library of the unknown.
                      </DialogDescription>
                      <Flex gap="3" mt="4" justify="end">
                        <DialogClose>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button variant="solid">
                            Share <Share2Icon />
                          </Button>
                        </DialogClose>
                      </Flex>
                    </DialogContent>
                  </DialogRoot>

                  <DialogRoot>
                    <DialogTrigger>
                      <Button variant="solid">Long dialog</Button>
                    </DialogTrigger>
                    <DialogContent style={{ maxWidth: 400 }}>
                      <DialogTitle>Long dialog</DialogTitle>
                      <DialogDescription>
                        The wind was a nomadic spirit; it was a tale that wrote itself, a song that
                        hummed its own melodies. It darted through the expansive, golden fields of
                        barley, teasing them into a gentle, alluring dance. Each undulation in the
                        sea of gold bore testimony to its presence, a spectral swirl spinning tales
                        only discernible to the observant. Her dancing companions, the swaying
                        barley stalks, blushed under the sun’s blazing gaze, casting long, wiggling
                        shadows that seemed to chase the wind in playful pursuit. The wind’s
                        transient signature, a secret between her and the barley sea, vanished
                        almost as swiftly as it appeared, leaving behind a tantalizing trace of what
                        had been. A comforting rhythm pulsated through the fields as the wind
                        orchestrated a symphony. It brushed past stalks with soft whispers,
                        sometimes a gentle caress, at times a playful push. Each stalk, a musician
                        in its own right, joined in an unplanned harmony that painted pure magic
                        under the cosmic dome. The wind, bearing the scent of a thousand journeys,
                        breathed life into stillness, animating the scene with an unseen paintbrush.
                        Pearls of morning dew clung to the blades of grass, disturbed by the wind’s
                        passing only to shatter into a scattered rainbow of flickering prisms. The
                        soft hum of rustling leaves sang eulogies of time passed, mixed with odes to
                        moments present and ballads yet untold. As the sun became a glowing ember in
                        the twilight canvas, the wind drew a silent veil over the day. In a hushed
                        lullaby to the moon, it meandered over the sleeping earth, stroking the
                        peaceful night with its invisible fingers. It was ceaseless, tireless - a
                        silent serenade of the world suspended in space and time. The wind, thus,
                        traveled through the fields: ever-changing yet constant, invisible yet
                        omnipresent, silent yet narrating stories. It wasn’t just the wind, but
                        life’s unseen narrator, a mysterious poet scripting verses on nature’s
                        endless parchment. The wind traveling through the fields wasn’t merely an
                        occurrence; it was a testament to life, a novel written by the unseen, read
                        by the felt.
                      </DialogDescription>
                      <Flex gap="3" mt="4" justify="end">
                        <DialogClose>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose>
                          <Button variant="solid">
                            Share <Share2Icon />
                          </Button>
                        </DialogClose>
                      </Flex>
                    </DialogContent>
                  </DialogRoot>
                </Flex>
              </Container>
            </div>
          </Theme>
        </NextThemeProvider>
      </body>
    </html>
  );
}
