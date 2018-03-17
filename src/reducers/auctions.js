import {
    // user
    SET_CURRENT_USER,

    // auctions
    CONFIRM_WINNERS,
    CREATE_AUCTION_SUCCESS,
    REFRESH_CONFIG,
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
    config: {} // 
};

function getAuctionsWithUserBids(user, auctionCollection) {
    return auctionCollection
        // filter in any that have at least one bid by this user
        .filter(auction => {
            return !!auction.bids && auction.bids[user.uid]
        })
        .map(auction => {

            const uniqueBids = Object.keys(auction.bids)
                .map(personaAsBidKey => auction.bids[personaAsBidKey])
                .sort((a, b) => a.bidAmount < b.bidAmount);
            
                const allBidsIndex = uniqueBids.findIndex(bid => bid.bidderObj.uid === user.uid);

            let userHighBid = auction.bids && auction.bids[user.uid] ? auction.bids[user.uid] : null;
            let userHighBidRank = userHighBid ? allBidsIndex + 1 : null;
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
            };
            
        });
}

function getAuctionBidsAsArray(auction) {
    return !auction.bids || !Object.keys(auction.bids).length ? [] : Object.keys(auction.bids)
		.map(personaAsBidKey => auction.bids[personaAsBidKey]);
}

function getAuctionsOwned(userPersona, auctionCollection, config) {
    return auctionCollection
        .filter(auction => auction.owner.persona === userPersona)
        .map(auction => {
            auction.topBids = getAuctionBidsAsArray(auction)
                .sort((a, b) => {
                    if (a.bidAmount < b.bidAmount) {
                        return 1;
                    } else if (a.bidAmount > b.bidAmount) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
                .slice(0, auction.numberOffered + (config ? config.NUM_OFFERED_BUFFER : 2));
            return auction;
        });
}

function getAuctionAggregations(user, auctionCollection, config) {

    const auctionsWithUserBids = !user.persona ? [] : getAuctionsWithUserBids(user, auctionCollection);
    const auctionsOwned = !user.persona ? [] : getAuctionsOwned(user.persona, auctionCollection, config);

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
                ...getAuctionAggregations({...rest}, state.auctionCollection, state.config),
            };    

        case REFRESH_AUCTIONS: 

            return {
                ...state,
                auctionCollection,
                ...getAuctionAggregations(state.user, auctionCollection, state.config),
            };

        case CONFIRM_WINNERS:

            return state;

        case CREATE_AUCTION_SUCCESS:

            return state;
            
        case REFRESH_CONFIG:
            return {
                ...state, 
                ...getAuctionAggregations(state.user, state.auctionCollection, action.data),
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
