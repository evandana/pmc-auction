import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import copy from 'copy-to-clipboard';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';

import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import ContentCopyIcon from 'material-ui/svg-icons/content/content-copy';
import HelpIcon from 'material-ui/svg-icons/action/help';
import RemoveCircleOutlineIcon from 'material-ui/svg-icons/content/remove-circle-outline'

import './donor-info.css'

class DonorInfo extends Component {

    constructor(props) {
        super(props);

        this.themePalette = this.props.muiTheme.palette;

        this.state = {
            showDetails: {}
        }
    }

    toggleUserDetails (googleUid) {
        let showUserDetailsObj = {};
        showUserDetailsObj[googleUid] = !this.state.showDetails[googleUid];
        this.setState({
            ...this.state,
            ...{ 
                showDetails: {
                    ...this.state.showDetails,
                    ...showUserDetailsObj,
                }
            }
        });
    }

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
    createConfirmationIcon({bid, wonStatus, key, contact}) {
        
        const name = contact.name || contact.displayName
        const {email} = contact;
        const {claimStep} = bid || {};

        const knownWonStyle = {
            win: { color: '#8EC449'},
            loss: { color: '#FF953F'},
            unknown: { color: '#E8448B'}
        };

        const auctionState = wonStatus === true ? 'win' : wonStatus === false ? 'loss' : 'unknown';

        let icon = '';

        // swap auctionWon for primaryConfirmation to toggle between icons based on bidder/owner and auction state
        if (wonStatus === true) {
            icon = <CheckCircleIcon key={key} style={knownWonStyle[auctionState]} />;
        } else if (wonStatus === false) {
            icon = < RemoveCircleOutlineIcon key={key} style={knownWonStyle[auctionState]} />;
        } else {
            icon = <HelpIcon key={key} style={knownWonStyle[auctionState]} />;
        }

        return (
            <div className="row" key={key}>
                <div className="col-xs-2">{icon}</div>
                <div className="col-xs-6">{name}</div>
                {email && <div className="col-xs-2">
                    <IconButton 
                        tooltip="Copy email" 
                        onClick={() => {
                            copy(email);
                        }}
                        style={{padding:0, margin:0, width:12, height:12 }}
                        iconStyle={{fill: this.themePalette.primaryLinkColor}}
                        >
                        <ContentCopyIcon />
                    </IconButton>
                </div>}
                {claimStep !== undefined && <div className="col-xs-2" >
                    <Avatar
                        color={this.themePalette.canvasColor}
                        backgroundColor={claimStep >= 2 ? this.themePalette.successColor : this.themePalette.warningColor}
                        size={24}
                        >
                        {claimStep+1}
                    </Avatar>
                </div>}
            </div>
        );
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
                                return this.createConfirmationIcon({bid, wonStatus, contact: bid.bidderObj, key: i});
                            });

                        return (
                            <TableRow
                                key={auction.uid}
                                >
                                <TableRowColumn colSpan={1} >{auction.title}</TableRowColumn>
                                <TableRowColumn colSpan={2} >{confirmationsPerUserBid}</TableRowColumn>
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
                                <TableRowColumn colSpan={1}>{auction.title}</TableRowColumn>
                                <TableRowColumn colSpan={2}>{this.createConfirmationIcon({wonStatus, key: auction.uid, contact: auction.owner })}</TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }

    allOwnedAuctionsConfirmed (auctions) {
        return auctions.every( auction => {
            return auction.topBids.every( bid => {
                return this.getAuctionWonStatus(bid) !== null;
            });
        }) ? <CheckCircleIcon style={{color:this.themePalette.disabledColor}}/> : < HelpIcon style={{color:this.themePalette.warningColor}}/>;
    }

    allBidsConfirmed (auctions) {
        return auctions.every( auction => {
            return auction.topBids.every( bid => {
                return this.getAuctionWonStatus(bid) !== null;
            });
        }) ? <CheckCircleIcon style={{color:this.themePalette.disabledColor}}/> : < HelpIcon style={{color:this.themePalette.warningColor}}/>;
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

        const totalPromisedFromAllUsers = users.all.reduce( (agg, currUser) => {
            const amtOwed = calcTotalAmountOwed(currUser);
            return agg + (amtOwed || 0);
        }, 0);
        const totalRaisedFromAllUsers = users.all.reduce( (agg, currUser) => {
            return agg + (calcAmountEarned(currUser) || 0);
        }, 0);
        const totalDueFromAllUsers = users.all.reduce( (agg, currUser) => {
            const amtOwed = (currUser.amountPaid || 0) - (calcTotalAmountOwed(currUser) || 0);
            const due = amtOwed < 0 ? amtOwed : 0;
            return agg + (due || 0);
        }, 0);
        const totalBonusContributions = users.all.reduce( (agg, currUser) => {
            const amtOwed = (currUser.amountPaid || 0) - calcTotalAmountOwed(currUser);
            const bonus = amtOwed > 0 ? amtOwed : 0;
            return agg + (bonus || 0);
        }, 0);

        const userRowsWithDetails = users.all.reduce( (agg, curr) => {
            agg.push({...curr, ...{detailRow: false}});
            agg.push({...curr, ...{detailRow: true}});
            return agg;
        }, []);

        const styles = {
            detailLabel: {
                textAlign: 'right',
            },
            detailCell: {
                paddingBottom: '.5em'
            }
        }

        return (
            <div className='page'>
                <div className='text-content'>

                    <h3>Total Promised + Bonus: ${totalBonusContributions + totalPromisedFromAllUsers}</h3>
                    <h4>Total Promised: ${totalPromisedFromAllUsers}</h4>
                    <h4>Total Earned from Auctions: ${totalRaisedFromAllUsers}</h4>
                    <h4>Total Outstanding: ${totalDueFromAllUsers}</h4>
                    <h4>Total Bonus Contributions: ${totalBonusContributions}</h4>

                    <div style={{marginLeft:-32, marginRight:-32}}>
                        <Table
                            className="skinny-col-padding"
                            selectable={false}
                            >
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                                >
                                <TableRow>
                                    <TableHeaderColumn colSpan={3}>Display name</TableHeaderColumn>
                                    <TableHeaderColumn colSpan={3}>Persona</TableHeaderColumn>
                                    {/* <TableHeaderColumn colSpan={1}>GoogleUid</TableHeaderColumn>
                                    <TableHeaderColumn colSpan={2}>Email</TableHeaderColumn> */}
                                    {/* <TableHeaderColumn>Earned</TableHeaderColumn>
                                    <TableHeaderColumn>Owed</TableHeaderColumn> */}
                                    <TableHeaderColumn colSpan={2}>Paid</TableHeaderColumn>
                                    <TableHeaderColumn colSpan={2}>Due</TableHeaderColumn>
                                    <TableHeaderColumn>Owned</TableHeaderColumn>
                                    <TableHeaderColumn>Bid</TableHeaderColumn>
                                    
                                    {/* <TableHeaderColumn colSpan={4}>Owned Auction Confirmations</TableHeaderColumn>
                                    <TableHeaderColumn colSpan={3}>Bid Auction Confirmations</TableHeaderColumn>
                                    <TableHeaderColumn colSpan={1}>Raffles Won</TableHeaderColumn> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                >
                                {userRowsWithDetails.map(user => {

                                    const amountEarned = calcAmountEarned(user) || 0;
                                    const totalAmountOwed = calcTotalAmountOwed(user) || 0;
                                    const remainderDue = totalAmountOwed - (user.amountPaid || 0);
                                    const ownedAuctions = calcOwnedAuctions(user);
                                    const bidAuctions = calcBidAuctions(user);
                                    const ownedAuctionsStatusTable = this.createOwnedAuctionStatusTable(ownedAuctions, user);
                                    const bidAuctionsStatusTable = this.createBidAuctionStatusTable(bidAuctions, user, config);
                                    const wonRaffles = calcWonRaffles(user.uid);
                                    const allOwnedAuctionsConfirmed = this.allOwnedAuctionsConfirmed(ownedAuctions);
                                    const allBidsConfirmed = this.allBidsConfirmed(bidAuctions)

                                    return !user.detailRow ? (
                                        <TableRow
                                            style={!this.state.showDetails[user.googleUid] ? {} : {background: '#ddd'} }
                                            key={user.googleUid + (user.detailRow ? '-detail' : '')}
                                            onTouchTap={e => {
                                                e.preventDefault(); 
                                                this.toggleUserDetails(user.googleUid)
                                            }}
                                            >
                                            <TableRowColumn colSpan={3} style={style.wordyCell}>{user.displayName}</TableRowColumn>
                                            <TableRowColumn colSpan={3} style={style.wordyCell}>{user.persona}</TableRowColumn>
                                            <TableRowColumn colSpan={2}>${user.amountPaid || 0}</TableRowColumn>
                                            <TableRowColumn colSpan={2}
                                                style={remainderDue <= 0 ? {} : {color: '#FF953F'}}
                                                >${remainderDue}</TableRowColumn>
                                            <TableRowColumn >{allOwnedAuctionsConfirmed}</TableRowColumn>
                                            <TableRowColumn >{allBidsConfirmed}</TableRowColumn>
                                        </TableRow>
                                    ) : (
                                        <TableRow
                                            hidden={!this.state.showDetails[user.googleUid]}
                                            key={user.googleUid + (user.detailRow ? '-detail' : '')}
                                            >
                                            <TableRowColumn colSpan={12} style={style.wordyCell}>
                                                <div className="row"
                                                    style={{padding:'1em', marginBottom:'3em'}}
                                                    >
                                                    <div className="col-xs-4" style={{...styles.detailLabel, ...styles.detailCell}}>Display Name</div>
                                                    <div className="col-xs-8" style={{...styles.detailCell}} colSpan={3} style={style.wordyCell}>{user.displayName}</div>
                                                    <div className="col-xs-4" style={{...styles.detailLabel, ...styles.detailCell}}>Persona</div>
                                                    <div className="col-xs-8" style={{...styles.detailCell}} colSpan={3} style={style.wordyCell}>{user.persona}</div>
                                                    <div className="col-xs-4" style={{...styles.detailLabel, ...styles.detailCell}}>Google UID</div>
                                                    <div className="col-xs-8" style={{...styles.detailCell}} colSpan={1} >{user.googleUid}</div>
                                                    <div className="col-xs-4" style={{...styles.detailLabel, ...styles.detailCell}}>Email</div>
                                                    <div className="col-xs-8" style={{...styles.detailCell}} colSpan={2} >
                                                        <IconButton 
                                                            tooltip="Copy email" 
                                                            onClick={() => {
                                                                copy(user.email);
                                                            }}
                                                            style={{padding:0, margin:0, width:24, height:24 }}
                                                            iconStyle={{fill: this.themePalette.primaryLinkColor}}
                                                            >
                                                            <ContentCopyIcon />
                                                        </IconButton>
                                                        {user.email}
                                                    </div>
                                                    <div className="col-xs-4" style={{...styles.detailLabel, ...styles.detailCell}}>Amount Earned</div>
                                                    <div className="col-xs-6" style={{...styles.detailCell}} >${amountEarned}</div>
                                                    <div className="col-xs-4" style={{...styles.detailLabel, ...styles.detailCell}}>Amount Owed</div>
                                                    <div className="col-xs-6" style={{...styles.detailCell}} >${totalAmountOwed}</div>
                                                    <div className="col-xs-4" style={{...styles.detailLabel, ...styles.detailCell}}>Amount Paid</div>
                                                    <div className="col-xs-6" style={{...styles.detailCell}} colSpan={2}>${user.amountPaid || 0}</div>
                                                    <div className="col-xs-4" style={{...styles.detailLabel, ...styles.detailCell}}>Outstanding</div>
                                                    <div className="col-xs-6" style={{...styles.detailCell}} colSpan={2}style={remainderDue <= 0 ? {} : {color: '#FF953F'}}>${remainderDue}</div>
                                                    <div className="col-xs-4" style={{...styles.detailLabel, ...styles.detailCell}}>All Auctions Confirmed</div>
                                                    <div className="col-xs-6" style={{...styles.detailCell}} >{allOwnedAuctionsConfirmed}</div>
                                                    <div className="col-xs-4" style={{...styles.detailLabel, ...styles.detailCell}}>All Top Bids Confirmed</div>
                                                    <div className="col-xs-6" style={{...styles.detailCell}} >{allBidsConfirmed}</div>
                                                    <div className="col-xs-12"><h3>Owned Auctions</h3></div>
                                                    <div className="col-xs-12" colSpan={4} >{ownedAuctionsStatusTable}</div>
                                                    <div className="col-xs-12"><h3>Bids</h3></div>
                                                    <div className="col-xs-12" colSpan={3} >{bidAuctionsStatusTable}</div>
                                                    <div className="col-xs-12"><h3>Raffles</h3></div>
                                                    <div className="col-xs-12" colSpan={1} >{wonRaffles.map(raffleTitle => <div key={raffleTitle}>{raffleTitle}</div>)}</div>
                                                </div>
                                            </TableRowColumn>
                                        </TableRow>
                                    )}
                                )}
                            </TableBody>
                        </Table>
                    </div>

                </div>
            </div>
        );
    }

}

export default muiThemeable()(DonorInfo);
