import { hashHistory } from 'react-router'
// firebase read/write adapter
import firebase from '../utils/firebaseAdapter'

export const LOGIN_CONSTANTS = {
    AUTH_CHECK_REQUEST: 'AUTH_CHECK_REQUEST',
    AUTH_CHECK_RESPONSE: 'AUTH_CHECK_RESPONSE',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_FAIL: 'AUTH_FAIL',
    SET_USER: 'SET_USER'
}

export const LoginActions = {

    authCheckRequest() {
        
        return dispatch => {
            firebase.authCheck( user => dispatch(this.authCheckResponse(user)) )
        }

    },
    
    authCheckResponse(user) {
        console.log('auth response called ', user)
        if (user) {
            return dispatch => { dispatch(this.findAndSetUser(user)) }
        } else {
            return { type: LOGIN_CONSTANTS.AUTH_FAIL }
        }

    },
    
    findAndSetUser (authData) {
        console.log('setting up findUser');

        return dispatch => {

            firebase.getAllUsers()
                .then(function (users) {
                    console.log('found all users', users);
                    let uid = getUidFromAuth(authData);
                    if (!users || !users[uid]) {
                        storeNewUser(authData)
                            .then((newUser) => {
                                dispatch(LoginActions.setUser(newUser))
                            })
                    } else {
                        dispatch(LoginActions.setUser(users[uid]))
                    }
                })
        }

    },
    
    setUser(user) {
        return {
            type: LOGIN_CONSTANTS.AUTH_SUCCESS,
            user
        }
    },

    requestLoginGoogle(user) {
        // will never call success callback, only error callback
        return firebase.loginGoogle()
    },

    logoutUser(user) {
        return {
            type: LOGIN_CONSTANTS.LOGOUT_USER,
            user
        }
    }
}

function getUidFromAuth (authData) {

    // Google Auth
    if (authData.auth && authData.auth.provider === 'google') {
        return authData.auth.uid
    } else {
        console.log('getUIdFromAuth could not find auth type')
        return null
    }

}

function storeNewUser (userData){
    return new Promise((resolve, reject) => {
        // Google users
        if (userData.auth && userData.auth.provider === 'google') {
            let user = {
                uid: userData.uid,
                name: userData.google.displayName,
                permissionLevel: 'GUEST'
            }

            firebase.addNewUser(userData.uid, user)
                .then( (newUser) => {
                    resolve(newUser);
                })

        } else {
            console.log('UserStore.storeNewUser error, authentication type unknown.');
        }
    });
}
