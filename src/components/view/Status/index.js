import React, { Component } from 'react'

import copy from 'copy-to-clipboard';

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
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import ContentCopyIcon from 'material-ui/svg-icons/content/content-copy';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
// import MailOutlineIcon from 'material-ui/svg-icons/communication/mail-outline';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RemoveCircleOutlineIcon from 'material-ui/svg-icons/content/remove-circle-outline'

class Status extends Component {

    constructor(props) {
        super(props);
        this.ownerBidConfirmation = this.props.ownerBidConfirmation.bind(this);
        this.bidderBidConfirmation = this.props.bidderBidConfirmation.bind(this);
        this.ownerBidContacted = this.props.ownerBidContacted.bind(this);
        this.ownerBidPlanned = this.props.ownerBidPlanned.bind(this);
        this.state = {
            showAuctionsWithYourBidsText: false,
            showOwnedAuctionstext: false,
            snackbar: {
                open: false,
                message: '',
            }
        }
    }

    createMessageDiv(textContent) {
        return <div style={{textAlign:'center', width:'100%', color: '#999'}}>{textContent}</div>
    }

    render() {

        const { user, config, auctionsWithUserBids, auctionsOwned } = this.props;

        const themePalette = this.props.muiTheme.palette;

        return (
            <div className='page'>
                <Snackbar
                    style={{bottom:'57px'}}
                    bodyStyle={{backgroundColor: themePalette.successColor}}
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    />
                <div className='text-content' style={{padding:'1em'}}>

                    <section className="row middle-xs">
                        <h2 className="col-xs-10">Auctions with Your Bids</h2>
                        <div className="col-xs-2" style={{textAlign:'right'}}>
                            <IconButton
                                tooltip={this.state.showAuctionsWithYourBidsText ? 'Hide description' : 'Show description'}
                                tooltipPosition='bottom-left'
                                onClick={() => this.setState({showAuctionsWithYourBidsText: !this.state.showAuctionsWithYourBidsText, snackbar: {open: false, message: ''}}) }
                                style={{color: themePalette.secondaryLinkColor, minWidth: null}}
                                >
                                {this.state.showAuctionsWithYourBidsText ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                        </div>
                        {this.state.showAuctionsWithYourBidsText && (
                            <div>
                                <p>If you are the top bidder when the auction closes, you are expected to claim that item.</p>
                                <p>If an auction owner is awarding multiple winners and you have one of the highest few bids, you may be offered a chance to accept this at your highest bid for that item.</p>
                            </div>
                        )}
                        {
                            !auctionsWithUserBids || auctionsWithUserBids.length < 1 ? 
                                (config.BIDDING_OPEN ? this.createMessageDiv('You haven\'t made any bids yet') : this.createMessageDiv('Bidding not open')) : 
                                this.createLeadingBidTable(auctionsWithUserBids, config.BIDDING_OPEN, config.CONFIRM_WINNERS, themePalette)
                        }
                    </section>

                    {!user.permissions.donor || !auctionsOwned || !auctionsOwned.length ? '' : (

                        <section className="row middle-xs" style={{marginTop:'2em'}}>
                            <h2 className="col-xs-10">Owned Auctions</h2>
                            <div className="col-xs-2" style={{textAlign:'right'}}>
                                <IconButton
                                    tooltip={this.state.showOwnedAuctionstext ? 'Hide description' : 'Show description'}
                                    tooltipPosition='bottom-left'
                                    onClick={() => this.setState({showOwnedAuctionstext: !this.state.showOwnedAuctionstext, snackbar: {open: false, message: ''}}) }
                                    style={{color: themePalette.secondaryLinkColor, minWidth: null}}
                                    >
                                    {this.state.showOwnedAuctionstext ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                </IconButton>
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
                return <div style={{textAlign:'center'}}>
                    <RaisedButton style={{minWidth:undefined}} primary={true} label={'Confirm ($' + auction.userHighBid.bidAmount + ')'} onClick={() => this.bidderBidConfirmation({
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
                        <Paper className='row middle-xs middle-sm' key={auctionWithUserBid.uid} style={{padding: '1em', marginBottom: '1.5em' }}>
                            <div className={'row middle-xs middle-sm middle-md ' + (biddingOpen ? 'col-xs-12 col-sm-12 col-md-5' : 'col-xs-12 col-sm-7 col-md-8')}>
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

                            <div className={biddingOpen ? 'col-xs-12 col-sm-12 col-md-1' : 'col-xs-12 col-sm-1 col-md-1'}>&nbsp;</div>

                            <div className={biddingOpen ? 'col-xs-12 col-sm-12 col-md-6' : 'col-xs-12 col-sm-4 col-md-3'}>
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
                                            <TableHeaderColumn style={{padding:0, height:'1em'}}>Bid</TableHeaderColumn>
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
                return <div className="row middle-xs middle-sm" style={{textAlign:'left'}}>
                    <div
                        className="col-xs-9"
                        style={{textOverflow:'ellipsis', overflowY:'hidden'}}
                        >
                        {bid.bidderObj.email}
                    </div>
                    <div
                        className="col-xs-3"
                        style={{padding:0, margin:0}}
                        >

                        <IconMenu
                            iconButtonElement={<IconButton iconStyle={{color: themePalette.primaryLinkColor}}><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            >
                            <MenuItem 
                                primaryText="Copy email" 
                                onClick={() => {
                                    copy(bid.bidderObj.email);
                                    this.setState({snackbar: {open: true, message: bid.bidderObj.email + ' copied to clipboard'}})
                                }}
                                rightIcon={(
                                    <ContentCopyIcon style={{fill: themePalette.primaryLinkColor}}/>
                                )}/>
                            <MenuItem 
                                primaryText="Contacted"
                                onClick={() => this.ownerBidContacted({
                                    contacted: !bid.contacted,
                                    bid,
                                    topBidIndex,
                                    allBidsIndex,
                                    auctionUid
                                })}
                                rightIcon={!bid.contacted ? <RemoveCircleOutlineIcon style={{fill: themePalette.warningColor}}/> : <CheckCircleIcon style={{fill: themePalette.successColor}}/>}
                                />
                            <MenuItem 
                                primaryText="Date planned"
                                onClick={() => this.ownerBidPlanned({
                                    planned: !bid.planned,
                                    bid,
                                    topBidIndex,
                                    allBidsIndex,
                                    auctionUid
                                })}
                                rightIcon={!bid.planned ? <RemoveCircleOutlineIcon style={{fill: themePalette.warningColor}}/> : <CheckCircleIcon style={{fill: themePalette.successColor}}/>}
                                />
                        </IconMenu>
                    </div>
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
                        <Paper key={auctionOwned.uid} style={{ padding: '1em 1em .5em 1em', marginBottom: '1.5em' }}>
                            <div style={{ position: 'relative', marginBottom: '1em' }} className='row middle-xs middle-sm'>
                                <h3 className='col-xs-8 col-sm-6 col-md-8' style={{ margin: 0 }}>{auctionOwned.title}</h3>
                                <p className='col-xs-4 col-sm-6 col-md-4' style={{ fontSize: '12px', position: 'absolute', top: '4px', right: 0, margin: 0, color: themePalette.accent3Color }}>{auctionOwned.numberOffered} Offered</p>
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