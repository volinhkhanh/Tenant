import * as types from '../actions/actionChat'

const initialState = {
    //-------------------------------------------------------------------
    getSendBirdInfoProgress: false,
    getMessageProgress: false,
    getSendMessageProgress: false,
    //-------------------------------------------------------------------
    getSendBirdInfoData: null,
    getMessageData: null,
    getSendMessageData: null,
    sendBirdUnreadCount: null,
    //-------------------------------------------------------------------
}
//
const reducerChat = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_SENDBIRD_UNREAD_COUNT: {
            return {
                ...state,
                sendBirdUnreadCount: Object.values(action.data)[0],
            }
        }
        case types.SET_SENDBIRD_INFO_DATA: {
            return {
                ...state,
                getSendBirdInfoData: action.data,
            }
        }
        case types.SET_REQUEST_SENDBIRD_INFO: {
            return {
                ...state,
                getSendBirdInfoProgress: true,
            }
        }
        case types.SET_REQUEST_SENDBIRD_INFO_SUCCESS: {
            return {
                ...state,
                getSendBirdInfoProgress: false,
                getSendBirdInfoData: action.data,
            }
        }
        case types.SET_REQUEST_SENDBIRD_INFO_ERROR: {
            return {
                ...state,
                getSendBirdInfoProgress: false,
            }
        }
        //
        case types.SET_MESSAGE_DATA: {
            return {
                ...state,
                getMessageData: action.data,
            }
        }
        case types.SET_REQUEST_MESSAGE: {
            return {
                ...state,
                getMessageProgress: true,
            }
        }
        case types.SET_REQUEST_MESSAGE_SUCCESS: {
            return {
                ...state,
                getMessageProgress: false,
                getMessageData: action.data,
            }
        }
        case types.SET_REQUEST_MESSAGE_ERROR: {
            return {
                ...state,
                getMessageProgress: false,
            }
        }
        //
        case types.SET_REQUEST_SEND_MESSAGE: {
            return {
                ...state,
                getSendMessageProgress: true,
            }
        }
        case types.SET_REQUEST_SEND_MESSAGE_SUCCESS: {
            return {
                ...state,
                getSendMessageProgress: false,
                getSendMessageData: action.data,
            }
        }
        case types.SET_REQUEST_SEND_MESSAGE_ERROR: {
            return {
                ...state,
                getSendMessageProgress: false,
            }
        }
        default: 
            return state
    }
}

export default reducerChat