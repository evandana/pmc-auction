import asyncForm from './async-form';
import auctions from './auctions';
import config from './config';
import images from './images';
import modal from './modal';
import raffles from './raffles';
import users from './users';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    asyncForm,
    auctions, // contains current user
    config,
    images,
    isLoggedIn,
    modal,
    raffles,
    users, // list of all users
};

export default reducers;