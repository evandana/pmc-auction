import { connect } from 'react-redux';
import SpecialCodeForm from 'components/view/SpecialCodeForm';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        asyncForm: state.asyncForm,
    }
};
  
export default connect(
    mapStateToProps
)(SpecialCodeForm);