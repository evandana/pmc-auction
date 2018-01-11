// firebase read/write adapter
import firebase from '../utils/firebaseAdapter'

export const REQUEST_USERS = 'REQUEST_USERS'
export const LOAD_USERS = 'LOAD_USER'
export const UPDATE_USER = 'UPDATE_USER'


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

export function updateUserNotes(userId, notes) {
    return dispatch => {
        firebase.updateUserNotes(userId, notes).then().then( user => dispatch(updateUserObj(user)))
    }
}

export function updateUserPaidAmt(userId, amt) {
    return dispatch => {
        firebase.updateUserPaidAmt(userId, amt).then().then( user => dispatch(updateUserObj(user)))
    }
}

export function updateUserObj(user) {
    // console.log('action', user)
    return {
        type: UPDATE_USER,
        user
    }
}