import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUserRequest, toggleAuctionDetail } from 'actions';
import NavigationView from 'components/view/Navigation';

const mapStateToProps = (state) => {

    return {
        user: state.auctions.user,
        userPermissions: state.auctions.user.permissions,
        config: state.config,
        router: state.router,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutUserRequest()),
        toggleAuctionDetail: () => {dispatch(toggleAuctionDetail())},
    }
};

const NavigationViewWithRouter = withRouter(NavigationView);

const NavigationController = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavigationViewWithRouter);

export default NavigationController;