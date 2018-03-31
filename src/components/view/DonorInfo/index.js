import React, { Component } from 'react'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import HelpIcon from 'material-ui/svg-icons/action/help';
import RemoveCircleOutlineIcon from 'material-ui/svg-icons/content/remove-circle-outline'

class DonorInfo extends Component {

    // curried function
    calcAmountEarned (auctionCollection) {
        return user => {
            return auctionCollection
                // only owned auctionCollection
                .filter(auction => auction.owner.persona === user.persona)
                .reduce((sum, auction) => {
                    return sum + (!auction.topBids ? 0 : auction.topBids
                        // only confirmed bids
                        .filter(bid => bid.ownerConfirmed && bid.bidderConfirmed)
                        .reduce((bidSum, bid) => (
                            bidSum + bid.bidAmount
                        ), 0)
                    );
                }, 0);
        }
    }

    // curried function
    calcTotalAmountOwed (auctionCollection) {
        return user => {
            return auctionCollection
                .reduce((sum, auction) => {
                    return sum + (!auction.topBids ? 0 : auction.topBids
                        // only owned bids
                        .filter(bid => bid.bidderObj.uid === user.uid)
                        // only confirmed bids
                        .filter(bid => bid.ownerConfirmed && bid.bidderConfirmed)
                        .reduce((bidSum, bid) => bidSum + bid.bidAmount, 0)
                    );
                }, 0) + (
                    user.raffle && user.raffle.cost ? user.raffle.cost : 0
                );
        }
    }
    
    calcOwnedAuctions(auctionCollection) {
        return user => {
            return auctionCollection
                // only owned auctionCollection
                // TODO: add the uid (persona-uid) to the owner object
                .filter(auction => auction.owner.persona === user.persona);
        }
    }
    
    calcBidAuctions(auctionCollection) {
        return user => {
            return auctionCollection
                // only owned auctionCollection
                .filter(auction => auction.bids && auction.bids[user.uid]);
        }
    }

    // auctionWon can be true|false|null to represent known win, known pass, or unknown
    createConfirmationIcon(primaryConfirmation, auctionWon, key) {

        const knownWonStyle = {
            win: { color: '#8EC449'},
            loss: { color: '#FF953F'},
            unknown: { color: '#E8448B'}
        };

        const auctionState = auctionWon === true ? 'win' : auctionWon === false ? 'loss' : 'unknown';

        // swap auctionWon for primaryConfirmation to toggle between icons based on bidder/owner and auction state
        if (auctionWon === true) {
            return <CheckCircleIcon key={key} style={knownWonStyle[auctionState]} />;
        } else if (auctionWon === false) {
            return < RemoveCircleOutlineIcon key={key} style={knownWonStyle[auctionState]} />;
        } else {
            return <HelpIcon key={key} style={knownWonStyle[auctionState]} />;
        }
    }    

    createOwnedAuctionStatusTable(auctions, user) {
        return (
            <Table
                selectable={false}
                >
                <TableBody
                    displayRowCheckbox={false}
                    >
                    {auctions.map( auction => {

                        const topBids = auction.topBids || [];
                        const confirmationsPerUserBid = topBids
                            .map( (bid, i) => {
                                const wonStatus = this.getAuctionWonStatus(bid);
                                return this.createConfirmationIcon(bid.ownerConfirmed, wonStatus, i);
                            });

                        return (
                            <TableRow
                                key={auction.uid}
                                >
                                <TableRowColumn colSpan={1} >{auction.title}</TableRowColumn>
                                <TableRowColumn colSpan={1} >{confirmationsPerUserBid}</TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }

    getAuctionWonStatus(bid) {
        if (bid.ownerConfirmed === true && bid.bidderConfirmed === true) {
            return true;
        } else if (bid.ownerConfirmed === false || bid.bidderConfirmed === false) {
            return false
        } else if (bid.ownerConfirmed === undefined || bid.bidderConfirmed === undefined) {
            return null;
        } else {
            return null;
        }
    }

    getAuctionBidsAsArray(auction) {
        return !auction.bids || !Object.keys(auction.bids).length ? [] : Object.keys(auction.bids)
            .map(personaAsBidKey => auction.bids[personaAsBidKey]);
    }

    createBidAuctionStatusTable(auctions, user, config) {
        return (
            <Table
                selectable={false}
                >
                <TableBody
                    displayRowCheckbox={false}
                    >
                    {auctions
                        .filter(auction => {
                            return this.getAuctionBidsAsArray(auction)
                                .sort((a, b) => {
                                    if (a.bidAmount < b.bidAmount) {
                                        return 1;
                                    } else if (a.bidAmount > b.bidAmount) {
                                        return -1;
                                    } else {
                                        return 0;
                                    }
                                })
                                .slice(0, auction.numberOffered + (config ? config.NUM_OFFERED_BUFFER : 2))
                                .filter(bid => bid.bidderObj.uid === user.uid)
                                .length;
                        })
                        .map( auction => {

                        const primaryConfirmed = auction.bids && (auction.bids[user.uid].bidderConfirmed || auction.bids[user.uid].ownerConfirmed === false);
                        const wonStatus = !auction.bids ? null : this.getAuctionWonStatus(auction.bids[user.uid]);

                        return (
                            <TableRow
                                key={auction.uid}
                                >
                                <TableRowColumn colSpan={2} >{auction.title}</TableRowColumn>
                                <TableRowColumn colSpan={1} >{this.createConfirmationIcon(primaryConfirmed, wonStatus)}</TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }

    calcWonRaffles (raffles) {
        return uid => {
            return raffles.filter(raffle => {
                return raffle.winningTicket && raffle.winningTicket.uid === uid
            }).map(raffle => raffle.title);
        }
    }

    render() {

        const { users, auctionCollection, raffles, config } = this.props;
        
        // curried functions
        const calcAmountEarned = this.calcAmountEarned(auctionCollection);
        const calcTotalAmountOwed = this.calcTotalAmountOwed(auctionCollection);
        const calcOwnedAuctions = this.calcOwnedAuctions(auctionCollection);
        const calcBidAuctions = this.calcBidAuctions(auctionCollection);
        const calcWonRaffles = this.calcWonRaffles(raffles);



        const style = {
            wordyCell: {
                whiteSpace: 'normal',
                wordWrap: 'break-word',
            }
        }

        const totalRaisedFromAllUsers = users.all.reduce( (agg, currUser) => {
            return agg + (calcAmountEarned(currUser) || 0);
        }, 0);

        return (
            <div className='page'>
                <div className='text-content'>
                    <h2>DonorInfo</h2>

                    <h3>Total Raised: ${totalRaisedFromAllUsers}</h3>

                    <Table
                        selectable={false}
                        >
                        <TableHeader
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            >
                            <TableRow>
                                <TableHeaderColumn colSpan={2}>Display name</TableHeaderColumn>
                                <TableHeaderColumn colSpan={2}>Persona</TableHeaderColumn>
                                <TableHeaderColumn colSpan={1}>GoogleUid</TableHeaderColumn>
                                <TableHeaderColumn colSpan={2}>Email</TableHeaderColumn>
                                <TableHeaderColumn>Earned</TableHeaderColumn>
                                <TableHeaderColumn>Owed</TableHeaderColumn>
                                <TableHeaderColumn>Due</TableHeaderColumn>
                                <TableHeaderColumn colSpan={4}>Owned Auction Confirmations</TableHeaderColumn>
                                <TableHeaderColumn colSpan={3}>Bid Auction Confirmations</TableHeaderColumn>
                                <TableHeaderColumn colSpan={1}>Raffles Won</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            >
                            {users.all.map(user => {

                                const amountEarned = calcAmountEarned(user) || 0;
                                const totalAmountOwed = calcTotalAmountOwed(user) || 0;
                                const remainderDue = totalAmountOwed - (user.amountPaid || 0);
                                const ownedAuctions = calcOwnedAuctions(user);
                                const bidAuctions = calcBidAuctions(user);
                                const ownedAuctionsStatusTable = this.createOwnedAuctionStatusTable(ownedAuctions, user);
                                const bidAuctionsStatusTable = this.createBidAuctionStatusTable(bidAuctions, user, config);
                                const wonRaffles = calcWonRaffles(user.uid);

                                return (
                                    <TableRow
                                        key={user.googleUid + Math.floor(Math.random()*100)}
                                        >
                                        <TableRowColumn colSpan={2} style={style.wordyCell}>{user.displayName}</TableRowColumn>
                                        <TableRowColumn colSpan={2} style={style.wordyCell}>{user.persona}</TableRowColumn>
                                        <TableRowColumn colSpan={1} >{user.googleUid}</TableRowColumn>
                                        <TableRowColumn colSpan={2} >{user.email}</TableRowColumn>
                                        <TableRowColumn >${amountEarned}</TableRowColumn>
                                        <TableRowColumn >${totalAmountOwed}</TableRowColumn>
                                        <TableRowColumn 
                                            style={remainderDue <= 0 ? {} : {color: '#FF953F'}}
                                            >${remainderDue}</TableRowColumn>
                                        <TableRowColumn colSpan={4} >{ownedAuctionsStatusTable}</TableRowColumn>
                                        <TableRowColumn colSpan={3} >{bidAuctionsStatusTable}</TableRowColumn>
                                        <TableRowColumn colSpan={1} >{wonRaffles.map(raffleTitle => <div key={raffleTitle}>{raffleTitle}</div>)}</TableRowColumn>
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
