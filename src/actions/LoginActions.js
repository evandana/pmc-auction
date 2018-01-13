import { hashHistory } from 'react-router'
// firebase read/write adapter
import firebase from '../utils/firebaseAdapter'

import { userDescriptives, userSpiritAnimals } from '../constants/UserPersonas'

import {
    AUTH_CHECK_REQUEST,
    AUTH_CHECK_RESPONSE,
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOCKDOWN_MODE,
    SET_USER,
    GET_CONFIG_SUCCESS,
    UPDATE_CONFIG_SUCCESS,
} from 'constants'


export const LoginActions = {

    authCheckRequest() {
        return {
            type: LOGIN_CONSTANTS.AUTH_CHECK_REQUEST
        };

        // TODO: SET UP ASYNC MIDDLEWARE
        // return dispatch => {
        //     firebase.authCheck( user => dispatch(this.authCheckResponse(user)) )
        // }
    },

    authCheckResponse(user) {
        // console.log('auth response called ', user)
        if (user) {
            return dispatch => { dispatch(this.findAndSetUser(user)) }
        } else {
            return { type: LOGIN_CONSTANTS.AUTH_FAIL }
        }
    },

    getConfig() {
        return dispatch => {
            firebase.getConfig().then( data => {
                return dispatch(this.getConfigObj(data));
            });
        }
    },

    getConfigObj(data) {
        return {
            type: LOGIN_CONSTANTS.GET_CONFIG_SUCCESS,
            data
        }
    },

    updateConfig() {
        return dispatch => {
            firebase.updateConfig( config => dispatch(this.updateConfigObj(config)) )
        }
    },

    updateConfigObj(data) {
        return {
            type: LOGIN_CONSTANTS.UPDATE_CONFIG_SUCCESS,
            data
        };
    },

    findAndSetUser (authData) {
        // console.log('setting up findUser');

        return dispatch => {

            const dataCalls = [
                firebase.getConfig(),
                firebase.getAllUsers()
            ]

            Promise.all(dataCalls)
                .then( data => {

                    let [config, users] = data

                    let uid = getUidFromAuth(authData);

                    // new users and lockdown mode
                    if (config.LOCKDOWN_MODE === true && (!users || !users[uid])) {

                        dispatch({ type: LOGIN_CONSTANTS.LOCKDOWN_MODE })

                    // new users and not lockdown mode
                    } else if(!users || !users[uid]) {

                        storeNewUser(authData, users)
                            .then((newUser) => {
                                dispatch(LoginActions.setUser(newUser))
                            })
                    // user exists in database
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

function generateUserPersona(users) {

    let validDescriptives = userDescriptives.slice(),
        validAnimals = userSpiritAnimals.slice(),
        newPersona

    // Object.keys(users).forEach( user => {

    //     if (users[user].persona) {

    //         validDescriptives.splice(
    //             validDescriptives.indexOf(users[user].persona.split(' ')[0]), 1
    //         )


    //         validAnimals.splice(
    //             validAnimals.indexOf(users[user].persona.split(' ')[1]), 1
    //         )

    //     }
    // })

    newPersona = validDescriptives[Math.floor(Math.random() * (validDescriptives.length))] +
        ' ' +
        validAnimals[Math.floor(Math.random() * (validAnimals.length))]

    return  newPersona
}

function getUidFromAuth (authData) {

    // Google Auth
    if (authData.auth && authData.auth.provider === 'google') {
        return authData.auth.uid
    } else {
        // console.log('getUIdFromAuth could not find auth type')
        return null
    }

}

function storeNewUser (userData, users){
    return new Promise((resolve, reject) => {
        // Google users
        if (userData.auth && userData.auth.provider === 'google') {
            let user = {
                uid: userData.uid,
                email: userData.google.email,
                name: userData.google.displayName,
                permissionLevel: 'GUEST',
                persona: generateUserPersona(users)
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
