// Libraries
import React, { Component } from 'react'

import ConfirmWinner from './ConfirmWinner'

// MATERIAL UI!!!
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

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