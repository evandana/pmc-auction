// react and redux
import { combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form';

// reducers
import login from './login'
import auctions from './AuctionReducers'

const rootReducer = combineReducers({
  auctions,
  login,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer