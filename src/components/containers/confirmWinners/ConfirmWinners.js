// Libraries
import React from 'react';

import ConfirmDialog from 'components/confirmDialog/ConfirmDialog'

// MATERIAL UI!!!
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

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


    let tableList = auctions.map( (auction, index) => {

        console.log('winningBids', auction.winningBids, auction);

        if (auction.winningBids) {
            return (
                <Table
                    key={'auctionWinner-' + index}
                    selectable={true}
                >
                        <TableHeader
                            adjustForCheckbox={false}
                        >
                          <TableRow>
                            <TableHeaderColumn colSpan="2">
                              {auction.title + ' - Confirm Total:  $' + auction.bidTotal}
                            </TableHeaderColumn>
                          </TableRow>
                          <TableRow>
                            <TableHeaderColumn>Bid Amount</TableHeaderColumn>
                            <TableHeaderColumn>Bidder Name</TableHeaderColumn>
                            <TableHeaderColumn>Bidder Email</TableHeaderColumn>
                          </TableRow>
                        </TableHeader>
                        <TableBody
                        >
                            {Object.keys(auction.winningBids).map( (bidId, bid_index) =>
                            <TableRow key={'b'+bid_index}>
                                <TableRowColumn>{'$' + auction.winningBids[bidId].bidAmount}</TableRowColumn>
                                <TableRowColumn>{auction.winningBids[bidId].bidderObj.name}</TableRowColumn>
                                <TableRowColumn>{auction.winningBids[bidId].bidderObj.email}</TableRowColumn>
                            </TableRow>
                            )}
                        </TableBody>
                </Table>
            );
        } else {
            return (
                <Table
                    key={'auctionConfirmation-' + index}
                    selectable={true}
                    multiSelectable={true}
                    onRowSelection={(bid) => {
                        toggleBidConfirm(auction.id, bid)
                    }}
                >
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn colSpan="2">
                          {auction.title + ' - Auction Total:  $' + auction.bidTotal}
                        </TableHeaderColumn>
                      </TableRow>
                      <TableRow>
                        <TableHeaderColumn>Bid Amount</TableHeaderColumn>
                        <TableHeaderColumn>Bidder</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody
                        deselectOnClickaway={false}
                    >
                        {Object.keys(auction.bids).map( (bid, bid_index) =>
                        <TableRow key={'b'+bid_index}>
                            <TableRowColumn>{'$' + auction.bids[bid].bidAmount}</TableRowColumn>
                            <TableRowColumn>{auction.bids[bid].bidderObj.name}</TableRowColumn>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            );
        }

    });


    let auctionList = auctions.map( (auction, index) => {

        if (auction.winningBids) {
            return (
                <div className="confirm-winner-list-item-l" key={index}>
                    <div className='confirm-winners-item title clearfix'>
                        <div><ListItem primaryText={auction.title} /></div>
                        <div><ListItem primaryText={'Confirmed Total:  $' + auction.bidTotal} /></div>
                    </div>
                    {Object.keys(auction.winningBids).map( (bid, bid_index) =>
                    <div key={'b'+bid_index}>
                        <div className='confirm-winners-item clearfix'>
                            <div><ListItem primaryText={'$' + auction.winningBids[bid].bidAmount} /></div>
                            <div><ListItem primaryText={auction.winningBids[bid].bidderObj.email} /></div>
                        </div>
                    </div>
                    )}
                </div>
            );
        } else {
            return (
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
        }

    });

    return (
        <div className='confirm-winners-l'>
            <h3>Confirm Auction Winners</h3>
            <h4>Combined Auctions Total (not working): ${bidTotal}</h4>
            <div>

                {tableList}

                <List>

                    <div className="confirm-winners-list">

                    </div>
                    <div className="confirm-winners-submit-btn">
                        <ConfirmDialog
                            auctions={auctions}
                            confirmWinnersSubmit={confirmWinnersSubmit}
                        />
                    </div>
                </List>
            </div>
        </div>
    )
}

export default ConfirmWinners