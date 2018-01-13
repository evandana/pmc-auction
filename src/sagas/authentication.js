import { takeEvery } from 'redux-saga/effects';

import {
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,
} from '../constants.js';

function* loginGoogleRequest() {
    window._FIREBASE_.auth().signInWithPopup(window._FIREBASE_PROVIDER_)
        .catch(function(error) {
            console.log('ERROR with Google Login', error)
    });
    
    yield;
}

function* logoutUserRequest() {
    window._FIREBASE_.auth().signOut();
    yield;
}

export default function* () {
    yield [
        takeEvery(LOGIN_GOOGLE_REQUEST, loginGoogleRequest),
        takeEvery(LOGOUT_USER_REQUEST, logoutUserRequest)
    ];
}