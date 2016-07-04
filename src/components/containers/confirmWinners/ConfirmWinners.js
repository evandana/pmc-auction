// Libraries
import React, { Component } from 'react'

import ConfirmWinner from './ConfirmWinner'

// MATERIAL UI!!!
import { 
    Checkbox,
    Dialog,
    List, 
    ListItem,  
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