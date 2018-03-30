import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logoutUserRequest } from 'actions';
import NavigationView from 'components/view/Navigation';

const mapStateToProps = (state) => {

    return {
        user: state.auctions.user,
        userPermissions: state.auctions.user.permissions,
        config: state.config,
        router: state.router,
        snackbar: state.snackbar,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutUserRequest()),
    }
};

const NavigationViewWithRouter = withRouter(NavigationView);

const NavigationController = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavigationViewWithRouter);

export default NavigationController;