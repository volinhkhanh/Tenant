import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HTML from 'react-native-render-html'
import Ripple from 'react-native-material-ripple';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
//
import MainHeader from '../../components/MainHeader';
import DownloadItem from './NewsDetailDownloadItem';
//
import {Images, Colors, Fonts, ApplicationStyles} from '../../themes';
import {
  File,
  Download,
} from '../../components/icons';
import {getAnnoucementDetail} from '../../services/serviceRest';
import DimSpinnerView from '../../components/DimSpinnerView';
import Toast from 'react-native-simple-toast';
import dateFormat from '../../utils/dateFormat';
import {useTranslation} from '../../context/LanguageContext';
//
function NewsDetailScreen(props) {
  const {navigation, route, readingAnnoucement} = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const {t, i18nAnnounceNo} = useTranslation();
  useEffect(() => {
    getData();
    return () => {
      setData(null);
    };
  }, []);
  const getData = async () => {
    let id = navigation.state.params || 0;
    try {
      setLoading(true);
      // let unit_id = await AsyncStorage.getItem('unit_id')
      let res = await getAnnoucementDetail(id);
      // console.log(res)
      await readingAnnoucement(id);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show(error.data.message);
      console.log('error', error);
    }
  };
  //
  const renderMain = () => {
    let dateNew = dateFormat.formatTimeDate(data?.created_at) || '';
    return (
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.date}>{dateNew}</Text>
        <Image
          source={Images.divider}
          style={{alignSelf: 'center', width: '100%'}}
        />
        <View style={styles.viewContent}>
          <HTML
            source={{ html: data?.content }}
            // tagsStyles={{p: {color: Colors.gray7, fontSize: 12, fontFamily: Fonts.type.regular}}}
            baseFontStyle={{color: Colors.gray7, fontSize: 12, fontFamily: Fonts.type.regular}}
          />
        </View>
        <Text style={styles.src}>Source: VNA</Text>
        <View style={styles.fileContent}>
          {
            data?.files?.map(item => {return (
              <DownloadItem item={item} />
            )})
          }
        </View>
      </ScrollView>
    );
  };
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('Notification')
          i18nAnnounceNo
        }
      />
      {loading ? <DimSpinnerView /> : renderMain()}
    </View>
  );
}
//
export default NewsDetailScreen;
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingVertical: 10,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: Fonts.size.h2,
    fontFamily: Fonts.type.medium,
    color: Colors.mainColor,
    paddingVertical: 10,
  },
  date: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    paddingVertical: 10,
    paddingBottom: 25,
  },
  // desc: {
  //   fontSize: Fonts.size.h6,
  //   fontFamily: Fonts.type.base,
  //   paddingVertical: 16,
  //   color: Colors.gray7,
  //   lineHeight: 20,
  // },
  src: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  fileContent: {
    marginTop: 10,
  },
  fileItem: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  fileInfo: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  fileBox: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    ...ApplicationStyles.boxShadow,
  },
  imgFile: {
    width: 26,
    height: 32,
  },
  fileName: {
    flex: 1,
    paddingLeft: 10,
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.medium,
    color: Colors.mainColor,
  },
  downloadContent: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  downloadBtn: {
    width: 27,
    height: 27,
    backgroundColor: 'white',
    borderRadius: 27/2,
    alignItems: 'center',
    justifyContent: 'center',
    ...ApplicationStyles.boxShadow,
  },
  imgDownload: {
    width: 10,
    height: 12,
  },
  viewContent: {
    paddingVertical: 20,
  },
});
