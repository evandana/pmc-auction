import { hashHistory } from 'react-router'
// firebase read/write adapter
import firebase from 'utils/firebaseAdapter'

export const LOGIN_CONSTANTS = {
    AUTH_CHECK_ERROR: 'AUTH_CHECK_ERROR',
    AUTH_CHECK_SUCCESS: 'AUTH_CHECK_SUCCESS',
    LOGIN_GOOGLE: 'LOGIN_GOOGLE',
    LOGIN_GOOGLE_ERROR: 'LOGIN_GOOGLE_ERROR',
    LOGIN_GOOGLE_SUCCESS: 'LOGIN_GOOGLE_SUCCESS',
    LOGOUT_USER: 'LOGOUT_USER',
    REQUEST_AUTH: 'REQUEST_AUTH',
    REQUEST_LOGIN_GOOGLE: 'REQUEST_LOGIN_GOOGLE',
    REQUEST_ROUTE_CHANGE: 'REQUEST_ROUTE_CHANGE'
}

export const LoginActions = {

    authCheck(user) {
        console.log('authCheck..............................................')
        // return firebase.authCheck( user => { console.log('success'); return this.authCheckSuccessObj(user) } )
        return dispatch => {
            firebase.authCheck( user => dispatch(this.authCheckSuccessObj(user)) )
        }
    },
    authCheckSuccessObj(user) {
        console.log('authCheckSuccessObj', user)
        return {
            type: LOGIN_CONSTANTS.AUTH_CHECK_SUCCESS,
            user
        }
    },

    requestRouteChange(route, store) {

        let user = store.getState().login.user;
        console.log('requestRouteChange', route, user, !!user.username);

        if (route.pathname !== '/login' || user.username) {

            // hashHistory.push('/login');
        } else {
            debugger;
        }
    },

    requestLoginGoogle(user) {
        // console.log('requestLoginGoogle', user, this.loginGoogleObj(user))
        return firebase.loginGoogle( user => { return dispatch(this.loginGoogleObj(user)) } )
        // return dispatch => {
        //     firebase.loginGoogle( auction => dispatch(this.loginGoogleObj(user)) )
        // }
    },
    // will never be called due to redirect
    // loginGoogleObj(user) {
    //     console.log('login object')
    //     return {
    //         type: LOGIN_CONSTANTS.LOGIN_GOOGLE_SUCCESS,
    //         user
    //     }
    // },

    logoutUser(user) {
        return {
            type: LOGIN_CONSTANTS.LOGOUT_USER,
            user
        }
    }
}

// -------------------------------------------------------

// // firebase read/write adapter
// import firebase from 'utils/firebaseAdapter'

// export const FETCH_AUCTIONS = 'FETCH_AUCTIONS'
// export const LOAD_AUCTION = 'LOAD_AUCTION'
// export const PLACE_BID = 'PLACE_BID'
// export const TOGGLE_AUCTION_DETAIL = 'TOGGLE_AUCTION_DETAIL'

// export function fetchAuctions() {
//     return dispatch => {
//         firebase.loadAuctions( auction => dispatch(loadAuctionObj(auction)) )
//     }
// }

// export function loadAuctionObj(auction) {
//     return {
//         type: LOAD_AUCTION,
//         auction
//     }
// }

// export function placeBid(auctionId, bidAmount) {
//     return {
//         type: PLACE_BID,
//         auctionId,
//         bidAmount
//     }
// }

// export function toggleAuctionDetail(auctionId) {
//     return {
//         type: TOGGLE_AUCTION_DETAIL,
//         auctionId
//     }
// }
