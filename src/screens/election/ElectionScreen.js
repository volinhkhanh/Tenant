import React, {memo, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
//
import CardAnnouncement from '../../components/card/CardAnnouncement2';
import {ElectionHistoryItem} from '../../components/ListItem';
import MainHeader from '../../components/MainHeader';
import DimSpinnerView from '../../components/DimSpinnerView';
import AlertConfirm from '../../components/alert/AlertConfirm';
//
import {Images, Colors, Fonts} from '../../themes';
//
import DateFormat from '../../utils/dateFormat';
//
import {useTranslation} from '../../context/LanguageContext';
//
const ElectionScreen = props => {
  const {
    navigation,
    getListElection,
    getListElectionData,
    getListElectionProgress,
    getGeneralInformationData,
  } = props;
  //
  const {t, i18nElectionEl, i18nElectionHi, i18nElectionRule, i18nElectionEmpty} = useTranslation();
  //
  const [alertShow, setAlertShow] = useState(false);
  const [electionOnGoing, setElectionOnGoing] = useState(null);
  const [electionCompleted, setElectionCompleted] = useState(null);
  //
  const getElectionOnGoing = async () => {
    const data = await getListElection({status: 'ON_GOING'});
    if (data) {
      setElectionOnGoing(data?.items);
    }
  };
  //
  const getElectionCompleted = async () => {
    const data = await getListElection({status: 'COMPLETED'});
    if (data) {
      setElectionCompleted(data?.items);
    }
  };
  //
  useEffect(() => {
    console.log(getGeneralInformationData)
    if (!getGeneralInformationData?.is_head) {
      setAlertShow(true);
    }
    getElectionCompleted();
    getElectionOnGoing();
  }, []);
  //
  return (
    <View style={styles.container}>
      <MainHeader
        navigation={navigation}
        title={
          // t('Election')
          i18nElectionEl
        }
      />
      <ScrollView>
        {electionOnGoing?.length < 1 && electionCompleted?.length < 1 ? (
          <View
            style={{
              paddingTop: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Images.EmptyElection />
            <Text style={styles.textEmpty}>{i18nElectionEmpty}</Text>
          </View>
        ) : null}
        {electionOnGoing?.map(item => {
          return (
            <View style={styles.buttonBox}>
              <CardAnnouncement
                style={styles.card1}
                contentStyle={styles.contentCard}
                onPress={() => {
                  navigation.navigate('ElectionDetailVote', item?.uuid);
                }}>
                <View style={{paddingLeft: 18}}>
                  <Text style={styles.title}>{item?.title}</Text>
                  <Text style={styles.date}>
                    {`${
                      item?.election_start_date
                        ? DateFormat.formatDateElection(
                            item?.election_start_date,
                          )
                        : ''
                    }${item?.election_end_date ? ' - ' : ''}${
                      item?.election_end_date
                        ? DateFormat.formatDateElection(item?.election_end_date)
                        : ''
                    }`}
                  </Text>
                </View>
              </CardAnnouncement>
            </View>
          );
        })}
        {electionCompleted && (
          <View style={styles.listTitleBox}>
            <Text style={styles.listTitle}>
              {electionCompleted.length > 0 && i18nElectionHi}
            </Text>
            <FlatList
              ListEmptyComponent={() =>
                !electionCompleted ? (
                  <View style={{paddingTop: 40, alignItems: 'center'}}>
                    <Image
                      source={Images.noData}
                      style={{width: 119, height: 127}}
                    />
                  </View>
                ) : null
              }
              style={{height: '100%'}}
              contentContainerStyle={styles.contentScroll}
              data={electionCompleted || []}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Ripple
                  onPress={() => {
                    navigation.navigate('ElectionDetailVote', item?.uuid);
                  }}>
                  <ElectionHistoryItem item={item} />
                </Ripple>
              )}
            />
          </View>
        )}
      </ScrollView>
      <AlertConfirm
        title={i18nElectionRule}
        show={alertShow}
        closeButton={true}
        onPressCancel={() => {
          setAlertShow(false);
          navigation.pop();
        }}
      />
      {getListElectionProgress && <DimSpinnerView />}
    </View>
  );
};
//
export default memo(ElectionScreen);
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
    paddingTop: 40,
    // paddingBottom: 20,
  },
  listTitleBox: {
    paddingTop: 20,
  },
  listTitle: {
    ...Fonts.style.bodyMedium,
    color: Colors.gray1,
    paddingHorizontal: 28,
    paddingBottom: 10,
  },
  contentScroll: {
    paddingTop: 10,
  },
  title: {
    paddingVertical: 5,
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.base,
    color: Colors.black,
  },
  date: {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.base,
    color: Colors.gray7,
  },
  textEmpty: {
    fontSize: 16,
    color: Colors.gray7,
    paddingTop: 7,
  },
});
