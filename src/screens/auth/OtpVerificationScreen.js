import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TextInput,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import Ripple from 'react-native-material-ripple';
import OTPInputView from '@twotalltotems/react-native-otp-input'
//
import FullButton from '../../components/FullButton';
import AlertConfirm from '../../components/alert/AlertConfirm';
import DimSpinnerView from '../../components/DimSpinnerView';
import OutlineButton from '../../components/OutlineButton';
//
import { KeyboardAvoidingView } from '../utils';
import {wpc, hpc} from '../../utils/responsePixel';
//
import { hexToRGBA } from '../../services/utils';
//
import OtpInput from '../../images/otp-input.svg';
//
import { ApplicationStyles, Colors, Fonts } from '../../themes';
//
import {useTranslation} from '../../context/LanguageContext';
//
export default OtpVerificationScreen;
//
function OtpVerificationScreen(props) {
  const { navigation, postOTP, postValidOTP, getOTPData, getValidOTPInProgress } = props
  const {
    t,
    i18nOtpDRAC,
    i18nOtpEOST,
    i18nOtpRN,
    i18nOtpV,
    i18nOtpOV,
    i18nOtpOYEAWO,
    i18nOtpOYROOT,
    i18nOtpC,
    findIDCancel,
    i18nOtpYIHBSV,
  } = useTranslation()
  const {params, type} = navigation.state.params
  const [activeOtp, setActiveOtp] = useState(true)
  const [countDown, setCountDown] = useState(300)
  // const input1 = React.useRef()
  // const input2 = React.useRef()
  // const input3 = React.useRef()
  // const input4 = React.useRef()
  const [inputText, setInputText] = useState('')

  // const [inputText, setInputText] = useState({
  //   a: '',
  //   b: '',
  //   c: '',
  //   d: '',
  // });
  // const onChangeText = (type, value) => {
  //   setInputText({
  //     ...inputText,
  //     [type]: value,
  //   });
  // };
  const onPressBack = () => navigation.pop();
  const onVerifySuccess = async() => {
    // let otpCode = ''
    // Object.keys(inputText).map(function(key) {
    //   otpCode += inputText[key]
    // });
    const data = await postValidOTP({
      'otp_session': getOTPData,
      'otp': inputText
    })
    // console.log(data)
    if(data) {
      setAlertShow2(true)
    } else {
      setAlertShow(true)
    }
  };
  //
  const [alertShow, setAlertShow] = useState(false);
  const [alertShow2, setAlertShow2] = useState(false);
  const [alertShow3, setAlertShow3] = useState(false);
  //
  const onPressVerify = () => {
    if(!activeOtp) {
      setAlertShow3(true)
    } else {
      if(inputText.length == 4) {
        onVerifySuccess()
      } else {
        setAlertShow(true);
      }
    }
  }
  //
  const reSendOtp = async () => {
    if(countDown == 300) {
      setCountDown(301)
    } else {
      setCountDown(300)
    }
    postOTP(t, params)
    setActiveOtp(true)
  }
  //
  // useEffect(() => {
  //   callApiGetOTP()
  // }, []);
  //
  // const callApiGetOTP = async() => {
  //   const data = await postOTP(t, params)
  //   if(!data) {
  //     navigation.pop()
  //   }
  // }
  //
  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.titleText}>{i18nOtpOV}</Text>
            <OtpInput
              style={styles.image}
              width={`${ApplicationStyles.utils.resizeWidth(244)}`}
              height={`${ApplicationStyles.utils.resizeHeight(198)}`}
            />
            <View style={styles.textSentBox}>
              <Text style={styles.phoneNumberText}>
                {i18nOtpEOST}
                <Text style={styles.phoneNumberText1}>{`${params.phone}`}</Text>
              </Text>
            </View>
            {/*  */}
            <OTPInputView
              style={{width: '80%', height: 50, color: '#000'}}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged = {code => {setInputText(code)}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.styleBase}
              codeInputHighlightStyle={styles.styleHighLighted}
              placeholderTextColor={{color: '#fff'}}
              // onCodeFilled = {(code => {
              //     console.log(`Code is ${code}, you are good to go!`)
              // })}
            />
            {/* <View style={styles.numberInputBox}>
              <TextInput
                ref={input1}
                style={styles.numberInput}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={text => {
                  onChangeText('a', text);
                  if (text !== '') {
                    input2.current.focus();
                  }
                }}
                value={inputText.a}
              />
              <TextInput
                ref={input2}
                style={styles.numberInput}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={text => {
                  onChangeText('b', text);
                  if (text !== '') {
                    input3.current.focus();
                  } else {
                    input1.current.focus();
                  }
                }}
                value={inputText.b}
              />
              <TextInput
                ref={input3}
                style={styles.numberInput}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={text => {
                  onChangeText('c', text);
                  if (text !== '') {
                    input4.current.focus();
                  } else {
                    input2.current.focus();
                  }
                }}
                value={inputText.c}
              />
              <TextInput
                ref={input4}
                style={styles.numberInput}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={text => {
                  onChangeText('d', text);
                  if (text !== '') {
                    Keyboard.dismiss();
                  } else {
                    input3.current.focus();
                  }
                }}
                value={inputText.d}
              />
            </View> */}
            {/*  */}
            <View style={{width: '100%'}}>
            <CountDown
              size={8}
              until={countDown}
              onFinish={() => {
                // setCountDown(null)
                setActiveOtp(false)
              }}
              // onChange={(value) => {setCountDown(value)}}
              digitStyle={styles.countDown}
              digitTxtStyle={styles.countdownText}
              timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
              separatorStyle={[styles.countdownText, {marginTop: ApplicationStyles.utils.resizeHeight(20)}]}
              timeToShow={['M', 'S']}
              timeLabels={{m: null, s: null}}
              showSeparator
            />
            </View>
            {/* <Text style={styles.countdownText}>{'02:58'}</Text> */}
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                {i18nOtpDRAC}
              </Text>
              <Ripple disabled={activeOtp} onPress={reSendOtp}>
                <Text style={[styles.descriptionText1, {opacity: activeOtp ? 0.7 : 1}]}>
                  {i18nOtpRN}
                </Text>
              </Ripple>
            </View>
            <View style={styles.submitBox}>
              <OutlineButton
                style={styles.cancelButton}
                title={findIDCancel}
                onPress={onPressBack}
              />
              <FullButton
                style={styles.submitButton}
                title={i18nOtpV}
                onPress={() => {
                  onPressVerify()
                  // onVerifySuccess();
                  // setAlertShow(true);
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <AlertConfirm
        style={{ width: '100%' }}
        show={alertShow}
        title={i18nOtpOYEAWO}
        leftText={null}
        onPressCancel={() => {
          setAlertShow(false);
        }}
        closeButton={true}
      />
      <AlertConfirm
        style={{ width: '100%' }}
        show={alertShow2}
        title={i18nOtpYIHBSV}
        leftText={null}
        onPressCancel={() => {
          setAlertShow2(false);
          // navigation.navigate('FindIDScreen');
          type === 0 ? navigation.replace('FindID') : navigation.replace('ResetPassword')
        }}
        closeButton={true}
      />
      <AlertConfirm
        style={{ width: '100%' }}
        show={alertShow3}
        title={i18nOtpOYROOT}
        leftText={null}
        onPressCancel={() => {
          setAlertShow3(false);
        }}
        closeButton={true}
      />
      {getValidOTPInProgress && <DimSpinnerView />}
    </View>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },
  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  styleBase: {
    width: ApplicationStyles.utils.resizeHeight(40),
    // borderBottomColor: hexToRGBA(Colors.mainColor, 0.4),
    borderWidth: 0,
    borderBottomWidth: 1,
    textAlign: 'center',
    // marginHorizontal: ApplicationStyles.utils.resizeHeight(20),
    ...Fonts.style.h3,
    color: Colors.textColor.black,
    fontFamily: Fonts.type.semiBold,
    // padding: ApplicationStyles.utils.resizeHeight(10),
  },
  styleHighLighted: {
    borderColor: Colors.mainColor,
  },
  //
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
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
    marginTop: ApplicationStyles.utils.resizeHeight(60),
    marginBottom: ApplicationStyles.utils.resizeHeight(30),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    marginHorizontal: ApplicationStyles.utils.resizeHeight(8),
  },
  cancelButton: {
    flex: 1,
    marginHorizontal: ApplicationStyles.utils.resizeHeight(8),
  },
  submitButtonText: {
    backgroundColor: 'transparent',
    ...Fonts.style.h3,
    letterSpacing: 0.3,
    fontFamily: Fonts.type.bold,
    color: Colors.textColor.white,
  },
  titleText: {
    ...Fonts.style.h1,
    fontFamily: Fonts.type.semiBold,
    color: Colors.textColor.black,
    alignSelf: 'flex-start',
  },
  image: {
    marginTop: ApplicationStyles.utils.resizeHeight(34),
  },
  textSentBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(30),
  },
  phoneNumberText: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  phoneNumberText1: {
    fontFamily: Fonts.type.semiBold,
    color: Colors.black,
  },
  numberInputBox: {
    flexDirection: 'row',
  },
  numberInput: {
    width: ApplicationStyles.utils.resizeHeight(40),
    borderBottomColor: hexToRGBA(Colors.mainColor, 0.4),
    borderBottomWidth: 1,
    textAlign: 'center',
    marginHorizontal: ApplicationStyles.utils.resizeHeight(20),
    ...Fonts.style.h3,
    color: Colors.textColor.black,
    fontFamily: Fonts.type.semiBold,
    padding: ApplicationStyles.utils.resizeHeight(10),
  },
  countDown: {
    width: wpc(25),
    marginTop: ApplicationStyles.utils.resizeHeight(20),
    // height: 60
  },
  countdownText: {
    // marginTop: ApplicationStyles.utils.resizeHeight(28),
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  descriptionBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(17),
    flexDirection: 'row',
  },
  descriptionText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    textAlign: 'center',
    color: Colors.black,
  },
  descriptionText1: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    paddingLeft: 4,
    textAlign: 'center',
    color: Colors.mainColor,
  },
});
