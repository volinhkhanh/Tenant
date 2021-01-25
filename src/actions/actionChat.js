import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest';
//---------------------------------------------------------------------------------------------------------------------
export const SET_SENDBIRD_UNREAD_COUNT = 'SET_SENDBIRD_UNREAD_COUNT';
export const SET_SENDBIRD_INFO_DATA = 'SET_SENDBIRD_INFO_DATA';
export const SET_REQUEST_SENDBIRD_INFO = 'SET_REQUEST_SENDBIRD_INFO';
export const SET_REQUEST_SENDBIRD_INFO_SUCCESS =
  'SET_REQUEST_SENDBIRD_INFO_SUCCESS';
export const SET_REQUEST_SENDBIRD_INFO_ERROR =
  'SET_REQUEST_SENDBIRD_INFO_ERROR';
//
export const SET_MESSAGE_DATA = 'SET_MESSAGE_DATA';
export const SET_REQUEST_MESSAGE = 'SET_REQUEST_MESSAGE';
export const SET_REQUEST_MESSAGE_SUCCESS = 'SET_REQUEST_MESSAGE_SUCCESS';
export const SET_REQUEST_MESSAGE_ERROR = 'SET_REQUEST_MESSAGE_ERROR';
//
export const SET_REQUEST_SEND_MESSAGE = 'SET_REQUEST_SEND_MESSAGE';
export const SET_REQUEST_SEND_MESSAGE_SUCCESS =
  'SET_REQUEST_SEND_MESSAGE_SUCCESS';
export const SET_REQUEST_SEND_MESSAGE_ERROR = 'SET_REQUEST_SEND_MESSAGE_ERROR';
//---------------------------------------------------------------------------------------------------------------------
export const setSendBirdUnreadCount = data => ({
  type: SET_SENDBIRD_UNREAD_COUNT,
  data,
});
export const setSendBirdInfoData = data => ({
  type: SET_SENDBIRD_INFO_DATA,
  data,
});
export const setRequestSendBirdInfo = () => ({type: SET_REQUEST_SENDBIRD_INFO});
export const setRequestSendBirdInfoSuccess = data => ({
  type: SET_REQUEST_SENDBIRD_INFO_SUCCESS,
  data,
});
export const setRequestSendBirdInfoError = data => ({
  type: SET_REQUEST_SENDBIRD_INFO_ERROR,
  data,
});
//
export const setMessageData = data => ({type: SET_MESSAGE_DATA, data});
export const setRequestMessage = () => ({type: SET_REQUEST_MESSAGE});
export const setRequestMessageSuccess = data => ({
  type: SET_REQUEST_MESSAGE_SUCCESS,
  data,
});
export const setRequestMessageError = data => ({
  type: SET_REQUEST_MESSAGE_ERROR,
  data,
});
//
export const setRequestSendMessage = () => ({type: SET_REQUEST_SEND_MESSAGE});
export const setRequestSendMessageSuccess = data => ({
  type: SET_REQUEST_SEND_MESSAGE_SUCCESS,
  data,
});
export const setRequestSendMessageError = data => ({
  type: SET_REQUEST_SEND_MESSAGE_ERROR,
  data,
});
//---------------------------------------------------------------------------------------------------------------------
export const getSendBirdInfo = params => async dispatch => {
  dispatch(setRequestSendBirdInfo());
  try {
    const response = await serviceRest.getSendBirdInfo(params);
    if (response.status === 200) {
      dispatch(setRequestSendBirdInfoSuccess(response.data));
    } else {
      dispatch(setRequestSendBirdInfoError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestSendBirdInfoError(error));
    return false;
  }
};
//
export const getMessage = params => async dispatch => {
  dispatch(setRequestMessage());
  try {
    const response = await serviceRest.getMessage(params);
    if (response.status === 200) {
      dispatch(setRequestMessageSuccess(response.data));
      return response.data;
    } else {
      dispatch(setRequestMessageError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestMessageError(error));
    return false;
  }
};
//
export const postSendMessage = params => async dispatch => {
  dispatch(setRequestSendMessage());
  try {
    const response = await serviceRest.postSendMessage(params);
    if (response.status === 201) {
      dispatch(setRequestSendMessageSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestSendMessageError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestSendMessageError(error));
    return false;
  }
};
//
export const getSendBirdUnread = (
  application_id,
  channel_url,
  user_ids,
) => async dispatch => {
  try {
    const response = await serviceRest.getSendBirdUnread(
      application_id,
      channel_url,
      user_ids,
    );
    // console.log(response)
    if (response.status === 200) {
      dispatch(setSendBirdUnreadCount(response.data.unread));
    } else {
      dispatch(setSendBirdUnreadCount(null));
    }
  } catch (error) {
    dispatch(setSendBirdUnreadCount(null));
  }
};
//
export const postMarkAsRead = (
  application_id,
  channel_url,
  user_id,
) => async dispatch => {
  try {
    const response = await serviceRest.postMarkAsRead(
      application_id,
      channel_url,
      user_id,
    );
    // if (response.status === 200) {
    //   dispatch(setSendBirdUnreadCount(response.data.unread));
    // } else {
    //   dispatch(setSendBirdUnreadCount(null));
    // }
  } catch (error) {
    // dispatch(setSendBirdUnreadCount(null));
    console.log(error)
  }
};
