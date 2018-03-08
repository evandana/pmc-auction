import { connect } from 'react-redux';
import DonorCodeForm from 'components/view/DonorCodeForm';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        asyncForm: state.asyncForm,
    }
};
  
export default connect(
    mapStateToProps
)(DonorCodeForm);