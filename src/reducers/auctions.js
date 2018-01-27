import {
    SET_CURRENT_USER,

    AUTH_CHECK_REQUEST,
    AUTH_CHECK_RESPONSE,
    AUTH_FAIL,
    AUTH_SUCCESS,
    CONFIRM_WINNERS,
    CREATE_AUCTION_SUCCESS,
    GET_CONFIG_SUCCESS,
    HIDE_AUCTION_DETAIL,
    LOAD_AUCTION,
    LOCKDOWN_MODE,
    SET_USER,
    SHOW_AUCTION_DETAIL,
    UPDATE_AUCTION,
    UPDATE_AUCTIONS,
    UPDATE_CONFIG_SUCCESS,
    REFRESH_AUCTION,
    REFRESH_AUCTIONS,
} from '../constants'

const defaultAuctionState = {
    auctionCollection: [],
    // confirmedBids: [],
    // confirmWinnersSubmitDisable: true,
    // expandedAuction: {},
    bidTotal: 0,
    // selectedBids: [],
    // pendingConfirmationAuctionCollection: [],
    // confirmedAuctionCollection: [],
    // wonAuctionCollection: [],
    auctionsWithUserBids: [],
    user: {
        permissions: {},
        name: '',
        uid: '',
    },
};

function getAuctionsWithUserBids(userPersona, auctionCollection) {
    return auctionCollection
        // filter in any that have at least one bid by this user
        .filter(auction => {
            if (!!auction.bids && auction.bids.length) {
                return auction.bids.some(bid => {
                    return bid.bidderObj.persona === userPersona;
                });
            } else {
                return false;
            }
        })
        .map(auction => {

            let uniqueBids = filterBidsByUniqueBidder(auction.bids);

            let userHighBidValue = null;
            let userHighBidRank = null;
            let i = uniqueBids.length;
            let found = false;
            // assume bids are sorted, hence manual loop from top
            while (i-- && !found) {
                if (uniqueBids[i].bidderObj.persona === userPersona) {
                    found = true;
                    userHighBidValue = uniqueBids[i].bidAmount;
                    userHighBidRank = uniqueBids.length - i;
                }
                // else keep looping
            }
            return {
                bidCount: uniqueBids.length,
                countOffered: auction.numberOffered,
                highBid: auction.highestBid,
                owner: {
                    displayName: auction.owner.displayName,
                    uid: auction.owner.uid
                },
                title: auction.title,
                uid: auction.uid,
                userHighBidRank,
                userHighBidValue,
            }
            
        });
}

function getAuctionsOwned(userPersona, auctionCollection) {
    return auctionCollection
        .filter(auction => auction.owner.persona === userPersona)
        .map(auction => {
            auction.topBids = filterBidsByUniqueBidder(auction.bids)
            return auction;
        });
}

function filterBidsByUniqueBidder (bids) {
    let uniqueBidderList = [];
    return !bids ? [] : bids.filter(bid => {
        if (uniqueBidderList.indexOf(bid.bidderObj.persona) === -1) {
            uniqueBidderList.push(bid.bidderObj.persona)
            return true;
        } else {
            return false;
        }
    })
}

function getAuctionAggregations(state, auctionCollection) {

    const auctionsWithUserBids = !state.user.persona ? [] : getAuctionsWithUserBids(state.user.persona, auctionCollection);
    const auctionsOwned = !state.user.persona ? [] : getAuctionsOwned(state.user.persona, auctionCollection);

    // bidTotal: 0,
    // auctionsWithUserBids,
    
    // ownedAuctions, // only if user is a donor
    // confirmedBids: [], // only on auctions with user bids
    // confirmWinnersSubmitDisable: true,
    // expandedAuction: {}, 
    // selectedBids: [], // only on auctions with user bids
    // pendingConfirmationAuctionCollection: [], // only on auctions with user bids
    // confirmedAuctionCollection: [], // only on auctions with user bids
    // wonAuctionCollection: [], // only on auctions with user bids

    return {
        auctionsWithUserBids,
        auctionsOwned,
    }
}

function auctions(state = defaultAuctionState, action) {

    // deconstruct params
    const { 
        auctionCollection, 
        auctionUid,
        ...rest
    } = action;

    switch (action.type) {
        
        case SET_CURRENT_USER: 

            return {
                ...state,
                user: {...rest},
                ...getAuctionAggregations({...state, user: {...rest}}, state.auctionCollection),
            };    

        case REFRESH_AUCTIONS: 
            
            console.log('REDUCERS - auctions', auctionCollection)

            return {
                ...state,
                auctionCollection,
                ...getAuctionAggregations(state, auctionCollection),

                // confirmedBids: [],
                // confirmWinnersSubmitDisable: true,
                // expandedAuction: {},
                // selectedBids: [],
                // pendingConfirmationAuctionCollection: [],
                // confirmedAuctionCollection: [],
                // wonAuctionCollection: []
            };

        case CONFIRM_WINNERS:
            return state;

        case CREATE_AUCTION_SUCCESS:
            // console.log('create success');
            // TODO: clear form
            return state;

        case GET_CONFIG_SUCCESS:
            return {
                ...state, 
                config: action.data
            };

        case UPDATE_AUCTION:
            console.warn('UPDATE_AUCTION reducer not yet handled', state, action.auction);

            // // TODO: all of this should be refactored to only process the NEW action, not reprocess all auctions
            // let wonAuctionCollection = [];
            // let confirmedAuctionCollection = [];
            // let pendingConfirmationAuctionCollection = [];
            // let auctionsWithUserBids = [];
            // let mappedCollection = state.auctionCollection.map(auction => {

            //     if ( auction.bids.some(bid => bid.bidderObj.uid === state.auctions.user.uid) ) {
            //         auctionsWithUserBids.push({
            //             title: auction.title,
            //             highestBid: auction.highestBid,
            //             highestBidder: auction.bids[auction.bids.length - 1].bidderObj.persona,
            //         })
            //     }

            //     // if updated auction, then replace with new
            //     if (auction.uid === action.auction.uid) {

            //         // sort into owned confirmed and owned to be confirmed
            //         if (action.auction.donorId === state.userId) {
            //             if (action.auction.winningBids && action.auction.winningBids.length) {
            //                 confirmedAuctionCollection.push(processLoadedAuctionBids(action.auction));
            //             } else {
            //                 pendingConfirmationAuctionCollection.push(processLoadedAuctionBids(action.auction));
            //             }
            //         }

            //         // address won auctions
            //         if (action.auction.winningBids) {
            //             action.auction.winningBid = action.auction.winningBids.find(winningBid => {
            //                 return winningBid.bidderObj.uid === state.userId;
            //             });
            //             wonAuctionCollection.push(action.auction);
            //         }

            //         return action.auction;
            //     } else {

            //         // sort into owned confirmed and owned to be confirmed
            //         if (auction.donorId === state.userId) {
            //             if (auction.winningBids && auction.winningBids.length) {
            //                 confirmedAuctionCollection.push(auction);
            //             } else {
            //                 pendingConfirmationAuctionCollection.push(auction);
            //             }
            //         }

            //         // address won auctions
            //         if (auction.winningBids) {
            //             auction.winningBid = auction.winningBids.find(winningBid => {
            //                 return winningBid.bidderObj.uid === state.userId;
            //             });
            //             wonAuctionCollection.push(auction);
            //         }

            //         return auction;
            //     }
            // });

            return {
                ...state,
                // auctionCollection: mappedCollection,
                // confirmedAuctionCollection: confirmedAuctionCollection,
                // pendingConfirmationAuctionCollection: pendingConfirmationAuctionCollection,
                // wonAuctionCollection: wonAuctionCollection,
                // auctionsWithUserBids: auctionsWithUserBids,
            };

        case LOAD_AUCTION:
            console.log('LOAD_AUCTION reducer not yet handled')

            if (action.auction.donorId === state.userId) {
                let auctionWithBids = processLoadedAuctionBids(action.auction);
                let pendingConfirmationAuctionCollection = state.pendingConfirmationAuctionCollection;
                let confirmedAuctionCollection = state.confirmedAuctionCollection;
                let wonAuctionCollection = state.wonAuctionCollection;
                let auctionsWithUserBids = state.auctionsWithUserBids;

                if (action.auction.winningBids && action.auction.winningBids.length) {
                    confirmedAuctionCollection = [
                        ...confirmedAuctionCollection,
                        auctionWithBids
                    ]
                } else {
                    pendingConfirmationAuctionCollection = [
                        ...pendingConfirmationAuctionCollection,
                        auctionWithBids
                    ]
                }

                // address won auctions
                if (action.auction.winningBids) {
                    action.auction.winningBid = action.auction.winningBids.find(winningBid => {
                        return winningBid.bidderObj.uid === state.userId;
                    });
                    if (action.auction.winningBid) {
                        wonAuctionCollection.push(action.auction);
                    }
                }

                return {
                    ...state, 
                    auctionCollection: [
                        ...state.auctionCollection,
                        action.auction
                    ],
                    // bidTotal: state.bidTotal += auctionWithBids.bidTotal,
                    // confirmedAuctionCollection,
                    // pendingConfirmationAuctionCollection,
                    // wonAuctionCollection,
                    // auctionsWithUserBids,
                };
            } else {

                let wonAuctionCollection = state.wonAuctionCollection;

                // address won auctions
                if (action.auction.winningBids) {
                    action.auction.winningBid = action.auction.winningBids.find(winningBid => {
                        return winningBid ? winningBid.bidderObj.uid === state.userId : false;
                    });
                    if (action.auction.winningBid) {
                        wonAuctionCollection.push(action.auction);
                    }
                }

                return {
                    ...state,
                    auctionCollection: [
                        ...state.auctionCollection,
                        action.auction
                    ],
                    // wonAuctionCollection,
                };
            }

        case HIDE_AUCTION_DETAIL:

            return {
                ...state,
                expandedAuction: {}
            };

        // case AUTH_SUCCESS:
        //     console.log('AUTH_SUCCESS')
        //     return {
        //         ...state,
        //         // userId: action.user.uid
        //     };

        case SHOW_AUCTION_DETAIL:
            console.log('SHOW_AUCTION_DETAIL')

            const expandedAuction = state.auctionCollection.find(auction => {
                return auction.uid === auctionUid;
            });

            return {
                ...state, 
                expandedAuction
            };

        default:
            return state
    }
}

export default auctions;

function hasCheckedNonWinners(auctions) {
    let hasCheckedNonWinners = false;
    auctions.forEach((auction, index) => {
        Object.keys(auction.bids).forEach((bidId, index) => {
            if (auction.bids[bidId].checked && !auction.bids[bidId].winner) {
                hasCheckedNonWinners = true;
            }
        });
    });
    return hasCheckedNonWinners;
}

function filterUniqueBidders(bids) {

    let uniqueBids = [],
        uniqueBidsObj = {};

    if (bids && Object.keys(bids).length) {


        Object.keys(bids).forEach((bidId, index) => {

            let curBid = bids[bidId];

            if (!uniqueBids.length) {
                // console.log("empty list auto add");
                uniqueBids.push(bidId);
            } else {
                let matchBidderIndex = uniqueBids.findIndex(
                    ubidId => bids[ubidId].bidderObj.uid === curBid.bidderObj.uid
                );
                if (matchBidderIndex !== -1) {
                    // console.log("There is a matching Bidder Bid at", bids[uniqueBids[matchBidderIndex]].bidAmount);
                    if (curBid.bidAmount > bids[uniqueBids[matchBidderIndex]].bidAmount) {
                        // console.log("But the matching bid is less, so replace with current bid", curBid.bidAmount);
                        uniqueBids[matchBidderIndex] = bidId;
                    } else {
                        // console.log("And matching bid is more, so ignore current bid ", curBid.bidAmount)
                    }
                } else {

                    if (uniqueBids.length < 5) {
                        // console.log("This bidder is unique and less than 5 unique bids so auto add");
                        uniqueBids.push(bidId);
                    } else {
                        // console.log("This bidder is unique but unique bids maxxed at ", uniqueBids.length);
                        let lowestBid;

                        uniqueBids.forEach(ubidId => {
                            if (!lowestBid) {
                                lowestBid = ubidId;
                            } else {
                                if (bids[ubidId].bidAmount < bids[lowestBid].bidAmount) {
                                    lowestBid = ubidId;
                                }
                            }
                        });

                        if (bids[bidId].bidAmount > bids[lowestBid].bidAmount) {
                            // console.log("but this bid is higher than lowest bid of "+bids[lowestBid].bidAmount+", so remove lowest and add this one")
                            uniqueBids[uniqueBids.indexOf(lowestBid)] = bidId;
                        } else {
                            // console.log("lowest bid of "+bids[lowestBid].bidAmount+" is higher than this, ignore.")
                        }
                    }
                }
            }
        });
    }

    uniqueBids.sort((a, b) => {
        if (bids[a].bidAmount < bids[b].bidAmount) {
            return 1;
        }
        if (bids[a].bidAmount > bids[b].bidAmount) {
            return -1;
        }
        return 0;
    });

    uniqueBids.forEach(bidId => {
        uniqueBidsObj[bidId] = bids[bidId];
    });

    return uniqueBidsObj;
}

function processLoadedAuctionBids(auction) {
    auction.bidTotal = 0;
    auction.bids = filterUniqueBidders(auction.bids);
    if (auction.bids && auction.bids) {
        Object.keys(auction.bids).forEach(bidId => {
            auction.bidTotal += auction.bids[bidId].bidAmount;
            auction.bids[bidId].checked = true;
            auction.bids[bidId].winner = true;
        })
    }

    return auction;
}