import {connect} from 'react-redux';
//
import EventScreen from '../screens/event/EventScreen';
//
import {getEvents} from '../actions/actionEvent';

const mapStateToProps = ({
  reducerEvent: {getEventsProgress, getEventsData},
}) => ({
  getEventsProgress,
  getEventsData,
});

const ContainerEvent = connect(
  mapStateToProps,
  {
    getEvents,
  },
)(EventScreen);

export default ContainerEvent;
