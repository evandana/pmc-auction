import Firebase from 'firebase';

let Adapter = function Adapter () {
    
    let ref = new Firebase("https://pmc-auction.firebaseio.com"),
        auctionsRef = ref.child("auctions"),
        usersRef = ref.child("users");
    
    return {

        addAuction (auctionObj) {
            auctionsRef.push(auctionObj);
        },
        
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

        loadAuctions (callback) {
            auctionsRef.on("child_added", (snapshot) => {
                let auction = snapshot.val();
                auction.id = snapshot.key();
                callback(auction); 
            });
        },

        loginGoogle () {
            ref.authWithOAuthRedirect("google", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
            });
        },
        
        logoutUser () {
            ref.unauth();
            document.location.reload(true);
        }
        
    }
};
export default new Adapter();
