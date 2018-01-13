import {
    // AUTHENTICATION
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,
    
    // USER
    GET_USER,
    UPDATE_USER,
    SET_CURRENT_USER,    

    // MODALS
    OPEN_MODAL,

    // PRODUCTS,
    GET_PRODUCTS,
    UPDATE_PRODUCTS,
    PLACE_ORDER,
    PLACE_ORDER_RESPONSE,
    CLEAR_ORDER_RESPONSES,
    CLEAR_PRODUCT_QUANTITIES,

    // ORDER META DATA
    UPDATE_MANAGER,
    UPDATE_BRANCH_NAME,
    
    // ORDERS,
    GET_ORDERS,
    UPDATE_ORDERS,
    TOGGLE_ORDER_DETAILS,
    REQUEST_UPDATE_ORDER,
    REQUEST_SORT_ORDER_TABLE,
    REQUEST_FILTER_ORDER_TABLE,

    // ROW EXPANSION
    TOGGLE_EXPAND_ALL_ROWS,

    // PRICE UPDATES
    UPDATE_QUANTITY,

} from '../constants';

/** AUTHENTICATION **/
export function loginGoogleRequest() {
    return { type: LOGIN_GOOGLE_REQUEST };
}

export function setCurrentUser(user) {
    const { email='', displayName='', permissions={}, uid=null } = user;
    return {
        email,
        displayName,
        permissions,
        uid,
        authInitiated: true,
        type: SET_CURRENT_USER,
    };
}

export function logoutUserRequest() {
    return {
        type: LOGOUT_USER_REQUEST,
    };
}

/** USER **/
export function getUser(uid, userData=null) {
    return {
        uid,
        userData,
        type: GET_USER,
    };
}

export function updateUser(userData) {
    return {
        userData,
        type: UPDATE_USER
    };
}

export function openLoginModal() {
    return {
        type: OPEN_MODAL,
    };
}


/** PRODUCTS */
export function getProducts(products) {
    return {
        type: GET_PRODUCTS,
        products
    };
}
export function updateProducts(products) {
    return {
        type: UPDATE_PRODUCTS,
        products
    };
}

export function placeOrder(products, orderMeta) {
    return {
        type: PLACE_ORDER,
        products,
        orderMeta,
    };
}

export function placeOrderResponse(response) {
    // let {status, code, response} = response;
    return {
        type: PLACE_ORDER_RESPONSE,
        response,
    }
}

export function clearOrderResponses(response) {
    return {
        type: CLEAR_ORDER_RESPONSES,
    }
}

export function clearProductQuantities() {
    return {
        type: CLEAR_PRODUCT_QUANTITIES,
    }
}



/** ORDER META DATA **/
export function updateManager(inputValue) {
    return {
        type: UPDATE_MANAGER,
        inputValue
    };
}

export function updateBranchName(inputValue) {
    return {
        type: UPDATE_BRANCH_NAME,
        inputValue
    };
} 

/** ORDERS */
export function getOrders(orders) {
    return {
        type: GET_ORDERS,
        orders
    };
}

export function updateOrders(orders) {
    return {
        type: UPDATE_ORDERS,
        orders
    };
}

export function toggleOrderDetails(row) {
    return {
        type: TOGGLE_ORDER_DETAILS,
        row,
    }
}

export function requestUpdateOrder(key, order) {
    return {
        type: REQUEST_UPDATE_ORDER,
        order,
        key,
    }
}

export function requestSortOrderTable(col) {
    return {
        type: REQUEST_SORT_ORDER_TABLE,
        col,
    };
}

export function requestFilterOrderTable(col, vals) {
    return {
        type: REQUEST_FILTER_ORDER_TABLE,
        col,
        vals,
    };
}


/** ROW EXPANSION **/
export function toggleExpandAllRows() {
    return {
        type: TOGGLE_EXPAND_ALL_ROWS
    };
} 

/** PRICE UPDATES **/
export function updateQuantity(productId, optionKey, quantity) {
    return {
        type: UPDATE_QUANTITY,
        productId, 
        optionKey, 
        quantity,
    };
} 