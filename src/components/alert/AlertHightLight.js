import React, {memo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Overlay } from 'react-native-elements';
//
import { Colors, Metrics, Fonts } from '../../themes/';
//
import {useTranslation} from '../../context/LanguageContext';
//
const AlertHightLight = props => {
  //
  const {t} = useTranslation();
  let messageComponent = null;
  const { closeButton, title, titleStart, titleMain, titleEnd, leftText = t('Cancel'), rightText = t('Confirm'), onPressCancel, onBackdropPress, onPressConfirm, children } = props;
  if (props.show) {
    return (
      <Overlay
        isVisible={props.show}
        onBackdropPress={onBackdropPress || onPressCancel}
        overlayStyle={{
          borderRadius: 10,
          width: '90%',
          height: 'auto',
          padding: 0,
        }}>
        <View style={[styles.container, props.style]}>
          <View style={styles.contentContainer}>
            {!!children ? (
              children
            ) : (
              <Text allowFontScaling={true} style={styles.message}>
                {titleStart} <Text style={{fontFamily: Fonts.type.bold}}>{titleMain}</Text>. {titleEnd}
              </Text>
            )}
          </View>
          <View style={styles.buttonBox}>
            {leftText && !closeButton && (
              <Ripple
                onPress={onPressCancel}
                style={{
                  flex: 1,
                  borderRightColor: Colors.gray4,
                  borderRightWidth: 0.25,
                }}>
                <Text style={styles.cancel}>{leftText}</Text>
              </Ripple>
            )}
            {
            !closeButton &&
              <Ripple
                onPress={onPressConfirm}
                style={{
                  flex: 1,
                  borderLeftColor: Colors.gray4,
                  borderLeftWidth: 0.25,
                }}>
                <Text style={styles.confirm}>{rightText}</Text>
              </Ripple>
            }
            {
            closeButton &&
              <Ripple
                onPress={onPressCancel}
                style={styles.closeContent}>
                <Text style={styles.confirm}>{t('Close')}</Text>
              </Ripple>
            }
          </View>
        </View>
      </Overlay>
    );
  }
  return messageComponent;
}
//
export default memo(AlertHightLight);
//
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.25,
    borderColor: Colors.gray5,
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 60,
  },
  message: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: 26,
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    lineHeight: 30,
    color: Colors.black,
  },
  icon: {
    color: Colors.steel,
  },
  buttonBox: {
    flexDirection: 'row',
    borderTopColor: Colors.gray2,
    borderTopWidth: 0.25,
  },
  cancel: {
    textAlign: 'center',
    padding: 12,
    ...Fonts.style.subtitleSemibold,
  },
  confirm: {
    textAlign: 'center',
    padding: 12,
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.bold,
    color: Colors.mainColor,
  },
  closeContent: {
    flex: 1,
    marginVertical: 5,
  },
});
