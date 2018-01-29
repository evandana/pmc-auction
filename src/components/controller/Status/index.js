import { connect } from 'react-redux';
import StatusView from 'components/view/Status';

import { ownerBidConfirmation, bidderBidConfirmation } from 'actions'

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        config: state.config,
        // auctions: state.auctions.auctionCollection,
        auctionsWithUserBids: state.auctions.auctionsWithUserBids,
        auctionsOwned: state.auctions.auctionsOwned,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ownerBidConfirmation: (...rest) => {dispatch(ownerBidConfirmation(...rest))},
        bidderBidConfirmation: (...rest) => {dispatch(bidderBidConfirmation(...rest))},
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StatusView);