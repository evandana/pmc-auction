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
             /*   <Auctions 
                    auctions={this.props.auctions}
                    expandedAuctionIdList={this.props.expandedAuctionIdList}
                />
            */
            </div>
        )
    }
    
    componentDidMount () {
        const { dispatch } = this.props
    }

}

function mapStateToProps (state) {
    return {
        auctions: state.auctions.auctionCollection,
        expandedAuctionIdList: state.auctions.expandedAuctionIdList
      }
}

export default connect(mapStateToProps)(AuctionsPage);
