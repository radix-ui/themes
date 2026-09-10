import { Box, Container, Flex, ScrollArea, Text } from '@radix-ui/themes';

export default function Test() {
  return (
    <Container py="8" mx="4">
      <Flex gap="6">
        <Box height="160px" width="220px">
          <ScrollArea dir="rtl" type="always" scrollbars="both">
            <Box width="400px" height="300px" p="3">
              <Text>RTL via dir prop</Text>
            </Box>
          </ScrollArea>
        </Box>
        <Box height="160px" width="220px">
          <ScrollArea type="always" scrollbars="both">
            <Box width="400px" height="300px" p="3">
              <Text>Default direction</Text>
            </Box>
          </ScrollArea>
        </Box>
      </Flex>
    </Container>
  );
}
