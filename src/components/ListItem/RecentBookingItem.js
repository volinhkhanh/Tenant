import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
//
import {Colors, Fonts} from '../../themes';
//
import DateFormat from '../../utils/dateFormat';
//
export const RecentBookingItem = props => {
  const {item = {}, dataRecentBooking = {}} = props;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>
          {item?.facility_category}
        </Text>
        <Text style={styles.title}>{item?.facility}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.desc}>{item?.unit?.house_number}</Text>
        <Text style={styles.desc}>
          {/* {`${DateFormat.formatDateTime(item.start)}`} */}
          {moment(item.start).utc().format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>
    </View>
  );
};
//
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 27,
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 1,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingVertical: 1,
  },
  desc: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray6,
  },
  title: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
    paddingBottom: 5,
  },
});
