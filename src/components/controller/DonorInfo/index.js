import { connect } from 'react-redux';
import View from 'components/view/DonorInfo';

const mapStateToProps = (state) => {
    return {
        users: state.users,
        auctionCollection: state.auctions.auctionCollection,
    };
};

const DonorInfoController = connect(
    mapStateToProps,
)(View);

export default DonorInfoController;