import { connect } from 'react-redux'
import {getListAnnoucement,readingAnnoucement} from "../actions/actionOther";
import NewsDetailScreen from '../screens/other/NewsDetailScreen';
const mapStateToProps = ({ 
    reducerOther:{
      listAnnoucemnent,
      loading,
    },
}) => ({
  listAnnoucemnent,
  loading,
});

const ContainerNewsDetailScreen = connect(
  mapStateToProps,
  {
    readingAnnoucement
  },
)(NewsDetailScreen);

export default ContainerNewsDetailScreen;
