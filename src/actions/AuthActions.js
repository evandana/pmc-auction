// export const REQUEST_ROUTE_CHANGE = 'REQUEST_ROUTE_CHANGE'

// export function requestRouteChange(route) {
//     return {
//         type: REQUEST_ROUTE_CHANGE,
//         route
//     }
// }
import { hashHistory } from 'react-router'




export const REQUEST_ROUTE_CHANGE = 'REQUEST_ROUTE_CHANGE'

export function requestRouteChange(route, store) {

    let user = store.getState().login.user;
    console.log('requestRouteChange', user, !!user.username);

    if (route.pathname !== '/login' || user.username) {
        hashHistory.push('/login');
    }
}
