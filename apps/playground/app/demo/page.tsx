import * as React from 'react';
import {
  Theme,
  //
  Avatar,
  Flex,
  Separator,
  Text,
  Button,
  IconButton,
  Dialog,
  TextField,
  Select,
  //
  ThemePanel,
} from '@radix-ui/themes';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { users } from './users';
import styles from './page.module.css';

export default function Demo() {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Theme asChild appearance="dark" accentColor="mint" radius="large" scaling="110%">
          <div id="root">
            <ThemePanel />

            {users.map((user) => (
              <React.Fragment key={user.id}>
                <Flex align="center" justify="between">
                  <Flex align="center" gap="3">
                    <Avatar src={user.image} fallback={user.name[0]} radius="full" />
                    <Flex direction="column">
                      <Text size="2">{user.name}</Text>
                      <Text size="1" color="gray">
                        {user.handle}
                      </Text>
                    </Flex>
                  </Flex>
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <IconButton aria-label="Edit user" variant="soft">
                        <Pencil1Icon />
                      </IconButton>
                    </Dialog.Trigger>
                    <Dialog.Content>
                      <Dialog.Title>{user.name}</Dialog.Title>
                      <Dialog.Description mb="5">Edit and save details below.</Dialog.Description>

                      <Text size="1" weight="bold" color="gray" mb="1">
                        Name
                      </Text>
                      <TextField.Root defaultValue={user.name} mb="2" />
                      <Text size="1" weight="bold" color="gray" mb="1">
                        Role
                      </Text>
                      <Select.Root defaultValue={user.role}>
                        <Select.Trigger />
                        <Select.Content variant="soft" color="gray">
                          <Select.Item value="viewer">Viewer</Select.Item>
                          <Select.Item value="maintainer">Maintainer</Select.Item>
                          <Select.Item value="contributor">Contributor</Select.Item>
                          <Select.Item value="admin">Admin</Select.Item>
                        </Select.Content>
                      </Select.Root>

                      <Flex justify="end" gap="3" mt="5">
                        <Dialog.Close>
                          <Button variant="soft" color="gray">
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button variant="solid">Save</Button>
                        </Dialog.Close>
                      </Flex>
                    </Dialog.Content>
                  </Dialog.Root>
                </Flex>
                <Separator size="4" my="3" />
              </React.Fragment>
            ))}
          </div>
        </Theme>
      </body>
    </html>
  );
}
