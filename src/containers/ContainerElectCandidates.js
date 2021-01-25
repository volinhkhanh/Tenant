import { connect } from 'react-redux'
//
import ElectCandidatesScreen from '../screens/election/ElectCandidatesScreen'
//
import { getCandidatesByElection, getVotingElection } from '../actions/actionElection'

const mapStateToProps = ({
  reducerHome: {
    getGeneralInformationData,
  },
  reducerElection: {
    getCandidatesByElectionProgress,
    getCandidatesByElectionData,
  },
}) => ({
  getCandidatesByElectionProgress,
  getCandidatesByElectionData,
  getGeneralInformationData,
});

const ContainerElectCandidates = connect(
  mapStateToProps,
  {
    getCandidatesByElection,
    getVotingElection,
  },
)(ElectCandidatesScreen);

export default ContainerElectCandidates
