// Libraries
import React, { Component, PropTypes } from 'react'
import {reduxForm} from 'redux-form'

import TextField from 'material-ui/lib/text-field';

import './_auctionForm.scss'

export const fields = [ 'title', 'description', 'openingBid' ]

const validate = values => {
    const errors = {}

    if (!values.title) {
        errors.username = 'Required'
    }

    if (!values.description) {
        errors.description = 'Required'
    }

    if (!values.openingBid) {
        errors.age = 'Required'
    }
    return errors
}

class AuctionForm extends Component {

    render() {

        const {
            fields: {
                title,
                description,
                openingBid,
                subTitle,
                expiration
            },
            handleSubmit,
            submitting,
            resetForm
        } = this.props

        return (
            <form onSubmit={handleSubmit} className="auction-form">
                <div>
                    <label>Title</label>
                    <TextField type="text" hintText="Auction Title" {...title}/>
                </div>
                <div>
                    <label>Description</label>
                    <TextField
                        {...description}
                        multiLine={true}
                        rows={2}
                        rowsMax={4}
                        value={description.value || ''}
                    />
                </div>
                <div>
                    <label>Opening Bid</label>
                    <TextField type="text" hintText="0" {...openingBid}/>
                </div>
                <div>
                    <label>Sub title</label>
                    <TextField type="text" hintText="0" {...subTitle}/>
                </div>
                <div>
                    <label>Expiration</label>
                    <TextField type="text" hintText="0" {...expiration}/>
                </div>
                <div>
                    <button type="submit" disabled={submitting}>
                        {submitting ? <i/> : <i/>} Submit
                    </button>
                    <button type="button" disabled={submitting} onClick={resetForm}>
                        Clear Values
                    </button>
                </div>

            </form>
        )
    }

}

AuctionForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}


AuctionForm = reduxForm({
    form: 'create-auction',     // a unique name for this form
    fields                  // all the fields in your form
    //validate                 // validation settings
})(AuctionForm)


export default AuctionForm