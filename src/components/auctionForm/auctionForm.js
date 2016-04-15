// Libraries
import React, { Component, PropTypes } from 'react'
import {reduxForm} from 'redux-form'

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
                openingBid
            },
            handleSubmit,
            submitting,
            resetForm
        } = this.props

        return (
            <form onSubmit={handleSubmit}>            
                <div>
                    <label>Title</label>
                    <input type="text" placeholder="Auction Title" {...title}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                        {...description}
                        value={description.value || ''}
                    />
                </div>
                <div>
                    <label>Opening Bid</label>
                    <input type="text" placeholder="0" {...openingBid}/>
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