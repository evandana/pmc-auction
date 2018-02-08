import {
    // user
    SET_CURRENT_USER,

    // auctions
    CONFIRM_WINNERS,
    CREATE_AUCTION_SUCCESS,
    GET_CONFIG_SUCCESS,
    HIDE_AUCTION_DETAIL,
    REFRESH_AUCTIONS,
    SHOW_AUCTION_DETAIL,
    SHOW_LOGIN_SPINNER,
} from '../constants'

const defaultAuctionState = {
    auctionCollection: [],
    auctionsWithUserBids: [],
    auctionsOwned: [],
    user: {
        permissions: {},
        name: '',
        uid: '',
        showLoginSpinner: true,
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

            let userHighBid = null;
            let userHighBidRank = null;
            let i = uniqueBids.length;
            let found = false;
            // assume bids are sorted, hence manual loop from top
            while (i-- && !found) {
                if (uniqueBids[i].bidderObj.persona === userPersona) {
                    found = true;
                    userHighBid = uniqueBids[i];
                    userHighBidRank = i + 1;
                }
                // else keep looping
            }
            return {
                bidCount: uniqueBids.length,
                numberOffered: auction.numberOffered,
                highBid: auction.highestBid,
                owner: {
                    displayName: auction.owner.displayName,
                    uid: auction.owner.uid
                },
                title: auction.title,
                uid: auction.uid,
                userHighBid,
                userHighBidRank,
            }
            
        });
}

function getAuctionsOwned(userPersona, auctionCollection) {
    return auctionCollection
        .filter(auction => auction.owner.persona === userPersona)
        .map(auction => {
            auction.topBids = filterBidsByUniqueBidder(auction.bids)
                .slice(0, auction.numberOffered + 2);
            return auction;
        });
}

function filterBidsByUniqueBidder (bids) {
    let uniqueBidderList = [];
    return !bids ? [] : bids
        .map((bid, allBidsIndex) => {
            bid.allBidsIndex = allBidsIndex;
            return bid;
        })
        .filter(bid => {
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

    return {
        auctionsWithUserBids,
        auctionsOwned,
    }
}

function auctions(state = defaultAuctionState, action) {

    const { 
        auctionCollection, 
        auctionUid,
        showLoginSpinner,
        ...rest
    } = action;


    switch (action.type) {

        case SHOW_LOGIN_SPINNER: 
            return {
                ...state,
                user: {...state.user, showLoginSpinner}
            };

            break;
        
        case SET_CURRENT_USER: 

            return {
                ...state,
                user: {...rest},
                ...getAuctionAggregations({...state, user: {...rest}}, state.auctionCollection),
            };    

        case REFRESH_AUCTIONS: 

            return {
                ...state,
                auctionCollection,
                ...getAuctionAggregations(state, auctionCollection),
            };

        case CONFIRM_WINNERS:

            return state;

        case CREATE_AUCTION_SUCCESS:

            return state;

        case GET_CONFIG_SUCCESS:
            return {
                ...state, 
                config: action.data
            };

        case HIDE_AUCTION_DETAIL:

            return {
                ...state,
                expandedAuction: {}
            };

        case SHOW_AUCTION_DETAIL:

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
