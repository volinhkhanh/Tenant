import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
//
import { Colors, Fonts } from '../../themes';
//
import DateFormat from '../../utils/dateFormat'
//
export const ElectionHistoryItem = props => {
  const { item = {} } = props;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>{item?.facility?.booking_policy}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.desc}>
        {`${DateFormat.formatDateElection(item?.election_start_date)} - ${DateFormat.formatDateElection(item?.election_end_date)}`}
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
    borderBottomWidth: 0.3,
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
