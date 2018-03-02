import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUserRequest, openLoginModal, toggleAuctionDetail } from 'actions';
import NavigationView from 'components/view/Navigation';

const mapStateToProps = (state) => {

    return {
        user: state.auctions.user,
        userPermissions: state.auctions.user.permissions,
        config: state.config,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutUserRequest()),
        openLoginModal: () => dispatch(openLoginModal()),
        toggleAuctionDetail: () => {dispatch(toggleAuctionDetail())},
    }
};

const NavigationViewWithRouter = withRouter(NavigationView);

const NavigationController = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavigationViewWithRouter);

export default NavigationController;