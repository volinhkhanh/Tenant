import {connect} from 'react-redux';
//
import VisitorCreateScreen from '../screens/visitor/VisitorCreateScreen';
//
import {getVisitorReason, postVisitor} from '../actions/actionVisitor';

const mapStateToProps = ({
  reducerVisitor: {
    getCreateVisitorProgress,
    getVisitorReasonProcess,
    getVisitorReasonData,
  },
}) => ({
  getCreateVisitorProgress,
  getVisitorReasonProcess,
  getVisitorReasonData,
});

const ContainerCreateVisitor = connect(
  mapStateToProps,
  {
    getVisitorReason,
    postVisitor,
  },
)(VisitorCreateScreen);

export default ContainerCreateVisitor;
