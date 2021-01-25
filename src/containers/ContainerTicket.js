import {connect} from 'react-redux';
//
import TicketScreen from '../screens/tickets/TicketScreen';
//
import {getTickets, setTicketData, getTicketType} from '../actions/actionTicket';

const mapStateToProps = ({
  reducerTicket: {getTicketsProgress, getTicketsData, getTicketTypeData},
}) => ({
  getTicketsProgress,
  getTicketsData,
  getTicketTypeData,
});

const ContainerTicket = connect(
  mapStateToProps,
  {
    getTickets,
    setTicketData,
    getTicketType,
  },
)(TicketScreen);

export default ContainerTicket;
