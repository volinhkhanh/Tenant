import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import FullButton from '../../components/FullButton';
//
import OtpWrong from '../../images/otp-wrong.svg';
//
import { ApplicationStyles, Colors, Fonts } from '../../themes';
//
import {useTranslation} from '../../context/LanguageContext';

function OtpVerificationSuccessScreen(props) {
  const { navigation } = props;
  const onFindID = () => navigation.navigate('FindID');
  const {t, i18nOtpOV, i18nOtpS, i18nOtpR} = useTranslation()
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.titleText}>{i18nOtpOV}</Text>
          <OtpWrong
            style={styles.image}
            width={`${ApplicationStyles.utils.resizeWidth(226)}`}
            height={`${ApplicationStyles.utils.resizeHeight(186)}`}
          />
          {/*  */}
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>
              {i18nOtpS}
            </Text>
          </View>
          <View style={styles.submitBox}>
            <FullButton
              title={i18nOtpR}
              onPress={onFindID}></FullButton>
          </View>
        </View>
      </View>
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
    marginTop: ApplicationStyles.utils.resizeHeight(186),
    width: '100%',
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
  descriptionBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(55),
  },
  descriptionText: {
    ...Fonts.style.h5,
    fontFamily: Fonts.type.semiBold,
    color: Colors.textColor.tiny,
  },
  descriptionText1: {
    ...Fonts.style.h5,
    paddingLeft: 4,
    textAlign: 'center',
    color: Colors.mainColor,
  },
});

export default OtpVerificationSuccessScreen;
