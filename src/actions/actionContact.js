import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest'
//
export const SET_REQUEST_CONTACT = 'SET_REQUEST_CONTACT'
export const SET_REQUEST_CONTACT_SUCCESS = 'SET_REQUEST_CONTACT_SUCCESS'
export const SET_REQUEST_CONTACT_ERROR = 'SET_REQUEST_CONTACT_ERROR'
//
export const setRequestContact = () => ({type: SET_REQUEST_CONTACT})
export const setRequestContactSuccess = data => ({type: SET_REQUEST_CONTACT_SUCCESS, data})
export const setRequestContactError = data => ({type: SET_REQUEST_CONTACT_ERROR, data})
//
export const getContact = () => async (dispatch) => {
    dispatch(setRequestContact())
    try {
        const response = await serviceRest.getContact()
        if(response.status === 200) {
            dispatch(setRequestContactSuccess(response.data))
        } else {
            dispatch(setRequestContactError(response.problem))
        }
    } catch(error) {
        dispatch(setRequestContactError(error))
        return false
    }
}