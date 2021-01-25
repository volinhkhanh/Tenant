import * as types from '../actions/actionOther';
import _ from "lodash"
const initialState = {
  listAnnoucemnent: [],
  loading: false,
  totalReadAnnoucement: 0,
  listDataSetting: [],
};
const getStatusSetting = data => {
  let objNew = {};
  data.map(value => {
    switch (value?.id) {
      case '1':
        let bill = {'bill': {
          notification: value?.notification ? 1 : 0,
          email: value?.email ? 1 : 0,
        }};
        objNew = Object.assign(objNew, bill);
        break;
      case '2':
        let booking = {'booking': {
          notification: value?.notification ? 1 : 0,
          email: value?.email ? 1 : 0,
        }};
        objNew = Object.assign(objNew, booking);
        break;
      case '3':
        let ticket = {'ticket': {
          notification: value?.notification ? 1 : 0,
          email: value?.email ? 1 : 0,
        }};
        objNew = Object.assign(objNew, ticket);
        break;
      case '4':
        let moving = {'moving_request': {
          notification: value?.notification ? 1 : 0,
          email: value?.email ? 1 : 0,
        }};
        objNew = Object.assign(objNew, moving);
        break;
      case '5':
        let event = {'event': {
          notification: value?.notification ? 1 : 0,
          email: value?.email ? 1 : 0,
        }};
        objNew = Object.assign(objNew, event);
        break;
      case '6':
        let announcement = {'announcement': {
          notification: value?.notification ? 1 : 0,
          email: value?.email ? 1 : 0,
        }};
        objNew = Object.assign(objNew, announcement);
        break;

      default:
        break;
    }
  });
  return objNew;
};
//
const reducerOther = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ANNOUCEMENT: {
      return {...state, loading: true};
    }
    case types.GET_ANNOUCEMENT_SUCCESS: {
     
      let totalRead = 0;
      action.data.map((value, index) => {
        if (!value.is_read) {
          totalRead += 1;
        }
        return totalRead;
      });
      return {
        ...state,
        loading: false,
        listAnnoucemnent: action.data,
        totalReadAnnoucement: totalRead,
      };
    }
    case types.GET_ANNOUCEMENT_ERROR: {
      return {...state, loading: false};
    }
    case types.READ_ANNOUCEMENT: {
      const newList = state.listAnnoucemnent.map(p =>
        p.id == action.id ? {...p, is_read: true} : p,
      );
      return {...state, loading: false, listAnnoucemnent: newList};
    }
    case types.DELETE_ONE_ANNOUCEMENT: {
      const newList = state.listAnnoucemnent.filter(
        item => item.id != action.id
      );
      return {...state, loading: false, listAnnoucemnent: newList};
    }
    case types.READ_ALL_ANNOUCEMENT: {
      let dataRead = _.map(state.listAnnoucemnent, item => {
        {
          item.is_read = true;
        }
        return item;
      });
      return {...state, loading: false, listAnnoucemnent: dataRead,totalReadAnnoucement: 0 };
    }
    case types.LIST_SETTING: {
      let dataNew = {};
      dataNew = getStatusSetting(action.data);
      return {...state, loading: false, listDataSetting: dataNew};
    }
    default:
      return state;
  }
};

export default reducerOther;
