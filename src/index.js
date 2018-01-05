import { createStore, combineReducers, compose } from 'redux'
import * as firebase from 'firebase'
import 'firebase/firestore' // add this to use Firestore
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA3JKgI5y36_yDZUcL2JTFWaKKziF6ikgg",
    authDomain: "pmc-2018.firebaseapp.com",
    databaseURL: "https://pmc-2018.firebaseio.com",
    projectId: "pmc-2018",
    storageBucket: "pmc-2018.appspot.com",
    messagingSenderId: "606291690097",
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
//   useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  ...firebaseConfig
}

// initialize firebase instance
firebase.initializeApp(firebaseConfig) // <- new to v2.*.*

// initialize Firestore
firebase.firestore()

// Add reduxReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore)

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  firestore: firestoreReducer
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

const appProps = {
    history,
    store,
};

/** Launch the App **/
ReactDOM.render(<div {...appProps}  />, document.getElementById('root'));
registerServiceWorker();