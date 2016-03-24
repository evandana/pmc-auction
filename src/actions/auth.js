// import 'isomorphic-fetch';
// import { createAction } from 'redux-actions';
// import { pushState } from 'redux-router';
// import {
//   AUTH_LOAD_SUCCESS,
//   AUTH_LOGIN_REQUEST,
//   AUTH_LOGIN_SUCCESS,
//   AUTH_LOGIN_FAILURE,
//   AUTH_LOGOUT_SUCCESS
// } from '../constants';

// export function requestAuth() {
//   return (dispatch) => {
//     UserStore.rwAdapter.authCheck(callback);
//   };
// };


import fetch from 'isomorphic-fetch'

export function requestAuth() {



}

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

// export function selectReddit(reddit) {
//   return {
//     type: SELECT_REDDIT,
//     reddit
//   }
// }

// export function invalidateReddit(reddit) {
//   return {
//     type: INVALIDATE_REDDIT,
//     reddit
//   }
// }

// function requestPosts(reddit) {
//   return {
//     type: REQUEST_POSTS,
//     reddit
//   }
// }

// function receivePosts(reddit, json) {
//   return {
//     type: RECEIVE_POSTS,
//     reddit: reddit,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }

// function fetchPosts(reddit) {
//   return dispatch => {
//     dispatch(requestPosts(reddit))
//     return fetch(`https://www.reddit.com/r/${reddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(reddit, json)))
//   }
// }

// function shouldFetchPosts(state, reddit) {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }

// export function fetchPostsIfNeeded(reddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       return dispatch(fetchPosts(reddit))
//     }
//   }
// }












// export function login(data) {
//   return (dispatch) => {
//     dispatch(loginRequest(data));

//     fetch('/api/sessions', {
//       method: 'post',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }
//       return response.text();
//     })
//     .then((token) => {
//       window.localStorage.setItem('token', token);
//       dispatch(loginSuccess({ token }));
//       hashHistory.push('/auctions');
//     })
//     .catch((err) => {
//       dispatch(loginFailure(err));
//     });
//   };
// };

// export function logout() {
//   return (dispatch) => {
//     window.localStorage.removeItem('token');
//     dispatch(logoutSuccess());
//     hashHistory.push('/');
//   };
// };

// const loadAuthSuccess = createAction(AUTH_LOAD_SUCCESS, ({ token }) => ({ token }));
// const loginRequest = createAction(AUTH_LOGIN_REQUEST, (data) => data);
// const loginSuccess = createAction(AUTH_LOGIN_SUCCESS, ({ token }) => ({ token }));
// const loginFailure = createAction(AUTH_LOGIN_FAILURE, (err) => err);
// const logoutSuccess = createAction(AUTH_LOGOUT_SUCCESS);