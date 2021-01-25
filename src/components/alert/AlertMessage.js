import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
//
import { Colors, Metrics, Fonts } from '../../themes/';
//
export default class AlertMessage extends Component {
  //
  render() {
    let messageComponent = null;
    if (this.props.show) {
      const { title } = this.props;
      return (
        <View style={[styles.container, this.props.style]}>
          <View style={styles.contentContainer}>
            <Text allowFontScaling={false} style={styles.message}>
              {title && title.toUpperCase()}
            </Text>
          </View>
        </View>
      );
    }
    return messageComponent;
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: Metrics.section,
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    color: Colors.steel,
  },
  icon: {
    color: Colors.steel,
  },
});
