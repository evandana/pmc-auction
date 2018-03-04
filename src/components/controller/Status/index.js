import { connect } from 'react-redux';
import StatusView from 'components/view/Status';

import { ownerBidConfirmation, bidderBidConfirmation, ownerBidPlanned, ownerBidContacted, setClaimStep } from 'actions'

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        config: state.config,
        auctionsWithUserBids: state.auctions.auctionsWithUserBids,
        auctionsOwned: state.auctions.auctionsOwned,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ownerBidConfirmation: (...rest) => {dispatch(ownerBidConfirmation(...rest))},
        bidderBidConfirmation: (...rest) => {dispatch(bidderBidConfirmation(...rest))},
        ownerBidPlanned: (...rest) => {dispatch(ownerBidPlanned(...rest))},
        ownerBidContacted: (...rest) => {dispatch(ownerBidContacted(...rest))},
        setClaimStep: (...rest) => {dispatch(setClaimStep(...rest))},
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StatusView);