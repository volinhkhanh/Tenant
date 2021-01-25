import React, { memo } from 'react';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
//
import Layouts from '../../constants/Layouts';
import MainHeader from '../../components/MainHeader';
//
import { Images, Colors } from '../../themes';
//
const { width, height } = Layouts;

function IDCardScreen(props) {
  const { navigation, key } = props;
  const params = navigation.state.params
  const {
    index,
    images,
  } = params
  //
  // const images = [{url: params?.image}]
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={'ID Card'} />
        <View style={styles.imageContent}>
          <ImageViewer backgroundColor={'#ddd'} index={index} imageUrls={images} />
        </View>
        {/* <Image
          style={{width, height: height - 200}}
          resizeMode={'contain'}
          source={{uri: params?.image || ''}} /> */}
    </View>
  );
}
//
export default memo(IDCardScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  imageContent: {
    flex: 1,
  }
})
