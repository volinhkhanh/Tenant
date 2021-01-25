import { connect } from 'react-redux'
//
import MovingDetailScreen from '../screens/movingList/MovingDetailScreen'
//
import { getMovingDetail, setMovingDetailData, postCreateFurnitureMoving, putUpdateMovingRequest } from '../actions/actionMoving'

const mapStateToProps = ({
  reducerHome: {
    getGeneralInformationData,
  },
  reducerMoving: {
    getMovingDetailData,
    getMovingDetailProgress,
  },
}) => ({
  getMovingDetailData,
  getMovingDetailProgress,
  getGeneralInformationData,
});

const ContainerMovingDetail = connect(
  mapStateToProps,
  {
    getMovingDetail,
    setMovingDetailData,
    postCreateFurnitureMoving,
    putUpdateMovingRequest
  },
)(MovingDetailScreen);

export default ContainerMovingDetail
