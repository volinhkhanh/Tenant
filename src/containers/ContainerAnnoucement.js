import { connect } from 'react-redux'
import {getListAnnoucement, readingAnnoucement, readAnnoucementAll, deleteOneAnnoucement} from "../actions/actionOther";
import Announcement from '../screens/other/Announcement';
const mapStateToProps = ({ 
  reducerHome: {
    getGeneralInformationData,
  },
  reducerOther:{
    listAnnoucemnent,
    totalReadAnnoucement,
    loading,
  },
}) => ({
  listAnnoucemnent,
  totalReadAnnoucement,
  loading,
  getGeneralInformationData,
});

const ContainerAnnoucement = connect(
  mapStateToProps,
  {
    readingAnnoucement,
    readAnnoucementAll,
    deleteOneAnnoucement,
    getListAnnoucement,
  },
)(Announcement);

export default ContainerAnnoucement;
