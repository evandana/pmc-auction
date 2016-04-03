// react and redux
import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import {
    FETCH_AUCTIONS,
    LOAD_AUCTION,
    PLACE_BID,
    TOGGLE_AUCTION_DETAIL
} from '../actions/AuctionActions'

import {
    REQUEST_ROUTE_CHANGE
} from '../actions/AuthActions'

function login(state = { user : {} }, action ) {
    switch (action.type) {
        case REQUEST_ROUTE_CHANGE:
            console.log('REQUESTED ROUTE CHANGE state', state);
            return state;
            break;
        default:
            return state;
    }
}

function auctions(state = { auctionCollection : [] }, action) {
    switch (action.type) {
        case LOAD_AUCTION:
            return Object.assign({}, state, {
                auctionCollection: [
                    ...state.auctionCollection,
                    action.auction
                ]
            });
        case PLACE_BID:
            console.log("Place Bid")
            return state
        case TOGGLE_AUCTION_DETAIL:
            console.log("Toggle Auction State")
            return state
        default:
            return state;
    }
}

const rootReducer = combineReducers({
  auctions,
  login,
  routing: routerReducer
})

export default rootReducer