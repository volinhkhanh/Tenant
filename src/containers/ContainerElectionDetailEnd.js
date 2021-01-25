import { connect } from 'react-redux'
//
import ElectionDetailEndScreen from '../screens/election/ElectionDetailEndScreen'
//
import { getElectionDetail, setElectionDetailData } from '../actions/actionElection'

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

const ContainerElectionDetailEnd = connect(
  mapStateToProps,
  {
    getElectionDetail,
    setElectionDetailData,
  },
)(ElectionDetailEndScreen);

export default ContainerElectionDetailEnd
