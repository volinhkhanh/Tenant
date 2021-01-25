import React, {useEffect, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import AsyncStorage from '@react-native-community/async-storage';
//
import { DeleteIcon } from '../../components/icons'
//
import { Colors, Fonts } from '../../themes'
//
import dateFormat from '../../utils/dateFormat'
//
export const TableListItem2 = props => {
  const { date, type, quantity, onPressClearButton } = props
  const [locale, setLocale] = useState('en')
  let dateConvert = date.split("/");
  var dataTrueFormat = dateConvert[2] + '/' + dateConvert[1] + '/' + dateConvert[0]
  //
  useEffect(() => {
    getLocale()
  }, [])
  //
  async function getLocale() {
    const localeStorage = await AsyncStorage.getItem('locale');
    setLocale(localeStorage);
  }
  //
  return (
    <View style={styles.item}>
      <View style={styles.content}>
        <Text style={styles.itemText}>
          {locale === 'vi' ? dateFormat.formatDayMonthVi(dataTrueFormat) : dateFormat.formatDayMonth(dataTrueFormat)}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.itemText}>{type}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.itemText}>{quantity}</Text>
      </View>
      <View style={styles.content}>
        <Ripple style={styles.delIcon} onPress={onPressClearButton}>
          <DeleteIcon size={24} />
        </Ripple>
      </View>
    </View>
  );
};
//
const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  itemText: {
    ...Fonts.style.captionMedium,
    color: Colors.gray2,
  },
  delIcon: {
    padding: 5,
    backgroundColor: Colors.whiteGray,
    borderRadius: 999,
  },
});
