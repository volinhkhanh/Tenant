import { connect } from 'react-redux'
//
import OtpVerificationScreen from '../screens/auth/OtpVerificationScreen'
//
import { postOTP, postValidOTP } from '../actions/actionMember'

const mapStateToProps = ({ 
    reducerMember: {
      getOTPInProgress,
      getValidOTPInProgress,
      getOTPData,
    },
}) => ({
  getOTPInProgress,
  getValidOTPInProgress,
  getOTPData,
});

const ContainerOtpVerification = connect(
  mapStateToProps,
  {
    postOTP,
    postValidOTP,
  },
)(OtpVerificationScreen);

export default ContainerOtpVerification
