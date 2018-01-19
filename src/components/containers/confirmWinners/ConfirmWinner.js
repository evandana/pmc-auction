// Libraries
import React, { Component } from 'react'

import ConfirmDialog from '../../confirmDialog/ConfirmDialog'

// MATERIAL UI!!!
import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';

import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';

// Styles
import './ConfirmWinners.scss';

class ConfirmWinner extends Component {

    constructor(props) {
        super(props);

        this.selections = []

        this.state = {
            selections: []
        }
    }

    getSelectedItemsTotal(selectedBidIndices) {
        // console.log('bids', this.props.auction.bids);

        let bidIndexCollection = Object.keys( this.props.auction.bids );
        let totalSelected = 0;

        let bidValues = selectedBidIndices.map( bidIndex => {
            return this.props.auction.bids[ bidIndexCollection[ bidIndex ] ].bidAmount
        });

        if ( bidValues.length > 0 ) {
            totalSelected = bidValues.reduce( (prevVal, currVal) => {
                return prevVal + currVal;
            });
        }

        return totalSelected;
    }

    clearTotalSelectedInDom(auctionUid) {
        let el = document.querySelector('.title-amount-' + auctionUid);
        if (el) {
            el.innerHTML = '';
        }
    }

    setTotalSelectedInDom(selectedBidIndices, auctionUid) {

        let selectedItemsTotal = this.getSelectedItemsTotal(selectedBidIndices);

        let el = document.querySelector('.title-amount-' + auctionUid);
        el.innerHTML = '- $' + selectedItemsTotal + ' raised';
    }

    handleToggle (selectedBidIndices, auctionUid) {

        this.setTotalSelectedInDom(selectedBidIndices, auctionUid)

        this.selections = selectedBidIndices;
    }

    getSelections() {
        return this.selections;
    }

    handleChange (event) {
        this.setState({height: event.target.value});
    }

    render () {
        let auction = this.props.auction;

        const style = {
            doubleColumn: {
                colSpan: 2
            },
            title: {
                fontSize: 16,
                color: 'black'
            }
        }

        this.clearTotalSelectedInDom(auction.uid);

        return (
            <div
                className="confirm-block"
            >
                <Table
                    selectable={true}
                    multiSelectable={true}
                    onRowSelection={(selectedBidIndices) => {
                        this.handleToggle(selectedBidIndices, auction.uid);
                    }}
                >
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn style={style.title}>
                            <h3>
                                {auction.title}
                                <span className={'confirm-winners__combined-amount title-amount-' + auction.uid}></span>
                            </h3>
                        </TableHeaderColumn>
                        <TableHeaderColumn>
                              <ConfirmDialog
                                primary={true}
                                label="Confirm"
                                auction={auction}
                                auctionOwner={this.props.auctionOwner}
                                getSelections={() => { return this.getSelections() }}
                            />
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
                        {Object.keys(auction.bids).map( (bidId) =>
                        <TableRow key={'bidId-'+bidId}>
                            <TableRowColumn>{'$' + auction.bids[bidId].bidAmount}</TableRowColumn>
                            <TableRowColumn>{auction.bids[bidId].bidderObj.name}</TableRowColumn>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        );

    }

}

export default ConfirmWinner