import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
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
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
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

const MaterialUiForm = props => {
  const { handleSubmit, submitForm, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <Field
          name="title"
          type="text"
          component={renderTextField}
          label="Title"
        />
      </div>
      <div>
        <Field
          name="subTitle"
          type="text"
          component={renderTextField}
          label="Subtitle"
        />
      </div>
      <div>
        <Field
          name="location"
          type="text"
          component={renderTextField}
          label="Location"
        />
      </div>
      <div>
        <Field
          name="useBy"
          type="date"
          component={renderTextField}
          label="Use By"
        />
      </div>
      <div>
        <Field
          name="openingBid"
          type="number"
          component={renderTextField}
          label="Opening Bid"
        />
      </div>
      <div>
        <Field
          name="bidIncrement"
          type="number"
          component={renderTextField}
          label="Bid Increment"
        />
      </div>
      <div>
        <Field
          name="numberOffered"
          type="number"
          component={renderTextField}
          label="Number Offered"
        />
      </div>
      <div>
        <Field
          name="description"
          type="text"
          component={renderTextField}
          label="Description"
          multiLine={true}
          rows={2}
        />
      </div>
      <Field name="featured" component={renderCheckbox} label="Featured" />
      <Field name="show" component={renderCheckbox} label="Show" />
      {/* <div>
        <Field name="featured" component={renderRadioGroup}>
          <RadioButton value="true" label="yes" />
          <RadioButton value="false" label="no" />
        </Field>
      </div>
      <div>
        <Field name="show" component={renderRadioGroup}>
          <RadioButton value="true" label="yes" />
          <RadioButton value="false" label="no" />
        </Field>
      </div> */}
      <div>
        <FlatButton type="submit" disabled={pristine || submitting}>
          Submit
        </FlatButton>
        <FlatButton type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </FlatButton>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  // asyncValidate
})(MaterialUiForm)