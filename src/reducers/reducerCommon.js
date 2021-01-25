import * as types from '../actions/actionCommon'

const initialState = {
    getUploadImageProgress: false,
    getDeleteImageProgress: false,
    getDeleteImageData: null,

    uploadImageData: null,
    uploadFontImageData: null,
    uploadBackImageData: null,

    channelData: null,
    channelStorageData: [],
    pageChannels: 1,
    totalChannels: 0,
}
//
const reducerCommon = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_UPLOAD_IMAGE_DATA: {
            return {
                ...state,
                uploadImageData: action.data,
                uploadFontImageData: action.data,
                uploadBackImageData: action.data,
            }
        }
        case types.SET_REQUEST_UPLOAD_IMAGE: {
            return {
                ...state,
                getUploadImageProgress: true,
            }
        }
        case types.SET_REQUEST_UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                getUploadImageProgress: false,
                uploadImageData: action.data,
            }
        }
        case types.SET_REQUEST_UPLOAD_FONT_IMAGE_SUCCESS: {
            return {
                ...state,
                getUploadImageProgress: false,
                uploadFontImageData: action.data,
            }
        }
        case types.SET_REQUEST_UPLOAD_BACK_IMAGE_SUCCESS: {
            return {
                ...state,
                getUploadImageProgress: false,
                uploadBackImageData: action.data,
            }
        }
        case types.SET_REQUEST_UPLOAD_IMAGE_ERROR: {
            return {
                ...state,
                getUploadImageProgress: false,
            }
        }
        //
        case types.SET_REQUEST_DELETE_IMAGE: {
            return {
                ...state,
                getDeleteImageProgress: true,
            }
        }
        case types.SET_REQUEST_DELETE_IMAGE_SUCCESS: {
            return {
                ...state,
                getDeleteImageProgress: false,
                getDeleteImageData: action.data,
            }
        }
        case types.SET_REQUEST_DELETE_IMAGE_ERROR: {
            return {
                ...state,
                getDeleteImageProgress: false,
            }
        }
        //
        case types.SET_CHANNEL: {
            return {
                ...state,
                channelData: action.data,
            }
        }
        //
        case types.SET_CHANNEL_STORAGE: {
            return {
                ...state,
                channelStorageData: action.data,
            }
        }
        case types.SET_PAGE_CHANNELS: {
            return {
                ...state,
                pageChannels: action.data,
            }
        }
        case types.SET_TOTAL_CHANNELS: {
            return {
                ...state,
                totalChannels: action.data,
            }
        }
        //
        default: 
            return state
    }
}

export default reducerCommon