import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  InteractionManager,
  Animated,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import { ArrowForwardIcon, ArrowDropDownIcon } from './icons';

class DropdownItem extends Component {
  static animated;
  //
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      contentVisible: props.contentVisible,
      headerheight: 0,
      contentHeight: 0,
    };
  }
  //
  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            height: this.animated,
            backgroundColor: this.props.backgroundColor,
          },
          this.props.style,
        ]}>
        <Ripple activeOpacity={0.5} onPress={this.onPress}>
          <View
            onLayout={this.onAnimLayout}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: 20,
            }}>
            {this.props.header}
            {this.state.contentVisible ? (
              <ArrowDropDownIcon size={20} fill="#727376" />
            ) : (
              <ArrowForwardIcon size={20} style={styles.icons} />
            )}
          </View>
        </Ripple>
        <View style={styles.content} onLayout={this.onLayout}>
          <View>{this.props.children}</View>
        </View>
      </Animated.View>
    );
  }
  //
  runAnimation = () => {
    const initialValue = this.state.contentVisible
      ? this.state.headerHeight + this.state.contentHeight
      : this.state.headerHeight;
    const finalValue = this.state.contentVisible
      ? this.state.headerHeight
      : this.state.contentHeight + this.state.headerHeight;

    this.setState({
      contentVisible: !this.state.contentVisible,
    });
    //
    this.animated.setValue(initialValue);
    Animated.spring(this.animated, {
      toValue: finalValue,
    }).start();
  };
  //
  onAnimLayout = evt => {
    const headerHeight = evt.nativeEvent.layout.height;
    if (!this.state.isMounted && !this.props.contentVisible) {
      this.animated = new Animated.Value(headerHeight);
      this.setState({
        isMounted: true,
        headerHeight,
      });
      return;
    } else if (!this.state.isMounted) {
      InteractionManager.runAfterInteractions(() => {
        this.animated = new Animated.Value(headerHeight + this.state.contentHeight);
      });
    }
    this.setState({ headerHeight, isMounted: true });
  };
  //
  onLayout = evt => {
    const contentHeight = evt.nativeEvent.layout.height;
    this.setState({ contentHeight });
  };
  //
  onPress = () => {
    this.runAnimation();
  };
}
//
export default DropdownItem;
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  icons: {
    color: '#727376',
  },
  underline: {
    width: '100%',
    height: 1,
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  contentTxt: {
    color: 'black',
    marginLeft: 8,
    fontSize: 12,
  },
  contentFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
  },
});
