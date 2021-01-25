import {connect} from 'react-redux';
//
import MovingCreateScreen from '../screens/movingList/MovingCreateScreen';
// import MovingCreateScreen from '../screens/movingList/MovingCreateScreenV2';
//
import {
  postCreateMoveOut,
  postCreateFurnitureMoving,
  postUploadMovingImage,
  setUploadMovingImageData,
  putUpdateMovingRequest,
} from '../actions/actionMoving';
import {deleteImage} from '../actions/actionCommon';

const mapStateToProps = ({
  reducerHome: {getGeneralInformationData},
  reducerCommon: {getDeleteImageProgress, getDeleteImageData},
  reducerMoving: {
    getCreateMoveOutData,
    getCreateFurnitureMovingData,
    getUploadMovingImageData,
    getCreateMoveOutProgress,
    getCreateFurnitureMovingProgress,
    getUploadMovingImageProgress,
  },
}) => ({
  getCreateMoveOutData,
  getCreateFurnitureMovingData,
  getUploadMovingImageData,
  getCreateMoveOutProgress,
  getCreateFurnitureMovingProgress,
  getUploadMovingImageProgress,
  getGeneralInformationData,
  getDeleteImageProgress,
});

const ContainerMovingCreate = connect(mapStateToProps, {
  postCreateMoveOut,
  postCreateFurnitureMoving,
  postUploadMovingImage,
  setUploadMovingImageData,
  deleteImage,
  putUpdateMovingRequest,
})(MovingCreateScreen);

export default ContainerMovingCreate;
