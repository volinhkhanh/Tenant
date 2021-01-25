import {combineReducers} from 'redux';
//
import reducerMember from './reducerMember';
import reducerContact from './reducerContact';
import reducerBills from './reducerBills';
import reducerOther from './reducerOther';
import reducerMoving from './reducerMoving';
import reducerHome from './reducerHome';
import reducerTicket from './reducerTicket';
import reducerEvent from './reducerEvent';
import reducerFacility from './reducerFacility';
import reducerElection from './reducerElection';
import reducerChat from './reducerChat';
import reducerCommon from './reducerCommon';
import reducerVisitor from './reducerVisitor';
//
const reducers = {
  reducerMember,
  reducerContact,
  reducerBills,
  reducerOther,
  reducerMoving,
  reducerHome,
  reducerTicket,
  reducerEvent,
  reducerFacility,
  reducerElection,
  reducerChat,
  reducerCommon,
  reducerVisitor,
};
//
const appReducer = combineReducers(reducers);
const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
