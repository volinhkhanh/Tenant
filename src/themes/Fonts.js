import _ from 'lodash';
import { Dimensions, Platform, PixelRatio } from 'react-native';
import Colors from './Colors';
const { fontScale, width, height } = Dimensions.get('window');

const type = {
  medium: 'Roboto-Medium',
  base: 'Roboto',
  bold: 'Roboto-Bold',
  semiBold: 'Roboto-Medium',
  extraBold: 'Roboto-ExtraBold',
  light: 'Roboto-Light',
  thin: 'Roboto-Thin',
};

// based on iphone 5s's scale
const scale = size => _.min([width / 375, 1]) * size;

function normalize(size) {
  const newSize = scale(size);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

// function fontScaleFunc(value, factor = 0.25) {
//   return value + (scale(value) - value) * factor;
// }

function fontScaleFunc(value) {
  return value * fontScale;
  // return normalize(value);
}

const _size = {
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 16,
  h5: 14,
  h6: 12,
  h7: 11,
  icon: 24,
  title3: 18,
  input: 18,
  regular: 16,
  medium: 14,
  small: 12,
  tiny: 8.5,
};
const size = _.mapValues(_size, (value, key) => fontScaleFunc(value));

const letterSpacing = {
  medium: 0.36,
  regular: 0.3,
  small: 0.24,
};

const style = {
  h1: {
    fontFamily: type.extraBold,
    fontSize: size.h1,
    lineHeight: fontScaleFunc(45),
  },
  h2: {
    fontFamily: type.bold,
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
    lineHeight: fontScaleFunc(28),
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
    lineHeight: fontScaleFunc(23),
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
    letterSpacing: 0.3,
    lineHeight: fontScaleFunc(28),
  },
  h6: {
    fontFamily: type.base,
    fontSize: size.h6,
  },

  bodyMedium: {
    fontFamily: type.medium,
    fontSize: size.h5,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  bodySemibold: {
    fontFamily: type.semiBold,
    fontSize: size.h5,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  bodyRegular: {
    fontFamily: type.base,
    fontSize: size.h5,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  buttonBold: {
    fontFamily: type.bold,
    fontSize: size.h3,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  captionBold: {
    fontFamily: type.bold,
    fontSize: size.h6,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  captionMedium: {
    fontFamily: type.medium,
    fontSize: size.h5,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  captionRegular: {
    fontFamily: type.base,
    fontSize: size.h5,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  captionSemibold: {
    fontFamily: type.semiBold,
    fontSize: size.h6,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  largeTitle: {
    fontFamily: type.semiBold,
    fontSize: size.h1,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  otherMedium: {
    fontFamily: type.medium,
    fontSize: size.h6,
    letterSpacing: letterSpacing.regular,
    color: Colors.black,
  },
  otherRegular: {
    fontFamily: type.base,
    fontSize: size.h6,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  otherLight: {
    fontFamily: type.medium,
    fontSize: size.h7,
    letterSpacing: letterSpacing.medium,
    color: Colors.gray1,
  },
  subtitleBold: {
    fontFamily: type.bold,
    fontSize: size.h4,
    letterSpacing: letterSpacing.small,
    color: Colors.gray1,
  },
  subtitleSemibold: {
    fontFamily: type.semiBold,
    fontSize: size.h4,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  subtitleMedium: {
    fontFamily: type.medium,
    fontSize: size.h4,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  title1Semibold: {
    fontFamily: type.semiBold,
    fontSize: size.h2,
    letterSpacing: letterSpacing.medium,
    color: Colors.gray1,
  },
  title2Medium: {
    fontFamily: type.medium,
    fontSize: size.h3,
    letterSpacing: letterSpacing.regular,
    color: Colors.white,
  },
  title2Semibold: {
    fontFamily: type.semiBold,
    fontSize: size.h3,
    letterSpacing: letterSpacing.regular,
    color: Colors.gray1,
  },
  title3Medium: {
    fontFamily: type.medium,
    fontSize: size.title3,
    letterSpacing: letterSpacing.medium,
    color: Colors.gray1,
  },
};

export default {
  type,
  size,
  style,
  fontScaleFunc,
};
