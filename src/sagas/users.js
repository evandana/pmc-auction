import { takeEvery } from 'redux-saga/effects';

import {
    FETCH_USERS,
} from '../constants';

import { setUsers } from 'actions';

function* fetchUsers() {

    // use public info to get uid for accessing protected info
    window._FIREBASE_DB_.ref('/users')
        // .orderBy('displayName')
        .on('value', (snapshot) => {
            const usersData = snapshot.val();

            const users = Object.keys(usersData).map(user => usersData[user]);

            window._UI_STORE_.dispatch(setUsers(users))
        });

    yield;
}


export default function* () {
    yield [
        takeEvery(FETCH_USERS, fetchUsers),
    ];
}