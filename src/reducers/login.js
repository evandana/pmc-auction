import {
    LOGIN_CONSTANTS
} from '../actions/LoginActions'

function login(state = { user : {} }, action ) {
    switch (action.type) {
        case LOGIN_CONSTANTS.REQUEST_ROUTE_CHANGE:
            console.log('REQUESTED ROUTE CHANGE state', state);
            return state;
            break;
        case LOGIN_CONSTANTS.LOGIN_GOOGLE_SUCCESS:
            console.log('LOGIN_GOOGLE_SUCCESS-------------------------------------', state);
            return Object.assign({}, state, {
                user: 'logged in'
            });
            break;
        default:
            return state;
    }
}

export default login;