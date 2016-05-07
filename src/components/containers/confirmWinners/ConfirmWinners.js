// Libraries
import React, { Component } from 'react'

import ConfirmWinner from './ConfirmWinner'

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

class ConfirmWinners extends Component {

    constructor(props) {
        super(props);
    }

    render () {

        let tableList = this.props.auctions.map( (auction) => {

            if (!auction.winningBids && auction.bids) {
                return (
                    <ConfirmWinner
                        auction={auction}
                        auctionOwner={this.props.auctionOwner}
                        key={'auctionWinner-' + auction.id}
                    >
                    </ConfirmWinner>
                );
            } else {
                return <div></div>
            }

        });

        if (this.props.auctions.length) {
            return (
                <div className='confirm-winners-l'>
                    <h4>Auctions you own</h4>
                    <div>
                        {tableList}
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }

}

export default ConfirmWinners;