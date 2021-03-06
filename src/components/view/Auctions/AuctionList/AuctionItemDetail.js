// Libraries
import moment from 'moment';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';

import { Link } from 'react-router-dom'

// Material UI
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
// import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardText from 'material-ui/Card/CardText';
import CardTitle from 'material-ui/Card/CardTitle';
import { cyan200 } from 'material-ui/styles/colors';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { getImageForEnv } from 'static/images/index'

// Styles
import './_auctionItemDetail.css';
// Application Components


const DEFAULT_OPENING_BID = 10;
const DEFAULT_INCREMENT_AMOUNT = 5;

class AuctionItemDetail extends Component {

	constructor(props) {
		super(props)
		this.state = Object.assign(false, {}, {
			confirmModalOpen: props.open,
			bidDisplayAmount: props.bidDisplayAmount,
			validBidAmount: true
		});
	}

	handleOpen() {
		if (this.state.bidDisplayAmount >= this.props.bidAmountMin) {
			this.setState({ validBidAmount: true, confirmModalOpen: true });
		} else {
			this.setState({ validBidAmount: false, confirmModalOpen: true });
		}
	}

	handleClose() {
		this.setState({ confirmModalOpen: false });
	}

	increaseBidAmount() {
		const bidDisplayAmount = this.state.bidDisplayAmount + this.props.increment;
		this.setState({ bidDisplayAmount: bidDisplayAmount });
		// console.log('bidDisplayAmount', bidDisplayAmount);
	}
	decreaseBidAmount() {
		const bidDisplayAmount = this.state.bidDisplayAmount - this.props.increment >= this.props.bidAmountMin
			?
			this.state.bidDisplayAmount - this.props.increment
			:
			this.props.bidAmountMin;
		this.setState({ bidDisplayAmount: bidDisplayAmount });
		// console.log('bidDisplayAmount', bidDisplayAmount);
	}

	translateNewLinesToBrs(text) {
		return text.split('\n').map(function (item, key) {
			return (
				<p key={key}>
					{item}
				</p>
			)
		});
	}

	render() {

		const { error } = this.props;

		if (error) {
			return (
				<div className="loader">
					<div className="loader-spinner" />
				</div>
			);
		}

		const {
			config,
			data,
			highestBid,
			history,
			placeBid,
			user,
		} = this.props;

		let urlStr = data.auctionImage || getImageForEnv('auction-big/' + (data.image || 'default') + '.png');

		let style = {
			hidden: {
				display: 'none'
			},
			detailsPage: {
				position: 'relative'
			},
			actionsContainer: {
				marginTop: 25,
				maxWidth: 675,
				position: 'fixed',
				textAlign: 'right',
				width: '100%',
				zIndex: 100,
			},
			closeButton: {
			},
			subtitle: {
				fontSize: 14
			},
			biddingNotAvailable: {
				color: '#999'
			},
			bidContainer: {
				textAlign: 'center'
			},
			labelStyle: {
				fontSize: 25
			},
			bidLess: {
				minWidth: 50,
				marginRight: 0,
				marginLeft: 0,
				fontSize: 25
			},
			bidMore: {
				minWidth: 50,
				marginRight: 0,
				marginLeft: 0,
				fontSize: 25
			},
			bidSubmit: {
				marginRight: 0,
				marginLeft: 0,
				fontSize: 25
			}
		}

		// modal actions
		const actions = [
			<FlatButton
				label="Cancel"
				secondary={true}
				onTouchTap={() => this.handleClose()}
			/>,
			<FlatButton
				style={this.state.validBidAmount ? {} : style.hidden}
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={e => {
					this.handleClose();
					placeBid({
						bidderObj: user,
						bidAmount: this.state.bidDisplayAmount,
						auctionUid: data.uid
					}, e)
				}}
			/>,
		];

		const cleanReferenceLink = (linkText) => {
			return linkText.replace(/https?:\/\/(www\.)?/ig, '');
		}

		return (
			<div className="auction-item-detail">
				<Card style={style.detailsPage} >
					<div className="row middle-xs middle-sm middle-md" style={{ marginLeft: 0, marginRight: 0 }}>
						<CardTitle
							title={data.title}
							subtitle={'with ' + data.owner.displayName}
							className="col-xs-9 col-sm-10 col-md-11"
						/>
						<div className="col-xs-3 col-sm-2 col-md-1">
							<FloatingActionButton
								backgroundColor='#8EC449' // TODO: make this use themePalette
								mini={true}
								style={style.closeButton}
								onClick={e => {
									document.body.scrollTop = document.documentElement.scrollTop = 0;
									e.preventDefault();
									e.stopPropagation();
									history.push('/auctions');
								}}
							>
								<ContentClear />
							</FloatingActionButton>
						</div>
					</div>
					{
						(config.BIDDING_OPEN && user.persona !== data.owner.persona) || user.permissions.admin === true
							?
							<div style={style.bidContainer}>
								<CardActions>
									<FlatButton
										style={style.bidLess}
										labelStyle={style.actionLabel}
										label="-"
										onTouchTap={() => this.decreaseBidAmount()}
										disabled={
											// TODO: remove these `state` and `props` references
											this.state.bidDisplayAmount <= this.props.bidAmountMin
												? true : false
										}
										hoverColor='white'
									/>
									<RaisedButton
										style={style.bidSubmit}
										labelStyle={style.actionLabel}
										// TODO: remove this `state` reference
										label={'bid $' + this.state.bidDisplayAmount}
										labelPosition="before"
										primary={true}
										icon={<AddShoppingCart />}
										onTouchTap={() => this.handleOpen()}
									/>
									<FlatButton
										style={style.bidMore}
										labelStyle={style.actionLabel}
										label="+"
										onTouchTap={() => this.increaseBidAmount()}
									/>
								</CardActions>
								<Dialog
									title={this.state.validBidAmount
										?
										'Confirm Bid for $' + this.state.bidDisplayAmount
										:
										'This is a hot item! Highest bid is now $' + this.props.highestBid.bidAmount +
										'. Please bid at least $' + (this.props.highestBid.bidAmount + this.props.increment)
									}
									actions={actions}
									modal={false}
									open={this.state.confirmModalOpen}
									onRequestClose={() => this.handleClose()}
								>
									{data.title} with {data.owner.displayName}
								</Dialog>
							</div>
							:
							''
					}
					{config.BIDDING_OPEN && user.persona === data.owner.persona && user.permissions.admin !== true ? (
						<div style={style.bidContainer}>
							<CardActions>
								<RaisedButton
									disabled={true}
									style={style.bidSubmit}
									labelStyle={style.actionLabel}
									label='You own this auction'
									labelPosition="before"
									/>
							</CardActions>
						</div>
					) : ''}
					<CardText>
						{
							this.state.modalMessage
								?
								<div className="detail-field detail-message"><label>MESSAGE</label><span>{this.state.modalMessage}</span></div>
								:
								''
						}
						<div className="detail-field">
							<label>{data.highestBid === 0 ? 'Opening Bid' : 'Top Bid'}</label>
							{data.highestBid === 0 && config.BIDDING_OPEN ? (
								<span>
									${data.openingBid}
								</span>
							) : (
									<span style={config.BIDDING_OPEN ? {} : style.biddingNotAvailable}>
										{
											config.BIDDING_OPEN
												?
												<span>
													${highestBid && highestBid.bidderObj ?
														highestBid.bidAmount + (!highestBid.bidderObj.persona ? '' : (highestBid.bidderObj.persona === user.persona ? ' (you)' : ' by ' + highestBid.bidderObj.persona))
														:
														data.openingBid
													}
												</span>
												:
												'[bidding closed]'
										}
									</span>
								)
							}


						</div>
						{ !data.commercialValue || data.highestBid > data.commercialValue ? '' : <div className="detail-field"><label>Value</label><span>${data.commercialValue}</span></div>}
						<div className="detail-field"><label>Location</label><span>{data.location}</span></div>
						<div className="detail-field"><label>Description</label><span>{this.translateNewLinesToBrs(data.description)}</span></div>
						<div className="detail-field"><label>Use by</label><span>{moment(data.useBy).format('MMM Do')}</span></div>
						{/* 
							// Hiding this so it doesn't influence people to not bid higher
							<div className="detail-field"><label>Qty offered</label><span>{data.numberOffered}</span></div> */}
						{ !data.referenceLink ? '' : (
							<div className="detail-field"><label>More Info</label><FlatButton 
								style={{height:'auto', marginTop: -2}} 
								labelStyle={{paddingLeft:0}} 
								target="_blank" 
								href={(data.referenceLink.indexOf('http') > -1 ? '' : 'https://') + data.referenceLink} 
								label={cleanReferenceLink(data.referenceLink).length < 25 ? cleanReferenceLink(data.referenceLink) : cleanReferenceLink(data.referenceLink).substr(0,25) + '...'}
								/></div>
						)}
					</CardText>
					<CardMedia
						overlayContentStyle={{top:0, bottom:''}}
						overlay={<CardTitle subtitle={data.subTitle || data.title} />}
					>
						<img alt="Auction item teaser" src={urlStr} />
					</CardMedia>
				</Card>
			</div>
		);
	}

}

function getAuctionBidsAsArray(auction) {
    return !auction.bids || !Object.keys(auction.bids).length ? [] : Object.keys(auction.bids)
		.map(personaAsBidKey => auction.bids[personaAsBidKey]);
}

function mapStateToProps(state) {

	const auctionUidFromRouter = state.router.location.pathname.replace('/auctions/','');

	const auction = state.auctions.auctionCollection.find(
		auction => { return auction.uid === auctionUidFromRouter; }
	);

	if (!auction) {
		return {error: 'auction not found'};
	}

	let highestBidObj = !auction.bids || Object.keys(auction.bids).length < 1 ? {} : getAuctionBidsAsArray(auction).sort((a, b) => {
		return a.bidAmount < b.bidAmount;
	})[0];

	highestBidObj = highestBidObj.bidAmount ? highestBidObj : {};

	const highestBidVal = Math.max(auction.highestBid, highestBidObj.bidAmount || 0);

	const increment = auction.incrementAmount || DEFAULT_INCREMENT_AMOUNT
	const openingBid = auction.openingBid || DEFAULT_OPENING_BID;
	const bidAmountMin = highestBidVal > 0 ? highestBidVal + increment : openingBid;

	return {
		// app-level, static
		config: state.config,
		user: state.auctions.user,
		// item-level, static
		data: auction,
		increment: increment,
		bidAmountMin: bidAmountMin,
		// item-level, dynamic values
		open: false,
		bidDisplayAmount: bidAmountMin,
		highestBid: highestBidObj
	};
}


const AuctionItemDetailWithRouter = withRouter(AuctionItemDetail);

export default connect(
	mapStateToProps
)(AuctionItemDetailWithRouter);
