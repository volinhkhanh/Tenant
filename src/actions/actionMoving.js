import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest'
//---------------------------------------------------------------------------------------------------------------------
export const SET_MOVING_LIST_DATA = 'SET_MOVING_LIST_DATA'
export const SET_REQUEST_MOVING_LIST = 'SET_REQUEST_MOVING_LIST'
export const SET_REQUEST_MOVING_LIST_SUCCESS = 'SET_REQUEST_MOVING_LIST_SUCCESS'
export const SET_REQUEST_MOVING_LIST_ERROR = 'SET_REQUEST_MOVING_LIST_ERROR'
//
export const SET_MOVING_DETAIL_DATA = 'SET_MOVING_DETAIL_DATA'
export const SET_REQUEST_MOVING_DETAIL = 'SET_REQUEST_MOVING_DETAIL'
export const SET_REQUEST_MOVING_DETAIL_SUCCESS = 'SET_REQUEST_MOVING_DETAIL_SUCCESS'
export const SET_REQUEST_MOVING_DETAIL_ERROR = 'SET_REQUEST_MOVING_DETAIL_ERROR'
//
export const SET_REQUEST_CREATE_MOVE_OUT = 'SET_REQUEST_CREATE_MOVE_OUT'
export const SET_REQUEST_CREATE_MOVE_OUT_SUCCESS = 'SET_REQUEST_CREATE_MOVE_OUT_SUCCESS'
export const SET_REQUEST_CREATE_MOVE_OUT_ERROR = 'SET_REQUEST_CREATE_MOVE_OUT_ERROR'
//
export const SET_REQUEST_CREATE_FURNITURE_MOVING = 'SET_REQUEST_CREATE_FURNITURE_MOVING'
export const SET_REQUEST_CREATE_FURNITURE_MOVING_SUCCESS = 'SET_REQUEST_CREATE_FURNITURE_MOVING_SUCCESS'
export const SET_REQUEST_CREATE_FURNITURE_MOVING_ERROR = 'SET_REQUEST_CREATE_FURNITURE_MOVING_ERROR'
//
export const SET_REQUEST_UPDATE_MOVING = 'SET_REQUEST_UPDATE_MOVING'
export const SET_REQUEST_UPDATE_MOVING_SUCCESS = 'SET_REQUEST_UPDATE_MOVING_SUCCESS'
export const SET_REQUEST_UPDATE_MOVING_ERROR = 'SET_REQUEST_UPDATE_MOVING_ERROR'
//
export const SET_UPLOAD_MOVING_IMAGE_DATA = 'SET_UPLOAD_MOVING_IMAGE_DATA'
export const SET_REQUEST_UPLOAD_MOVING_IMAGE = 'SET_REQUEST_UPLOAD_MOVING_IMAGE'
export const SET_REQUEST_UPLOAD_MOVING_IMAGE_SUCCESS = 'SET_REQUEST_UPLOAD_MOVING_IMAGE_SUCCESS'
export const SET_REQUEST_UPLOAD_MOVING_IMAGE_ERROR = 'SET_REQUEST_UPLOAD_MOVING_IMAGE_ERROR'
//
export const SET_REQUEST_MOVING_VEHICLE = 'SET_REQUEST_MOVING_VEHICLE'
export const SET_REQUEST_MOVING_VEHICLE_SUCCESS = 'SET_REQUEST_MOVING_VEHICLE_SUCCESS'
export const SET_REQUEST_MOVING_VEHICLE_ERROR = 'SET_REQUEST_MOVING_VEHICLE_ERROR'
//
export const SET_REQUEST_ELEVATOR_SCHEDULE = 'SET_REQUEST_ELEVATOR_SCHEDULE'
export const SET_REQUEST_PARKING_SCHEDULE = 'SET_REQUEST_PARKING_SCHEDULE'
export const SET_REQUEST_MOVING_SCHEDULE = 'SET_REQUEST_MOVING_SCHEDULE'
export const SET_REQUEST_MOVING_SCHEDULE_SUCCESS = 'SET_REQUEST_MOVING_SCHEDULE_SUCCESS'
export const SET_REQUEST_MOVING_SCHEDULE_ERROR = 'SET_REQUEST_MOVING_SCHEDULE_ERROR'
//---------------------------------------------------------------------------------------------------------------------
export const setMovingListData = () => ({type: SET_MOVING_LIST_DATA})
export const setRequestMovingList = () => ({type: SET_REQUEST_MOVING_LIST})
export const setRequestMovingListSuccess = data => ({type: SET_REQUEST_MOVING_LIST_SUCCESS, data})
export const setRequestMovingListError = data => ({type: SET_REQUEST_MOVING_LIST_ERROR, data})
//
export const setMovingDetailData = () => ({type: SET_MOVING_DETAIL_DATA})
export const setRequestMovingDetail = () => ({type: SET_REQUEST_MOVING_DETAIL})
export const setRequestMovingDetailSuccess = data => ({type: SET_REQUEST_MOVING_DETAIL_SUCCESS, data})
export const setRequestMovingDetailError = data => ({type: SET_REQUEST_MOVING_DETAIL_ERROR, data})
//
export const setRequestCreateMoveOut = () => ({type: SET_REQUEST_CREATE_MOVE_OUT})
export const setRequestCreateMoveOutSuccess = data => ({type: SET_REQUEST_CREATE_MOVE_OUT_SUCCESS, data})
export const setRequestCreateMoveOutError = data => ({type: SET_REQUEST_CREATE_MOVE_OUT_ERROR, data})
//
export const setRequestCreateFurnitureMoving = () => ({type: SET_REQUEST_CREATE_FURNITURE_MOVING})
export const setRequestCreateFurnitureMovingSuccess = data => ({type: SET_REQUEST_CREATE_FURNITURE_MOVING_SUCCESS, data})
export const setRequestCreateFurnitureMovingError = data => ({type: SET_REQUEST_CREATE_FURNITURE_MOVING_ERROR, data})
//
export const setRequestUpdateMoving = () => ({type: SET_REQUEST_UPDATE_MOVING})
export const setRequestUpdateMovingSuccess = data => ({type: SET_REQUEST_UPDATE_MOVING_SUCCESS, data})
export const setRequestUpdateMovingError = data => ({type: SET_REQUEST_UPDATE_MOVING_ERROR, data})
//
export const setUploadMovingImageData = data => ({type: SET_UPLOAD_MOVING_IMAGE_DATA, data})
export const setRequestUploadMovingImage = () => ({type: SET_REQUEST_UPLOAD_MOVING_IMAGE})
export const setRequestUploadMovingImageSuccess = data => ({type: SET_REQUEST_UPLOAD_MOVING_IMAGE_SUCCESS, data})
export const setRequestUploadMovingImageError = data => ({type: SET_REQUEST_UPLOAD_MOVING_IMAGE_ERROR, data})
//
export const setRequestMovingVehicle = () => ({type: SET_REQUEST_MOVING_VEHICLE})
export const setRequestMovingVehicleSuccess = data => ({type: SET_REQUEST_MOVING_VEHICLE_SUCCESS, data})
export const setRequestMovingVehicleError = data => ({type: SET_REQUEST_MOVING_VEHICLE_ERROR, data})
//
export const setElevatorScheduleData = data => ({type: SET_REQUEST_ELEVATOR_SCHEDULE, data})
export const setParkingScheduleData = data => ({type: SET_REQUEST_PARKING_SCHEDULE, data})
export const setRequestMovingSchedule = () => ({type: SET_REQUEST_MOVING_SCHEDULE})
export const setRequestMovingScheduleSuccess = data => ({type: SET_REQUEST_MOVING_SCHEDULE_SUCCESS, data})
export const setRequestMovingScheduleError = data => ({type: SET_REQUEST_MOVING_SCHEDULE_ERROR, data})
//---------------------------------------------------------------------------------------------------------------------
export const getMovingList = (params) => async (dispatch) => {
    dispatch(setRequestMovingList())
    try {
        const response = await serviceRest.getMovingList(params)
        if(response.status === 200) {
            dispatch(setRequestMovingListSuccess(response.data))
        } else {
            dispatch(setRequestMovingListError(response.problem))
        }
    } catch(error) {
        dispatch(setRequestMovingListError(error))
        return false
    }
}
//
export const getMovingDetail = (params) => async (dispatch) => {
    dispatch(setRequestMovingDetail())
    try {
        const response = await serviceRest.getMovingDetail(params)
        if(response.status === 200) {
            dispatch(setRequestMovingDetailSuccess(response.data))
        } else {
            dispatch(setRequestMovingDetailError(response.problem))
        }
    } catch(error) {
        dispatch(setRequestMovingDetailError(error))
        return false
    }
}
//
export const postCreateMoveOut = (params) => async (dispatch) => {
    dispatch(setRequestCreateMoveOut())
    try {
        const response = await serviceRest.postCreateMoveOut(params)
        if(response.status === 201) {
            dispatch(setRequestCreateMoveOutSuccess(response.data))
            return true
        } else {
            dispatch(setRequestCreateMoveOutError(response.problem))
            if(response?.data?.error[0]?.message) {
                Toast.show(response?.data?.error[0]?.message)
            } else {
                Toast.show('Something went wrong')
            }
            return false
        }
    } catch(error) {
        dispatch(setRequestCreateMoveOutError(error))
        return false
    }
}
//
export const postCreateFurnitureMoving = (params) => async (dispatch) => {
    dispatch(setRequestCreateFurnitureMoving())
    try {
        const response = await serviceRest.postCreateFurnitureMoving(params)
        // console.log(response)
        if(response.status === 201) {
            dispatch(setRequestCreateFurnitureMovingSuccess(response.data))
            return true
        } else {
            dispatch(setRequestCreateFurnitureMovingError(response.problem))
            if(response?.data?.error[0]?.message) {
                Toast.show(response?.data?.error[0]?.message)
            } else {
                Toast.show('Something went wrong')
            }
            return false
        }
    } catch(error) {
        dispatch(setRequestCreateFurnitureMovingError(error))
        return false
    }
}
//
export const putUpdateMovingRequest = (uuid, params) => async (dispatch) => {
    dispatch(setRequestUpdateMoving())
    try {
        const response = await serviceRest.putUpdateMovingRequest(uuid, params)
        console.log(response)
        if(response.status === 200) {
            dispatch(setRequestUpdateMovingSuccess(response.data))
            return true
        } else {
            dispatch(setRequestUpdateMovingError(response.problem))
            if(response?.data?.error[0]?.message) {
                Toast.show(response?.data?.error[0]?.message)
            } else {
                Toast.show('Something went wrong')
            }
            return false
        }
    } catch(error) {
        dispatch(setRequestUpdateMovingError(error))
        return false
    }
}
//
export const postUploadMovingImage = (params) => async (dispatch) => {
    dispatch(setRequestUploadMovingImage())
    try {
        const response = await serviceRest.postUploadImage(params)
        if(response.status === 200) {
            dispatch(setRequestUploadMovingImageSuccess(response.data))
        } else {
            dispatch(setRequestUploadMovingImageError(response.problem))
        }
    } catch(error) {
        dispatch(setRequestUploadMovingImageError(error))
        return false
    }
}
//
export const getMovingVehicle = (params) => async (dispatch) => {
    dispatch(setRequestMovingVehicle())
    try {
        const response = await serviceRest.getMovingVehicle(params)
        if(response.status === 200) {
            dispatch(setRequestMovingVehicleSuccess(response.data))
        } else {
            dispatch(setRequestMovingVehicleError(response.problem))
        }
    } catch(error) {
        dispatch(setRequestMovingVehicleError(error))
        return false
    }
}
//
export const getMovingSchedule = (params) => async (dispatch) => {
    dispatch(setRequestMovingSchedule())
    try {
        const response = await serviceRest.getMovingSchedule(params)
        if(response.status === 200) {
            dispatch(setRequestMovingScheduleSuccess(response.data))
        } else {
            dispatch(setRequestMovingScheduleError(response.problem))
        }
    } catch(error) {
        dispatch(setRequestMovingScheduleError(error))
        return false
    }
}