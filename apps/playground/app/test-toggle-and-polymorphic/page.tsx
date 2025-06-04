'use client';

import * as React from 'react';
import {
  Theme,
  ThemePanel,
  Container,
  Section,
  Flex,
  Button,
  IconButton,
  ToggleButton,
  ToggleIconButton,
  Text,
} from '@kushagradhawan/kookie-ui';
import { HeartIcon, StarIcon, BookmarkIcon, HomeIcon } from '@radix-ui/react-icons';

export default function Test() {
  const [likePressed, setLikePressed] = React.useState(false);
  const [favoritePressed, setFavoritePressed] = React.useState(true);
  const [savePressed, setSavePressed] = React.useState(false);
  const [homePressed, setHomePressed] = React.useState(false);

  return (
    <html lang="en">
      <body>
        <Theme asChild>
          <div id="root">
            <ThemePanel defaultOpen={false} />
            <Container px="5">
              <Section>
                <Flex direction="column" gap="8">
                  <div>
                    <Text size="6" weight="bold" mb="4">
                      Toggle Buttons
                    </Text>

                    <Flex direction="column" gap="4">
                      <Text size="4" weight="medium">
                        Regular ToggleButton
                      </Text>
                      <Flex gap="3" wrap="wrap">
                        <ToggleButton
                          pressed={likePressed}
                          onPressedChange={setLikePressed}
                          variant="soft"
                          color="red"
                        >
                          <HeartIcon />
                          {likePressed ? 'Liked' : 'Like'}
                        </ToggleButton>

                        <ToggleButton
                          pressed={favoritePressed}
                          onPressedChange={setFavoritePressed}
                          variant="outline"
                          color="blue"
                        >
                          <StarIcon />
                          {favoritePressed ? 'Favorited' : 'Favorite'}
                        </ToggleButton>

                        <ToggleButton
                          pressed={savePressed}
                          onPressedChange={setSavePressed}
                          variant="ghost"
                          color="green"
                        >
                          <BookmarkIcon />
                          {savePressed ? 'Saved' : 'Save'}
                        </ToggleButton>
                      </Flex>

                      <Text size="4" weight="medium">
                        ToggleIconButton
                      </Text>
                      <Flex gap="3" wrap="wrap">
                        <ToggleIconButton
                          pressed={likePressed}
                          onPressedChange={setLikePressed}
                          variant="soft"
                          color="red"
                          size="3"
                        >
                          <HeartIcon />
                        </ToggleIconButton>

                        <ToggleIconButton
                          pressed={favoritePressed}
                          onPressedChange={setFavoritePressed}
                          variant="solid"
                          color="blue"
                          size="3"
                        >
                          <StarIcon />
                        </ToggleIconButton>

                        <ToggleIconButton
                          pressed={savePressed}
                          onPressedChange={setSavePressed}
                          variant="outline"
                          color="green"
                          size="3"
                        >
                          <BookmarkIcon />
                        </ToggleIconButton>

                        <ToggleIconButton
                          pressed={homePressed}
                          onPressedChange={setHomePressed}
                          variant="ghost"
                          color="gray"
                          size="3"
                        >
                          <HomeIcon />
                        </ToggleIconButton>
                      </Flex>

                      <Text size="4" weight="medium">
                        Full Width Toggle Buttons
                      </Text>
                      <Flex direction="column" gap="3">
                        <ToggleButton
                          fullWidth
                          pressed={likePressed}
                          onPressedChange={setLikePressed}
                          variant="soft"
                          color="red"
                        >
                          <HeartIcon />
                          Full Width Toggle - {likePressed ? 'Active' : 'Inactive'}
                        </ToggleButton>

                        <ToggleIconButton
                          fullWidth
                          pressed={favoritePressed}
                          onPressedChange={setFavoritePressed}
                          variant="solid"
                          color="blue"
                          size="3"
                        >
                          <StarIcon />
                        </ToggleIconButton>
                      </Flex>
                    </Flex>
                  </div>

                  <div>
                    <Text size="6" weight="bold" mb="4">
                      Polymorphic Buttons with "as" Prop
                    </Text>

                    <Flex direction="column" gap="4">
                      <Text size="4" weight="medium">
                        Regular Button as Link
                      </Text>
                      <Flex gap="3" wrap="wrap">
                        <Button as="a" href="#test" variant="solid" color="blue">
                          Button as Link
                        </Button>

                        <IconButton as="a" href="#test" variant="soft" color="green" size="3">
                          <HomeIcon />
                        </IconButton>
                      </Flex>

                      <Text size="4" weight="medium">
                        Toggle Button as Link
                      </Text>
                      <Flex gap="3" wrap="wrap">
                        <ToggleButton
                          as="a"
                          href="#toggle-link"
                          pressed={likePressed}
                          onPressedChange={setLikePressed}
                          variant="outline"
                          color="purple"
                        >
                          <HeartIcon />
                          Toggle Link - {likePressed ? 'Active' : 'Inactive'}
                        </ToggleButton>

                        <ToggleIconButton
                          as="a"
                          href="#toggle-icon-link"
                          pressed={favoritePressed}
                          onPressedChange={setFavoritePressed}
                          variant="surface"
                          color="orange"
                          size="3"
                        >
                          <StarIcon />
                        </ToggleIconButton>
                      </Flex>
                    </Flex>
                  </div>

                  <div>
                    <Text size="6" weight="bold" mb="4">
                      Comparison: asChild vs as Prop
                    </Text>

                    <Flex direction="column" gap="4">
                      <Text size="4" weight="medium">
                        Using asChild (existing pattern)
                      </Text>
                      <Flex gap="3" wrap="wrap">
                        <Button asChild variant="solid" color="blue">
                          <a href="#as-child">asChild Link</a>
                        </Button>

                        <ToggleButton
                          asChild
                          pressed={savePressed}
                          onPressedChange={setSavePressed}
                          variant="soft"
                          color="green"
                        >
                          <a href="#toggle-as-child">
                            <BookmarkIcon />
                            Toggle asChild
                          </a>
                        </ToggleButton>
                      </Flex>

                      <Text size="4" weight="medium">
                        Using as prop (new pattern)
                      </Text>
                      <Flex gap="3" wrap="wrap">
                        <Button as="a" href="#as-prop" variant="solid" color="blue">
                          as Prop Link
                        </Button>

                        <ToggleButton
                          as="a"
                          href="#toggle-as-prop"
                          pressed={savePressed}
                          onPressedChange={setSavePressed}
                          variant="soft"
                          color="green"
                        >
                          <BookmarkIcon />
                          Toggle as Prop
                        </ToggleButton>
                      </Flex>
                    </Flex>
                  </div>

                  <div>
                    <Text size="6" weight="bold" mb="4">
                      State Debug
                    </Text>
                    <Flex direction="column" gap="2">
                      <Text size="2">Like: {likePressed ? 'ON' : 'OFF'}</Text>
                      <Text size="2">Favorite: {favoritePressed ? 'ON' : 'OFF'}</Text>
                      <Text size="2">Save: {savePressed ? 'ON' : 'OFF'}</Text>
                      <Text size="2">Home: {homePressed ? 'ON' : 'OFF'}</Text>
                    </Flex>
                  </div>
                </Flex>
              </Section>
            </Container>
          </div>
        </Theme>
      </body>
    </html>
  );
}
