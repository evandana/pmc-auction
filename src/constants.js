/** USER ACTIONS **/
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';

export const SHOW_LOGIN_SPINNER = 'SHOW_LOGIN_SPINNER';

/** LIST OF ALL USERS ACTIONS */
export const FETCH_USERS = 'FETCH_USERS';
export const SET_USERS = 'SET_USERS';

/** AUTHENTICATION **/
export const LOGIN_GOOGLE_REQUEST = 'LOGIN_GOOGLE_REQUEST';

/** CONFIG */
export const FETCH_CONFIG = 'FETCH_CONFIG';
export const REFRESH_CONFIG = 'REFRESH_CONFIG';

/** MODAL ACTIONS **/
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

/** PRODUCTS */
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
export const PLACE_ORDER = 'PLACE_ORDER';
export const CLEAR_PRODUCT_QUANTITIES = 'CLEAR_PRODUCT_QUANTITIES';

/** ORDERS */
export const GET_ORDERS = 'GET_ORDERS';
export const UPDATE_ORDERS = 'UPDATE_ORDERS';
export const TOGGLE_ORDER_DETAILS = 'TOGGLE_ORDER_DETAILS';
export const REQUEST_UPDATE_ORDER = 'REQUEST_UPDATE_ORDER';
export const REQUEST_SORT_ORDER_TABLE = 'REQUEST_SORT_ORDER_TABLE';
export const REQUEST_FILTER_ORDER_TABLE = 'REQUEST_FILTER_ORDER_TABLE';

/** RAFFLES */
export const PERSIST_RAFFLE_UPDATE = 'PERSIST_RAFFLE_UPDATE';
export const REFRESH_RAFFLES = 'REFRESH_RAFFLES';
export const FETCH_RAFFLES = 'FETCH_RAFFLES';
export const DEBOUNCE_REFRESH_RAFFLES = 'DEBOUNCE_REFRESH_RAFFLES';
export const BUY_RAFFLE_TICKETS = 'BUY_RAFFLE_TICKETS';
export const ENTER_RAFFLE_TICKET = 'ENTER_RAFFLE_TICKET';

/** AUCTIONS  */
export const BIDDER_BID_CONFIRMATION = 'BIDDER_BID_CONFIRMATION';
export const DEBOUNCE_REFRESH_AUCTIONS = 'DEBOUNCE_REFRESH_AUCTIONS';
export const FETCH_AUCTIONS = 'FETCH_AUCTIONS';
export const GET_AUCTIONS = 'GET_AUCTIONS';
export const OWNER_BID_CONFIRMATION = 'OWNER_BID_CONFIRMATION';
export const OWNER_BID_CONTACTED = 'OWNER_BID_CONTACTED';
export const OWNER_BID_PLANNED = 'OWNER_BID_PLANNED';
export const PLACE_BID = 'PLACE_BID';
export const REFRESH_AUCTION = 'REFRESH_AUCTION';
export const REFRESH_AUCTIONS = 'REFRESH_AUCTIONS';
export const SET_CLAIM_STEP = 'SET_CLAIM_STEP';
export const SUBMIT_SPECIAL_CODE = 'SUBMIT_SPECIAL_CODE';
export const UPDATE_AUCTION = 'UPDATE_AUCTION';
export const CONFIRM_WINNERS = 'CONFIRM_WINNERS'
export const CREATE_AUCTION = 'CREATE_AUCTION'

/* ASYNC */
export const ASYNC_FORM_STATUS_UPDATE = 'ASYNC_FORM_STATUS_UPDATE';
export const RESPONSE_CODE_SUCCESS = 200;
export const RESPONSE_CODE_FAIL = 400;
export const PLACE_ORDER_RESPONSE = 'PLACE_ORDER_RESPONSE';
export const CLEAR_ORDER_RESPONSES = 'CLEAR_ORDER_RESPONSES';

// old ?
export const AUTH_CHECK_REQUEST = 'AUTH_CHECK_REQUEST';
export const AUTH_CHECK_RESPONSE = 'AUTH_CHECK_RESPONSE';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOCKDOWN_MODE = 'LOCKDOWN_MODE';
export const SET_USER = 'SET_USER';
export const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS';
export const UPDATE_CONFIG_SUCCESS = 'UPDATE_CONFIG_SUCCESS';

/* FILE UPLOAD */
export const FETCH_IMAGES = 'FETCH_IMAGES';
export const SET_IMAGES = 'SET_IMAGES';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';