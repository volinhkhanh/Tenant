import {connect} from 'react-redux';
//
import VisitorFullFillCreateScreen from '../screens/visitor/VisitorFullFillCreateScreen';
//
import {getVisitorReason, editVisitor} from '../actions/actionVisitor';

const mapStateToProps = ({
  reducerVisitor: {getVisitorReasonProcess, getVisitorReasonData},
}) => ({
  getVisitorReasonProcess,
  getVisitorReasonData,
});

const ContainerFullFillCreateVisitor = connect(
  mapStateToProps,
  {
    getVisitorReason,
    editVisitor,
  },
)(VisitorFullFillCreateScreen);

export default ContainerFullFillCreateVisitor;
