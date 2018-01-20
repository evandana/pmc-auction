// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'

import CreateAuctionForm from './CreateAuctionForm'

import { createAuction } from 'actions'

// Styles
// import './header.scss';
// Application Components

class CreateAuctionView extends Component {

    constructor(props) {
        super(props)
    }

    handleSubmit(formData) {
        this.props.dispatch(createAuction(formData, this.props.user))
    }

    render () {
        return (
            <div>
                <CreateAuctionForm
                    title={'Test Title'}
                    description={''}
                    openingBid={0}
                    onSubmit={this.handleSubmit.bind(this)}
                />
            </div>
        )
    }

}

export default connect()(CreateAuctionView)
