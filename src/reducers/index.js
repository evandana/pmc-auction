import modal from './modal';
import auctions from './auctions';
import config from './config';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    isLoggedIn,
    modal,
    auctions,
    config,
};

export default reducers;