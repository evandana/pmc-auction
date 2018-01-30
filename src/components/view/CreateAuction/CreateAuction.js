import React, { Component } from 'react'

import { createAuction } from 'actions';

import MuiForm from './MuiForm';

class CreateAuction extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }


    numberify (val, defaultValue ) {
        return !val ? defaultValue : typeof val !== "number" ? parseInt(val,10) : val;
    }
    
    submitForm(formData) {
        console.log('form', formData);
        const { dispatch, user } = this.props;
        
        formData.openingBid = this.numberify(formData.openingBid, 15);
        formData.highestBid = this.numberify(formData.highestBid, 0);
        formData.bidIncrement = this.numberify(formData.bidIncrement, 5);
        formData.numberOffered = this.numberify(formData.numberOffered, 1);
        
        dispatch(createAuction(formData, user));
    }

    render() {
        return (
            <div className="page">
                <div className="text-content">
                    <MuiForm
                        submitForm={this.submitForm}
                    />
                </div>
            </div>
        )

    }

}

export default CreateAuction;
