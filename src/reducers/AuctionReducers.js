import {
    CONFIRM_BID_TOGGLE,
    CONFIRM_WINNERS,
    FETCH_AUCTIONS,
    LOAD_AUCTION,
    UPDATE_AUCTION,
    PLACE_BID,
    HIDE_AUCTION_DETAIL,
    SHOW_AUCTION_DETAIL,
    CREATE_AUCTION_SUCCESS
} from '../actions/AuctionActions'

import {
    LOGIN_CONSTANTS
} from '../actions/LoginActions'

const defaultAuctionState = {
    auctionCollection : [],
    config : {},
    confirmedBids : [],
    confirmWinnersSubmitDisable: true,
    expandedAuction : {},
    ownedAuctionCollection: [],
    bidTotal: 0,
    selectedBids : [],
    userId : null

}

let _userId = null

function auctions(state = defaultAuctionState, action) {

    switch (action.type) {

        case CONFIRM_BID_TOGGLE:

            let auction = state.ownedAuctionCollection.find( auction => auction.id === action.auctionId)
            let bidObj = auction.bids[action.bidId]

            if (!bidObj.checked) {
                bidObj.checked = true
                auction.bidTotal += parseInt(bidObj.bidAmount, 10)
                state.bidTotal += parseInt(bidObj.bidAmount, 10)
            } else {
                bidObj.checked = false
                auction.bidTotal -= parseInt(bidObj.bidAmount, 10)
                state.bidTotal -= parseInt(bidObj.bidAmount, 10)
            }

            return Object.assign({}, state, {
                ownedAuctionCollection: [
                    ...state.ownedAuctionCollection
                ],
                confirmWinnersSubmitDisable: !hasCheckedNonWinners(state.ownedAuctionCollection),
                bidTotal: state.bidTotal
            });

        case CONFIRM_WINNERS:
            return state;

        case CREATE_AUCTION_SUCCESS:
            // console.log('create success');
            // TODO: clear form
            return state;

        case LOGIN_CONSTANTS.GET_CONFIG_SUCCESS:
            return Object.assign({}, state, {
                config : action.data
            });

        case UPDATE_AUCTION:
            // console.log('auction reducers', state, action.auction);

            if (action.auction.donorId === state.userId) {
//                let auctionWithBids = processLoadedAuctionBids(action.auction);

                let mappedCollection = state.auctionCollection.map( auction => {
                    // if updated auction, then replace with new
                    if (auction.id === action.auction.id) {
                        return action.auction;
                    } else {
                        return auction;
                    }
                });

                let ownedCollection = state.ownedAuctionCollection.map( auction => {
                    // if updated auction, then replace with new
                    if (auction.id === action.auction.id) {
                        return processLoadedAuctionBids(action.auction);
                    } else {
                        return auction;
                    }
                });

                return Object.assign({}, state, {
                    auctionCollection: mappedCollection,
                    ownedAuctionCollection : ownedCollection
                });
            } else {
                return Object.assign({}, state, {
                    auctionCollection: state.auctionCollection.map( auction => {
                        // if updated auction, then replace with new
                        if (auction.id === action.auction.id) {
                            return action.auction;
                        } else {
                            return auction;
                        }
                    })
                });
            }



        case LOAD_AUCTION:

            if (action.auction.donorId === state.userId) {
                let auctionWithBids = processLoadedAuctionBids(action.auction);
                let ownList = state.ownedAuctionCollection.slice()
                //let newStateTotal = 0;

                // Object.keys(action.auction.winningBids).forEach( bidId => {
                //     newStateTotal += action.auction.bids[bidId].bidAmount;
                // });

                ownList = [
                    ...ownList,
                    auctionWithBids
                ]

                return Object.assign({}, state, {
                    auctionCollection: [
                        ...state.auctionCollection,
                        action.auction
                    ],
                    bidTotal: state.bidTotal += auctionWithBids.bidTotal,
                    ownedAuctionCollection : ownList

                });
            } else {
                return Object.assign({}, state, {
                    auctionCollection: [
                        ...state.auctionCollection,
                        action.auction
                    ]
                });
            }

        // case PLACE_BID:

        //     console.log('place bid reducer', action);
        //     return state;

        case HIDE_AUCTION_DETAIL:

            return Object.assign({}, state, {
                expandedAuction: {}
            });

        case LOGIN_CONSTANTS.AUTH_SUCCESS:
            return Object.assign({}, state, {
                userId: action.user.uid
            });

        case SHOW_AUCTION_DETAIL:

            const expandedAuction = state.auctionCollection.find( auction => {
                return auction.id === action.auctionId;
            });

            return Object.assign({}, state, {
                expandedAuction: expandedAuction
            });

        default:
            return state
    }
}

export default auctions

function hasCheckedNonWinners(auctions) {
    let hasCheckedNonWinners = false;
    auctions.forEach( (auction, index) => {
        Object.keys(auction.bids).forEach( (bidId, index) => {
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


        Object.keys(bids).forEach( (bidId, index) => {

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

                        uniqueBids.forEach( ubidId => {
                            if (!lowestBid) {
                                lowestBid = ubidId;
                            } else {
                                if( bids[ubidId].bidAmount < bids[lowestBid].bidAmount ) {
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

    uniqueBids.sort( (a,b) => {
        if (bids[a].bidAmount < bids[b].bidAmount) {
            return 1;
        }
        if (bids[a].bidAmount > bids[b].bidAmount) {
            return -1;
        }
        return 0;
    });

    uniqueBids.forEach( bidId => {
        uniqueBidsObj[bidId] = bids[bidId];
    });

    return uniqueBidsObj;
}

function processLoadedAuctionBids(auction) {
    auction.bidTotal = 0;
    auction.bids = filterUniqueBidders(auction.bids);
    // if (auction.bids) {
    //     let firstItem = auction.bids[Object.keys(auction.bids)[0]];
    //     firstItem.checked = true;
    //     auction.bidTotal += firstItem.bidAmount;
    // }
    if (auction.winningBids) {
        Object.keys(auction.winningBids).forEach( bidId => {
            auction.bidTotal += auction.bids[bidId].bidAmount;
            auction.bids[bidId].checked = true;
            auction.bids[bidId].winner = true;
        })
    }

    return auction;
}