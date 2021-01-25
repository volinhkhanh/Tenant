import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
//
import { ApplicationStyles, Colors, Fonts } from '../../themes/';
//
import InputPassword from '../../components/PasswordInput';
import FullButton from '../../components/FullButton';
import DimSpinnerView from '../../components/DimSpinnerView';
import OutlineButton from '../../components/OutlineButton';
//
import { KeyboardAvoidingView } from '../utils';
//
import {useTranslation} from '../../context/LanguageContext';
//
export default ResetPasswordScreen;
function ResetPasswordScreen(props) {
  const { navigation, postResetPassword, getValidOTPData, getResetPasswordInProgress } = props;
  const {
    t,
    i18nResetPassword,
    i18nNewPassword,
    i18nConfirmPassword,
    i18nResetPasswordYPMCAM,
    i18nResetPasswordSave,
    i18nResetPasswordCancel,
    i18nResetPasswordMNPACNPF,
  } = useTranslation()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [matchPassowrd, setMatchPassowrd] = useState(true);
  //
  const setTextNewPassword = (value) => {
    setNewPassword(value)
  }
  //
  const setTextConfirmPassword = (value) => {
    setConfirmPassword(value)
  }
  //
  const validatePassword = (password) => {
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      return re.test(password);
  };
  //
  const onPressBack = () => navigation.navigate('Login');
  //
  const onResetPasswordSuccess = async() => {
    if (!validatePassword(newPassword)) {
      setValidPassword(false)
    } else {
      setValidPassword(true)
    }
    //
    if (newPassword === confirmPassword) {
      setMatchPassowrd(true)
    } else {
      setMatchPassowrd(false)
    }
    //
    if (newPassword === confirmPassword && validatePassword(newPassword)) {
      const data = await postResetPassword({
        'reset_password_token': getValidOTPData?.token || '',
        'password': confirmPassword
      })
      if(data) {
        navigation.navigate('ResetPasswordSuccess')
      }
      //
    }
  };
  //
  const errorMessage = `* ${i18nResetPasswordYPMCAM}`
  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.titleText}>{i18nResetPassword}</Text>
            <View style={styles.identifierInputBox}>
              <View style={{ marginVertical: 10 }}>
                <InputPassword
                  placeholder={i18nNewPassword}
                  onPress={setTextNewPassword}
                />
              </View>
              {
                !validPassword &&
                <Text style={styles.errorMessage}>
                  {errorMessage}
                </Text>
              }
              <View style={{ marginVertical: 10 }}>
                <InputPassword placeholder={i18nConfirmPassword}
                  onPress={setTextConfirmPassword}
                />
              </View>
              {
                !matchPassowrd && validPassword &&
                <Text style={styles.errorMessage}>
                  *{i18nResetPasswordMNPACNPF}
                </Text>
              }
            </View>

            <View style={styles.submitBox}>
              <OutlineButton
                style={styles.cancelButton}
                title={i18nResetPasswordCancel}
                onPress={onPressBack}
              />
              <FullButton
                style={styles.submitButton}
                title={i18nResetPasswordSave}
                onPress={onResetPasswordSuccess}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      {getResetPasswordInProgress && <DimSpinnerView />}
    </View>
  );
}

const styles = StyleSheet.create({
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
  identifierInputBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(30),
    width: '100%'
  },

  titleText: {
    ...Fonts.style.h1,
    fontFamily: Fonts.type.semiBold,
    color: Colors.textColor.black,
    alignSelf: 'flex-start', 
  },
  image: {
    marginTop: ApplicationStyles.utils.resizeHeight(37),
  },
  descriptionBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(52),
  },
  descriptionText: {
    ...Fonts.style.h5,
    fontFamily: Fonts.type.semiBold,
    textAlign: 'center',
    color: Colors.textColor.tiny,
  },
  descriptionText1: {
    ...Fonts.style.h5,
    paddingLeft: 4,
    textAlign: 'center',
    color: Colors.mainColor,
  },
  errorMessage: {
    marginBottom: 10,
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.light,
    color: Colors.red,
    paddingHorizontal: 10,
  },
});
