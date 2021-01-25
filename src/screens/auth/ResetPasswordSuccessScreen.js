import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
//
import { ApplicationStyles, Colors, Fonts } from '../../themes';
//
import FullButton from '../../components/FullButton';
//
import ResetPassword from '../../images/reset-password.svg';
//
import {useTranslation} from '../../context/LanguageContext';
//
export default ResetPasswordSuccessScreen;
function ResetPasswordSuccessScreen(props) {
  const { navigation } = props;
  const onLogin = () => {
    navigation.navigate('Login');
  };
  const {
    t,
    i18nResetPassword,
    i18nResetPasswordBTL,
    i18nResetPasswordYHSUYP,
  } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>{i18nResetPassword}</Text>
        <ResetPassword
          style={styles.image}
          width={`${ApplicationStyles.utils.resizeWidth(226)}`}
          height={`${ApplicationStyles.utils.resizeHeight(186)}`}
        />
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            {i18nResetPasswordYHSUYP}
          </Text>
        </View>
        <View style={styles.submitBox}>
          <FullButton style={styles.submitButton} title={i18nResetPasswordBTL} onPress={onLogin} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
   ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  content: {
    flex: 1,
    marginTop: ApplicationStyles.utils.resizeHeight(94),
    paddingHorizontal: ApplicationStyles.utils.resizeHeight(28),
    alignItems: 'center',
  },
  submitBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(60),
    width: '100%',
  },
  titleText: {
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
    alignSelf: 'flex-start',
  },
  image: {
    marginTop: ApplicationStyles.utils.resizeHeight(60),
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
});
