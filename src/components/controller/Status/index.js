import { connect } from 'react-redux';
import StatusView from 'components/view/Status';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        config: state.config,
        // auctions: state.auctions.auctionCollection,
        auctionsWithUserBids: state.auctions.auctionsWithUserBids,
        auctionsOwned: state.auctions.auctionsOwned,
    }
};

export default connect(
    mapStateToProps
)(StatusView);;