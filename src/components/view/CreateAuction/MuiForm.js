import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
// import muiThemeable from 'material-ui/styles/muiThemeable';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
// import SelectField from 'material-ui/SelectField'
// import MenuItem from 'material-ui/MenuItem'
// import asyncValidate from './asyncValidate'

const validate = values => {
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
  return errors
}

const renderTextField = ({
  input,
  label,
  type,
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      floatingLabelText={label}
      errorText={touched && error}
      floatingLabelFixed={type === 'date' ? true : false}
      hintText={type === 'date' ? '' : label}
      type={type}
      {...input}
      {...custom}
    />
  )

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
)

class MuiForm extends Component {

  constructor(props) {
    super(props);
    // this.themePalette = this.props.muiTheme.palette;
    this.state = {
      initialValues: this.props.initialValues
    };
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


  render() {

    const { handleSubmit, createAuctionSubmitForm, pristine, reset, submitting, initialValues } = this.props;

    // this.setState({initialValues});  

    const style = {
      field: {
        borderRight: '.5em solid #fff'
      }
    };

    return (
      <form
        onSubmit={handleSubmit(createAuctionSubmitForm)}
      >

        <section className="row middle-xs middle-sm">
          <RaisedButton className="col-xs-8" type="submit" style={{ padding: 0 }} primary disabled={pristine || submitting}>
            Submit
          </RaisedButton>
          <span className="col-xs-1"> </span>
          <RaisedButton className="col-xs-3" type="button" style={{ padding: 0 }} disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </RaisedButton>
        </section>

        <section className="row">
          <Field
            className="col-xs-12"
            style={style.field}
            name="title"
            type="text"
            component={renderTextField}
            label="Title"
          />
          <Field
            className="col-xs-6"
            style={style.field}
            name="subTitle"
            type="text"
            component={renderTextField}
            label="Subtitle"
          />
          <Field
            className="col-xs-6"
            style={style.field}
            name="location"
            type="text"
            component={renderTextField}
            label="Location"
          />
          <Field
            className="col-xs-6"
            style={style.field}
            name="useBy"
            type="date"
            component={renderTextField}
            label="Use By"
          />
          <Field
            className="col-xs-6"
            style={style.field}
            name="openingBid"
            type="number"
            component={renderTextField}
            hintText={10}
            label="Opening Bid"
          />
          <Field
            className="col-xs-6"
            style={style.field}
            name="bidIncrement"
            type="number"
            component={renderTextField}
            hintText={5}
            label="Bid Increment"
          />
          <Field
            className="col-xs-6"
            style={style.field}
            name="numberOffered"
            type="number"
            component={renderTextField}
            label="Qty Offered"
          />
          <Field
            className="col-xs-12"
            style={style.field}
            name="description"
            type="text"
            component={renderTextField}
            label="Description"
            multiLine={true}
            rows={2}
          />
          <Field
            className="col-xs-6"
            name="featured"
            component={renderCheckbox}
            label="Featured"
          />
          <Field
            className="col-xs-6"
            name="show"
            component={renderCheckbox}
            label="Show"
          />
        </section>
      </form>
    )
  }
}

export default reduxForm({
  validate,
})(MuiForm)
