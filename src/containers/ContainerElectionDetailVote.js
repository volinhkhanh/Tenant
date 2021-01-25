import { connect } from 'react-redux'
//
import ElectionDetailVoteScreen from '../screens/election/ElectionDetailVoteScreen'
//
import { getElectionDetail, getVotingElection, setElectionDetailData } from '../actions/actionElection'

const mapStateToProps = ({ 
  reducerHome: {
    getGeneralInformationData,
  },
  reducerElection: {
    getElectionDetailProgress,
    getElectionDetailData,
  },
}) => ({
  getElectionDetailProgress,
  getElectionDetailData,
  getGeneralInformationData,
});

const ContainerElectionDetailVote = connect(
  mapStateToProps,
  {
    getElectionDetail,
    getVotingElection,
    setElectionDetailData,
  },
)(ElectionDetailVoteScreen);

export default ContainerElectionDetailVote
