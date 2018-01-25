import { connect } from 'react-redux';
import StatusView from 'components/view/Status';

const mapStateToProps = (state) => {
    return {
        userPermissions: state.auctions.user.permissions,
        auctions: state.auctions.auctionCollection,
        auctionsWithUserBids: state.auctions.auctionsWithUserBids,
    }
};

export default connect(
    mapStateToProps
)(StatusView);;