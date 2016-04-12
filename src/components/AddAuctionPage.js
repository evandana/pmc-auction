import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AddAuction from './containers/addAuction/AddAuction'

class AddAuctionPage extends Component {

    constructor(props) {
        super(props)
    }
      
    render () { 
    
        console.log("LL", this)
    
        return (
            <AddAuction />
        )
        
    }
    
}

function mapStateToProps (state) {
    
    console.log("EE", state);
    
    return {
        auctions: state.auctions.auctionCollection,
        expandedAuctionIdList: state.auctions.expandedAuctionIdList
      }
}

export default connect(mapStateToProps)(AddAuctionPage)