import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest'
//
export const GET_FACILITY_CATEGORIES = 'GET_FACILITY_CATEGORIES'
export const GET_FACILITY_CATEGORIES_SUCCESS = 'GET_FACILITY_CATEGORIES_SUCCESS'
export const GET_FACILITY_CATEGORIES_ERROR = 'GET_FACILITY_CATEGORIES_ERROR';
// get list facility
export const setFacilityCategories = () => ({type: GET_FACILITY_CATEGORIES})
export const setFacilityCategoriesSuccess = data => ({type: GET_FACILITY_CATEGORIES_SUCCESS, data})
export const setFacilityCategoriesError = data => ({type: GET_FACILITY_CATEGORIES_ERROR, data});

export const getFacilityCategories = () => async (dispatch) => {
    dispatch(setFacilityCategories());
    try {
        const response = await serviceRest.getFacilityCategories();
        if(response.status === 200) {
            dispatch(setFacilityCategoriesSuccess(response?.data))
        } else {
            dispatch(setFacilityCategoriesError("Some thing went wrongs"))
            Toast.show(response.message);
        }
    } catch(error) {
        dispatch(setFacilityCategoriesError(error))
        return false
    }
}
//get list recent booking
export const GET_RECENT_BOOKING = 'GET_RECENT_BOOKING'
export const GET_RECENT_BOOKING_SUCCESS = 'GET_RECENT_BOOKING_SUCCESS'
export const GET_RECENT_BOOKING_ERROR = 'GET_RECENT_BOOKING_ERROR';
// 
export const setRecentBooking = () => ({type: GET_RECENT_BOOKING})
export const setRecentBookingSuccess = data => ({type: GET_RECENT_BOOKING_SUCCESS, data})
export const setRecentBookingError = data => ({type: GET_RECENT_BOOKING_ERROR, data});

export const SET_RECENT_BOOKING_DETAIL_DATA = 'SET_RECENT_BOOKING_DETAIL_DATA'
export const GET_RECENT_BOOKING_DETAIL = 'GET_RECENT_BOOKING_DETAIL'
export const GET_RECENT_BOOKING_DETAIL_SUCCESS = 'GET_RECENT_BOOKING_DETAIL_SUCCESS'
export const GET_RECENT_BOOKING_DETAIL_ERROR = 'GET_RECENT_BOOKING_DETAIL_ERROR';

export const setRecentBookingDetailData = () => ({type: SET_RECENT_BOOKING_DETAIL_DATA})
export const setRecentBookingDetail = () => ({type: GET_RECENT_BOOKING_DETAIL})
export const setRecentBookingDetailSuccess = data => ({type: GET_RECENT_BOOKING_DETAIL_SUCCESS, data})
export const setRecentBookingDetailError = data => ({type: GET_RECENT_BOOKING_DETAIL_ERROR, data});

export const GET_FACILITY_POLICY = 'GET_FACILITY_POLICY'
export const GET_FACILITY_POLICY_SUCCESS = 'GET_FACILITY_POLICY_SUCCESS'
export const GET_FACILITY_POLICY_ERROR = 'GET_FACILITY_POLICY_ERROR';

export const setFacilityPolicy = () => ({type: GET_FACILITY_POLICY})
export const setFacilityPolicySuccess = data => ({type: GET_FACILITY_POLICY_SUCCESS, data})
export const setFacilityPolicyError = data => ({type: GET_FACILITY_POLICY_ERROR, data});

export const getRecentBooking = () => async (dispatch) => {
    dispatch(setRecentBooking());
    try {
        const response = await serviceRest.getRecentBooking();
        if(response.status === 200) {
            dispatch(setRecentBookingSuccess(response?.data))
        } else {
            if(response?.data?.error[0]?.message) {
                Toast.show(response?.data?.error[0]?.message)
            } else {
            }
            dispatch(setRecentBookingError("Some thing went wrongs"))
        }
    } catch(error) {
        dispatch(setRecentBookingError(error))
        return false
    }
}
//
export const getRecentBookingDetail = (uuid) => async (dispatch) => {
    dispatch(setRecentBookingDetail());
    try {
        const response = await serviceRest.getRecentBookingDetail(uuid);
        // console.log(response)
        if(response.status === 200) {
            dispatch(setRecentBookingDetailSuccess(response?.data))
        } else {
            if(response?.data?.error[0]?.message) {
                Toast.show(response?.data?.error[0]?.message)
            } else {
                Toast.show('Something went wrong')
            }
            dispatch(setRecentBookingDetailError("Some thing went wrongs"))
        }
    } catch(error) {
        dispatch(setRecentBookingDetailError(error))
        return false
    }
}

export const getFacilityPolicy = (uuid) => async (dispatch) => {
    dispatch(setFacilityPolicy());
    try {
        const response = await serviceRest.getFacilityPolicy(uuid);
        console.log(response)
        if(response.status === 200) {
            dispatch(setFacilityPolicySuccess(response?.data))
        } else {
            if(response?.data?.error[0]?.message) {
                Toast.show(response?.data?.error[0]?.message)
            } else {
                Toast.show('Something went wrong')
            }
            dispatch(setFacilityPolicyError("Some thing went wrongs"))
        }
    } catch(error) {
        dispatch(setFacilityPolicyError(error))
        return false
    }
}
