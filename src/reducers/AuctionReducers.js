import {
    FETCH_AUCTIONS,
    LOAD_AUCTION,
    UPDATE_AUCTION,
    PLACE_BID,
    HIDE_AUCTION_DETAIL,
    SHOW_AUCTION_DETAIL,
    CREATE_AUCTION_SUCCESS
} from '../actions/AuctionActions'

const defaultAuctionState = {
    auctionCollection : [],
    expandedAuction : {}
}

function auctions(state = defaultAuctionState, action) {
    switch (action.type) {

        case CREATE_AUCTION_SUCCESS:
            // console.log('create success');
            // TODO: clear form
            return state;

        case UPDATE_AUCTION:
            // console.log('auction reducers', state, action.auction);

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

        case LOAD_AUCTION:

            return Object.assign({}, state, {
                auctionCollection: [
                    ...state.auctionCollection,
                    action.auction
                ]
            });

        case PLACE_BID:

            console.log('place bid reducer', action);
            return state;

        case HIDE_AUCTION_DETAIL:

            return Object.assign({}, state, {
                expandedAuction: {}
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