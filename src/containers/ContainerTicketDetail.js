import {connect} from 'react-redux';
//
import TicketDetailScreen from '../screens/tickets/TicketDetailScreen';
//
import {
  getTicket,
  postTicketReview,
  deleteTicket,
} from '../actions/actionTicket';

const mapStateToProps = ({
  reducerTicket: {getCreateTicketReviewProgress, getTicketData, setTicketData},
  reducerHome: {getGeneralInformationData},
}) => ({
  getCreateTicketReviewProgress,
  getTicketData,
  setTicketData,
  getGeneralInformationData,
});

const ContainerTicketDetail = connect(
  mapStateToProps,
  {
    getTicket,
    postTicketReview,
    deleteTicket,
  },
)(TicketDetailScreen);

export default ContainerTicketDetail;
