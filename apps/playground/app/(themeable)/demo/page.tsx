import * as React from 'react';
import {
  Avatar,
  Flex,
  Separator,
  Text,
  Button,
  IconButton,
  Dialog,
  TextField,
  Select,
  Box,
  Container,
} from '@radix-ui/themes';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { users } from './users';

export default function Demo() {
  return (
    <Container size="1" py="8" mx="4">
      {users.map((user) => {
        return (
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
                  <Flex direction="column" gap="5">
                    <Box>
                      <Dialog.Title>{user.name}</Dialog.Title>
                      <Dialog.Description>Edit and save details below.</Dialog.Description>
                    </Box>
                    <Flex direction="column">
                      <Flex direction="column">
                        <Text
                          size="1"
                          weight="bold"
                          color="gray"
                          mb="1"
                          as="label"
                          htmlFor={`name-field-${user.id}`}
                        >
                          Name
                        </Text>
                        <TextField.Root
                          defaultValue={user.name}
                          mb="2"
                          id={`name-field-${user.id}`}
                        />
                      </Flex>
                      <Flex direction="column">
                        <Text
                          size="1"
                          weight="bold"
                          color="gray"
                          mb="1"
                          id={`role-label-${user.id}`}
                          as="label"
                        >
                          Role
                        </Text>
                        <Select.Root defaultValue={user.role}>
                          <Select.Trigger aria-labelledby={`role-label-${user.id}`} />
                          <Select.Content variant="soft" color="gray">
                            <Select.Item value="viewer">Viewer</Select.Item>
                            <Select.Item value="maintainer">Maintainer</Select.Item>
                            <Select.Item value="contributor">Contributor</Select.Item>
                            <Select.Item value="admin">Admin</Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Flex>
                    </Flex>
                    <Flex justify="end" gap="3">
                      <Dialog.Close>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button variant="solid">Save</Button>
                      </Dialog.Close>
                    </Flex>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root>
            </Flex>
            <Separator size="4" my="3" />
          </React.Fragment>
        );
      })}
    </Container>
  );
}
