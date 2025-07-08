'use client';

import * as React from 'react';
import classNames from 'classnames';

import { userCardPropDefs } from './user-card.props.js';
import { Avatar } from './avatar.js';
import { Card } from './card.js';
import { Text } from './text.js';
import { Flex } from './flex.js';
import { extractProps } from '../helpers/extract-props.js';
import { getSubtree } from '../helpers/get-subtree.js';
import { marginPropDefs } from '../props/margin.props.js';
import { useThemeContext } from './theme.js';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';
import type { MarginProps } from '../props/margin.props.js';
import type { GetPropDefTypes } from '../props/prop-def.js';

type UserCardOwnProps = GetPropDefTypes<typeof userCardPropDefs>;

type UserCardElement = React.ElementRef<'div'>;
interface UserCardProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    MarginProps,
    UserCardOwnProps {}

const UserCard = React.forwardRef<UserCardElement, UserCardProps>((props, forwardedRef) => {
  const themeContext = useThemeContext();
  const resolvedPanelBackground = props.panelBackground ?? themeContext.panelBackground;

  const {
    asChild,
    children,
    className,
    src,
    fallback,
    name,
    description,
    avatarVariant,
    radius,
    color,
    panelBackground,
    flush,
    ...restProps
  } = extractProps(props, userCardPropDefs, marginPropDefs);

  // Size mappings for avatar and text
  const sizeMap = {
    '1': { avatar: '1', name: '1', description: '0' },
    '2': { avatar: '2', name: '2', description: '1' },
    '3': { avatar: '3', name: '3', description: '2' },
    '4': { avatar: '4', name: '4', description: '3' },
  } as const;

  const currentSize = props.size || '2';
  const sizes = sizeMap[currentSize as keyof typeof sizeMap];

  const content = (
    <Flex align="center" gap="3">
      <Avatar
        size={sizes.avatar as any}
        variant={avatarVariant}
        radius={radius}
        src={src}
        fallback={fallback!}
        color={color}
        highContrast={props.highContrast}
      />
      <Flex direction="column" gap="0" style={{ minWidth: 0 }}>
        <Text size={sizes.name as any} weight="medium" truncate>
          {name}
        </Text>
        {description && (
          <Text size={sizes.description as any} color="gray" truncate>
            {description}
          </Text>
        )}
      </Flex>
    </Flex>
  );

  return (
    <Card
      {...restProps}
      asChild={asChild}
      size={props.size}
      variant={props.variant}
      panelBackground={resolvedPanelBackground}
      flush={flush}
      ref={forwardedRef}
      className={classNames('rt-UserCard', className)}
    >
      {getSubtree({ asChild, children }, content)}
    </Card>
  );
});

UserCard.displayName = 'UserCard';

export { UserCard };
export type { UserCardProps };
