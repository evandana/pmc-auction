// firebase read/write adapter

import {
    ADD_AUCTION,
    CLEAR_AUCTION_DETAIL,
    CONFIRM_WINNERS,
    CONFIRM_BID_TOGGLE,
    CREATE_AUCTION,
    CREATE_AUCTION_ERROR,
    CREATE_AUCTION_SUCCESS,
    HIDE_AUCTION_DETAIL,
    LOAD_AUCTION,
    PLACE_BID,
    SHOW_AUCTION_DETAIL,
    UPDATE_AUCTION,
} from '../constants';


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

export function loadAuctionObj(auction) {
    return {
        type: LOAD_AUCTION,
        auction
    }
}

export function placeBidObj (bidDetails) {
    return Object.assign({}, bidDetails, {
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