import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import AsyncStorage from '@react-native-community/async-storage';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes/';
//
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
import TemplateBillItem from '../../components/TemplateBillItem';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import Layouts from '../../constants/Layouts';
//
import dateFormat from '../../utils/dateFormat';
//
import {useTranslation} from '../../context/LanguageContext';
//
import FakeBillData from '../../fakeBillData.json'
import FakeElectricityBillData from '../../fakeElectricityBillData.json'
//
const {width} = Layouts;
//
function BillsScreen(props) {
  const {
    navigation,
    totalDebtBillData,
    getTotalDebtBillProgress,
    getTotalDebtBills,
    getGeneralInformationData,
  } = props;
  //
  const {
    t,
    i18nBill,
    i18nBillEB,
    i18nBillGB,
    i18nBillIncludeUnpaid
  } = useTranslation();
  //
  const [locale, setLocale] = useState('en')
  const [managementBill, setManagementBill] = useState(null)
  const [electricBill, setElectricBill] = useState(null)
  //
  useEffect(() => {
    getLocale()
    var today = new Date();
    var newToDate = dateFormat.formatDate(today);
    getTotalDebtBills({
      status: 'Unpaid',
      show_detail: 0,
    })
    // getManagementBills({
    //   startDate: newToDate,
    //   unit_id: getGeneralInformationData.unit_id,
    // });
    // navigation.addListener('willFocus', () => {
    //   getManagementBills({
    //     startDate: newToDate,
    //     unit_id: getGeneralInformationData.unit_id,
    //   });
    // });
    FakeBillData.map((item) => {
      if(item.unit_uuid === getGeneralInformationData?.unit_uuid) {
        setManagementBill(item)
      }
    })
    FakeElectricityBillData.map((item) => {
      if(item.unit_uuid === getGeneralInformationData?.unit_uuid) {
        setElectricBill(item)
      }
    })
  }, []);
  //
  async function getLocale() {
    const localeStorage = await AsyncStorage.getItem('locale');
    setLocale(localeStorage);
  }
  //
  // useEffect(() => {
  //   console.log(totalDebtBillData)
  // }, [totalDebtBillData])
  //
  // console.log(getManagementBillData?.start_date);

  // function formatStartDate(start_date) {
  //   const date = new Date(start_date);
  //   return `T${date.getMonth() + 1} ${date.getFullYear()}`;
  // }
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nBill} />
      <BackgroundImage />
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <TemplateBillItem
          title={i18nBillEB}
          date={
            electricBill
              ? (locale === 'vi' ? (dateFormat.formatMonthYearVi(electricBill?.start_date))
              : dateFormat.formatMonthYear(electricBill?.start_date))
              : ''
          }
          price={
            electricBill?.total > 0 && electricBill?.status === 'Unpaid'
              ? `${numeral(electricBill?.total).format('0,0')} ₫`
              : '-'
          }
          note={i18nBillIncludeUnpaid}
          onPress={() => {
            navigation.navigate('Electricity', electricBill);
          }}
        />
        <TemplateBillItem
          title={i18nBillGB}
          date={
            managementBill
              ? (locale === 'vi' ? (dateFormat.formatMonthYearVi(managementBill?.start_date))
              : dateFormat.formatMonthYear(managementBill?.start_date))
              : ''
          }
          price={
            managementBill?.total > 0 && managementBill?.status === 'Unpaid'
              ? `${numeral(managementBill?.total).format('0,0')} ₫`
              : '-'
          }
          // price={
          //   totalDebtBillData?.total_debt > 0
          //     ? `${numeral(totalDebtBillData?.total_debt).format('0,0')} ₫`
          //     : '-'
          // }
          note={i18nBillIncludeUnpaid}
          onPress={() => {
            navigation.navigate('Management', {total_debt: totalDebtBillData?.total_debt});
          }}
        />
      </ScrollView>
      {getTotalDebtBillProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default memo(BillsScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  billContent: {
    marginVertical: 20,
    width: width - 50,
    height: (516 * (width - 50)) / 1077,
    borderRadius: 10,
    ...ApplicationStyles.shadow.dynamicOffset(1, 4, undefined, 0.15, 8),
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  billHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billTitle: {
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.medium,
  },
  billDate: {
    fontSize: Fonts.size.h4,
    color: Colors.textColor.gray6,
  },
  billPrice: {
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.medium,
    textAlign: 'right',
  },
  divideDot: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  billNote: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.light,
    color: Colors.textColor.gray7,
    textAlign: 'right',
  },
});
