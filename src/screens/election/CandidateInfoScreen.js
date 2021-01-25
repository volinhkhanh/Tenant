import React, { memo } from 'react';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
//
import Layouts from '../../constants/Layouts';
import MainHeader from '../../components/MainHeader';
//
import { useTranslation } from '../../context/LanguageContext';
//
import { Images, Colors } from '../../themes';
//
const { width, height } = Layouts;

function CandidateInfoScreen(props) {
  const { navigation, key } = props;
  const { t, i18nElectionCI } = useTranslation()
  const params = navigation.state.params
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nElectionCI} />
      <View>
        <ImageZoom 
          cropWidth={width}
          cropHeight={height - 200}
          imageWidth={width}
          imageHeight={height - 200}
        >
          <Image
            style={{width, height: height - 200}}
            resizeMode={'contain'}
            source={{uri: params?.image || ''}} />
        </ImageZoom>
      </View>
    </View>
  );
}
//
export default memo(CandidateInfoScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
})
