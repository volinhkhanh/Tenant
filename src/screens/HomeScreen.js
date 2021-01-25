import React, {useState, memo, useEffect} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import randomString from 'random-string';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  BackHandler,
  Platform,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {Badge} from 'react-native-elements';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-community/async-storage';
import Ripple from 'react-native-material-ripple';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
// import firebase from '@react-native-firebase/app';
// import type { RemoteMessage } from 'react-native-firebase';
// import type { Notification } from 'react-native-firebase';
//
// import Overlay from '../components/Overlay';
// import DropDownItem from '../components/DropdownItem';
// import {NotificationHomeListItem} from '../components/ListItem';
// import SearchBar from '../components/SearchBar';
import Card from '../components/card';
import ModalSwitchUnit from '../components/modal/ModalSwitchUnit';
import BackgroundImage from '../components/BackgroundImage';
import DimSpinnerView from '../components/DimSpinnerView';
import {
  MovingIcon,
  VisitorIcon,
  EventIcon,
  Conversation,
  Bill,
  Booking,
  Contact,
  Ticket,
  Election,
  ElectionDisable,
  Workplace,
  Bell,
  Delete,
} from '../components/icons';
import {wpc, hpc} from '../utils/responsePixel';
//
import {Images, ApplicationStyles, Colors, Fonts} from '../themes';
import {useTranslation} from '../context/LanguageContext';
//
import {capitalizeFirstLetter} from '../utils/capitalize';
//
import {getTicketChannels} from '../services/serviceRest';
//
const {width, height} = Dimensions.get('window');
const layout = {
  paddingHorizontal: 25,
};
//
function HomeScreen(props) {
  const {
    navigation,
    getGeneralInformation,
    getGeneralInformationData,
    getGeneralInformationProgress,
    getSendBirdInfo,
    getUnitIdData,
    getSendBirdInfoData,
    getSendBirdUnread,
    getListUnit,
    setGeneralInformationData,
    setChannelStorage,
    setPageChannels,
    listUnitData,
  } = props;
  const {
    t,
    i18nHomeHello,
    i18nHomeProfile,
    i18nHomePoints,
    i18nHomeContactSupportTeam,
    i18nHomeBill,
    i18nHomeFacility,
    i18nHomeTicket,
    i18nHomePhoneBook,
    i18nHomeHomeService,
    i18nHomeElection,
    i18nHomeVisitor,
    i18nHomeMoving,
    i18nHomeEvent,
    i18nHomeYTIC,
  } = useTranslation();
  //
  const [notiContentShow, setNotiContentShow] = useState(true);
  const [valueBadge, setValueBadge] = useState(1);
  const [unitId, setUnitId] = useState(null);
  const [cardHeight, setCardHeight] = useState(40);
  //
  const onPressProfileSetting = () => {
    navigation.navigate('ProfileSetting');
  };
  //
  const onPressContactSupportTeam = async () => {
    const response1 = await getTicketChannels({
      channel_type: 'general',
    });
    const data1 = response1.data;
    const channel = data1.items[0];
    // console.log(channel);
    const channelUrl = channel.channel_url;
    const channelName = channel.channel_name;
    navigation.navigate('ChattingBox', {channelUrl, channelName});
  };
  //
  const onPressFacilities = () => {
    navigation.navigate('Facility');
  };
  //
  const onPressTickets = () => {
    navigation.navigate('Ticket');
  };
  //
  const onPressPhoneBook = () => {
    navigation.navigate('PhoneBook');
  };
  //
  useEffect(() => {
    setTimeout(
      async () => {
        let pages = await AsyncStorage.getItem('pages');
        pages && await setPageChannels(JSON.parse(pages))
        let channelsStorage = await AsyncStorage.getItem('channels');
        channelsStorage && await setChannelStorage(JSON.parse(channelsStorage))
        SplashScreen.hide();
      },
      Platform.OS === 'android' ? 1500 : 500,
    );

    // messaging().onMessage(async remoteMessage => {
    //   PushNotification.localNotification({
    //     title: notification?.title,
    //     message: notification?.body,
    //     autoCancel: true,
    //     vibrate: true,
    //     invokeApp: true,
    //     messageId: remoteMessage?.messageId,
    //   });
    // })
    OneSignal.init('26dfbb50-3de8-4963-9905-7872017b5263', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2);
    OneSignal.setSubscription(true);
    OneSignal.addEventListener('ids', device => {
      // console.log(device);
    });
    OneSignal.addEventListener('opened', openResult => {
      // console.log(openResult)
      // switch (openResult.notification.payload.additionalData.type) {
      //   case 'EVENT':
      //     navigation.navigate('EventDetail', {
      //       id: openResult?.notification?.payload?.additionalData?.relation_id,
      //     });
      //     break;
      //   case 'ANNOUNCEMENT':
      //     navigation.navigate('NewsDetail', {
      //       id: openResult?.notification?.payload?.additionalData?.relation_id,
      //     });
      //     break;
      //   case 'BILL':
      //     navigation.navigate('Management');
      //     break;
      //   default:
      //     break;
      // }
    });
    OneSignal.configure();
    // return () => {
    //   OneSignal.removeEventListener('received', onReceived())
    //   OneSignal.removeEventListener('opened', onOpened())
    //   OneSignal.removeEventListener('ids', onIds())
    // }
    getUnitId();
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    navigation.addListener('willFocus', () => {
      getUnitId();
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    });
    navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    });
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  useEffect(() => {
    return () => {setGeneralInformationData(null)}
  }, [])
  //
  const handleBackButtonClick = () => {
    BackHandler.exitApp()
    // return true;
  };
  //
  const getUnitId = async () => {
    await getListUnit();
    const data = await getGeneralInformation();
    if (data === 'goToLogin') {
      navigation.navigate('Login');
    }
  };
  // useEffect(() => {
  //   console.log(listUnitData)
  // }, [listUnitData])
  //
  // useEffect(() => {
  //   console.log(getGeneralInformationData);
  //   // if (getGeneralInformationData) {
  //   //   getSendBirdInfo({unit_id: getGeneralInformationData.unit_id});
  //   // }
  // }, [getGeneralInformationData]);
  //
  return (
    <View style={styles.container}>
      {/* <BackgroundImage noHeader={true} /> */}
      <View style={styles.content}>
        <View style={[styles.header, {height: cardHeight + hpc(50)}]}>
          <Text style={styles.tenantName}>
            {`${i18nHomeHello}, ${getGeneralInformationData?.first_name}`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 25,
              position: 'absolute',
              bottom: -(cardHeight / 2),
            }}>
            <TouchableWithoutFeedback
              style={styles.cartHeader}
              onPress={onPressProfileSetting}
              onLayout={event => {
                var {x, y, width, height} = event.nativeEvent.layout;
                setCardHeight(height);
              }}>
              <Text style={styles.textPointName}>
                {getGeneralInformationData?.apartment}
              </Text>
              <Text style={styles.textPoint}>
                {getGeneralInformationData?.unit}
              </Text>
              <Image source={Workplace} style={styles.workplace} />
            </TouchableWithoutFeedback>
            <View style={styles.cartHeader}>
              <Text style={[styles.textTitle, {opacity: 0.5}]}>
                {/* {t('Point')} */}
                {i18nHomePoints}
              </Text>
              <Text style={[styles.textPoint, {opacity: 0.5}]}>_</Text>
              <Image source={Workplace} style={[styles.workplace, {opacity: 0.5}]} />
            </View>
          </View>
        </View>
        <View style={{zIndex: -1, flex: 1}}>
          <ScrollView
            contentContainerStyle={styles.contentScroll}
            showsVerticalScrollIndicator={false}>
            <View style={[styles.contentInfo, {marginTop: (cardHeight / 2 + 20)}]}>
              {/* {notiContentShow && (
                <View style={[styles.cartInfo, styles.cartNoti]}>
                  <Ripple
                    style={styles.closeButton}
                    onPress={() => {
                      setNotiContentShow(false);
                    }}>
                    <Image source={Delete} style={styles.closeIcon} />
                  </Ripple>
                  <Bell />
                  <View style={styles.bellNoti} />
                  <View style={styles.textCartNotiContent}>
                    <Text style={styles.textCartNoti}>
                      Your ticket is completed
                    </Text>
                    <Text style={styles.textCartTime}>10 mins ago</Text>
                  </View>
                </View>
              )} */}
              <Ripple
                style={styles.cartInfo}
                onPress={onPressContactSupportTeam}
                // onPress={() => navigation.navigate('ChattingBox', { chatboxType: 'buildManager' })}
              >
                <Text style={styles.textCartInfo}>
                  {/* {t('ContactSupportTeam')} */}
                  {i18nHomeContactSupportTeam}
                </Text>
                <Image source={Conversation} style={styles.chatIcon} />
              </Ripple>
              <View style={[styles.cartInfo, styles.cartList]}>
                <Ripple
                  style={styles.itemInfo}
                  onPress={() => navigation.navigate('Bills')}>
                  <View style={styles.itemServiceContent}>
                    <Image source={Bill} style={styles.itemIcon} />
                    <Text style={styles.textService}>
                      {/* {t('Bill')} */}
                      {i18nHomeBill}
                    </Text>
                  </View>
                </Ripple>
                <Ripple style={styles.itemInfo} onPress={onPressFacilities}>
                  <View style={styles.itemServiceContent}>
                    <Image source={Booking} style={styles.itemIcon} />
                    <Text style={styles.textService}>
                      {/* {t('Facility')} */}
                      {i18nHomeFacility}
                    </Text>
                  </View>
                </Ripple>
                <Ripple style={styles.itemInfo} onPress={onPressTickets}>
                  {getGeneralInformationData?.home_service_notify_count > 0 && (
                    <Badge
                      textStyle={{fontSize: wpc(13), textAlign: 'center'}}
                      value={'!'}
                      badgeStyle={{
                        backgroundColor: Colors.red,
                        height: wpc(17),
                        minWidth: wpc(17),
                      }}
                      containerStyle={{
                        position: 'absolute',
                        top: wpc(-5),
                        right: wpc(8),
                      }}
                    />
                  )}
                  <View style={styles.itemServiceContent}>
                    <Image
                      source={Ticket}
                      style={styles.itemIcon}
                      valueBadge={valueBadge}
                    />
                    <Text style={styles.textService}>
                      {/* {t('Ticket')} */}
                      {i18nHomeTicket}
                    </Text>
                  </View>
                </Ripple>
                <Ripple style={styles.itemInfo} onPress={onPressPhoneBook}>
                  <View style={styles.itemServiceContent}>
                    <Image source={Contact} style={styles.itemIcon} />
                    <Text style={styles.textService}>
                      {/* {t('PhoneBook')} */}
                      {i18nHomePhoneBook}
                    </Text>
                  </View>
                </Ripple>
              </View>
              <View style={styles.homeServiceBox}>
                <Text style={styles.homeServiceTitle}>
                  {/* {t('HomeServices')} */}
                  {i18nHomeHomeService}
                </Text>
                <View style={styles.hashTagContent}>
                  <Ripple
                    style={styles.hashTag}
                    disabled={true}
                    // onPress={() => navigation.navigate('ChattingBox', { chatboxType: 'delivery' })}
                  >
                    <Text style={styles.textHashTag}>
                      {/* #{t('src.screens.HomeScreen.delivery')} */}
                      #{t(`src.screens.HomeScreen.${'Delivery'}`)}
                    </Text>
                  </Ripple>
                  <Ripple
                    style={styles.hashTag}
                    disabled={true}
                    // onPress={() => navigation.navigate('ChattingBox', { chatboxType: 'moving' })}
                  >
                    <Text style={styles.textHashTag}>
                      {/* #{t('Moving')} */}
                      {/* #{i18nHomemo} */}
                      #{t(`src.screens.HomeScreen.${'Moving'}`)}
                    </Text>
                  </Ripple>
                  <Ripple
                    style={styles.hashTag}
                    disabled={true}
                    // onPress={() => navigation.navigate('ChattingBox', { chatboxType: 'cleaning' })}
                  >
                    <Text style={styles.textHashTag}>
                      {/* #{t('Cleaning')} */}
                      {/* #{i18nHomecl} */}
                      #{t(`src.screens.HomeScreen.${'Cleaning'}`)}
                    </Text>
                  </Ripple>
                  <Ripple
                    style={styles.hashTag}
                    disabled={true}
                    // onPress={() => navigation.navigate('ChattingBox', { chatboxType: 'laundry' })}
                  >
                    <Text style={styles.textHashTag}>
                      {/* #{t('Laundry')} */}
                      {/* #{i18nHomela} */}
                      #{t(`src.screens.HomeScreen.${'Laundry'}`)}
                    </Text>
                  </Ripple>
                  <Ripple
                    style={styles.hashTag}
                    disabled={true}
                    // onPress={() => navigation.navigate('ChattingBox', { chatboxType: 'general' })}
                  >
                    <Text style={styles.textHashTag}>
                      {/* #{t('AskMeAnything')} */}
                      {/* #{i18nHomeama} */}
                      #{t(`src.screens.HomeScreen.${'Technical'}`)}
                    </Text>
                  </Ripple>
                </View>
              </View>
              <View style={styles.lastSectionContent}>
                <Card
                  size={'F'}
                  label={
                    // t('Election')
                    i18nHomeElection
                  }
                  Icon={ElectionDisable}
                  img={true}
                  fixedWidth
                  disabled={true}
                  onPress={() => navigation.navigate('Election')}
                />
                <Card
                  size={'F'}
                  label={
                    // t('Visitor')
                    i18nHomeVisitor
                  }
                  Icon={VisitorIcon}
                  fixedWidth
                  onPress={() => navigation.navigate('Visitor')}
                />
                <Card
                  size={'F'}
                  label={
                    // capitalizeFirstLetter(t('Moving'))
                    i18nHomeMoving
                  }
                  Icon={MovingIcon}
                  fixedWidth
                  onPress={() => navigation.navigate('MovingList')}
                />
                <Card
                  size={'F'}
                  label={
                    // t('Event')
                    i18nHomeEvent
                  }
                  Icon={EventIcon}
                  fixedWidth
                  onPress={() => navigation.navigate('Event')}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      {
        listUnitData &&
        <ModalSwitchUnit data={listUnitData || []} setUnitId={getUnitId} />
      }
      {getGeneralInformationProgress && <DimSpinnerView />}
    </View>
  );
}

export default memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wpc(6),
  },
  content: {
    flex: 1,
    zIndex: 10,
  },
  contentScroll: {
    paddingBottom: wpc(50),
  },
  leftHeader: {
    paddingHorizontal: wpc(4),
  },
  avatar: {
    height: wpc(40),
    width: wpc(40),
    borderRadius: wpc(20),
  },
  centerHeader: {
    flex: 1,
    paddingHorizontal: wpc(16),
  },
  centerHeaderText: {
    ...Fonts.style.captionSemibold,
    color: Colors.textColor.gray1,
    paddingVertical: wpc(8),
  },
  centerHeaderText1: {
    ...Fonts.style.otherMedium,
    color: Colors.textColor.gray2,
    paddingVertical: wpc(2),
  },
  searchbar: {
    marginHorizontal: wpc(3),
    marginBottom: wpc(10),
  },
  card1: {
    marginVertical: wpc(10),
  },
  contentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wpc(18),
  },
  subtitle: {
    ...Fonts.style.bodySemibold,
    color: Colors.gray4,
  },
  cardLeft: {
    marginHorizontal: 0,
    marginRight: ApplicationStyles.utils.resizeLimitedWidth(10),
  },
  cardRight: {
    marginHorizontal: 0,
    marginLeft: ApplicationStyles.utils.resizeLimitedWidth(10),
  },
  homeTitleText: {
    ...Fonts.style.bodyMedium,
    color: Colors.gray1,
  },
  dropDownItem: {
    width: '100%',
    flex: 1,
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 0.5,
  },
  dropDownContent: {
    backgroundColor: Colors.pink3,
    paddingHorizontal: wpc(28),
    paddingVertical: wpc(10),
  },
  cartHeaderContent: {
    flexDirection: 'row',
    marginBottom: wpc(20),
    marginHorizontal: wpc(25),
    position: 'absolute',
    // top: -40,
  },
  cartHeader: {
    width: (width - 50 - 20) / 2,
    borderRadius: wpc(10),
    backgroundColor: 'white',
    paddingVertical: wpc(10),
    paddingHorizontal: wpc(15),
    marginRight: wpc(20),
    // height: 80,
    ...ApplicationStyles.boxShadow,
  },
  cartInfo: {
    borderRadius: wpc(10),
    backgroundColor: 'white',
    ...ApplicationStyles.boxShadow,
    padding: wpc(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wpc(20),
  },
  cartNoti: {
    justifyContent: 'flex-start',
  },
  cartList: {
    paddingTop: wpc(15),
    paddingBottom: wpc(10),
    paddingHorizontal: wpc(15),
  },
  homeServiceBox: {
    borderRadius: wpc(10),
    backgroundColor: 'white',
    ...ApplicationStyles.boxShadow,
    padding: wpc(20),
    marginBottom: wpc(20),
  },
  homeServiceTitle: {
    fontSize: wpc(Fonts.size.h4),
    color: '#403F3F',
    fontFamily: Fonts.type.medium,
  },
  itemInfo: {
    width: (width - 25 * 2 - 20 * 2) / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textCartInfo: {
    fontSize: wpc(Fonts.size.h4),
    color: '#403F3F',
    fontFamily: Fonts.type.medium,
  },
  textCartNotiContent: {
    marginLeft: wpc(10),
  },
  chatIcon: {
    width: wpc(30),
    height: wpc(30),
  },
  notiIcon: {
    width: wpc(30),
    height: wpc(30),
    marginRight: wpc(10),
  },
  itemServiceContent: {
    width: (width - 70) / 4,
    height: (width - 70) / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIcon: {
    // width: (width - 40) / 11,
    // height: (width - 40) / 11,
    width: wpc(35),
    height: wpc(35),
    marginBottom: wpc(15),
  },
  hashTagContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hashTag: {
    paddingVertical: wpc(10),
    paddingHorizontal: wpc(14),
    borderRadius: wpc(5),
    // backgroundColor: Colors.mainColor,
    backgroundColor: '#FFDC49',
    marginTop: wpc(15),
    marginRight: wpc(10),
  },
  textHashTag: {
    fontSize: wpc(14),
    fontFamily: Fonts.type.base,
    color: Colors.blackBlur,
  },
  textTitle: {
    fontSize: wpc(Fonts.size.h5),
    color: Colors.gray4,
    paddingBottom: wpc(10),
  },
  textPointName: {
    color: Colors.gray2,
    fontSize: wpc(Fonts.size.h5),
    paddingBottom: wpc(7),
  },
  textPoint: {
    fontSize: wpc(Fonts.size.h3),
    color: Colors.textColor.gray2,
    fontFamily: Fonts.type.medium,
  },
  workplace: {
    width: wpc(30),
    height: wpc(30),
    position: 'absolute',
    bottom: 0,
    right: wpc(10),
    zIndex: -1,
  },
  textCartTime: {
    fontSize: wpc(Fonts.size.h6),
    fontFamily: Fonts.type.light,
    color: Colors.black,
  },
  textCartNoti: {
    fontSize: wpc(Fonts.size.h5),
    fontFamily: Fonts.type.base,
    color: Colors.blackBlur,
  },
  bellNoti: {
    position: 'absolute',
    width: wpc(25),
    height: wpc(25),
    backgroundColor: Colors.red,
    borderRadius: wpc(12.5),
    top: wpc(30),
    left: wpc(10),
    zIndex: -1,
  },
  closeIcon: {
    width: wpc(25),
    height: wpc(25),
  },
  closeButton: {
    position: 'absolute',
    right: wpc(5),
    top: wpc(5),
  },
  textService: {
    // fontSize: Fonts.size.h5,
    fontSize: wpc(14),
    fontFamily: Fonts.type.base,
    color: Colors.blackBlur,
    textAlign: 'center',
  },
  lastSectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wpc(19),
  },
  header: {
    minHeight: wpc(150),
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    paddingLeft: wpc(25),
  },
  tenantName: {
    fontSize: wpc(Fonts.size.h2),
    fontFamily: Fonts.type.medium,
    color: Colors.white,
  },
  contentInfo: {
    paddingHorizontal: 25,
  },
});
//
const DATA_NOTIFICATIONS = [
  {
    id: randomString({length: 10}),
    title: 'Ticket #09 has been completed',
    time: '3 minutes ago',
    unread: true,
  },
  {
    id: randomString({length: 10}),
    title: 'Your password has been changed',
    time: '2 hour ago',
    unread: false,
  },
  {
    id: randomString({length: 10}),
    title: 'Reminder: Booking Tennis Yard 1, 9:00AM...',
    time: '2020/03/15',
    unread: true,
  },
  {
    id: randomString({length: 10}),
    title: 'Moving #02 has been approved',
    time: '2020/03/14',
    unread: false,
  },
];
const CONTENTS = [
  {
    title: 'How do I stop my rental agreement? ',
    body:
      'No, this is not allowed. Please note that this might lead to immediate termination of your contract and a high financial claim as described in the General Terms & Conditions.',
  },
  {
    title: 'Can I change my account information?',
    body:
      'No, this is not allowed. Please note that this might lead to immediate termination of your contract and a high financial claim as described in the General Terms & Conditions.',
  },
  {
    title: 'Am I allowed to sub rent my apartment?',
    body:
      'No, this is not allowed. Please note that this might lead to immediate termination of your contract and a high financial claim as described in the General Terms & Conditions.',
  },
];
