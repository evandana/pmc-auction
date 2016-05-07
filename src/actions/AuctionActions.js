// firebase read/write adapter
import firebase from '../utils/firebaseAdapter'

import assign from 'object-assign';

export const ADD_AUCTION = 'ADD_AUCTION'
export const CLEAR_AUCTION_DETAIL = 'CLEAR_AUCTION_DETAIL'
export const CONFIRM_WINNERS = 'CONFIRM_WINNERS'
export const CONFIRM_BID_TOGGLE = 'CONFIRM_BID_TOGGLE'
export const CREATE_AUCTION = 'CREATE_AUCTION'
export const CREATE_AUCTION_ERROR = 'CREATE_AUCTION_ERROR'
export const CREATE_AUCTION_SUCCESS = 'CREATE_AUCTION_SUCCESS'
export const FETCH_AUCTIONS = 'FETCH_AUCTIONS'
export const HIDE_AUCTION_DETAIL = 'HIDE_AUCTION_DETAIL'
export const LOAD_AUCTION = 'LOAD_AUCTION'
export const PLACE_BID = 'PLACE_BID'
export const SHOW_AUCTION_DETAIL = 'SHOW_AUCTION_DETAIL'
export const UPDATE_AUCTION = 'UPDATE_AUCTION'

export function auctionPushErrorHandler (error) {
    if (error) {
        // console.log('AUCTION CREATION ERROR', error)
        return { type: CREATE_AUCTION_ERROR, error }
    } else {
        // console.log('AUCTION CREATED SUCCESSFULLY')
        return { type: CREATE_AUCTION_SUCCESS }
    }
}

export function confirmBidToggle (auctionId, bidId) {
    return {
        type: CONFIRM_BID_TOGGLE,
        bidId,
        auctionId
    };
}

export function confirmAuctionWinners (auction, winningBidsCollection, auctionOwner) {
    // TODO: do I need a dispatch here? it works without it
    //, () => { dispatch({ type: CONFIRM_WINNERS }) }
    return firebase.updateWinningBid(auction, winningBidsCollection, auctionOwner)
}

export function createAuction (fields, user) {

    let auction = assign({}, fields, {
        donorId: user.uid,
        donorName: user.name,
        highestBid: null,
        expiration: fields.expiration || "12/31/2016",
        openDate: "01/30/2016",
        closeDate: "12/31/2016"
    });

    // console.log("CREATING AUCTION", auction)

    return dispatch => {
        firebase.addAuction(auction,
            error => dispatch(auctionPushErrorHandler(error))
        )
    }

}

export function updateAuctions() {
    return dispatch => {
        firebase.updateAuctions( auction => dispatch(updateAuctionObj(auction)) )
    }
}

export function updateAuctionObj(auction) {
    // console.log('update auction action', auction)
    return {
        type: UPDATE_AUCTION,
        auction
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

export function placeBid(bidDetails) {
    return dispatch => {
        firebase.placeBid(
            bidDetails,
            () => {console.log('bid success')},
            () => {console.log('bid fail')}
        )
    }
}

export function placeBidObj (bidDetails) {
    return assign({}, bidDetails, {
        type: PLACE_BID,
        auctionId: bidDetails.auctionId,
        bidAmount: bidDetails.bidAmount,
        bidderObj: bidDetails.bidderObj
    });
}

export function toggleAuctionDetail(auctionId) {
    if (auctionId) {
        return {
            type: SHOW_AUCTION_DETAIL,
            auctionId
        }
    } else {
        return {
            type: HIDE_AUCTION_DETAIL
        }
    }

}

export function clearAuctionDetail() {
    return {
        type: CLEAR_AUCTION_DETAIL
    }
}