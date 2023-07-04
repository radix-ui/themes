import * as React from 'react';
import { Theme, Flex, Heading, Text } from '@radix-ui/themes';

export default function As() {
  return (
    <Theme asChild accentScale="purple" radius="full">
      <html lang="en">
        <body>
          <div id="root">
            <Flex direction="column" gap="3" p="9">
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
