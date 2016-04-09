import {
    FETCH_AUCTIONS,
    LOAD_AUCTION,
    PLACE_BID,
    TOGGLE_AUCTION_DETAIL
} from '../actions/AuctionActions'

const defaultAuctionState = {
    auctionCollection : [],
    expandedAuctionIdList : []
}

function auctions(state = defaultAuctionState, action) {
    switch (action.type) {
        case LOAD_AUCTION:
            return Object.assign({}, state, {
                auctionCollection: [
                    ...state.auctionCollection,
                    action.auction
                ]
            });
        case PLACE_BID:
            console.log("Place Bid")
            return state
        case TOGGLE_AUCTION_DETAIL:

            console.log('TOGGLE_AUCTION_DETAIL')
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