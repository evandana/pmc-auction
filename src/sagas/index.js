import { fork } from 'redux-saga/effects';
import authentication from './authentication';
import {
    watchGetUser, 
    watchUpdateUser,
} from './user';
import {
    watchFetchAuction,
    watchFetchAuctions,
    watchUpdateAuction,
    watchPlaceBid,
} from './auctions';
import config from './config';

/**
 * use one root saga to yield all other side effect sagas
 */
function* sagas() {
    yield [
        
        // authentication
        fork(authentication),
        
        // user
        fork(watchGetUser),
        fork(watchUpdateUser),
        
        // auctions
        fork(watchFetchAuction),
        fork(watchFetchAuctions),
        fork(watchUpdateAuction),
        fork(watchPlaceBid),
        
        // config
        fork(config),
    ];
}

export default sagas;