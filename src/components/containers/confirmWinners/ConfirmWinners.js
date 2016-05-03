// Libraries
import React from 'react';

import ConfirmDialog from 'components/confirmDialog/ConfirmDialog'

// MATERIAL UI!!!
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Checkbox from 'material-ui/lib/checkbox';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';

// Styles
import './ConfirmWinners.scss';
// Application Components

const ConfirmWinners = ({
    auctions,
    confirmWinnersSubmit,
    submitDisable,
    toggleBidConfirm,
    bidTotal}) => {

    let auctionList = auctions.map( (auction, index) =>
        <div className="confirm-winner-list-item-l" key={index}>
            <div className='confirm-winners-item title clearfix'>
                <div><ListItem primaryText={auction.title} /></div>
                <div><ListItem primaryText={'Auction Total:  $' + auction.bidTotal} /></div>
            </div>
            {Object.keys(auction.bids).map( (bid, bid_index) =>
            <div key={'b'+bid_index}>
                <div className='confirm-winners-item clearfix'>
                    <div><ListItem primaryText={'$' + auction.bids[bid].bidAmount} /></div>
                    <div><ListItem primaryText={auction.bids[bid].bidderObj.name} leftCheckbox={
                        <Checkbox
                            checked={auction.bids[bid].checked}
                            disabled={auction.bids[bid].winner}
                            onCheck={ evt => {
                                toggleBidConfirm(auction.id, bid)
                            }}
                        />
                    } /></div>
                </div>
            </div>
            )}
        </div>
    );

    return (
        <div className='confirm-winners-l'>
            <h3>Confirm Auction Winners</h3>
            <h4>Combined Auctions Total: ${bidTotal}</h4>
            <div>
                <List>
                    
                    <div className="confirm-winners-list">
                        {auctionList}
                    </div>
                    <div className="confirm-winners-submit-btn">
                        <ConfirmDialog
                            auctions={auctions}
                            confirmWinnersSubmit={confirmWinnersSubmit}
                            submitDisable={submitDisable}
                        />
                    </div>
                </List>
            </div>
        </div>
    )
}

export default ConfirmWinners