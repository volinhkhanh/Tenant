import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Overlay, Divider } from 'react-native-elements';
import { Colors, Fonts, ApplicationStyles } from '../Themes';
import Button from '../Components/Button';
import { DeleteIcon } from '../Components/Icons';

const OverlayPolicy = props => {
  const {
    onPressClose,
    title = 'Policy',
    buttonText = 'Accept',
    children,
    isVisible = false,
    onPressButton,
    style,
  } = props;
  const { width, height } = useWindowDimensions();
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={{
        width: width - 50,
        padding: 0,
        ...style,
      }}>
      <View style={styles.overlayBox}>
        <Text style={styles.overlayTitle}>{title}</Text>
        <Divider style={{ marginHorizontal: 20 }} />
        {children}
      </View>
      <View style={styles.buttonBox}>
        <Button size="small" text={buttonText} onPress={onPressButton} style={styles.button} />
      </View>
      <Ripple style={styles.buttonClose} onPress={() => onPressClose && onPressClose()}>
        <DeleteIcon size={24} color={Colors.gray1} />
      </Ripple>
    </Overlay>
  );
};

export default OverlayPolicy;

const styles = StyleSheet.create({
  overlayBox: {
    flex: 1,
  },
  buttonClose: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  overlayTitle: {
    paddingTop: ApplicationStyles.utils.resizeHeight(20),
    ...Fonts.style.bodySemibold,
    paddingHorizontal: 20,
    lineHeight: ApplicationStyles.utils.resizeHeight(45),
  },
  buttonBox: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 86,
    backgroundColor: 'white',
    ...ApplicationStyles.shadow.dynamicOffset(0, -4, undefined, 0.1, 10),
  },
  button: {},
});
