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
        console.log("RENDER ", this.props)
        return (
            <div>
                <Auctions auctions={this.props.auctions} />
            </div>
        )
    }
    
    componentDidMount () {
        const { dispatch } = this.props
    }

}

function mapStateToProps (state) {
    return {
        auctions: state.auctions.auctionCollection
      }
}

export default connect(mapStateToProps)(AuctionsPage);
