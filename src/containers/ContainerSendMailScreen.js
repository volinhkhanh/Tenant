import { connect } from 'react-redux'
//
import SendMailScreen from "../screens/other/SendMailScreen";
//
const mapStateToProps = ({ 
    reducerMember: {
      getMemberData,
    },
    
}) => ({
  getMemberData,
});

const ContainerSendMailScreen = connect(
  mapStateToProps,
  {
    
  },
)(SendMailScreen);

export default ContainerSendMailScreen;
