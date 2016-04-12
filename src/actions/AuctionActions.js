// firebase read/write adapter
import firebase from '../utils/firebaseAdapter'

export const ADD_AUCTION = 'ADD_AUCTION'
export const FETCH_AUCTIONS = 'FETCH_AUCTIONS'
export const LOAD_AUCTION = 'LOAD_AUCTION'
export const PLACE_BID = 'PLACE_BID'
export const TOGGLE_AUCTION_DETAIL = 'TOGGLE_AUCTION_DETAIL'

export function addAuction (fields) {
    return {
        type: ADD_AUCTION,
        fields
    }
}

export function fetchAuctions() {
    return dispatch => {
        firebase.loadAuctions( auction => dispatch(loadAuctionObj(auction)) )
    }
}

export function loadAuctionObj(auction) {
    return {
        type: LOAD_AUCTION,
        auction
    }
}

export function placeBid(auctionId, bidAmount) {
    return {
        type: PLACE_BID,
        auctionId,
        bidAmount
    }
}

export function toggleAuctionDetail(auctionId) {
    return {
        type: TOGGLE_AUCTION_DETAIL,
        auctionId
    }
}
