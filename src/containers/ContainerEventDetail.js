import {connect} from 'react-redux';
//
import EventDetailScreen from '../screens/event/EventDetailScreen';
//
import {getEvent} from '../actions/actionEvent';

const mapStateToProps = ({reducerEvent: {getEventProgress, getEventData}}) => ({
  getEventProgress,
  getEventData,
});

const ContainerEventDetail = connect(
  mapStateToProps,
  {
    getEvent,
  },
)(EventDetailScreen);

export default ContainerEventDetail;
