import React, { Component } from 'react'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class DonorInfo extends Component {

    // curried function
    calcAmountEarned (auctionCollection) {
        return persona => {
            return auctionCollection
                // only owned auctionCollection
                .filter(auction => auction.owner.persona === persona)
                .reduce((sum, auction) => {
                    return sum + (!auction.topBids ? 0 : auction.topBids
                        // only confirmed bids
                        .filter(bid => bid.ownerConfirmed && bid.bidderConfirmed)
                        .reduce((bidSum, bid) => bidSum + bid.bidAmount, 0)
                    );
                }, 0);
        }
    }

    // curried function
    calcTotalAmountOwed (auctionCollection) {
        return persona => {
            return auctionCollection
                .reduce((sum, auction) => {
                    return sum + (!auction.topBids ? 0 : auction.topBids
                        // only owned bids
                        .filter(bid => bid.bidderObj.persona === persona)
                        // only confirmed bids
                        .filter(bid => bid.ownerConfirmed && bid.bidderConfirmed)
                        .reduce((bidSum, bid) => bidSum + bid.bidAmount, 0)
                    );
                }, 0);
        }
    }
    
    calcOwnedAuctions(auctionCollection) {
        return persona => {
            return auctionCollection
                // only owned auctionCollection
                .filter(auction => auction.owner.persona === persona)
                .map(auction => auction.title);
        }
    } 
    
    calcPendingAuctionConfirmations (auctionCollection) {
        return persona => {
            return auctionCollection
                // only owned auctionCollection
                .filter(auction => auction.owner.persona === persona)
                .reduce((arr, auction) => {
                    if (auction.topBids && auction.topBids
                        // only confirmed bids
                        .filter(bid => !bid.ownerConfirmed )
                        .length
                    ) {
                        arr.push(auction.title);
                    }
                    
                    return arr;
                }, []);
        }
    }
    
    calcPendingBidConfirmations (auctionCollection) {
        return persona => {
            return auctionCollection
                .reduce((agg, auction) => {
                    if (auction.topBids && auction.topBids
                        // only owned bids
                        .filter(bid => bid.bidderObj.persona === persona)
                        // only confirmed bids
                        .filter(bid => !bid.bidderConfirmed)
                        .length
                    ) {
                        agg.push(auction.title);
                    }

                    return agg;
                }, []);
        }
    }

    render() {

        const { users, auctionCollection } = this.props;
        
        // curried functions
        const calcAmountEarned = this.calcAmountEarned(auctionCollection);
        const calcTotalAmountOwed = this.calcTotalAmountOwed(auctionCollection);
        const calcOwnedAuctions = this.calcOwnedAuctions(auctionCollection);
        const calcPendingAuctionConfirmations = this.calcPendingAuctionConfirmations(auctionCollection);
        const calcPendingBidConfirmations = this.calcPendingBidConfirmations(auctionCollection);

        const style = {
            wordyCell: {
                whiteSpace: 'normal',
                wordWrap: 'break-word',
            }
        }

        return (
            <div className='page'>
                <div className='text-content'>
                    <h2>DonorInfo</h2>
                    <Table
                        selectable={false}
                        >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            >
                            <TableRow>
                                <TableHeaderColumn>Display name</TableHeaderColumn>
                                <TableHeaderColumn>Persona</TableHeaderColumn>
                                <TableHeaderColumn>GoogleUid</TableHeaderColumn>
                                <TableHeaderColumn>Email</TableHeaderColumn>
                                <TableHeaderColumn>Amount Earned</TableHeaderColumn>
                                <TableHeaderColumn>Total Owed</TableHeaderColumn>
                                <TableHeaderColumn>Remainder Due</TableHeaderColumn>
                                <TableHeaderColumn>Owned Auctions</TableHeaderColumn>
                                <TableHeaderColumn>Auctions Pending Confirmation</TableHeaderColumn>
                                <TableHeaderColumn>Bids Pending Confirmation</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            >
                            {users.all.map(user => {

                                const amountEarned = calcAmountEarned(user.persona) || 0;
                                const totalAmountOwed = calcTotalAmountOwed(user.persona) || 0;
                                const remainderDue = totalAmountOwed - (user.amountPaid || 0);
                                const ownedAuctions = calcOwnedAuctions(user.persona).join(', ');
                                const pendingAuctionConfirmations = calcPendingAuctionConfirmations(user.persona).join(', ');
                                const pendingBidConfirmations = calcPendingBidConfirmations(user.persona).join(', ');

                                return (
                                    <TableRow
                                        key={user.googleUid}
                                        style={remainderDue <= 0 ? {} : {color: '#f0f'}}
                                        >
                                        <TableRowColumn style={style.wordyCell}>{user.displayName}</TableRowColumn>
                                        <TableRowColumn style={style.wordyCell}>{user.persona}</TableRowColumn>
                                        <TableRowColumn >{user.googleUid}</TableRowColumn>
                                        <TableRowColumn >{user.email}</TableRowColumn>
                                        <TableRowColumn style={style.wordyCell}>${amountEarned}</TableRowColumn>
                                        <TableRowColumn style={style.wordyCell}>${totalAmountOwed}</TableRowColumn>
                                        <TableRowColumn style={style.wordyCell}><span
                                            >${remainderDue}</span></TableRowColumn>
                                        <TableRowColumn style={style.wordyCell}>{ownedAuctions}</TableRowColumn>
                                        <TableRowColumn style={style.wordyCell}>{pendingAuctionConfirmations}</TableRowColumn>
                                        <TableRowColumn style={style.wordyCell}>{pendingBidConfirmations}</TableRowColumn>
                                    </TableRow>
                                )}
                            )}
                        </TableBody>
                    </Table>

                </div>
            </div>
        );
    }

}

export default DonorInfo;
