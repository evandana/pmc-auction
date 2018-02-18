import { connect } from 'react-redux';
import CreateAuction from 'components/view/CreateAuction';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        form: state.auctions.createAuctionForm,
        auctionsOwned: state.auctions.auctionsOwned,
    }
};
  
export default connect(
    mapStateToProps
)(CreateAuction);