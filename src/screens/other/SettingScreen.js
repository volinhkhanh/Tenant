import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import _ from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ripple from 'react-native-material-ripple';
import OneSignal from 'react-native-onesignal';
import {postLogout} from '../../services/serviceRest'
//
import {
  ArrowForwardIcon,
  Annoucement,
  LanguageSetting,
  BellSettings,
  Settings,
  OutIcon,
  WorkPlace,
  SupportIcon,
  CheckedIcon,
  ChevronRight,
} from '../../components/icons';
//
import {SettingItem, SettingItemAnnoucement} from '../../components/ListItem';
import AlertConfirm from '../../components/alert/AlertConfirm';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes/';
//
import NotificationSettingScreen from './NotificationSettingScreen';
import ContainerNotificationSetting from '../../containers/ContainerNotificationSetting';
//
import * as serviceRest from '../../services/serviceRest';
import Toast from 'react-native-simple-toast';
import {color} from 'react-native-reanimated';
import {useTranslation} from '../../context/LanguageContext';
import AsyncStorage from '@react-native-community/async-storage';
import {setTokenToHeaders} from '../../services/serviceRest';
import {wpc, hpc, hp} from '../../utils/responsePixel';
//
const {width, height} = Dimensions.get('window');
//
function SettingScreen(props) {
  const {
    navigation,
    getListAnnoucement,
    listAnnoucemnent,
    totalReadAnnoucement,
    getGeneralInformationData,
    setMemberData,
  } = props;
  const [dataAnnoucement, setDataAnnoucement] = useState([]);
  const [dataSetting, setDataSetting] = useState(null);
  const getData = () => {
    getListAnnoucement({
      unit_id: getGeneralInformationData?.unit_id,
    });
  };
  useEffect(() => {
    getData();
    navigation.addListener('willFocus', () => {
      getData();
    });
  }, []);
  //
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <SettingTab {...props} dataSetting={dataSetting} />
      </View>
    </View>
  );
}
function SettingTab(props) {
  const {
    navigation,
    loading,
    listAnnoucemnent,
    totalReadAnnoucement,
    dataSetting,
    listDataSetting,
    getGeneralInformationData,
    setMemberData,
  } = props;
  const [alertShow, setAlertShow] = useState(false);
  const [notiShow, setNotiShow] = useState(false);
  const [totalNoti, setTotalNoti] = useState(null);
  const [languageShow, setLanguageShow] = useState(false);
  const refRBSheet = useRef()
  const refRBSheetNoti = useRef()
  const {
    t,
    language,
    switchLanguage,
    i18nSettingMo,
    i18nSettingNo,
    i18nSettingNS,
    i18nSettingSu,
    i18nSettingAn,
    i18nSettingCS,
    i18nSettingSe,
    i18nSettingAc,
    i18nSettingPr,
    i18nSettingCP,
    i18nSettingEl,
    i18nSettingLa,
    i18nSettingEn,
    i18nSettingVi,
    i18nSettingLo,
    i18nSettingGB,
    i18nSettingAskLo,
    i18nNotificationSettingSa,
  } = useTranslation();
  const itemStyle = {
    paddingVertical: 15,
    paddingLeft: ApplicationStyles.utils.resizeLimitedWidth(70),
  };
  const DATA = [
    {
      id: 'en',
      name: 'English',
      checked: language === 'en',
    },
    {
      id: 'vi',
      name: 'Tiếng Việt',
      checked: language === 'vi',
    },
  ];
  const [data, setData] = useState(DATA);
  const onPressLogout = async() => {
    const response = await postLogout()
    // console.log(response)
    OneSignal.setSubscription(false)
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('messages');
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('messages');
    AsyncStorage.removeItem('channels');
    AsyncStorage.removeItem('moving-list');
    // AsyncStorage.clear();
    setTokenToHeaders(null);
    setMemberData(null)
    navigation.navigate('Auth');
    setAlertShow(false);
  };

  function joinChannel(props) {
    navigation.navigate('ChattingBox', {
      chatboxType: 'buildManager',
      userId: getMemberData?.person.user_id,
    });
  }

  useEffect(() => {
    console.log('listDataSetting', listDataSetting)
  }, [listDataSetting])
  useEffect(() => {
    console.log('dataSetting', dataSetting)
  }, [dataSetting])

  const renderHeader = () => {
    return (
      <View
        style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: width - 40, marginBottom: 30}}>
          <Text style={{fontSize: 28, fontFamily: Fonts.type.base}}>
            {/* {t('More')} */}
            {i18nSettingMo}
          </Text>
        </View>
        <Ripple
          style={styles.image}
          onPress={() => {
            navigation.navigate('ViewProfile', getGeneralInformationData);
          }}>
          <View style={styles.viewAvatar}>
            <View style={{marginLeft: 20}}>
              <Image
                source={{uri: getGeneralInformationData?.avatar?.url || ''}}
                style={{height: 50, width: 50, borderRadius: 25}}
              />
            </View>
            <View style={styles.Info}>
              <Text style={styles.txtInfoName}>
                {getGeneralInformationData?.full_name}
              </Text>
              <Text style={styles.txtRegular}>
                {`${getGeneralInformationData?.apartment || ''} - ${
                  getGeneralInformationData?.unit || ''
                }`}
              </Text>
            </View>
          </View>
          <View style={styles.viewWorkplace}>
            <WorkPlace size={24} style={{marginRight: 20}} />
          </View>
        </Ripple>
      </View>
    );
  };
  const renderModelLanguage = () => {
    return (
      // <Modal animationType="slide" transparent={true} visible={languageShow}>
      <RBSheet
        ref={refRBSheet}
        onClose={() => setLanguageShow(false)}
        height={200}
        openDuration={300}
        customStyles={{
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
        }}>
        {/* <View style={{flex: 1, ...ApplicationStyles.boxShadow}}> */}
          {/* <TouchableWithoutFeedback onPress={() => SetLanguageShow(false)}> */}
          {/* <TouchableWithoutFeedback onPress={() => refRBSheet.current.close()}> 
            <View style={{height: height - 200}} />
          </TouchableWithoutFeedback> */}
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={{
              width: '100%',
              height: 200,
              width: '100%',
              backgroundColor: Colors.white,
              position: 'absolute',
              bottom: 0,
              borderTopRightRadius: 32,
              borderTopLeftRadius: 32,
            }}>
            {data.map((item) => {
              return (
                <Ripple
                  key={item.id}
                  style={[
                    itemStyle,
                    styles.item1,
                    {
                      borderTopLeftRadius: item.id == '1' ? 32 : 0,
                      borderTopRightRadius: item.id == '1' ? 32 : 0,
                    },
                  ]}
                  activeOpacity={1}
                  onPress={() => {
                    const newData = _.map(data, (_item) => {
                      if (_item.id === item.id) {
                        return {..._item, checked: true};
                      }
                      return {..._item, checked: false};
                    });
                    switchLanguage(item.id);
                    setData(newData);
                    refRBSheet.current.close()
                  }}>
                  <View style={styles.left}>
                    <Text style={styles.title}>{item.name}</Text>
                  </View>
                  {item.checked && (
                    <CheckedIcon size={25} color={Colors.mainColor} />
                  )}
                </Ripple>
              );
            })}
          </ScrollView>
        {/* </View> */}
      {/* </Modal> */}
      </RBSheet>
    );
  };
  const renderLanguage = () => {
    return (
      <Ripple
        style={styles.item1}
        activeOpacity={0.7}
        // onPress={() => SetLanguageShow(!languageShow)}>
        onPress={() => {
          setLanguageShow(true)
          refRBSheet.current.open()
          }}>
        <View style={styles.left}>
          <LanguageSetting width="25" height="25" fill={Colors.gray2} />
          <Text>{'   '}</Text>
          <Text style={[styles.title, {color: Colors.black}]}>
            {/* {t('Language')} */}
            {i18nSettingLa}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.title, {color: Colors.gray2, paddingRight: 10}]}>
            {data.filter((item) => item.checked === true)[0]?.name}
          </Text>
          <Image style={{
            width: 10,
            height: 15,
            marginLeft: 20,
            transform: [{rotate: languageShow ? '90deg' : '0deg'}]
          }} source={ChevronRight} />
          {/* <ArrowForwardIcon
            size={20}
            color={Colors.gray5}
            style={{
              transform: [{rotate: languageShow ? '90deg' : '0deg'}],
            }}
          /> */}
        </View>
      </Ripple>
    );
  };
  const onSaveSetting = async () => {
    try {
      let data = await serviceRest.saveSettingNotify(listDataSetting);
      refRBSheetNoti.current.close()
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        <View style={{marginTop: 30, ...ApplicationStyles.boxShadow}}>
          <SettingItemAnnoucement
            title={
              i18nSettingNo
            }
            leftIcon={(props) => (
              <Annoucement
                width="25"
                height="25"
                fill={Colors.gray2}
                {...props}
              />
            )}
            onPress={() => navigation.navigate('Announcement')}
            totalNotRead={totalReadAnnoucement}
          />
          <SettingItem
            title={
              i18nSettingNS
            }
            leftIcon={() => (
              <Settings width="25" height="25" color={Colors.gray2} />
            )}
            isOpen={notiShow}
            // onPress={() => setNotiShow(!notiShow)}
            onPress={() => {
              setNotiShow(true)
              refRBSheetNoti.current.open()
            }}
          />
          <SettingItem
            title={
              // t('Support')
              i18nSettingSu
            }
            leftIcon={() => <SupportIcon width="25" height="25" />}
            onPress={() =>
              navigation.navigate('FAQ', getGeneralInformationData)
            }
          />
          {renderLanguage()}
          <SettingItem
            title={
              // t('Logout')
              i18nSettingLo
            }
            leftIcon={() => (
              <OutIcon
                width="25"
                height="25"
                color={Colors.gray2}
                onPress={() => {}}
              />
            )}
            onPress={() => setAlertShow(true)}
          />
        </View>
      </ScrollView>
      <AlertConfirm
        title={
          // t('DoLogout')
          i18nSettingAskLo
        }
        show={alertShow}
        rightText={
          // t('Logout')
          i18nSettingLo
        }
        leftText={
          // t('GoBack')
          i18nSettingGB
        }
        onPressCancel={() => setAlertShow(false)}
        onPressConfirm={onPressLogout}
      />
      {renderModelLanguage()}
      {/* <Modal animationType="slide" transparent={true} visible={notiShow}> */}
      <RBSheet
        ref={refRBSheetNoti}
        height={400}
        openDuration={300}
        onClose={() => setNotiShow(false)}
        customStyles={{
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
        }}>
        <View style={{flex: 1, backgroundColor: 'gray'}}>
          {/* <TouchableWithoutFeedback onPress={() => setNotiShow(false)}>
            <View style={{height: height - 450}} />
          </TouchableWithoutFeedback> */}
          <View
            style={{
              height: 400,
              width: '100%',
              backgroundColor: Colors.white,
              position: 'absolute',
              bottom: 0,
              // ...ApplicationStyles.boxShadow,
            }}>
            <ContainerNotificationSetting data={dataSetting} />
            <View style={{alignItems: 'flex-end', height: 50, width: '100%'}}>
              <Ripple
                style={{marginLeft: 26, height: 50, width: 70}}
                onPress={() => onSaveSetting()}>
                <Text
                  style={{
                    color: Colors.mainColor,
                    fontFamily: Fonts.type.base,
                    fontSize: 18,
                    lineHeight: 21,
                    fontWeight: '500',
                  }}>
                  {i18nNotificationSettingSa}
                </Text>
              </Ripple>
            </View>
          </View>
        </View>
      {/* </Modal> */}
      </RBSheet>
    </View>
  );
}
//
export default SettingScreen;
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingLeft: 26,
    paddingRight: 21,

    borderBottomColor: Colors.gray5,
    borderBottomWidth: 0.5,
  },
  image: {
    height: 80,
    width: width - 40,
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    ...ApplicationStyles.boxShadow,
  },
  viewAvatar: {
    width: '80%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewWorkplace: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 0,
    right: 10,
    zIndex: -1,
  },
  Info: {
    marginLeft: 10,
  },
  txtInfoName: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.type.medium,
    lineHeight: 25,
  },
  txtRegular: {
    fontSize: 14,
    color: Colors.gray2,
    fontFamily: Fonts.type.base,
    lineHeight: 22,
  },
  item1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 21,
    paddingVertical: 26,
    paddingLeft: ApplicationStyles.utils.resizeLimitedWidth(26),
    width: '100%',
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 1,
    backgroundColor: Colors.white,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
});
