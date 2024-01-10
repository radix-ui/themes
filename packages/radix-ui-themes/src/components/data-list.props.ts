import type { Text } from './text';
import { MarginProps, PropsWithoutRefOrColor, Responsive } from '../helpers';
import { Flex } from './flex';

export interface DataListRootProps extends PropsWithoutRefOrColor<'dl'>, MarginProps {
  direction?: React.ComponentPropsWithoutRef<typeof Flex>['direction'];
  gap?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  size?: React.ComponentPropsWithoutRef<typeof Text>['size'];
}
