import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import numeral from 'numeral';
import AsyncStorage from '@react-native-community/async-storage';
//
import { ApplicationStyles, Colors, Fonts, Images } from '../themes';
//
import dateFormat from '../utils/dateFormat'
//
import {useTranslation} from '../context/LanguageContext';
//
const TemplateManagementBill = props => {
  const { data = {} } = props;
  const { title, billData } = data;
  const [locale, setLocale] = useState('en')
  //
  const {
    t,
    i18nBillGB,
    i18nBillIncludeUnpaid,
    i18nBillP,
    i18nBillUP,
    i18nBillTotal,
    i18nBillDueDate,
    i18nBillVat,
  } = useTranslation();
  //
  useEffect(() => {
    getLocale()
  }, [])
  //
  const getLocale = async() => {
    const localeStorage = await AsyncStorage.getItem('locale');
    setLocale(localeStorage);
  }
  //
  return (
    <View style={styles.container}>
    {
      billData &&
      <View style={styles.billContent}>
        <View style={{...ApplicationStyles.boxShadow}}>
          <ImageBackground source={Images.intersect} style={styles.image}>
            <View style={[styles.item, { paddingTop: 20 }]}>
              <Text style={[styles.leftText]}>
                {/* {dateFormat.formatMonthYear(billData?.start_date)} */}
                {locale === 'vi' ? dateFormat.formatMonthYearVi(billData?.start_date)
                : dateFormat.formatMonthYear(billData?.start_date)}
              </Text>
              <Text style={styles.leftText}>{billData?.status === 'Unpaid' ? i18nBillUP : i18nBillP}</Text>
            </View>
            <View style={styles.titleBox}>
              <Text style={styles.titleText}>{title}</Text>
              {
                billData?.paid_date && 
                <Text style={styles.subTitleText}>
                  {/* {dateFormat.formatDate(billData?.start_date)} */}
                  {dateFormat.formatDate(billData?.paid_date)}
                </Text>
              }
            </View>
          </ImageBackground>
        </View>
        <View style={styles.content}>
          <Image source={Images.dividerDot} style={styles.dotLine} />
          {
            billData?.bill_categories?.map(item => {
              return (
                <View style={styles.item}>
                  <Text style={styles.subLeftText}>
                    {/* {item.fee_category} */}
                    {t(`src.screens.bills.BillsScreen.${item.fee_category}`)}
                  </Text>
                  <Text style={styles.subRightText}>
                    {`${numeral(item.subtotal_price).format('0,0')} ₫`}
                  </Text>
                </View>
              )
            })
          }
          <Image source={Images.dividerDot} style={styles.dotLine} />
          <View style={styles.item}>
            <Text style={styles.subLeftText}>{i18nBillVat} {billData?.vat_percent}%</Text>
            <Text style={styles.subRightText}>{`${numeral(billData?.total - billData?.subtotal).format('0,0')} ₫`}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.subLeftText}>{i18nBillDueDate}</Text>
            <Text style={styles.subRightText}>
              {billData?.due_date ? dateFormat.formatDate(billData.due_date) : ''}
            </Text>
          </View>
          <Image source={Images.divider} style={{ alignSelf: 'center', marginVertical: 10 }} />
          <View style={styles.item}>
            <Text style={styles.totalText}>{i18nBillTotal}</Text>
            <Text style={styles.totalText}>
              {`${numeral(billData?.total).format('0,0')} ₫`}
            </Text>
          </View>
        </View>
      </View>
    }
    </View>
  );
};
//
export default TemplateManagementBill;
//
const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  billContent: {
    paddingHorizontal: 25,
  },
  image: {
    width: '100%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 27,
    paddingVertical: 12,
  },
  leftText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  subLeftText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.gray6,
  },
  subRightText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
    paddingBottom: 10,
  },
  subTitleText: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.light,
    color: Colors.gray4,
    lineHeight: 20,
  },
  content: {
    backgroundColor: '#FFFDFD',
    borderTopColor: 'transparent',
    width: '100%',
    paddingBottom: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 15,
  },
  totalText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  totalLabel: {
    ...Fonts.style.subtitleMedium,
    color: Colors.textColor.gray1,
  },
  dotLine: {
    width:'90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
});
