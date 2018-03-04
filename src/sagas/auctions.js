import { takeEvery } from 'redux-saga/effects';

import {
    FETCH_AUCTION,
    FETCH_AUCTIONS,
    PLACE_BID,
    UPDATE_AUCTION,
    CREATE_AUCTION,
    OWNER_BID_CONFIRMATION,
    BIDDER_BID_CONFIRMATION,
    OWNER_BID_CONTACTED,
    OWNER_BID_PLANNED,
    SET_CLAIM_STEP,
} from '../constants';

import { refreshAuctions, refreshAuction } from '../actions';


function* fetchAuctions() {
    window._FIREBASE_DB_.ref('/auctions')
    .on('value', (snapshot) => {
        let auctions = snapshot.val();

        auctions = !auctions ? [] : Object.keys(auctions).map(key => {
            let auction = auctions[key];
            auction.uid = key;

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

function* placeBid(bidDetails) {
    
    window._FIREBASE_DB_.ref('/auctions/' + bidDetails.auctionUid)
    .once('value', (snapshot) => {
        
        const auction = snapshot.val();

            const incrementAmount = auction.incrementAmount || 5;
            const highestBid = auction.highestBid > 0 ? auction.highestBid : auction.openingBid;

            const validBid = !!auction.bids ? (bidDetails.bidAmount >= highestBid + incrementAmount) : bidDetails.bidAmount >= auction.openingBid;

            // if valid bid
            if (validBid) {

                // will trigger an update to that auction
                
                console.log('bidDetails', bidDetails)
                
                auction.highestBid = bidDetails.bidAmount;
                
                const bid = {
                    // auctionUid: bidDetails.auctionUid,
                    bidAmount: bidDetails.bidAmount,
                    bidderObj: {
                        name: bidDetails.bidderObj.displayName,
                        email: bidDetails.bidderObj.email,
                        persona: bidDetails.bidderObj.persona || bidDetails.bidderObj.displayName,
                        uid: bidDetails.bidderObj.uid,
                    }
                };

                if ( auction.bids ) {
                    auction.bids.push(bid);
                } else {
                    auction.bids = [bid];
                }
                
                // update highestBid
                window._FIREBASE_DB_.ref('auctions/' + bidDetails.auctionUid)
                    .set(auction); 
            } 
            // else: invalid bid => do nothing

        });
    
    yield;
}

function* ownerBidConfirmation({ownerConfirmed, bid, topBidIndex, allBidsIndex, auctionUid}) {
    
    let updatedBidObj = {
        ...bid,
        ownerConfirmed,
    };

    if (topBidIndex === 0) {
        updatedBidObj.bidderConfirmed = true;
    }
    
    delete updatedBidObj.allBidsIndex;
    
    window._FIREBASE_DB_.ref('auctions/' + auctionUid + '/bids/' + allBidsIndex)
        .set(updatedBidObj);
    
    yield;
}

function* bidderBidConfirmation({bidderConfirmed, bid, topBidIndex, allBidsIndex, auctionUid}) {
    
    let updatedBidObj = {
        ...bid,
        bidderConfirmed,
    };

    delete updatedBidObj.allBidsIndex;
    
    window._FIREBASE_DB_.ref('auctions/' + auctionUid + '/bids/' + allBidsIndex)
        .set(updatedBidObj);
    
    yield;
}

function* ownerBidContacted({contacted, bid, topBidIndex, allBidsIndex, auctionUid}) {
    
    let updatedBidObj = {
        ...bid,
        contacted,
    };

    delete updatedBidObj.allBidsIndex;
    
    window._FIREBASE_DB_.ref('auctions/' + auctionUid + '/bids/' + allBidsIndex)
        .set(updatedBidObj);

    yield;
}

function* ownerBidPlanned({planned, bid, topBidIndex, allBidsIndex, auctionUid}) {

    let updatedBidObj = {
        ...bid,
        planned,
    };

    // UI-only prop
    delete updatedBidObj.allBidsIndex;
    
    window._FIREBASE_DB_.ref('auctions/' + auctionUid + '/bids/' + allBidsIndex)
        .set(updatedBidObj);

    yield;
}

function* updateAuction({auctionData}) {
    window._FIREBASE_DB_.ref('auctions/' + auctionData.uid)
        .set(auctionData);
    
    yield;
}

function* setClaimStep({claimStep, bid, allBidsIndex, auctionUid}) {
    
    let updatedBidObj = {
        ...bid,
        claimStep,
    };

    // UI-only prop
    delete updatedBidObj.allBidsIndex;
    
    window._FIREBASE_DB_.ref('auctions/' + auctionUid + '/bids/' + allBidsIndex)
        .set(updatedBidObj);

    yield;
}

function* createAuction({auctionData}) {

    const updates = {};
    const auctionUid = auctionData.uid || ( auctionData.owner.persona + '-' + auctionData.title.substr(0,5) ).replace(/ /ig, '').toLowerCase();
    updates['auctions/' + auctionUid] = {
        owner: {},
        bids: [],
        title: '',
        subTitle: '',
        location: '',
        useBy: '',
        image: '',
        openingBid: 15,
        highestBid: 0,
        bidIncrement: 5,
        numberOffered: 1,
        description: '',
        show: false,
        featured: false,
        ...auctionData,
    };

    window._FIREBASE_DB_.ref()
        .update(updates);
    
    yield;
}


export default function* () {
    yield [
        takeEvery(FETCH_AUCTION, fetchAuction),
        takeEvery(FETCH_AUCTIONS, fetchAuctions),
        takeEvery(UPDATE_AUCTION, updateAuction),
        takeEvery(PLACE_BID, placeBid),
        takeEvery(CREATE_AUCTION, createAuction),
        takeEvery(OWNER_BID_CONFIRMATION, ownerBidConfirmation),
        takeEvery(BIDDER_BID_CONFIRMATION, bidderBidConfirmation),
        takeEvery(OWNER_BID_CONTACTED, ownerBidContacted),
        takeEvery(OWNER_BID_PLANNED, ownerBidPlanned),
        takeEvery(SET_CLAIM_STEP, setClaimStep),
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
//         auction.uid = snapshot.key();
//         callback(auction);
//     });
// },

// updateAuctions (callback) {
//     auctionsRef.on("child_changed", (snapshot) => {
//         let auction = snapshot.val();
//         auction.uid = snapshot.key();
//         callback(auction);
//     });
// },

// updateWinningBid(auction, winningBids, auctionOwner) {
//     return new Promise( (resolve, reject) => {
//         auctionsRef.child(auction.uid).update({
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
//     auctionsRef.child(bidObject.auctionUid).child('bids').push(bidObject);
//     // update highest bid for auction item
//     auctionsRef.child(bidObject.auctionUid).update({highestBid: bidObject.bidAmount});
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