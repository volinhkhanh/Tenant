import React from 'react';
import {View, Text} from 'react-native';

import {Colors} from '../themes';

export default function IconWithBadge({icon, badgeCount, size, focused}) {
  const badgeSize = size - 10;
  const paddingHorizontal = 2;
  const fontSize = badgeSize - paddingHorizontal - 2;

  return (
    <View style={{margin: 10}}>
      {icon}
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: badgeSize * 1.3,
            left: badgeSize * 1.3,
            minWidth: badgeSize,
            height: badgeSize,
            borderRadius: badgeSize / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.red,
            paddingHorizontal,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize,
              fontWeight: 'bold',
            }}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}
