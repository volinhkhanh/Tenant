import {connect} from 'react-redux';
//
import TicketConfirmScreen from '../screens/tickets/TicketConfirmScreen';
//
import {postTicket} from '../actions/actionTicket';

const mapStateToProps = ({
  reducerTicket: {getCreateTicketProgress},
  reducerHome: {getGeneralInformationData},
}) => ({
  getCreateTicketProgress,
  getGeneralInformationData,
});

const ContainerTicketConfirm = connect(
  mapStateToProps,
  {
    postTicket,
  },
)(TicketConfirmScreen);

export default ContainerTicketConfirm;
