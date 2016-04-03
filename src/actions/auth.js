export const REQUEST_AUTH = 'REQUEST_AUTH'
export const REQUEST_ROUTE_CHANGE = 'REQUEST_ROUTE_CHANGE'

// export function requestAuth() {}

export function requestAuthorizeRouteChange(route) {
    console.log('route change requested')
    return {
        type: REQUEST_ROUTE_CHANGE,
        route: route
    }
}
export function requestCheckAuth(auth) {
    console.log('auth check requested')
    return {
        type: REQUEST_AUTH
    }
}

export function respondAuthorizeRouteChange(authorization) {
    console.log('route change response')
    return {
        type: REQUEST_ROUTE_CHANGE,
        isLoggedIn: authorization
    }
}
export function respondCheckAuth(auth) {
    console.log('auth check response')
    return {
        type: REQUEST_AUTH,
        isLoggedIn: auth
    }
}