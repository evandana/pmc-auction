import Firebase from 'firebase';

let Adapter = function Adapter () {
    
    let ref = new Firebase("https://pmc-auction.firebaseio.com"),
        auctionsRef = ref.child("auctions"),
        usersRef = ref.child("users");
    
    return {

        authCheck (callback) {
            ref.onAuth(callback);
        },
        
        auth () {
            ref.onAuth(function(data) {
                console.log("WE GOT THE DATA ", data);
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
        },
        
        addAuction () {
            auctionsRef.push({
                "donor" : [0],
                "title" : "Auction Record Template",
                "description" : "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
                "imageLink" : "images/pancakeBunny.png",
                "openingBid" : {
                    "id" : 0,
                    "donor" : 0,
                    "bidAmount" : 0
                },
                "highestBid" : 0,
                "location" : 0,
                "expiration" : "12/31/2016",
                "incrementAmount" : 1,
                "status" : "OPEN",
                "openDate" : "01/01/2016",
                "closeDate" : "12/31/2016",
            });
            
        },
        
        getAllUsers () {
            return new Promise(function(resolve, reject) {
                usersRef.once('value', (snapshot) => { resolve(snapshot.val()) });
            });
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

        }
    }
};
export default new Adapter();
