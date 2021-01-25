import { Dimensions, PixelRatio } from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export const defaultWidth = 414 // width iPhone 7
export const defaultHeight = 896 // height iPhone 7

//Width percent
export const wp = widthPercent => {
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};
//Height percent
export const hp = heightPercent => {
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};
//Width percent custom
export const wpc = (dimension) => {
    const elemWidth = typeof dimension === "number" ? dimension : parseFloat(dimension);
    return wp((elemWidth / defaultWidth) * 100 + '%');
}
//Height percent custom
export const hpc = (dimension) => {
    const elemHeight = typeof dimension === "number" ? dimension : parseFloat(dimension);
    return hp((elemHeight / defaultHeight) * 100 + '%');
}
  