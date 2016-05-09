// firebase read/write adapter
import firebase from '../utils/firebaseAdapter'

import assign from 'object-assign';

export const REQUEST_USERS = 'REQUEST_USERS'
export const LOAD_USERS = 'LOAD_USER'


export function fetchUsers() {
    return dispatch => {
        firebase.getAllUsers().then( users => dispatch(loadUsersObj(users)) )
    }
}

export function loadUsersObj(users) {
    return {
        type: LOAD_USERS,
        users
    }
}