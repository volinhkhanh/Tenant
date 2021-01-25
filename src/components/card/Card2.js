import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import { Colors, Fonts, ApplicationStyles } from '../../themes';
//
import Wallet from '../../images/WalletBottomRight.svg';
// import BackgroundRadialGradient from '../BackgroundRadialGradient';
//
export default function Card(props) {
  const { type, size = 'L', style, topText, centerText, bottomText, onPress } = props;
  return (
    <Ripple activeOpacity={0.3} style={[styles.container, style]} onPress={onPress}>
      <View style={styles.image}>
        {/* <BackgroundRadialGradient height="100%" width="100%" style={{ position: 'absolute' }} /> */}
        <Wallet style={{ position: 'absolute', right: 0, bottom: 0 }} />
      </View>
      <View style={{ height: '100%', width: '100%' }}>
        <View style={styles.top}>
          <Text style={styles.topText}>{topText}</Text>
          <View style={styles.oval} />
        </View>
        <View style={styles.center}>
          <Text style={styles.centerText}>{centerText}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottomText}>{bottomText}</Text>
        </View>
      </View>
    </Ripple>
  );
}
//
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 4,
    ...ApplicationStyles.shadow.dynamicOffset(1, 1, Colors.black, 0.15, 4),
    height: 148,
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  oval: {
    height: 10,
    width: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 999,
  },
  topText: {
    ...Fonts.style.title3Medium,
    paddingVertical: 10,
    color: Colors.textColor.white,
  },
  centerText: {
    ...Fonts.style.largeTitle,
    color: Colors.textColor.white,
  },
  bottomText: {
    ...Fonts.style.bodyRegular,
    color: Colors.textColor.white,
  },
});
