import {connect} from 'react-redux';
//
import VisitorDetailScreen from '../screens/visitor/VisitorDetailScreen';
//
import {getVisitor, deleteVisitor} from '../actions/actionVisitor';

const mapStateToProps = ({
  reducerVisitor: {getVisitorProgress, getVisitorData},
  reducerHome: {getGeneralInformationData},
}) => ({
  getVisitorProgress,
  getVisitorData,
  getGeneralInformationData,
});

const ContainerVisitorDetail = connect(
  mapStateToProps,
  {
    getVisitor,
    deleteVisitor,
  },
)(VisitorDetailScreen);

export default ContainerVisitorDetail;
