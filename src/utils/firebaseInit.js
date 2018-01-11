import firebase from 'firebase';
import firebaseConfig from '../firebase.conf';

// Initialize firebase instance
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp;