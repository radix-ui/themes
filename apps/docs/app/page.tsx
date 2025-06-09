import { Button, Flex, Heading, Text, Container, Section, Card } from "@kushagradhawan/kookie-ui";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container size="4">
      <Section size="3">
        <Flex direction="column" gap="6" align="center">
          <Flex direction="column" gap="3" align="center">
            <Heading size="9" align="center">
              Kookie UI
            </Heading>
            <Text size="5" color="gray" align="center">
              A beautiful React component library based on Radix UI
            </Text>
          </Flex>

          <Flex gap="3">
            <Button size="3" asChild>
              <Link href="/components/button">
                Get Started
              </Link>
            </Button>
            <Button size="3" variant="outline">
              View Examples
            </Button>
          </Flex>

          <Card style={{ width: "100%", maxWidth: "600px" }}>
            <Flex direction="column" gap="4" p="6">
              <Heading size="4">Quick Start</Heading>
              <Text>Install Kookie UI in your React project:</Text>
              <pre style={{ 
                padding: "var(--space-3)", 
                backgroundColor: "var(--color-surface)", 
                borderRadius: "var(--radius-3)" 
              }}>
                <code>npm install @kushagradhawan/kookie-ui</code>
              </pre>
            </Flex>
          </Card>
        </Flex>
      </Section>
    </Container>
  );
}
