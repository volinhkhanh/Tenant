import {connect} from 'react-redux';
//
import VisitorDetailConfirmScreen from '../screens/visitor/VisitorDetailConfirmScreen';
//
import {getVisitor, postVisitor} from '../actions/actionVisitor';

const mapStateToProps = ({
  reducerVisitor: {getVisitorProgress, getVisitorData},
  reducerHome: {getGeneralInformationData, getGeneralInformationProgress},
}) => ({
  getVisitorProgress,
  getVisitorData,
  getGeneralInformationData,
  getGeneralInformationProgress,
});

const ContainerVisitorDetailConfirm = connect(
  mapStateToProps,
  {
    getVisitor,
    postVisitor,
  },
)(VisitorDetailConfirmScreen);

export default ContainerVisitorDetailConfirm;
