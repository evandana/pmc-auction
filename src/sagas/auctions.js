import { select, takeEvery } from 'redux-saga/effects';

import {
    FETCH_AUCTION,
    FETCH_AUCTIONS,
    PLACE_BID,
    UPDATE_AUCTION,
} from '../constants';

import { refreshAuctions, refreshAuction } from '../actions';


function* fetchAuctions() {
    window._FIREBASE_DB_.ref('/auctions')
    .on('value', (snapshot) => {
        let auctions = snapshot.val();

        auctions = !auctions ? [] : Object.keys(auctions).map(key => {
            let auction = auctions[key];
            auction.id = key;

            return auction;
        });

        window._UI_STORE_.dispatch(refreshAuctions(auctions));
    });
    yield;
}

function* fetchAuction({uid}) {
    window._FIREBASE_DB_.ref('/auctions/' + uid)
        .on('value', (snapshot) => {
            const auction = snapshot.val();
            
            window._UI_STORE_.dispatch(refreshAuction(uid, auction));
        });
    
    yield;
}

/**
 * bidDetails = {
 *   auctionId,
 *   bidAmount,
 *   bidderObj,
 * }
*/
function* placeBid(bidDetails) {

    window._FIREBASE_DB_.ref('/auctions/' + bidDetails.auctionId)
        .on('value', (snapshot) => {
            const auction = snapshot.val();

            const incrementAmount = auction.incrementAmount || 5;
            const highestBid = auction.highestBid > 0 ? auction.highestBid : auction.openingBid;

            // if valid bid
            if (bidDetails.bidAmount >= highestBid + incrementAmount) {

                auction.highestBid = bidDetails.bidAmount;

                // will trigger an update to that auction

                debugger;

                // update bid array
                window._FIREBASE_DB_.ref('auctions/' + auction.uid).child('bids')
                    .push(bidDetails);
                
                // update highestBid
                window._FIREBASE_DB_.ref('auctions/' + auction.uid)
                    .update(auction); 
            } 
            // else: invalid bid => do nothing

        });
    
    yield;
}

function* updateAuction({auctionData}) {
    const currentAuction = yield select(state => state.auction);
    let cleanAuction = {};

    if(!currentAuction || !currentAuction.uid) {
        cleanAuction = {
            uid: auctionData.uid,
            displayName: auctionData.displayName,
            permissions: auctionData.permissions,
            email: auctionData.email,
        };
    } else {
        cleanAuction = {...currentAuction, ...auctionData};
    }
    
    window._FIREBASE_DB_.ref('auctions/' + cleanAuction.uid)
        .set(cleanAuction);
    
    yield;
}

export default function* () {
    yield [
        takeEvery(FETCH_AUCTION, fetchAuction),
        takeEvery(FETCH_AUCTIONS, fetchAuctions),
        takeEvery(UPDATE_AUCTION, updateAuction),
        takeEvery(PLACE_BID, placeBid),
    ];
}




// export function confirmAuctionWinners (auction, winningBidsCollection, auctionOwner) {
//     // TODO: do I need a dispatch here? it works without it
//     //, () => { dispatch({ type: CONFIRM_WINNERS }) }
//     return firebase.updateWinningBid(auction, winningBidsCollection, auctionOwner)
// }

// export function createAuction (fields, user) {

//     let auction = Object.assign({}, fields, {
//         donorId: user.uid,
//         donorName: user.name,
//         highestBid: null,
//         expiration: fields.expiration || "12/31/2016",
//         openDate: "01/30/2016",
//         closeDate: "12/31/2016"
//     });

//     // console.log("CREATING AUCTION", auction)

//     return dispatch => {
//         firebase.addAuction(auction,
//             error => dispatch(auctionPushErrorHandler(error))
//         )
//     }

// }



// addAuction (auctionObj, callback) {
//     auctionsRef.push(auctionObj, callback);
// },

// loadAuctions (callback) {
//     auctionsRef.on("child_added", (snapshot) => {
//         let auction = snapshot.val();
//         auction.id = snapshot.key();
//         callback(auction);
//     });
// },

// updateAuctions (callback) {
//     auctionsRef.on("child_changed", (snapshot) => {
//         let auction = snapshot.val();
//         auction.id = snapshot.key();
//         callback(auction);
//     });
// },

// updateWinningBid(auction, winningBids, auctionOwner) {
//     return new Promise( (resolve, reject) => {
//         auctionsRef.child(auction.id).update({
//             winningBids: winningBids,
//             auctionOwner: auctionOwner
//         }, error => {
//             if (error) {
//                 reject("Data could not be saved." + error);
//             } else {
//                 resolve("Data saved successfully.");
//             }
//         });
//     })
// },

// placeBid (bidObject, successCallback, failCallback) {
//     // console.log('firebase adapter', bidObject);
//     // add bid
//     auctionsRef.child(bidObject.auctionId).child('bids').push(bidObject);
//     // update highest bid for auction item
//     auctionsRef.child(bidObject.auctionId).update({highestBid: bidObject.bidAmount});
// },

// export function placeBid(bidDetails) {
//     return dispatch => {
//         firebase.placeBid(
//             bidDetails,
//             () => {console.log('bid success')},
//             () => {console.log('bid fail')}
//         )
//     }
// }

// export function updateAuctions() {
//     return dispatch => {
//         firebase.updateAuctions( auction => dispatch(updateAuctionObj(auction)) )
//     }
// }

// export function updateAuctionObj(auction) {
//     // console.log('update auction action', auction)
//     return {
//         type: UPDATE_AUCTION,
//         auction
//     }
// }

// export function fetchAuctions() {
//     return dispatch => {
//         firebase.loadAuctions( auction => dispatch(loadAuctionObj(auction)) )
//     }
// }