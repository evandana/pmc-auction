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

    validate(values) {
        const errors = {}
        // const requiredFields = [
        //   'firstName',
        //   'lastName',
        //   'email',
        //   'favoriteColor',
        //   'notes'
        // ]
        // requiredFields.forEach(field => {
        //   if (!values[field]) {
        //     errors[field] = 'Required'
        //   }
        // })
        // if (
        //   values.email &&
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        // ) {
        //   errors.email = 'Invalid email address'
        // }
        return errors;
    }

    renderTextField({
        input,
        label,
        type,
        hintText,
        meta: { touched, error },
        ...custom
        }) {
        return (
            <TextField
                floatingLabelText={label}
                errorText={touched && error}
                floatingLabelFixed={type === 'date' ? true : false}
                hintText={type === 'date' ? '' : hintText || label}
                type={type}
                {...input}
                {...custom}
            />
        );
    }

    renderCheckbox({ input, label }) {
        return (
            <Checkbox
                label={label}
                checked={input.value ? true : false}
                onCheck={input.onChange}
            />
        );
    }


    // const renderRadioGroup = ({ input, ...rest }) => (
    //   <RadioButtonGroup
    //     {...input}
    //     {...rest}
    //     valueSelected={input.value}
    //     onChange={(event, value) => input.onChange(value)}
    //   />
    // )

    // const renderSelectField = ({
    //   input,
    //   label,
    //   meta: { touched, error },
    //   children,
    //   ...custom
    // }) => (
    //     <SelectField
    //       floatingLabelText={label}
    //       errorText={touched && error}
    //       {...input}
    //       onChange={(event, index, value) => input.onChange(value)}
    //       children={children}
    //       {...custom}
    //     />
    //   )  

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

        const { handleSubmit, pristine, reset, submitting, auctionsOwned } = this.props;

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
                        console.log('create auction', auction);
                        return (
                            <Tab 
                                label={auction.title.length < 17 ? auction.title : auction.title.substring(0,15) + '...'} 
                                value={auction.uid} 
                                key={auction.uid}
                                >
                                <div className="text-content">
                                    <MuiForm
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
                            <MuiForm
                                form='new'
                                initialValues={{}}
                                createAuctionSubmitForm={this.submitForm}
                            />
                        </div>
                    </Tab>
                    {/* <Tab label="Auction 2" value="b">
                        <div className="text-content">
                            <form onSubmit={handleSubmit(this.submitForm)}>
                                <section className="row middle-xs middle-sm">
                                    <RaisedButton className="col-xs-6" type="submit" style={{ padding: 0 }} primary disabled={pristine || submitting}>
                                        Submit
                                    </RaisedButton>
                                    <FlatButton className="col-xs-6" type="button" style={{ padding: 0 }} disabled={pristine || submitting} onClick={reset}>
                                        Clear Values
                                    </FlatButton>
                                </section>

                                <section className="row">
                                    <Field
                                        className="col-xs-12"
                                        style={style.field}
                                        name="title"
                                        type="text"
                                        component={this.renderTextField}
                                        label="Title"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="subTitle"
                                        type="text"
                                        component={this.renderTextField}
                                        label="Subtitle"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="location"
                                        type="text"
                                        component={this.renderTextField}
                                        label="Location"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="useBy"
                                        type="date"
                                        component={this.renderTextField}
                                        label="Use By"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="openingBid"
                                        type="number"
                                        component={this.renderTextField}
                                        hintText={10}
                                        label="Opening Bid"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="bidIncrement"
                                        type="number"
                                        component={this.renderTextField}
                                        hintText={5}
                                        label="Bid Increment"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="numberOffered"
                                        type="number"
                                        component={this.renderTextField}
                                        label="Qty Offered"
                                    />
                                    <Field
                                        className="col-xs-12"
                                        style={style.field}
                                        name="description"
                                        type="text"
                                        component={this.renderTextField}
                                        label="Description"
                                        multiLine={true}
                                        rows={2}
                                    />
                                    <Field
                                        className="col-xs-6"
                                        name="featured"
                                        component={this.renderCheckbox}
                                        label="Featured"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        name="show"
                                        component={this.renderCheckbox}
                                        label="Show"
                                    />
                                </section>
                            </form>
                        </div>
                    </Tab> */}
                    {/* <Tab icon={<AddCircleIcon />} value="new">
                        <div className="text-content">
                            <form onSubmit={handleSubmit(this.submitForm)}>

                                <section className="row middle-xs middle-sm">
                                    <RaisedButton className="col-xs-6" type="submit" style={{ padding: 0 }} primary disabled={pristine || submitting}>
                                        Submit
                                        </RaisedButton>
                                    <FlatButton className="col-xs-6" type="button" style={{ padding: 0 }} disabled={pristine || submitting} onClick={reset}>
                                        Clear Values
                                        </FlatButton>
                                </section>

                                <section className="row">
                                    <Field
                                        className="col-xs-12"
                                        style={style.field}
                                        name="title"
                                        type="text"
                                        component={this.renderTextField}
                                        label="Title"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="subTitle"
                                        type="text"
                                        component={this.renderTextField}
                                        label="Subtitle"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="location"
                                        type="text"
                                        component={this.renderTextField}
                                        label="Location"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="useBy"
                                        type="date"
                                        component={this.renderTextField}
                                        label="Use By"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="openingBid"
                                        type="number"
                                        component={this.renderTextField}
                                        hintText={10}
                                        label="Opening Bid"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="bidIncrement"
                                        type="number"
                                        component={this.renderTextField}
                                        hintText={5}
                                        label="Bid Increment"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        style={style.field}
                                        name="numberOffered"
                                        type="number"
                                        component={this.renderTextField}
                                        label="Qty Offered"
                                    />
                                    <Field
                                        className="col-xs-12"
                                        style={style.field}
                                        name="description"
                                        type="text"
                                        component={this.renderTextField}
                                        label="Description"
                                        multiLine={true}
                                        rows={2}
                                    />
                                    <Field
                                        className="col-xs-6"
                                        name="featured"
                                        component={this.renderCheckbox}
                                        label="Featured"
                                    />
                                    <Field
                                        className="col-xs-6"
                                        name="show"
                                        component={this.renderCheckbox}
                                        label="Show"
                                    />
                                </section>
                            </form>
                        </div>
                    </Tab> */}
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