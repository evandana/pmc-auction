// react and redux 
import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import {
    FETCH_AUCTIONS,
    LOAD_AUCTION
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
        default:
            return state;
    }
}

const rootReducer = combineReducers({
  auctions,
  routing: routerReducer
})

export default rootReducer