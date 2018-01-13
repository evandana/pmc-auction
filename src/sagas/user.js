import { select, takeEvery } from 'redux-saga/effects';

import {
    GET_USER,
    UPDATE_USER,
} from 'constants.js';

import { setCurrentUser, updateUser as updateUserAction } from 'actions';


function* getUser({uid, userData}) {
    window._FIREBASE_DB_.ref('/users/' + uid)
        .on('value', (snapshot) => {
            const user = snapshot.val();
            
            if (!user) {
                window._UI_STORE_.dispatch(updateUserAction({...userData, permissions: {basic: true}}));
            } else {
                window._UI_STORE_.dispatch(setCurrentUser(user));
            }
        });
    
    yield;
}

function* updateUser({userData}) {
    const currentUser = yield select(state => state.user);
    let cleanUser = {};

    if(!currentUser || !currentUser.uid) {
        cleanUser = {
            uid: userData.uid,
            displayName: userData.displayName,
            permissions: userData.permissions,
            email: userData.email,
        };
    } else {
        cleanUser = {...currentUser, ...userData};
    }
    
    window._FIREBASE_DB_.ref('users/' + cleanUser.uid)
        .set(cleanUser);
    
    yield;
}

export default function* () {
    yield [
        takeEvery(GET_USER, getUser),
        takeEvery(UPDATE_USER, updateUser),
    ];
}