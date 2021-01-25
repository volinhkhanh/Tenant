import React, { memo } from 'react';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
//
import MainHeader from '../../components/MainHeader';
//
import { Images, Colors } from '../../themes';
//
import Layouts from '../../constants/Layouts';
//
import { useTranslation } from '../../context/LanguageContext';
//
const { width, height } = Layouts;
//
function RentalTermScreen(props) {
  const { navigation } = props;
  const { i18nProfileSettingCI } = useTranslation()
  const images = navigation.state.params?.image || []
  //
  return (
    <View style={{flex: 1, backgroundColor: Colors.backgroundLightGray}}>
      <MainHeader navigation={navigation} title={i18nProfileSettingCI} />
      <ImageViewer backgroundColor={'#ccc'} imageUrls={images} menus={() => {}} />
      {/* <ScrollView>
      {
        images.map((item) => {
          return (
            <View
              style={{margin: 30, alignItems: 'center', justifyContent: 'center'}}
            >
              <Image
                style={{width: width - 100, height: height / 2}}
                resizeMode={'cover'}
                source={{uri: item.url}} />
            </View>
          )
        })
      }
      </ScrollView> */}
    </View>
  );
}
//
export default memo(RentalTermScreen);

