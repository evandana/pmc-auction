import { connect } from 'react-redux';
import { logoutUserRequest, openLoginModal } from 'actions';
import Navigation from 'components/view/Navigation';

const mapStateToProps = (state) => {

    return {
        user: state.user,
        userPermissions: state.user.permissions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {dispatch(logoutUserRequest())},
        openLoginModal: (data) => {
            dispatch(openLoginModal());
        }
    }

};

const NavigationController = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navigation);

export default NavigationController;