import AppDispatcher from 'AppDispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import AuctionConstants from 'constants/AuctionConstants';
import Immutable from 'immutable';
import rw from 'utils/firebaseAdapter';

let _auctions,
    _auctionHeaders,
    AuctionStore,
    AuctionRecord,
    changeEvent = 'change',
    stubJSON = require("json!../stubs/auctions/auctions.json");

// define Auction Records
AuctionRecord = Immutable.Record(require("json!../stubs/auctions/auctionRecord.json"));

// stub the auction data
_auctions = loadData(stubJSON);
_auctionHeaders = getAuctionHeaders();

AuctionStore = assign({}, EventEmitter.prototype, {rwAdapter: rw}, {
    
    getAll : () => _auctions,
    
    getAllHeaders : () => _auctionHeaders,

    emitChange : () => { AuctionStore.emit(changeEvent); },

    addChangeListener : (callback) => { AuctionStore.on(changeEvent, callback); },

    sortByCol : (colIndex) => sortByColumn(colIndex),

    dispatcherIndex: AppDispatcher.register( function(dispatch) {
        let actionType = dispatch.action.actionType;

        switch(actionType) {
            case AuctionConstants.ADD_AUCTION:
                addAuction();
                break;
            case AuctionConstants.TOGGLE_AUCTION_ROW:
                _auctions = toggleAuctionRow(_auctions, dispatch.action.id);
                AuctionStore.emitChange();
                break;
            case AuctionConstants.SORT_BY_COL:
                _auctions = sortByColumn(_auctions, dispatch.action.key, dispatch.action.order);
                AuctionStore.emitChange();
                break;
            case AuctionConstants.SOCKET_UPDATE:
                _auctions = mergeData(_auctions, dispatch.action.data);
                AuctionStore.emitChange();
                break;
            default:
                //return true;
        }

        return true;
    })
});

export default AuctionStore;

function addAuction() {
     AuctionStore.rwAdapter.addAuction();
     
}

function toggleAuctionRow(list, id) {
    list = list.update(
        list.findIndex( (obj, index) => obj.get('id') === id),
        (item) => item.get('detailState') === 'CLOSED' ? item.set('detailState', 'OPEN') :
            item.set('detailState', 'CLOSED')
    );
    return list
}

function loadData(dataList) {
    let list = Immutable.List();
    dataList.forEach( (obj) => { list = list.push(new AuctionRecord(obj)); });
    return list;
}

function mergeData(list, data) {
    data.forEach( function(dataItem) {
        let index = list.findIndex( item => item.get('id') === dataItem.id );
        list = index !== -1 ? list.set(index, new AuctionRecord(dataItem)) :
            list.push(new AuctionRecord(dataItem));
    });
    return list;
}

// return copy of list sorted by shallow object key
function sortByColumn(list, key, direction) {
    let directionMap = {
            descend : [1, -1, 0],
            ascend : [-1, 1, 0]
        },
        sortValues = direction === 'descend' ?
            directionMap.descend : directionMap.ascend;

    return _auctions.sort( (a,b) => {
        if (a[key] < b[key]) {
            return sortValues[0];
        } else if (a[key] > b[key]) {
            return sortValues[1];
        } else {
            return sortValues[2];
        }
    });
}

function getAuctionHeaders() {
    return [
        {
            copy: 'Auction Item',
            key: 'title'
        },
        {
            copy: 'Highest Bid',
            key: 'highestBid'
        },
        {
            copy: 'Status',
            key: 'status'
        },
        {
            copy: 'Close Date',
            key: 'closeDate'
        }
    ];
}
