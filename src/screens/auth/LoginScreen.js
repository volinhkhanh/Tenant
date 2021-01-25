import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {Input} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import OneSignal from 'react-native-onesignal';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {ENV} from 'react-native-dotenv';
//
import FullButton from '../../components/FullButton';
import DimSpinnerView from '../../components/DimSpinnerView';
import AlertConfirm from '../../components/alert/AlertConfirm';
//
import {KeyboardAvoidingView} from '../utils';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes/';
import {useTranslation} from '../../context/LanguageContext';
import {useSendBird} from '../../context';
import {getSendBirdChannel, getSendBirdUser} from '../../services/serviceRest';
//
const {height} = Dimensions.get('screen');
//
const account = () => {
  switch (ENV) {
    case 'dev':
      return {
        username: 'tenant@example.com',
        password: 'abc123',
      };
    case 'staging':
      return {
        // username: 'son.van@gmail.com',
        // password: 'Abc@1234',
        username: '',
        password: '',
      };

    default:
      return {
        username: '',
        password: '',
      };
  }
};
//
export default LoginScreen;
function LoginScreen(props) {
  const {
    navigation,
    getMemberData,
    postLogin,
    getLoginInProgress,
    checkToken,
    getUnitIdData,
  } = props;
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [emailId, setEmailId] = useState(account().username);
  const [password, setPassword] = useState(account().password);
  const [emailIdValid, setEmailIdValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [oneSignalId, setOneSignalId] = useState('123');
  const [deviceType, setDeviceType] = useState('ios');
  const [token, setToken] = useState(null);
  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const {
    t,
    loginWelcome,
    pleaseLogIn,
    loginId,
    loginPassword,
    forgot,
    logIn,
    termsNConditions,
    onlineRegistration,
    logInWrong,
    loginClose,
    itemRequired,
    i18nLoginTC,
    accountPending,
    accountRejected,
  } = useTranslation();
  const refRBSheet = useRef();
  const {connect} = useSendBird();
  //
  const onPressRightIcon = () => setHiddenPassword(!hiddenPassword);
  const onPressForgotID = () => navigation.navigate('FindIDAndPassword');
  const onPressRegister = () => navigation.navigate('Register');
  const onLogin = async () => {
    /**
     * Connect SendBird first!!!
     */
    // await AsyncStorage.setItem('userId1', 'chnirt@gmail.com');
    // await AsyncStorage.setItem(
    //   'channelUrl',
    //   'sendbird_group_channel_256668506_9e6a56c052d70c5ab0527e4d037a9a9d18414150',
    // );
    // await connect('chnirt@gmail.com');
    // navigation.navigate('Home');

    if (emailId === '' && password === '') {
      // setErrorMessage('* ' + t('AllFieldsAreRequired'))
      setErrorMessage(
        // t('ItemsAreRequired')
        itemRequired,
      );
      setEmailIdValid(true);
      setPasswordValid(true);
    } else if (emailId === '' && password !== '') {
      setErrorMessage(
        // t('ItemsAreRequired')
        itemRequired,
      );
      setEmailIdValid(true);
      setPasswordValid(false);
    } else if (emailId !== '' && password === '') {
      setErrorMessage(
        // t('ItemsAreRequired')
        itemRequired,
      );
      setEmailIdValid(false);
      setPasswordValid(true);
    } else {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      // console.log(fcmToken);
      const params = {
        email: emailId,
        password: password,
        // oneSignalId: oneSignalId,
        device_type: deviceType,
        firebase_token: fcmToken,
      };
      /**
       * Connect SendBird first!!!
       */
      const data = await postLogin(params);
      if (data) {
        setHiddenPassword(true);
        if (data === "ACCOUNT_INVALID") {
          setErrorMessage(
            '* ' +
              logInWrong,
          );
          setEmailIdValid(false);
          setPasswordValid(false);
          return
        } if (data === "ACCOUNT_PENDING") {
          setErrorMessage('')
          setAlertMessage(accountPending)
          setAlertShow(true)
          return
        } if (data === "ACCOUNT_REJECTED") {
          setErrorMessage('')
          setAlertMessage(accountRejected)
          setAlertShow(true)
          return
        }
        // if (data === 'do_not_have_unit') {
        //   setErrorMessage('* ' + t('NotExistUnit'));
        //   setEmailIdValid(false);
        //   setPasswordValid(false);
        // } else if (data === 'invalid_credentials') {
        //   setErrorMessage('* ' + t('EmailOrPasswordIsWrong'));
        //   setEmailIdValid(true);
        //   setPasswordValid(true);
        // } else if (data === 'user_not_found') {
        //   setErrorMessage('* ' + t('UserNotFound'));
        //   setEmailIdValid(true);
        //   setPasswordValid(true);
        // }
      } else {
        setErrorMessage('');
        setEmailIdValid(false);
        setPasswordValid(false);
      }
      const responseUser = await getSendBirdUser();
      // const responseChannel = await getSendBirdChannel();
      // console.log('🇾🇪', responseChannel?.data?.channel_url);
      await AsyncStorage.setItem('userId', responseUser?.data?.user_id);
      // console.log('🇿🇲', responseUser?.data?.channel_url);
      // await AsyncStorage.setItem(
      //   'channelUrl',
      //   responseChannel?.data?.channel_url,
      // );
      await connect(
        responseUser?.data?.user_id,
        '',
      );
    }
  };
  //
  const onIds = device => {
    setOneSignalId(device.userId);
    setDeviceType(DeviceInfo.getSystemName());
  };
  //
  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };
  //
  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  };
  //
  const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      await messaging().registerDeviceForRemoteMessages()
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  };
  //
  useEffect(() => {
    navigation.addListener('willFocus', () => {
      OneSignal.addEventListener('ids', onIds);
      // checkToken()
      getTokenFromStorage();
      checkPermission();
      setEmailIdValid(false);
      setPasswordValid(false);
      setEmailId('')
      setPassword('')
      setErrorMessage('')
    });
  }, []);
  //
  const getTokenFromStorage = async () => {
    const token = await AsyncStorage.getItem('token');
    !token ? SplashScreen.hide() : setToken(token);
  };
  //
  useEffect(() => {
    checkToken();
  }, [token]);
  //
  useEffect(() => {
    if (getMemberData) {
      navigation.navigate('Home', {unit_id: getUnitIdData});
    }
  }, [getMemberData, getUnitIdData]);
  //
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.titleText}>
              {/* {t('Welcome')} */}
              {loginWelcome}
            </Text>
            <View style={styles.subTitleBox}>
              <Text style={styles.subTitleText}>
                {pleaseLogIn}
              </Text>
            </View>
            <View style={styles.identifierInputBox}>
              <Input
                testID="email"
                placeholder={`${loginId}*`}
                autoCapitalize="none"
                placeholderTextColor={Colors.textColor.gray6}
                inputContainerStyle={[
                  styles.textInputEmail,
                  {
                    borderBottomColor: emailIdValid
                      ? Colors.red
                      : emailId !== ''
                      ? Colors.mainColor
                      : Colors.gray6,
                  },
                ]}
                inputStyle={
                  (styles.placeholder,
                  {paddingVertical: 5, fontSize: Fonts.size.h4})
                }
                onChangeText={value => {
                  setEmailId(value);
                }}
                value={emailId}
              />
              <Input
                testID="password"
                placeholder={`${loginPassword}*`}
                name="password"
                placeholderTextColor={Colors.textColor.gray6}
                inputContainerStyle={[
                  styles.textInputPassword,
                  {
                    borderBottomColor: passwordValid
                      ? Colors.red
                      : password !== ''
                      ? Colors.mainColor
                      : Colors.gray6,
                  },
                ]}
                inputStyle={
                  (styles.placeholder,
                  {paddingVertical: 5, fontSize: Fonts.size.h4})
                }
                secureTextEntry={hiddenPassword}
                errorMessage={errorMessage}
                value={password}
                errorStyle={styles.errorPassword}
                onChangeText={value => setPassword(value)}
                rightIcon={
                  <Ripple onPress={onPressRightIcon}>
                    <MaterialCommunityIcons
                      style={{
                        paddingLeft: 10,
                        transform: [{rotateY: '180deg'}],
                      }}
                      name={`eye${hiddenPassword ? '-off' : ''}-outline`}
                      size={22}
                      color={Colors.cloud}
                    />
                  </Ripple>
                }
              />
              <View style={styles.forgotIdPassword}>
                <Ripple onPress={onPressForgotID}>
                  <Text style={styles.forgotIdPasswordText}>
                    {/* {t('ForgotIdOrPassword')} */}
                    {forgot}
                  </Text>
                </Ripple>
              </View>
            </View>
            <View style={styles.submitBox}>
              <FullButton
                textStyle={styles.submitTextButton}
                title={
                  // t('Login')
                  logIn
                }
                onPress={() => {
                  onLogin();
                }}
              />
            </View>
            <Ripple
              style={styles.termsBox}
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <Text style={styles.termsText}>
                {/* {t('Terms&Conditions')} */}
                {termsNConditions}
              </Text>
            </Ripple>
          </View>
        </View>
        <Ripple style={styles.registerBox} onPress={onPressRegister}>
          <Text style={styles.registerText}>
            {/* {t('OnlineRegistration')} */}
            {onlineRegistration}
          </Text>
        </Ripple>
      </KeyboardAvoidingView>
      <RBSheet
        ref={refRBSheet}
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
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.modalTitle}>
              {/* {t('Terms&Conditions')} */}
              {termsNConditions}
            </Text>
            <Text style={styles.separator} />
          </View>
        </View>
        <ScrollView style={styles.modalInfo}>
          <Text style={styles.modalDes}>{`${i18nLoginTC}`}</Text>
        </ScrollView>
        <View style={styles.closeButton}>
          <FullButton
            textStyle={styles.modalTextButton}
            title={
              // t('Close')
              loginClose
            }
            onPress={() => {
              refRBSheet.current.close();
            }}
          />
        </View>
      </RBSheet>
      <AlertConfirm
        title={alertMessage}
        show={alertShow}
        closeButton={true}
        onPressCancel={() => {
          setAlertShow(false);
          // navigation.pop()
        }}
      />
      {getLoginInProgress && <DimSpinnerView />}
    </View>
  );
}

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
    backgroundColor: Colors.backgroundLightGray,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: ApplicationStyles.utils.resizeHeight(94),
    paddingHorizontal: ApplicationStyles.utils.resizeHeight(28),
    alignItems: 'center',
  },
  submitBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(28),
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  closeButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    ...ApplicationStyles.shadow.dynamicOffset(1, 4, undefined, 0.15, 8),
  },
  submitTextButton: {
    color: Colors.black,
  },
  modalTextButton: {
    color: Colors.black,
    paddingHorizontal: 30,
  },
  titleText: {
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
    alignSelf: 'flex-start',
  },
  image: {
    marginTop: ApplicationStyles.utils.resizeHeight(34),
  },
  subTitleBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(7),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  subTitleText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
  languageBox: {},
  identifierInputBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(36),
  },
  textInputEmail: {
    minHeight: ApplicationStyles.utils.resizeHeight(52),
    borderBottomWidth: 1,
    // marginBottom: ApplicationStyles.utils.resizeHeight(20),
    borderBottomColor: Colors.gray6,
    borderBottomWidth: 1,
    width: '100%',
  },
  textInputPassword: {
    minHeight: ApplicationStyles.utils.resizeHeight(52),
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray6,
    borderBottomWidth: 1,
    width: '100%',
  },
  errorPassword: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    paddingTop: 10,
  },
  placeholder: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  forgotIdPassword: {
    paddingVertical: 15,
    alignItems: 'flex-end',
  },
  forgotIdPasswordText: {
    marginTop: 20,
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
  termsBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(10),
  },
  termsText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  registerBox: {
    marginBottom: ApplicationStyles.utils.resizeHeight(30),
    alignItems: 'center',
  },
  registerText: {
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.base,
    color: Colors.mainColor,
  },
  overlayBox: {
    height: '100%',
    paddingLeft: ApplicationStyles.utils.resizeHeight(25),
    paddingRight: ApplicationStyles.utils.resizeHeight(15),
  },
  negativeOverlayBox: {
    marginLeft: -ApplicationStyles.utils.resizeHeight(25),
    marginRight: -ApplicationStyles.utils.resizeHeight(15),
    paddingLeft: ApplicationStyles.utils.resizeHeight(25),
    paddingRight: ApplicationStyles.utils.resizeHeight(15),
  },
  overlayTitle: {
    marginTop: ApplicationStyles.utils.resizeHeight(16),
    ...Fonts.style.h5,
    fontFamily: Fonts.type.semiBold,
  },
  overlayContentText: {
    ...Fonts.style.h5,
    color: Colors.textColor.tiny,
  },
  buttonCloseBox: {
    backgroundColor: 'white',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: ApplicationStyles.utils.resizeHeight(24),
    paddingVertical: ApplicationStyles.utils.resizeHeight(27),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {},
  modalContent: {
    paddingTop: 20,
    paddingHorizontal: 35,
  },
  modalInfo: {
    paddingBottom: 70,
    paddingHorizontal: 35,
  },
  modalDes: {
    color: Colors.textColor.gray7,
    fontSize: Fonts.size.h5,
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
  langContent: {
    flexDirection: 'row',
  },
  arrowDown: {
    justifyContent: 'center',
    marginLeft: 5,
  },
});
