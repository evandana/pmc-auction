import modal from './modal.js';
import user from './user.js';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    isLoggedIn,
    modal,
    user,
};

export default reducers;

// import {reducer as formReducer} from 'redux-form';

// reducers
// import login from './login'
// import auctions from './AuctionReducers'
// import users from './UserReducers'

// const rootReducer = combineReducers({
//   login,
//   auctions,
//   user,
//   users,
//   form: formReducer,
//   routing: routerReducer
// })

// export default rootReducer