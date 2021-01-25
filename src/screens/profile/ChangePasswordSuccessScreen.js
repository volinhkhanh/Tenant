import React, { memo } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
//
import { ApplicationStyles, Colors, Fonts } from '../../themes/';
//
import Button from '../../components/button';
//
import ResetPassword from '../../images/reset-password.svg';
//
import Layouts from '../../constants/Layouts';
//
import { useTranslation } from '../../context/LanguageContext';
//
const { headerHeight } = Layouts;
//
function ChangePasswordSuccessScreen(props) {
  const { navigation } = props;
  const {
    t,
    i18nChangePassword,
    i18nChangePasswordYHSUYP,
    i18nChangePasswordGTL,
  } = useTranslation()
  //
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{i18nChangePassword}</Text>
      <View style={styles.content}>
        <ResetPassword
          style={styles.image}
          width={`${ApplicationStyles.utils.resizeWidth(226)}`}
          height={`${ApplicationStyles.utils.resizeHeight(186)}`}
        />
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>{i18nChangePasswordYHSUYP}</Text>
        </View>
        <View style={styles.submitBox}>
          <Button text={i18nChangePasswordGTL}
            onPress={()=>navigation.navigate('Auth')}
          />
        </View>
      </View>
    </View>
  );
}
//
export default memo(ChangePasswordSuccessScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    marginTop: ApplicationStyles.utils.resizeHeight(44),
    paddingHorizontal: ApplicationStyles.utils.resizeHeight(28),
    alignItems: 'center',
  },
  submitBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(146),
    width: '100%',
  },
  submitButtonText: {
    backgroundColor: 'transparent',
    ...Fonts.style.h3,
    letterSpacing: 0.3,
    fontFamily: Fonts.type.bold,
    color: Colors.textColor.white,
  },
  titleText: {
    paddingHorizontal: ApplicationStyles.utils.resizeHeight(28),
    marginTop: headerHeight,
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
    alignSelf: 'flex-start',
  },
  image: {
    marginTop: ApplicationStyles.utils.resizeHeight(37),
  },
  descriptionBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(52),
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    textAlign: 'center',
    color: Colors.gray7,
    lineHeight: 30,
  },
  descriptionText1: {
    ...Fonts.style.h5,
    paddingLeft: 4,
    textAlign: 'center',
    color: Colors.mainColor,
  },
});
