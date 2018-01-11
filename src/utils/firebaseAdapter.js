import firebaseApp from './firebaseInit';

let Adapter = function Adapter () {

    let ref = firebaseApp.database(),
        auctionsRef = ref.ref("auctions"),
        usersRef = ref.ref("users"),
        configRef = ref.ref("CONFIG");

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

        updateUserPaidAmt (userId, amt) {
            return usersRef.child(userId).update({paidAmt: amt}).then( () => {
                // TODO: need to use snapshot instead
                return usersRef.child(userId);
            })
        },

        updateUserNotes (userId, notes) {
            return usersRef.child(userId).update({notes: notes}).then( () => {
                // TODO: need to use snapshot instead
                return usersRef.child(userId);
            })
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

        updateAuctions (callback) {
            auctionsRef.on("child_changed", (snapshot) => {
                let auction = snapshot.val();
                auction.id = snapshot.key();
                callback(auction);
            });
        },

        updateWinningBid(auction, winningBids, auctionOwner) {
            return new Promise( (resolve, reject) => {
                auctionsRef.child(auction.id).update({
                    winningBids: winningBids,
                    auctionOwner: auctionOwner
                }, error => {
                    if (error) {
                        reject("Data could not be saved." + error);
                    } else {
                        resolve("Data saved successfully.");
                    }
                });
            })
        },

        placeBid (bidObject, successCallback, failCallback) {
            // console.log('firebase adapter', bidObject);
            // add bid
            auctionsRef.child(bidObject.auctionId).child('bids').push(bidObject);
            // update highest bid for auction item
            auctionsRef.child(bidObject.auctionId).update({highestBid: bidObject.bidAmount});
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
            }, {
                scope: "email"
            });
        },

        logoutUser () {
            ref.unauth();
            // document.location.reload(true);
        }

    }
};
export default new Adapter();
