import { connect } from 'react-redux'
//
import AddMemberConfirmationScreen from '../screens/profile/AddMemberConfirmationScreen'
//
import {
  postAddMember,
} from '../actions/actionHome'
//
const mapStateToProps = ({ 
  reducerHome: {
    getAddMemberProgress,
    getAddMemberData,
    getGeneralInformationData,
  },
}) => ({
  getAddMemberProgress,
  getAddMemberData,
  getGeneralInformationData,
});

const ContainerAddMemberConfirmation = connect(
  mapStateToProps,
  {
    postAddMember,
  },
)(AddMemberConfirmationScreen);

export default ContainerAddMemberConfirmation
