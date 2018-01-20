import React from 'react'
import { Field, reduxForm } from 'redux-form'
import submit from './submit'

import TextField from 'material-ui/TextField';

// const renderField = ({ input, label, type, meta: { touched, error } }) => (
//   <div>
//     <label>{label}</label>
//     <div>
      
//     <TextField 
//                         id="title"
//                         hintText="Auction Title" 
//                         />
//       <input {...input} placeholder={label} type={type} />
//       {touched && error && <span>{error}</span>}
//     </div>
//   </div>
// )

const RemoteSubmitForm = props => {
  const { error, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        type="text"
        id="username"
        // component={renderField}
        label="Username"
      />
      <TextField
        name="password"
        type="password"
        id="password"
        // component={renderField}
        label="Password"
      />
      {error && <strong>{error}</strong>}
      <div>
        No submit button in the form. The submit button below is a separate
        unlinked component.
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'remoteSubmit', // a unique identifier for this form
  onSubmit: submit // submit function must be passed to onSubmit
})(RemoteSubmitForm)