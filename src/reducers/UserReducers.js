import {
    LOAD_USERS
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

        default:
            return state
    }
}

export default users