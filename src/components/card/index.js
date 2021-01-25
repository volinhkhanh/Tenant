import React from 'react';
import {
  Text,
  Dimensions,
  View, StyleSheet,Image
} from 'react-native';
import _ from 'lodash';
import Ripple from 'react-native-material-ripple';
//
import { Colors, Fonts, ApplicationStyles } from '../../themes';
//
import CardPrimary from '../../images/CardPrimary.svg';
import CardSecondary from '../../images/CardSecondary.svg';
import { ArrowBackIcon } from '../icons';
//
const { width } = Dimensions.get('screen');
//
const IMAGE_TYPES = {
  primary: CardPrimary,
  secondary: CardSecondary,
};
const BACKGROUND_COLORS = {
  secondary: Colors.pink1,
  disable: Colors.gray4,
};
const SIZE = {
  L: 150,
  M: 100,
  S: 75,
  F: (width - 6 * 8 - 19 * 2) / 4, //Full screen for 4 item
};
const LABEL_STYLE = {
  S: { ...Fonts.style.captionSemibold, color: Colors.gray2 },
  M: { 
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  L: { ...Fonts.style.bodySemibold, color: Colors.gray2 },
  F: { 
    // fontSize: Fonts.size.h6,
    fontSize: 13,
    fontFamily: Fonts.type.base,
    color: Colors.blackBlur,
  },
};
//
const renderComponent = component => {
  if (component == null || component === false) {
    return null;
  }
  if (React.isValidElement(component)) {
    return component;
  }
  if (typeof component === 'function') {
    return component();
  }
};
//
export default function Card(props) {
  const { type, size, style, label, Icon, onPress, fixedWidth, img, disabled=false } = props;
  const ImageCard = IMAGE_TYPES[type];
  const heightContainer = SIZE[size];
  const dimensionStyles = {
    height: heightContainer,
    width: fixedWidth ? heightContainer : null,
    flex: fixedWidth ? null : 1,
  };
  const labelStyle = LABEL_STYLE[size];
  //
  return (
    <Ripple style={[styles.container, dimensionStyles, style]} disabled={disabled} onPress={onPress}>
       <View style={styles.image}>{renderComponent(ImageCard)}</View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <View style={[styles.box, { flex: _.includes(['S', 'M', 'F'], size) ? 0.5 : 1 }]} /> */}
        <View style={styles.box}>
        
        </View>
        {img ? <Image
          source={disabled ? Icon : {uri:`${Icon}`}}
          resizeMode={"contain"}
          style={[{width:30, height:30}, disabled && {tintColor: '#ccc'}]}
        /> : <View style={styles.box}><Icon /></View>}
        
        <Text style={[styles.label, labelStyle, disabled && {color: '#ccc'}]}>{label}</Text>
      </View>
    </Ripple>
  );
}
//
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 4,
    marginHorizontal: 6,
    ...ApplicationStyles.boxShadow,
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  box: {
    // ...ApplicationStyles.flexible,
    // ...ApplicationStyles.centerbox,
  },
  labelBox: {
    // justifyContent: 'flex-start',
  },
  label: {
    ...Fonts.style.bodyRegular,
    color: Colors.black,
    paddingTop: 5,
    textAlign: 'center',
  },
});
