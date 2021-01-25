import * as types from '../actions/actionFacility';
import _ from 'lodash';
const initialState = {
  loading: false,
  dataFacilityCategories: [],
  dataRecentBooking: [],
  dataRecentBookingDetail: [],
  dataFacilityPolicy: [],
  message: '',
};
//
const reducerFacility = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FACILITY_CATEGORIES:
      return {...state, loading: true};
    case types.GET_FACILITY_CATEGORIES_SUCCESS:
      return {...state, loading: false, dataFacilityCategories: action.data};
    case types.GET_FACILITY_CATEGORIES_ERROR:
      return {...state, loading: false, message: action.data};
    case types.GET_RECENT_BOOKING:
      return {...state, loading: true};
    case types.GET_RECENT_BOOKING_SUCCESS:
      return {...state, loading: false, dataRecentBooking: action.data};
    case types.GET_RECENT_BOOKING_ERROR:
      return {...state, loading: false, message: action.data};
      case types.SET_RECENT_BOOKING_DETAIL_DATA:
      return {...state, loading: false, dataRecentBookingDetail: action.data};
    case types.GET_RECENT_BOOKING_DETAIL:
      return {...state, loading: true};
    case types.GET_RECENT_BOOKING_DETAIL_SUCCESS:
      return {...state, loading: false, dataRecentBookingDetail: action.data};
    case types.GET_RECENT_BOOKING_DETAIL_ERROR:
      return {...state, loading: false, message: action.data};
    case types.GET_FACILITY_POLICY:
      return {...state, loading: true};
    case types.GET_FACILITY_POLICY_SUCCESS:
      return {...state, loading: false, dataFacilityPolicy: action.data};
    case types.GET_FACILITY_POLICY_ERROR:
      return {...state, loading: false, message: action.data};
    default:
      return state;
  }
};

export default reducerFacility;
