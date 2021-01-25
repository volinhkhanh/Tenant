import {connect} from 'react-redux';
//
import HomeScreen from '../screens/HomeScreen';
//
import {setUnitId} from '../actions/actionMember';
//
import {
  getGeneralInformation,
  getListUnit,
  setGeneralInformationData,
} from '../actions/actionHome';
import {getSendBirdInfo, getSendBirdUnread} from '../actions/actionChat';
import {setChannelStorage, setPageChannels} from '../actions/actionCommon';
//
const mapStateToProps = ({
  reducerMember: {getMemberData, getUnitIdData},
  reducerChat: {getSendBirdInfoData, sendBirdUnreadCount},
  reducerHome: {
    listUnitData,
    getGeneralInformationData,
    getGeneralInformationProgress,
    getListUnitProgress,
  },
}) => ({
  getMemberData,
  getGeneralInformationData,
  getGeneralInformationProgress,
  getUnitIdData,
  listUnitData,
  getSendBirdInfoData,
  sendBirdUnreadCount,
  getListUnitProgress,
});

const ContainerHome = connect(
  mapStateToProps,
  {
    getGeneralInformation,
    getSendBirdInfo,
    setUnitId,
    getSendBirdUnread,
    getListUnit,
    setGeneralInformationData,
    setChannelStorage,
    setPageChannels,
  },
)(HomeScreen);

export default ContainerHome;
