import Firebase from 'firebase';

let Adapter = function Adapter () {
    
    let ref = new Firebase("https://pmc-auction.firebaseio.com"),
        auctionsRef = ref.child("auctions");
    
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
            console.log("google in logging");
            ref.onAuth(function(data) {
                console.log("WE got the callback ", data);
            });
            ref.authWithOAuthRedirect("google", function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
            });
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
            
        }
    }
};
export default new Adapter();
