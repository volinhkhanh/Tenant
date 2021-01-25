import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest';
//
export const SET_REQUEST_EVENTS = 'SET_REQUEST_EVENTS';
export const SET_REQUEST_EVENTS_SUCCESS = 'SET_REQUEST_EVENTS_SUCCESS';
export const SET_REQUEST_EVENTS_ERROR = 'SET_REQUEST_EVENTS_ERROR';
//
export const SET_REQUEST_EVENT = 'SET_REQUEST_EVENT';
export const SET_REQUEST_EVENT_SUCCESS = 'SET_REQUEST_EVENT_SUCCESS';
export const SET_REQUEST_EVENT_ERROR = 'SET_REQUEST_EVENT_ERROR';
//
export const setRequestEvents = () => ({type: SET_REQUEST_EVENTS});
export const setRequestEventsSuccess = data => ({
  type: SET_REQUEST_EVENTS_SUCCESS,
  data,
});
export const setRequestEventsError = data => ({
  type: SET_REQUEST_EVENTS_ERROR,
  data,
});
//
export const setRequestEvent = () => ({type: SET_REQUEST_EVENT});
export const setRequestEventSuccess = data => ({
  type: SET_REQUEST_EVENT_SUCCESS,
  data,
});
export const setRequestEventError = data => ({
  type: SET_REQUEST_EVENT_ERROR,
  data,
});
//
export const getEvents = () => async dispatch => {
  dispatch(setRequestEvents());
  try {
    const response = await serviceRest.getEvents();
    if (response.status === 200) {
      dispatch(setRequestEventsSuccess(response.data));
    } else {
      dispatch(setRequestEventsError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestEventsError(error));
    return false;
  }
};
//
export const getEvent = (id) => async dispatch => {
  dispatch(setRequestEvent());
  try {
    const response = await serviceRest.getEvent(id);
    if (response.status === 200) {
      dispatch(setRequestEventSuccess(response.data));
    } else {
      dispatch(setRequestEventError(response.problem));
    }
  } catch (error) {
    dispatch(setRequestEventError(error));
    return false;
  }
};
