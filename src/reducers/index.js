// react and redux
import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import login from './login'

import {
    FETCH_AUCTIONS,
    LOAD_AUCTION,
    PLACE_BID,
    TOGGLE_AUCTION_DETAIL
} from '../actions/AuctionActions'

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