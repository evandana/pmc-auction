import {
    // user
    SET_CURRENT_USER,

    // auctions
    CONFIRM_WINNERS,
    REFRESH_CONFIG,
    REFRESH_AUCTIONS,
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

function getAuctionsWithUserBids(user, auctionCollection, config) {
    return auctionCollection
        // filter in any that have at least one bid by this user
        .filter(auction => {
            return getAuctionBidsAsArray(auction)
                .sort((a, b) => {
                    if (a.bidAmount < b.bidAmount) {
                        return 1;
                    } else if (a.bidAmount > b.bidAmount) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
                .slice(0, auction.numberOffered + (config ? config.NUM_OFFERED_BUFFER : 2))
                .filter(bid => bid.bidderObj.uid === user.uid)
                .length;
        })
        .map(auction => {

            const uniqueBids = Object.keys(auction.bids)
                .map(personaAsBidKey => auction.bids[personaAsBidKey])
                .sort((a, b) => a.bidAmount < b.bidAmount);
            
                const allBidsIndex = uniqueBids.findIndex(bid => bid.bidderObj.uid === user.uid);

            let userHighBid = auction.bids && auction.bids[user.uid] ? auction.bids[user.uid] : null;
            let userHighBidRank = userHighBid ? allBidsIndex + 1 : null;

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

            return {
                ...auction,
                bidCount: uniqueBids.length,
                numberOffered: auction.numberOffered,
                highBid: auction.highestBid,
                owner: {
                    displayName: auction.owner.displayName,
                    uid: auction.owner.persona
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

function getAuctionsOwned(user, auctionCollection, config) {
    return auctionCollection
        .filter(auction => auction.owner.persona === user.persona)
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

function addTopBids(auctionCollection, config) {
    return auctionCollection.map(auction => {
        if (auction.topBids && auction.topBids.length) {
            return auction;
        } else {
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
        }
    })
}

function getAuctionAggregations(user, auctionCollection, config) {

    const auctionsWithUserBids = !user.persona ? [] : getAuctionsWithUserBids(user, auctionCollection, config);
    const auctionsOwned = !user.persona ? [] : getAuctionsOwned(user, auctionCollection, config);
    auctionCollection = addTopBids(auctionCollection, config);

    return {
        auctionsWithUserBids,
        auctionsOwned,
        auctionCollection,
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
            
        case REFRESH_CONFIG:
            return {
                ...state, 
                ...getAuctionAggregations(state.user, state.auctionCollection, action.data),
                config: action.data
            };

        default:
            return state
    }
}

export default auctions;
