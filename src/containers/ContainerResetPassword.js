import { connect } from 'react-redux'
//
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen'
//
import { postResetPassword } from '../actions/actionMember'

const mapStateToProps = ({ 
    reducerMember: {
      getResetPasswordInProgress,
      getValidOTPData,
    },
}) => ({
  getResetPasswordInProgress,
  getValidOTPData,
});

const ContainerResetPassword = connect(
  mapStateToProps,
  {
    postResetPassword,
  },
)(ResetPasswordScreen);

export default ContainerResetPassword
