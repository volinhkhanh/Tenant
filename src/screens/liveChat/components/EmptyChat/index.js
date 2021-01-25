import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import LiveChatEmpty from '../../../../assets/images/liveChat/live-chat-empty.png';

export function EmptyChat() {
  return (
    <View>
      <View style={styles.imageBox}>
        <Image style={styles.image} source={LiveChatEmpty} />
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.content}>
          Nothing here yet. Create a Home Service{'\n'}
          request or Contact Support Team to start{'\n'}
          chatting with us
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    marginTop: 57,
    alignItems: 'center',
  },
  image: {
    width: 216,
    height: 216,
  },
  contentBox: {
    marginTop: 12,
  },
  content: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    color: '#8A8A8A',
  },
});
