import React from 'react';
import { View, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native';

const Overlay = props => {
  const { children, style, onPress } = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          ...style,
        }}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Overlay;
