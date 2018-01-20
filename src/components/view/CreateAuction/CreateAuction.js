import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import CreateAuctionForm from './CreateAuctionForm'

import RemoteSubmit from './RemoteSubmit';
import RemoteSubmitButton from './RemoteSubmitButton';

import { createAuction } from 'actions';

import MuiForm from './MuiForm';

class CreateAuction extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(formData) {
        console.log('form', formData);
        const { dispatch, user } = this.props;
        dispatch(createAuction(formData, user));
    }

    render() {
        return (
            <div className="page">
                <div className="text-content">
                    <MuiForm
                        submitForm={this.submitForm}
                    />
                    {/* <RemoteSubmit />
                <RemoteSubmitButton /> */}
                </div>
            </div>


            // <CreateAuctionForm
            //     createAuctionForm={this.props.form}
            //     user={this.props.user}
            // />
            // <h2>create auction</h2>
        )

    }

}

export default CreateAuction;
