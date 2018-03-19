import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AuctionItemDetailView from './AuctionItemDetail';

const mapStateToProps = (state) => {
    return {
        user: state.auctions.user,
        auctionCollection: state.auctions.auctionCollection,
        config: state.config,
    }
};

const AuctionsViewWithRouter = withRouter(AuctionsView);
  
export default connect(
    mapStateToProps
)(AuctionsViewWithRouter);