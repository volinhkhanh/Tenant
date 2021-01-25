import React, {memo, useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes/';
//
import {setTokenToHeaders} from '../../services/serviceRest';
//
import InputPassword from '../../components/PasswordInput';
import Button from '../../components/button';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {KeyboardAvoidingView} from '../utils';
//
import {useTranslation} from '../../context/LanguageContext';
//
function ChangePasswordScreen(props) {
  const {
    navigation,
    postChangePassword,
    getChangePasswordProgress,
    getChangePasswordData,
  } = props;
  //
  const {
    t,
    i18nChangePasswordCop,
    i18nChangePasswordCuP,
    i18nChangePasswordNeP,
    i18nChangePasswordCoNeP,
    i18nChangePasswordSa,
    i18nChangePasswordMNPW,
    i18nChangePasswordICP,
    i18nChangePasswordCPWE,
  } = useTranslation();
  //
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [matchPassowrd, setMatchPassowrd] = useState(true);
  //
  const validatePassword = password => {
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return re.test(password);
  };
  //
  const onChangePassword = async () => {
    if (!validatePassword(newPassword)) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
    //
    if (newPassword === confirmPassword) {
      setMatchPassowrd(true);
    } else {
      setMatchPassowrd(false);
    }
    //
    if (newPassword === confirmPassword && validatePassword(newPassword)) {
      const data = await postChangePassword({
        new_password: newPassword,
        old_password: currentPassword,
      });
      if (data) {
        AsyncStorage.removeItem('token');
        setTokenToHeaders(null);
        navigation.navigate('ChangePasswordSuccess');
      } else {
        setCurrentPasswordError(i18nChangePasswordICP);
      }
      //
    }
  };
  //
  const inputs = {};
  const focusNextField = id => {
    inputs[id].focus();
  };
  //
  const errorMessage = `*${i18nChangePasswordCPWE}`;
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('ChangePassword')
          i18nChangePasswordCop
        }
      />
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.identifierInputBox}>
              <View style={{marginVertical: 10}}>
                <InputPassword
                  setRef={ref => (inputs['currentPassword'] = ref)}
                  onSubmitEditing={() => focusNextField('newPassword')}
                  blurOnSubmit={false}
                  returnKeyType={'next'}
                  placeholder={
                    // t('CurrentPassword')
                    i18nChangePasswordCuP
                  }
                  onPress={setCurrentPassword}
                />
              </View>
              {currentPasswordError !== '' && (
                <Text style={styles.errorMessage}>{currentPasswordError}</Text>
              )}
              <View style={{marginVertical: 10}}>
                <InputPassword
                  setRef={ref => (inputs['newPassword'] = ref)}
                  onSubmitEditing={() => focusNextField('confirmPassword')}
                  blurOnSubmit={false}
                  returnKeyType={'next'}
                  placeholder={
                    // t('NewPassword')
                    i18nChangePasswordNeP
                  }
                  onPress={setNewPassword}
                />
              </View>
              {!validPassword && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
              <View style={{marginVertical: 10}}>
                <InputPassword
                  setRef={ref => (inputs['confirmPassword'] = ref)}
                  placeholder={
                    // t('ConfirmNewPassword')
                    i18nChangePasswordCoNeP
                  }
                  onSubmitEditing={() => onChangePassword()}
                  onPress={setConfirmPassword}
                />
              </View>
              {!matchPassowrd && validPassword && (
                <Text style={styles.errorMessage}>
                  {`*${i18nChangePasswordMNPW}`}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={styles.submitBox}>
          <Button
            text={
              // t('Save')
              i18nChangePasswordSa
            }
            onPress={onChangePassword}
          />
        </View>
      </KeyboardAvoidingView>
      {getChangePasswordProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default memo(ChangePasswordScreen);
//
const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  content: {
    flex: 1,
    marginTop: ApplicationStyles.utils.resizeHeight(43),
    // padding: 100,
    paddingHorizontal: ApplicationStyles.utils.resizeHeight(28),
  },
  submitBox: {
    marginBottom: ApplicationStyles.utils.resizeHeight(50),
    marginHorizontal: 25,
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
  },

  titleText: {
    ...Fonts.style.h1,
    width: ApplicationStyles.utils.resizeWidth(180),
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
