// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { placeBid } from '../../actions/AuctionActions'

// Material UI
import Avatar from 'material-ui/lib/avatar';
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
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import { getImageForEnv } from '../../images/index'

// Styles
import './_auctionItemDetail.scss';
// Application Components

class AuctionItemDetail extends Component {

    constructor(props) {
        super(props)

		let user = this.props.user,
			data = this.props.auctions.find(
					auction => { return auction.id === this.props.data.id; }
				);

		let highestBid = {bidAmount: 0};
		for (let bid in data.bids) {
			if (parseInt(data.bids[bid].bidAmount, 10) > highestBid.bidAmount) {
				highestBid = data.bids[bid];
			}
		}

		this.increment = parseInt(data.incrementAmount, 10);
		this.bidAmountMin = parseInt(highestBid.bidAmount, 10) + this.increment;

	    this.state = {
	      open: false,
	      bidDisplayAmount: data.bids ? parseInt(highestBid.bidAmount, 10) + this.increment : data.openingBid,
	      highestBid: highestBid,
	      data: data,
	      user: user
	    };
  	}

	handleOpen = () => {
		this.setState({open: true});
	}

	handleClose = () => {
		this.setState({open: false});
	}

	increaseBidAmount() {
		const bidDisplayAmount = this.state.bidDisplayAmount + this.increment;
		this.setState({bidDisplayAmount: bidDisplayAmount});
		console.log('bidDisplayAmount', bidDisplayAmount);
	}
	decreaseBidAmount() {
		const bidDisplayAmount = this.state.bidDisplayAmount - this.increment >= this.bidAmountMin
			?
				this.state.bidDisplayAmount - this.increment
			:
				this.bidAmountMin;
		this.setState({bidDisplayAmount: bidDisplayAmount});
		console.log('bidDisplayAmount', bidDisplayAmount);
	}

	render() {










		// TODO: update min bid amount on state update from bottom of this doc










		let data = this.state.data,
			user = this.state.user;

		// modal actions
	    const actions = [
	      <FlatButton
	        label="Cancel"
	        secondary={true}
	        onTouchTap={this.handleClose}
	      />,
	      <FlatButton
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
	        // onTouchTap={this.handleClose}
	      />,
	    ];

		const { placeBid, toggleAuctionDetail } = this.props

		// debugger;

		let urlStr = getImageForEnv( 'auction-big/' + data.image + '.png');

		let style = {
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
			}
		}

		// <h3>{data.title}</h3>
		// <p>{data.description}</p>

		// console.log('auctionItemDetails', this.props)
		// console.log('data', data);
		// console.log('data.bids', data.bids);

		return (
			<div className="auction-item-detail">
				<Card style={style.detailsPage} >
				    <div style={style.actionsContainer}>
					    <FloatingActionButton
					    	backgroundColor={cyan200}
					    	mini={true}
					    	style={style.closeButton}
					    	onClick={ e => toggleAuctionDetail(data.id, e) }
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
							<div>
								<CardActions>
									<FlatButton label="-" onTouchTap={() => this.decreaseBidAmount()}/>
									<FlatButton
										label={ 'bid $' + this.state.bidDisplayAmount }
										onTouchTap={this.handleOpen}
									/>
									<FlatButton label="+" onTouchTap={() => this.increaseBidAmount()}/>
								</CardActions>
								<Dialog
									title={'Confirm Bid for $' + this.state.bidDisplayAmount}
									actions={actions}
									modal={false}
									open={this.state.open}
									onRequestClose={this.handleClose}
									>
									{data.title} with {data.donorName}
								</Dialog>
							</div>
						:
							<CardText style={style.biddingNotAvailable}>Bidding closed at this time</CardText>
					}
					<CardText>
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
	console.log('state', state)
    return {
        config: state.login.config,
        user: state.login.user,
        auctions: state.auctions.auctionCollection
      }
}

export default connect(mapStateToProps)(AuctionItemDetail);

