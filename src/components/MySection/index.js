import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, ApplicationStyles} from '../../themes';
import {useTranslation} from '../../context/LanguageContext';

export function MySection({children, confirm = {}}) {
  const {
    t,
    i18nMovingListMd,
    i18nMovingListEL,
    i18nMovingListPL,
    i18nMovingListSch,
    i18nMovingListVM,
    i18nMovingListNa,
    i18nMovingListUn,
    i18nMovingListEm,
    i18nMovingListPh,
    i18nMovingListVe,
  } = useTranslation();
  console.log(confirm)
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>{confirm.title}</Text>
        <Text style={styles.subTitle}>{confirm.date}</Text>
      </View>
      <View style={styles.bodyBox}>
        {children ?? (
          <View>
            <View style={styles.row}>
              <Text style={styles.rowKey}>{i18nMovingListMd}</Text>
              <Text style={styles.rowValue}>{confirm.movingDate}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowKey}>{`${i18nMovingListEL} ${i18nMovingListSch}`}</Text>
              <Text style={styles.rowValue}>{confirm.elevatorSchedule}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowKey}>{`${i18nMovingListPL} ${i18nMovingListSch}`}</Text>
              <Text style={styles.rowValue}>{confirm.parkingLotSchedule}</Text>
            </View>
            { confirm?.vehicle &&
              <View style={styles.row}>
                <Text style={styles.rowKey}>{i18nMovingListVe}</Text>
                <Text style={styles.rowValue}>{confirm.vehicle}</Text>
              </View>
            }
            <View style={styles.row}>
              <Text style={styles.rowKey}>{i18nMovingListVM}</Text>
              <Text style={styles.rowValue}>{confirm.visitor}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowKey}>{i18nMovingListNa}</Text>
              <Text style={styles.rowValue}>{confirm.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowKey}>{i18nMovingListUn}</Text>
              <Text style={styles.rowValue}>{confirm.unit}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowKey}>{i18nMovingListEm}</Text>
              <Text style={styles.rowValue}>{confirm.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowKey}>{i18nMovingListPh}</Text>
              <Text style={styles.rowValue}>{confirm.phone}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...ApplicationStyles.boxShadow,
  },
  headerBox: {
    paddingVertical: 25,
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFF',
    ...ApplicationStyles.boxShadow,
  },
  title: {
    fontSize: 20,
    color: '#000000',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 14,
    color: '#CACACA',
  },
  bodyBox: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rowKey: {
    fontSize: 16,
    textAlign: 'center',
    color: '#CACACA',
  },
  rowValue: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
  },
  divider: {
    borderColor: '#CACACA',
    borderWidth: 0.5,
    marginBottom: 15,
  },
});
