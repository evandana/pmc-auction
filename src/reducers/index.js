import asyncForm from './async-form';
import auctions from './auctions';
import config from './config';
import images from './images';
import modal from './modal';
import users from './users';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    images,
    isLoggedIn,
    asyncForm,
    auctions, // contains current user
    config,
    modal,
    users, // list of all users
};

export default reducers;