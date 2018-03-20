import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import Paper from 'material-ui/Paper';

import { Field, reduxForm } from 'redux-form'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import ImageUpload from 'components/controller/ImageUpload';

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
        // console.log('form', formData);
        const { dispatch, user } = this.props;

        formData.commercialValue = this.numberify(formData.commercialValue, 0);
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

        const { auctionsOwned, images } = this.props;

        const style = {
            field: {
                borderRight: '.5em solid #fff'
            }
        };

        return (
            <div className="page">
                <Tabs
                    inkBarStyle={{background: this.themePalette.highlight1Color}}
                    tabItemContainerStyle={{ backgroundColor: this.themePalette.ternaryTextColor }}
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
                                <ImageUpload />
                                <div className="text-content">
                                    <MuiForm
                                        key={auction.uid}
                                        form={auction.uid}
                                        initialValues={auction}
                                        auctionSubmitLabel='Save'
                                        createAuctionSubmitForm={this.submitForm}
                                        images={images}
                                    />
                                </div>
                            </Tab>
                        );
                    })}
                    <Tab icon={<AddCircleIcon />} value={'new'}>
                        <div className="text-content">
                            <Paper style={{
                                width: '100%',
                                padding: '1em',
                                marginTop: '-.5em',
                                marginBottom: '1.5em',
                                border: '1px solid '+ this.themePalette.accent1Color,
                                background: '#eee'
                            }}>
                                <h3>Thanks for offering to donate your time!</h3>
                                <p>
                                    Text or email images (landscape orientation) to Evan
                                </p>

                                <h3>Auction success tips:</h3>
                                <ul>
                                    <li>Think about experiences that you would love doing</li>
                                    <li>Feature your skills and talents</li>
                                    <li>Include a "commercial value" aspect to it in some way, even if just a cup of coffee</li>
                                </ul>
                                <ImageUpload />
                            </Paper>
                            <MuiForm
                                form={'new'}
                                initialValues={{
                                    openingBid: 10,
                                    bidIncrement: 5,
                                    numberOffered: 1,
                                    useBy: '2018-09-01',
                                    show: true,
                                }}
                                auctionSubmitLabel='Create Auction'
                                createAuctionSubmitForm={this.submitForm}
                                images={images}
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