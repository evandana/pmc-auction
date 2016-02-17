import AppDispatcher from 'AppDispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import UserConstants from 'constants/UserConstants';
import Immutable from 'immutable';
import rw from 'utils/firebaseAdapter';

let _curUser,
    UserStore;

UserStore = assign({}, EventEmitter.prototype, {rwAdapter: rw}, {
    
    authCheck (callback) {
        UserStore.rwAdapter.authCheck(callback);
    },
    
    authenticate () {
        UserStore.rwAdapter.auth();
    },

    dispatcherIndex: AppDispatcher.register( function(dispatch) {

        let actionType = dispatch.action.actionType;

        switch(actionType) {
            case UserConstants.LOGIN_GOOGLE:
                UserStore.rwAdapter.loginGoogle();
                break;
            default:
                //return true;
        }

        return true;
    }),
    
    getUser () {
        return _curUser;
    },
    
    setUser (userData) {
        _curUser = userData;
    }
    
});

export default UserStore;
