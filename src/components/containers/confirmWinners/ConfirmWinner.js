// Libraries
import React, { Component } from 'react'

import ConfirmDialog from '../../confirmDialog/ConfirmDialog'

// MATERIAL UI!!!
import {
    Checkbox,
    Dialog,
    RaisedButton,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
    } from 'material-ui';

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

    clearTotalSelectedInDom(auctionId) {
        let el = document.querySelector('.title-amount-' + auctionId);
        if (el) {
            el.innerHTML = '';
        }
    }

    setTotalSelectedInDom(selectedBidIndices, auctionId) {

        let selectedItemsTotal = this.getSelectedItemsTotal(selectedBidIndices);

        let el = document.querySelector('.title-amount-' + auctionId);
        el.innerHTML = '- $' + selectedItemsTotal + ' raised';
    }

    handleToggle (selectedBidIndices, auctionId) {

        this.setTotalSelectedInDom(selectedBidIndices, auctionId)

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

        this.clearTotalSelectedInDom(auction.id);

        return (
            <div
                className="confirm-block"
            >
                <Table
                    selectable={true}
                    multiSelectable={true}
                    onRowSelection={(selectedBidIndices) => {
                        this.handleToggle(selectedBidIndices, auction.id);
                    }}
                >
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn style={style.title}>
                            <h3>
                                {auction.title}
                                <span className={'confirm-winners__combined-amount title-amount-' + auction.id}></span>
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