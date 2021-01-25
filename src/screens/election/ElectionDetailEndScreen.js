import React, { useState, memo, useEffect } from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
//
import { Images, Colors, Fonts } from '../../themes/';
//
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import DateFormat from '../../utils/dateFormat'
//
import { useTranslation } from '../../context/LanguageContext';
//
function ElectionDetailEndScreen(props) {
  const {
    navigation,
    getElectionDetail,
    getElectionDetailProgress,
    getElectionDetailData,
    setElectionDetailData,
    getGeneralInformationData,
  } = props;
  const uuid = navigation.state.params
  //
  const { t } = useTranslation()
  //
  const [electionData, setElectionData] = useState(null)
  //
  useEffect(() => {
    getElectionDetail(uuid)
    return () => {setElectionDetailData(null)}
  }, [])
  useEffect(() => {
    setElectionData(getElectionDetailData)
  }, [getElectionDetailData])
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={'Election'} />
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>{t('TheElectionHasEnded')}</Text>
          {
            electionData &&
            <Text style={styles.subtitle}>
              {`${DateFormat.formatDateElection(electionData.effective_start_date)} - ${DateFormat.formatDateElection(electionData.effective_end_date)}`}
            </Text>
          }
        </View>
        <Text style={styles.title}>{t('ElectionResult')}</Text>
        {
          electionData?.results[0]?.unit.owner.person.full_name && 
          <Text style={styles.subtitle}>
            {electionData?.results[0]?.unit.owner.person.full_name} {t('HasBeenChosenAsThe')} {electionData?.title}
          </Text>
        }
        <View style={{ alignItems: 'center', paddingVertical: 50 }}>
          <Images.IllustrationConfirmation />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>{t('ThankYouForVoting')}</Text>
          <Text style={[styles.subtitle, {textAlign: 'center'}]}>
            {t('PleaseLookForward')}
          </Text>
        </View>
      </ScrollView>
      {getElectionDetailProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default ElectionDetailEndScreen;
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLightGray,
  },
  contentScroll: {
    paddingVertical: 10,
    paddingHorizontal: 27,
    paddingBottom: 50,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingLeft: 26,
    paddingRight: 21,

    borderBottomColor: Colors.gray5,
    borderBottomWidth: 0.5,
  },
  title: {
    ...Fonts.style.subtitleSemibold,
    color: Colors.gray1,
    paddingVertical: 10,
  },
  subtitle: {
    ...Fonts.style.bodyRegular,
    color: Colors.gray2,
  },
  desc: {
    ...Fonts.style.captionRegular,
    color: Colors.gray4,
  },
});
