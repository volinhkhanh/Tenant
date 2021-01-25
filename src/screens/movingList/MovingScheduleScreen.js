import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
//
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
import SpinnerView from '../../components/SpinnerView';
import SquareButton from '../../components/button/SquareButton';
import {NightIcon, DayIcon, ArrowDropDownv2} from '../../components/icons';
import {Colors, Fonts} from '../../themes';
import {useTranslation} from '../../context/LanguageContext';
import dateFormat from '../../utils/dateFormat';
import Button from '../../components/button';
const MovingScheduleScreen = props => {
  const {
    navigation,
    movingScheduleData,
    getMovingScheduleProgress,
    getMovingSchedule,
    movingElevatorData,
    movingParkingData,
    setElevatorScheduleData,
    setParkingScheduleData,
  } = props;
  //
  const {
    i18nScheduleAm,
    i18nSchedulePm,
    i18nScheduleBooked,
    i18nScheduleAvailable,
    i18nScheduleBooking,
    i18nMovingListELS,
    i18nMovingListPLS,
    i18nMovingListSch,
    i18nMovingListSNTC,
    i18nMovingListTSSMBC,
    i18nMovingListSa,
    i18nFaNone,
  } = useTranslation();
  const params = navigation.state?.params
  const [selectedTime, setSelectedTime] = useState([]);
  const onClickTime = async (value, index) => {
    const countScheduleBooked = movingScheduleData?.schedule?.filter(item => item?.type == 2)?.length
    const selectedItem = selectedTime?.filter(item => item?.start === value?.start && item?.end === value?.end)[0]
    const arrayIndex = selectedTime?.indexOf(selectedItem)
    if(arrayIndex > -1) {
      selectedTime.splice(arrayIndex, 1)
      setSelectedTime([...selectedTime])
    } else {
      if(selectedTime?.length + countScheduleBooked <= movingScheduleData?.slot_per_day) {
        setSelectedTime([...selectedTime ,{...value, index}].sort((a, b) => (a.index > b.index) ? 1 : -1))
      }
    }
  };
  const checkConsecutive = (array) => {
    let flag = 0
    array?.map((value, index) => {
      if(array[index + 1]?.index - value?.index !== 1) {
        flag++
      }
    })
    return flag > 1 ? false : true
  }
  useEffect(() => {
    getMovingSchedule(navigation.state.params)
  }, [])
  const saveSchedule = () => {
    if(selectedTime?.length > 0) {
      const check = checkConsecutive(selectedTime)
      if(check) {
        params?.moving_schedule_type === 'PARKING' ? setParkingScheduleData(selectedTime) : setElevatorScheduleData(selectedTime);
        navigation.pop()
      } else {
        Toast.show(i18nMovingListTSSMBC)
      }
    } else {
      Toast.show(i18nMovingListSNTC)
    }
  }
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={`${params?.moving_schedule_type === 'ELEVATOR' ? i18nMovingListELS : i18nMovingListPLS}`}
      />
      <ScrollView style={styles.content} contentContainerStyle={{paddingBottom: 30}}>
        <View style={styles.dateContent}>
          <Text style={styles.dateText}>
            {dateFormat.formatDate(params?.date_time)}
          </Text>
        </View>
        <View style={styles.timeLineContent}>
          <View style={styles.timelineTitle}>
            <DayIcon size={18} />
            <Text style={styles.titleText}>{i18nScheduleAm}</Text>
          </View>
          <View style={styles.timelineBox}>
            {movingScheduleData?.schedule?.length > 0 &&
              movingScheduleData?.schedule?.map((value, index) => {
                if(moment(value?.start).utc().format('HH') < 12) {
                  return (
                    <View key={value?.start}>
                      <SquareButton
                        size="medium"
                        type={selectedTime.filter(item => item?.start === value?.start && item.end === value?.end).length > 0 ? 3 : value?.type}
                        text={moment(value?.start).utc().format('HH:mm') + '-' + moment(value?.end).utc().format('HH:mm')}
                        fixedWidth
                        onPress={() => onClickTime(value, index)}
                      />
                    </View>
                  );
                }
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
            {movingScheduleData?.schedule?.length > 0 &&
              movingScheduleData?.schedule?.map((value, index) => {
                if(moment(value?.start).utc().format('HH') > 11) {
                  return (
                    <View key={value?.start}>
                      <SquareButton
                        size="medium"
                        type={selectedTime.filter(item => item.start === value.start && item.end === value.end).length > 0 ? 3 : value.type}
                        text={moment(value?.start).utc().format('HH:mm') + '-' + moment(value?.end).utc().format('HH:mm')}
                        fixedWidth
                        onPress={() => onClickTime(value, index)}
                      />
                    </View>
                  );
                }
              })}
            <View style={{minWidth: 93}} />
            <View style={{minWidth: 93}} />
            <View style={{minWidth: 93}} />
          </View>
          <View
            style={[
              styles.timelineBox,
              {paddingVertical: 25},
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
        </View>
        <View style={styles.buttonBox}>
          <Button
            text={i18nFaNone}
            style={styles.editButton}
            backgroundColor="white"
            type="main"
            onPress={() => {
              params?.moving_schedule_type === 'PARKING' ? setParkingScheduleData(i18nFaNone) : setElevatorScheduleData(i18nFaNone)
              navigation.pop()
            }}
          />
          <Button
            text={i18nMovingListSa}
            style={styles.submitButton}
            onPress={() => saveSchedule()}
          />
        </View>
      </ScrollView>
    </View>
  );
};
//
export default memo(MovingScheduleScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  dateContent: {
    borderWidth: 0.5,
    borderColor: Colors.gray4,
    padding: 15,
    marginTop: 40,
    backgroundColor: 'white',
  },
  dateText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
  },
  timeLineContent: {
    marginTop: 40,
  },
  timelineTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
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
  },
  buttonBox: {
    marginTop: 50,
    flexDirection: 'row',
  },
  editButton: {
    flex: 1,
    marginRight: 15,
    borderColor: '#F6CA13',
    borderWidth: 1,
  },
  submitButton: {
    flex: 1,
  },
});
