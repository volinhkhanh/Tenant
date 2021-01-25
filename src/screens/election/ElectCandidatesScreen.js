import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
//
import {CandidateVoteListItem} from '../../components/ListItem';
import AlertHightLight from '../../components/alert/AlertHightLight';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
//
import {useTranslation} from '../../context/LanguageContext';
//
import {Colors, Fonts} from '../../themes';
//
function ElectCandidatesScreen(props) {
  const {
    navigation,
    getCandidatesByElection,
    getCandidatesByElectionData,
    getCandidatesByElectionProgress,
    getVotingElection,
    getGeneralInformationData,
  } = props;
  //
  const {
    t,
    i18nElectionEC,
    i18nElectionCa,
    i18nElectionCD,
    i18nElectionPCYVF,
    i18nElectionYCCYVA,
    i18nElectionYHVF,
    i18nElectionVS,
    i18nElectionYVHBC,
    i18nElectionTERWBA,
  } = useTranslation();
  //
  const uuid = navigation.state.params?.uuid || null;
  const electionDescription = navigation.state.params.description || '';
  //
  const [alertShow, setAlertShow] = useState(false);
  const [alertShow2, setAlertShow2] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [candidatesData, setCandidatesData] = useState([]);
  const [nameInAlert, setNameInAlert] = useState('');
  const [idSelected, setIdSelected] = useState('');
  //
  const onPressConfirm2 = async () => {
    setAlertShow2(false);
    const data = await getVotingElection(idSelected);
    if (data) {
      navigation.navigate('Success', {
        title: i18nElectionVS,
        descriptionTitle: i18nElectionYVHBC,
        description: i18nElectionTERWBA,
      });
    }
  };
  const onPress = (id, name) => {
    setNameInAlert(name);
    setIdSelected(id);
    if (activeId != null) {
      setAlertShow(true);
    } else {
      setAlertShow2(true);
    }
  };
  //
  const renderItem = (item, navigation) => {
    const id = item?.uuid;
    const imageUrl = item?.profile?.url || '';
    const avatar = item?.unit?.owner?.person?.avatar?.url || '';
    const full_name = item?.full_name || '';
    return (
      <CandidateVoteListItem
        id={item.id}
        profile={imageUrl}
        avatar={avatar}
        active={activeId == item?.uuid ? true : false}
        title={full_name}
        onPress={() => {
          onPress(id, full_name);
        }}
        navigation={navigation}
      />
    );
  };
  //
  useEffect(() => {
    getCandidatesByElection(uuid);
  }, []);
  //
  useEffect(() => {
    if (getCandidatesByElectionData) {
      setActiveId(getCandidatesByElectionData.voted_participant?.uuid);
      setCandidatesData(getCandidatesByElectionData.items);
    }
  }, [getCandidatesByElectionData]);
  //
  return (
    <View style={styles.container}>
      <MainHeader navigation={navigation} title={i18nElectionEC} />
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>{electionDescription}</Text>
        </View>
        <Text style={styles.subtitle}>{i18nElectionCa}</Text>
        <Text style={styles.description}>{i18nElectionCD}</Text>
        <FlatList
          data={candidatesData || []}
          renderItem={({item}) => renderItem(item, navigation)}
          keyExtractor={({id}) => id}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
      {/* <AlertConfirm
        title={`${t('PleaseConfirmYourVoteFor')} ${nameInAlert}. ${t(
          'YouCannotChangeYourVoteAfterwards',
        )}`}
        show={alertShow2}
        onPressCancel={() => setAlertShow2(false)}
        onPressConfirm={onPressConfirm2}
      /> */}
      <AlertHightLight
        titleStart={i18nElectionPCYVF}
        titleMain={nameInAlert}
        titleEnd={i18nElectionYCCYVA}
        show={alertShow2}
        onPressCancel={() => setAlertShow2(false)}
        onPressConfirm={onPressConfirm2}
      />
      <AlertHightLight
        titleStart={i18nElectionYHVF}
        titleMain={getCandidatesByElectionData?.voted_participant?.full_name}
        titleEnd={i18nElectionYCCYVA}
        show={alertShow}
        closeButton={true}
        onPressCancel={() => setAlertShow(false)}
      />
      {getCandidatesByElectionProgress && <DimSpinnerView />}
    </View>
  );
}
//
export default ElectCandidatesScreen;
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
    paddingVertical: 20,
  },
  desc: {
    ...Fonts.style.captionRegular,
    color: Colors.gray2,
    lineHeight: 30,
  },
  dateBox: {
    paddingVertical: 14,
    marginHorizontal: -30,
    paddingHorizontal: 30,
    backgroundColor: Colors.whiteGray,
  },
  date: {
    ...Fonts.style.bodyRegular,
    color: Colors.mainColor,
  },
  submitBox: {
    paddingTop: 30,
  },
  description: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
    marginBottom: 10,
  },
});
