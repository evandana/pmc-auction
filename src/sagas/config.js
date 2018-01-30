import { takeEvery } from 'redux-saga/effects';

import {
    FETCH_CONFIG,
} from '../constants';

import { refreshConfig } from 'actions';


function* fetchConfig({uid, userData}) {
    window._FIREBASE_DB_.ref('/CONFIG')
        .on('value', (snapshot) => {
            const config = snapshot.val();
            
            window._UI_STORE_.dispatch(refreshConfig(config));
        });
    
    yield;
}


export default function* () {
    yield [
        takeEvery(FETCH_CONFIG, fetchConfig),
    ];
}