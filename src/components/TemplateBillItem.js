import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import { ApplicationStyles, Colors, Fonts, Images } from '../themes';
//
const { width } = Dimensions.get('screen');
//
const TemplateBillItem = props => {
  const { title, date, price, note, onPress, disabled } = props;
  //
  return (
    <View style={styles.container}>
      <Ripple onPress={onPress} disabled={disabled}>
        <ImageBackground source={Images.subtract} style={styles.billContent}>
          <View style={styles.billHeaderContent}>
            <Text style={styles.billTitle}>{title}</Text>
            <Text style={styles.billDate}>{date}</Text>
          </View>
          <Text style={styles.billPrice}>{price}</Text>
          <Image source={Images.dividerDot} style={styles.divideDot} />
          <Text style={styles.billNote}>{note}</Text>
        </ImageBackground>
      </Ripple>
    </View>
  );
};
//
export default TemplateBillItem;
//
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 25
  },
  billContent: {
    marginVertical: 20,
    width: width - 50,
    // height: 165,
    borderRadius: 10,
    // ...ApplicationStyles.shadow.dynamicOffset(1, 4, undefined, 0.15, 8),
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  billHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billTitle: {
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.medium,
  },
  billDate: {
    fontSize: Fonts.size.h4,
    color: Colors.textColor.gray6,
  },
  billPrice: {
    paddingVertical: 10,
    fontSize: Fonts.size.h1,
    fontFamily: Fonts.type.medium,
    textAlign: 'right',
  },
  divideDot: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  billNote: {
    // position: 'absolute',
    // bottom: 25,
    // right: 25,
    paddingBottom: 10,
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.light,
    color: Colors.textColor.gray7,
    textAlign: 'right',
  }
});
