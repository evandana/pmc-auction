import {
    // AUTHENTICATION
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,

    // USER
    GET_USER,
    UPDATE_USER,
    SET_CURRENT_USER,
    SHOW_LOGIN_SPINNER,

    // ALL USERS
    FETCH_USERS,
    SET_USERS,

    // MODALS
    OPEN_MODAL,

    // CONFIG
    FETCH_CONFIG,
    REFRESH_CONFIG,

    // RAFFLE
    DEBOUNCE_REFRESH_RAFFLES,
    PERSIST_RAFFLE_UPDATE,
    FETCH_RAFFLES,
    REFRESH_RAFFLES,

    // AUCTIONS
    ASYNC_FORM_STATUS_UPDATE,
    BIDDER_BID_CONFIRMATION,
    CREATE_AUCTION,
    FETCH_AUCTIONS,
    GET_AUCTIONS,
    LOAD_AUCTION,
    OWNER_BID_CONFIRMATION,
    PLACE_BID,
    REFRESH_AUCTION,
    REFRESH_AUCTIONS,
    DEBOUNCE_REFRESH_AUCTIONS,
    SET_CLAIM_STEP,
    SUBMIT_SPECIAL_CODE,
    OWNER_BID_CONTACTED,
    OWNER_BID_PLANNED,
    // FILE UPLOAD
    FETCH_IMAGES,
    SET_IMAGES,
    UPLOAD_IMAGE,

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

export function showLoginSpinner(showLoginSpinner) {
    return {
        type: SHOW_LOGIN_SPINNER,
        showLoginSpinner,
    }
}

/** ALL USERS */

export function getUsers() {
    return {
        type: FETCH_USERS,
    }
}

export function setUsers(users) {
    return {
        type: SET_USERS,
        users,
    }
}

/** SPECIAL CODE */

export function submitSpecialCode({formData, user, codeKey, codePermission}) {
    return {
        type: SUBMIT_SPECIAL_CODE,
        formData,
        user,
        codeKey,
        codePermission,
    }
}

/** ASYNC FORM */

export function asyncFormStatusUpdate({statusObj}) {
    return {
        type: ASYNC_FORM_STATUS_UPDATE,
        statusObj,
    }
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

/** RAFFLES */
export function fetchRaffles() {
    return {
        type: FETCH_RAFFLES
    }
}

export function refreshRaffles(raffles) {
    return {
        type: REFRESH_RAFFLES,
        raffles,
    }
}
export function debounceRefreshRaffles(raffles) {
    return {
        type: DEBOUNCE_REFRESH_RAFFLES,
        raffles,
    }
}

export function persistRaffleUpdate(userInputData, user) {

    const raffleData = {
        ...userInputData,
    };

    return {
        type: PERSIST_RAFFLE_UPDATE,
        raffleData,
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
export function debounceRefreshAuctions(auctionCollection) {
    return {
        type: DEBOUNCE_REFRESH_AUCTIONS,
        auctionCollection,
    }
}

export function ownerBidConfirmation({ownerConfirmed, bid, topBidIndex,  auctionUid}) {
    return {
        type: OWNER_BID_CONFIRMATION,
        ownerConfirmed,
        bid,
        topBidIndex,
        auctionUid,
    }
}

export function bidderBidConfirmation({bidderConfirmed, bid, topBidIndex,  auctionUid}) {
    return {
        type: BIDDER_BID_CONFIRMATION,
        bidderConfirmed,
        bid,
        topBidIndex,
        auctionUid,
    }
}

export function ownerBidContacted ({contacted, bid, topBidIndex, auctionUid}) {
    return {
        type: OWNER_BID_CONTACTED,
        contacted,
        bid,
        topBidIndex,
        auctionUid,
    }
}

export function ownerBidPlanned ({planned, bid, topBidIndex, auctionUid}) {
    return {
        type: OWNER_BID_PLANNED,
        planned,
        bid,
        topBidIndex,
        auctionUid,
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
        image: '',
        ...userInputData,
        highestBid: 0,
        owner: {
            googleUid: user.googleUid,
            persona: user.persona,
            displayName: user.displayName,
        },
    };

    return {
        type: CREATE_AUCTION,
        auctionData,
    }

}

export function fetchImages() {
    return { type: FETCH_IMAGES };
}

export function uploadImage (file) {
    return {
        file,
        type: UPLOAD_IMAGE,
    };
}

export function setImages(images) {
    return {
        images,
        type: SET_IMAGES,
    };
}

export function setClaimStep({claimStep, bid, auctionUid}) {
    return {
        type: SET_CLAIM_STEP,
        claimStep,
        bid,
        auctionUid,
    }
}