import { select, takeEvery } from 'redux-saga/effects';

import adjectiveList from 'static/persona-adjectives'
import animalList from 'static/persona-animals'

import {
    GET_USER,
    UPDATE_USER,
} from '../constants';

import { setCurrentUser, updateUser as updateUserAction } from 'actions';


function* getUser({ uid, userData }) {
    window._FIREBASE_DB_.ref('/users/' + uid)
        .on('value', (snapshot) => {
            const user = snapshot.val();

            if (user && !!user.persona) {
                window._UI_STORE_.dispatch(setCurrentUser(user));
            } else {
                // triggers updateUser method below
                window._UI_STORE_.dispatch(updateUserAction({
                    ...userData,
                    persona: generateUserPersona(),
                    permissions: { basic: true }
                }));
            }
        });

    yield;
}

function* updateUser({userData}) {
    window._FIREBASE_DB_.ref('users/' + userData.uid)
        .set(userData);

    yield;
}

export function* watchGetUser () {
    yield takeEvery(GET_USER, getUser);
}

export function* watchUpdateUser () {
    yield takeEvery(UPDATE_USER, updateUser);
}


function generateUserPersona() {

    return adjectiveList[Math.floor(Math.random() * (adjectiveList.length))] +
        ' ' +
        animalList[Math.floor(Math.random() * (animalList.length))];
}