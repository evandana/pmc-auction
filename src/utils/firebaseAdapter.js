import Firebase from 'firebase';

let Adapter = function Adapter () {

    let ref = new Firebase("https://pmc-auction.firebaseio.com"),
        auctionsRef = ref.child("auctions"),
        usersRef = ref.child("users"),
        configRef = ref.child("CONFIG");

    return {


        addNewUser (uid, userObj) {

            return new Promise( (resolve, reject) => {

                let firebaseCallback = (error) => {
                    if (!error) {
                        resolve(userObj);
                    } else {
                        console.log('Firebase threw error adding new user: ', error);
                    }
                };

                usersRef.child(uid)
                   .set(userObj, firebaseCallback);

            });
        },

        authCheck (callback) {
            ref.onAuth(callback);
        },

        getAllUsers () {
            return new Promise(function(resolve, reject) {
                usersRef.once('value', (snapshot) => { resolve(snapshot.val()) });
            });
        },

        getConfig () {
            return new Promise(function(resolve, reject) {
                configRef.once('value', (snapshot) => { resolve(snapshot.val()) });
            });
        },

        updateConfig (callback) {
            configRef.on('child_changed', (childSnapshot, prevChildKey) => {
                let updatedConfigProp = {};
                updatedConfigProp[childSnapshot.key()] = childSnapshot.val();
                callback(updatedConfigProp)
            });
        },

        addAuction (auctionObj, callback) {
            auctionsRef.push(auctionObj, callback);
        },

        loadAuctions (callback) {
            auctionsRef.on("child_added", (snapshot) => {
                let auction = snapshot.val();
                auction.id = snapshot.key();
                callback(auction);
            });
        },

        placeBid (bidObject, successCallback, failCallback) {
            console.log('firebase adapter', bidObject);
            // console.log('auctionsRef', auctionsRef);
            auctionsRef.child(bidObject.auctionId).child('bids').push(bidObject);
        },

        loginGoogle (successCallback, failCallback) {
            return ref.authWithOAuthRedirect("google", function(error, authData) {
                if (error) {
                    // console.log("Login Failed!", error);
                    return failCallback(error);
                } else {
                    // We'll never get here, as the page will redirect on success.
                    // console.log("Authenticated successfully with payload:", authData);
                    return successCallback(authData);
                }
            });
        },

        logoutUser () {
            ref.unauth();
            // document.location.reload(true);
        }

    }
};
export default new Adapter();
