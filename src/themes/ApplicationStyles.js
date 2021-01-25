import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';
import { Dimensions } from 'react-native';

const { height, width, fontScale, scale } = Dimensions.get('window');
// console.log('DebugLog: height, width, fontScale, scale', height, width, width / 375, height / 812, fontScale, scale);

const scaleH = Math.min(height / 812, 1);
const scaleW = Math.min(width / 375, 1);

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.backgroundLightGray,
    },
    backgroundImage: {
      position: 'absolute',
      height: height,
      width: width,
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent,
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text,
    },
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin,
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow,
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center',
  },
  utils: {
    height,
    width,
    fontScale,
    scale,
    resizeWidth(w) {
      return w * (width / 375);
    },
    resizeHeight(h) {
      return (h / 812) * height;
    },

    resizeLimitedHeight(h) {
      return h * scaleH;
    },
    resizeLimitedWidth(w) {
      return w * scaleW;
    },
  },

  swiper: {
    dot: {
      backgroundColor: Colors.steel,
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 4,
      marginRight: 4,
    },
    dotActive: {
      // backgroundColor: Colors.darkPink,
      backgroundColor: Colors.mainColor,
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 4,
      marginRight: 4,
    },
  },

  // shadow
  shadow: {
    box: {
      //
      shadowColor: Colors.black,
      shadowOpacity: 0.12,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowRadius: 3,
      elevation: 30,
    },
    dynamicOffset: (width, height, shadowColor, shadowOpacity = 0.12, shadowRadius = 3) => ({
      //
      shadowColor: shadowColor || Colors.black,
      shadowOpacity: shadowOpacity,
      shadowOffset: {
        width: width,
        height: height,
      },
      shadowRadius: shadowRadius,
      elevation: 5,
    }),
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 4,
  },
  centerbox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexible: {
    flex: 1,
  },
};

export default ApplicationStyles;
