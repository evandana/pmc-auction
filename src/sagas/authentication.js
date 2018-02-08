import { takeEvery } from 'redux-saga/effects';

import {
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,
} from '../constants';

import { setCurrentUser, showLoginSpinner } from 'actions';

function* loginGoogleRequest() {

    window._UI_STORE_.dispatch(showLoginSpinner(true));

    window._FIREBASE_.auth().signInWithRedirect(window._FIREBASE_PROVIDER_)
        .catch(function(error) {

            console.log('ERROR with Google Login', error)
            window._UI_STORE_.dispatch( setCurrentUser({permissions: {}}) );
    });
    console.log('You have been logged in');
    
    yield;
}

function* logoutUserRequest() {
    window._FIREBASE_.auth().signOut();
    window._UI_STORE_.dispatch( setCurrentUser({permissions: {}}) );
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