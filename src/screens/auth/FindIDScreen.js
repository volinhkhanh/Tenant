import React, {useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, BackHandler} from 'react-native';
import {ApplicationStyles, Colors, Fonts} from '../../themes';
//
import FullButton from '../../components/FullButton';
//
import {useTranslation} from '../../context/LanguageContext';
//
export default FindIDScreen;
function FindIDScreen(props) {
  const {navigation, getValidOTPData} = props;
  const {
    t,
    i18nFindID,
    i18nFindIDOSADTPYP,
    i18nModalCalendarDo,
  } = useTranslation();
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const handleBackButtonClick = () => {
    return true;
  };
  // const onResetPassword = () => {
  //   navigation.push('ResetPassword');
  // };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.titleText}>{i18nFindID}</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>{i18nFindIDOSADTPYP}</Text>
          </View>
          <View style={styles.emailBox}>
            <Text style={styles.emailText}>{getValidOTPData.email}</Text>
          </View>

          <View style={styles.submitBox}>
            <FullButton
              style={styles.submitButton}
              title={i18nModalCalendarDo}
              onPress={() => {
                navigation.navigate('Login');
              }}
            />
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
    marginTop: ApplicationStyles.utils.resizeHeight(168),
    width: '100%',
  },
  submitButton: {},
  submitButtonText: {
    backgroundColor: 'transparent',
    ...Fonts.style.h3,
    letterSpacing: 0.3,
    fontFamily: Fonts.type.bold,
    color: Colors.textColor.white,
  },
  descriptionBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(30),
  },

  titleText: {
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.medium,
    width: ApplicationStyles.utils.resizeWidth(180),
    fontFamily: Fonts.type.semiBold,
    color: Colors.black,
    alignSelf: 'flex-start',
  },
  descriptionBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(10),
    alignSelf: 'flex-start',
  },
  descriptionText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    width: ApplicationStyles.utils.resizeWidth(260),
    lineHeight: ApplicationStyles.utils.resizeWidth(21),
    color: Colors.gray7,
  },
  emailBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(52),
  },
  emailText: {
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.3,
  },
});
