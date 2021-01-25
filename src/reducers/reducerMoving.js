import * as types from '../actions/actionMoving'

const initialState = {
    //----------------------------------------------------
    getMovingListProgress: false,
    getMovingDetailProgress: false,
    getCreateMoveOutProgress: false,
    getCreateFurnitureMovingProgress: false,
    getUploadMovingImageProgress: false,
    getMovingVehicleProgress: false,
    getMovingScheduleProgress: false,
    //----------------------------------------------------
    getMovingListData: null,
    getMovingDetailData: null,
    getCreateMoveOutData: null,
    getCreateFurnitureMovingData: null,
    getUploadMovingImageData: null,
    movingScheduleData: null,
    movingElevatorData: null,
    movingParkingData: null,
    //----------------------------------------------------
}
//
const reducerMoving = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_MOVING_LIST_DATA: {
            return {
                ...state,
                getMovingListData: action.data,
            }
        }
        case types.SET_REQUEST_MOVING_LIST: {
            return {
                ...state,
                getMovingListProgress: true,
            }
        }
        case types.SET_REQUEST_MOVING_LIST_SUCCESS: {
            return {
                ...state,
                getMovingListProgress: false,
                getMovingListData: action.data,
            }
        }
        case types.SET_REQUEST_MOVING_LIST_ERROR: {
            return {
                ...state,
                getMovingListProgress: false,
            }
        }
        //
        case types.SET_MOVING_DETAIL_DATA: {
            return {
                ...state,
                getMovingDetailData: action.data,
            }
        }
        case types.SET_REQUEST_MOVING_DETAIL: {
            return {
                ...state,
                getMovingDetailProgress: true,
            }
        }
        case types.SET_REQUEST_MOVING_DETAIL_SUCCESS: {
            return {
                ...state,
                getMovingDetailProgress: false,
                getMovingDetailData: action.data,
            }
        }
        case types.SET_REQUEST_MOVING_DETAIL_ERROR: {
            return {
                ...state,
                getMovingDetailProgress: false,
            }
        }
        //
        case types.SET_REQUEST_CREATE_MOVE_OUT: {
            return {
                ...state,
                getCreateMoveOutProgress: true,
            }
        }
        case types.SET_REQUEST_CREATE_MOVE_OUT_SUCCESS: {
            return {
                ...state,
                getCreateMoveOutProgress: false,
                getCreateMoveOutData: action.data,
            }
        }
        case types.SET_REQUEST_CREATE_MOVE_OUT_ERROR: {
            return {
                ...state,
                getCreateMoveOutProgress: false,
            }
        }
        //
        case types.SET_REQUEST_CREATE_FURNITURE_MOVING: {
            return {
                ...state,
                getCreateFurnitureMovingProgress: true,
            }
        }
        case types.SET_REQUEST_CREATE_FURNITURE_MOVING_SUCCESS: {
            return {
                ...state,
                getCreateFurnitureMovingProgress: false,
                getCreateFurnitureMovingData: action.data,
            }
        }
        case types.SET_REQUEST_CREATE_FURNITURE_MOVING_ERROR: {
            return {
                ...state,
                getCreateFurnitureMovingProgress: false,
            }
        }
        //
        case types.SET_UPLOAD_MOVING_IMAGE_DATA: {
            return {
                ...state,
                getUploadMovingImageData: action.data,
            }
        }
        case types.SET_REQUEST_UPLOAD_MOVING_IMAGE: {
            return {
                ...state,
                getUploadMovingImageProgress: true,
            }
        }
        case types.SET_REQUEST_UPLOAD_MOVING_IMAGE_SUCCESS: {
            return {
                ...state,
                getUploadMovingImageProgress: false,
                getUploadMovingImageData: action.data,
            }
        }
        case types.SET_REQUEST_UPLOAD_MOVING_IMAGE_ERROR: {
            return {
                ...state,
                getUploadMovingImageProgress: false,
            }
        }
        //
        case types.SET_REQUEST_MOVING_VEHICLE: {
            return {
                ...state,
                getMovingVehicleProgress: true,
            }
        }
        case types.SET_REQUEST_MOVING_VEHICLE_SUCCESS: {
            return {
                ...state,
                getMovingVehicleProgress: false,
                movingVehicleData: action.data,
            }
        }
        case types.SET_REQUEST_MOVING_VEHICLE_ERROR: {
            return {
                ...state,
                getMovingVehicleProgress: false,
            }
        }
        //
        case types.SET_REQUEST_ELEVATOR_SCHEDULE: {
            return {
                ...state,
                movingElevatorData: action.data,
            }
        }
        case types.SET_REQUEST_PARKING_SCHEDULE: {
            return {
                ...state,
                movingParkingData: action.data,
            }
        }
        case types.SET_REQUEST_MOVING_SCHEDULE: {
            return {
                ...state,
                getMovingScheduleProgress: true,
            }
        }
        case types.SET_REQUEST_MOVING_SCHEDULE_SUCCESS: {
            return {
                ...state,
                getMovingScheduleProgress: false,
                movingScheduleData: action.data,
            }
        }
        case types.SET_REQUEST_MOVING_SCHEDULE_ERROR: {
            return {
                ...state,
                getMovingScheduleProgress: false,
            }
        }
        default: 
            return state
    }
}

export default reducerMoving