import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ripple from 'react-native-material-ripple';
import Toast from 'react-native-simple-toast';
import HTML from 'react-native-render-html'
//
import {Delete} from '../../components/icons';
import CheckBoxSquare from '../../components/checkBox/Square';
import Button from '../../components/button';
import AlertConfirm from '../../components/alert/AlertConfirm';
import BackgroundImage from '../../components/BackgroundImage';
import FullButton from '../../components/FullButton';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
//
import Layout from '../../constants/Layouts';
//
import {useTranslation} from '../../context/LanguageContext';
//
const {height} = Layout;
//
import {addBooking} from '../../services/serviceRest';
import dateFormat from '../../utils/dateFormat';
const BookingConfirmScreen = props => {
  const {
    navigation,
    getGeneralInformationData,
    getFacilityPolicy,
    dataFacilityPolicy,
  } = props;
  // const {selectday, selectedTime,selectedDate } = navigation.state.params;
  const {
    dataInfo,
    create_at,
    categoryName,
    name,
    timeStart,
    isCancel,
    dateTime,
    idBooking,
    timeEnd,
    standardId,
    building,
    uuid,
  } = navigation.state.params;
  // console.log(navigation.state.params)
  const {
    t,
    i18nFaDate,
    i18nFaTime,
    i18nFaPlace,
    i18nFaName,
    i18nFaUnit,
    i18nFaEmail,
    i18nFaPhone,
    i18nFaNone,
    i18nFaAgree,
    i18nFaConfirm,
    i18nFaUsagePolicy,
    i18nFaAnAuthorization,
    i18nFaBookingConfirm,
    i18nFaBookingSuccess,
    i18nFaYCCYBD,
    i18nFaYBHSC,
    i18nFaPolicy,
    i18nFaClose,
    i18nFaAGR,
  } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const addBookingYarn = async () => {
    try {
      setLoading(true)
      let res = await addBooking({
        facility_id: idBooking,
        start: timeStart,
        end: timeEnd,
      });
      setLoading(false)
      // console.log(res)
      if (res?.status === 201) {
        navigation.navigate('Success', {
          title: i18nFaBookingSuccess,
          descriptionTitle: i18nFaYBHSC,
          description: i18nFaYCCYBD,
        });
      } else {
        if (res?.data?.errors.length > 0) {
          Toast.show(res?.data?.errors[0]?.message);
        }
      }
    } catch (error) {
      setLoading(false)
      console.log('error', error);
    }
  };
  useEffect(() => {
    getFacilityPolicy(uuid)
  }, [])

  useEffect(() => {
    console.log(dataFacilityPolicy)
  }, [dataFacilityPolicy])
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nFaBookingConfirm} />
      <BackgroundImage />
      <View style={{flex: 1}}>
        <View style={styles.box}>
          <View style={styles.headerBox}>
            <Text style={styles.date}>{`${i18nFaDate}: ${dateFormat.formatDate(
              create_at,
            )}`}</Text>
            <Text style={styles.mainTitle}>{name}</Text>
          </View>
          <View style={styles.titleBox}>
            <View style={styles.titleLabel}>
              <View style={{flex: 1, alignItems: 'center', paddingLeft: 1}}>
                <Text style={styles.firstText}>{i18nFaPlace}</Text>
              </View>
              <View
                style={{flex: 1, alignItems: 'center', ...styles.splitBorder}}>
                <Text style={styles.firstText}>{i18nFaDate}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', paddingRight: 1}}>
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
              <View
                style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>
                  {building?.name || i18nFaNone}
                </Text>
              </View>
              <View
                style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>
                  {/* {dateFormat.formatDate(timeStart)} */}
                  {moment(timeStart).utc().format('DD/MM/YYYY')}
                </Text>
              </View>
              <View
                style={{flex: 1, alignItems: 'center', paddingHorizontal: 1}}>
                <Text style={styles.labelValue}>
                  {/* {dateFormat.formatTime(timeStart)} */}
                  {moment(timeStart).utc().format('HH:mm')}
                </Text>
              </View>
            </View>
          </View>
          <Image
            source={Images.dividerLight}
            style={{alignSelf: 'center', marginVertical: 10}}
          />
          <View style={styles.infoBox}>
            <RowItem
              firstText={i18nFaName}
              lastText={getGeneralInformationData?.full_name}
            />
            <RowItem
              firstText={i18nFaUnit}
              lastText={getGeneralInformationData?.unit}
            />
            <RowItem
              firstText={i18nFaEmail}
              lastText={getGeneralInformationData?.email}
            />
            <RowItem
              firstText={i18nFaPhone}
              lastText={getGeneralInformationData?.phone}
            />
          </View>
        </View>
        <View style={styles.termBox}>
          <CheckBoxSquare
            checked={checked}
            setChecked={() => setChecked(!checked)}
            title={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 10,
                }}>
                <Text style={styles.agree}>{i18nFaAgree}</Text>
                <Ripple onPress={() => modalVisible.open()}>
                  <Text style={[styles.agree, {color: Colors.mainColor}]}>
                    {` ${i18nFaUsagePolicy}*`}
                  </Text>
                </Ripple>
              </View>
            }
          />
        </View>
      </View>
      <View style={styles.button}>
        <Button
          type={!checked ? 'disable' : 'default'}
          disabled={!checked}
          text={i18nFaConfirm}
          onPress={() => {
            checked && addBookingYarn();
          }}
        />
      </View>
      <AlertConfirm
        title={i18nFaAnAuthorization}
        show={alertShow}
        onPressCancel={() => setAlertShow(false)}
        onPressConfirm={() => {
          setAlertShow(false);
        }}
      />
      <RBSheet
        ref={ref => {
          setModalVisible(ref);
        }}
        height={height - ApplicationStyles.utils.resizeHeight(200)}
        openDuration={300}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
        }}>
        <ScrollView
          style={styles.modalContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.modalHeader}>
            <View style={styles.closeImage} />
            <Text style={styles.modalTitle}>
              {i18nFaPolicy}
            </Text>
            <Ripple
              onPress={() => {
                modalVisible.close();
              }}>
              <Image source={Delete} style={styles.closeImage} />
            </Ripple>
          </View>
          <Text style={styles.separator} />
          <View style={styles.modalInfo}>
            {/* <Text style={styles.modalDesBlack}>OPENING HOURS</Text> */}
            <HTML
              html={dataFacilityPolicy?.booking_policy}
              htmlStyles={styles.infoContent}
              // onLinkPress={(evt, href) => console.log(href)}
            />
            {/* <Text style={styles.modalDes}>
              {`
Tennis:
Basketball:
Badminton:

All residents are requested to enter through the Main Entrance of each facility. Climbing over the fence for entry and/or exit to the facilities is strictly prohibited.
Availability shall be updated from time to time in the resident app. All residents are requested to adhere to the schedule.
Maintenance is always after hours, except emergency repairs.
`}
            </Text>
            <Text style={styles.modalDesBlack}>
              USERS, IDENTIFICATION and RIGHT of ENTRY
            </Text>
            <Text style={styles.modalDes}>
              {`
Entry to the facilities is restricted to all current residents in possession of a valid resident card issued by *name of apartment*
Resident card issued by *name of apartment* may be inspected when
`}
            </Text> */}
          </View>
        </ScrollView>
        <View style={styles.buttonBox}>
          <FullButton
            style={{width: '60%'}}
            textStyle={styles.submitTextButton}
            title={i18nFaAGR}
            onPress={() => {
              setChecked(true);
              modalVisible.close();
            }}
          />
        </View>
      </RBSheet>
      {loading && <DimSpinnerView />}
    </View>
  );
};
//
const RowItem = props => {
  const {firstText, lastText} = props;
  return (
    <View style={styles.item}>
      <Text style={styles.firstText}>{firstText}</Text>
      <Text style={styles.lastText}>{lastText}</Text>
    </View>
  );
};
//
export default memo(BookingConfirmScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  box: {
    marginTop: 24,
    marginHorizontal: 28,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    fontFamily: Fonts.type.light,
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
    paddingVertical: 8,
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
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 25,
    justifyContent: 'center',
    paddingBottom: ApplicationStyles.utils.resizeLimitedHeight(50),
  },
  modalContent: {
    width: ('100%'),
    paddingTop: 20,
    paddingHorizontal: 35,
    height: height - ApplicationStyles.utils.resizeHeight(200),
  },
  modalDes: {
    color: Colors.textColor.gray2,
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    lineHeight: 23,
  },
  modalTitle: {
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.base,
    textAlign: 'center',
    color: Colors.mainColor,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.black,
    width: '100%',
    marginVertical: ApplicationStyles.utils.resizeHeight(20),
  },
  buttonBox: {
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 86,
    backgroundColor: 'white',
    ...ApplicationStyles.shadow.dynamicOffset(0, -4, undefined, 0.1, 10),
  },
  agree: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray2,
  },
  modalDesBlack: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    paddingVertical: 20,
  },
  modalInfo: {
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeImage: {
    width: 30,
    height: 30,
  },
});
