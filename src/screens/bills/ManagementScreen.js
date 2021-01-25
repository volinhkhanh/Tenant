import React, { memo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import numeral from 'numeral';
import Ripple from 'react-native-material-ripple';
import AsyncStorage from '@react-native-community/async-storage';
//
import { Colors, Fonts } from '../../themes';
//
import NoticeText from '../../components/text/NoticeText';
import CardAnnouncement from '../../components/card/CardAnnouncement';
import TemplateBillItem from '../../components/TemplateBillItem';
import BackgroundImage from '../../components/BackgroundImage';
import { ArrowForwardIcon } from '../../components/icons';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import dateFormat from '../../utils/dateFormat'
//
import {useTranslation} from '../../context/LanguageContext';
//
import FakeBillData from '../../fakeBillData.json'
//
function ManagementScreen(props) {
  const {
    navigation,
    getManagementBills,
    getManagementBillData,
    getManagementBillProgress,
    getGeneralInformationData,
  } = props;
  //
  const {
    t,
    i18nBillGB,
    i18nBillIncludeUnpaid,
    i18nBillP,
    i18nBillUP,
  } = useTranslation();
  //
  const [isWarningText, setWarningText] = useState(false);
  const [dateHistory, setDateHistory] = useState([]);
  const [currentBill, setCurrentBill] = useState(null);
  const [locale, setLocale] = useState('en')
  const onPressCard = (value) => {
    // var newToDate = dateFormat.formatDate(value)
    // navigation.navigate('ManagementBill', newToDate)
    navigation.navigate('ManagementBill', value)
  }
  const { total_debt } = navigation.state.params
  //
  useEffect(() => {
    getLocale()
    // navigation.addListener('willFocus', () => {
    //   setCurrentBill(null)
    // });
    var today = new Date()
    var newToDate = dateFormat.formatDate(today)
    getManagementBills({
      'status' : 'Unpaid',
      'show_detail' : 0,
    })
    navigation.addListener ('willFocus', () => {
      getManagementBills({
        'status' : 'Unpaid',
        'show_detail' : 0,
      })
    });
    var arr = []
    // for(let i = 0; i <= 2; i++){
    for(let i = 0; i <= 0; i++){
      var date = new Date();
      date.setMonth(date.getMonth() - i - 1);
      var newDate = dateFormat.formatDate(date)
      arr.push(
        {
          'name': dateFormat.formatMonthYear(date),
          'value': newDate
        }
      )
    }
    setDateHistory(arr)
    FakeBillData.map((item) => {
      if(item.unit_uuid === getGeneralInformationData?.unit_uuid) {
        setCurrentBill(item)
        setWarningText(item.status === 'Unpaid' && dateFormat.formatDate(item.due_date) < dateFormat.formatDate(today))
      }
    })
  }, [])
  
  const getLocale = async() => {
    const localeStorage = await AsyncStorage.getItem('locale');
    setLocale(localeStorage);
  }
  // useEffect(() => {
  //   setCurrentBill(getManagementBillData?.items[0])
  // }, [getManagementBillData])
  //
  const renderBill = (item) => {
    return (
      <CardAnnouncement
        overdue={isWarningText}
        style={styles.card}
        contentStyle={styles.contentCard}
        onPress={() => {onPressCard(item)}}
      >
        <View>
          <Text style={styles.timeItem}>
            {/* {dateFormat.formatMonthYear(currentBill?.start_date)} */}
            {locale === 'vi' ? dateFormat.formatMonthYearVi(item?.start_date)
            : dateFormat.formatMonthYear(item?.start_date)}
          </Text>
          {isWarningText ?
          <NoticeText text={t(`src.screens.bills.BillsScreen.O`)} /> : 
            <Text style={styles.subtitle}>
              {/* {dateFormat.formatDayMonth(currentBill?.start_date)} */}
              {locale === 'vi' ? dateFormat.formatDayMonthVi(item?.start_date)
              : dateFormat.formatDayMonth(item?.start_date)}
            </Text>
          }
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.moneyItem}>
          {/* {'-'} */}
          {item?.total > 0 && item?.status === 'Unpaid' ? `${numeral(item?.total).format('0,0')} ₫` : '-'}
          </Text>
          <Text style={styles.subtitle}>{item?.status === 'Unpaid' ? i18nBillUP : i18nBillP}</Text>
        </View>
      </CardAnnouncement>
    )
  }
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nBillGB} />
      <BackgroundImage />
      <ScrollView>
        <View style={styles.contentScroll}>
          <TemplateBillItem
            title={i18nBillGB}
            // date={
            //   currentBill
            //     ? (locale === 'vi' ? dateFormat.formatMonthYearVi(currentBill?.start_date)
            //     : dateFormat.formatMonthYear(currentBill?.start_date))
            //     : ''
            // }
            // date={currentBill ? dateFormat.formatMonthYear(currentBill?.start_date) : ''}
            price={currentBill?.total > 0 ? `${numeral(currentBill.total).format('0,0')} ₫` : '-'}
            note={i18nBillIncludeUnpaid}
            onPress={() => {}}
            disabled={true}
          />
        </View>
        <FlatList
          data={[currentBill] || []}
          keyExtractor={item => item?.id}
          contentContainerStyle={{paddingHorizontal: 25}}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderBill(item)}
        />
        <View>
        {/* { getManagementBillData && <Text style={styles.historyTitleText}>{t('History')}</Text>} */}
          {/* <View>
            { getManagementBillData && 
              dateHistory && dateHistory.map(item => {
                return (
                  <Ripple style={styles.historyItem} onPress={() => {navigation.navigate('ManagementBill', item.value)}}>
                    <Text style={styles.historyItemTitle}>
                      {item.name}
                    </Text>
                    <ArrowForwardIcon
                      size={18}
                      color={Colors.black}
                    />
                  </Ripple>
                )
              })
            }
          </View> */}
        </View>
      </ScrollView>
      {getManagementBillProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default memo(ManagementScreen);
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