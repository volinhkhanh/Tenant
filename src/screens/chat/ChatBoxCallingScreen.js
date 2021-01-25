import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import {
  SpeakerIcon,
  CleanIcon,
  TicketOutlineIcon,
  DeliveryIcon,
  LaundryIcon,
  MovingIcon,
  ChattingIcon,
  ServiceIcon,
  RecordIcon,
  CallendIcon,
} from '../../components/icons';
import { Colors, Fonts } from '../../themes';

const AVATAR_TYPE = {
  cleaning: () => <CleanIcon width="100%" height="100%" color={Colors.mainColor} />,
  general: () => <ServiceIcon width={'100%'} height={'100%'} color={Colors.mainColor} />,
  ticket: () => <TicketOutlineIcon width={'100%'} height={'100%'} color={Colors.mainColor} />,
  delivery: () => <DeliveryIcon width={'100%'} height={'100%'} color={Colors.mainColor} />,
  laundry: () => <LaundryIcon width={'100%'} height={'100%'} color={Colors.mainColor} />,
  moving: () => <MovingIcon width={'100%'} height={'100%'} color={Colors.mainColor} />,
  buildManager: () => <MovingIcon width={'100%'} height={'100%'} color={Colors.mainColor} />,
};
//
const CHATBOX_TITLE = {
  cleaning: 'Cleaning',
  general: 'General',
  ticket: 'Ticket Support',
  delivery: 'Delivery',
  laundry: 'Laundry',
  moving: 'Moving',
  buildManager: 'Build Manager',
};
//
const ChatBoxCallingScreen = props => {
  const { navigation, route } = props;
  const { chatboxType } = route.params;
  const title = CHATBOX_TITLE[chatboxType];
  //
  return (
    <View>
      <View style={styles.container}>
        <View style={{ flex: 2, justifyContent: 'flex-end', paddingHorizontal: 12 }}>
          <Ripple style={styles.circleIcon} onPress={() => navigation.goBack()}>
            <ChattingIcon />
          </Ripple>
        </View>
        <View style={{ flex: 6, alignItems: 'center' }}>
          <View style={[styles.circleIcon, { height: 123, width: 123 }]}>
            <View style={{ width: 64, height: 64 }}>{AVATAR_TYPE[chatboxType]()}</View>
          </View>
          <Text style={{ ...Fonts.style.buttonBold, color: Colors.white, paddingTop: 20 }}>{title}</Text>
          <Text style={{ ...Fonts.style.captionMedium, color: Colors.white, paddingTop: 10 }}>Contacting...</Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
          <Ripple style={styles.circleIcon}>
            <SpeakerIcon width="32" height="32" color={Colors.mainColor} />
          </Ripple>
          <Ripple style={styles.circleIcon}>
            <RecordIcon width="32" height="32" color={Colors.mainColor} />
          </Ripple>
          <Ripple onPress={navigation.goBack} style={[styles.circleIcon, { backgroundColor: Colors.red }]}>
            <CallendIcon width="32" height="32" color={Colors.white} />
          </Ripple>
        </View>
      </View>
    </View>
  );
};
//
export default memo(ChatBoxCallingScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray1,
  },
  circleIcon: {
    padding: 5,
    backgroundColor: 'white',
    height: 60,
    width: 60,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
});
