import { connect } from 'react-redux';
import AuctionsView from 'components/view/Auctions';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        userPermissions: state.auctions.user.permissions,
        auctionCollection: state.auctions.auctionCollection,
        expandedAuction: state.auctions.expandedAuction,
        config: state.config,
    }
};
  
export default connect(
    mapStateToProps
)(AuctionsView);