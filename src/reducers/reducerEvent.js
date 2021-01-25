import * as types from '../actions/actionEvent';

const initialState = {
  getEventsProgress: false,
  getEventsData: null,
  getEventProgress: false,
  getEventData: null,
};
//
const reducerEvent = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_REQUEST_EVENTS: {
      return {
        ...state,
        getEventsProgress: true,
      };
    }
    case types.SET_REQUEST_EVENTS_SUCCESS: {
      return {
        ...state,
        getEventsProgress: false,
        getEventsData: action.data,
      };
    }
    case types.SET_REQUEST_EVENTS_ERROR: {
      return {
        ...state,
        getEventsProgress: false,
      };
    }
    case types.SET_REQUEST_EVENT: {
      return {
        ...state,
        getEventProgress: true,
      };
    }
    case types.SET_REQUEST_EVENT_SUCCESS: {
      return {
        ...state,
        getEventProgress: false,
        getEventData: action.data,
      };
    }
    case types.SET_REQUEST_EVENT_ERROR: {
      return {
        ...state,
        getEventProgress: false,
      };
    }
    default:
      return state;
  }
};

export default reducerEvent;
