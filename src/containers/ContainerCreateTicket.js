import {connect} from 'react-redux';
//
import CreateTicketScreen from '../screens/tickets/CreateTicketScreen';
//
import {
  postTicket,
  getTicketType,
} from '../actions/actionTicket';
//
import {
  deleteImage,
  postUploadImage,
  setUploadImageData,
} from '../actions/actionCommon'

const mapStateToProps = ({
  reducerCommon: {
    getDeleteImageProgress,
    getDeleteImageData,
    getUploadImageProgress,
    uploadImageData,
  },
  reducerHome: {
    getGeneralInformationData,
  },
  reducerTicket: {
    getTicketTypeProcess,
    getTicketTypeData,
  },
}) => ({
  getTicketTypeProcess,
  getTicketTypeData,
  getDeleteImageProgress,
  getDeleteImageData,
  getUploadImageProgress,
  uploadImageData,
  getGeneralInformationData,
});

const ContainerCreateTicket = connect(
  mapStateToProps,
  {
    getTicketType,
    deleteImage,
    postUploadImage,
    setUploadImageData,
  },
)(CreateTicketScreen);

export default ContainerCreateTicket;
