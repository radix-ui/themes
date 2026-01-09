import { Avatar, Container, Flex, Heading, Section, Text } from '@kushagradhawan/kookie-ui';

type TestimonialProps = {
  quote: string;
  author: string;
  designation: string;
  avatar?: string;
};

export function Testimonial({ quote, author, designation, avatar }: TestimonialProps) {
  return (
    <Section size="4">
      <Container size="3" px={{ initial: '4', sm: '6' }}>
        <Flex direction="column" align="center" justify="center" gap="6" py="6">
          <Heading size="7" align="center" weight="medium">
            "{quote}"
          </Heading>
          <Flex direction="column" align="center" gap="2">
            {avatar && <Avatar src={avatar} fallback={author.charAt(0)} size="4" radius="full" />}
            <Flex direction="column" align="center" gap="1">
              <Text size="3" weight="medium">
                {author}
              </Text>
              <Text size="2" color="gray">
                {designation}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Section>
  );
}
