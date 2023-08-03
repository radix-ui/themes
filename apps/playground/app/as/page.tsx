import * as React from 'react';
import { Theme, Flex, Heading, Text, Link, Button } from '@radix-ui/themes';

export default function As() {
  return (
    <Theme asChild accentColor="purple" radius="full">
      <html lang="en">
        <body>
          <div id="root">
            <Flex direction="column" align="start" gap="3" p="9">
              <Link href="#">a default link</Link>
              <Link asChild>
                <button>a link as a button</button>
              </Link>

              <Button>a default button</Button>
              <Button asChild>
                <a href="#">a default button as a link</a>
              </Button>

              <Heading>This is a default heading (h1)</Heading>
              <Heading as="h3">This is a level 3!</Heading>
              {/* <Heading as="h3" asChild>
                This is a level 3!
              </Heading> */}

              <Heading asChild>
                <h5>This is a level 5!</h5>
              </Heading>
              {/* <Heading asChild as="h5">
                This is a level 3!
              </Heading> */}

              <Text>By default Text is a span</Text>
              <Text as="p">But we can make it more semantic!</Text>
              {/* <Text as="p" asChild>But we can make it more semantic!</Text> */}

              <Text as="p">
                And it works <Text color="green">great</Text> with nesting
              </Text>
              {/* <Text as="p" asChild>
                And it works <Text color="green">great</Text> with nesting
              </Text> */}

              <ul>
                <Text asChild>
                  <li>A list item</li>
                </Text>
              </ul>
              {/* <ul>
                <Text asChild as="div">
                  <li>A list item</li>
                </Text>
              </ul> */}
            </Flex>
          </div>
        </body>
      </html>
    </Theme>
  );
}
