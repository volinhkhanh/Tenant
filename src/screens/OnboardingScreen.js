import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//
import {ApplicationStyles, Colors, Fonts} from '../themes';
import FullButton from '../components/FullButton';
import Swiper from 'react-native-swiper';
import Slide1 from '../images/slide-one.svg';
import Slide2 from '../images/slide-two.svg';
import Slide3 from '../images/slide-three.svg';
import {useTranslation} from '../context/LanguageContext';

export default function OnboardingScreen(props) {
  const {
    t,
    slide1Title,
    slide1Description,
    slide2Title,
    slide2Description,
    slide3Title,
    slide3Description,
    getStarted,
  } = useTranslation();
  async function onPress() {
    await AsyncStorage.setItem('welComeStatus', 'noWelcome');
    props.navigation.navigate('Auth');
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Swiper
            style={styles.wrapper}
            dot={<View style={ApplicationStyles.swiper.dot} />}
            activeDot={<View style={ApplicationStyles.swiper.dotActive} />}
            paginationStyle={{
              bottom: ApplicationStyles.utils.resizeHeight(30),
            }}
            removeClippedSubviews={false}
            loop={false}>
            {/* slide1 */}
            <View style={styles.slide}>
              <Text style={styles.titleText}>
                {/* {t('slide1Title')} */}
                {slide1Title}
              </Text>
              <Slide1
                style={styles.image}
                width={ApplicationStyles.utils.resizeWidth(329)}
                height={ApplicationStyles.utils.resizeHeight(183)}
              />
              <Text style={styles.descriptionText}>
                {/* {t('slide1Description')} */}
                {slide1Description}
              </Text>
            </View>
            {/* slide2 */}
            <View style={styles.slide}>
              <Text style={styles.titleText}>
                {/* {t('slide2Title')} */}
                {slide2Title}
              </Text>
              <Slide2
                style={styles.image}
                width={ApplicationStyles.utils.resizeWidth(329)}
                height={ApplicationStyles.utils.resizeHeight(249)}
              />
              <Text style={styles.descriptionText}>
                {/* {t('slide2Description')} */}
                {slide2Description}
              </Text>
            </View>
            {/* slide3 */}
            <View style={styles.slide}>
              <Text style={styles.titleText}>
                {/* {t('slide3Title')} */}
                {slide3Title}
              </Text>
              <Slide3
                style={styles.image}
                width={ApplicationStyles.utils.resizeWidth(329)}
                height={ApplicationStyles.utils.resizeHeight(274)}
              />
              <Text style={styles.descriptionText}>
                {/* {t('slide3Description')} */}
                {slide3Description}
              </Text>
            </View>
          </Swiper>
        </View>
      </View>
      <View style={styles.submitBox}>
        <FullButton
          style={styles.submitButton}
          title={
            // t('getStarted')
            getStarted
          }
          onPress={onPress}
        />
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
  },
  content: {
    flex: 1,
    marginTop: ApplicationStyles.utils.resizeHeight(94),
    marginBottom: ApplicationStyles.utils.resizeHeight(130),
  },
  submitBox: {
    position: 'absolute',
    bottom: ApplicationStyles.utils.resizeHeight(40),
    width: '100%',
  },
  submitButton: {
    marginHorizontal: ApplicationStyles.utils.resizeHeight(28),
  },
  submitButtonText: {
    backgroundColor: 'transparent',
    ...Fonts.style.h3,
    letterSpacing: 0.3,
    fontFamily: Fonts.type.bold,
    color: Colors.textColor.white,
  },
  slide: {
    flex: 1,
    paddingHorizontal: ApplicationStyles.utils.resizeHeight(28),
  },
  titleText: {
    ...Fonts.style.h1,
    fontFamily: Fonts.type.semiBold,
    color: Colors.black,
  },
  descriptionText: {
    marginTop: ApplicationStyles.utils.resizeHeight(66),
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    textAlign: 'center',
    color: Colors.gray7,
  },
  image: {
    marginTop: ApplicationStyles.utils.resizeHeight(67),
    width: ApplicationStyles.utils.resizeWidth(329),
    height: ApplicationStyles.utils.resizeHeight(249),
  },
});
