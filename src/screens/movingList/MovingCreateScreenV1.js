import React, {memo, useState, useEffect} from 'react';
import _ from 'lodash';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
//
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {Colors, ApplicationStyles, Fonts} from '../../themes';
//
//
import {useTranslation} from '../../context/LanguageContext';
//
import MovingFurniture from './MovingFurnitureCreate';
import MoveOut from './MoveOutCreate';
//
const initialLayout = {width: Dimensions.get('window').width};
//
function MovingCreateScreen(props) {
  const {navigation, setUploadMovingImageData} = props;
  //
  const {
    t,
    i18nMovingListCML,
    i18nMovingListRD,
    i18nMovingListMAF,
    i18nMovingListMO,
    i18nMovingListQu,
    i18nMovingListNa,
    i18nMovingListUn,
    i18nMovingListEm,
    i18nMovingListPh,
    i18nMovingListDe,
    i18nMovingListAI,
    i18nMovingListATL,
    i18nMovingListNML,
    i18nMovingListSa,
    i18nMovingListDo,
    i18nMovingListCe,
    i18nMovingListAARWBS,
    i18nMovingListGB,
    i18nMovingListCo,
    i18nMovingListCL,
    i18nMovingListCD,
    i18nMovingListPAIOYC,
    i18nMovingListCFL,
    i18nMovingListRS,
    i18nMovingListYRWBTI,
    i18nMovingListGTH,
  } = useTranslation();
  //
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'moving':
        return <MovingFurniture index={index} props={props} />;
      case 'moveOut':
        return <MoveOut index={index} props={props} />;
    }
  };
  const [routes] = React.useState([
    {
      key: 'moving',
      title: i18nMovingListMAF,
      // t('MovingAFurniture')
    },
    {
      key: 'moveOut',
      title: i18nMovingListMO,
      // t('MovingOut')
    },
  ]);
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.mainColor}}
      style={{backgroundColor: Colors.backgroundLightGray}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: focused ? Colors.black : Colors.gray6,
            fontSize: Fonts.size.h5,
            fontFamily: Fonts.type.medium,
          }}>
          {route.title}
        </Text>
      )}
    />
  );
  const [index, setIndex] = useState(0);
  //Reset UploadMovingImageData when change tab
  useEffect(() => {
    setUploadMovingImageData(null);
  }, [renderScene]);
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('CreateMovingList')
          i18nMovingListCML
        }
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
}
//
export default memo(MovingCreateScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
});
