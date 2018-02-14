import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
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
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      floatingLabelFixed={type==='date' ? true : false}
      hintText={type==='date' ? '' : label}
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

{
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
}

const MaterialUiForm = props => {
  const { handleSubmit, submitForm, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(submitForm)}>

      <section className="row middle-xs middle-sm">
        <RaisedButton className="col-xs-6" type="submit" style={{padding:0}} primary disabled={pristine || submitting}>
          Submit
        </RaisedButton>
        <FlatButton className="col-xs-6" type="button" style={{padding:0}} disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </FlatButton>
      </section>

      <section classname="row">
        <Field
          name="title"
          type="text"
          component={renderTextField}
          label="Title"
        />
        <Field
          name="subTitle"
          type="text"
          component={renderTextField}
          label="Subtitle"
        />
        <Field
          name="location"
          type="text"
          component={renderTextField}
          label="Location"
        />
        <Field
          name="useBy"
          type="date"
          component={renderTextField}
          label="Use By"
        />
        <Field
          name="openingBid"
          type="number"
          component={renderTextField}
          label="Opening Bid"
        />
        <Field
          name="bidIncrement"
          type="number"
          component={renderTextField}
          label="Bid Increment"
        />
        <Field
          name="numberOffered"
          type="number"
          component={renderTextField}
          label="Number Offered"
        />
        <Field
          name="description"
          type="text"
          component={renderTextField}
          label="Description"
          multiLine={true}
          rows={2}
        />
        <Field name="featured" component={renderCheckbox} label="Featured" />
        <Field name="show" component={renderCheckbox} label="Show" />
      </section>
    </form>
  )
}

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  // asyncValidate
})(MaterialUiForm)