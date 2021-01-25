import React, {memo, useState} from 'react';
import {View, Text, Linking, StyleSheet, ScrollView} from 'react-native';
import _ from 'lodash';
//
import Button from '../../components/button';
import DropDownItem from '../../components/DropdownItem';
import CsSupportScreen from './CsSupportScreen';
import AlertConfirm from '../../components/alert/AlertConfirm';
import MainHeader from '../../components/MainHeader';
//
import {ApplicationStyles, Colors, Fonts} from '../../themes/';
//
import Layouts from '../../constants/Layouts';
//
import {useTranslation} from '../../context/LanguageContext';
//
const {width} = Layouts;
const FAQScreen = props => {
  const {navigation} = props;
  const {
    t,
    i18nCsSupportScreenSu,
    i18nCsSupportScreenFAQ,
    i18nCsSupportScreenAl,

    i18nCsSupportScreenWIIIT,
    i18nCsSupportScreenWIIITC,
    i18nCsSupportScreenAIATSR,
    i18nCsSupportScreenNTINAP,
    i18nCsSupportScreenHDISMR,
    i18nCsSupportScreenYRASBD,
    i18nCsSupportScreenIIATAS,
    i18nCsSupportScreenNTINAI,
    i18nCsSupportScreenCICMAI,
    i18nCsSupportScreenYYCCAP,
    i18nCsSupportScreenCILITS,
    i18nCsSupportScreenWYCLIT,
    i18nCsSupportScreenIDWTRE,
    i18nCsSupportScreenYCOOOE,
    i18nCsSupportScreenDYWTETST,
    i18nCsSupportScreenCSC,
    i18nCsSupportScreenCancel,
    i18nCsSupportScreenEm,
    i18nCsSupportScreenCall,
  } = useTranslation();
  const [dataTitles, setDataTitles] = useState(DATA_TITLES);
  const [selectTitleButton, setSelectTitleButton] = useState(dataTitles[0]);
  const [call, setCall] = useState(false);
  const [message, setMessage] = useState(false);
  const informationData = navigation.state?.params || [];

  const contents = [
    {
      title: i18nCsSupportScreenWIIIT,
      body: i18nCsSupportScreenWIIITC,
    },
    {
      title: i18nCsSupportScreenAIATSR,
      body: i18nCsSupportScreenNTINAP,
    },
    {
      title: i18nCsSupportScreenHDISMR,
      body: i18nCsSupportScreenYRASBD,
    },
    {
      title: i18nCsSupportScreenIIATAS,
      body: i18nCsSupportScreenNTINAI,
    },
  ];

  const contents1 = [
    {
      title: i18nCsSupportScreenCICMAI,
      body: i18nCsSupportScreenYYCCAP,
    },
    {
      title: i18nCsSupportScreenCILITS,
      body: i18nCsSupportScreenWYCLIT,
    },
    {
      title: i18nCsSupportScreenIDWTRE,
      body: i18nCsSupportScreenYCOOOE,
    },
  ];
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('Support')
          i18nCsSupportScreenSu
        }
      />
      <View style={styles.header}>
        {dataTitles.map(item => {
          const type = selectTitleButton.id === item.id ? 'white' : 'default';
          return (
            <Button
              size="small"
              text={item.name}
              type={type}
              onPress={() => setSelectTitleButton(item)}
              style={{
                minWidth: 64,
                ...ApplicationStyles.shadow.dynamicOffset(
                  2,
                  4,
                  undefined,
                  0.15,
                  14,
                ),
              }}
            />
          );
        })}
      </View>
      <ScrollView
        contentContainerStyle={styles.contentScroll}
        showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: Colors.silver1}}>
          <Text style={styles.headerList}>
            {/* {t('FrequentlyAskedQuestions')} */}
            {i18nCsSupportScreenFAQ}
          </Text>
          {contents &&
            contents.map((param, i) => {
              return (
                <DropDownItem
                  key={i}
                  style={styles.dropDownItem}
                  contentVisible={false}
                  backgroundColor={Colors.white}
                  header={
                    <View
                      style={{
                        minHeight: 75,
                        justifyContent: 'center',
                        paddingHorizontal: 30,

                        width: width * 0.9,
                      }}>
                      <Text
                        style={{
                          textAlign: 'left',
                          ...Fonts.style.captionRegular,
                          color: Colors.gray2,
                        }}>
                        {/* {t(`src.screens.other.FAQScreen.${param.title}`)} */}
                        {param.title}
                      </Text>
                    </View>
                  }>
                  <View style={styles.dropDownContent}>
                    <Text
                      style={{
                        ...Fonts.style.otherLight,
                        color: Colors.gray1,
                      }}>
                      {/* {t(`src.screens.other.FAQScreen.${param.body}`)} */}
                      {param.body}
                    </Text>
                  </View>
                </DropDownItem>
              );
            })}
        </View>
        <View style={{backgroundColor: Colors.silver1}}>
          <Text style={styles.headerList}>
            {/* {t('All')} */}
            {i18nCsSupportScreenAl}
          </Text>
          {contents1 &&
            contents1.map((param, i) => {
              return (
                <DropDownItem
                  key={i}
                  style={styles.dropDownItem}
                  contentVisible={false}
                  backgroundColor={Colors.white}
                  header={
                    <View
                      style={{
                        minHeight: 75,
                        justifyContent: 'center',
                        paddingHorizontal: 30,
                        width: width * 0.9,
                      }}>
                      <Text
                        style={{
                          textAlign: 'left',
                          ...Fonts.style.captionRegular,
                          color: Colors.gray2,
                        }}>
                        {/* {t(`src.screens.other.FAQScreen.${param.title}`)} */}
                        {param.title}
                      </Text>
                    </View>
                  }>
                  <View style={styles.dropDownContent}>
                    <Text
                      style={{
                        ...Fonts.style.otherLight,
                        color: Colors.gray1,
                      }}>
                      {/* {t(`src.screens.other.FAQScreen.${param.body}`)} */}
                      {param.body}
                    </Text>
                  </View>
                </DropDownItem>
              );
            })}
        </View>
        <CsSupportScreen
          navigation={navigation}
          onChangeMess={() => setMessage(!message)}
          onChangeCall={() => setCall(!call)}
        />
      </ScrollView>
      <AlertConfirm
        title={i18nCsSupportScreenDYWTETST}
        show={call}
        rightText={i18nCsSupportScreenEm}
        leftText={i18nCsSupportScreenCancel}
        onPressCancel={() => setCall(false)}
        onPressConfirm={() => {
          navigation.navigate('SendMail', informationData);
          setCall(false);
        }}
      />
      <AlertConfirm
        title={`${i18nCsSupportScreenCSC} 1900 1486`}
        show={message}
        rightText={i18nCsSupportScreenCall}
        leftText={i18nCsSupportScreenCancel}
        onPressCancel={() => setMessage(false)}
        onPressConfirm={() => {
          setMessage(false);
          Linking.openURL('tel://19001486');
        }}
      />
    </View>
  );
};
//
export default memo(FAQScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 27,
    paddingVertical: 20,
  },
  headerList: {
    ...Fonts.style.bodyRegular,
    paddingVertical: 20,
    paddingHorizontal: 28,
  },
  dropDownItem: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  dropDownContent: {
    backgroundColor: '#F7F0CF',
    paddingHorizontal: 28,
    width: '100%',
    paddingVertical: 10,
  },
});
//
const DATA_TITLES = [
  {
    id: '1',
    name: 'All',
  },
  {
    id: '2',
    name: 'Apt',
  },
  {
    id: '3',
    name: 'App',
  },
  {
    id: '4',
    name: 'Other',
  },
];
