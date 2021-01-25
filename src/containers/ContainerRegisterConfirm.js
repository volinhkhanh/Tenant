import { connect } from 'react-redux'
//
import RegisterConfirmScreen from '../screens/auth/RegisterConfirmScreen'
//
import {
  postRegister,
} from '../actions/actionMember'

const mapStateToProps = ({ 
    reducerMember: {
      getRegisterInProgress
    },
}) => ({
  getRegisterInProgress
});

const ContainerRegisterConfirm = connect(
  mapStateToProps,
  {
    postRegister,
  },
)(RegisterConfirmScreen);

export default ContainerRegisterConfirm
