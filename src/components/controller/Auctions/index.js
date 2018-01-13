import { connect } from 'react-redux';
import AuctionsView from 'components/view/Auctions';

const mapStateToProps = (state) => {
    return {
        userPermissions: state.user.permissions,
    }
};

export default connect(
    mapStateToProps
)(AuctionsView);;