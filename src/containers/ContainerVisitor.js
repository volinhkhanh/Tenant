import {connect} from 'react-redux';
//
import VisitorScreen from '../screens/visitor/VisitorScreen';
//
import {getVisitors} from '../actions/actionVisitor';

const mapStateToProps = ({
  reducerVisitor: {getVisitorsProgress, getVisitorsData},
  reducerHome: {getGeneralInformationData, getGeneralInformationProgress},
}) => ({
  getVisitorsProgress,
  getVisitorsData,
  getGeneralInformationData,
  getGeneralInformationProgress,
});

const ContainerVisitor = connect(
  mapStateToProps,
  {
    getVisitors,
  },
)(VisitorScreen);

export default ContainerVisitor;
