import modal from './modal';
import auctions from './auctions';
import config from './config';
import asyncForm from './async-form';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    isLoggedIn,
    asyncForm,
    modal,
    auctions,
    config,
};

export default reducers;