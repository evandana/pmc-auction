import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AuctionsView from 'components/view/Auctions';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        userPermissions: state.auctions.user.permissions,
        auctionCollection: state.auctions.auctionCollection,
        config: state.config,
    }
};

const AuctionsViewWithRouter = withRouter(AuctionsView);
  
export default connect(
    mapStateToProps
)(AuctionsViewWithRouter);