import React, {memo, useState, useEffect} from 'react';
import _ from 'lodash';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Colors, Fonts} from '../../themes/';
import Ripple from 'react-native-material-ripple';
import numeral from 'numeral';
import AsyncStorage from '@react-native-community/async-storage';
//
import NoticeText from '../../components/text/NoticeText';
import CardAnnouncement from '../../components/card/CardAnnouncement';
import BackgroundImage from '../../components/BackgroundImage';
import TemplateBillItem from '../../components/TemplateBillItem';
import {ArrowForwardIcon} from '../../components/icons';
import MainHeader from '../../components/MainHeader';
//
import {useTranslation} from '../../context/LanguageContext';
//
import dateFormat from '../../utils/dateFormat'
//
import FakeElectricityBillData from '../../fakeElectricityBillData.json'
//
function ElectricityScreen(props) {
  const {navigation} = props;
  const data = navigation.state.params
  // const selectTypeName = navigation.state.params
  //   ? navigation.state.params.selectTypeName
  //   : '';
  // const firstSelectedType = _.find(dataType, i => i.name === selectTypeName);
  // const [selectType, setSelectType] = useState(
  //   firstSelectedType || dataType[0],
  // );
  //
  const {
    t,
    i18nBillEB,
    i18nBillIncludeUnpaid,
    i18nBillP,
    i18nBillUP,
  } = useTranslation();
  //
  const [isWarningText, setWarningText] = useState(false);
  const [locale, setLocale] = useState('en')
  //
  const onPressCard = () =>
  navigation.navigate(
    'ElectricityBill', data
  );
  //
  useEffect(() => {
    getLocale()
    const date = new Date()
    setWarningText(data?.status === 'Unpaid' && dateFormat.formatDate(data?.due_date) < dateFormat.formatDate(date))
  }, [])
  //
  const getLocale = async() => {
    const localeStorage = await AsyncStorage.getItem('locale');
    setLocale(localeStorage);
  }
    // navigation.navigate(
    //   'ElectricityBill',
    //   selectType.name === 'Electricity' ? 'ElectricityBill' : 'ManagementBill',
    // );
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nBillEB} />
      <BackgroundImage />
      <ScrollView>
        <View style={styles.contentScroll}>
          <TemplateBillItem
            disabled={true}
            title={i18nBillEB}
            // date={data ? dateFormat.formatMonthYear(data?.start_date) : ''}
            date={
              data
                ? (locale === 'vi' ? dateFormat.formatMonthYearVi(data?.start_date)
                : dateFormat.formatMonthYear(data?.start_date))
                : ''
            }
            price={data?.total > 0 && data?.status === 'Unpaid' ? `${numeral(data?.total).format('0,0')} ₫` : '-'}
            note={i18nBillIncludeUnpaid}
            onPress={() => {}}
          />
          {
            data && 
            <View style={styles.card}>
              <CardAnnouncement
                overdue={isWarningText}
                style={styles.card1}
                contentStyle={styles.contentCard}
                onPress={() => {onPressCard(data?.start_date)}}
              >
                <View>
                  <Text style={styles.timeItem}>
                    {/* {dateFormat.formatMonthYear(data?.start_date)} */}
                    {data
                    ? (locale === 'vi' ? dateFormat.formatMonthYearVi(data?.start_date)
                    : dateFormat.formatMonthYear(data?.start_date))
                    : ''}
                  </Text>
                  {isWarningText ? 
                  <NoticeText text={t(`src.screens.bills.BillsScreen.O`)} /> : 
                    <Text style={styles.subtitle}>
                      {/* {dateFormat.formatDayMonth(data?.start_date)} */}
                      {data 
                        ? locale === 'vi' ? dateFormat.formatDayMonthVi(data?.start_date)
                        : dateFormat.formatDayMonth(data?.start_date)
                        : ''
                      }
                    </Text>
                  }
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.moneyItem}>
                  {/* {'-'} */}
                  {data?.total > 0 ? `${numeral(data?.total).format('0,0')} ₫` : '-'}
                  </Text>
                  <Text style={styles.subtitle}>{data?.status === 'Unpaid' ? i18nBillUP : i18nBillP}</Text>
                </View>
              </CardAnnouncement>
            </View>
          }
        </View>
      </ScrollView>
    </View>
  );
}
//
export default memo(ElectricityScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  selectitem: {
    flex: 1,
    paddingLeft: 10,
    borderRadius: 5,
    paddingVertical: 10,
    borderColor: Colors.gray2,
    borderWidth: 0.5,
  },
  cardL: {
    minHeight: 100,
    paddingTop: 20,
  },
  contentScroll: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  card: {
    marginVertical: 16,
  },
  card1: {
    marginVertical: 7,
  },
  contentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  history: {},
  historyTitleText: {
    padding: 25,
    ...Fonts.style.bodyMedium,
    color: Colors.gray1,
  },
  subtitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
    paddingTop: 7,
  },
  historyItem: {
    padding: 15,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.borderColor.gray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyItemTitle: {
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    paddingLeft: 30,
  },
  timeItem: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  moneyItem: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
});
//
const dataType = [
  {
    id: '1',
    name: 'Electricity',
  },
  {
    id: '2',
    name: 'Management',
  },
];
const dataBill = {
  Electricity: {
    card: {
      time: 'Mar 2020',
      money: '734,000₫',
    },

    listCardAnnounement: [
      // {
      //   id: '1',
      //   time: 'Mar 2020',
      //   money: '431,000₫',
      //   isPay: 'Unpaid',
      //   status: 'Overdue',
      // },
      {
        id: '2',
        time: 'Jul 2020',
        money: '423,000₫',
        isPay: 'Paid',
        status: 'D - 3',
      },
    ],
  },
  Management: {
    card: {
      time: 'Mar 2020',
      money: '-',
      hiddenLinkBillDetail: true,
    },
    listCardAnnounement: [
      {
        id: '1',
        time: 'Mar 2020',
        money: '-',
        isPay: 'No Bill',
        status: '26th Mar',
        hiddenLinkBillDetail: true,
      },
    ],
  },
};
