import React, {memo} from 'react';
import {View, StyleSheet, Text, Linking, Platform} from 'react-native';
import _ from 'lodash';
import Ripple from 'react-native-material-ripple';
import {NavigationActions, StackActions} from 'react-navigation';
//
import {ArrowBackIcon, CallIcon} from './icons';
//
import {Colors, Fonts, ApplicationStyles} from '../themes';
//
import Layouts from '../constants/Layouts';

const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({routeName: 'Home'})],
});

function ChatHeader(props) {
  const {navigation, title} = props;
  const goBack = () => navigation && navigation.goBack();
  //
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ripple style={styles.backIconContent} onPress={goBack}>
          <ArrowBackIcon size={20} color={Colors.gray1} />
        </Ripple>
        <Text style={styles.title}>{title}</Text>
        <Ripple
          style={styles.backIconContent}
          onPress={() => {
            Linking.openURL('tel://19001486');
          }}>
          <CallIcon size={24} />
        </Ripple>
      </View>
    </View>
  );
}
//
export default memo(ChatHeader);
//
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: ApplicationStyles.utils.resizeLimitedWidth(10),
    height: Layouts.headerHeight,
    justifyContent: 'center',
    paddingTop: Layouts.hasNotch ? 25 : Platform.OS === 'ios' ? 10 : 0,
  },
  header: {
    paddingTop: ApplicationStyles.utils.resizeLimitedHeight(21),
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
  },
  backIconContent: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 10,
  },
});
