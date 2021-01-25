import Toast from 'react-native-simple-toast';
//
import * as serviceRest from '../services/serviceRest';
//
export const SET_REQUEST_VISITOR_REASON = 'SET_REQUEST_VISITOR_REASON';
export const SET_REQUEST_VISITOR_REASON_SUCCESS =
  'SET_REQUEST_VISITOR_REASON_SUCCESS';
export const SET_REQUEST_VISITORS_REASON_ERROR =
  'SET_REQUEST_VISITOR_REASON_ERROR';
//
export const SET_REQUEST_VISITORS = 'SET_REQUEST_VISITORS';
export const SET_REQUEST_VISITORS_SUCCESS = 'SET_REQUEST_VISITORS_SUCCESS';
export const SET_REQUEST_VISITORS_ERROR = 'SET_REQUEST_VISITORS_ERROR';
//
export const SET_REQUEST_VISITOR = 'SET_REQUEST_VISITOR';
export const SET_REQUEST_VISITOR_SUCCESS = 'SET_REQUEST_VISITOR_SUCCESS';
export const SET_REQUEST_VISITOR_ERROR = 'SET_REQUEST_VISITOR_ERROR';
//
export const SET_REQUEST_CREATE_VISITOR = 'SET_REQUEST_CREATE_VISITOR';
export const SET_REQUEST_CREATE_VISITOR_SUCCESS =
  'SET_REQUEST_CREATE_VISITOR_SUCCESS';
export const SET_REQUEST_CREATE_VISITOR_ERROR =
  'SET_REQUEST_CREATE_VISITOR_ERROR';
//
export const SET_REQUEST_EDIT_VISITOR = 'SET_REQUEST_EDIT_VISITOR';
export const SET_REQUEST_EDIT_VISITOR_SUCCESS =
  'SET_REQUEST_EDIT_VISITOR_SUCCESS';
export const SET_REQUEST_EDIT_VISITOR_ERROR = 'SET_REQUEST_EDIT_VISITOR_ERROR';
//
export const SET_REQUEST_DELETE_VISITOR = 'SET_REQUEST_DELETE_VISITOR';
export const SET_REQUEST_DELETE_VISITOR_SUCCESS =
  'SET_REQUEST_DELETE_VISITOR_SUCCESS';
export const SET_REQUEST_DELETE_VISITOR_ERROR =
  'SET_REQUEST_DELETE_VISITOR_ERROR';
//
//
export const setRequestVisitorReason = () => ({
  type: SET_REQUEST_VISITOR_REASON,
});
export const setRequestVisitorReasonSuccess = data => ({
  type: SET_REQUEST_VISITOR_REASON_SUCCESS,
  data,
});
export const setRequestVisitorReasonError = data => ({
  type: SET_REQUEST_VISITOR_REASON_ERROR,
  data,
});
export const setRequestVisitors = () => ({type: SET_REQUEST_VISITORS});
export const setRequestVisitorsSuccess = data => ({
  type: SET_REQUEST_VISITORS_SUCCESS,
  data,
});
export const setRequestVisitorsError = data => ({
  type: SET_REQUEST_VISITORS_ERROR,
  data,
});
//
export const setRequestVisitor = () => ({type: SET_REQUEST_VISITOR});
export const setRequestVisitorSuccess = data => ({
  type: SET_REQUEST_VISITOR_SUCCESS,
  data,
});
export const setRequestVisitorError = data => ({
  type: SET_REQUEST_VISITOR_ERROR,
  data,
});
//
export const setRequestCreateVisitor = () => ({
  type: SET_REQUEST_CREATE_VISITOR,
});
export const setRequestCreateVisitorSuccess = data => ({
  type: SET_REQUEST_CREATE_VISITOR_SUCCESS,
  data,
});
export const setRequestCreateVisitorError = data => ({
  type: SET_REQUEST_CREATE_VISITOR_ERROR,
  data,
});
//
export const setRequestEditVisitor = () => ({
  type: SET_REQUEST_EDIT_VISITOR,
});
export const setRequestEditVisitorSuccess = data => ({
  type: SET_REQUEST_EDIT_VISITOR_SUCCESS,
  data,
});
export const setRequestEditVisitorError = data => ({
  type: SET_REQUEST_EDIT_VISITOR_ERROR,
  data,
});
//
export const setRequestDeleteVisitor = () => ({
  type: SET_REQUEST_DELETE_VISITOR,
});
export const setRequestDeleteVisitorSuccess = data => ({
  type: SET_REQUEST_DELETE_VISITOR_SUCCESS,
  data,
});
export const setRequestDeleteVisitorError = data => ({
  type: SET_REQUEST_DELETE_VISITOR_ERROR,
  data,
});
//
export const getVisitorReason = () => async dispatch => {
  dispatch(setRequestVisitorReason());
  try {
    const response = await serviceRest.getVisitorReason();
    if (response.status === 200) {
      dispatch(setRequestVisitorReasonSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestVisitorReasonError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestVisitorReasonError(error));
    return false;
  }
};
//
export const getVisitors = params => async dispatch => {
  dispatch(setRequestVisitors());
  try {
    const response = await serviceRest.getVisitors(params);
    if (response.status === 200) {
      dispatch(setRequestVisitorsSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestVisitorsError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestVisitorsError(error));
    return false;
  }
};
//
export const getVisitor = uuid => async dispatch => {
  dispatch(setRequestVisitors());
  try {
    const response = await serviceRest.getVisitor(uuid);
    // console.log(response)
    if (response.status === 200) {
      dispatch(setRequestVisitorSuccess(response.data));
      return true;
    } else {
      dispatch(setRequestVisitorError(response.problem));
      return false;
    }
  } catch (error) {
    dispatch(setRequestVisitorError(error));
    return false;
  }
};
//
export const postVisitor = params => async dispatch => {
  dispatch(setRequestCreateVisitor());
  try {
    const response = await serviceRest.createVisitor(params);
    // console.log(response)
    if (response.status === 201) {
      dispatch(setRequestCreateVisitorSuccess(response.data));
      // Toast.show('Create visitor successful');
      return true;
    } else {
      dispatch(setRequestCreateVisitorError(response.problem));
      if(response.data?.message) {
        Toast.show(response.data.message);
      }
      return false;
    }
  } catch (error) {
    dispatch(setRequestCreateVisitorError(error));
    return false;
  }
};
//
export const editVisitor = params => async dispatch => {
  dispatch(setRequestEditVisitor());
  try {
    const response = await serviceRest.updateVisitor(params);
    if (response.status === 200) {
      dispatch(setRequestEditVisitorSuccess(response.data));
      Toast.show('Edit Visitor successful');
      return true;
    } else {
      dispatch(setRequestEditVisitorError(response.problem));
      Toast.show(response.problem);
      return false;
    }
  } catch (error) {
    dispatch(setRequestEditVisitorError(error));
    return false;
  }
};

export const deleteVisitor = (id) => async dispatch => {
  dispatch(setRequestDeleteVisitor());
  try {
    const response = await serviceRest.deleteVisitor(id);
    // console.log(response)
    if (response.status === 204) {
      dispatch(setRequestDeleteVisitorSuccess(response.data));
      // Toast.show('Delete Visitor successful');
      return true;
    } else {
      dispatch(setRequestDeleteVisitorError(response.problem));
      Toast.show(response.problem);
      return false;
    }
  } catch (error) {
    dispatch(setRequestDeleteVisitorError(error));
    return false;
  }
};
