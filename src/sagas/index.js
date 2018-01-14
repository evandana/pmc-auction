import { fork } from 'redux-saga/effects';
import authentication from './authentication';
import user from './user';
import auctions from './auctions';
import config from './config';

/**
 * use one root saga to yield all other side effect sagas
 */
function* sagas() {
    yield [
        fork(authentication),
        fork(user),
        fork(auctions),
        fork(config),
    ];
}

export default sagas;