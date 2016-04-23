// REACT/REDUX
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// CONTAINER COMPONENTS
import Auctions from './containers/auctions/Auctions'

class AuctionsPage extends Component {

    constructor(props) {
        super(props)
      }

    render () {

        return (
            <div>
                <Auctions
                    auctions={this.props.auctions}
                    expandedAuctionIdList={this.props.expandedAuctionIdList}
                    config={this.props.config}
                />
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        auctions: state.auctions.auctionCollection,
        expandedAuctionIdList: state.auctions.expandedAuctionIdList,
        config: state.login.config
      }
}

export default connect(mapStateToProps)(AuctionsPage);
