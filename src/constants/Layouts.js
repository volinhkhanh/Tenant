import { Dimensions, StatusBar, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const hasNotch = DeviceInfo.hasNotch();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
const headerHeight = hasNotch ? 100 : Platform.OS === 'ios' ? 80 : 70;
const bottomTabHeight = 70;
const borderRadius = 5;
const drawerWidth = width / 360 * 304;
//Header Home -----------------------------------------------
const headerMaxHeight = 200;
const headerMinHeight = 60;
const headerScrollDistance = headerMaxHeight - headerMinHeight;
//------------------------------------------------------------
//Bottom Menu -----------------------------------------------
const bottomMenuHeight = 50;
//------------------------------------------------------------

export default {
  width,
  height,
  borderRadius,
  statusBarHeight,
  headerHeight,
  bottomTabHeight,
  drawerWidth,
  headerMaxHeight,
  headerMinHeight,
  headerScrollDistance,
  bottomMenuHeight,
  hasNotch,
};
