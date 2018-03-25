import { fork } from 'redux-saga/effects';
import auctions from './auctions';
import authentication from './authentication';
import config from './config';
import imageUpload from './imageUpload';
import raffles from './raffles';
import user from './user';
import users from './users';

/**
 * use one root saga to yield all other side effect sagas
 */
function* sagas() {
    yield [
        fork(auctions),
        fork(authentication),
        fork(config),
        fork(imageUpload),
        fork(raffles),
        fork(user),
        fork(users),
    ];
}

export default sagas;