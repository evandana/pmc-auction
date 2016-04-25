// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { placeBid } from '../../actions/AuctionActions'

// Material UI
import Avatar from 'material-ui/lib/avatar';
import AddShoppingCart from 'material-ui/lib/svg-icons/action/add-shopping-cart';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import Colors, { cyan200 } from 'material-ui/lib/styles/colors';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import { getImageForEnv } from '../../images/index'

// Styles
import './_auctionItemDetail.scss';
// Application Components

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
		if (this.state.bidDisplayAmount >= parseInt(this.props.highestBid.bidAmount, 10) + this.props.increment ) {
			this.setState({validBidAmount: true, confirmModalOpen: true});
		} else {
			this.setState({validBidAmount: false, confirmModalOpen: true});
		}
	}

	handleClose() {
		this.setState({confirmModalOpen: false});
	}

	increaseBidAmount() {
		const bidDisplayAmount = parseInt(this.state.bidDisplayAmount, 10) + this.props.increment;
		this.setState({bidDisplayAmount: bidDisplayAmount});
		// console.log('bidDisplayAmount', bidDisplayAmount);
	}
	decreaseBidAmount() {
		const bidDisplayAmount = parseInt(this.state.bidDisplayAmount, 10) - this.props.increment >= parseInt(this.props.bidAmountMin, 10)
			?
				parseInt(this.state.bidDisplayAmount, 10) - this.props.increment
			:
				this.props.bidAmountMin;
		this.setState({bidDisplayAmount: bidDisplayAmount});
		// console.log('bidDisplayAmount', bidDisplayAmount);
	}

	render() {

		// console.log('render in item detail')

		const { placeBid, toggleAuctionDetail } = this.props

		let data = this.props.data,
			user = this.props.user;


		let urlStr = getImageForEnv( 'auction-big/' + data.image + '.png');

		let style = {
			hidden: {
				display:'none'
			},
			detailsPage: {
				position: 'relative'
			},
			actionsContainer: {
				zIndex: 100,
				position:'fixed',
				marginTop: 25,
				zIndex: 100,
				width: '100%',
				maxWidth: 675,
				textAlign: 'right'
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
			bidLess: {
				minWidth: 50,
				marginRight: 0,
				marginLeft: 0
			},
			bidMore: {
				minWidth: 50,
				marginRight: 0,
				marginLeft: 0
			},
			bidSubmit: {
				marginRight: 0,
				marginLeft: 0
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
			onTouchTap={ e => {
				this.handleClose();
				placeBid({
					bidderObj: user,
					bidAmount: this.state.bidDisplayAmount,
					auctionId: data.id
				}, e)
			}}
		  />,
		];

		return (
			<div className="auction-item-detail">
				<Card style={style.detailsPage} >
					<div style={style.actionsContainer}>
						<FloatingActionButton
							backgroundColor={cyan200}
							mini={true}
							style={style.closeButton}
							onClick={ e => toggleAuctionDetail('', e) }
						  >
						  <ContentClear />
						</FloatingActionButton>
					</div>
					<CardTitle
						title={data.title}
						subtitle={'with ' + data.donorName}
					/>
					{
						this.props.config.BIDDING_OPEN
						?
							<div style={style.bidContainer}>
								<CardActions>
									<FlatButton
										style={style.bidLess}
										label="-"
										onTouchTap={() => this.decreaseBidAmount()}
										disabled={
											parseInt(this.state.bidDisplayAmount, 10) <= (parseInt(this.props.bidAmountMin, 10))
											? true : false
										}
										hoverColor='white'
										/>
									<RaisedButton
										style={style.bidSubmit}
										label={ 'bid $' + this.state.bidDisplayAmount }
										labelPosition="before"
										primary={true}
										icon={<AddShoppingCart />}
										onTouchTap={() => this.handleOpen()}
									/>
									<FlatButton
										style={style.bidMore}
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
												'. Please bid higher than $' + (parseInt(this.props.highestBid.bidAmount, 10) + this.props.increment)
									}
									actions={actions}
									modal={false}
									open={this.state.confirmModalOpen}
									onRequestClose={() => this.handleClose() }
									>
									{data.title} with {data.donorName}
								</Dialog>
							</div>
						:
							''
					}
					<CardText>
						{
							this.state.modalMessage
							?
								<div className="detail-field detail-message"><label>MESSAGE</label><span>{this.state.modalMessage}</span></div>
							:
								''
						}
						<div className="detail-field">
							<label>Top Bid</label>
							{
								this.props.config.BIDDING_OPEN
								?
									<span>
										{this.props.highestBid && this.props.highestBid.bidderObj
											?
												'$' + this.props.highestBid.bidAmount + ' by ' + this.props.highestBid.bidderObj.persona
											:
												'$' + data.openingBid
										}
									</span>
								:
									<span style={style.biddingNotAvailable}>
										[bidding closed]
									</span>
							}
						</div>
						<div className="detail-field"><label>Description</label><span>{data.description}</span></div>
						<div className="detail-field"><label>Please use by</label><span>{data.expiration}</span></div>
					</CardText>
					<CardMedia
						overlay={<CardTitle subtitle={data.subTitle || data.title} />}
						>
						<img src={urlStr} />
					</CardMedia>
				</Card>
			</div>
		);
	}

}

function mapStateToProps (state) {

	const data = state.auctions.auctionCollection.find(
			auction => { return auction.id === state.auctions.expandedAuction.id; }
		);

	let highestBid = {bidAmount: parseInt(data.openingBid, 10)};
	for (let bid in data.bids) {
		if (parseInt(data.bids[bid].bidAmount, 10) > highestBid.bidAmount) {
			highestBid = data.bids[bid];
		}
	}

	const increment = parseInt(data.incrementAmount || 5, 10)

	data.openingBid = data.openingBid || 10;

	let bidAmountMin = parseInt(highestBid.bidAmount, 10) + increment;

	// if opening bid
	if (bidAmountMin === parseInt(data.openingBid, 10) + increment) {
		bidAmountMin = parseInt(data.openingBid, 10);
	}

	return {
		// app-level, static
		config: state.login.config,
		user: state.login.user,
		// item-level, static
		data: data,
		increment: increment,
		bidAmountMin: bidAmountMin,
		// item-level, dynamic values
		open: false,
		bidDisplayAmount: data.bids ? parseInt(highestBid.bidAmount || data.openingBid, 10) + increment : data.openingBid,
		highestBid: highestBid
	};
}

export default connect(mapStateToProps)(AuctionItemDetail);
