import React, {memo} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
//
import {Colors, Fonts} from '../../themes';
//
import TemplateBill from '../../components/TemplateBill';
import BackgroundImage from '../../components/BackgroundImage';
import MainHeader from '../../components/MainHeader';
//
import {useTranslation} from '../../context/LanguageContext';
//
function ElectricityBillScreen(props) {
  const {navigation} = props;
  const data = navigation.state.params
  //
  const {
    t,
    i18nBillEB,
    i18nBillBD,
  } = useTranslation();
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nBillBD} />
      <BackgroundImage />
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <TemplateBill
          data={{
            title: i18nBillEB,
            billData: data
          }}
        />
      </ScrollView>
    </View>
  );
}
//
export default memo(ElectricityBillScreen);
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  select: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
  },
  cardL: {
    minHeight: 100,
    paddingTop: 20,
  },
  contentScroll: {
    paddingTop: 20,
  },
  card: {
    marginTop: 16,
  },
  card1: {
    marginVertical: 7,
  },
  contentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  historyTitleText: {
    paddingVertical: 5,
    ...Fonts.style.bodyMedium,
    color: Colors.gray1,
  },
  subtitle: {
    ...Fonts.style.bodySemibold,
    color: Colors.gray4,
  },
});
