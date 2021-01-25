import React, {useEffect} from 'react';
import {Text, View, StyleSheet, BackHandler} from 'react-native';
//
import {Images, ApplicationStyles, Colors, Fonts} from '../themes';
//
import FullButton from '../components/FullButton';
import {useTranslation} from '../context/LanguageContext';
import {wpc, hpc} from '../utils/responsePixel';
//
function SuccessScreen({navigation}) {
  const {t, i18nGTH} = useTranslation();
  const goHome = () => {
    navigation.navigate('Home');
  };
  useEffect(() => {
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
  //
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.titleText}>
            {navigation?.state?.params?.title ?? ''}
          </Text>
          <Images.IllustrationConfirmation
            style={styles.image}
            width={`${ApplicationStyles.utils.resizeWidth(226)}`}
            height={`${ApplicationStyles.utils.resizeHeight(186)}`}
          />
          <View style={styles.descriptionBox}>
            {navigation?.state?.params?.descriptionTitle && (
              <Text style={styles.descriptionTitle}>
                {navigation?.state?.params?.descriptionTitle ?? ''}
              </Text>
            )}
            <Text style={styles.descriptionText}>
              {navigation?.state?.params?.description ?? ''}
            </Text>
          </View>
          <View style={styles.submitBox}>
            <FullButton
              style={styles.submitButton}
              title={i18nGTH}
              onPress={goHome}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
//
export default SuccessScreen;
//
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
    fontSize: wpc(28),
    fontFamily: Fonts.type.medium,
    color: Colors.black,
    alignSelf: 'flex-start',
  },
  image: {
    marginTop: ApplicationStyles.utils.resizeHeight(60),
  },
  descriptionBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(52),
  },
  descriptionText: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    textAlign: 'center',
    color: Colors.gray7,
    lineHeight: 30,
  },
  descriptionTitle: {
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    paddingBottom: 20,
  },
});
