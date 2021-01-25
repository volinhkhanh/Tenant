import {connect} from 'react-redux';
//
import EditTicketScreen from '../screens/tickets/EditTicketScreen';
//
import {
  getTicketType,
  editTicket,
} from '../actions/actionTicket';
//
import {
  deleteImage,
  postUploadImage,
  setUploadImageData,
} from '../actions/actionCommon';

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
    getEditTicketProgress,
  },
}) => ({
  getTicketTypeProcess,
  getTicketTypeData,
  getEditTicketProgress,
  getDeleteImageProgress,
  getDeleteImageData,
  getUploadImageProgress,
  uploadImageData,
  getGeneralInformationData,
});

const ContainerEditTicket = connect(
  mapStateToProps,
  {
    getTicketType,
    editTicket,
    deleteImage,
    postUploadImage,
    setUploadImageData,
  },
)(EditTicketScreen);

export default ContainerEditTicket;
