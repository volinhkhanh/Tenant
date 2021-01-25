import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import _ from 'lodash';
import moment from 'moment';
//
import {
  CleanIcon,
  MovingIcon,
  LaundryIcon,
  DeliveryIcon,
  TicketOutlineIcon,
  ServiceIcon,
} from '../icons';
//
import { Colors, Fonts } from '../../themes';
//
const ICON_TYPES = {
  general: () => <ServiceIcon width={30} height={30} />,
  ticket: () => <TicketOutlineIcon width={30} height={30} />,
  delivery: () => <DeliveryIcon width={30} height={30} />,
  laundry: () => <LaundryIcon width={30} height={30} />,
  moving: () => <MovingIcon width={30} height={30} />,
  cleaning: () => <CleanIcon width={30} height={30} />,
};
//
export const ChatTextItem = props => {
  const { item = {}, onPress } = props;
  const {
    id = '1',
    title = 'Cleaning',
    type = 'cleaning',
    unread = 1,
    message = "It's sound good",
    timeText = moment().format('HH:mm a'),
  } = item;
  return (
    <Ripple activeOpacity={1} style={styles.container} onPress={onPress}>
      <View style={styles.left}>
      </View>
      <View style={styles.center}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 8,
          }}>
          <Text style={Fonts.style.bodyMedium}>{title}</Text>
          <Text style={Fonts.style.otherMedium}>{timeText}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
          }}>
          <Text style={{ ...Fonts.style.otherRegular, color: Colors.gray2 }}>{message}</Text>
          {unread > 0 && (
            <View
              style={{
                backgroundColor: Colors.red,
                borderRadius: 999,
                height: 16,
                width: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ ...Fonts.style.otherRegular, color: Colors.white }}>{unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Ripple>
  );
};
//
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 0.3,
    maxHeight: 84,
  },
  left: {
    flex: 20,
    minHeight: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  center: {
    flex: 80,
    minHeight: 10,
    paddingRight: 15,
  },
  circle: {
    borderRadius: 999,
    borderWidth: 0.5,
    alignItems: 'center',
    borderColor: Colors.gray1,
    padding: 9,
  },
});
