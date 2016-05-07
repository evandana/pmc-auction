// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'

import AuctionForm from '../../auctionForm/auctionForm'

import { createAuction } from '../../../actions/AuctionActions'

// Styles
// import './header.scss';
// Application Components

class AddAuction extends Component {

    constructor(props) {
        super(props)
    }

    handleSubmit(formData) {
        this.props.dispatch(createAuction(formData, this.props.user))
    }

    render () {
        return (
            <div>
                <AuctionForm
                    title={'Test Title'}
                    description={''}
                    openingBid={0}
                    onSubmit={this.handleSubmit.bind(this)}
                />
            </div>
        )
    }

}

export default connect()(AddAuction)
