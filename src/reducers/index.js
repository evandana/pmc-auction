// react and redux
import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// reducers
import login from './login'
import auctions from './AuctionReducers'

const rootReducer = combineReducers({
  auctions,
  login,
  routing: routerReducer
})

export default rootReducer