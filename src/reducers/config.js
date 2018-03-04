import {
    REFRESH_CONFIG
} from '../constants'

const defaultState = {
    BIDDING_OPEN: false,
    CONFIRM_WINNERS: false,
    CREATE_AUCTIONS: false,
    LOCKDOWN_MODE: false,
}

function config(state = defaultState, action) {

    const {
        config
    } = action;

    switch (action.type) {
        case REFRESH_CONFIG:
            // console.log('reducer', state, action)

            return Object.assign({}, config);

        default:
            return state
    }
}

export default config