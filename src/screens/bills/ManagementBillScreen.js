import React, { memo, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
//
import { Colors, Fonts } from '../../themes';
//
import TemplateManagementBill from '../../components/TemplateManagementBill';
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {useTranslation} from '../../context/LanguageContext';
//
function ManagementBillScreen(props) {
  const {
    navigation,
    billDetailData,
    getBillDetailProgress,
    getBillDetail,
  } = props;
  //
  const {
    t,
    i18nBillGB,
    i18nBillBD,
  } = useTranslation();
  const params = navigation.state.params
  //
  useEffect(() => {
    // const params = navigation.state.params
    // getBillDetail(params?.uuid, {
    //   show_detail : 0,
    // })
  }, [])
  // useEffect(() => {
  //   console.log(billDetailData)
  //   setData(billDetailData)
  // }, [billDetailData])
  
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nBillBD} />
      <BackgroundImage />
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <TemplateManagementBill
          data={{
            title: i18nBillGB,
            billData: params || []
          }}
        />
      </ScrollView>
      {getBillDetailProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default memo(ManagementBillScreen);
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
  },
  cardL: {
    minHeight: 100,
    paddingTop: 20,
  },
  contentScroll: {
    paddingTop: 20,
  },
  card: {
    marginTop: 16,
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
  historyTitleText: {
    paddingVertical: 5,
    ...Fonts.style.bodyMedium,
    color: Colors.gray1,
  },
  subtitle: {
    ...Fonts.style.bodySemibold,
    color: Colors.gray4,
  },
});
