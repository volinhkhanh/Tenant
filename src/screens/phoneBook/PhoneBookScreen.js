import React, { memo, useState, useEffect } from 'react';
import {
  StyleSheet,
  Linking,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {TabView, TabBar} from 'react-native-tab-view';
//
import { Phone } from '../../components/icons';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import { Colors, Fonts } from '../../themes';
//
import Layouts from '../../constants/Layouts'
//
import {useTranslation} from '../../context/LanguageContext';
//
const initialLayout = {width: Dimensions.get('window').width};
const PhoneBookScreen = props => {
  const { navigation, getContact, getContactData, getContactProgress } = props;
  const [categoryId, setCategoryId] = useState(0);
  const [index, setIndex] = useState(0);
  const [contactData, setContactData] = useState([]);
  const {
    t,
    i18nPBTitle
  } = useTranslation()
  const [routes, setRoutes] = useState([]);
  //
  useEffect(() => {
    getContact()
  }, [])
  //
  useEffect(() => {
    let array = []
    if(getContactData) {
      getContactData?.items?.map((item, index) => {
        array = [...array, {key: item.id, title: item.name}]
      })
      setRoutes(array)
      // setCategoryId(getContactData?.items[0]?.id)
    }
  }, [getContactData])
  // useEffect(() => {
  //   console.log(routes)
  // }, [routes])
  const renderItem = (item) => {
    return (
      <View style={styles.phoneBookItem}> 
        <View style={styles.phoneContent}>
          <View>
            <Text style={styles.phoneName}>
              {item?.name}
            </Text>
            <Text>
              {item?.phone_number}
            </Text>
          </View>
          <Ripple onPress={() => {Linking.openURL(`tel:${item?.phone_number}`)}}>
            <Image source={Phone} style={styles.workplace} />
          </Ripple>
        </View>
      </View>
    )
  }
  const renderScene = ({route}) => {
    const data = getContactData?.items?.find(item => item.id == route.key)
    return (
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={data?.phones}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id}
      />
    )
  }
  //
  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{backgroundColor: Colors.mainColor}}
      style={{backgroundColor: Colors.backgroundLightGray}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            textAlign: 'center',
            color: focused ? Colors.black : Colors.gray6,
            fontSize: Fonts.size.h5,
            fontFamily: Fonts.type.medium,
            width: 100,
          }}>
          {route.title}
        </Text>
      )}
    />
  );
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nPBTitle} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
      <View>
        {/* <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          {
          getContactData?.items?.map(item => {
            return (
              <Ripple
                style={[styles.contentTab,
                {borderBottomWidth: categoryId === item?.id ? 2 : 0}]}
                onPress={() => {setCategoryId(item.id)}}
              >
                <Text style={{color: categoryId === item?.id ? Colors.black : Colors.gray6}}>
                  {item?.name}
                </Text>
              </Ripple>
                )
            })
          }
        </ScrollView> */}
      </View>
      {/* <ScrollView>
      {
        getContactData?.items?.find(element => element?.id == categoryId)?.phones?.map(item => {
          return (
          <View style={styles.phoneBookItem}>
            <View style={styles.phoneContent}>
              <View>
                <Text style={styles.phoneName}>
                  {item?.name}
                </Text>
                <Text>
                  {item?.phone_number}
                </Text>
              </View>
              <Ripple onPress={() => {Linking.openURL(`tel:${item?.phone_number}`)}}>
                <Image source={Phone} style={styles.workplace} />
              </Ripple>
            </View>
          </View>
          )
        })
      }
      </ScrollView> */}
      {getContactProgress && <DimSpinnerView />}
    </View>
  );
};

export default memo(PhoneBookScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentTab: {
    backgroundColor: Colors.backgroundLightGray,
    width: Layouts.width / 2.6,
    // alignItems: 'center',
    // borderBottomColor: Colors.mainColor,
    // paddingVertical: 20,
  },
  phoneBookItem: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.borderColor.gray,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  phoneContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phoneName: {
    paddingBottom: 10,
    fontSize: Fonts.size.h5,
    color: Colors.gray7,
  },
  workplace: {
    width: 25,
    height: 25,
    tintColor: Colors.mainColor,
  },
});