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
    console.log("HHH", errors)
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
            submitting
        } = this.props

        return (
            <form onSubmit={handleSubmit}>            
                <div>
                    <label>Title</label>
                    <input type="text" placeholder="Auction Title" {...title}/>
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" placeholder="Description" {...description}/>
                </div>
                <div>
                    <label>Opening Bid</label>
                    <input type="text" placeholder="0" {...openingBid}/>
                </div>
                <div>
                    <button type="submit" disabled={submitting}>
                        {submitting ? <i/> : <i/>} Submit
                    </button>
                </div>
                
            </form>
        )
    }
    
}

AuctionForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}


AuctionForm = reduxForm({
    form: 'auction-add',     // a unique name for this form
    fields                  // all the fields in your form
    //validate                 // validation settings
})(AuctionForm)


export default AuctionForm