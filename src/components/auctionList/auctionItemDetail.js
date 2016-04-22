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
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import Colors, { cyan200 } from 'material-ui/lib/styles/colors';

import { getImageForEnv } from '../../images/index'

// Styles
import './_auctionItemDetail.scss';
// Application Components

class AuctionItemDetail extends Component {

	render() {
		const { placeBid, toggleAuctionDetail } = this.props

		let data = this.props.data;

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
			}
		}


					// <h3>{data.title}</h3>
					// <p>{data.description}</p>
		return (
			<div>
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
					{ false ? <CardActions>
						<FlatButton label="-" />
						<FlatButton label={ 'bid $' + (parseInt(data.openingBid, 10) + 5) } />
						<FlatButton label="+" />
					</CardActions> : ''}
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

export default AuctionItemDetail;
