import AppDispatcher from 'AppDispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import AuctionConstants from 'constants/AuctionConstants';
import Immutable from 'immutable';
import rw from 'utils/firebaseAdapter';
import UserStore from 'stores/UserStore';

let AuctionStore,
    _changeEvent = 'ON_CHANGE',
    _auctions = loadData([]),
    AuctionRecord = Immutable.Record(require("json!../stubs/auctions/auctionRecord.json"));


AuctionStore = assign({}, EventEmitter.prototype, {rwAdapter: rw}, {

    addChangeListener : (callback) => { AuctionStore.on(_changeEvent, callback); },
    
    dispatcherIndex: AppDispatcher.register( function(dispatch) {
        let actionType = dispatch.action.actionType;

        switch(actionType) {
            case AuctionConstants.ADD_AUCTION:
                addAuction(dispatch.action.auctionData);
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
    }),

    emitChange : () => { AuctionStore.emit(_changeEvent); },

    getAll : () => _auctions,
    
    initialize () {

        UserStore.rwAdapter.loadAuctions(AuctionStore.loadAuctionObj);

    },
    
    loadAuctionObj (auctionObj) {
        _auctions = _auctions.push(new AuctionRecord(auctionObj));
        AuctionStore.emitChange();
    },

    sortByCol : (colIndex) => sortByColumn(colIndex)
    
});

export default AuctionStore;

function addAuction(auctionObj) {
    
     let user = UserStore.getUser();
     
     assign(auctionObj, {
         donorId: user.uid,
         donorName: user.name,
         highestBid: null,
         expiration: "12/31/2016",
         openDate: "01/30/2016",
         closeDate: "12/31/2016",
     });
     
     AuctionStore.rwAdapter.addAuction(auctionObj);
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

function toggleAuctionRow(list, id) {
    list = list.update(
        list.findIndex( (obj, index) => obj.get('id') === id),
        (item) => item.get('detailState') === 'CLOSED' ? item.set('detailState', 'OPEN') :
            item.set('detailState', 'CLOSED')
    );
    return list
}
