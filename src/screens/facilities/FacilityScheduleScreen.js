import React, {memo, useState, useEffect} from 'react';
// import _ from 'lodash';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';
//
import {NightIcon, DayIcon, ArrowDropDownv2} from '../../components/icons';
import SquareButton from '../../components/button/SquareButton';
import AlertConfirm from '../../components/alert/AlertConfirm';
import SmallCalendar from '../../components/calendar/SmallCalendar';
import ModalSelector from '../../components/modal/ModalSelector';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {Images, Colors, Fonts} from '../../themes';
//
import dateFormat from '../../utils/dateFormat';
//
import {
  getYardListBooking,
  checkTenantBooked,
} from '../../services/serviceRest';
//
import {useTranslation} from '../../context/LanguageContext';
//
const FacilityScheduleScreen = props => {
  const {navigation, dataFacilityCategories, getGeneralInformationData} = props;
  const {
    t,
    i18nSchedule,
    i18nScheduleBooked,
    i18nScheduleAvailable,
    i18nScheduleBooking,
    i18nFaYCOCOT,
    i18nFaGB,
    i18nScheduleAm,
    i18nSchedulePm,
  } = useTranslation();
  const [loading, setLoading] = useState(false);
  const {data, id} = navigation.state.params;
  const startDate = moment(new Date()).add(-1, 'days').format('YYYY-MM-DD')
  const lastDate = moment(new Date()).add(data[id].schedule_availability, 'days').format('YYYY-MM-DD')
  const dateRange = dateFormat.enumerateDaysBetweenDates(startDate, lastDate)
  // const [dataCategories, setDataCategories] = useState([])
  const [selectedItem, setSelectedItem] = useState(data[id]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedModalVisible, setSelectedModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dataBooking, setDataBooking] = useState([]);
  const [alertShow, setAlertShow] = useState(false);
  const [dataTenantBook, setDataTenantBook] = useState(null);
  const [standardId, setStandardId] = useState(null);
  const [am, setAm] = useState([]);
  const [pm, setPm] = useState([]);
  const currentDate = moment(new Date()).format('YYYY-MM-DD')
  const currentTime = dateFormat.formatTime(new Date())
  //
  const setValue = async (keyword, val) => {
    switch (keyword) {
      case 'setSelected':
        setSelectedItem(val);
        const data = await getYardListBooking(val?.uuid, {
          date_time: selectedDate,
          current_date_time: currentDate + 'T' + currentTime + ':00.000Z'
        });
        // console.log(data)
        if (data.status === 200) {
          setDataBooking(data?.data);
        } else {
          setDataBooking([]);
        }
        break;
    }
  };
  const setModal = (keyword, val) => {
    switch (keyword) {
      case 'setSelected':
        setSelectedModalVisible(val);
        break;
    }
  };
  //
  const onDayPress = async date => {
    try {
      setLoading(true);
      // let dateNew = date?.format(dateFormat.formatDateDefaultString);
      let data = await getYardListBooking(selectedItem?.uuid, {
        date_time: date,
        current_date_time: currentDate + 'T' + currentTime + ':00.000Z'
      });
      if (data?.status === 200) {
        setDataBooking(data?.data);
      } else {
        setDataBooking([]);
      }
      setSelectedDate(date);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const onPressBooking = (dataPass, standarIdProp) => {
    navigation.navigate('BookingConfirm', {
      create_at: dataPass?.created_at,
      categoryName: dataPass?.facility_category?.name,
      // bookingPolicy: dataPass?.facility?.booking_policy,
      building: dataPass?.building,
      name: dataPass?.facility?.name,
      timeStart: dataPass?.start,
      timeEnd: dataPass?.end,
      dateTime: dataPass?.date_time,
      isCancel: false,
      dataInfo: getGeneralInformationData,
      selectedDate: selectedDate,
      standardId: standarIdProp,
      idBooking: dataPass?.facility?.id,
      uuid: dataPass?.facility?.uuid,
    });
  };

  // const onRefreshDay = async dataDate => {
  //   try {
  //     setLoading(true);
  //     let dateNew = dataDate;
  //     const data = await getYardListBooking(selectedItem?.uuid, {
  //       date_time: dateNew,
  //     });
  //     if (data.status === 200) {
  //       setDataBooking(data?.data);
  //     } else {
  //       setDataBooking([]);
  //     }
  //     setSelectedDate(dateNew);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  const onClickConfirm = () => {
    setAlertShow(false);
    navigation.navigate('BookingConfirmDone', {
      create_at: dataTenantBook?.created_at,
      categoryName: dataTenantBook?.facility?.facility_category?.name,
      // bookingPolicy: dataTenantBook?.facility?.booking_policy,
      name: dataTenantBook?.facility?.name,
      dateStart: dataTenantBook?.start,
      isCancel: false,
      isReady: true,
      dataInfo: getGeneralInformationData,
      selectedDate: selectedDate,
      idBooking: dataTenantBook?.uuid,
      selectday: selectedTime,
      onDayPress: () => {onDayPress(selectedDate)},
      noCheckDate: true,
    });
  };
  const onClickTime = async value => {
    // 0 avaiable
    //1 Booked
    // 2 TenantBooke
    // console.log(value)
    try {
      let data = await checkTenantBooked(selectedItem?.uuid, {
        date: selectedDate,
        start: value?.start,
        end: value?.end,
        // standard: value?.standard,
      });
      // setStandardId(_.parseInt(value?.standard));
      // console.log("data book",_.parseInt(value?.standard));
      if (data?.status == 400) {
        setAlertShow(true);
        setDataTenantBook(data?.data?.data_booked);
      } else if (data?.status == 200) {
        setDataTenantBook(data?.data?.data_new_booking);
        onPressBooking(
          data?.data?.data_new_booking,
          value?.standard,
        );
      } else {
        setDataTenantBook([]);
      }
    } catch (error) {
      console.log('error check', error);
    }
  };
  // useEffect(() => {
  //   navigation.addListener('willFocus', () => {
  //     // setDataBooking([])
  //     // setDataTenantBook(null)
  //     // setSelectedDate(null)
  //     if(selectedDate) {
  //       console.log('ss212ss')
  //       onDayPress(selectedDate)
  //     }
  //   });
  // })
  useEffect(() => {
    if(dataBooking) {
      setPm(dataBooking?.filter(item => moment(item?.start).utc().format('HH') > 11))
      setAm(dataBooking?.filter(item => moment(item?.start).utc().format('HH') < 12))
    }
  }, [dataBooking])
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nSchedule} />
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <Ripple
          style={styles.selector}
          onPress={() => {
            selectedModalVisible.open();
          }}>
          <Text style={[styles.textSelector, {color: Colors.black}]}>
            {selectedItem.name}
          </Text>
          <ArrowDropDownv2 fill={Colors.mainColor} />
        </Ripple>
        <Image
          source={Images.dividerLight}
          style={{
            marginVertical: 15,
            width: '100%',
          }}
        />
        <View style={{paddingTop: 10, paddingBottom: 20}}>
          <SmallCalendar onChangeSelectDate={onDayPress} dateRange={dateRange} navigation={navigation} />
        </View>
        {selectedDate && (
          <>
            <View style={styles.timelineTitle}>
              <DayIcon size={18} />
              <Text style={styles.titleText}>{i18nScheduleAm}</Text>
            </View>
            <View style={styles.timelineBox}>
              {am?.length > 0 &&
                am.map(value => {
                  // if (value?.standard == 0) {
                    return (
                      <View key={value?.start}>
                        <SquareButton
                          size="medium"
                          type={value.type}
                          // text={dateFormat.formatTime(value?.start) + '-' + dateFormat.formatTime(value?.end)}
                          text={moment(value?.start).utc().format('HH:mm') + '-' + moment(value?.end).utc().format('HH:mm')}
                          fixedWidth
                          onPress={() => onClickTime(value)}
                        />
                      </View>
                    );
                  // }
                })}
              <View style={{minWidth: 93}} />
              <View style={{minWidth: 93}} />
              <View style={{minWidth: 93}} />
            </View>
            <View style={styles.timelineTitle}>
              <NightIcon size={18} />
              <Text style={styles.titleText}>{i18nSchedulePm}</Text>
            </View>
            <View style={styles.timelineBox}>
              {pm?.length > 0 &&
                pm.map(value => {
                  // if (value?.standard == 1) {
                    return (
                      <View key={value?.start}>
                        <SquareButton
                          size="medium"
                          type={value.type}
                          text={moment(value?.start).utc().format('HH:mm') + '-' + moment(value?.end).utc().format('HH:mm')}
                          fixedWidth
                          onPress={() => onClickTime(value)}
                        />
                      </View>
                    );
                  // }
                })}
              <View style={{minWidth: 93}} />
              <View style={{minWidth: 93}} />
              <View style={{minWidth: 93}} />
            </View>
            <View
              style={[
                styles.timelineBox,
                {paddingVertical: 25, paddingHorizontal: 50},
              ]}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 15,
                    height: 10,
                    backgroundColor: Colors.gray6,
                    borderWidth: 0.3,
                    marginHorizontal: 10,
                  }}
                />
                <Text style={styles.status}>{i18nScheduleBooked}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 15,
                    height: 10,
                    borderWidth: 0.3,
                    marginHorizontal: 10,
                  }}
                />
                <Text style={[styles.status, {color: Colors.mainColor}]}>
                  {i18nScheduleAvailable}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 15,
                    height: 10,
                    marginHorizontal: 10,
                    borderWidth: 0.3,
                    backgroundColor: Colors.mainColor,
                  }}
                />
                <Text style={[styles.status, {color: Colors.mainColor}]}>
                  {i18nScheduleBooking}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <AlertConfirm
        title={i18nFaYCOCOT}
        show={alertShow}
        leftText={i18nFaGB}
        onPressCancel={() => setAlertShow(false)}
        onPressConfirm={() => {
          onClickConfirm();
        }}
      />
      <ModalSelector
        setModal={setModal}
        setItem={setValue}
        data={data}
        checkData={selectedItem}
        modalVisible={selectedModalVisible}
        keyword={'setSelected'}
      />
      {loading ? <DimSpinnerView /> : null}
    </View>
  );
};
//
export default memo(FacilityScheduleScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  timelineTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  contentScroll: {
    paddingBottom: 50,
  },
  select: {
    position: 'relative',
    zIndex: 2,
    paddingTop: 27,
    width: '60%',
    paddingHorizontal: 25,
  },
  titleText: {
    ...Fonts.style.subtitleSemibold,
    color: Colors.gray1,
  },
  timelineBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  containerCalendar: {
    backgroundColor: 'white',
    position: 'relative',
    zIndex: 2,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginTop: 20,
  },
  textSelector: {
    fontSize: Fonts.size.h3,
    color: Colors.textColor.gray3,
    fontFamily: Fonts.type.base,
    marginRight: 30,
  },
  imageArrowDown: {
    width: 25,
    height: 25,
  },
  status: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.gray2,
  },
});
