import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import {ArrowForwardIcon} from '../../components/icons';
import MainHeader from '../../components/MainHeader';
//
import {Images, Colors, ApplicationStyles, Fonts} from '../../themes';
//
import { useTranslation } from '../../context/LanguageContext';
//
import {getYarnByCategory} from '../../services/serviceRest';
const FacilityTennisScreen = props => {
  const {
    t,
    i18nPleaseSelect
  } = useTranslation();
  const {navigation} = props;
  const {title, dataItem, name, img} = navigation.state.params;
  const [dataYarn, setDataYarn] = useState([]);
  useEffect(() => {
    getData = async () => {
      try {
        let data = await getYarnByCategory({
          facility_category_id: dataItem.id,
        });
        // if(data){}
        // console.log('data yarn', JSON.stringify(data, null, 2));
        if (data.status === 200) {
          // console.log("data.data.data.facility",JSON.stringify(data.data.data.facility, null, 2));
          setDataYarn(data?.data?.items);
        } else {
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, []);
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={t(`src.screens.facilities.${title}`)} />
      <ScrollView>
        <View style={styles.imageBox}>
          {/* <Images.IllustrationTennis {...styles.image} /> */}
          <Image
            source={{uri: `${img}`}}
            resizeMode={'contain'}
            style={{width: '70%', height: 170}}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.text}>
            {/* {t(`src.screens.facilities.FacilityScreen.PleaseSelectFacility`)} */}
            {i18nPleaseSelect.replace(new RegExp(/\[facility name\]|\[tên tiện ích\]/g), t(`src.screens.facilities.${title}`))}
          </Text>
        </View>
        {dataYarn?.map((value, i) => {
          return (
            <Ripple
              key={i}
              style={styles.buttonBox}
              onPress={() =>
                navigation.navigate('FacilitySchedule', {data: dataYarn, id: i})
              }>
              <Text style={styles.title}>{value?.name}</Text>
              <ArrowForwardIcon size={20} color={Colors.gray1} />
            </Ripple>
          );
        })}
      </ScrollView>
    </View>
  );
};
//
export default FacilityTennisScreen;
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  imageBox: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: ApplicationStyles.utils.resizeHeight(105),
    width: ApplicationStyles.utils.resizeWidth(155),
  },
  textBox: {
    paddingTop: 32,
    paddingHorizontal: ApplicationStyles.utils.resizeLimitedWidth(40),
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
    lineHeight: 30,
  },
  buttonBox: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.gray5,
    borderBottomWidth: 1,
    backgroundColor: Colors.white,
    borderTopColor: Colors.gray5,
    borderTopWidth: 1,
  },
  title: {
    fontSize: Fonts.size.title3,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
});
