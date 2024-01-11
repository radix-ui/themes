import type { Text } from './text';
import { MarginProps, PropsWithoutRefOrColor, Responsive } from '../helpers';
import { Flex } from './flex';

export interface DataListRootProps extends PropsWithoutRefOrColor<'dl'>, MarginProps {
  direction?: Omit<
    React.ComponentPropsWithoutRef<typeof Flex>['direction'],
    'column-reverse' | 'row-reverse'
  >;
  gap?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  gapX?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  gapY?: Responsive<'0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'>;
  size?: React.ComponentPropsWithoutRef<typeof Text>['size'];
  trim?: React.ComponentPropsWithoutRef<typeof Text>['trim'];
  layout?: Responsive<'horizontal' | 'vertical'>;
}
