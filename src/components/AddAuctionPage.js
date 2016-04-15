import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AddAuction from './containers/addAuction/AddAuction'

class AddAuctionPage extends Component {

    constructor(props) {
        super(props)
    }
      
    render () { 
        return (
            <AddAuction />
        )
        
    }
    
}

export default connect()(AddAuctionPage)
