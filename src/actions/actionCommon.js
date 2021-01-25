import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest'
//---------------------------------------------------------------------------------------------------------------------
export const SET_REQUEST_DELETE_IMAGE = 'SET_REQUEST_DELETE_IMAGE'
export const SET_REQUEST_DELETE_IMAGE_SUCCESS = 'SET_REQUEST_DELETE_IMAGE_SUCCESS'
export const SET_REQUEST_DELETE_IMAGE_ERROR = 'SET_REQUEST_DELETE_IMAGE_ERROR'
//
export const SET_UPLOAD_IMAGE_DATA = 'SET_UPLOAD_IMAGE_DATA'
export const SET_REQUEST_UPLOAD_IMAGE = 'SET_REQUEST_UPLOAD_IMAGE'
export const SET_REQUEST_UPLOAD_IMAGE_SUCCESS = 'SET_REQUEST_UPLOAD_IMAGE_SUCCESS'
export const SET_REQUEST_UPLOAD_FONT_IMAGE_SUCCESS = 'SET_REQUEST_UPLOAD_FONT_IMAGE_SUCCESS'
export const SET_REQUEST_UPLOAD_BACK_IMAGE_SUCCESS = 'SET_REQUEST_UPLOAD_BACK_IMAGE_SUCCESS'
export const SET_REQUEST_UPLOAD_IMAGE_ERROR = 'SET_REQUEST_UPLOAD_IMAGE_ERROR'
//
export const SET_CHANNEL = 'SET_CHANNEL'
export const SET_CHANNEL_STORAGE = 'SET_CHANNEL_STORAGE'
export const SET_PAGE_CHANNELS = 'SET_PAGE_CHANNELS'
//---------------------------------------------------------------------------------------------------------------------
export const setRequestDeleteImage = () => ({type: SET_REQUEST_DELETE_IMAGE})
export const setRequestDeleteImageSuccess = data => ({type: SET_REQUEST_DELETE_IMAGE_SUCCESS, data})
export const setRequestDeleteImageError = data => ({type: SET_REQUEST_DELETE_IMAGE_ERROR, data})
//
export const setUploadImageData = (data) => ({type: SET_UPLOAD_IMAGE_DATA, data})
export const setRequestUploadImage = () => ({type: SET_REQUEST_UPLOAD_IMAGE})
export const setRequestUploadImageSuccess = data => ({type: SET_REQUEST_UPLOAD_IMAGE_SUCCESS, data})
export const setRequestUploadFontImageSuccess = data => ({type: SET_REQUEST_UPLOAD_FONT_IMAGE_SUCCESS, data})
export const setRequestUploadBackImageSuccess = data => ({type: SET_REQUEST_UPLOAD_BACK_IMAGE_SUCCESS, data})
export const setRequestUploadImageError = data => ({type: SET_REQUEST_UPLOAD_IMAGE_ERROR, data})
//
export const setChannel = (data) => ({type: SET_CHANNEL, data})
export const setChannelStorage = (data) => ({type: SET_CHANNEL_STORAGE, data})
export const setPageChannels = (data) => ({type: SET_PAGE_CHANNELS, data})
//---------------------------------------------------------------------------------------------------------------------
export const deleteImage = (id) => async (dispatch) => {
    dispatch(setRequestDeleteImage())
    try {
        const response = await serviceRest.deleteImage(id)
        console.log(response)
        if(response.status === 204) {
            dispatch(setRequestDeleteImageSuccess(response.data))
            return true
        } else {
            dispatch(setRequestDeleteImageError(response.problem))
            return false
        }
    } catch(error) {
        dispatch(setRequestDeleteImageError(error))
        return false
    }
}
//
//
export const postUploadImage = (params, type) => async (dispatch) => {
    dispatch(setRequestUploadImage())
    try {
        const response = await serviceRest.postUploadImage(params)
        // console.log(response)
        if(response.status === 200) {
            if(type) {
                type === 'font' ? dispatch(setRequestUploadFontImageSuccess(response.data))
                                : dispatch(setRequestUploadBackImageSuccess(response.data))
            } else {
                dispatch(setRequestUploadImageSuccess(response.data))
            }
        } else {
            dispatch(setRequestUploadImageError(response.problem))
        }
    } catch(error) {
        dispatch(setRequestUploadImageError(error))
        return false
    }
}