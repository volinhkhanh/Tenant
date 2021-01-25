import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';
import moment from 'moment';

import MainHeader from '../../components/MainHeader';
import {MyProgressSteps} from '../../components/MyProgressSteps';
import {KeyboardAvoidingView} from '../utils';
import {MySection} from '../../components/MySection';
import Button from '../../components/button';
import dateFormat from '../../utils/dateFormat';
import {useTranslation} from '../../context/LanguageContext';
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';

export default function MovingBookingConfirmScreen(props) {
  const {
    navigation,
    putUpdateMovingRequest,
    getGeneralInformationData,
    movingElevatorData,
    movingParkingData,
    getMovingDetail,
    getMovingDetailData,
    setMovingDetailData,
  } = props;
  const {
    t,
    i18nFaBookingConfirm,
    i18nFaBookingSuccess,
    i18nFaYBHSC,
    i18nMovingListPAUT,
    i18nMovingListS,
    i18nTicketEdit,
    i18nMovingListAp,
    i18nMovingListB,
    i18nMovingListC,
    i18nMovingListFu,
    i18nMovingListSui,
    i18nMovingListSu,
    i18nMovingListAbo,
    i18nMovingListBo,
    i18nMovingListCed,
    i18nMovingListMoOu,
    i18nMovingListELPL,
    i18nMovingListLOI,
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
      finish: true,
    },
  ];
  const stateParams = navigation?.state?.params
  const [currentState, setCurrentState] = useState('BOOKED');
  const [confirm, setConfirm] = useState({
    title: i18nMovingListELPL,
    date: dateFormat.formatDate(Date.now()),
    movingDate: dateFormat.formatDate(stateParams?.params?.move_out_date),
    elevatorSchedule: stateParams?.elevatorTime?.length > 0 && stateParams?.elevatorTime !== i18nFaNone ?
    `${moment(stateParams?.elevatorTime[0]?.start).utc().format('HH:mm')} - ${moment(stateParams?.elevatorTime[stateParams?.elevatorTime?.length - 1]?.end).utc().format('HH:mm')}`
    : i18nFaNone,
    parkingLotSchedule: stateParams?.parkingLotTime?.length > 0 && stateParams?.parkingLotTime !== i18nFaNone ?
    `${moment(stateParams?.parkingLotTime[0]?.start).utc().format('HH:mm')} - ${moment(stateParams?.parkingLotTime[stateParams?.parkingLotTime?.length - 1]?.end).utc().format('HH:mm')}`
    : i18nFaNone,
    vehicle: stateParams?.vehicle,
    visitor: stateParams?.params?.visitor_number,
    name: getGeneralInformationData?.owner?.full_name,
    unit: getGeneralInformationData?.owner?.unit,
    email: getGeneralInformationData?.owner?.email,
    phone: getGeneralInformationData?.owner?.phone,
  });

  useEffect(() => {
    if(stateParams?.uuidConfirm) {
      getMovingDetail(stateParams?.uuidConfirm)
    }
    return () => {
      setMovingDetailData(null)
    }
  }, [])

  useEffect(() => {
    if (getMovingDetailData && getMovingDetailData !== 'undefined' && stateParams?.type !== 'BOOKED') {
      setCurrentState('ADMIN_CONFIRMED')
      confirm.movingDate = dateFormat.formatDate(getMovingDetailData?.move_out_date)
      confirm.date = dateFormat.formatDate(getMovingDetailData?.updated_at)
      confirm.vehicle = getMovingDetailData?.vehicle?.name
      confirm.visitor = getMovingDetailData?.visitor_number
      getMovingDetailData?.schedule?.map(item => {
        if(item?.type === "ELEVATOR") {
          confirm.elevatorSchedule = `${moment(item?.start_time).utc().format('HH:mm')} - ${moment(item?.end_time).utc().format('HH:mm')}`
          return
        }
        if(item?.type === "PARKING") {
          confirm.parkingLotSchedule = `${moment(item?.start_time).utc().format('HH:mm')} - ${moment(item?.end_time).utc().format('HH:mm')}`
          return
        }
      })
    }
  }, [getMovingDetailData]);

  async function handleSubmit() {
    const data = await putUpdateMovingRequest(stateParams?.uuid, stateParams?.params)
    if(data) {
      navigation.navigate('Success', {
        title: i18nFaBookingSuccess,
        descriptionTitle: i18nFaYBHSC,
        description: i18nMovingListPAUT,
      });
    }
  }

  return (
    <View style={styles.container}>
      <MainHeader disableBackBtn={stateParams?.type === 'BOOKED'} navigation={navigation} title={i18nFaBookingConfirm} />
      <KeyboardAvoidingView>
        <ScrollView
          style={{marginBottom: 20}}
          contentContainerStyle={styles.contentScroll}>
          <MyProgressSteps show value={currentState} data={steps} />
          <Ripple onPress={() => {
            navigation.navigate('MovingBookingConfirmLOI', {...stateParams?.movingData, unit: getGeneralInformationData?.owner?.unit})
          }}>
            <View style={styles.loiContent}>
              <Text style={styles.listOfItem}>{i18nMovingListLOI}</Text>
              <Text style={styles.arrowRight}>&nbsp;&#8594;</Text>
            </View>
          </Ripple>
          <View style={styles.sectionBox}>
            <MySection confirm={confirm} />
          </View>
          {
            !stateParams?.uuidConfirm && 
            <View style={styles.buttonBox}>
              <Button
                text={i18nTicketEdit}
                style={styles.editButton}
                backgroundColor="white"
                type="main"
                onPress={() => navigation.pop()}
              />
              <Button
                text={i18nMovingListS}
                style={styles.submitButton}
                onPress={handleSubmit}
              />
            </View>
          }
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
  sectionBox: {
    marginTop: 30,
  },
  buttonBox: {
    marginTop: 60,
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
  loiContent: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  listOfItem: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.regular,
  },
  arrowRight: {
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.regular,
    color: Colors.mainColor,
    marginLeft: 7,
  },
});
