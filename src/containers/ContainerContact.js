import { connect } from 'react-redux'
//
import PhoneBookScreen from '../screens/phoneBook/PhoneBookScreen'
//
import { getContact } from '../actions/actionContact'

const mapStateToProps = ({ 
    reducerContact: {
      getContactProgress,
      getContactData,
    },
}) => ({
  getContactProgress,
  getContactData,
});

const ContainerContact = connect(
  mapStateToProps,
  {
    getContact,
  },
)(PhoneBookScreen);

export default ContainerContact
