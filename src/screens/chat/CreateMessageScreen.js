import React, { memo, useState } from 'react';
import moment from 'moment';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
// components
import {
  CleanIcon,
  LaundryIcon,
  MovingIcon,
  DeliveryIcon,
  ServiceIcon,
  TicketOutlineIcon,
} from '../../Components/Icons';
import Card from '../../Components/Card';
import Button from '../../Components/Button';
import { RecentBookingItem } from '../../Components/ListItem';
import CardTicket from '../../Components/Card/CardTicket';
import BottomLayout from '../BottomLayout';
import { TableListItem } from '../../Components/ListItem/';
import { onPressToStack } from '../utils';

import { Images, Colors, ApplicationStyles, Fonts } from '../../Themes';

const CreateMessageScreen = props => {
  const { navigation } = props;

  const scrollEnabled = DATA.length > 0;

  return (
    <BottomLayout>
      <View style={styles.textBox}>
        <Text style={styles.textDesc}>{'Create a conversation with'}</Text>
      </View>
      <View style={styles.box}>
        <Card
          size="S"
          Icon={CleanIcon}
          label="Cleaning"
          fixedWidth
          style={{ marginVertical: 20 }}
          onPress={() => onPressToStack(navigation, 'ChattingBoxScreen')}
        />
        <Card
          size="S"
          Icon={MovingIcon}
          label="Moving"
          fixedWidth
          style={{ marginVertical: 20 }}
          onPress={() => onPressToStack(navigation, 'ChattingBoxScreen')}
        />
        <Card
          size="S"
          Icon={DeliveryIcon}
          label="Delivery"
          fixedWidth
          style={{ marginVertical: 20 }}
          onPress={() => onPressToStack(navigation, 'ChattingBoxScreen')}
        />
      </View>
      <View style={styles.box}>
        <Card
          size="S"
          Icon={LaundryIcon}
          label="Laundry"
          fixedWidth
          style={{ marginVertical: 20 }}
          onPress={() => onPressToStack(navigation, 'ChattingBoxScreen')}
        />
        <Card
          size="S"
          Icon={TicketOutlineIcon}
          label="Ticket"
          fixedWidth
          style={{ marginVertical: 20 }}
          onPress={() => onPressToStack(navigation, 'ChattingBoxScreen')}
        />
        <Card
          size="S"
          Icon={ServiceIcon}
          label="General"
          fixedWidth
          style={{ marginVertical: 20 }}
          onPress={() => onPressToStack(navigation, 'ChattingBoxScreen')}
        />
      </View>
    </BottomLayout>
  );
};

export default memo(CreateMessageScreen);

const styles = StyleSheet.create({
  textBox: {
    paddingVertical: 10,
  },
  image: {
    height: ApplicationStyles.utils.resizeHeight(250),
    width: ApplicationStyles.utils.resizeWidth(240),
  },
  textDesc: {
    ...Fonts.style.bodyMedium,
    paddingTop: 14,
    paddingHorizontal: ApplicationStyles.utils.resizeLimitedWidth(28),
    color: Colors.gray1,
    lineHeight: 30,
  },
  box: {
    paddingHorizontal: 27,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

const DATA = [
  {
    id: '1',
    imageUrl: Images.chair1,
    title: 'The chair is broken',
    status: 'Processing',
    timeText: '08:00 02/03/2020',
    description: 'One of the dining chair is broken. It just collapsed when we sat...',
  },
  {
    id: '2',
    imageUrl: Images.chair2,
    title: 'The table is broken',
    status: 'Submited',
    timeText: '08:00 02/03/2020',
    description: 'One of its legs is about to break soon. Please replace with a...',
  },
  {
    id: '3',
    imageUrl: Images.chair3,
    title: 'The table is broken',
    status: 'Completed',
    timeText: '08:00 02/03/2020',
    description: 'One of its legs is about to break soon. Please replace with a...',
  },
];
