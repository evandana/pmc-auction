import moment from 'moment';

import { takeEvery, take, cancel, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
    BIDDER_BID_CONFIRMATION,
    CREATE_AUCTION,
    DEBOUNCE_REFRESH_AUCTIONS,
    FETCH_AUCTIONS,
    OWNER_BID_CONFIRMATION,
    OWNER_BID_CONTACTED,
    OWNER_BID_PLANNED,
    PLACE_BID,
    SET_CLAIM_STEP,
    UPDATE_AUCTION,
} from '../constants';

import { refreshAuctions, debounceRefreshAuctions as debounceFetchAuctionsAction, buyRaffleTickets, updateSnackbar } from '../actions';


// debounce refresh auctions to prevent extraneous refreshes during a bidding spree
function* debouncedRefreshAuctions({ auctionCollection }) {
    yield window._UI_STORE_.dispatch(refreshAuctions(auctionCollection));
};

function* fetchAuctions() {
    window._FIREBASE_DB_.ref('/auctions')
        .on('value', (snapshot) => {
            let auctions = snapshot.val();

            auctions = !auctions ? [] : Object.keys(auctions)
                .map(key => {
                    let auction = auctions[key];
                    auction.uid = key;

                    return auction;
                })
                .sort((a, b) => {

                    const aVal = (a.commercialValue || 1) * a.numberOffered;
                    const bVal = (b.commercialValue || 1) * b.numberOffered;

                    // highest first
                    // then nulls
                    if (!aVal) {
                        return 1;
                    } else if (!bVal) {
                        return -1;
                    } else if (aVal === bVal) {
                        return 0;
                    } else if (aVal < bVal) {
                        return 1;
                    } else if (aVal > bVal) {
                        return -1;

                    } else {
                        return 0;
                    }
                });

            // debounce refresh auctions to prevent extraneous refreshes during a bidding spree
            window._UI_STORE_.dispatch(debounceFetchAuctionsAction(auctions));
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
                
                let updates = {};
                
                // will trigger an update to that auction

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

                auction.bids = !auction.bids ? {} : auction.bids;

                // set bid as key based on persona
                auction.bids[bidDetails.bidderObj.uid] = bid;
                
                // bid
                updates['/auctions/' + bidDetails.auctionUid] = auction;

                updates['users/' + bidDetails.bidderObj.uid + '/bids/'+ bidDetails.auctionUid + '--' + bidDetails.bidAmount] = moment(new Date()).format('MMM Do h:mm:ssa');

                window._FIREBASE_DB_.ref()
                    .update(updates)
                    .then( () => {
                        // count bids and add a new ticket if at 5
                        window._FIREBASE_DB_.ref('/users/' + bidDetails.bidderObj.uid)
                            .once('value', (snapshot) => {
                                const user = snapshot.val();

                                const bidCount = !user.bids ? 0 : Object.keys(user.bids).length;

                                if (bidCount % 5 === 0 && user.permissions.attendee) {
                                    // add a new ticket
                                    window._UI_STORE_.dispatch(buyRaffleTickets({count:1, user, freebie: true}))
                                    window._UI_STORE_.dispatch(updateSnackbar({open: true, message: 'You earned 1 raffle ticket!'}));
                                }

                            });
                    });


            }
            // else: invalid bid => do nothing

        });

    yield;
}

function* ownerBidConfirmation({ ownerConfirmed, bid, topBidIndex, auctionUid }) {

    let updatedBidObj = {
        ...bid,
        ownerConfirmed,
    };

    if (topBidIndex === 0) {
        updatedBidObj.bidderConfirmed = true;
    }

    window._FIREBASE_DB_.ref('auctions/' + auctionUid + '/bids/' + bid.bidderObj.uid)
        .set(updatedBidObj);

    yield;
}

function* bidderBidConfirmation({ bidderConfirmed, bid, topBidIndex, auctionUid }) {

    let updatedBidObj = {
        ...bid,
        bidderConfirmed,
    };

    window._FIREBASE_DB_.ref('auctions/' + auctionUid + '/bids/' + bid.bidderObj.uid)
        .set(updatedBidObj);

    yield;
}

function* ownerBidContacted({ contacted, bid, topBidIndex, auctionUid }) {

    let updatedBidObj = {
        ...bid,
        contacted,
    };

    window._FIREBASE_DB_.ref('auctions/' + auctionUid + '/bids/' + bid.bidderObj.uid)
        .set(updatedBidObj);

    yield;
}

function* ownerBidPlanned({ planned, bid, topBidIndex, auctionUid }) {

    let updatedBidObj = {
        ...bid,
        planned,
    };

    window._FIREBASE_DB_.ref('auctions/' + auctionUid + '/bids/' + bid.bidderObj.uid)
        .set(updatedBidObj);

    yield;
}

function* updateAuction({ auctionData }) {
    window._FIREBASE_DB_.ref('auctions/' + auctionData.uid)
        .set(auctionData);

    yield;
}

function* setClaimStep({ claimStep, bid, auctionUid }) {

    let updatedBidObj = {
        ...bid,
        claimStep,
    };

    window._FIREBASE_DB_.ref('auctions/' + auctionUid + '/bids/' + bid.bidderObj.uid)
        .set(updatedBidObj);

    yield;
}

function* createAuction({ auctionData }) {

    const updates = {};
    const auctionUid = auctionData.uid || (auctionData.owner.persona + '-' + auctionData.title).replace(/[^\w\d-]/g,'').substr(0, 15).toLowerCase();
    updates['auctions/' + auctionUid] = {
        owner: {},
        bids: [],
        title: '',
        subTitle: '',
        location: '',
        useBy: '',
        image: '',
        referenceLink: '',
        openingBid: 15,
        highestBid: 0,
        bidIncrement: 5,
        numberOffered: 1,
        commercialValue: 0,
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
        // debounce refresh auctions to prevent extraneous refreshes during a bidding spree
        debounceFor(DEBOUNCE_REFRESH_AUCTIONS, debouncedRefreshAuctions, 500),

        // normal saga actions
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

// copied from, and credit to: https://github.com/madewithlove/redux-saga-debounce-effect/blob/master/src/debounceFor.js
function* debounceFor(pattern, saga, ms, ...args) {
    function* delayedSaga(action) {
        yield call(delay, ms);
        yield call(saga, action, ...args);
    }

    let task;
    while (true) {
        const action = yield take(pattern);
        if (task) {
            yield cancel(task);
        }

        task = yield fork(delayedSaga, action);
    }
}