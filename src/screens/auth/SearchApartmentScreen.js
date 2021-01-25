import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  View,
  Keyboard,
  TouchableNativeFeedback
} from 'react-native';
import { Input, Divider } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';
//
import DimSpinnerView from '../../components/DimSpinnerView';
import { SearchIcon } from '../../components/icons';
import MainHeader from '../../components/MainHeader';
//
import { ApplicationStyles, Colors, Fonts } from '../../themes';
//
import {useTranslation} from '../../context/LanguageContext';
//
SearchApartmentScreen.propTypes = {};
export default SearchApartmentScreen;
function SearchApartmentScreen(props) {
  const {
    navigation,
    getApartment,
    getApartmentData,
    getApartmentInProgress,
    setApartmentRegister,
    setApartmentFindID,
    setApartment,
  } = props;
  const {
    t,
    i18nSearchApartment,
    i18nEYAN,
    i18nAP,
  } = useTranslation()
  const [areasSelected, setAreasSelected] = useState('1');
  const [searchInput, setSearchInput] = useState('');
  //
  const areaItem = ({ item }) => {
    return (
      <View
        style={{
          alignItems: 'flex-start',
          marginVertical: 6,
        }}>
        <Ripple
          onPress={() => {
            setAreasSelected(item.id);
          }}
          style={{
            backgroundColor: areasSelected === item.id ? Colors.mainColor : Colors.white,
            borderRadius: 6,
            borderColor: Colors.mainColor,
            borderWidth: 1,
          }}>
          <Text style={ styles.areaName }>
            {item.name}
          </Text>
        </Ripple>
      </View>
    );
  };
  //
  const selectApartmentItem = (apartmentName) => {
    if(navigation.state.params.type === 'register') {
      setApartmentRegister(apartmentName)
    } else {
      setApartmentFindID(apartmentName)
    }
    navigation.pop()
    
  }
  //
  const apartmentItem = ({ item }) => {
    return (
      <Ripple
        onPress={() => {selectApartmentItem(item)}}>
        <Text style={styles.apartmentName}>{item.name}</Text>
        <Divider style={{ width: ApplicationStyles.utils.width }} />
      </Ripple>
    );
  };
  //
  const actionSearch = async() => {
    getApartment(searchInput);
  }
  //
  useEffect(() => {
    return () => { setApartment(null) }
  }, [])
  //
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <MainHeader navigation={navigation} title={i18nSearchApartment} />
        <TouchableNativeFeedback onPress={() => {Keyboard.dismiss()}}>
          <View style={styles.content}>
            <View style={styles.formBox}>
              <View style={styles.searchBox}>
                <Input
                  placeholder={i18nEYAN}
                  autoCapitalize = 'none'
                  rightIcon={
                    <Ripple onPress={() => {searchInput !== '' ? actionSearch() : {}}}>
                      <SearchIcon size={24} color={searchInput !== '' ? Colors.mainColor : '#DADADA'}/>
                    </Ripple>
                  }
                  // rightIcon={{
                  //   type: 'font-awesome',
                  //   name: 'search',
                  //   size: ApplicationStyles.utils.resizeWidth(16),
                  //   color: searchInput !== '' ? Colors.mainColor : '#DADADA',
                  // }}
                  returnKeyType="search"
                  onSubmitEditing={() => {searchInput !== '' ? actionSearch() : {}}}
                  inputStyle={styles.textInput}
                  inputContainerStyle={{
                    borderBottomWidth: 0,
                  }}
                  containerStyle={{
                    height: 50,
                    backgroundColor: searchInput === '' ? '#F0F0F0' : Colors.white,
                    borderRadius: 2,
                  }}
                  onChangeText={value => setSearchInput(value)}
                />
              </View>
              <View style={styles.resultBox}>
                <ScrollView>
                  {/* <FlatList
                    ListHeaderComponent={
                      <Text style={styles.areaTitle}>{'Area'}</Text>
                    }
                    data={areas}
                    renderItem={areaItem}
                    scrollEnabled={false}
                  /> */}
                  <FlatList
                    ListHeaderComponent={
                      getApartmentData?.total_items > 0 ?
                      <Text style={styles.areaTitle}>{`${i18nAP} (${getApartmentData?.total_items})`}</Text>
                      :
                      <Text style={styles.areaTitle}>{i18nAP}</Text>
                    }
                    scrollEnabled={false}
                    data={getApartmentData?.items || []}
                    renderItem={apartmentItem}
                    style={{ marginTop: 32 }}
                  />
                </ScrollView>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
      {getApartmentInProgress && <DimSpinnerView />}
    </View>
  );
}
//
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    ...Fonts.style.h3,
    fontFamily: Fonts.type.semiBold,
    color: Colors.textColor.black,
    alignSelf: 'center',
    marginTop: ApplicationStyles.utils.resizeHeight(50),
    marginBottom: ApplicationStyles.utils.resizeHeight(10),
    paddingHorizontal: ApplicationStyles.utils.resizeHeight(28),
  },
  formBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F9F9F9',
    paddingHorizontal: ApplicationStyles.utils.resizeHeight(28),
  },
  searchBox: {
    marginTop: ApplicationStyles.utils.resizeWidth(32),
    alignItems: 'center',
  },
  textInput: {
    ...Fonts.style.h4,
    paddingLeft: ApplicationStyles.utils.resizeWidth(10),
    color: Colors.textColor.black,
  },
  resultBox: {
    marginTop: ApplicationStyles.utils.resizeHeight(30),
  },
  areaTitle: {
    ...Fonts.style.h5,
    fontFamily: Fonts.type.semiBold,
    lineHeight: ApplicationStyles.utils.resizeHeight(30),
    color: Colors.black,
  },
  areaName: {
    ...Fonts.style.h5,
    lineHeight: ApplicationStyles.utils.resizeHeight(30),
    color: Colors.black,
    marginHorizontal: ApplicationStyles.utils.resizeWidth(10),
  },
  apartmentTitle: {
    ...Fonts.style.h5,
    lineHeight: ApplicationStyles.utils.resizeHeight(30),
    color: Colors.textColor.black,
  },
  apartmentName: {
    ...Fonts.style.h5,
    padding: ApplicationStyles.utils.resizeWidth(10),
    lineHeight: ApplicationStyles.utils.resizeHeight(34),
    color: Colors.black,
  },
});
