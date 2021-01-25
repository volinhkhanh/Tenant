import { connect } from 'react-redux'
//
import ElectionScreen from '../screens/election/ElectionScreen'
//
import { getListElection } from '../actions/actionElection'

const mapStateToProps = ({ 
  reducerHome: {
    getGeneralInformationData
  },
  reducerElection: {
    getListElectionProgress,
    getListElectionData,
  },
}) => ({
  getListElectionProgress,
  getListElectionData,
  getGeneralInformationData,
});

const ContainerElection = connect(
  mapStateToProps,
  {
    getListElection,
  },
)(ElectionScreen);

export default ContainerElection
