import { Container, Flex, Heading, TextArea, TextField } from '@radix-ui/themes';

export default function Test() {
  return (
    <Container py="8" mx="4">
      <Flex direction="column" gap="4" width="320px">
        <Heading size="3">TextField</Heading>
        <TextField.Root
          aria-label="textfield default filled"
          defaultValue="Some value"
          placeholder="Placeholder text"
        />
        <TextField.Root
          aria-label="textfield readonly filled"
          readOnly
          defaultValue="Some value"
          placeholder="Placeholder text"
        />
        <TextField.Root
          aria-label="textfield disabled filled"
          disabled
          defaultValue="Some value"
          placeholder="Placeholder text"
        />
        <TextField.Root
          aria-label="textfield readonly empty"
          readOnly
          placeholder="Placeholder text"
        />
        <TextField.Root
          aria-label="textfield disabled empty"
          disabled
          placeholder="Placeholder text"
        />

        <Heading size="3">TextArea</Heading>
        <TextArea
          aria-label="textarea default filled"
          defaultValue="Some value"
          placeholder="Placeholder text"
        />
        <TextArea
          aria-label="textarea readonly filled"
          readOnly
          defaultValue="Some value"
          placeholder="Placeholder text"
        />
        <TextArea
          aria-label="textarea disabled filled"
          disabled
          defaultValue="Some value"
          placeholder="Placeholder text"
        />
      </Flex>
    </Container>
  );
}
