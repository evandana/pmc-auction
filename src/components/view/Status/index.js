import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';
import Paper from 'material-ui/Paper';
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
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CleckCircle from 'material-ui/svg-icons/action/check-circle';
import MailOutlineIcon from 'material-ui/svg-icons/communication/mail-outline';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

class Status extends Component {

    constructor(props) {
        super(props);
        this.ownerBidConfirmation = this.props.ownerBidConfirmation.bind(this);
        this.bidderBidConfirmation = this.props.bidderBidConfirmation.bind(this);
        this.state = {
            showAuctionsWithYourBidsText: false,
            showOwnedAuctionstext: false,
        }
    }

    render() {

        const { user, config, auctionsWithUserBids, auctionsOwned, ...rest } = this.props;

        const themePalette = this.props.muiTheme.palette;

        return (
            <div className='page'>
                <div className='text-content'>

                    <section style={{position:'relative'}}>
                        <h2>Auctions with Your Bids</h2>
                        <div style={{position:'absolute', right:0, top:'-0.5em'}}>
                            <FlatButton
                                label={this.state.showAuctionsWithYourBidsText ? 'Hide description' : 'Show description'}
                                onClick={() => this.setState({showAuctionsWithYourBidsText: !this.state.showAuctionsWithYourBidsText}) }
                                icon={this.state.showAuctionsWithYourBidsText ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                labelPosition='before'
                                style={{color: themePalette.secondaryLinkColor}}
                                />
                        </div>
                        {this.state.showAuctionsWithYourBidsText && (
                            <div>
                                <p>If you are the top bidder when the auction closes, you are expected to claim that item.</p>
                                <p>If an auction owner is awarding multiple winners and you have one of the highest few bids, you may be offered a chance to accept this at your highest bid for that item.</p>
                            </div>
                        )}
                        {this.createLeadingBidTable(auctionsWithUserBids, config.BIDDING_OPEN, config.CONFIRM_WINNERS, themePalette)}
                    </section>

                    {!user.permissions.donor || !auctionsOwned ? '' : (
                        <section style={{position:'relative', marginTop:'4em'}}>
                            <h2>Owned Auctions</h2>
                            <div style={{position:'absolute', right:0, top:'-0.5em'}}>
                                <FlatButton
                                    label={this.state.showOwnedAuctionstext ? 'Hide description' : 'Show description'}
                                    onClick={() => this.setState({showOwnedAuctionstext: !this.state.showOwnedAuctionstext}) }
                                    icon={this.state.showOwnedAuctionstext ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    labelPosition='before'
                                    style={{color: themePalette.secondaryLinkColor}}
                                    />
                            </div>
                            {this.state.showOwnedAuctionstext && (
                                <div>
                                    <p>Choose the winners from the top bids.</p>
                                    <p>You may select multiple winners. Except for the top winner you choose, bidders will have the option to confirm or pass.</p>
                                    <p>You will see three bids more than the number you are offering, in case you wish to skip one or two.</p>
                                </div>
                            )}
                            {this.createOwnedAuctionTable(auctionsOwned, config.BIDDING_OPEN, config.CONFIRM_WINNERS, themePalette)}
                        </section>
                    )}

                </div>
            </div>
        );
    }

    createLeadingBidTable(auctionsWithUserBids, biddingOpen, confirmWinners, themePalette) {

        const getStatus = (auction) => {

            const bid = auction.userHighBid,
                topBidIndex = auction.userHighBidRank,
                allBidsIndex = auction.userHighBid.allBidsIndex, 
                auctionUid = auction.uid;

            if (biddingOpen) {
                return 'Bidding Open';
            } else if (confirmWinners && auction.userHighBid.ownerConfirmed && auction.userHighBid.bidderConfirmed === undefined) {
                return <div>
                    <RaisedButton primary={true} label={'Confirm ($' + auction.userHighBid.bidAmount + ')'} onClick={() => this.bidderBidConfirmation({
                            bidderConfirmed: true,
                            bid,
                            topBidIndex,
                            allBidsIndex,
                            auctionUid
                        })}></RaisedButton>
                    <FlatButton style={{minWidth:undefined, color: themePalette.primaryLinkColor}} label='Pass' onClick={() => this.bidderBidConfirmation({
                            bidderConfirmed: false,
                            bid,
                            topBidIndex,
                            allBidsIndex,
                            auctionUid
                        })}/>
                </div>
            } else if (confirmWinners && (auction.userHighBid.ownerConfirmed === false || auction.userHighBidRank > auction.numberOffered + 3)) {
                return 'Not won';
            } else if (confirmWinners && auction.userHighBid.ownerConfirmed !== true && auction.userHighBid.ownerConfirmed !== false) {
                return <span style={{color: themePalette.ternaryTextColor}}>Pending owner confirmation</span>;
            } else if (confirmWinners && auction.userHighBid.bidderConfirmed === true && auction.userHighBid.ownerConfirmed === true) {
                return <span style={{color: themePalette.primary2Color}}>Confirmed!</span>;
            } else if (auction.userHighBid.bidderConfirmed === false) {
                return 'You declined'
            } else {
                return 'Bidding closed';
            }
        }

        return (
            <div style={{margin:'8px'}}> {/*Compensates for -8px ".row" margings*/}
                {auctionsWithUserBids.map(auctionWithUserBid => {
                    return (
                        <Paper className='row middle-xs middle-sm' key={auctionWithUserBid.uid} style={{ padding: '2em', marginBottom: '1.5em' }}>
                            <div className={'row middle-xs middle-sm middle-md ' + (biddingOpen ? 'col-xs-12 col-sm-12 col-md-5' : 'col-xs-7 col-sm-7 col-md-8')}>
                                <h3 style={{ margin: 0, padding: '0 1em 0 0', display:'block'}}  
                                    className={biddingOpen ? 'col-xs-12' : confirmWinners && auctionWithUserBid.userHighBid.bidderConfirmed !== undefined && auctionWithUserBid.userHighBid.ownerConfirmed !== undefined ? 'col-xs-9 col-sm-10 col-md-10' : 'col-xs-6 col-sm-6 col-md-6'}>{
                                        auctionWithUserBid.title
                                    }</h3>
                                {biddingOpen ? '' : <div 
                                    style={{padding:0, margin:0, display:'block'}} 
                                    className={confirmWinners && auctionWithUserBid.userHighBid.bidderConfirmed !== undefined && auctionWithUserBid.userHighBid.ownerConfirmed !== undefined ? 'col-xs-3 col-sm-2 col-md-2' : 'col-xs-6 col-sm-6 col-md-6'}>{
                                    getStatus(auctionWithUserBid)
                                }</div>}
                            </div>

                            <div className={biddingOpen ? 'col-xs-12 col-sm-12 col-md-1' : 'col-xs-1 col-sm-1 col-md-1'}>&nbsp;</div>

                            <div className={biddingOpen ? 'col-xs-12 col-sm-12 col-md-6' : 'col-xs-4 col-sm-4 col-md-3'}>
                                <Table selectable={false} style={{padding:0}}>
                                    <TableHeader
                                        displaySelectAll={false}
                                        adjustForCheckbox={false}
                                        style={{borderBottom: 'none'}}
                                        >
                                        <TableRow
                                            style={{borderBottom: 'none', height:'1em'}}
                                            >
                                            <TableHeaderColumn colSpan={2} style={{padding:0, height:'1em'}}>Owner</TableHeaderColumn>
                                            <TableHeaderColumn style={{padding:0, height:'1em'}}>Your Bid</TableHeaderColumn>
                                            {biddingOpen && <TableHeaderColumn style={{padding:0, height:'1em'}}>Bid Rank</TableHeaderColumn>}
                                            {biddingOpen && <TableHeaderColumn style={{padding:0, height:'1em'}}># Offered</TableHeaderColumn>}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody
                                        displayRowCheckbox={false}
                                    >
                                        <TableRow selectable={false} key={auctionWithUserBid.uid} style={{height:'1em'}}>
                                            <TableRowColumn style={{paddingTop: '1em', padding:0, height:'1em'}} colSpan={2}>{auctionWithUserBid.owner.displayName}</TableRowColumn>
                                            <TableRowColumn style={{paddingTop: '1em', padding:0, height:'1em'}}>${auctionWithUserBid.userHighBid.bidAmount}</TableRowColumn>
                                            {biddingOpen && <TableRowColumn style={{paddingTop: '1em', padding:0, height:'1em'}}>{auctionWithUserBid.userHighBidRank} / {auctionWithUserBid.bidCount}</TableRowColumn>}
                                            {biddingOpen && <TableRowColumn style={{paddingTop: '1em', padding:0, height:'1em'}}>{auctionWithUserBid.numberOffered}</TableRowColumn>}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </Paper>
                    );
                })}
            </div>
        );
    }


    createOwnedAuctionTable(auctionsOwned, biddingOpen, confirmWinners, themePalette) {

        const getBidStatus = (bid, topBidIndex, allBidsIndex, auctionUid) => {
            if (biddingOpen) {
                return 'Bidding open'; // will never be shown
            } else if (bid.ownerConfirmed === false) {
                return 'You declined';
            } else if (confirmWinners && bid.ownerConfirmed === undefined) {
                return <div>
                    {topBidIndex === 0 ? (
                        <RaisedButton primary={true} label={'Confirm'} onClick={() => this.ownerBidConfirmation({
                            ownerConfirmed: true,
                            bid,
                            topBidIndex,
                            allBidsIndex,
                            auctionUid
                        })}></RaisedButton>
                    ) : (
                            <RaisedButton labelColor={themePalette.primaryLinkColor} label={'Request'} onClick={() => this.ownerBidConfirmation({
                                ownerConfirmed: true,
                                bid,
                                topBidIndex,
                                allBidsIndex,
                                auctionUid
                            })}></RaisedButton>
                        )}
                    <FlatButton label='Pass' style={{ color: themePalette.primaryLinkColor }} onClick={() => this.ownerBidConfirmation({
                        ownerConfirmed: false,
                        bid,
                        topBidIndex,
                        allBidsIndex,
                        auctionUid
                    })}></FlatButton>
                </div>
            } else if (confirmWinners && bid.bidderConfirmed === undefined) {
                return <span style={{ color: themePalette.ternaryTextColor }}>Pending Bidder</span>;
            } else if (confirmWinners && bid.ownerConfirmed === true && bid.bidderConfirmed === true) {
                return <div>
                    <FlatButton style={{ width: '10px', color: themePalette.primaryLinkColor }} icon={<MailOutlineIcon />} href={'mailto:' + bid.bidderObj.email} />
                    {bid.bidderObj.email}
                </div>
            } else if ( bid.bidderConfirmed === false) {
                return 'Bidder declined'
            } else {
                return 'Bidding closed';
            }
        }

        return (
            <div>
                {auctionsOwned.map(auctionOwned => {
                    return (
                        <Paper key={auctionOwned.uid} style={{ padding: '2em 2em 1em 2em', marginBottom: '1.5em' }}>
                            <div style={{ position: 'relative' }} className='row'>
                                <h3 className='col-xs-8 col-sm-6 col-md-8' style={{ marginTop: 0 }}>{auctionOwned.title}</h3>
                                <p className='col-xs-4 col-sm-6 col-md-4' style={{ position: 'absolute', top: 0, right: 0, margin: 0, color: themePalette.accent3Color }}>{auctionOwned.numberOffered} Offered</p>
                            </div>

                            <div>{!auctionOwned.topBids || !auctionOwned.topBids.length ? 'No bids yet' : (

                                <Table selectable={false}>
                                    <TableBody displayRowCheckbox={false}>
                                        {auctionOwned.topBids.map((bid, topBidIndex) => {
                                            return (
                                                <TableRow selectable={false} key={topBidIndex} style={bid.bidderConfirmed !== undefined && bid.ownerConfirmed !== undefined ? { margin: '1px solid ' + themePalette.fadedPrimary1Color } : {}}>
                                                    <TableRowColumn colSpan={1} style={{minWidth: '3em', padding:0}}>${bid.bidAmount}</TableRowColumn>
                                                    <TableRowColumn colSpan={2} style={{padding:0}}>{bid.bidderObj.name}</TableRowColumn>
                                                    {biddingOpen ? '' : <TableRowColumn colSpan={4} style={{padding:0}}>{
                                                        getBidStatus(bid, topBidIndex, bid.allBidsIndex, auctionOwned.uid)
                                                    }</TableRowColumn>}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>

                            )}
                            </div>
                        </Paper>
                    );
                })}
            </div>
        );
    }
}

export default muiThemeable()(Status);