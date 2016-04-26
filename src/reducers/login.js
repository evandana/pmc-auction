import {
    LOGIN_CONSTANTS
} from '../actions/LoginActions'

function login(state = { user : {} }, action ) {
    switch (action.type) {
        case LOGIN_CONSTANTS.GET_CONFIG_SUCCESS:
            return Object.assign({}, state, {
                config: action.data
            });
        case LOGIN_CONSTANTS.UPDATE_CONFIG_SUCCESS:
            return Object.assign({}, state, {
                config: Object.assign({}, state.config, action.data)
            });
        case LOGIN_CONSTANTS.AUTH_SUCCESS:
            console.log("authorization was successful!!")
            return Object.assign({}, state, {
                user: action.user
            });
        case LOGIN_CONSTANTS.AUTH_FAIL:
            console.log("authorization failed!")
            return Object.assign({}, state, {
                forceLoginView: true
            });
        case LOGIN_CONSTANTS.LOCKDOWN_MODE:
            console.log("LOCKDOWN MODE")
            return Object.assign({}, state, {
                applicationClosed: true
            });
        default:
            return state;
    }
}

export default login;