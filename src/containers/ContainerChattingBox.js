import { connect } from 'react-redux'
//
import ChattingBoxScreen from '../screens/chat/ChattingBoxScreen'
//
import {
  getMessage,
  postSendMessage,
  getSendBirdInfo,
  setSendBirdInfoData,
  setMessageData,
  postMarkAsRead,
} from '../actions/actionChat'

const mapStateToProps = ({
  reducerMember: {
    getMemberData,
  },
  reducerHome: {
    getGeneralInformationData
  },
  reducerChat: {
    getSendBirdInfoProgress,
    getSendBirdInfoData,
    getMessageProgress,
    getMessageData,
    getSendMessageProgress,
    getSendMessageData,
  },
}) => ({
  getSendBirdInfoProgress,
  getSendBirdInfoData,
  getMessageProgress,
  getMessageData,
  getGeneralInformationData,
  getSendMessageProgress,
  getSendMessageData,
  getMemberData,
});

const ContainerChattingBox = connect(
  mapStateToProps,
  {
    getMessage,
    postSendMessage,
    getSendBirdInfo,
    setSendBirdInfoData,
    setMessageData,
    postMarkAsRead,
  },
)(ChattingBoxScreen);

export default ContainerChattingBox
