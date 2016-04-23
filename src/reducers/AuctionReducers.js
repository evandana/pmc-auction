import {
    FETCH_AUCTIONS,
    LOAD_AUCTION,
    UPDATE_AUCTION,
    PLACE_BID,
    TOGGLE_AUCTION_DETAIL,
    CLEAR_AUCTION_DETAIL,
    CREATE_AUCTION_SUCCESS
} from '../actions/AuctionActions'

const defaultAuctionState = {
    auctionCollection : [],
    expandedAuctionIdList : []
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
        case CLEAR_AUCTION_DETAIL:
        case TOGGLE_AUCTION_DETAIL:

            // console.log('TOGGLE_AUCTION_DETAIL')
            if ( state.expandedAuctionIdList.includes(action.auctionId) ) {

                state.expandedAuctionIdList.splice(
                    state.expandedAuctionIdList.findIndex( element => element === action.auctionId ), 1
                )

                return Object.assign({}, state, {
                    expandedAuctionIdList: [...state.expandedAuctionIdList]
                });

            } else {

                return Object.assign({}, state, {
                    expandedAuctionIdList: [
                        ...state.expandedAuctionIdList,
                        action.auctionId
                    ]
                });
            }

        default:
            return state
    }
}

export default auctions