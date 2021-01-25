import React, { useRef } from 'react';
import { ScrollViewProps, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const KeyboardAvoidingView = _props => {
  const { children, ...props } = _props;
  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      enableOnAndroid={true}
      scrollEnabled={true}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={true}
      bouncesZoom={false}
      alwaysBounceVertical={true}
      alwaysBounceHorizontal={false}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export const onPressToStack = (navigation, destination, params) => {
  navigation.navigate('Another', {
    screen: destination,
    params,
  });
};
