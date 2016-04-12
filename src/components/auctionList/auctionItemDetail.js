// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Material UI
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Avatar from 'material-ui/lib/avatar';

import { getImageForEnv } from '../../images/index'

// Styles
import './_auctionItemDetail.scss';
// Application Components

class AuctionItemDetail extends Component {

	render() {
		const { placeBid, toggleAuctionDetail } = this.props

		let urlStr = getImageForEnv('pancakeBunny.png');

		console.log('item detail props', this.props, this.props.data.id)

		let data = this.props.data;

					// <h3>{data.title}</h3>
					// <p>{data.description}</p>
		return (
			<div className="detail-row-l"  onClick={ e => toggleAuctionDetail(this.props.data.id, e) } >
				<div colSpan="4">
					<Card>
						<CardTitle
							title="Card title"
							subtitle="Card subtitle"
						/>
						<CardActions>
							<FlatButton label="-" />
							<FlatButton label={ 'bid $' + (parseInt(data.openingBid, 10) + 5) } />
							<FlatButton label="+" />
						</CardActions>
						<CardText>
							<div className="detail-field"><label>Offered by</label><span>{data.donorName}</span></div>
							<div className="detail-field"><label>Description</label><span>{data.description}</span></div>
							<div className="detail-field"><label>Please use by</label><span>{data.expiration}</span></div>
						</CardText>
						<CardMedia
							overlay={<CardTitle title="Not pancakes and bunnies!" subtitle="delicious belgian beer and liege waffles" />}
							>
							<img src={urlStr} />
						</CardMedia>
					</Card>
				</div>
			</div>
		);
	}

}

export default AuctionItemDetail;
