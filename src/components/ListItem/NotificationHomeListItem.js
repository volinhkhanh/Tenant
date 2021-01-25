import React from 'react';
import {
  Text,
  View,
} from 'react-native';
//
import { AsseccTimeIcon } from '../icons';
import { Colors, Fonts } from '../../themes';
//
export const NotificationHomeListItem = props => {
  const { title, time, unread } = props;
  return (
    <View
      style={{
        paddingVertical: 10,
        borderBottomColor: Colors.gray5,
        borderBottomWidth: 0.5,
        paddingHorizontal: 30,
        backgroundColor: unread ? Colors.pink3 : Colors.white,
      }}>
      <Text style={Fonts.style.otherMedium}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AsseccTimeIcon size={10} />
        <Text style={{ ...Fonts.style.otherLight, color: Colors.gray2, paddingHorizontal: 5 }}>{time}</Text>
      </View>
    </View>
  );
};