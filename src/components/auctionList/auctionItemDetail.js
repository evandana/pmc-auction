// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { placeBid } from '../../actions/AuctionActions'

// Material UI
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Avatar from 'material-ui/lib/avatar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import Colors, { cyan200 } from 'material-ui/lib/styles/colors';

import { getImageForEnv } from '../../images/index'

// Styles
import './_auctionItemDetail.scss';
// Application Components

class AuctionItemDetail extends Component {

    constructor(props) {
        super(props)
  	}

	render() {
		const { placeBid, toggleAuctionDetail } = this.props


		let user = this.props.user,
			data = this.props.auctions.find(
					auction => { return auction.id === this.props.data.id; }
				);

		//debugger;

		let urlStr = getImageForEnv( 'auction-big/' + data.image + '.png');

		// console.log('item detail props', this.props, this.props.data.id)

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
		console.log('data', data);
		console.log('data.bids', data.bids);

		return (
			<div className="auction-item-detail">
				<Card style={style.detailsPage} >
				    <div style={style.actionsContainer}>
					    <FloatingActionButton
					    	backgroundColor={cyan200}
					    	mini={true}
					    	style={style.closeButton}
					    	onClick={ e => toggleAuctionDetail(this.props.data.id, e) }
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
							<CardActions>
								<FlatButton label="-" />
								<FlatButton
									label={ 'bid $' + (parseInt(data.openingBid, 10) + 5) }
									onClick={ e => placeBid({
										bidderObj: user,
										bidAmount: data.openingBid,
										auctionId: data.id
									}, e) }
								/>
								<FlatButton label="+" />
							</CardActions>
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

