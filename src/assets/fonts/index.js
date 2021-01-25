import { Dimensions, StatusBar, Platform } from 'react-native';
const width = Dimensions.get('window').width;
const Fonts = {
  size: {
    slideMenuTitle: width / 25,
    categoryTitle: width / 17,
    jobItemTitle: width / 25,
  },
};

export default Fonts;
