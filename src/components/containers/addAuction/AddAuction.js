// Libraries
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AuctionForm from '../../auctionForm/auctionForm'

import { addAuction} from '../../../actions/AuctionActions'

// Styles
// import './header.scss';
// Application Components

const AddAuction = () => {
    return (
        <div>
            <AuctionForm 
                title={''}
                description={''}
                openingBid={0}
                onSubmit={addAuction}
            />
        </div>
    )
}

export default AddAuction