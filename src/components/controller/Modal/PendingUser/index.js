import { connect } from 'react-redux';
import { logoutUserRequest, updateUser } from 'actions';
import PendingUser from 'components/view/Modal/PendingUser';

const mapStateToProps = (state) => {
    const user = state.user;
    
    return {
        userName: user.displayName,
    };
};

const mapDispatchActions = {
    logoutUserRequest,
    updateUserPermissions: (user) => updateUser({permissions: {
        basic: true,
        products: true
    }}),
};

const PendingUserController = connect(
    mapStateToProps, mapDispatchActions
)(PendingUser);

export default PendingUserController;