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
import AttachMoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import LocalPlayIcon from 'material-ui/svg-icons/maps/local-play';
// import MailOutlineIcon from 'material-ui/svg-icons/communication/mail-outline';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RemoveCircleOutlineIcon from 'material-ui/svg-icons/content/remove-circle-outline'

import StatusStepper from './StatusStepper'

class Status extends Component {

    constructor(props) {
        super(props);
        this.ownerBidConfirmation = this.props.ownerBidConfirmation.bind(this);
        this.bidderBidConfirmation = this.props.bidderBidConfirmation.bind(this);
        this.ownerBidContacted = this.props.ownerBidContacted.bind(this);
        this.ownerBidPlanned = this.props.ownerBidPlanned.bind(this);
        this.setClaimStep = this.props.setClaimStep.bind(this);
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

        const totalAmountDue = auctionsWithUserBids.reduce((acc, curr) => {
            return acc + curr.userHighBid.bidAmount;
        }, 0);

        const amountPaid = user.amountPaid || 0; 

        const bidCount = !user.bids ? 0 : Object.keys(user.bids).length;
        const raffleTicketsEarned = !user.bids ? 0 : Math.floor(bidCount/config.BIDS_PER_FREE_RAFFLE);
        const bidModulus = !user.bids ? 0 : bidCount % config.BIDS_PER_FREE_RAFFLE;


        return (
            <div className='page'>

                {/* for copied email notifications */}
                <Snackbar
                    style={{bottom:'57px'}}
                    bodyStyle={{backgroundColor: themePalette.successColor}}
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    />

                <div className='text-content' style={{padding:'1em'}}>

                    <section className="row middle-xs"
                        hidden={!config.BIDDING_OPEN || !config.CONFIRM_WINNERS}
                        >
                        <h2 className="col-xs-12">
                            Raffle
                        </h2>
                        <div style={{display:'inline-block', marginTop:-5, marginRight:'.5rem', paddingLeft:'.5rem'}}>
                            Total Bids Placed: {bidCount}
                            <br/>
                            Tickets Earned: {raffleTicketsEarned}
                        </div>
                        <div style={{display:'inline-block', paddingLeft:'.5rem'}}>
                            {[...Array(raffleTicketsEarned + 1)].map( (emptyItem, i) => (
                                <div key={i} style={{display:'inline-block', width: i + 1 <= raffleTicketsEarned ? '50px' : 10*bidModulus + 'px', overflow:'hidden'}}>
                                    <LocalPlayIcon
                                        style={{height:'50px',width:'50px', color: themePalette.accent1Color}}
                                        />
                                </div>
                            ))}
                        </div>
                    </section>
                            
                    <section className="row middle-xs">
                        <h2 className="col-xs-10">Auctions with Your Bids</h2>
                        <div className="col-xs-2" style={{textAlign:'right'}}>
                            <IconButton
                                tooltip={this.state.showAuctionsWithYourBidsText ? 'Hide description' : 'Show description'}
                                tooltipPosition='top-left'
                                onClick={() => this.setState({showAuctionsWithYourBidsText: !this.state.showAuctionsWithYourBidsText, snackbar: {open: false, message: ''}}) }
                                style={{color: themePalette.secondaryLinkColor, minWidth: null}}
                                >
                                {this.state.showAuctionsWithYourBidsText ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                        </div>
                        {this.state.showAuctionsWithYourBidsText && (
                            <div className="col-xs-12">
                                <p>If you are the top bidder when the auction closes, you are expected to claim that item.</p>
                                <p>If an auction owner is awarding multiple winners and you have one of the highest few bids, you may be offered a chance to accept this at your highest bid for that item.</p>
                            </div>
                        )}
                        <div 
                            className="col-xs-12" 
                            hidden={config.BIDDING_OPEN || ( totalAmountDue <= amountPaid )}
                            style={{textAlign:'right'}}
                            >
                            <RaisedButton
                                hidden={totalAmountDue === 0}
                                buttonStyle={{backgroundColor: themePalette.accent1Color}}
                                label={'Venmo $' + (totalAmountDue - amountPaid)}
                                primary={true}
                                target='_blank'
                                href='https://www.venmo.com/EvanDana'
                                />
                            <FlatButton 
                                hidden={totalAmountDue === 0}
                                href='/donate'
                                style={{color: themePalette.ternaryTextColor}}
                                label='Other $ options'
                                />
                            <span 
                                hidden={totalAmountDue !== 0}
                                >
                                Thanks for your payments!
                            </span>
                        </div>

                        <span
                            className="col-xs-12"
                            hidden={totalAmountDue === 0 || config.BIDDING_OPEN}
                            style={{textAlign: 'right', color: themePalette.disabledColor, fontSize: '80%', paddingTop: '1em', paddingBottom: '1em', paddingRight: '2em'}}
                            > 
                            Payments not automatically reflected here
                        </span>
                        {
                            !auctionsWithUserBids || auctionsWithUserBids.length < 1 ? 
                                (config.BIDDING_OPEN ? this.createMessageDiv('You haven\'t made any bids yet') : this.createMessageDiv('Bidding not open')) : 
                                this.createLeadingBidTable(auctionsWithUserBids, config, themePalette)
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
                            {this.createOwnedAuctionTable(auctionsOwned, config, themePalette)}
                        </section>
                    )}

                </div>
            </div>
        );
    }

    createLeadingBidTable(auctionsWithUserBids, config, themePalette) {

        const {BIDDING_OPEN, CONFIRM_WINNERS, NUM_OFFERED_BUFFER} = config;

        const getStatus = (auction) => {

            const bid = auction.userHighBid,
                topBidIndex = auction.userHighBidRank,
                auctionUid = auction.uid;

            if (BIDDING_OPEN) {
                return 'Bidding Open';
            } else if (CONFIRM_WINNERS && auction.userHighBid.ownerConfirmed && auction.userHighBid.bidderConfirmed === undefined) {
                return <div style={{textAlign:'center'}}>
                    <RaisedButton style={{minWidth:undefined}} primary={true} label={'Confirm ($' + auction.userHighBid.bidAmount + ')'} onClick={() => this.bidderBidConfirmation({
                            bidderConfirmed: true,
                            bid,
                            topBidIndex,
                            auctionUid
                        })}></RaisedButton>
                    <FlatButton style={{minWidth:undefined, color: themePalette.fadedPrimary1Color}} label='Pass' onClick={() => this.bidderBidConfirmation({
                            bidderConfirmed: false,
                            bid,
                            topBidIndex,
                            auctionUid
                        })}/>
                </div>
            } else if (CONFIRM_WINNERS && (auction.userHighBid.ownerConfirmed === false || auction.userHighBidRank > auction.numberOffered + NUM_OFFERED_BUFFER)) {
                return 'Not won';
            } else if (CONFIRM_WINNERS && auction.userHighBid.ownerConfirmed !== true && auction.userHighBid.ownerConfirmed !== false) {
                return <span style={{color: themePalette.warningColor}}>Pending owner confirmation</span>;
            } else if (CONFIRM_WINNERS && auction.userHighBid.bidderConfirmed === true && auction.userHighBid.ownerConfirmed === true) {
                return <span style={{color: themePalette.accent1Color}}>Confirmed!</span>;
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
                            <div className={'row middle-xs middle-sm middle-md ' + (BIDDING_OPEN ? 'col-xs-12 col-sm-12 col-md-5' : 'col-xs-12 col-sm-7 col-md-8')}>
                                <h3 style={{ margin: 0, padding: '0 1em 0 0', display:'block'}}  
                                    className={BIDDING_OPEN ? 'col-xs-12' : CONFIRM_WINNERS && auctionWithUserBid.userHighBid.bidderConfirmed !== undefined && auctionWithUserBid.userHighBid.ownerConfirmed !== undefined ? 'col-xs-9 col-sm-10 col-md-10' : 'col-xs-6 col-sm-6 col-md-6'}>{
                                        auctionWithUserBid.title
                                    }</h3>
                                {BIDDING_OPEN ? '' : <div 
                                    style={{padding:0, margin:0, display:'block'}} 
                                    className={CONFIRM_WINNERS && auctionWithUserBid.userHighBid.bidderConfirmed !== undefined && auctionWithUserBid.userHighBid.ownerConfirmed !== undefined ? 'col-xs-3 col-sm-2 col-md-2' : 'col-xs-6 col-sm-6 col-md-6'}>{
                                    getStatus(auctionWithUserBid)
                                }</div>}
                            </div>

                            <div className={BIDDING_OPEN ? 'col-xs-12 col-sm-12 col-md-1' : 'col-xs-12 col-sm-1 col-md-1'}>&nbsp;</div>

                            <div className={BIDDING_OPEN ? 'col-xs-12 col-sm-12 col-md-6' : 'col-xs-12 col-sm-4 col-md-3'} style={{paddingLeft:0, paddingRight:0}}>
                                <Table selectable={false} style={{padding:0}}>
                                    <TableHeader
                                        displaySelectAll={false}
                                        adjustForCheckbox={false}
                                        style={{borderBottom: 'none'}}
                                        >
                                        <TableRow
                                            style={{borderBottom: 'none', height:'1em', }}
                                            >
                                            <TableHeaderColumn colSpan={2} style={{padding:0, height:'1em'}}>With</TableHeaderColumn>
                                            <TableHeaderColumn style={{padding:0, height:'1em'}}>Bid</TableHeaderColumn>
                                            {BIDDING_OPEN && <TableHeaderColumn style={{padding:0, height:'1em'}}>Bid Rank</TableHeaderColumn>}
                                            {BIDDING_OPEN && <TableHeaderColumn style={{padding:0, height:'1em'}}># Offered</TableHeaderColumn>}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody
                                        displayRowCheckbox={false}
                                    >
                                        <TableRow selectable={false} key={auctionWithUserBid.uid} style={{height:'1em'}}>
                                            <TableRowColumn style={{paddingTop: '1em', padding:0, height:'1em'}} colSpan={2}>{auctionWithUserBid.owner.displayName}</TableRowColumn>
                                            <TableRowColumn style={{paddingTop: '1em', padding:0, height:'1em'}}>${auctionWithUserBid.userHighBid.bidAmount}</TableRowColumn>
                                            {BIDDING_OPEN && <TableRowColumn style={{paddingTop: '1em', padding:0, height:'1em'}}>{auctionWithUserBid.userHighBidRank} / {auctionWithUserBid.bidCount}</TableRowColumn>}
                                            {BIDDING_OPEN && <TableRowColumn style={{paddingTop: '1em', padding:0, height:'1em'}}>{auctionWithUserBid.numberOffered}</TableRowColumn>}
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


    createOwnedAuctionTable(auctionsOwned, config, themePalette) {

        const {BIDDING_OPEN, CONFIRM_WINNERS} = config;

        const getBidStatus = (bid, topBidIndex, auctionUid) => {
            if (BIDDING_OPEN) {
                return 'Bidding open'; // will never be shown
            } else if (bid.ownerConfirmed === false) {
                return 'You declined';
            } else if (CONFIRM_WINNERS && bid.ownerConfirmed === undefined) {
                return <div>
                    {topBidIndex === 0 ? (
                        <RaisedButton primary={true} label={'Confirm'} onClick={() => this.ownerBidConfirmation({
                            ownerConfirmed: true,
                            bid,
                            topBidIndex,
                            auctionUid
                        })}></RaisedButton>
                    ) : (
                            <RaisedButton labelColor={themePalette.primaryLinkColor} label={'Request'} onClick={() => this.ownerBidConfirmation({
                                ownerConfirmed: true,
                                bid,
                                topBidIndex,
                                auctionUid
                            })}></RaisedButton>
                        )}
                    <FlatButton label='Pass' style={{ color: themePalette.primaryLinkColor }} onClick={() => this.ownerBidConfirmation({
                        ownerConfirmed: false,
                        bid,
                        topBidIndex,
                        auctionUid
                    })}></FlatButton>
                </div>
            } else if (CONFIRM_WINNERS && bid.bidderConfirmed === undefined) {
                return <span style={{ color: themePalette.warningColor }}>Pending Bidder</span>;
            } else if (CONFIRM_WINNERS && bid.ownerConfirmed === true && bid.bidderConfirmed === true) {
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

                        <IconButton 
                            tooltip="Copy email" 
                            onClick={() => {
                                copy(bid.bidderObj.email);
                                this.setState({snackbar: {open: true, message: bid.bidderObj.email + ' copied to clipboard'}})
                            }}
                            iconStyle={{fill: themePalette.primaryLinkColor}}
                            >
                            <ContentCopyIcon />
                        </IconButton>
                    </div>
                </div>
            } else if ( bid.bidderConfirmed === false) {
                return 'Bidder declined'
            } else {
                return 'Bidding closed';
            }
        }

        const getTopBidsElements = (auctionOwned) => {

            let topBidsElements = [];
            auctionOwned.topBids.forEach((bid, topBidIndex) => {
                topBidsElements.push(
                    <TableRow selectable={false} key={topBidIndex+'-main'} style={{borderBottom:''}}>
                        <TableRowColumn colSpan={1} style={{minWidth: '3em', padding:0}}>${bid.bidAmount}</TableRowColumn>
                        <TableRowColumn colSpan={2} style={{padding:0}}>{bid.bidderObj.name}</TableRowColumn>
                        {BIDDING_OPEN ? '' : <TableRowColumn colSpan={4} style={{padding:0}}>{
                            getBidStatus(bid, topBidIndex, auctionOwned.uid)
                        }</TableRowColumn>}
                    </TableRow>
                );
                if (CONFIRM_WINNERS && bid.ownerConfirmed === true && bid.bidderConfirmed === true) {
                    topBidsElements.push(
                        <TableRow selectable={false} key={topBidIndex+'-stepper'}>
                            <TableRowColumn colSpan={7} style={{paddingLeft:0, paddingRight:0, paddingBottom: '2em'}}>
                                <StatusStepper 
                                    claimStep={bid.claimStep} 
                                    setClaimStep={this.setClaimStep} 
                                    themePalette={themePalette}
                                    bidDetails={{
                                        bid, 
                                        auctionUid: auctionOwned.uid,
                                    }}
                                    />
                            </TableRowColumn>
                        </TableRow>
                    );
                }
            })
    
            return topBidsElements;
        }

        return (
            <div style={{width:'100%'}}>
                {auctionsOwned.map(auctionOwned => {
                    return (
                        <Paper key={auctionOwned.uid} style={{ padding: '1em 1em .5em 1em', marginBottom: '1.5em' }}>
                            <div style={{ position: 'relative', marginBottom: '1em' }} className='row middle-xs middle-sm'>
                                <h3 className='col-xs-8 col-sm-6 col-md-8' style={{ margin: 0 }}>{auctionOwned.title}</h3>
                                <p className='col-xs-4 col-sm-6 col-md-4' style={{ fontSize: '12px', position: 'absolute', top: '4px', right: 0, margin: 0, color: themePalette.accent3Color }}>Offering {auctionOwned.numberOffered}</p>
                            </div>

                            <div>{!auctionOwned.topBids || !auctionOwned.topBids.length ? 'No bids yet' : (

                                <Table selectable={false}>
                                    <TableBody displayRowCheckbox={false}>
                                        {getTopBidsElements(auctionOwned)}
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