import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import moment from 'moment';
import Ripple from 'react-native-material-ripple';
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
import MainHeader from '../../components/MainHeader';
import {MyProgressSteps} from '../../components/MyProgressSteps';
import {KeyboardAvoidingView} from '../utils';
import ClockSvg from '../../assets/images/movingList/clock.svg';
import MotorcyclePng from '../../assets/images/movingList/motorcycle.png';
import TruckPng from '../../assets/images/movingList/truck.png';
import QuantityChoosen from '../../components/QuantityChoosen';
import Button from '../../components/button';
import dateFormat from '../../utils/dateFormat';
import ModalCalendar from '../../components/modal/ModalCalendar';
import {useTranslation} from '../../context/LanguageContext';
import { add } from 'numeral';

export default function MovingReservationScreen(props) {
  // console.log(navigation);
  const {
    navigation,
    getMovingVehicleProgress,
    movingVehicleData,
    getMovingVehicle,
    movingElevatorData,
    movingParkingData,
    setElevatorScheduleData,
    setParkingScheduleData,
    putUpdateMovingRequest,
  } = props;
  const {
    t,
    i18nModalCalendarSc,
    i18nModalCalendarDo,
    i18nMovingListAIAR,
    i18nMovingListR,
    i18nMovingListMd,
    i18nMovingListPSATS,
    i18nMovingListEL,
    i18nMovingListPL,
    i18nMovingListSch,
    i18nMovingListVM,
    i18nMovingListS,
    i18nMovingListAp,
    i18nMovingListB,
    i18nMovingListC,
    i18nMovingListSui,
    i18nMovingListSu,
    i18nMovingListAbo,
    i18nMovingListBo,
    i18nMovingListCed,
    ItemsAreRequired,
    i18nMovingListPSAVTFYPL,
    i18nMovingListNe,
    i18nFaNone,
  } = useTranslation();
  const steps = [
    {
      id: 1,
      status: 'SUBMITTED',
      name: i18nMovingListSui,
      finishName: i18nMovingListSu,
    },
    {
      id: 2,
      status: 'APPROVED',
      name: i18nMovingListAbo,
      finishName: i18nMovingListAp,
    },
    {
      id: 3,
      status: 'BOOKED',
      name: i18nMovingListB,
      finishName: i18nMovingListBo,
    },
    {
      id: 4,
      status: 'ADMIN_CONFIRMED',
      name: i18nMovingListC,
      finishName: i18nMovingListCed,
    },
  ];
  const today = new Date();
  const movingData = navigation?.state?.params?.movingDetail
  const [currentState, setCurrentState] = useState('BOOKED');
  const [elevatorTime, setElevatorTime] = useState('');
  const [parkingLotTime, setParkingLotTime] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [selectedDate, setSelectedDate] = useState(movingData?.move_out_date);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageVehicle, setErrorMessageVehicle] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getMovingVehicle()
    return () => {
      setElevatorScheduleData(null);
      setParkingScheduleData(null);
    }
  }, [])

  // useEffect(() =>{
  //   console.log(movingVehicleData)
  // }, [movingVehicleData])

  useEffect(() =>{
    movingElevatorData && setElevatorTime(movingElevatorData)
  }, [movingElevatorData])

  useEffect(() =>{
    if(movingParkingData){
      setParkingLotTime(movingParkingData)
      movingParkingData === i18nFaNone && setSelectedVehicle(0)
    }
  }, [movingParkingData])

  function handlePickTime(type) {
    let params = {
      date_time: dateFormat.formatDefaultDate(selectedDate),
      current_date_time: dateFormat.formatDefaultDate(today) + 'T' + dateFormat.formatTime(today) + ':00.000Z',
      moving_schedule_type: '',
    }
    switch (type) {
      case 'ELEVATOR':
        params.moving_schedule_type = 'ELEVATOR';
        navigation.navigate('MovingSchedule', params)
        break;
      default:
        params.moving_schedule_type = 'PARKING';
        navigation.navigate('MovingSchedule', params)
        break;
    }
  }

  function handlePickVehicle(id) {
    (setSelectedVehicle(id))
  }

  const handleNext = async() => {
    if (elevatorTime === '' || parkingLotTime === '') {
      setErrorMessage(
        ItemsAreRequired,
      );
      return
    }
    if (parkingLotTime?.length > 0 && parkingLotTime !== i18nFaNone && selectedVehicle == 0) {
      setErrorMessageVehicle(i18nMovingListPSAVTFYPL);
    }
     else {
      const params = {
        type : movingData?.type,
        status: movingData?.status,
        move_out_date: dateFormat.formatDefaultDate(selectedDate),
        visitor_number: quantity,
        vehicle_id: selectedVehicle,
        schedule: [
            ...(elevatorTime?.length > 0 && elevatorTime !== i18nFaNone ? [{
              start_time: dateFormat.formatDefaultDateTime(elevatorTime[0]?.start),
              end_time: dateFormat.formatDefaultDateTime(elevatorTime[elevatorTime?.length - 1]?.end),
              type: "ELEVATOR"
            }] : []),
            ...(parkingLotTime?.length > 0 && parkingLotTime !== i18nFaNone ? [{
              start_time: dateFormat.formatDefaultDateTime(parkingLotTime[0]?.start),
              end_time: dateFormat.formatDefaultDateTime(parkingLotTime[parkingLotTime?.length - 1]?.end),
              type: "PARKING"
            }] : []),
        ]
      }
      // console.log(elevatorTime)
      // console.log(parkingLotTime)
      const vehicle = movingVehicleData?.items?.filter(item => item?.id == selectedVehicle)?.[0]
      navigation.navigate('MovingBookingConfirm', 
        {uuid: movingData?.uuid,
          elevatorTime: elevatorTime,
          parkingLotTime: parkingLotTime,
          vehicle: vehicle?.name,
          params,
          type: 'BOOKED',
          movingData
        })
    }
    // const data = await putUpdateMovingRequest(movingData?.uuid, params)
    // if(data) {
    //   navigation.navigate('MovingBookingConfirm');
    // }
  }

  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nMovingListR} />
      <KeyboardAvoidingView>
        <ScrollView
          style={{marginBottom: 20}}
          contentContainerStyle={styles.contentScroll}>
          <MyProgressSteps show value={currentState} data={steps} />
          <View style={errorMessage !== '' && {marginTop: 15}}>
            <Text style={[styles.require, errorMessage && styles.error]}>
              {errorMessage}
            </Text>
          </View>
          <View style={styles.movingDateBox}>
            <Text style={styles.movingDateLabel}>{i18nMovingListMd}</Text>
            <View style={styles.movingDateValueBox}>
              <Text style={styles.movingDateValue}>{
                dateFormat.formatDate(selectedDate)
              }</Text>
            </View>
          </View>
          <View style={styles.descBox}>
            <Text style={styles.desc} numberOfLines={2}>
              {i18nMovingListPSATS}
            </Text>
          </View>
          <View style={styles.elevatorBox}>
            <Text style={styles.elevatorLabel}>{i18nMovingListEL}*</Text>
            <TouchableWithoutFeedback
              onPress={() => handlePickTime('ELEVATOR')}>
              <View style={[
                styles.elevatorValueBox,
                  elevatorTime === '' && errorMessage !== '' && {
                  borderWidth: 0.5,
                  borderColor: 'red'
                }]}
              >
                <View style={styles.prefixIcon}>
                  <ClockSvg />
                  <Text style={styles.prefixLabel}>{i18nMovingListSch}</Text>
                </View>
                <Text style={styles.elevatorValue}>
                  {
                    elevatorTime?.length > 0 && elevatorTime!== i18nFaNone ?
                    `${moment(elevatorTime[0]?.start).utc().format('HH:mm')} - ${moment(elevatorTime[elevatorTime?.length - 1]?.end).utc().format('HH:mm')}`
                    : elevatorTime
                  }
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.elevatorBox}>
            <Text style={styles.elevatorLabel}>{i18nMovingListPL}*</Text>
            <TouchableWithoutFeedback
              onPress={() => handlePickTime('PARKING_LOT')}>
              <View style={[
                styles.elevatorValueBox,
                  parkingLotTime === '' && errorMessage !== '' && {
                  borderWidth: 0.5,
                  borderColor: 'red'
                }]}
              >
                <View style={styles.prefixIcon}>
                  <ClockSvg />
                  <Text style={styles.prefixLabel}>{i18nMovingListSch}</Text>
                </View>
                <Text style={styles.elevatorValue}>
                  {
                    parkingLotTime?.length > 0 && parkingLotTime!== i18nFaNone ?
                    `${moment(parkingLotTime[0]?.start).utc().format('HH:mm')} - ${moment(parkingLotTime[parkingLotTime?.length - 1]?.end).utc().format('HH:mm')}`
                    : parkingLotTime
                  }
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <ScrollView
              style={styles.scrollView}
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {movingVehicleData?.items?.length > 0 &&
                movingVehicleData?.items?.map((ele, index) => {
                  // const isTricycle = ele.type === 'TRICYCLE';
                  // const parkingLotTimeisNone = parkingLotTime === 'None';
                  // const selected = ele.selected;
                  return (
                    <TouchableWithoutFeedback
                      disabled={parkingLotTime?.length > 0 && parkingLotTime !== i18nFaNone ? false : true}
                      key={ele?.id}
                      onPress={() => handlePickVehicle(ele?.id)}>
                      <View style={
                        styles.vehicleBox
                      }>
                        <View
                          style={[
                            styles.iconBox,
                            selectedVehicle === ele?.id && styles.selectedIconBox,
                            (parkingLotTime?.length > 0 && parkingLotTime !== i18nFaNone) && selectedVehicle === 0 && errorMessageVehicle !== '' && {borderWidth: 0.5, borderColor: 'red'}
                          ]}>
                            {
                              parkingLotTime?.length === 0 || parkingLotTime === i18nFaNone ?
                              <Image
                                style={[
                                  styles.image,
                                ]}
                                source={{uri: ele?.image2}}
                              />
                              :
                              <Image
                                style={[
                                  styles.image,
                                ]}
                                source={{uri: selectedVehicle === ele?.id && ele?.image3 || ele?.image}}
                              />
                            }
                        </View>
                        <View style={styles.textBox}>
                          <Text style={styles.iconText}>{ele.name}</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
            </ScrollView>
          </View>
          <View style={errorMessageVehicle !== '' && {marginTop: 15}}>
            <Text style={[styles.require, errorMessageVehicle && styles.error]}>
              {errorMessageVehicle}
            </Text>
          </View>
          <View style={styles.visitorBox}>
            <Text style={styles.visitorLabel}>{i18nMovingListVM}</Text>
            <View style={styles.quantityBox}>
              <QuantityChoosen
                disabled={parkingLotTime?.length > 0 && parkingLotTime !== i18nFaNone ? false : true}
                value={quantity}
                onChange={setQuantity}
                // error={errorMessage !== '' && quantity < 1}
              />
            </View>
          </View>
          <View style={styles.saveBox}>
            <Button text={i18nMovingListNe} type="default" onPress={handleNext} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  movingDateBox: {
    marginTop: 15,
  },
  movingDateLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: 16,
    color: '#8A8A8A',
  },
  movingDateValueBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CACACA',
    borderRadius: 2,
    minHeight: 40,
    marginTop: 15,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingLeft: 15,
  },
  movingDateValue: {
    fontFamily: Fonts.type.regular,
    fontSize: 16,
    color: '#000000',
  },
  descBox: {
    marginTop: 15,
  },
  desc: {
    fontFamily: Fonts.type.regular,
    fontSize: 16,
    display: 'flex',
    alignItems: 'flex-end',
    color: '#727376',
  },
  elevatorBox: {
    marginTop: 15,
    ...ApplicationStyles.boxShadow,
  },
  elevatorLabel: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
  },
  elevatorValueBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CACACA',
    borderRadius: 2,
    minHeight: 40,
    marginTop: 15,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prefixIcon: {
    marginRight: 8,
    flexDirection: 'row',
  },
  prefixLabel: {
    marginLeft: 10,
    fontFamily: Fonts.type.regular,
    fontSize: 16,
    color: '#000000',
    textTransform: 'capitalize',
  },
  elevatorValue: {
    fontFamily: Fonts.type.regular,
    fontSize: 16,
    color: '#F6CA13',
  },
  scrollView: {
    marginTop: 20,
    paddingHorizontal: 5,
  },
  iconBox: {
    backgroundColor: '#FFFFFF',
    width: 92,
    height: 92,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIconBox: {
    backgroundColor: '#F6CA13',
  },
  image: {
    resizeMode: 'contain',
    height: 53,
    width: 53,
  },
  disableImage: {
    tintColor: '#CACACA',
  },
  selectImage: {
    tintColor: '#FFF',
  },
  textBox: {
    marginTop: 10,
  },
  iconText: {
    fontFamily: Fonts.type.medium,
    fontSize: 16,
    display: 'flex',
    textAlign: 'center',
    color: '#727376',
  },
  vehicleBox: {
    marginRight: 30,
    ...ApplicationStyles.boxShadow,
  },
  visitorBox: {
    marginTop: 23,
  },
  visitorLabel: {
    fontFamily: Fonts.type.medium,
    fontSize: 16,
    color: '#000000',
  },
  quantityBox: {
    marginTop: 25,
  },
  saveBox: {
    marginTop: 25,
  },
  require: {
    color: '#8A8A8A',
  },
  error: {
    color: '#F0443C',
  },
});
