import {
    LOGIN_CONSTANTS
} from '../actions/LoginActions'

function login(state = { user : {} }, action ) {
    switch (action.type) {
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
        default:
            return state;
    }
}

export default login;