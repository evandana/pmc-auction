import AppDispatcher from 'AppDispatcher';
import AuctionConstants from 'constants/AuctionConstants';

let AuctionActions = {
    
    addAuction: function() {
        AppDispatcher.handleViewAction({
            actionType: AuctionConstants.ADD_AUCTION
        })
    },
    
    toggleAuctionRow: function(id) {
        AppDispatcher.handleViewAction({
            actionType: AuctionConstants.TOGGLE_AUCTION_ROW,
            id: id
        })
    },
    
    // View Actions
    sortByCol: function(key, order) {
        AppDispatcher.handleViewAction({
            actionType: AuctionConstants.SORT_BY_COL,
            key: key,
            order: order
        });
    },
    
    // Data Actions
    socketUpdate: function(data) {
        AppDispatcher.handleDataAction({
            actionType: AuctionConstants.SOCKET_UPDATE,
            data: data
        });
    }

};

export default AuctionActions;
