import AppDispatcher from 'AppDispatcher';
import UserConstants from 'constants/UserConstants';

let UserActions = {
    
    loginGoogle: function() {
        AppDispatcher.handleViewAction({
            actionType: UserConstants.LOGIN_GOOGLE
        })
    }

};

export default UserActions;
