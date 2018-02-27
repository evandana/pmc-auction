import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import { Field, reduxForm } from 'redux-form'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';

import { createAuction } from 'actions';

import MuiForm from './MuiForm';

class CreateAuction extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.themePalette = this.props.muiTheme.palette;
        this.state = {
            selectedTab: !this.props.auctionsOwned || this.props.auctionsOwned.length < 1 ? 'new' : this.props.auctionsOwned[0].uid ,
        };
    }

    numberify(val, defaultValue) {
        return !val ? defaultValue : typeof val !== "number" ? parseInt(val, 10) : val;
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


    handleChange = (value) => {
        this.setState({
            selectedTab: value,
        });
    };

    render() {

        const { auctionsOwned } = this.props;

        const style = {
            field: {
                borderRight: '.5em solid #fff'
            }
        };

        return (
            <div className="page">
                <Tabs
                    tabItemContainerStyle={{ backgroundColor: this.themePalette.secondaryLinkColor }}
                    value={this.state.selectedTab}
                    onChange={this.handleChange}
                >
                    {auctionsOwned.map(auction => {
                        return (
                            <Tab 
                                label={auction.title.length < 17 ? auction.title : auction.title.substring(0,15) + '...'} 
                                value={auction.uid} 
                                key={auction.uid}
                                >
                                <div className="text-content">
                                    <MuiForm
                                        key={auction.uid}
                                        form={auction.uid}
                                        initialValues={auction}
                                        createAuctionSubmitForm={this.submitForm}
                                    />
                                </div>
                            </Tab>
                        );
                    })}
                    <Tab icon={<AddCircleIcon />} value={'new'}>
                        <div className="text-content">
                            <div className="col-xs-12">
                                <p>
                                    Thanks for offering to donate your time!
                                </p>
                                <p>
                                    Let me know if you have any further questions about this process. 
                                </p>
                            </div>
                            <MuiForm
                                form={'new'}
                                initialValues={{
                                    openingBid: 10,
                                    bidIncrement: 5,
                                    numberOffered: 1,
                                    useBy: '2018-09-01',
                                    show: true,
                                }}
                                createAuctionSubmitForm={this.submitForm}
                            />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )

    }

}

export default muiThemeable()(CreateAuction);


// export default muiThemeable()(reduxForm({
//     form: 'MaterialUiForm', // a unique identifier for this form
//     validate: this.validate,
//     // asyncValidate
// })(CreateAuction))