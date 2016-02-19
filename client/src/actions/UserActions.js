import AppDispatcher from 'AppDispatcher';
import UserConstants from 'constants/UserConstants';

let UserActions = {
    
    loginGoogle () {
        AppDispatcher.handleViewAction({
            actionType: UserConstants.LOGIN_GOOGLE
        })
    },
    
    logoutUser () {
        AppDispatcher.handleViewAction({
            actionType: UserConstants.LOGOUT_USER
        })
    }

};

export default UserActions;
