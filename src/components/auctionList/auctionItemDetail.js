// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Styles
// import './header.scss';
// Application Components

class AuctionItemDetail extends Component {

	render() {
		const { placeBid } = this.props
		
		console.log(this.props)

		return (
			<div className="listing-row-container pure-g">
				<div className="listing-row-infoCol pure-u-1-2">
					<div className="listing-row-title">{this.props.data.title}</div>
					<div className="listing-row-infoContainer pure-g">
						<div className="listing-row-infoColLeft pure-u-1-2">Info Col Left</div>
						<div className="listing-row-infoColRight pure-u-1-2">Info Col Right</div>
					</div>
				</div>
				<div className="listing-row-bidCol pure-u-1-2">
					<div>{this.props.data.openingBid}</div>
					<button
						onClick={e => placeBid(1,2)}>
						BID
					</button>
				</div>
			</div>
		)
	}

}

export default AuctionItemDetail;
