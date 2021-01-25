import React, {memo, useState, useEffect} from 'react';
import moment from 'moment';
import {StyleSheet, Text, View, Image, ScrollView, Alert} from 'react-native';
//
import Button from '../../components/button';
import AlertConfirm from '../../components/alert/AlertConfirm';
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
//
import {cancelBooking} from '../../services/serviceRest';
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
import dateFormat from '../../utils/dateFormat';
//
import {useTranslation} from '../../context/LanguageContext';
//

const RowItem = props => {
  const {firstText, lastText, navigation} = props;

  return (
    <View style={styles.item}>
      <Text style={styles.firstText}>{firstText}</Text>
      <Text style={styles.lastText}>{lastText}</Text>
    </View>
  );
};
//
const BookingConfirmDoneScreen = props => {
  const {navigation, dataRecentBookingDetail, getRecentBookingDetail, setRecentBookingDetailData} = props;
  const [alertShow, setAlertShow] = useState(false);
  const {
    dataInfo,
    create_at,
    categoryName,
    name,
    dateStart,
    isCancel,
    selectedDate,
    idBooking,
    isReady,
    building,
    noCheckDate = false,
    durationCancel = 0,
  } = navigation.state.params;
  const dateConvert = new Date(moment(dateStart).utc().format('YYYY-MM-DD HH:mm'))
  // const duration = moment.duration(moment(dateConvert).diff(moment(new Date()))).asMinutes()
  const {
    t,
    i18nFacility,
    i18nFaDate,
    i18nFaTime,
    i18nFaPlace,
    i18nFaName,
    i18nFaUnit,
    i18nFaEmail,
    i18nFaPhone,
    i18nFaCed,
    i18nFaNone,
    i18nFaCancel,
    i18nFaAYSYWT,
    i18nFaGB,
  } = useTranslation();
  const [duration, setDuration] = useState(moment.duration(moment(dateConvert).diff(moment(new Date()))).asMinutes())
  //
  // useEffect(() => {
  //   console.log(navigation.state.params)
  // }, [])
  const [cancelStatus, setCancelStatus] = useState(false)
  const onCancelPress = async () => {
    //  () => onRefreshDay()
    try {
      let data = await cancelBooking(idBooking);
      if (data.status === 200) {
        navigation?.state?.params?.onDayPress()
        // if (navigation?.state?.params?.onDayPress()) {
        //   navigation.state.params.onDayPress(selectedDate);
        // }
        // navigation.goBack();
        setCancelStatus(true)
        setAlertShow(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(moment.duration(moment(dateConvert).diff(moment(new Date()))).asMinutes())
    }, 1000);
    return (() => {clearInterval(interval)})
  })
  useEffect(() => {
    if(idBooking) {
      getRecentBookingDetail(idBooking)
    }
    return () => {setRecentBookingDetailData(null)}
  }, [])
  // useEffect(() => {
  //   if(dataRecentBookingDetail) {
  //     console.log(dataRecentBookingDetail)
  //   }
  // }, [dataRecentBookingDetail])
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nFacility} />
      <BackgroundImage />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.date}>{`${i18nFaDate}: ${create_at ? dateFormat.formatDate(create_at) : ''}`}</Text>
            <Text style={styles.mainTitle}>{dataRecentBookingDetail?.facility?.name}</Text>
          </View>
          <View style={styles.titleBox}>
            <View style={styles.titleLabel}>
              <View style={{flex: 1, alignItems: 'center', marginLeft: 1}}>
                <Text style={styles.firstText}>{i18nFaPlace}</Text>
              </View>
              <View
                style={{flex: 1, alignItems: 'center', ...styles.splitBorder}}>
                <Text style={styles.firstText}>{i18nFaDate}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', marginRight: 1}}>
                <Text style={styles.firstText}>{i18nFaTime}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 4,
                alignItems: 'center',
                // paddingHorizontal: 10,
              }}>
              <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>{dataRecentBookingDetail?.building?.name || i18nFaNone}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>
                  {/* {dateFormat.formatDate(dateStart)} */}
                  {moment(dataRecentBookingDetail?.start).utc().format('DD/MM/YYYY')}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                {/* <Text style={styles.labelValue}>{moment(dateStart).format('HH:mm')}</Text> */}
                <Text style={styles.labelValue}>
                  {/* {dateFormat.formatTime(dateStart)} */}
                  {moment(dataRecentBookingDetail?.start).utc().format('HH:mm')}
                </Text>
              </View>
            </View>
          </View>
          <Image
            source={Images.dividerLight}
            style={{alignSelf: 'center', marginVertical: 10}}
          />
          <View style={styles.infoBox}>
            <RowItem firstText={i18nFaName} lastText={dataInfo?.full_name} />
            <RowItem firstText={i18nFaUnit} lastText={dataRecentBookingDetail?.unit?.house_number} />
            <RowItem firstText={i18nFaEmail} lastText={dataInfo?.email} />
            <RowItem firstText={i18nFaPhone} lastText={dataInfo?.phone} />
          </View>
        </View>
        {isReady ?
          (cancelStatus || isCancel || (!noCheckDate && duration < durationCancel)) ? null : (
          <View style={styles.button}>
            <Button
              backgroundColor={Colors.red}
              type="white"
              text={i18nFaCancel}
              onPress={() => setAlertShow(true)}
            />
          </View>
        )
        :
          null
        }
        {(cancelStatus || isCancel) && (
          <View style={styles.button}>
            <Button
              backgroundColor={Colors.gray4}
              type="white"
              disabled={true}
              // text={t('Canceled')}
              text={i18nFaCed}
              onPress={() => setAlertShow(true)}
            />
          </View>
        )}
      </ScrollView>
      <AlertConfirm
        title={i18nFaAYSYWT}
        show={alertShow}
        leftText={i18nFaGB}
        onPressCancel={() => setAlertShow(false)}
        onPressConfirm={() => onCancelPress()}
      />
    </View>
  );
};
//
export default memo(BookingConfirmDoneScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  box: {
    marginVertical: 40,
    marginHorizontal: 28,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderRadius: 10,
    ...ApplicationStyles.shadow.dynamicOffset(0, 4, undefined, 0.14, 5),
  },
  headerBox: {
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
    ...ApplicationStyles.shadow.dynamicOffset(0, 4, undefined, 0.14, 5),
  },
  date: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
    paddingTop: 16,
  },
  mainTitle: {
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    paddingTop: 11,
    paddingBottom: 22,
  },

  titleBox: {
    paddingTop: 16,
  },
  splitBorder: {
    borderLeftWidth: 0.75,
    borderRightWidth: 0.75,
    borderLeftColor: Colors.gray4,
    borderRightColor: Colors.gray4,
  },
  titleLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  labelValue: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  infoBox: {
    paddingBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  firstText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.gray6,
  },
  lastText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  termBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
});
