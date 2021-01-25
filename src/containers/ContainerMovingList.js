import { connect } from 'react-redux'
//
import MovingListScreen from '../screens/movingList/MovingListScreen'
// import MovingReservationScreen from '../screens/movingList/MovingReservationScreen';
//
import { getMovingList, setMovingListData } from '../actions/actionMoving'

const mapStateToProps = ({
  reducerHome: {
    getGeneralInformationData,
  },
  reducerMoving: {
    getMovingListData,
    getMovingListProgress,
    },
}) => ({
  getMovingListData,
  getMovingListProgress,
  getGeneralInformationData,
});

const ContainerMovingList = connect(
  mapStateToProps,
  {
    getMovingList,
    setMovingListData,
  },
)(MovingListScreen);

export default ContainerMovingList
