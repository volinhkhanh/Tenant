import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Ripple from 'react-native-material-ripple';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
//
import {Images, Colors, Fonts, ApplicationStyles} from '../../themes';
import {
  File,
  Download,
} from '../../components/icons';
import {useTranslation} from '../../context/LanguageContext';
//
function NewsDetailScreen(props) {
  const {item} = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const {t, i18nAnnounceNo} = useTranslation();
  //
  return (
    <View style={styles.fileItem}>
      <View style={styles.fileInfo}>
        <View style={styles.fileBox}>
          <Image
            source={File}
            style={styles.imgFile}
          />
        </View>
        <Text style={styles.fileName} numberOfLines={1}>
          {item?.original_name}
        </Text>
      </View>
      {
        progress == 0 ?
        <View style={styles.downloadContent}>
          <Ripple style={styles.downloadBtn} onPress={() => {
            setProgress(0.01)
            const url = item?.url || '';
            const localFile = `${RNFS.CachesDirectoryPath}/${item?.original_name}`;
            const options = {
              fromUrl: url,
              toFile: localFile,
              discretionary: true,
              cacheable: true,
              begin: (res: DownloadBeginCallbackResult) => {
                console.log("Response begin ===\n\n");
              },
              progress: (res: DownloadProgressCallbackResult) => {
                let progressPercent = (res.bytesWritten / res.contentLength); // to calculate in percentage
                setProgress(progressPercent)
              }
            };
            const task = RNFS.downloadFile(options).promise
            .then(() => FileViewer.open(localFile))
            .then(() => {
              setProgress(0)
            })
            .catch(error => {
              // error
            });
          }}>
            <Image
              source={Download}
              style={styles.imgDownload}
            />
          </Ripple>
        </View>
        : 
        <View style={styles.downloadContent}>
          <Progress.Pie progress={progress} size={27} color={Colors.mainColor} />
        </View>
      }
    </View>
  )
}
//
export default NewsDetailScreen;
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  src: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
  },
  fileItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: Colors.gray4,
    paddingVertical: 15,
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
});
