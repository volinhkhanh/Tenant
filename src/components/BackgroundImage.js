import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
//
import BgVector from '../images/bg_vector.png';
//
import {ApplicationStyles } from '../themes/';
//
import Layouts from '../constants/Layouts';
//
const { width, headerHeight } = Layouts;
//
function BackgroundImage(props) {
  const { noHeader } = props;
  return (
    <Image source={BgVector} style={[styles.bgVector,
      {top: noHeader ? ApplicationStyles.utils.resizeLimitedWidth(100 + 100 - 20 - 20) : ApplicationStyles.utils.resizeLimitedWidth(100 + headerHeight)}
    ]} />
  );
}
//
const styles = StyleSheet.create({
  bgVector: {
    width: width,
    height: 624 * width / 1125,
    zIndex: -1,
    position: "absolute",
  },
})
//
export default BackgroundImage;
