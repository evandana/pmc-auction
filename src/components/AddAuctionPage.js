import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AddAuction from './containers/addAuction/AddAuction'

class AddAuctionPage extends Component {

    constructor(props) {
        super(props)
    }
      
    render () { 
        return (
            <AddAuction
                createAuctionForm={this.props.form}
                user={this.props.user}
            />
        )
        
    }
    
}

export default connect(mapStateToProps)(AddAuctionPage)

function mapStateToProps (state) {
    return {
        user: state.login.user,
        form: state.auctions.createAuctionForm
    }
}
