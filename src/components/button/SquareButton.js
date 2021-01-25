import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Colors, Fonts, Images, ApplicationStyles } from '../../themes';
import Layouts from '../../constants/Layouts';
//
const {width, height} = Layouts
const IMAGE_TYPES = {
  primary: Images.primaryButton,
  warning: Images.warningButton,
};
const BACKGROUND_COLORS = {
  secondary: Colors.mainColor,
  white: Colors.white,
  default: Colors.mainColor,
  disable: Colors.gray3,
};
const TEXT_COLORS = {
  white: Colors.mainColor,
  default: Colors.white,
  disable: Colors.white,
};
const SIZE = {
  large: 150,
  medium: width / 3,
  small: 93,
};
//
const getType = (type) =>{
  if(type == 0 ){
    return "white";
  }
  else if(type == 1 ){
    return "disable"
  }
  else{
    return "default"
  }
}
export default function SquareButton(props) {
  const { type = 'default', size = 'default', text, style, onPress, fixedWidth } = props;
  // console.log("type", type);
  
  let typeNew = getType(type)
  const image = IMAGE_TYPES[typeNew];
  const backgroundColor = BACKGROUND_COLORS[typeNew];
  const _style = { ...style, backgroundColor: backgroundColor };
  const heightContainer = SIZE[size];
  const dimensionStyles = {
    width: fixedWidth ? heightContainer : null,
    minWidth: 93,
  };
  const textStyle = { color: TEXT_COLORS[typeNew] };
  //
  return (
    <Ripple style={[styles.container, dimensionStyles, _style]} onPress={onPress} disabled={type === 1 || type === 2}>
      {image && <Image resizeMode="stretch" source={image} style={styles.image} />}
      <Text style={[size === 'small' ? styles.smallLabel : (size === 'medium' ? styles.mediumLabel : styles.label), textStyle]}>{text}</Text>
    </Ripple>
  );
}
//
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginVertical: 8,
    ...ApplicationStyles.shadow.dynamicOffset(1, 4, undefined, 0.15, 8),
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  label: {
    ...Fonts.style.buttonBold,
    color: Colors.white,
    padding: 20,
  },
  mediumLabel: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.white,
    paddingVertical: 7,
    paddingHorizontal: 6,
  },
  smallLabel: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.white,
    paddingVertical: 7,
    paddingHorizontal: 6,
  },
});
