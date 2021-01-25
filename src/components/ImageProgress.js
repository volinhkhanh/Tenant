import React from 'react';
import _ from 'lodash';
import {
  BallIndicator,
} from 'react-native-indicators';
import Image from 'react-native-image-progress';
//
import { Colors } from '../themes';
//
const ImageProgress = ({
  indicator,
  indicatorProps,
  ...props
}) => (
  <Image
  {...props}
  indicator={indicator ? indicator : BallIndicator}
  indicatorProps={indicatorProps ? indicatorProps : {
    size: 20,
    color: Colors.mainColor,
  }} />
);
//
export default ImageProgress;