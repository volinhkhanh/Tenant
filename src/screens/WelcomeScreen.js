import React, {useRef, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Ripple from 'react-native-material-ripple';
import SplashScreen from 'react-native-splash-screen';
//
import {ApplicationStyles, Colors, Fonts} from '../themes/';
import {useTranslation} from '../context/LanguageContext';
import {SelectLanguage} from '../components/modal/ModalSelector1';
//
export default function LaunchScreen(props) {
  const {
    t,
    language,
    switchLanguage,
    welcome,
    toUrbanOS,
    withUrbanOS,
    LetsBegin,
  } = useTranslation();

  const refRBSheet = useRef();
  const languages = [
    {id: 'en', name: 'English'},
    {
      id: 'vi',
      name: 'Tiếng Việt',
    },
  ];

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  function onPress() {
    props.navigation.navigate('Onboarding');
  }

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../assets/images/oval_top.png')}
        style={{
          width: 220,
          height: 251,
          position: 'absolute',
          top: 50,
          left: 0,
        }}
      />
      <View
        style={{
          width: 250,
          height: 250,
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}>
        <Image
          source={require('../assets/images/oval_small.png')}
          style={{
            width: 76,
            height: 76,
            position: 'absolute',
            top: 0,
            left: 0,
            paddingLeft: 13,
          }}
        />
        <Image
          source={require('../assets/images/oval_bottom.png')}
          style={{
            width: 219,
            height: 251,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </View>
      <View style={[styles.content, {flex: 1, flexDirection: 'row'}]}>
        <View style={[styles.titleBox, {flexDirection: 'column'}]}>
          <Text style={styles.title}>
            {/* {t('Welcome').toUpperCase()} */}
            {welcome.toUpperCase()}
          </Text>
          <Text style={styles.subTitle}>
            {/* {t('ToUrbanOS')} */}
            {toUrbanOS}
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <SelectLanguage
            ref={refRBSheet}
            selectedId={language}
            selectedList={languages || []}
            onSelect={id => switchLanguage(id)}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.descriptionBox}>
          <Text style={styles.description}>
            {/* {t('Slogan')} */}
            {withUrbanOS}
          </Text>
          <Ripple style={styles.submitBox} onPress={onPress}>
            <Text style={styles.submit}>
              {/* {t('Instruction')} */}
              {LetsBegin}
              &nbsp;&#8594;
            </Text>
          </Ripple>
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
  content: {
    paddingHorizontal: ApplicationStyles.utils.resizeWidth(32),
    flex: 1,
  },
  titleBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(185),
  },
  title: {
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.medium,
    color: Colors.mainColor,
  },
  subTitle: {
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    marginTop: ApplicationStyles.utils.resizeHeight(6),
  },
  descriptionBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(30),
    width: ApplicationStyles.utils.resizeWidth(250),
    height: ApplicationStyles.utils.resizeHeight(149),
  },
  description: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    letterSpacing: 0.3,
    lineHeight: 30,
    color: Colors.black,
  },
  submitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ApplicationStyles.utils.resizeHeight(30),
  },
  submit: {
    ...Fonts.style.h4,
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.3,
    color: Colors.black,
    marginRight: ApplicationStyles.utils.resizeWidth(12),
  },
  langContent: {
    flexDirection: 'row',
  },
  arrowDown: {
    justifyContent: 'center',
    marginLeft: 5,
  },
});
