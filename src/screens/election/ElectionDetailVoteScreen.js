import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
//
import {TextListItem} from '../../components/ListItem';
import Button from '../../components/button';
import AlertConfirm from '../../components/alert/AlertConfirm';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {Colors, Fonts} from '../../themes';
//
import DateFormat from '../../utils/dateFormat';
//
import {useTranslation} from '../../context/LanguageContext';
//
function ElectionDetailVoteScreen(props) {
  const {
    navigation,
    getElectionDetail,
    getElectionDetailData,
    getElectionDetailProgress,
    setElectionDetailData,
    getGeneralInformationData,
  } = props;
  //
  const {
    t,
    i18nElectionED,
    i18nElectionDe,
    i18nElectionRe,
    i18nElectionEl,
    i18nElectionTOO,
    i18nElectionSE,
    i18nElectionTEHE,
    i18nElectionES,
    i18nElectionTYFV,
    i18nElectionPLFTTUE,
    i18nElectionEC,
    i18nElectionD,
  } = useTranslation();
  //
  const electionId = navigation.state.params;
  const [alertShow2, setAlertShow2] = useState(false);
  const [electionVote, setElectionVote] = useState(null);
  //
  const onPressConfirm = () => {
    navigation.navigate('ElectCandidates', electionVote);
  };
  const onPressConfirm2 = () => {
    setAlertShow2(false);
    navigation.navigate('ElectionVotingSuccess');
  };
  //
  useEffect(() => {
    getElectionDetail(electionId);
    return () => {
      setElectionDetailData(null);
    };
  }, []);
  //
  useEffect(() => {
    // console.log(getElectionDetailData)
    if (getElectionDetailData) {
      setElectionVote(getElectionDetailData);
    }
  }, [getElectionDetailData]);
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={electionVote?.title} />
      {electionVote && (
        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          {/* <View>
            <Text style={styles.title}>
              {electionVote.title}
            </Text>
          </View> */}
          <Text style={styles.desc}>
            {i18nElectionTEHE}
          </Text>
          <Text style={styles.subtitle}>
            {i18nElectionES}
          </Text>
          <Text style={styles.desc}>{electionVote.description}</Text>
          <Text style={styles.subtitle}>{i18nElectionD}</Text>
          <Text style={styles.desc}>{electionVote.description}</Text>
          <Text style={styles.subtitle}>{i18nElectionRe}</Text>
          {/* <WebView
            scrollEnabled={false}
            source={{
              html: generateHtml(electionVote.responsibility),
            }}
          /> */}
          <TextListItem>{electionVote?.responsibility}</TextListItem>
          <Text style={styles.subtitle}>
            {i18nElectionEl}
          </Text>
          <View style={styles.dateBox}>
            <Text style={styles.date}>
              {`${DateFormat.formatDateElection(
                electionVote.election_start_date,
              )} - ${DateFormat.formatDateElection(
                electionVote.election_end_date,
              )}`}
            </Text>
          </View>
          <Text style={styles.subtitle}>
            {i18nElectionTOO}
          </Text>
          <View style={styles.dateBox}>
            <Text style={styles.date}>
              {/* 2020/02/12 - 2022/02/12 */}
              {`${DateFormat.formatDate(
                electionVote.effective_start_date,
              )} - ${DateFormat.formatDate(electionVote.effective_end_date)}`}
            </Text>
          </View>
          <View style={styles.submitBox}>
            <Button text={i18nElectionEC} disabled={electionVote?.results.length > 0 ? true : false} onPress={onPressConfirm} />
          </View>
        </ScrollView>
      )}
      <AlertConfirm
        title="Please confirm your vote for Luke Anderson. You cannot change your vote afterwards"
        show={alertShow2}
        onPressCancel={() => setAlertShow2(false)}
        onPressConfirm={onPressConfirm2}
      />
      {getElectionDetailProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default ElectionDetailVoteScreen;
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
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.base,
    color: Colors.mainColor,
    paddingVertical: 10,
  },
  subtitle: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.medium,
    color: Colors.black,
    paddingTop: 25,
  },
  desc: {
    ...Fonts.style.captionRegular,
    color: Colors.gray2,
    lineHeight: 30,
  },
  dateBox: {
    paddingTop: 14,
    marginHorizontal: -30,
    paddingHorizontal: 30,
    backgroundColor: Colors.whiteGray,
  },
  date: {
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
    color: Colors.mainColor,
  },
  submitBox: {
    paddingTop: 30,
  },
});
