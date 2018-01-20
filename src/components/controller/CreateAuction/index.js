import { connect } from 'react-redux';
import CreateAuction from 'components/view/CreateAuction';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        form: state.auctions.createAuctionForm
    }
};
  
export default connect(
    mapStateToProps
)(CreateAuction);