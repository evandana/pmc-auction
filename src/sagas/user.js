import { takeEvery } from 'redux-saga/effects';

import adjectiveList from './persona-adjectives'
import animalList from './persona-animals'

import {
    GET_USER,
    UPDATE_USER,
    SUBMIT_DONOR_CODE,
} from '../constants';

import { SubmissionError } from 'redux-form'

import { setCurrentUser, updateUser as updateUserAction, showLoginSpinner, asyncFormStatusUpdate, getUsers } from 'actions';

function* getUser({ googleUserData }) {

    window._UI_STORE_.dispatch(showLoginSpinner(true));

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
                            
                            if (!!user.persona && !publicUser.persona) {
                                // assume all data already set, just need persona in publicUsers
                                window._UI_STORE_.dispatch(updateUserAction({
                                    ...user,
                                    persona: user.persona
                                }));
                            } else {
                                // HAPPY PATH
                                // set user for the rest of the app
                                window._UI_STORE_.dispatch(setCurrentUser(user));

                                // get data only for admins
                                if (user.permissions.admin) {
                                    window._UI_STORE_.dispatch(getUsers());
                                }

                            }
                        } else {
                            // triggers updateUser method below for persona
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

                // not yet in the system
                const newPersona = generateUserPersona()

                window._UI_STORE_.dispatch(updateUserAction({
                    ...googleUserData, // googleUid, displayName, email
                    persona: newPersona,
                    permissions: { basic: true }
                }));

                // hook up listener for changes to user until they log in again
                window._FIREBASE_DB_.ref('/users/' + transformPersonaStringIntoUid(newPersona))
                .on('value', (snapshot) => {
                    const user = snapshot.val();

                    window._UI_STORE_.dispatch(setCurrentUser(user))
                });

            }


        });

    yield;
}

function* updateUser({ userData }) {

    const personaUid = transformPersonaStringIntoUid(userData.persona);
    const updates = {};
    updates['users/' + personaUid] = {
        ...userData,
        uid: personaUid,
    };
    updates['publicUserInfo/' + userData.googleUid] = {
        persona: userData.persona,
        googleUid: userData.googleUid,
        uid: personaUid,
    };

    window._FIREBASE_DB_.ref()
        .update(updates);

    yield;
}

function* submitDonorCode({formData, user}) {

    const personaUid = transformPersonaStringIntoUid(user.persona);

    const updatedPermissionsObj = {
        ...user.permissions,
        donor: true,
        donorCode: formData.donorCode,
    };

    window._FIREBASE_DB_.ref('users/' + personaUid + '/permissions/')
        .set(updatedPermissionsObj)
        .catch(err => {
            window._UI_STORE_.dispatch(asyncFormStatusUpdate({status: err.message, success: false}));
        });

    yield;

}


export default function* () {
    yield [
        takeEvery(GET_USER, getUser),
        takeEvery(UPDATE_USER, updateUser),
        takeEvery(SUBMIT_DONOR_CODE, submitDonorCode),
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