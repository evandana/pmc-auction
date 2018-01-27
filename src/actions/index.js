import {
    // AUTHENTICATION
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,

    // USER
    GET_USER,
    UPDATE_USER,
    SET_CURRENT_USER,

    // MODALS
    OPEN_MODAL,

    // CONFIG
    FETCH_CONFIG,
    REFRESH_CONFIG,

    // PRODUCTS,
    GET_PRODUCTS,
    UPDATE_PRODUCTS,

    // AUCTIONS
    OWNER_BID_CONFIRMATION,
    FETCH_AUCTION,
    FETCH_AUCTIONS,
    GET_AUCTIONS,
    HIDE_AUCTION_DETAIL,
    LOAD_AUCTION,
    PLACE_BID,
    REFRESH_AUCTIONS,
    REFRESH_AUCTION,
    SHOW_AUCTION_DETAIL,
    CREATE_AUCTION,

} from '../constants';

/** AUTHENTICATION **/
export function loginGoogleRequest() {
    return { type: LOGIN_GOOGLE_REQUEST };
}

/** USER **/
export function setCurrentUser(userData) {
    return {
        type: SET_CURRENT_USER,
        ...userData
    };
}

export function logoutUserRequest() {
    return {
        type: LOGOUT_USER_REQUEST,
    };
}

export function getUser(googleUserData = null) {
    return {
        type: GET_USER,
        googleUserData,
    };
}

export function updateUser(userData) {
    return {
        type: UPDATE_USER,
        userData,
    };
}

export function openLoginModal() {
    return {
        type: OPEN_MODAL,
    };
}

/** CONFIG */
export function fetchConfig() {
    return {
        type: FETCH_CONFIG
    }
}
export function refreshConfig(config) {
    return {
        type: REFRESH_CONFIG,
        config,
    }
}


/** AUCTIONS */
export function fetchAuctions() {
    return {
        type: FETCH_AUCTIONS
    }
}

export function getAuctions() {
    return {
        type: GET_AUCTIONS,
    };
}

export function refreshAuctions(auctionCollection) {
    return {
        type: REFRESH_AUCTIONS,
        auctionCollection,
    }
}

export function refreshAuction(uid, auction) {
    return {
        type: REFRESH_AUCTION,
        uid,
        auction,
    }
}

export function ownerBidConfirmation({ownerConfirmed, bid, topBidIndex, allBidsIndex, auctionUid}) {
    return {
        type: OWNER_BID_CONFIRMATION,
        ownerConfirmed,
        bid,
        topBidIndex,
        allBidsIndex,
        auctionUid,
    }
}

export function loadAuctionObj(auction) {
    return {
        type: LOAD_AUCTION,
        auction
    }
}

export function toggleAuctionDetail(auctionUid) {
    if (auctionUid) {
        return {
            type: SHOW_AUCTION_DETAIL,
            auctionUid
        }
    } else {
        return {
            type: HIDE_AUCTION_DETAIL
        }
    }
}

export function placeBid(bidDetails) {
    return Object.assign({}, bidDetails, {
        type: PLACE_BID,
        bidDetails
    });
}

export function createAuction(userInputData, user) {

    const auctionData = {
        ...userInputData,
        highestBid: 0,
        owner: {
            googleUid: user.googleUid,
            persona: user.persona,
            displayName: user.displayName,
        },
        image: '',
    };

    return {
        type: CREATE_AUCTION,
        auctionData,
    }

}