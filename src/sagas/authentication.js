import { takeEvery } from 'redux-saga/effects';

import {
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,
} from '../constants';

function* loginGoogleRequest() {
    window._FIREBASE_.auth().signInWithPopup(window._FIREBASE_PROVIDER_)
        .catch(function(error) {
            console.log('ERROR with Google Login', error)
    });
    console.log('You have been logged in');
    console.log('TODO: refresh the page if first login')
    
    yield;
}

function* logoutUserRequest() {
    window._FIREBASE_.auth().signOut();
    console.log('You have been logged out');
    console.log('TODO: refresh the page')
    yield;
}

export default function* () {
    yield [
        takeEvery(LOGIN_GOOGLE_REQUEST, loginGoogleRequest),
        takeEvery(LOGOUT_USER_REQUEST, logoutUserRequest)
    ];
}