// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Styles
import './_auctionItemDetail.scss';
// Application Components

class AuctionItemDetail extends Component {

	render() {
		const { placeBid, toggleAuctionDetail } = this.props

		let loc = 'pancakeBunny.png',
			 urlStr = require('url-loader?limit=8192!' + 'images/pancakeBunny.png');

		console.log('item detail props', this.props, this.props.data.id)

		let data = this.props.data;

		return (
			<div className="detail-row-l"  onClick={ e => toggleAuctionDetail(this.props.data.id, e) } >
				<div colSpan="4">
					<h3>{data.description}</h3>
					<div className="detail-field"><label>closeDate</label><span>{data.closeDate}</span></div>
					<div className="detail-field"><label>description</label><span>{data.description}</span></div>
					<div className="detail-field"><label>donorId</label><span>{data.donorId}</span></div>
					<div className="detail-field"><label>donorName</label><span>{data.donorName}</span></div>
					<div className="detail-field"><label>expiration</label><span>{data.expiration}</span></div>
					<div className="detail-field"><label>id</label><span>{data.id}</span></div>
					<div className="detail-field"><label>openDate</label><span>{data.openDate}</span></div>
					<div className="detail-field"><label>openingBid</label><span>{data.openingBid}</span></div>
					<div className="detail-field"><label>title</label><span>{data.title}</span></div>
					<div className="detail-row-image"><img src={urlStr} /></div>
				</div>
			</div>
		);
	}

}

export default AuctionItemDetail;
