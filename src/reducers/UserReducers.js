import {
    LOAD_USERS,
    UPDATE_USER
} from '../actions/UserActions'

const defaultAuctionState = {
    user: []
}

function users(state = defaultAuctionState, action) {

    switch (action.type) {
        case LOAD_USERS:
            // console.log('reducer', state, action)

            return Object.assign(false, {}, {
                users: action.users
            });

        case LOAD_USERS:

            let users = state.users.map( user => {
                if (user.uid === action.user.uid) {
                    return action.user;
                } else {
                    return user;
                }
            })
            debugger;

            return Object.assign(false, {}, {
                users: users
            });

        default:
            return state
    }
}

export default users