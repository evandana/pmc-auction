import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CleckCircle from 'material-ui/svg-icons/action/check-circle';
import MailOutlineIcon from 'material-ui/svg-icons/communication/mail-outline';

class Status extends Component {

    constructor(props) {
        super(props);
        this.ownerBidConfirmation = this.props.ownerBidConfirmation.bind(this);
    }

    render() {

        const { user, config, auctionsWithUserBids, auctionsOwned, ...rest } = this.props;

        const themePalette = this.props.muiTheme.palette;

        return (
            <div className='page'>
                <div className='text-content'>

                    <section>
                        <h2>Auctions with Your Bids</h2>
                        <p>If you are the top bidder when the auction closes, you are expected to claim that item.</p>
                        <p>If an auction owner is awarding multiple winners and you have one of the highest few bids, you may be offered a chance to accept this at your highest bid for that item.</p>
                        {this.createLeadingBidTable(auctionsWithUserBids, config.BIDDING_OPEN, config.CONFIRM_WINNERS, themePalette)}
                    </section>

                    {!user.permissions.donor || !auctionsOwned ? '' : (
                        <section>
                            <h2>Owned Auctions</h2>
                            <p>Choose the winners from the top bids.</p>
                            <p>You may select multiple winners. Except for the top winner you choose, bidders will have the option to confirm or pass.</p>
                            <p>You will see three bids more than the number you are offering, in case you wish to skip one or two.</p>
                            {this.createOwnedAuctionTable(auctionsOwned, config.BIDDING_OPEN, config.CONFIRM_WINNERS, themePalette)}
                        </section>
                    )}

                </div>
            </div>
        );
    }

    createLeadingBidTable(auctionsWithUserBids, biddingOpen, confirmWinners, themePalette) {

        const getStatus = (auction, biddingOpen) => {
            if (biddingOpen) {
                return 'Bidding Open';
            } else if (confirmWinners && auction.userHighBid.ownerConfirmed && !auction.userHighBid.bidderConfirmed) {
                return <div>
                    <RaisedButton primary={true} label={'Confirm at $' + auction.userHighBid.bidAmount}></RaisedButton>
                    <RaisedButton label='Pass'></RaisedButton>
                </div>
            } else if (confirmWinners && (auction.userHighBid.ownerConfirmed === false || auction.userHighBidRank > auction.numberOffered + 3)) {
                return 'Not won';
            } else if (confirmWinners && !auction.userHighBid.ownerConfirmed) {
                return 'Pending owner confirmation';
            } else if (confirmWinners && auction.userHighBid.bidderConfirmed && auction.userHighBid.ownerConfirmed) {
                return 'Confirmed!';
            } else {
                return 'Bidding closed';
            }
        }

        return (
            <Table selectable={false} >
                <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                >
                    <TableRow>
                        <TableHeaderColumn colSpan={3}>Title</TableHeaderColumn>
                        {biddingOpen ? '' : <TableHeaderColumn colSpan={4}>Status</TableHeaderColumn>}
                        <TableHeaderColumn>Owner</TableHeaderColumn>
                        <TableHeaderColumn>Highest Bid</TableHeaderColumn>
                        <TableHeaderColumn>Your Bid</TableHeaderColumn>
                        <TableHeaderColumn>Bid Rank</TableHeaderColumn>
                        <TableHeaderColumn># Offered</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                >
                    {auctionsWithUserBids.map(auctionWithUserBid => {
                        return (
                            <TableRow selectable={false} key={auctionWithUserBid.uid}>
                                <TableRowColumn colSpan={3}>{auctionWithUserBid.title}</TableRowColumn>
                                {biddingOpen ? '' : <TableRowColumn colSpan={4}>{getStatus(auctionWithUserBid, biddingOpen, themePalette)}</TableRowColumn>}
                                <TableRowColumn>{auctionWithUserBid.owner.displayName}</TableRowColumn>
                                <TableRowColumn>${auctionWithUserBid.highBid}</TableRowColumn>
                                <TableRowColumn>${auctionWithUserBid.userHighBid.bidAmount}</TableRowColumn>
                                <TableRowColumn>{auctionWithUserBid.userHighBidRank} / {auctionWithUserBid.bidCount}</TableRowColumn>
                                <TableRowColumn>{auctionWithUserBid.numberOffered}</TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }


    createOwnedAuctionTable(auctionsOwned, biddingOpen, confirmWinners, themePalette) {

        const getBidStatus = (bid, topBidIndex, allBidsIndex, confirmWinners, auctionUid) => {
            if (biddingOpen) {
            } else if (confirmWinners && !bid.ownerConfirmed) {
                return <div>
                    {topBidIndex ===0 ? (
                        <RaisedButton primary={true} label={'Confirm'} onClick={() => this.ownerBidConfirmation({
                            ownerConfirmed: true, 
                            bid, 
                            topBidIndex,
                            allBidsIndex, 
                            auctionUid
                        })}></RaisedButton>
                    ) : (
                        <RaisedButton labelColor={themePalette.primary1Color} label={'Request'} onClick={() => this.ownerBidConfirmation({
                            ownerConfirmed: true, 
                            bid, 
                            topBidIndex,
                            allBidsIndex, 
                            auctionUid
                        })}></RaisedButton>
                    )}
                    <FlatButton icon={<CloseIcon />} style={{color: themePalette.primary1Color}} onClick={() => this.ownerBidConfirmation({
                        ownerConfirmed: false, 
                        bid, 
                        topBidIndex,
                        allBidsIndex, 
                        auctionUid
                    })}></FlatButton>
                </div>
            } else if (confirmWinners && !bid.bidderConfirmed) {
                return <span style={{color: themePalette.ternaryTextColor}}>Pending Bidder</span>;
            } else if (confirmWinners && bid.ownerConfirmed && bid.bidderConfirmed) {
                return <div>
                    <CleckCircle style={{ marginBottom: '-0.75em'}}/>
                    <FlatButton style={{width:'10px', color: themePalette.primary1Color}} icon={<MailOutlineIcon />} href={'mailto:'+bid.bidderObj.email}/>
                    {bid.bidderObj.email}
                </div>
            } else {
                return 'Bidding closed';
            }
        }

        return (
            <Table selectable={false} >
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                    <TableRow>
                        <TableHeaderColumn colSpan={2}>Title</TableHeaderColumn>
                        <TableHeaderColumn># Offered</TableHeaderColumn>
                        <TableHeaderColumn colSpan={7}>Bids</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {auctionsOwned.map(auctionOwned => {
                        return (
                            <TableRow selectable={false} key={auctionOwned.uid}>
                                <TableRowColumn colSpan={2}>{auctionOwned.title}</TableRowColumn>
                                <TableRowColumn>{auctionOwned.numberOffered}</TableRowColumn>
                                <TableRowColumn colSpan={7}>{!auctionOwned.topBids || !auctionOwned.topBids.length ? 'No bids yet' : (

                                    <Table selectable={false}>
                                        <TableBody displayRowCheckbox={false}>
                                            {auctionOwned.topBids.map((bid, topBidIndex) => {
                                                return (
                                                    <TableRow selectable={false} key={topBidIndex}>
                                                        <TableRowColumn colSpan={2}>${bid.bidAmount}</TableRowColumn>
                                                        <TableRowColumn colSpan={3}>{bid.bidderObj.name}</TableRowColumn>
                                                        {biddingOpen ? '' : <TableRowColumn colSpan={11}>{getBidStatus(bid, topBidIndex, bid.allBidsIndex, confirmWinners, auctionOwned.uid, themePalette)}</TableRowColumn>}
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>

                                )}</TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}

export default muiThemeable()(Status);