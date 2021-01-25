import React, {memo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import _ from 'lodash';
import Ripple from 'react-native-material-ripple';
import TextTicker from 'react-native-text-ticker';
//
import {ArrowBackIcon} from './icons';
//
import {Colors, Fonts, ApplicationStyles} from '../themes';
//
import Layouts from '../constants/Layouts';
import OS from '../constants/Platform';

function MainHeader(props) {
  const {navigation, title, disableBackBtn} = props;
  const goBack = () => navigation && navigation.goBack();
  //
  return (
    <View style={styles.container}>
      <View style={[styles.header, disableBackBtn && {justifyContent: 'center'}]}>
        {
          !disableBackBtn && 
          <Ripple style={styles.backIconContent} onPress={goBack}>
            <ArrowBackIcon size={20} color={Colors.gray1} />
          </Ripple>
        }
        {/* <Text style={styles.title}>{title}</Text> */}
        <TextTicker
          style={styles.title}
          duration={3500}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}>
          {title}
        </TextTicker>
        {
          !disableBackBtn && 
          <View style={styles.backIconContent} />
        }
      </View>
    </View>
  );
}
//
export default memo(MainHeader);
//
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: ApplicationStyles.utils.resizeLimitedWidth(10),
    height: Layouts.headerHeight,
    justifyContent: 'center',
    paddingTop: Layouts.hasNotch ? 40 : OS === 'ios' ? 10 : 0,
  },
  header: {
    paddingTop: ApplicationStyles.utils.resizeLimitedHeight(11),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: ApplicationStyles.utils.resizeLimitedHeight(18),
    paddingBottom: 4,
  },
  title: {
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    paddingRight: 20,
    textTransform: 'capitalize'
  },
  backIconContent: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 10,
  },
});
