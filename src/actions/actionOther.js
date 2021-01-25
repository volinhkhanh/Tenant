import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest'
//
export const GET_ANNOUCEMENT = 'GET_ANNOUCEMENT'
export const GET_ANNOUCEMENT_SUCCESS = 'GET_ANNOUCEMENT_SUCCESS'
export const GET_ANNOUCEMENT_ERROR = 'GET_ANNOUCEMENT_ERROR';
export const READ_ANNOUCEMENT = 'READ_ANNOUCEMENT';
export const READ_ALL_ANNOUCEMENT = 'READ_ALL_ANNOUCEMENT';
export const LIST_SETTING = 'LIST_SETTING';
export const DELETE_ONE_ANNOUCEMENT = "DELETE_ONE_ANNOUCEMENT" ;
export const getAnnoucement = () => ({type: GET_ANNOUCEMENT})
export const getAnnoucementSuccess = data => ({type: GET_ANNOUCEMENT_SUCCESS, data})
export const getAnnoucementError = data => ({type: GET_ANNOUCEMENT_ERROR, data});
//read all item
export const readAnnoucementAll = () => ({type: READ_ALL_ANNOUCEMENT});
// read 1 item
export const readAnnoucement = (id) => ({type: READ_ANNOUCEMENT,id})
export const readingAnnoucement = (id) => async (dispatch) => {
    dispatch(readAnnoucement(id))
}
// delete 1 annoucement 
export const deleteOneAnnoucement = (id) => ({type: DELETE_ONE_ANNOUCEMENT,id})
// LIST setting
export const saveListSetting = (data) => ({type: LIST_SETTING, data})
export const getListSetting = (data) => async (dispatch) => {
    dispatch(saveListSetting(data))
}
export const getListAnnoucement = () => async (dispatch) => {
    dispatch(getAnnoucement());
    try {
        const response = await serviceRest.getListAnnoucement()
        if(response.status === 200) {
            dispatch(getAnnoucementSuccess(response?.data?.items))
        } else {
            
            dispatch(getAnnoucementError(response.data.message))
            // Toast.show(response.data.message);
        }
    } catch(error) {
        dispatch(getAnnoucementError(error))
        return false
    }
}
