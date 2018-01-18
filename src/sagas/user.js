import { select, takeEvery } from 'redux-saga/effects';

import adjectiveList from 'static/persona-adjectives'
import animalList from 'static/persona-animals'

import {
    GET_USER,
    UPDATE_USER,
} from '../constants';

import { setCurrentUser, updateUser as updateUserAction } from 'actions';
import { querystring } from '@firebase/util';


function* getUser({ googleUserData }) {
    // use public info to get uid for accessing protected info
    window._FIREBASE_DB_.ref('/publicUserInfo')
        .once('value', (snapshot) => {
            const publicUserInfo = snapshot.val();

            const publicUserKey = Object.keys(publicUserInfo).find(uid => publicUserInfo[uid].googleUid === googleUserData.googleUid);
            const publicUser = publicUserInfo[publicUserKey];

            if (publicUser && publicUser.uid) {
                // if user *should* be found in user db

                // access data protected strictly by db rules
                window._FIREBASE_DB_.ref('/users/' + publicUser.uid)
                    .on('value', (snapshot) => {
                        const user = snapshot.val();

                        if (user && !!user.persona) {
                            window._UI_STORE_.dispatch(setCurrentUser(user));

                            if (!!user.persona && !publicUser.persona) {
                                // assume all data already set, just need persona in publicUsers
                                window._UI_STORE_.dispatch(updateUserAction({
                                    ...user,
                                    persona: user.persona
                                }));
                            }
                        } else {
                            // triggers updateUser method below
                            window._UI_STORE_.dispatch(updateUserAction({
                                ...googleUserData, // googleUid, displayName, email
                                ...user,
                                uid: publicUser.uid,
                                persona: generateUserPersona(),
                                permissions: { basic: true }
                            }));
                        }
                    }, err => {
                        window._UI_STORE_.dispatch(updateUserAction({
                            ...googleUserData, // googleUid, displayName, email
                            uid: publicUser.uid,
                            persona: generateUserPersona(),
                            permissions: { basic: true }
                        }));
                    }
                    );
            } else {

                window._UI_STORE_.dispatch(updateUserAction({
                    ...googleUserData, // googleUid, displayName, email
                    persona: generateUserPersona(),
                    permissions: { basic: true }
                }));
            }


        });

    yield;
}

function* updateUser({ userData }) {

    let uid = userData.uid || userData.googleUid;
    const personaUid = transformPersonaStringIntoUid(userData.persona);
    const updates = {};
    updates['users/' + personaUid] = {
        ...userData,
        uid: personaUid,
    };
    updates['publicUserInfo/' + personaUid] = {
        persona: userData.persona,
        googleUid: userData.googleUid,
        uid: personaUid,
    };

    window._FIREBASE_DB_.ref()
        .update(updates);

    yield;
}

export default function* () {
    yield [
        takeEvery(GET_USER, getUser),
        takeEvery(UPDATE_USER, updateUser),
    ];
}

function transformPersonaStringIntoUid (persona) {
    return persona.replace(' ','');
}

function generateUserPersona() {

    return adjectiveList[Math.floor(Math.random() * (adjectiveList.length))] +
        ' ' +
        animalList[Math.floor(Math.random() * (animalList.length))];
}