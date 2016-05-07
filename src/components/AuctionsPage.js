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

        // console.log('render auction page')
        return (
            <div>
                <Auctions
                    auctions={this.props.auctions}
                    expandedAuction={this.props.expandedAuction}
                    config={this.props.config}
                />
            </div>
        )
    }
}

function mapStateToProps (state) {
    // console.log('mapStateToProps auction page')
    return {
        auctions: state.auctions.auctionCollection,
        expandedAuction: state.auctions.expandedAuction,
        config: state.login.config
      }
}

export default connect(mapStateToProps)(AuctionsPage);
// export default AuctionsPage;