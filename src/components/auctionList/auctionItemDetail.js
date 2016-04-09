// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Styles
// import './header.scss';
// Application Components

class AuctionItemDetail extends Component {

	render() {
		const { placeBid, toggleAuctionDetail } = this.props

		let loc = 'pancakeBunny.png',
			 urlStr = require('url-loader?limit=8192!' + 'images/pancakeBunny.png');

		console.log('item detail props', this.props, this.props.data.id)

		return (
			<div className="detail-row-l"  onClick={ e => toggleAuctionDetail(this.props.data.id, e) } >
				<div colSpan="4">
					<div>{this.props.data.description}</div>
					<div className="detail-row-image"><img src={urlStr} /></div>
				</div>
			</div>
		);
	}

}

export default AuctionItemDetail;
