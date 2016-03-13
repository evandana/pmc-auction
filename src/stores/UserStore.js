import AppDispatcher from 'AppDispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import UserConstants from 'constants/UserConstants';
import Immutable from 'immutable';
import rw from 'utils/firebaseAdapter';
import Promise from 'bluebird';

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
            case UserConstants.LOGOUT_USER:
                UserStore.rwAdapter.logoutUser();
                break;
            default:
                //return true;
        }

        return true;
    }),
    
    getUser () {
        return _curUser;
    },
    
    getAllUsers () {
        return UserStore.rwAdapter.getAllUsers();
    },
    
    getUidFromAuth (authData) {

        // Google Auth
        if (authData.auth && authData.auth.provider === 'google') {
            return authData.auth.uid;
        } else {
            console.log('getUIdFromAuth could not find auth type');
            return null;
        }

    },
    
    setUser (authData) {
        return new Promise( (resolve, reject) => {
            UserStore.getAllUsers()
                .then(function(users){
                    let uid = UserStore.getUidFromAuth(authData);
                    if (!users || !users[uid]) {
                        UserStore.storeNewUser(authData)
                            .then( (newUser) => {
                                _curUser = newUser;
                                resolve(_curUser);
                            });
                    } else {
                        _curUser = users[uid];
                        resolve(_curUser);
                    }
                });
        });
    },
    
    storeNewUser (userData) {
        return new Promise( (resolve, reject) => {
            // Google users
            if (userData.auth && userData.auth.provider === 'google') {
                let user = {
                    uid: userData.uid,
                    name: userData.google.displayName,
                    permissionLevel: 'GUEST'
                };
                
                UserStore.rwAdapter.addNewUser(userData.uid, user)
                    .then( (newUser) => {
                        resolve(newUser);
                    });
                
            } else {
                console.log('UserStore.storeNewUser error, authentication type unknown.');
            }
        });
    }
    
});

export default UserStore;
